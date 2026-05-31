export interface TelegramPost {
  id: string;
  postUrl: string;
  text: string;
  htmlText: string;
  date: string;
  timeLabel: string;
  views: string;
  photoUrl?: string;
  photoUrls?: string[];
  hasVideo?: boolean;
  videoUrl?: string;
  videoThumbUrl?: string;
  hasAudio?: boolean;
  audioUrl?: string;
  audioTitle?: string;
  audioDuration?: string;
  hasFile?: boolean;
  fileName?: string;
  fileSize?: string;
  reactions?: { emoji: string; count: string }[];
  linkPreview?: {
    siteName?: string;
    title?: string;
    description?: string;
    url?: string;
    photoUrl?: string;
  };
  authorName?: string;
}

export interface ChannelInfo {
  username: string;
  title: string;
  avatarUrl: string;
  subscribers: string;
  description: string;
}

export interface FeedResponse {
  channelInfo: ChannelInfo;
  posts: TelegramPost[];
}
