import { z } from 'zod';
import axios from 'axios';
import { redditPostValidator } from './types';

axios.defaults.baseURL = 'https://oauth.reddit.com/';

interface IPosts {
  sort: 'hot' | 'best' | 'new' | 'top';
  limit: number;
  cursor?: string;
  subreddit?: string;
  token?: string;
}

export async function getPosts({
  token,
  sort,
  limit,
  cursor: after,
  subreddit
}: IPosts) {
  console.log('fetching posts...');
  console.log('token', token);

  const url = subreddit ? `r/${subreddit}/${sort}` : sort;

  if (token) {
    axios.defaults.headers.common = {
      authorization: `bearer ${token}`
    };
  }

  if (after) {
    axios.defaults.params = { after: `t3_${after}` };
  }

  console.log('after', after);

  const { data } = await axios.get(url + '/.json?', {
    params: {
      raw_json: 1,
      sr_detail: true,
      limit
    }
  });

  // console.log('data', data.data.children[0]);

  const posts = redditPostValidator.parse(data).data;

  posts.children = await Promise.all(
    posts.children.map(async (post) => {
      const { icon_img, title } = await getSubreddit(post.subreddit);
      post.subreddit_data.icon =
        icon_img ||
        'https://user-images.githubusercontent.com/33750251/59486444-3699ab80-8e71-11e9-9f9a-836e431dcbfd.png';
      post.subreddit_data.title = title;
      if (post.is_self && post.selftext?.includes('twitter')) {
        post.is_twitter = true;
      }
      return post;
    })
  );

  return posts;
}

async function getSubreddit(name: string) {
  const subredditValidator = z
    .object({
      data: z.object({
        icon_img: z.string().nullish(),
        title: z.string()
      })
    })
    .transform((o) => o.data);

  const res = await (
    await fetch(`https://reddit.com/r/${name}/about.json`)
  ).json();

  return subredditValidator.parse(res);
}

export async function upvotePost(dir: number, id: string, token: string) {
  // dir 1 = up
  // dir -1 = down
  await fetch('https://oauth.reddit.com/api/vote', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `id=t3_${id}&dir=${dir}&rank=3`
  });
}
