import axios from 'axios';
import { redditPostValidator } from './types';

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
  console.log('fetching posts...', token && 'authenicated');

  let url = 'https://reddit.com';
  let headers = {};
  let params = {};

  if (token) {
    url = 'https://oauth.reddit.com';
    headers = {
      authorization: `bearer ${token}`
    };
  }

  if (subreddit) {
    url = url.concat(`/r/${subreddit}/${sort}/.json?`);
  } else {
    url = url.concat(`/${sort}/.json?`);
  }

  if (after) {
    params = { raw_json: 1, sr_detail: true, limit, after };
  } else {
    params = { raw_json: 1, sr_detail: true, limit };
  }

  console.log('url', url, params);
  const { data } = await axios.get(url, { headers, params });

  // console.log('data', data.data.children[0]);

  return redditPostValidator.parse(data).data;
}

export async function vote(
  dir: number,
  id: string,
  url: string,
  token: string
) {
  await fetch('https://oauth.reddit.com/api/vote', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `id=${id}&dir=${dir}&rank=3`
  });

  return true;

  // const { data } = await axios.get('https://reddit.com' + url + '.json');
  // console.log('data', data);

  // return data;
}
