import axios from 'axios';
import { postValidator, subscriptionValidator } from './types';

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
  let url = 'https://reddit.com';
  let headers = {};
  let params = {};

  if (token) {
    url = 'https://oauth.reddit.com';
    headers = { authorization: `bearer ${token}` };
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

  return postValidator.parse(data).data;
}

interface IVote {
  dir: number;
  id: string;
  token: string;
}

export async function vote({ dir, id, token }: IVote) {
  await fetch('https://oauth.reddit.com/api/vote', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `id=${id}&dir=${dir}&rank=3`
  });

  const link = `https://api.reddit.com/api/info`;
  const params = { raw_json: 1, id };
  const { data } = await axios.get(link, { params });

  return postValidator.parse(data).data.children[0];
}

export async function getSubscriptions(token: string) {
  const url = 'https://oauth.reddit.com/subreddits/mine/subscriber';
  const headers = { authorization: `bearer ${token}` };
  const params = { limit: 50 };
  const { data } = await axios.get(url, { headers, params });
  return subscriptionValidator.parse(data).data.children;
}
