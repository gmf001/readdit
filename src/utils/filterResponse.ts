interface IResponse {
  kind: string;
  data: {
    after: string;
    before: string;
    children: any[];
  };
}

export const filterResponse = (res: IResponse) => {
  return {
    after: res.data.after,
    before: res.data.before,
    children: res.data.children
  };
};

export interface IRedditPost {
  title: string;
  subreddit: string;
  thumbnail: string;
  permalink: string;
  url: string;
  is_video: boolean;
  media?: any;
  url_overridden_by_dest: string;
}

export const filterChildren = (
  data: IResponse["data"],
  limit: number = 25
): IRedditPost[] => {
  return data?.children.slice(0, limit).map((post: { data: IRedditPost }) => {
    return {
      title: post.data.title,
      subreddit: post.data.subreddit,
      thumbnail: post.data.thumbnail,
      permalink: post.data.permalink,
      url: post.data.url,
      is_video: post.data.is_video,
      media: post.data.media,
      url_overridden_by_dest: post.data.url_overridden_by_dest
    };
  });
};
