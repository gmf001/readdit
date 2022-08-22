export type RedditResponse = {
  kind: string;
  data: {
    after: string;
    before: string;
    children: RedditPost[];
  };
};

export type RedditPost = {
  data: {
    author: string;
    title: string;
    subreddit: string;
    thumbnail: string;
    permalink: string;
    url: string;
    is_video: boolean;
    is_self: boolean;
    media?: any;
    url_overridden_by_dest: string;
    num_comments: number;
    ups: number;
  };
};
