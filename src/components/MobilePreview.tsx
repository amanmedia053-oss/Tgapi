import React, { useState } from 'react';
import { TelegramPost, ChannelInfo } from '../types';
import { Eye, ExternalLink, Calendar, Search, ArrowRight, RefreshCw, Smartphone, Info, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobilePreviewProps {
  channelInfo: ChannelInfo | null;
  posts: TelegramPost[];
  isLoading: boolean;
  onRefresh: (channelName: string) => void;
  activeChannelName: string;
}

export default function MobilePreview({
  channelInfo,
  posts,
  isLoading,
  onRefresh,
  activeChannelName
}: MobilePreviewProps) {
  const [inputChannel, setInputChannel] = useState(activeChannelName);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputChannel.trim()) {
      onRefresh(inputChannel.trim());
    }
  };

  // Status Bar mock time
  const formatMockTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Search Input Bar above phone */}
      <div className="w-full max-w-[380px] mb-4">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={inputChannel}
            onChange={(e) => setInputChannel(e.target.value)}
            placeholder="Search custom @channel..."
            className="w-full bg-slate-800 text-white pl-10 pr-24 py-2.5 rounded-xl border border-slate-700/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans text-sm outline-none transition"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                Load <ArrowRight className="w-3" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Styled Physical Phone Frame */}
      <div className="relative w-full max-w-[390px] h-[720px] bg-slate-950 rounded-[40px] p-3.5 border-4 border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden select-none">
        {/* Notch Speaker/Camera */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[22px] w-[130px] bg-slate-800 rounded-b-2xl z-40 flex items-center justify-center gap-1.5">
          <div className="w-10 h-0.5 bg-slate-700 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-slate-750 rounded-full"></div>
        </div>

        {/* Display screen */}
        <div className="relative w-full h-full bg-slate-900 rounded-[28px] overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="h-6 flex items-center justify-between px-6 bg-slate-950/60 text-slate-300 text-xs font-mono select-none z-30">
            <span>{formatMockTime()}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1 rounded font-sans uppercase font-bold tracking-widest scale-90">LTE</span>
              {/* Battery Graphic */}
              <div className="w-5 h-2.5 border border-slate-500 rounded-sm p-0.5 flex items-center">
                <div className="h-full w-[85%] bg-blue-500 rounded-2xs"></div>
              </div>
            </div>
          </div>

          {/* Interactive Screen Scroll container */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-trigger relative bg-slate-900/90 text-slate-100 flex flex-col">
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-sm text-slate-400 font-sans font-medium">Fetching secure channel feed...</p>
                <p className="text-xs text-slate-500 font-mono">Scraping web representation of @{activeChannelName}</p>
              </div>
            ) : channelInfo ? (
              <>
                {/* Channel Header Banner */}
                <div className="relative bg-slate-950 px-4 pt-4 pb-3 border-b border-slate-800 select-none">
                  <div className="flex items-center gap-3">
                    {/* Circle Avatar */}
                    <img
                      src={channelInfo.avatarUrl}
                      alt={channelInfo.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 object-cover shrink-0 shadow-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://telegram.org/img/t_logo.png';
                      }}
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm tracking-tight text-white truncate">
                        {channelInfo.title}
                      </h4>
                      <p className="text-xs text-blue-400 font-mono truncate">
                        @{channelInfo.username}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {channelInfo.subscribers || 'Public channel'}
                      </p>
                    </div>
                  </div>

                  {/* Channel bio */}
                  <div className="mt-2 text-xs text-slate-350 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60 line-clamp-2">
                    {channelInfo.description}
                  </div>
                </div>

                {/* Posts Feed container */}
                <div className="flex-1 p-3 space-y-4">
                  {posts.length === 0 ? (
                    <div className="text-center py-12 px-4">
                      <p className="text-sm text-slate-400">No posts retrieved.</p>
                      <p className="text-xs text-slate-500 mt-1">Make sure the channel is public and has posts.</p>
                    </div>
                  ) : (
                    posts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-slate-950/70 border border-slate-800/60 rounded-2xl overflow-hidden shadow-md group border-l-2 border-l-blue-500/50"
                      >
                        {/* Post Header with timestamp */}
                        <div className="px-3.5 py-2 flex items-center justify-between border-b border-slate-900 text-[11px] text-slate-400 select-none">
                          <span className="font-sans text-slate-500 font-medium">#{post.id}</span>
                          <div className="flex items-center gap-1 font-sans">
                            <Calendar className="w-3 h-3 text-blue-500" />
                            <span>{post.timeLabel || 'Recent'}</span>
                          </div>
                        </div>

                        {/* Post Image Banner (if available) */}
                        {post.photoUrl && (
                          <div
                            onClick={() => setSelectedPhoto(post.photoUrl!)}
                            className="relative cursor-pointer aspect-video bg-slate-900 overflow-hidden border-b border-slate-900 flex items-center justify-center group"
                          >
                            <img
                              src={post.photoUrl}
                              referrerPolicy="no-referrer"
                              alt="Telegram post asset"
                              className="w-full h-full object-cover transition duration-300 group-hover:scale-95"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <div className="absolute top-2 right-2 bg-slate-950/75 p-1 rounded-md text-[10px] text-slate-300 flex items-center gap-1 border border-slate-800/40 select-none pointer-events-none">
                              <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                              <span>View Image</span>
                            </div>
                          </div>
                        )}

                        {/* Text bubble area */}
                        <div className="p-3.5">
                          {post.htmlText ? (
                            <div
                              className="text-slate-200 text-xs leading-relaxed space-y-1.5 font-sans break-words telegram-content-text"
                              dangerouslySetInnerHTML={{ __html: post.htmlText }}
                            />
                          ) : (
                            <p className="text-slate-200 text-xs leading-relaxed font-sans break-words whitespace-pre-wrap">
                              {post.text}
                            </p>
                          )}

                          {/* Link Preview Card */}
                          {post.linkPreview && (
                            <a
                              href={post.linkPreview.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-3 block bg-slate-900/60 hover:bg-slate-900 border border-slate-800 rounded-xl p-2.5 transition group/link"
                            >
                              <div className="flex gap-2 min-w-0">
                                {post.linkPreview.photoUrl && (
                                  <img
                                    src={post.linkPreview.photoUrl}
                                    referrerPolicy="no-referrer"
                                    alt="Link thumbnail"
                                    className="w-12 h-12 rounded bg-slate-850 object-cover shrink-0 border border-slate-700"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                )}
                                <div className="min-w-0 flex-1">
                                  {post.linkPreview.siteName && (
                                    <span className="text-[10px] text-blue-400 font-mono uppercase font-bold tracking-wider">
                                      {post.linkPreview.siteName}
                                    </span>
                                  )}
                                  <h5 className="text-[11.5px] font-bold text-white truncate mt-0.5 group-hover/link:text-blue-400">
                                    {post.linkPreview.title}
                                  </h5>
                                  <p className="text-[10px] text-slate-450 line-clamp-1 mt-0.5">
                                    {post.linkPreview.description}
                                  </p>
                                </div>
                              </div>
                            </a>
                          )}
                        </div>

                        {/* Footer (views counts + actions) */}
                        <div className="px-3 py-2 flex items-center justify-between border-t border-slate-900 select-none text-[10px] text-slate-500">
                          <span className="font-mono flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-slate-450" />
                            {post.views || '0'}
                          </span>
                          <a
                            href={post.postUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-slate-905 hover:bg-slate-800 text-blue-400 flex items-center gap-1 px-2.5 py-1 rounded-md transition font-sans hover:text-blue-300"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400 gap-2">
                <Info className="w-8 h-8 text-amber-500/80" />
                <p className="text-sm font-sans font-medium">Please verify feed link.</p>
                <p className="text-xs text-slate-500 font-sans">No data retrieved from Telegram.</p>
              </div>
            )}
          </div>

          {/* Navigation Bar mock of phone */}
          <div className="h-11 bg-slate-950 border-t border-slate-800/80 flex items-center justify-around px-4 select-none text-slate-500 z-30">
            <div className="flex flex-col items-center gap-0.5 text-blue-400">
              <Smartphone className="w-4 h-4" />
              <span className="text-[8px] font-sans font-bold">Feed</span>
            </div>
            <div
              onClick={() => onRefresh(activeChannelName)}
              className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-[8px] font-sans font-medium">Refresh</span>
            </div>
          </div>
        </div>

        {/* Home gesture bar */}
        <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[120px] h-1 bg-slate-700 rounded-full z-40"></div>
      </div>

      {/* Retro / Proportional Lightbox Overlay for Image views */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-slate-800 text-white rounded-full p-2 hover:bg-slate-700 transition"
            >
              ✕
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={selectedPhoto}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] rounded-xl object-contain border border-slate-800 shadow-2xl"
              alt="Telegram big preview"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
