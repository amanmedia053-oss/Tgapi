/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { FeedResponse, TelegramPost } from './types';
import { 
  Eye, 
  Calendar, 
  RefreshCw, 
  Image as ImageIcon, 
  Info,
  AlertCircle,
  Smartphone,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Clock,
  BookOpen,
  Video,
  FileText,
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  PlayCircle,
  MoreVertical,
  Menu,
  X,
  Search,
  Settings,
  Mail,
  Heart,
  Grid,
  Send,
  Sparkles,
  ExternalLink,
  Sliders,
  Check,
  Moon,
  Sun,
  Palette,
  Layers,
  Type,
  Bell,
  BellOff,
  Globe,
  Trash2,
  Copy,
  Share2,
  Images,
  Feather,
  User,
  Cpu,
  Award,
  Book,
  Phone,
  MessageSquare,
  Rocket,
  Quote,
  Award as AwardIcon,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom elegant PDF Book display and download component
function CustomBookDownload({ post, isDark, tc }: { post: TelegramPost; isDark: boolean; tc: any }) {
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [activeFile, setActiveFile] = useState<{ fileName: string; fileSize?: string; url?: string; postUrl?: string } | null>(null);

  const defaultFileName = post.fileName || post.text?.split('\n')?.[0]?.slice(0, 45) || 'پښتو شعرونه کتاب (PDF)';
  const defaultFileSize = post.fileSize || 'سند / PDF فایل';

  const files = post.fileList && post.fileList.length > 0 ? post.fileList : [{ fileName: defaultFileName, fileSize: defaultFileSize, postUrl: post.postUrl }];

  return (
    <div className="space-y-2.5 w-full">
      {files.map((file, idx) => {
        const name = file.fileName || `${defaultFileName} (${idx + 1})`;
        const size = file.fileSize || defaultFileSize;
        
        return (
          <div 
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setActiveFile(file);
              setShowTelegramModal(true);
            }}
            style={{ cursor: 'pointer' }}
            className={`p-3 rounded-xl border ${
              isDark 
                ? 'bg-slate-950/70 border-slate-800 hover:bg-slate-900/80 shadow-md shadow-black/20' 
                : 'bg-slate-50 border-slate-205 hover:bg-slate-105 shadow-sm'
            } flex items-center justify-between gap-3 text-right font-sans transition-all duration-300 select-none`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-10 h-12 rounded-lg bg-gradient-to-tr ${tc.gradient} flex flex-col items-center justify-center text-white shrink-0 shadow-md relative overflow-hidden`}>
                <div className="absolute top-0.5 left-0.5 bg-white/20 px-0.5 py-0.2 rounded text-[7px] font-black uppercase tracking-wider">PDF</div>
                <Book className="w-4 h-4 text-white mt-1.5" />
              </div>
              <div className="text-right min-w-0">
                <h5 className={`text-[11.5px] font-black ${isDark ? 'text-white' : 'text-slate-900'} line-clamp-1 truncate`}>
                  {name}
                </h5>
                <span className="text-[9.5px] text-slate-400 font-mono mt-0.5 block">
                  {size}
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveFile(file);
                setShowTelegramModal(true);
              }}
              style={{ cursor: 'pointer' }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black text-white ${tc.bg} ${tc.hoverBg} transition active:scale-95 flex items-center gap-1.5 shrink-0 shadow-sm`}
            >
              <Send className="w-3.5 h-3.5 -rotate-12" />
              <span>ډانلوډ</span>
            </button>
          </div>
        );
      })}

      <AnimatePresence>
        {showTelegramModal && activeFile && (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setShowTelegramModal(false);
            }}
            className="fixed inset-0 z-[99999] flex items-end justify-center p-0"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowTelegramModal(false);
              }}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs"
            />
            
            {/* Bottom Sheet Card */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md rounded-t-[32px] sm:rounded-b-[28px] sm:mb-6 p-6 pb-10 sm:pb-6 border text-right font-sans shadow-2xl transition-colors duration-200 ${
                isDark 
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-805 text-slate-100 shadow-slate-950/90' 
                  : 'bg-white border-slate-250 text-slate-800 shadow-slate-300/40'
              }`}
            >
              {/* Elegant Top Sheet Handle */}
              <div className="w-12 h-1.5 bg-slate-500/25 rounded-full mx-auto mb-5" />

              <div className="flex flex-col items-center text-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isDark ? 'bg-indigo-950/60 text-indigo-400' : 'bg-indigo-50 text-indigo-600'} shrink-0 shadow-inner`}>
                  <Send className="w-6 h-6 -rotate-12 animate-pulse" />
                </div>
                
                <div className="space-y-1.5 w-full">
                  <h4 className={`text-base sm:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    د کتاب ډاونلوډ او ترلاسه کول
                  </h4>
                  <span className="text-[10px] sm:text-xs text-indigo-400 font-mono font-bold block max-w-xs mx-auto truncate">
                    {activeFile.fileName || defaultFileName}
                  </span>
                </div>

                <p className={`text-xs sm:text-[13px] leading-relaxed ${isDark ? 'text-slate-350' : 'text-slate-650'} px-2`}>
                  ګرانه او محترمه کاروونکی! دا کتاب په پوره امانتدارۍ سره زمونږ په رسمي ټلیګرام چینل کې خوندي شوی دی. د دې لپاره چې کتاب په بشپړ ډول ډاونلوډ او خلاص کړئ، مهرباني وکړئ لاندې د <span className="text-indigo-400 font-bold">ډانلوډ (ټلیګرام)</span> تڼۍ کلیک کړئ.
                </p>
                
                <div className={`w-full h-[1px] ${isDark ? 'bg-slate-800/60' : 'bg-slate-100'} my-1`} />
                
                <div className="flex flex-col sm:flex-row-reverse gap-3 w-full">
                  <a
                    href={activeFile.postUrl || post.postUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTelegramModal(false);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full sm:flex-1 py-3 px-5 rounded-2xl text-xs sm:text-sm font-black text-center text-white ${tc.bg} ${tc.hoverBg} transition active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10`}
                  >
                    <Send className="w-4 h-4 -rotate-12" />
                    <span>ډانلوډ (ټلیګرام)</span>
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTelegramModal(false);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full sm:flex-1 py-3 px-5 rounded-2xl text-xs sm:text-sm font-black text-center border transition active:scale-95 ${
                      isDark 
                        ? 'bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-300' 
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-205 text-slate-700'
                    }`}
                  >
                    بندول
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const makeHtmlHashtagsClickable = (html: string) => {
  if (!html) return '';
  return html.replace(/(#[\u0600-\u06FFa-zA-Z0-9_]+)/g, (match) => {
    return `<span class="text-indigo-400 hover:text-indigo-350 font-black hover:underline mx-0.5 inline-block" style="cursor: pointer;" onclick="if(window.handleHashtagClickGlobal) window.handleHashtagClickGlobal('${match}')">${match}</span>`;
  });
};

// Custom text component to render Telegram formatting beautifully (with line-breaks and stanzas)
function BeautifulTelegramText({ text, isDark, fs, limitLines = 6, showExpander = true }: { text: string; isDark: boolean; fs: any; limitLines?: number; showExpander?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  // 1. Normalize literal \n, double escaped \\n, HTML line breaks, and empty lines
  const cleanText = text
    .replace(/\\n/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  // Enforce exactly 3 lines limit for List View previews (when showExpander is true)
  const actualLimit = showExpander ? 3 : limitLines;

  // Split by newline to respect visual poetry stanzas and empty line spacing
  let lines = cleanText.split('\n');
  
  // For List View previews, remove any completely empty/whitespace-only lines so they don't consume preview constraints
  if (showExpander) {
    lines = lines.filter(line => line.trim() !== '');
  }
  
  const needsTruncation = lines.length > actualLimit;
  
  // Truncate to actualLimit lines if needed, preserving exact spacing of those lines
  const displayedText = (needsTruncation && !expanded) 
    ? lines.slice(0, actualLimit).join('\n') 
    : lines.join('\n');

  // 3. Render and highlight hashtags to be fully clickable search queries
  const renderWithHashtags = (rawText: string, isTruncated: boolean) => {
    if (!rawText) return '';
    const regex = /(#[\u0600-\u06FFa-zA-Z0-9_]+)/g;
    const parts = rawText.split(regex);
    const elements = parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              if ((window as any).handleHashtagClickGlobal) {
                (window as any).handleHashtagClickGlobal(part);
              }
            }}
            className="text-indigo-400 hover:text-indigo-350 font-black cursor-pointer transition select-none mx-0.5 inline-block hover:underline"
            title={`پلټنه: ${part}`}
          >
            {part}
          </span>
        );
      }
      return part;
    });

    if (isTruncated && !expanded) {
      elements.push(
        <span
          key="more-suffix"
          className="text-indigo-400 font-bold hover:text-indigo-350 transition select-none mr-2 inline-block whitespace-nowrap align-middle"
          style={{ direction: 'rtl' }}
        >
          ... نور وګورئ
        </span>
      );

      // Extract all hashtags from complete cleanText and find those that are currently hidden
      const allHashtags = Array.from(new Set(cleanText.match(/(#[\u0600-\u06FFa-zA-Z0-9_]+)/g) || []));
      const displayedHashtags = Array.from(new Set(rawText.match(/(#[\u0600-\u06FFa-zA-Z0-9_]+)/g) || []));
      const missingHashtags = allHashtags.filter(tag => !displayedHashtags.includes(tag));

      if (missingHashtags.length > 0) {
        elements.push(
          <div key="missing-tags-container" className="mt-2 bg-indigo-500/5 py-1 px-2.5 rounded-lg text-right text-[11px] font-medium leading-relaxed max-w-full flex flex-wrap gap-1 items-center justify-start border border-indigo-400/5" style={{ direction: 'rtl' }}>
            <span className="text-slate-400/95 ml-1 select-none font-sans text-[10.5px]">هشتګونه:</span>
            {missingHashtags.map((tag, idx) => (
              <span
                key={`missing-${idx}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if ((window as any).handleHashtagClickGlobal) {
                    (window as any).handleHashtagClickGlobal(tag);
                  }
                }}
                className="text-indigo-400 hover:text-indigo-350 font-extrabold cursor-pointer transition select-none hover:underline"
                title={`پلټنه: ${tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        );
      }
    }
    return elements;
  };

  return (
    <div className="space-y-1 text-right w-full">
      <div 
        className={`${fs?.body || 'text-[12.5px] sm:text-[13px]'} ${
          isDark ? 'text-slate-200' : 'text-slate-800'
        } whitespace-pre-wrap break-words leading-[2.1] sm:leading-[2.25] pr-1 font-medium font-sans select-text`}
        style={{ direction: 'rtl' }}
      >
        {renderWithHashtags(displayedText, needsTruncation)}
      </div>
    </div>
  );
}

// Custom elegant audio player with progress bar tracking
function BeautifulAudioPlayer({ url, title, duration, isDark, tc }: { key?: any; url: string; title: string; duration?: string; isDark: boolean; tc: any }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalDuration, setTotalDuration] = useState(duration || '0:00');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Pause any other playing audios on the page
      const allAudioElements = document.querySelectorAll('audio');
      allAudioElements.forEach(el => {
        if (el !== audioRef.current) el.pause();
      });
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    if (dur > 0) {
      setProgress((cur / dur) * 100);
    }
    setCurrentTime(formatTime(cur));
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setTotalDuration(formatTime(audioRef.current.duration));
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const dur = audioRef.current.duration || 0;
    const newTime = (parseFloat(e.target.value) / 100) * dur;
    audioRef.current.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className={`p-4 rounded-2xl ${isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-100 border-slate-200'} border flex flex-col gap-2.5 font-sans mt-3 shadow-inner text-right w-full`}
    >
      <audio 
        ref={audioRef} 
        src={url} 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />
      <div className="flex items-center justify-between gap-3 min-w-0">
        <button
          onClick={togglePlay}
          style={{ cursor: 'pointer' }}
          className={`w-9 h-9 rounded-full ${tc.bg} ${tc.hoverBg} hover:scale-105 active:scale-95 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/25 transition`}
        >
          {isPlaying ? (
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current text-white translate-x-[1px]" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0 text-right">
          <span className={`text-[11px] font-bold block truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</span>
          <span className="text-[9.5px] text-slate-400 font-mono">ډېوه غږیز پلیر</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[9.5px] text-slate-500 font-mono tracking-tight shrink-0">{currentTime}</span>
        <div className="flex-grow relative flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
          />
        </div>
        <span className="text-[9.5px] text-slate-500 font-mono tracking-tight shrink-0">{totalDuration}</span>
      </div>
    </div>
  );
}

// Custom elegant video player with progress seek bar tracking and overlay play buttons
function BeautifulVideoPlayer({ url, poster, isDark, tc }: { url: string; poster?: string; isDark: boolean; tc: any }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalDuration, setTotalDuration] = useState('0:00');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<any>(null);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      // Pause other playing videos or audios
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(v => {
        if (v !== videoRef.current) v.pause();
      });
      const allAudios = document.querySelectorAll('audio');
      allAudios.forEach(a => a.pause());
      
      videoRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    if (dur > 0) {
      setProgress((cur / dur) * 100);
    }
    setCurrentTime(formatTime(cur));
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setTotalDuration(formatTime(videoRef.current.duration));
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const dur = videoRef.current.duration || 0;
    const newTime = (parseFloat(e.target.value) / 100) * dur;
    videoRef.current.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newState = !isMuted;
    videoRef.current.muted = newState;
    setIsMuted(newState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const val = parseFloat(e.target.value);
    videoRef.current.volume = val;
    setVolume(val);
    if (val === 0) {
      videoRef.current.muted = true;
      setIsMuted(true);
    } else {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={() => togglePlay()}
      className="relative w-full max-h-[360px] rounded-2xl overflow-hidden bg-black group shadow-xl border border-slate-500/10 dark:border-slate-800 flex items-center justify-center font-sans select-none"
    >
      <video 
        ref={videoRef}
        src={url}
        poster={poster || undefined}
        className="w-full h-full max-h-[360px] object-contain cursor-pointer"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
        playsInline
      />
      
      {/* Big Pause/Play Center Overlay Indicator Icon */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none transition duration-300">
          <div className="w-12 h-12 rounded-full bg-slate-905/80 backdrop-blur border border-white/20 flex items-center justify-center text-white scale-100 hover:scale-105 active:scale-95 transition cursor-pointer pointer-events-auto shadow-lg">
            <Play className="w-5 h-5 text-indigo-400 fill-indigo-400 translate-x-0.5" />
          </div>
        </div>
      )}

      {/* Control overlay */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-2 transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
        <div className="flex items-center gap-2">
          <input 
            type="range"
            min="0"
            max="100"
            step="0.01"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-505 hover:h-1.5 transition-all outline-none"
          />
        </div>

        <div className="flex items-center justify-between gap-3 text-white text-xs">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => togglePlay()}
              className="hover:scale-110 active:scale-95 transition text-slate-200 hover:text-indigo-400"
              style={{ cursor: 'pointer' }}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </button>

            <div className="flex items-center gap-1.5 group/vol">
              <button 
                onClick={toggleMute}
                className="hover:scale-110 transition text-slate-200 hover:text-indigo-400"
                style={{ cursor: 'pointer' }}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/vol:w-14 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-550 transition-all duration-200 outline-none"
              />
            </div>

            <span className="text-[9px] font-mono text-slate-350 select-none">
              {currentTime} / {totalDuration}
            </span>
          </div>

          <div>
            <button 
              onClick={toggleFullscreen}
              className="hover:scale-110 active:scale-95 transition text-slate-200 hover:text-indigo-450"
              style={{ cursor: 'pointer' }}
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const extractUrl = (text: string): string | null => {
  if (!text) return null;
  const match = text.match(/https?:\/\/[^\s]+/);
  return match ? match[0] : null;
};

const getIsBook = (post: TelegramPost | null): boolean => {
  if (!post) return false;
  return !!post.hasFile || 
         !!(post.fileName && (post.fileName.toLowerCase().endsWith('.pdf') || post.fileName.toLowerCase().includes('pdf') || post.fileName.toLowerCase().includes('کتاب'))) ||
         !!(post.text && (post.text.toLowerCase().includes('.pdf') || post.text.includes('.epub') || post.text.includes('کتاب کښته') || post.text.includes('کتاب ډانلوډ')));
};

const getPostTextWithFallback = (post: TelegramPost | null): string => {
  if (!post) return '';

  // Recover beautiful newlines and stanzas from htmlText if available, protecting old cached posts structure
  if (post.htmlText && post.htmlText.trim() !== '') {
    let processed = post.htmlText
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<\/div>/gi, '\n');
    
    // Safely remove other HTML tags to get pure clean plain text with preserved spacing/stanzas
    processed = processed.replace(/<[^>]*>/g, '');
    
    // Unescape common HTML escape character sequences
    processed = processed
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
      
    if (processed.trim() !== '') {
      return processed;
    }
  }

  if (post.text && post.text.trim() !== '') {
    return post.text;
  }
  if (getIsBook(post)) {
    return 'کتاب';
  }
  if (post.hasVideo || (post.videoList && post.videoList.length > 0)) {
    return 'ويډيو';
  }
  if (post.photoUrl || (post.photoUrls && post.photoUrls.length > 0)) {
    return 'انځور';
  }
  if (post.hasAudio || (post.audioList && post.audioList.length > 0)) {
    return 'غږ';
  }
  return '';
};

function CustomLinkPreview({ url, isDark }: { url: string; isDark: boolean }) {
  let hostname = '';
  try {
    hostname = new URL(url).hostname;
  } catch {
    hostname = 'ويب پاڼه';
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`mt-2 block ${isDark ? 'bg-slate-950/40 hover:bg-slate-950/60 border-indigo-500/20' : 'bg-slate-100 hover:bg-slate-150 border-indigo-500/10'} hover:border-indigo-500/40 border rounded-xl p-3 transition shadow-xs w-full text-right`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 shrink-0">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
          <div className="text-right min-w-0">
            <span className="text-[9.5px] uppercase font-bold tracking-wider text-indigo-400 font-mono block">
              {hostname}
            </span>
            <span className="text-[10px] text-slate-400 truncate block max-w-[200px]">
              {url}
            </span>
          </div>
        </div>
        <span className="text-[9.5px] bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-bold font-sans shrink-0">
          لینک خلاص کړئ
        </span>
      </div>
    </a>
  );
}

export default function App() {
  const [feedData, setFeedData] = useState<FeedResponse | null>(() => {
    const cached = localStorage.getItem('dewa_cached_feed_data');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(() => {
    return !localStorage.getItem('dewa_cached_feed_data');
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // State for alert notifications of newly published poetry posts
  const [newPostNotification, setNewPostNotification] = useState<TelegramPost | null>(null);
  
  // Custom states for diagnosing mobile environments (Capacitor/Native Bridge webview issues)
  const [diagnostics, setDiagnostics] = useState<{
    clientOrigin: string;
    protocol: string;
    isCapacitor: boolean;
    capacitorPlatform: string;
    backendFetchError: string | null;
    directFetchError: string | null;
    userAgent: string;
    usingDirectFallback: boolean;
  } | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [backendHostInput, setBackendHostInput] = useState(() => {
    const saved = localStorage.getItem('dewa_custom_backend_host');
    if (saved) return saved;
    // Dynamically fallback to window origin since that is where the live container server runs
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      return window.location.origin;
    }
    return 'https://da-mine-dewa.web.app';
  });
  
  // States for navigation flows
  const [selectedPost, setSelectedPost] = useState<TelegramPost | null>(null);
  const [isFullFeedOpen, setIsFullFeedOpen] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Pagination states for all posts list (starts with 5, loads 5 more automatically)
  const [visibleFullCount, setVisibleFullCount] = useState(5);
  const [isSettingsPageOpen, setIsSettingsPageOpen] = useState(false);
  const [isAboutPageOpen, setIsAboutPageOpen] = useState(false);
  const [isContactPageOpen, setIsContactPageOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Optical Zoom states for image lightbox
  const [zoomPhotoUrl, setZoomPhotoUrl] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomPhotoUrlsList, setZoomPhotoUrlsList] = useState<string[]>([]);
  const [zoomPhotoIndex, setZoomPhotoIndex] = useState<number>(0);

  const openPhotoLightbox = (url: string, list: string[] = []) => {
    const photoList = list.length > 0 ? list : [url];
    const index = photoList.indexOf(url);
    setZoomPhotoUrlsList(photoList);
    setZoomPhotoIndex(index !== -1 ? index : 0);
    setZoomPhotoUrl(url);
    setZoomScale(1);
  };

  // New states for Sidebar, three-dot menu, and search filtering
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Splash Screen and Welcome Dialog states
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [splashProgress, setSplashProgress] = useState(0);

  // Active modal state for sidebar actions (settings, about, contact, apps)
  const [activeModal, setActiveModal] = useState<'settings' | 'about' | 'contact' | 'apps' | null>(null);
  
  // Custom interactive & persistent style/layout configurations
  const [textSizeClass, setTextSizeClass] = useState<'sm' | 'base' | 'lg' | 'xl'>(() => {
    return (localStorage.getItem('dewa_text_size') as any) || 'xl';
  });
  const [homeLayout, setHomeLayout] = useState<'standard' | 'grid' | 'compact' | 'masonry' | 'minimalist'>(() => {
    return (localStorage.getItem('dewa_home_layout') as any) || 'standard';
  });
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('dewa_theme_mode') as any) || 'light';
  });
  const [primaryColorTheme, setPrimaryColorTheme] = useState<'indigo' | 'emerald' | 'rose' | 'amber' | 'violet' | 'cyan' | 'teal' | 'crimson' | 'orange' | 'slate'>(() => {
    return (localStorage.getItem('dewa_primary_color') as any) || 'indigo';
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    return localStorage.getItem('dewa_notifications_enabled') !== 'false';
  });
  const [appLanguage, setAppLanguage] = useState<'ps' | 'en'>(() => {
    return (localStorage.getItem('dewa_app_language') as any) || 'ps';
  });

  // State and handles for our beautiful custom toast alerts and confirmation prompt sheets
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showClearCacheConfirm, setShowClearCacheConfirm] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const handlePerformClearCache = () => {
    localStorage.removeItem('dewa_cached_feed_data');
    setFeedData(null);
    setIsLoading(true);
    setIsSettingsPageOpen(false);
    setActiveModal(null);
    setShowClearCacheConfirm(false);
    showToast(appLanguage === 'en' ? 'App storage and cache cleared successfully!' : 'کاشه په بریالیتوب سره پاکه شوه او غوښتنلیک بیا فعاله شو!', 'success');
    fetchChannelData();
  };

  // Automatically clear toast alerts after a brief visual display duration
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // Genius Scroll Restoration Auto-Tracker & Restorer Hook
  const listScrollPosRef = useRef<number>(0);
  const prevInSubpageRef = useRef<boolean>(false);
  const isInSubpage = !!(selectedPost || isAboutPageOpen || isContactPageOpen || isSettingsPageOpen || isFullFeedOpen || isSearchOpen);

  useEffect(() => {
    if (isInSubpage && !prevInSubpageRef.current) {
      // Entering subpage detail view: store original scroll position of main lists
      listScrollPosRef.current = window.scrollY || document.documentElement.scrollTop;
    } else if (!isInSubpage && prevInSubpageRef.current) {
      // Returning to main listing: restore scroll position
      const savedPos = listScrollPosRef.current;
      setTimeout(() => {
        window.scrollTo({ top: savedPos, behavior: 'instant' });
      }, 70);
    }
    prevInSubpageRef.current = isInSubpage;
  }, [isInSubpage]);

  // Persists changes to local storage
  useEffect(() => {
    localStorage.setItem('dewa_text_size', textSizeClass);
  }, [textSizeClass]);

  useEffect(() => {
    localStorage.setItem('dewa_home_layout', homeLayout);
  }, [homeLayout]);

  useEffect(() => {
    localStorage.setItem('dewa_theme_mode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('dewa_primary_color', primaryColorTheme);
  }, [primaryColorTheme]);

  useEffect(() => {
    localStorage.setItem('dewa_notifications_enabled', String(notificationsEnabled));
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('dewa_app_language', appLanguage);
  }, [appLanguage]);

  // Global listener for hashtag clicks to trigger search from any component
  useEffect(() => {
    (window as any).handleHashtagClickGlobal = (tag: string) => {
      setSearchQuery(tag);
      setIsSearchOpen(true);
      setSelectedPost(null);
      setIsAboutPageOpen(false);
      setIsContactPageOpen(false);
      setIsSettingsPageOpen(false);
      setIsFullFeedOpen(false);
      setActiveModal(null);
    };
    return () => {
      delete (window as any).handleHashtagClickGlobal;
    };
  }, []);

  // States for loading older pages dynamically
  const [isScrapingMore, setIsScrapingMore] = useState(false);

  const loadMoreOlderPosts = async () => {
    if (isScrapingMore || !feedData || !feedData.posts || feedData.posts.length === 0) return;
    
    const ids = feedData.posts.map(p => parseInt(p.id)).filter(id => !isNaN(id));
    if (ids.length === 0) return;
    const minPostId = Math.min(...ids);
    
    setIsScrapingMore(true);
    console.log('[Dewa Paging] Loading older posts dynamically, before ID:', minPostId);

    const checkIsCapacitor = !!(window as any).Capacitor;
    const isMobileProtocol = window.location.protocol === 'file:' || window.location.protocol.startsWith('capacitor:');
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isMobileApp = checkIsCapacitor || isMobileProtocol || (isLocalhost && window.location.port !== '3000');

    const cleanBackendHost = backendHostInput.trim().replace(/\/+$/, '');
    const apiEndpoint = isMobileApp 
      ? `${cleanBackendHost}/api/telegram-feed?channel=${encodeURIComponent(targetChannelName)}&before=${minPostId}`
      : `/api/telegram-feed?channel=${encodeURIComponent(targetChannelName)}&before=${minPostId}`;

    let loadedPosts: TelegramPost[] = [];

    // Try API first
    try {
      const response = await dewaFetch(apiEndpoint, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data: FeedResponse = await response.json();
        if (data && data.posts && data.posts.length > 0) {
          loadedPosts = data.posts;
        }
      }
    } catch (err) {
      console.warn('[Dewa Paging] API dynamic page fetch failed, falling back to direct browser scraping...', err);
    }

    // Direct Scrape Fallback
    if (loadedPosts.length === 0) {
      try {
        const directUrl = `https://t.me/s/${targetChannelName}?before=${minPostId}`;
        const response = await dewaFetch(directUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          }
        });
        if (response.ok) {
          const htmlText = await response.text();
          const parsed = parseClientTelegramHtml(htmlText, targetChannelName);
          if (parsed && parsed.posts && parsed.posts.length > 0) {
            loadedPosts = parsed.posts;
          }
        }
      } catch (err) {
        console.error('[Dewa Paging] Direct scraper paging also failed:', err);
      }
    }

    if (loadedPosts.length > 0) {
      const existingIds = new Set(feedData.posts.map(p => p.id));
      const filteredNew = loadedPosts.filter(p => p && p.id && !existingIds.has(p.id));
      
      if (filteredNew.length > 0) {
        setFeedData(prev => {
          if (!prev) return prev;
          const combined = [...prev.posts, ...filteredNew];
          const sorted = combined.sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));
          return {
            ...prev,
            posts: sorted
          };
        });
        // Reveal next batch
        setVisibleFullCount(prev => prev + 5);
        console.log(`[Dewa Paging] Successfully loaded & merged ${filteredNew.length} older posts.`);
      } else {
        setVisibleFullCount(prev => prev + 5);
      }
    } else {
      setVisibleFullCount(prev => prev + 5);
    }

    setIsScrapingMore(false);
  };

  // Automated Infinite Scroll loading effect
  useEffect(() => {
    const sentinel = document.getElementById('infinite-scroll-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isScrapingMore && !isLoading) {
          const postsLength = feedData?.posts?.length || 0;
          if (postsLength > 0) {
            if (postsLength - visibleFullCount <= 5) {
              loadMoreOlderPosts();
            } else {
              setVisibleFullCount((prev) => prev + 5);
            }
          }
        }
      },
      { threshold: 0.05, rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isLoading, feedData, isFullFeedOpen, isScrapingMore, visibleFullCount]);

  // Contact simulated form states
  const [contactName, setContactName] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleSendTelegramContact = async () => {
    if (!contactName.trim() || !contactMsg.trim()) {
      setContactError('مهرباني وکړئ خپل نوم او پیغام دواړه ولیکئ.');
      return;
    }

    setContactSending(true);
    setContactError(null);

    try {
      const cleanHost = backendHostInput.trim();
      const fetchUrl = cleanHost 
        ? `${cleanHost}/api/send-contact-message` 
        : `/api/send-contact-message`;
      
      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: contactName,
          message: contactMsg
        })
      });

      let result: any = {};
      try {
        const textData = await response.text();
        result = JSON.parse(textData);
      } catch (jsonErr) {
        result = { message: `د سرور ځواب په لوستلو کې تېروتنه ایا انټرنیټ یا سرور بند دی؟ (کوډ: ${response.status})` };
      }

      if (!response.ok) {
        throw new Error(result.message || 'د پیغام په استولو کې د بګ تېروتنه رامنځه شوه.');
      }

      setContactSuccess(true);
      setContactName('');
      setContactMsg('');
    } catch (err: any) {
      console.error(err);
      setContactError(err.message || 'ستاسو د انټرنیټ اړیکې یا سرور پورې سرچینه بنده ده، مهرباني وکړئ وروسته بیا هڅه وکړئ.');
    } finally {
      setContactSending(false);
    }
  };

  const targetChannelName = 'da_mine_dewa';

  // Client-side HTML parsing fallback for direct public Telegram channels
  const parseClientTelegramHtml = (htmlText: string, channelName: string): FeedResponse => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // Extract Channel Metadata securely using OG protocol and fallbacks
    const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
    const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
    const ogDescription = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';

    const title = ogTitle || doc.querySelector('.tgme_channel_info_header_title')?.textContent?.trim() || 'د مینې ډېوه';
    const subscribers = doc.querySelector('.tgme_channel_info_counter')?.textContent?.trim() || 'عامه خپرونه';
    const description = ogDescription || doc.querySelector('.tgme_channel_info_description')?.textContent?.trim() || 'دا د مینې ډېوه رسمي خپرونه ده.';
    const avatarUrl = ogImage || doc.querySelector('.tgme_channel_info_header_img img')?.getAttribute('src') || 'https://telegram.org/img/t_logo.png';

    const posts: TelegramPost[] = [];
    const wrapElements = doc.querySelectorAll('.tgme_widget_message_wrap');

    wrapElements.forEach((wrap) => {
      const postEl = wrap.querySelector('.tgme_widget_message');
      if (!postEl) return;

      const dataPostAttr = postEl.getAttribute('data-post') || '';
      const parts = dataPostAttr.split('/');
      const postId = parts[parts.length - 1] || '';
      if (!postId) return;

      const postUrl = dataPostAttr ? `https://t.me/${dataPostAttr}` : `https://t.me/${channelName}`;

      // Views
      const views = postEl.querySelector('.tgme_widget_message_views')?.textContent?.trim() || '0';

      // Date
      const timeEl = postEl.querySelector('.tgme_widget_message_info time');
      const datetime = timeEl?.getAttribute('datetime') || '';
      const timeLabel = timeEl?.textContent?.trim() || 'وروستی';

      // Text / HTML Content
      const textEl = postEl.querySelector('.tgme_widget_message_text');
      const plainText = textEl?.textContent?.trim() || '';
      
      let parsedHtmlText = '';
      if (textEl) {
        // Safe sanitization and rewriting relative Telegram links in WebView
        const tempDiv = doc.createElement('div');
        tempDiv.innerHTML = textEl.innerHTML;
        tempDiv.querySelectorAll('a').forEach((anchor) => {
          const href = anchor.getAttribute('href');
          if (href && href.startsWith('/')) {
            anchor.setAttribute('href', `https://t.me${href}`);
            anchor.setAttribute('target', '_blank');
          }
        });
        parsedHtmlText = tempDiv.innerHTML;
      }

      // Photos
      let photoUrl = '';
      const photoUrls: string[] = [];
      const photoWraps = postEl.querySelectorAll('.tgme_widget_message_photo_wrap');
      photoWraps.forEach((photoWrap) => {
        const style = photoWrap.getAttribute('style') || '';
        const match = style.match(/background-image:\s*url\s*\(\s*['"]?([^'"]+)['"]?\s*\)/i);
        if (match && match[1]) {
          photoUrls.push(match[1]);
        }
      });
      if (photoUrls.length > 0) {
        photoUrl = photoUrls[0];
      }

      // Extract multiple Videos if any
      const videoList: { url: string; thumbUrl?: string }[] = [];
      const videoElements = postEl.querySelectorAll('.tgme_widget_message_video, .tgme_widget_message_video_player, video');
      
      const seenVideoUrls = new Set<string>();
      videoElements.forEach((videoWrap) => {
        let vUrl = '';
        let vThumb = '';
        if (videoWrap.tagName.toLowerCase() === 'video') {
          vUrl = videoWrap.getAttribute('src') || '';
        } else {
          vUrl = videoWrap.querySelector('video')?.getAttribute('src') || '';
        }
        
        const styleAttr = videoWrap.getAttribute('style') || '';
        const thumbMatch = styleAttr.match(/background-image:\s*url\s*\(\s*['"]?([^'"]+)['"]?\s*\)/i);
        if (thumbMatch && thumbMatch[1]) {
          vThumb = thumbMatch[1];
        }
        
        if (vUrl || vThumb) {
          const key = vUrl || vThumb;
          if (!seenVideoUrls.has(key)) {
            seenVideoUrls.add(key);
            videoList.push({ url: vUrl, thumbUrl: vThumb });
          }
        }
      });
      
      const hasVideo = videoList.length > 0;
      const videoUrl = videoList[0]?.url || '';
      const videoThumbUrl = videoList[0]?.thumbUrl || '';

      // Extract multiple Audios if any
      const audioList: { url: string; title: string; duration?: string }[] = [];
      const audioElements = postEl.querySelectorAll('.tgme_widget_message_voice, .tgme_widget_message_audio, .tgme_widget_message_audio_player');
      
      audioElements.forEach((audioWrap) => {
        const audioNode = audioWrap.querySelector('audio');
        const url = audioNode ? audioNode.getAttribute('src') || '' : '';
        if (url) {
          const voiceNameNode = audioWrap.querySelector('.tgme_widget_message_voice_name, .tgme_widget_message_audio_title, .tgme_widget_message_document_title');
          const title = voiceNameNode?.textContent?.trim() || 'غږیز فایل / پیغام';
          const voiceDurationNode = audioWrap.querySelector('.tgme_widget_message_voice_duration, .tgme_widget_message_audio_duration, .tgme_widget_message_document_extra');
          const duration = voiceDurationNode?.textContent?.trim() || '';
          audioList.push({ url, title, duration });
        }
      });
      
      if (audioList.length === 0) {
        postEl.querySelectorAll('audio').forEach((audioNode) => {
          const url = audioNode.getAttribute('src') || '';
          if (url) {
            audioList.push({ url, title: 'غږیز فایل / پیغام', duration: '' });
          }
        });
      }
      
      const hasAudio = audioList.length > 0;
      const audioUrl = audioList[0]?.url || '';
      const audioTitle = audioList[0]?.title || 'غږیز فایل / پیغام';
      const audioDuration = audioList[0]?.duration || '';

      // Extract multiple Files / Documents (excluding audio docs if they are already audio)
      const fileList: { fileName: string; fileSize?: string; url?: string; postUrl?: string }[] = [];
      const documentElements = postEl.querySelectorAll('.tgme_widget_message_document');
      
      documentElements.forEach((docNode) => {
        const isAudioDoc = !!docNode.querySelector('.tgme_widget_message_voice, .tgme_widget_message_audio');
        if (!isAudioDoc) {
          const fName = docNode.querySelector('.tgme_widget_message_document_title')?.textContent?.trim() || 'سند / فایل';
          const fSize = docNode.querySelector('.tgme_widget_message_document_extra')?.textContent?.trim() || '';
          fileList.push({ fileName: fName, fileSize: fSize, postUrl });
        }
      });
      
      const hasFile = fileList.length > 0;
      const fileName = fileList[0]?.fileName || 'سند / فایل';
      const fileSize = fileList[0]?.fileSize || '';

      // Inline Reactions
      const reactions: any[] = [];
      const reactionsContainer = postEl.querySelector('.tgme_widget_message_inline_reactions');
      if (reactionsContainer) {
        reactionsContainer.querySelectorAll('.tgme_widget_message_inline_reaction').forEach((reactEl) => {
          const emoji = reactEl.querySelector('.emoji, .tgme_widget_message_inline_reaction_emoji')?.textContent?.trim() || '';
          const count = reactEl.querySelector('.tgme_widget_message_inline_reaction_count')?.textContent?.trim() || '0';
          if (emoji) {
            reactions.push({ emoji, count });
          }
        });
      }

      // Link Previews
      let linkPreview: any = null;
      const preview = postEl.querySelector('.tgme_widget_message_link_preview');
      if (preview) {
        const siteName = preview.querySelector('.link_preview_site_name')?.textContent?.trim() || '';
        const previewTitle = preview.querySelector('.link_preview_title')?.textContent?.trim() || '';
        const previewDesc = preview.querySelector('.link_preview_description')?.textContent?.trim() || '';
        const previewUrl = preview.getAttribute('href') || '';
        
        let previewPhotoUrl = '';
        const previewPhoto = preview.querySelector('.link_preview_image, .link_preview_right_image');
        if (previewPhoto) {
          const style = previewPhoto.getAttribute('style') || '';
          const match = style.match(/background-image:\s*url\s*\(\s*['"]?([^'"]+)['"]?\s*\)/i);
          if (match && match[1]) {
            previewPhotoUrl = match[1];
          }
        }

        linkPreview = {
          siteName,
          title: previewTitle,
          description: previewDesc,
          url: previewUrl,
          photoUrl: previewPhotoUrl
        };
      }

      const authorName = postEl.querySelector('.tgme_widget_message_from_author')?.textContent?.trim() || postEl.querySelector('.tgme_widget_message_author')?.textContent?.trim() || '';

      if (plainText || photoUrl || hasVideo || hasAudio || hasFile) {
        posts.push({
          id: postId,
          postUrl,
          text: plainText,
          htmlText: parsedHtmlText,
          date: datetime,
          timeLabel,
          views,
          photoUrl,
          photoUrls,
          hasVideo,
          videoUrl,
          videoThumbUrl,
          hasAudio,
          audioUrl,
          audioTitle,
          audioDuration,
          audioList,
          hasFile,
          fileName,
          fileSize,
          fileList,
          videoList,
          reactions,
          linkPreview,
          authorName
        });
      }
    });

    return {
      channelInfo: {
        title,
        subscribers,
        description,
        avatarUrl,
        username: channelName
      },
      posts
    };
  };

  const dewaFetch = async (url: string, options: any = {}) => {
    const cap = (window as any).Capacitor;
    const hasCapacitorHttp = !!(cap && cap.Plugins && cap.Plugins.CapacitorHttp);
    
    if (hasCapacitorHttp) {
      console.log('[Dewa Fetch] Invoking native CapacitorHttp for URL:', url);
      try {
        const nativeResp = await cap.Plugins.CapacitorHttp.get({
          url: url,
          headers: options.headers || {},
          connectTimeout: 15000,
          readTimeout: 15000
        });
        
        // Emulate standard Fetch response interface
        const ok = nativeResp.status >= 200 && nativeResp.status < 300;
        return {
          ok,
          status: nativeResp.status,
          json: async () => {
            if (typeof nativeResp.data === 'string') {
              return JSON.parse(nativeResp.data);
            }
            return nativeResp.data;
          },
          text: async () => {
            if (typeof nativeResp.data === 'object') {
              return JSON.stringify(nativeResp.data);
            }
            return nativeResp.data || '';
          }
        };
      } catch (nativeErr: any) {
        console.error('[Dewa Fetch] Native CapacitorHttp failed:', nativeErr);
        // Fallback to regular fetch if native fails for some edge cases
      }
    }
    
    console.log('[Dewa Fetch] Using standard Web Fetch for URL:', url);
    return await fetch(url, options);
  };

  const saveAndNotifyFeedData = (newData: FeedResponse) => {
    try {
      const previousCached = localStorage.getItem('dewa_cached_feed_data');
      if (previousCached) {
        const prevObj = JSON.parse(previousCached);
        if (prevObj && prevObj.posts && prevObj.posts.length > 0 && newData.posts && newData.posts.length > 0) {
          const prevHighestId = Math.max(...prevObj.posts.map((p: any) => parseInt(p.id) || 0));
          const newHighestId = Math.max(...newData.posts.map((p: any) => parseInt(p.id) || 0));
          if (newHighestId > prevHighestId) {
            const latestPost = newData.posts.find((p: any) => (parseInt(p.id) || 0) === newHighestId);
            if (latestPost && notificationsEnabled) {
              setNewPostNotification(latestPost);
            }
          }
        }
      }
      localStorage.setItem('dewa_cached_feed_data', JSON.stringify(newData));
    } catch (e) {
      console.warn('[Dewa Cache] Failed to serialize feed data cache', e);
    }
    setFeedData(newData);
  };

  const fetchChannelData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setDiagnostics(null);

    // 1. Detect environment flags
    const checkIsCapacitor = !!(window as any).Capacitor;
    const capacitorPlatform = checkIsCapacitor ? ((window as any).Capacitor.getPlatform() || 'unknown') : 'none';
    const isMobileProtocol = window.location.protocol === 'file:' || window.location.protocol.startsWith('capacitor:');
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isMobileApp = checkIsCapacitor || isMobileProtocol || (isLocalhost && window.location.port !== '3000');

    // Stably resolve target server URLs
    // We point to our exact live cloud deployment where /api/telegram-feed scraping handles Cors + Cheerio beautifully
    const cleanBackendHost = backendHostInput.trim().replace(/\/+$/, '');
    const apiEndpoint = isMobileApp 
      ? `${cleanBackendHost}/api/telegram-feed?channel=${encodeURIComponent(targetChannelName)}`
      : `/api/telegram-feed?channel=${encodeURIComponent(targetChannelName)}`;

    let backendError: string | null = null;
    let directError: string | null = null;
    let usingFallback = false;

    // Method A: Query Backend Cloud Scraper API
    try {
      console.log(`[Dewa Feed] Attempting fetch via Backend API: ${apiEndpoint}`);
      
      const response = await dewaFetch(apiEndpoint, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`بیک اینډ سرور د ${response.status} خطا صادر کړه.`);
      }
      
      const data: FeedResponse = await response.json();
      if (!data || !data.posts || data.posts.length === 0) {
        throw new Error('سرور هیڅ پوسټونه راوانګیرل نه کړل (خالي ځواب).');
      }

      saveAndNotifyFeedData(data);
      console.log('[Dewa Feed] Data loaded successfully from remote API. (Cached)');
      return; // Success!
    } catch (err: any) {
      console.warn('[Dewa Feed] First request failed. Resorting to direct Telegram Scraper Fallback on-device...', err);
      backendError = err.message || String(err);
    }

    // Method B: Direct Fetch from Telegram with client-side DOM parsing (Perfect for CapacitorHttp bypass)
    try {
      usingFallback = true;
      const directUrl = `https://t.me/s/${targetChannelName}`;
      console.log(`[Dewa Feed] Attempting direct scrape from: ${directUrl}`);

      const response = await dewaFetch(directUrl, {
        headers: {
          // Send realistic headers simulating standard mobile safari or modern chrome browser
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          'Accept-Language': 'ps,en-US;q=0.9,en;q=0.8',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9'
        }
      });

      if (!response.ok) {
        throw new Error(`مستقیم ټلیګرام ویبپاڼې ته پیوستون رد شو (${response.status} خطا).`);
      }

      const htmlText = await response.text();
      if (!htmlText || !htmlText.includes('tgme_widget_message_wrap')) {
        throw new Error('ټلیګرام ویبپاڼې د ډېټا په لوډولو کې بېګانه خنډ جوړ کړ؛ مناسب معلومات کښته نشول.');
      }

      const parsedData = parseClientTelegramHtml(htmlText, targetChannelName);
      if (!parsedData || parsedData.posts.length === 0) {
        throw new Error('د ټلیګرام د مستقیم کود په پروسس کولو کې خطا رامنځته شوه (HTML parse returned no elements).');
      }

      // Try fetching older posts client-side in a dynamic loop to fetch up to 150 posts initially
      try {
        let currentPagingPosts = [...parsedData.posts];
        const uniqueIds = new Set(parsedData.posts.map(p => p.id));
        for (let pageIdx = 2; pageIdx <= 12; pageIdx++) {
          if (parsedData.posts.length >= 150) {
            break; // Stop client scraping once we have 150 posts initially
          }
          const postIdsNumeric = currentPagingPosts.map(p => parseInt(p.id)).filter(id => !isNaN(id));
          if (postIdsNumeric.length === 0) break;
          const minPostId = Math.min(...postIdsNumeric);
          const nextUrl = `https://t.me/s/${targetChannelName}?before=${minPostId}`;
          
          const responseN = await dewaFetch(nextUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
            }
          });
          if (!responseN.ok) break;
          const htmlTextN = await responseN.text();
          const parsedDataN = parseClientTelegramHtml(htmlTextN, targetChannelName);
          if (!parsedDataN || !parsedDataN.posts || parsedDataN.posts.length === 0) break;
          
          const filteredNew = parsedDataN.posts.filter(p => !uniqueIds.has(p.id));
          if (filteredNew.length === 0) break;
          
          filteredNew.forEach(p => uniqueIds.add(p.id));
          parsedData.posts.push(...filteredNew);
          currentPagingPosts = parsedDataN.posts;
        }
      } catch (colErr) {
        console.warn('[Dewa Feed] Direct client fallback paging failed but primary loaded ok', colErr);
      }

      // Sort posts latest first and limit to 150 initially
      parsedData.posts.sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));
      parsedData.posts = parsedData.posts.slice(0, 150);

      saveAndNotifyFeedData(parsedData);
      console.log('[Dewa Feed] Direct HTML scrape succeeded & formatted successfully on-client! (Cached)');
    } catch (err: any) {
      console.error('[Dewa Feed] Both methods in the connection pipeline have failed.', err);
      directError = err.message || String(err);

      // Save complete, precise diagnostic insights for debugging on the mobile display
      setDiagnostics({
        clientOrigin: window.location.origin,
        protocol: window.location.protocol,
        isCapacitor: checkIsCapacitor,
        capacitorPlatform,
        backendFetchError: backendError,
        directFetchError: directError,
        userAgent: navigator.userAgent,
        usingDirectFallback: usingFallback
      });

      // Relaxed offline mode handling: if we already have feedData loaded from local Cache, do not show block error screen
      const hasCached = localStorage.getItem('dewa_cached_feed_data');
      if (hasCached) {
        setErrorMsg(null);
      } else {
        setErrorMsg('شبکه وصل نشو');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `da_mine_dewa_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    fetchChannelData();
  }, []);

  // Web browser tab closing safety caution trigger
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = appLanguage === 'en' ? 'Are you sure you want to exit?' : 'ایا غواړئ چې له اپلیکیشن څخه ووځئ؟';
      return e.returnValue;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [appLanguage]);

  // Native back button listener integrated beautifully with routing and modals
  const handleExitApp = async () => {
    try {
      const { App: CapApp } = await import('@capacitor/app');
      CapApp.exitApp();
    } catch (err) {
      console.warn('Could not load @capacitor/app plugin, falling back:', err);
      setShowExitConfirmation(false);
    }
  };

  useEffect(() => {
    const isCap = !!(window as any).Capacitor;
    if (!isCap) return;

    let appListener: any = null;

    import('@capacitor/app').then(({ App: CapApp }) => {
      CapApp.addListener('backButton', ({ canGoBack }) => {
        if (zoomPhotoUrl) {
          setZoomPhotoUrl(null);
        } else if (activeModal) {
          setActiveModal(null);
        } else if (isSettingsPageOpen) {
          setIsSettingsPageOpen(false);
        } else if (isAboutPageOpen) {
          setIsAboutPageOpen(false);
        } else if (isContactPageOpen) {
          setIsContactPageOpen(false);
          setContactSuccess(false);
          setContactError(null);
        } else if (isSidebarOpen) {
          setIsSidebarOpen(false);
        } else if (selectedPost) {
          setSelectedPost(null);
        } else if (isFullFeedOpen) {
          setIsFullFeedOpen(false);
        } else if (isSearchOpen) {
          setIsSearchOpen(false);
          setSearchQuery('');
        } else if (showExitConfirmation) {
          setShowExitConfirmation(false);
        } else {
          setShowExitConfirmation(true);
        }
      }).then(listener => {
        appListener = listener;
      });
    }).catch(err => {
      console.warn('Could not load @capacitor/app plugin:', err);
    });

    return () => {
      if (appListener) {
        appListener.remove();
      }
    };
  }, [zoomPhotoUrl, activeModal, isSettingsPageOpen, isAboutPageOpen, isContactPageOpen, isSidebarOpen, selectedPost, isFullFeedOpen, isSearchOpen, showExitConfirmation]);

  // Dynamic status bar styling implementation matching current primary/theme modes
  useEffect(() => {
    const isCap = !!(window as any).Capacitor;
    if (!isCap) return;

    const headerBgColor = themeMode === 'dark' ? '#0f172a' : '#f8fafc';
    
    import('@capacitor/status-bar').then(({ StatusBar }) => {
      import('@capacitor/status-bar').then(({ Style }) => {
        StatusBar.setBackgroundColor({ color: headerBgColor })
          .catch(err => console.log('StatusBar setBG error:', err));
          
        StatusBar.setStyle({ style: themeMode === 'dark' ? Style.Dark : Style.Light })
          .catch(err => console.log('StatusBar setStyle error:', err));
      });
    }).catch(err => {
      console.warn('Could not load @capacitor/status-bar:', err);
    });
  }, [themeMode, primaryColorTheme]);

  useEffect(() => {
    // Increment progress bar over 5 seconds (5000ms)
    const intervalTime = 50; 
    const totalSteps = 5000 / intervalTime; // 100 steps
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / totalSteps) * 100, 100);
      setSplashProgress(progress);
      
      if (currentStep >= totalSteps) {
        clearInterval(progressInterval);
        setShowSplash(false);
        
        // After splash closes, check if welcome dialog should be shown
        const hasShown = localStorage.getItem('dewa_welcome_shown');
        if (!hasShown) {
          setShowWelcome(true);
        }
      }
    }, intervalTime);
    
    return () => clearInterval(progressInterval);
  }, []);

  // Dynamic filtering of all posts by search string, always sorted latest first
  const allPosts = feedData?.posts ? feedData.posts.filter(p => {
    if (!p) return false;
    const matchesSearch = !searchQuery || (p.text && p.text.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  }).sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0)) : [];

  // Slider featured posts (10 random posts from any category to keep it dynamic and fresh)
  const featuredPosts = React.useMemo(() => {
    if (!allPosts || allPosts.length === 0) return [];
    const shuffled = [...allPosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, [feedData?.posts]);

  // Home Page compact items filtered by category (exactly 30 posts max)
  const homePosts = React.useMemo(() => {
    if (selectedCategory === 'videos') {
      return allPosts.filter(p => !!p.hasVideo || !!p.videoUrl || !!p.videoThumbUrl);
    }
    if (selectedCategory === 'images') {
      return allPosts.filter(p => !!p.photoUrl || (p.photoUrls && p.photoUrls.length > 0));
    }
    if (selectedCategory === 'audio') {
      return allPosts.filter(p => !!p.hasAudio || !!p.audioUrl);
    }
    if (selectedCategory === 'pdf') {
      return allPosts.filter(p => getIsBook(p));
    }
    if (selectedCategory === 'writings') {
      return allPosts.filter(p => !p.hasVideo && !p.photoUrl && !(p.photoUrls && p.photoUrls.length > 0) && !p.hasAudio && !getIsBook(p));
    }
    return allPosts;
  }, [allPosts, selectedCategory]).slice(0, 30);

  // Full Feed Posts array (all posts loaded dynamically with matching category!)
  const fullFeedPosts = React.useMemo(() => {
    if (selectedCategory === 'videos') {
      return allPosts.filter(p => !!p.hasVideo || !!p.videoUrl || !!p.videoThumbUrl);
    }
    if (selectedCategory === 'images') {
      return allPosts.filter(p => !!p.photoUrl || (p.photoUrls && p.photoUrls.length > 0));
    }
    if (selectedCategory === 'audio') {
      return allPosts.filter(p => !!p.hasAudio || !!p.audioUrl);
    }
    if (selectedCategory === 'pdf') {
      return allPosts.filter(p => getIsBook(p));
    }
    if (selectedCategory === 'writings') {
      return allPosts.filter(p => !p.hasVideo && !p.photoUrl && !(p.photoUrls && p.photoUrls.length > 0) && !p.hasAudio && !getIsBook(p));
    }
    return allPosts;
  }, [allPosts, selectedCategory]);

  // Next/prev for slider
  const nextFeatured = () => {
    if (featuredPosts.length === 0) return;
    setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevFeatured = () => {
    if (featuredPosts.length === 0) return;
    setFeaturedIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  // Swipe mechanics for Featured Slider
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextFeatured();
    } else if (distance < -minSwipeDistance) {
      prevFeatured();
    }
  };

  useEffect(() => {
    if (featuredPosts.length === 0) return;
    const interval = setInterval(() => {
      nextFeatured();
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredPosts.length]);

  const translations: Record<string, any> = {
    ps: {
      settings: 'ترتیبات او سمونونه',
      homeLayout: 'د پاڼې لید ډیزاین (Home Layout)',
      themeMode: 'د اپلیکیشن بڼه (Theme Mode)',
      textColor: 'د متن اندازه (Font Size)',
      notifications: 'خبرتیاوې (Push Notifications)',
      language: 'اپلیکیشن ژبه (Language)',
      clearCache: 'لنډمهاله باک پاکول (Reset App)',
      clearCacheHelp: 'د لنډمهاله حافظې پاکول او د تنظیماتو پاڼې بیابارول.',
      clearCacheSuccess: 'کاشه په بریالیتوب سره پاکه شوه او ټول سټوریج ریسټ شو!',
      clearCacheBtn: 'کیچ خالي کړئ',
      colorThemes: 'رنګین ټیمونه (10 Color Themes)',
      dark: 'تیاره (Dark)',
      light: 'روښانه (Light)',
      back: 'رجوع (Back)',
      searchPlaceholder: 'د پوسټونو کتلو لپاره ولیکئ...',
      noRecentPosts: 'هیڅ وروستي معلومات ونه موندل شول.',
      loadMore: 'نور پوسټونه لوستل',
      standard: 'معیاري بڼه (Standard List)',
      grid: 'شبکه ډیزاین (Card Grid)',
      compact: 'ګڼه بڼه (Compact List)',
      masonry: 'جلا جلا کارډ (Masonry Cards)',
      minimalist: 'ساده توضیحات (Minimalist)',
      enabled: 'فعال دی',
      disabled: 'غیرفعال دی',
      pari: 'ثبتول',
      close: 'پټول / بند کړئ',
      errorReport: 'د نښلونې تحلیل وګورئ',
      welcomeTitle: 'رسمي اپلیکیشن ته ښه راغلاست!',
      welcomeMsg: 'دا مینه دیوه رسمي خپرونې خوندور اپلیکیشن ته ښه راغلاست. دلته به تاسو ته د کانال ټول علمي، ادبي او فکري پوسټونه، په خورا ښکلي او منظم ډیزاین کې وړاندې شي.',
      welcomeBtn: 'مننه، کارول پیل کړئ'
    },
    en: {
      settings: 'Settings & Controls',
      homeLayout: 'Home Layout Style',
      themeMode: 'App Theme Mode',
      textColor: 'Text Font Size',
      notifications: 'Push Notifications',
      language: 'App Language',
      clearCache: 'Clear Cache (Reset App)',
      clearCacheHelp: 'Clear temporary cache and restart application settings.',
      clearCacheSuccess: 'App storage and cache reset successfully!',
      clearCacheBtn: 'Clear Cache',
      colorThemes: '10 Color Themes',
      dark: 'Dark Mode',
      light: 'Light Mode',
      back: 'Back',
      searchPlaceholder: 'Search posts...',
      noRecentPosts: 'No recent posts found.',
      loadMore: 'Load More Posts',
      standard: 'Standard List',
      grid: 'Card Grid',
      compact: 'Compact List',
      masonry: 'Masonry Cards',
      minimalist: 'Minimalist Details',
      enabled: 'Enabled',
      disabled: 'Disabled',
      pari: 'Save',
      close: 'Close',
      errorReport: 'View Connection Diagnostics',
      welcomeTitle: 'Welcome to the Official App!',
      welcomeMsg: 'Welcome to the official app of Da Mine Dewa. Enjoy all literature, intellectual, and scientific posts beautifully formatted for you.',
      welcomeBtn: 'Thank you, Start using'
    }
  };

  const tr = translations[appLanguage] || translations.ps;

  const fs = {
    title: textSizeClass === 'sm' ? 'text-sm' : textSizeClass === 'base' ? 'text-base' : textSizeClass === 'lg' ? 'text-lg' : 'text-xl',
    body: textSizeClass === 'sm' ? 'text-[13.0px] sm:text-[14.0px]' : textSizeClass === 'base' ? 'text-[14.5px] sm:text-[15.5px]' : textSizeClass === 'lg' ? 'text-[16.5px] sm:text-[17.5px]' : 'text-[18.5px] sm:text-[20.0px]',
    desc: textSizeClass === 'sm' ? 'text-[11px]' : textSizeClass === 'base' ? 'text-[12px]' : textSizeClass === 'lg' ? 'text-[13.5px]' : 'text-[15px]'
  };

  const themeColorsMap: Record<string, {
    bg: string;
    hoverBg: string;
    activeBg: string;
    text: string;
    lightText: string;
    border: string;
    lightBorder: string;
    accentText: string;
    accentBg: string;
    accentRing: string;
    gradient: string;
    hex: string;
  }> = {
    indigo: {
      bg: 'bg-indigo-600',
      hoverBg: 'hover:bg-indigo-500',
      activeBg: 'active:bg-indigo-700',
      text: 'text-indigo-455',
      lightText: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-500',
      lightBorder: 'border-indigo-200 dark:border-indigo-900',
      accentText: 'text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300',
      accentBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      accentRing: 'focus:ring-indigo-500',
      gradient: 'from-indigo-600 to-violet-600',
      hex: '#4f46e5'
    },
    emerald: {
      bg: 'bg-emerald-600',
      hoverBg: 'hover:bg-emerald-500',
      activeBg: 'active:bg-emerald-700',
      text: 'text-emerald-455',
      lightText: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500',
      lightBorder: 'border-emerald-200 dark:border-emerald-950',
      accentText: 'text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300',
      accentBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      accentRing: 'focus:ring-emerald-500',
      gradient: 'from-emerald-600 to-teal-600',
      hex: '#10b981'
    },
    rose: {
      bg: 'bg-rose-600',
      hoverBg: 'hover:bg-rose-500',
      activeBg: 'active:bg-rose-700',
      text: 'text-rose-455',
      lightText: 'text-rose-600 dark:text-rose-400',
      border: 'border-rose-500',
      lightBorder: 'border-rose-200 dark:border-rose-950',
      accentText: 'text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300',
      accentBg: 'bg-rose-500/10 dark:bg-rose-500/15',
      accentRing: 'focus:ring-rose-500',
      gradient: 'from-rose-600 to-pink-600',
      hex: '#f43f5e'
    },
    amber: {
      bg: 'bg-amber-600',
      hoverBg: 'hover:bg-amber-500',
      activeBg: 'active:bg-amber-700',
      text: 'text-amber-455',
      lightText: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-500',
      lightBorder: 'border-amber-200 dark:border-amber-950',
      accentText: 'text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300',
      accentBg: 'bg-amber-500/10 dark:bg-amber-500/15',
      accentRing: 'focus:ring-amber-500',
      gradient: 'from-amber-600 to-yellow-600',
      hex: '#f59e0b'
    },
    violet: {
      bg: 'bg-violet-600',
      hoverBg: 'hover:bg-violet-500',
      activeBg: 'active:bg-violet-700',
      text: 'text-violet-455',
      lightText: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-500',
      lightBorder: 'border-violet-200 dark:border-violet-955',
      accentText: 'text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300',
      accentBg: 'bg-violet-500/10 dark:bg-violet-500/15',
      accentRing: 'focus:ring-violet-500',
      gradient: 'from-violet-600 to-fuchsia-600',
      hex: '#8b5cf6'
    },
    cyan: {
      bg: 'bg-cyan-600',
      hoverBg: 'hover:bg-cyan-500',
      activeBg: 'active:bg-cyan-700',
      text: 'text-cyan-455',
      lightText: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-500',
      lightBorder: 'border-cyan-200 dark:border-cyan-955',
      accentText: 'text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300',
      accentBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
      accentRing: 'focus:ring-cyan-500',
      gradient: 'from-cyan-600 to-sky-600',
      hex: '#06b6d4'
    },
    teal: {
      bg: 'bg-teal-600',
      hoverBg: 'hover:bg-teal-500',
      activeBg: 'active:bg-teal-700',
      text: 'text-teal-455',
      lightText: 'text-teal-600 dark:text-teal-400',
      border: 'border-teal-500',
      lightBorder: 'border-teal-200 dark:border-teal-955',
      accentText: 'text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300',
      accentBg: 'bg-teal-500/10 dark:bg-teal-500/15',
      accentRing: 'focus:ring-teal-500',
      gradient: 'from-teal-600 to-emerald-600',
      hex: '#14b8a6'
    },
    crimson: {
      bg: 'bg-red-655',
      hoverBg: 'hover:bg-red-555',
      activeBg: 'active:bg-red-755',
      text: 'text-red-455',
      lightText: 'text-red-650 dark:text-red-400',
      border: 'border-red-500',
      lightBorder: 'border-red-200 dark:border-red-955',
      accentText: 'text-red-555 hover:text-red-655 dark:text-red-400 dark:hover:text-red-300',
      accentBg: 'bg-red-500/10 dark:bg-red-500/15',
      accentRing: 'focus:ring-red-500',
      gradient: 'from-red-600 to-rose-755',
      hex: '#dc2626'
    },
    orange: {
      bg: 'bg-orange-600',
      hoverBg: 'hover:bg-orange-500',
      activeBg: 'active:bg-orange-700',
      text: 'text-orange-455',
      lightText: 'text-orange-650 dark:text-orange-400',
      border: 'border-orange-500',
      lightBorder: 'border-orange-200 dark:border-orange-955',
      accentText: 'text-orange-555 hover:text-orange-655 dark:text-orange-400 dark:hover:text-orange-300',
      accentBg: 'bg-orange-500/10 dark:bg-orange-500/15',
      accentRing: 'focus:ring-orange-500',
      gradient: 'from-orange-600 to-amber-500',
      hex: '#f97316'
    },
    slate: {
      bg: 'bg-slate-655',
      hoverBg: 'hover:bg-slate-555',
      activeBg: 'active:bg-slate-755',
      text: 'text-slate-400',
      lightText: 'text-slate-600 dark:text-slate-450',
      border: 'border-slate-500',
      lightBorder: 'border-slate-200 dark:border-slate-800',
      accentText: 'text-slate-555 hover:text-slate-655 dark:text-slate-400 dark:hover:text-slate-300',
      accentBg: 'bg-slate-555/10 dark:bg-slate-555/15',
      accentRing: 'focus:ring-slate-500',
      gradient: 'from-slate-600 to-zinc-650',
      hex: '#475569'
    }
  };

  const tc = themeColorsMap[primaryColorTheme] || themeColorsMap.indigo;

  // Let's dynamically establish core dark/light wrapper styles
  const isDark = themeMode === 'dark';
  const appBg = isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900';
  const headerBg = isDark ? 'bg-slate-900/95 border-slate-800/80 text-white' : 'bg-white/95 border-slate-200 text-slate-900';
  const sidebarBg = isDark ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200';
  const cardBg = isDark ? 'bg-slate-900/45 border-slate-850/30 hover:bg-slate-900/55' : 'bg-white border-transparent hover:bg-slate-100/80 shadow-md';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-550';
  const textSubtle = isDark ? 'text-slate-500' : 'text-slate-400';
  const subCardBg = isDark ? 'bg-slate-950/40 border-slate-900/40' : 'bg-slate-100/65 border-transparent';

  return (
    <div dir="rtl" className={`min-h-screen ${appBg} flex flex-col font-sans selection:bg-indigo-600/35 leading-normal transition-colors duration-200`}>
      
      {/* 1. TOP TOOLBAR (د چینل بار خوندور او پرمختللی ډیزاین) */}
      <header className={`sticky top-0 z-40 ${headerBg} backdrop-blur-md border-b py-4 px-4 sm:px-6 flex items-center justify-between shadow-lg`}>
        {/* Right side: Sidebar Hamburger Menu and Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{ cursor: 'pointer' }}
            className={`p-2 rounded-xl transition active:scale-95 shrink-0 ${isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-black'}`}
            title="تبصره او مینو"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="min-w-0 text-right">
            <h1 className={`text-sm sm:text-base font-bold truncate leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {selectedPost ? 'د پوسټ لوستل' : isAboutPageOpen ? 'زمونږ په اړه معلومات' : isContactPageOpen ? 'زمونږ سره اړیکه' : isSettingsPageOpen ? 'د اپلیکیشن تنظیمات' : isSearchOpen ? 'په پوسټونو کې پلټنه' : isFullFeedOpen ? 'ټول آرشیف پوسټونه' : (feedData?.channelInfo?.title || 'پښتو شعرونه')}
            </h1>
          </div>
        </div>

        {/* Left side: Back navigation actions and the Action popup */}
        <div className="flex items-center gap-2 relative">
          {(selectedPost || isAboutPageOpen || isContactPageOpen || isSettingsPageOpen || isFullFeedOpen || isSearchOpen) && (
            <button
              onClick={() => {
                setSelectedPost(null);
                setIsSettingsPageOpen(false);
                setIsAboutPageOpen(false);
                setIsContactPageOpen(false);
                setIsFullFeedOpen(false);
                setIsSearchOpen(false);
                setSearchQuery('');
                setContactSuccess(false);
                setContactError(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer' }}
              className={`px-3 py-1.5 ${tc.bg} ${tc.hoverBg} active:scale-95 rounded-lg text-xs font-bold text-white transition flex items-center gap-1.5 shrink-0`}
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>کورپاڼه</span>
            </button>
          )}

          {/* New Attractive Theme Switcher Option (ښکلی او جذاب تڼۍ د مېنو بار کې) */}
          <button
            onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
            style={{ cursor: 'pointer' }}
            className={`p-2 rounded-xl transition duration-300 relative flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95 ${
              isDark 
                ? 'bg-slate-800 text-amber-400 hover:bg-slate-750 hover:text-amber-300 shadow-lg shadow-amber-500/10 border border-slate-700/50' 
                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100/90 hover:text-indigo-700 shadow-md shadow-indigo-500/5 border border-indigo-100/50'
            }`}
            title={isDark ? 'روښانه بڼه' : 'تياره بڼه'}
          >
            <motion.div
              layout
              initial={false}
              animate={{ rotate: isDark ? 360 : 0, scale: 1 }}
              transition={{
                rotate: { type: 'spring', stiffness: 220, damping: 14 },
                scale: { type: 'spring', stiffness: 300, damping: 12 }
              }}
              className="flex items-center justify-center"
            >
              {isDark ? (
                <Sun className="w-5 h-5 fill-amber-400/20 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 fill-indigo-600/10 text-indigo-600" />
              )}
            </motion.div>
          </button>

          {/* Three-Dot Action Trigger */}
          <button
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            style={{ cursor: 'pointer' }}
            className={`p-2 rounded-xl transition duration-200 ${
              isPopupOpen ? 'bg-indigo-600 text-white' : (isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-800')
            }`}
            title="پلټنه او تازه کول"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {/* Popover Action Popup Dropdown */}
          <AnimatePresence>
            {isPopupOpen && (
              <>
                <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsPopupOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  className="absolute left-0 top-12 z-50 min-w-[210px] bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-2 flex flex-col gap-0.5 text-right"
                >
                  <button
                    onClick={() => {
                      setIsPopupOpen(false);
                      fetchChannelData();
                    }}
                    style={{ cursor: 'pointer' }}
                    className="w-full text-right px-4 py-2.5 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-200 hover:text-indigo-400 transition flex items-center justify-between gap-2"
                  >
                    <span>د معلوماتو تازه کول (ریفریش)</span>
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-indigo-400' : 'text-slate-400'}`} />
                  </button>

                  <button
                    onClick={() => {
                      setIsPopupOpen(false);
                      setIsSearchOpen(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                    className="w-full text-right px-4 py-2.5 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-200 hover:text-indigo-400 transition flex items-center justify-between gap-2"
                  >
                    <span>پلټنه (سرچ کول)</span>
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* 3. SIDEBAR DRAWER (د څنګ مینیو - پرمختللی او ښکلی ډیزاین) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className={`fixed right-0 top-0 bottom-0 w-72 sm:w-80 ${sidebarBg} border-l z-50 shadow-2xl flex flex-col justify-between text-right safe-sidebar-pt`}
            >
              {/* Sidebar Header */}
              <div className="p-5 border-b border-slate-800/10 dark:border-slate-800/60 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xs font-bold ${textMuted} tracking-wide uppercase font-sans`}>د اپلیکیشن برخې</h3>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    style={{ cursor: 'pointer' }}
                    className={`p-1.5 ${isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-650'} rounded-lg transition`}
                    title="تړل"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sidebar Content (عکس ➔ نوم ➔ بټنې) */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 text-right">
                
                {/* 1. د اپلیکیشن رسمي بڼه (بڼکه او پښتو شعرونه) */}
                <div className={`flex flex-col items-center text-center ${subCardBg} rounded-2xl p-5 border gap-2.5 shadow-sm`}>
                  <div className={`w-14 h-14 rounded-full ${isDark ? 'bg-indigo-550/10' : 'bg-indigo-600/10'} flex items-center justify-center border border-indigo-500/30`}>
                    <Feather className={`w-7 h-7 ${tc.text}`} />
                  </div>
                  <h4 className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight font-sans`}>
                    {appLanguage === 'en' ? 'Pashto Poetry' : 'پښتو شعرونه'}
                  </h4>
                </div>

                {/* د مینو بټنې */}
                <div className="flex flex-col gap-2 font-sans">
                  <p className={`text-[10px] ${textMuted} font-bold uppercase tracking-wider mb-1 px-1 text-right`}>مینو او کړنې</p>
                  
                  {/* ۱. تنظیمات */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setIsSettingsPageOpen(true);
                      setSelectedPost(null);
                      setIsFullFeedOpen(false);
                      setIsSearchOpen(false);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-200 text-slate-800'} rounded-xl text-xs font-semibold transition border flex items-center justify-start gap-2`}
                  >
                    <Settings className={`w-4 h-4 ${tc.text}`} />
                    <span>{tr.settings}</span>
                  </button>

                  {/* ۲. پلټنه */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setIsSearchOpen(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-200 text-slate-800'} rounded-xl text-xs font-semibold transition border flex items-center justify-start gap-2`}
                  >
                    <Search className={`w-4 h-4 ${tc.text}`} />
                    <span>پلټنه</span>
                  </button>

                  {/* ۳. زمونږ په اړه */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setIsAboutPageOpen(true);
                      setIsSettingsPageOpen(false);
                      setIsFullFeedOpen(false);
                      setIsSearchOpen(false);
                      setSelectedPost(null);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-200 text-slate-800'} rounded-xl text-xs font-semibold transition border flex items-center justify-start gap-2`}
                  >
                    <Info className={`w-4 h-4 ${tc.text}`} />
                    <span>زمونږ په اړه</span>
                  </button>

                  {/* ۴. زمونږ سره اړیکه */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setSelectedPost(null);
                      setIsSettingsPageOpen(false);
                      setIsAboutPageOpen(false);
                      setIsFullFeedOpen(false);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      setContactSuccess(false);
                      setContactError(null);
                      setIsContactPageOpen(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-200 text-slate-800'} rounded-xl text-xs font-semibold transition border flex items-center justify-start gap-2`}
                  >
                    <Mail className={`w-4 h-4 ${tc.text}`} />
                    <span>زمونږ سره اړیکه</span>
                  </button>

                  {/* ۵. د ټلیګرام چینل */}
                  <a
                    href={`https://t.me/${feedData?.channelInfo?.username || 'da_mine_dewa'}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-200 text-slate-800'} rounded-xl text-xs font-semibold transition border flex items-center justify-start gap-2`}
                  >
                    <Send className={`w-4 h-4 ${tc.text} -rotate-12`} />
                    <span>د ټلیګرام چینل</span>
                  </a>

                  {/* ۶. نور اپليکيشنونه */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setActiveModal('apps');
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-2.5 ${subCardBg} ${isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-200 text-slate-800'} rounded-xl text-xs font-semibold transition border flex items-center justify-start gap-2`}
                  >
                    <Grid className={`w-4 h-4 ${tc.text}`} />
                    <span>نور اپليکيشنونه</span>
                  </button>

                  {/* ۷. له اپلیکیشن څخه وتل */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setShowExitConfirmation(true);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-2.5 ${subCardBg} ${isDark ? 'hover:bg-slate-800 text-rose-450 border-rose-950/20' : 'hover:bg-slate-250 text-rose-600 border-rose-200'} rounded-xl text-xs font-semibold transition border flex items-center justify-start gap-2`}
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>له اپلیکیشن څخه وتل</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main View Area */}
      <main className="flex-1 max-w-[580px] w-full mx-auto px-4 py-6 flex flex-col gap-6">
        
        {/* Loader condition */}
        {isLoading && !feedData ? (
          <div className="space-y-5 w-full font-sans">
            {[1, 2, 3].map((n) => (
              <div 
                key={n} 
                className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900/35 border-slate-850/40' : 'bg-white border-slate-100 shadow-sm'} animate-pulse flex flex-col gap-3.5 text-right`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800/40 dark:bg-slate-700/30 shrink-0" />
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="h-3 w-28 bg-slate-800/50 dark:bg-slate-700/40 rounded-full" />
                    <div className="h-2 w-14 bg-slate-850/40 dark:bg-slate-800/30 rounded-full" />
                  </div>
                </div>
                <div className="h-44 w-full bg-slate-800/40 dark:bg-slate-700/30 rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-3.5 w-full bg-slate-800/40 dark:bg-slate-700/30 rounded-full" />
                  <div className="h-3.5 w-11/12 bg-slate-800/40 dark:bg-slate-700/30 rounded-full" />
                  <div className="h-3 w-3/4 bg-slate-805/35 dark:bg-slate-705/25 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : errorMsg ? (
          <div className="bg-rose-550/15 border border-rose-500/25 rounded-2xl p-6 text-center text-slate-300 space-y-4 text-right flex flex-col items-center shadow-lg">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <div className="text-center w-full">
              <h3 className="text-sm font-bold text-white">شبکه وصل نشو</h3>
              <p className="text-xs text-slate-400 mt-1">
                {appLanguage === 'en' ? 'Network could not connect. Please check your internet connection.' : 'شبکه وصل نشو. مهرباني وکړئ د خپل انټرنیټ اړیکه وګورئ او بیا هڅه وکړئ.'}
              </p>
            </div>
            
            <button
              onClick={fetchChannelData}
              style={{ cursor: 'pointer' }}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-550 active:scale-95 text-white bg-red shadow-lg shadow-rose-600/30 rounded-xl text-xs font-semibold cursor-pointer transition shrink-0"
            >
              {appLanguage === 'en' ? 'Retry Connection' : 'بیا پیوستون هڅه وکړئ'}
            </button>

            {diagnostics && (
              <div className="w-full border-t border-slate-800/80 pt-4 mt-2">
                <button
                  onClick={() => setShowDiagnostics(!showDiagnostics)}
                  className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white transition focus:outline-none cursor-pointer"
                >
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-indigo-400 font-mono">
                    {showDiagnostics ? 'پټول' : 'د نښلونې تحلیل وګورئ'}
                  </span>
                  <span className="font-semibold text-[11px] font-sans">تخنیکي معلومات او د تېروتنې تشخیصیې</span>
                </button>

                {showDiagnostics && (
                  <div className="mt-3 bg-slate-950 p-4 rounded-xl text-right overflow-x-auto space-y-3.5 border border-slate-800/40 text-xs">
                    <div>
                      <span className="text-indigo-450 font-bold block mb-1">کاري چاپیریال (Environment):</span>
                      <ul className="space-y-1 list-disc list-inside text-rose-50 pr-2 leading-relaxed">
                        <li>پلیټ فارم: <span className="font-mono bg-slate-900 px-1 py-0.5 rounded text-emerald-400 font-bold">{diagnostics.isCapacitor ? `Capacitor (${diagnostics.capacitorPlatform})` : 'ویب براوزر (SPA)'}</span></li>
                        <li>پروتوکول / ادرس: <span className="font-mono text-slate-400">{diagnostics.protocol} ({diagnostics.clientOrigin})</span></li>
                        <li>د وسیلې کتونکی (User-Agent): <span className="font-mono text-[10px] text-slate-500 break-all">{diagnostics.userAgent}</span></li>
                      </ul>
                    </div>

                    <div className="border-t border-slate-900 pt-3">
                      <span className="text-amber-400 font-bold block mb-1 font-sans text-xs">د سرور آدرس ایډیټ کړئ (Backend Host):</span>
                      <div className="flex gap-1.5 ltr mt-1.5 justify-end">
                        <button
                          onClick={() => {
                            localStorage.setItem('dewa_custom_backend_host', backendHostInput);
                            alert('د سرور نوی آدرس په بریالیتوب سره ثبت شو؛ اوس د بیا بارولو تڼۍ کېکاږئ!');
                          }}
                          style={{ cursor: 'pointer' }}
                          className="bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 rounded-lg text-white font-bold text-[10.5px] cursor-pointer shrink-0 transition"
                        >
                          ثبتول
                        </button>
                        <input
                          type="text"
                          value={backendHostInput}
                          onChange={(e) => setBackendHostInput(e.target.value)}
                          placeholder="https://your-backend-server.com"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg text-slate-100 px-2 py-1.5 text-[11px] ltr outline-none focus:border-indigo-500"
                        />
                      </div>
                      <p className="text-[9.5px] text-slate-450 mt-1 rtl text-right leading-relaxed font-sans">تاسو کولی شئ پورته خپل نوی د بیک انډ سرور (Cloud Run یا محلي IP ادرس) ولیکئ او بیا خوندي کړئ.</p>
                    </div>

                    <div className="border-t border-slate-900 pt-2.5">
                      <span className="text-indigo-400 font-bold block mb-1">د اتصالاتو د تېروتنې راپور (Fetch Errors):</span>
                      <div className="space-y-2 font-mono text-[11px] bg-slate-900/40 p-2.5 rounded border border-slate-850/50">
                        <p className="text-slate-400">
                          <strong className="text-rose-400 pr-1">[1. بیک اینډ اتصال]:</strong> 
                          <span className="text-rose-300 break-all block mt-0.5">{diagnostics.backendFetchError || 'تېروتنه نشته'}</span>
                        </p>
                        <p className="text-slate-400 border-t border-slate-900 pt-1.5 mt-1.5">
                          <strong className="text-rose-400 pr-1">[2. مستقیم ټلیګرام فیچ]:</strong> 
                          <span className="text-rose-300 break-all block mt-0.5">{diagnostics.directFetchError || 'تېروتنه نشته'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-2.5 text-right font-sans">
                      <span className="text-emerald-400 font-bold block mb-1.5">د موبایل اپلیکیشن د جوړولو سپارښتنې (Capacitor Fix):</span>
                      <ol className="space-y-1.5 text-slate-350 pr-2 leading-relaxed list-decimal">
                        <li>ډاډ ترلاسه کړئ په <span className="font-mono text-yellow-500">AndroidManifest.xml</span> کې د انټرنیټ جواز شتون لري: <br />
                          <code className="text-[10px] bg-slate-900 p-1.5 rounded font-mono text-indigo-400 text-left block ltr mt-1 break-all select-all">{"<uses-permission android:name=\"android.permission.INTERNET\" />"}</code>
                        </li>
                        <li>د <span className="font-mono text-yellow-500">capacitor.config.json</span> په برخه کې د <span className="font-mono">CapacitorHttp</span> فعالول: <br />
                          <code className="text-[10px] bg-slate-900 p-1.5 rounded font-mono text-indigo-400 text-left block ltr mt-1 break-all select-all">{"\"CapacitorHttp\": { \"enabled\": true }"}</code>
                        </li>
                        <li>که مستقیم ټلیګرام فیچ کې لا ستونزه وي، نو ډاډ ترلاسه کړئ چې د Android شبکه کې غیر ایس ایس ایل / د خوندي غوښتنو خنډ پاک دی.</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : selectedPost ? (
          
          /* ==========================================================
             C. READING PAGE FOR SINGLE POST (د لوستلو صفحه)
             ========================================================== */
          <article className={`${isDark ? 'bg-slate-900/60 border-slate-800/85' : 'bg-white border-slate-200 shadow-xl'} rounded-2xl overflow-hidden border flex flex-col animate-fade-in`}>
            {/* Header / Back action */}
            <div className={`px-4 py-3 ${isDark ? 'bg-slate-950/80 border-slate-850' : 'bg-slate-50 border-slate-200'} border-b flex items-center justify-between`}>
              <button
                onClick={() => setSelectedPost(null)}
                style={{ cursor: 'pointer' }}
                className={`text-xs ${tc.text} font-bold flex items-center gap-1`}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>شاته کورپاڼې ته</span>
              </button>
              <span className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-600'} font-semibold`}>پوسټ #{selectedPost.id}</span>
            </div>

            {/* Media on Top (عکس یا ویډیو وي) */}
            {selectedPost.videoList && selectedPost.videoList.length > 0 ? (
              <div className="flex flex-col gap-3.5 w-full border-b border-slate-850 p-3 bg-black">
                {selectedPost.videoList.map((videoItem, idx) => (
                  <div key={idx} className="relative bg-black flex flex-col items-center w-full p-1 border border-slate-805 rounded-xl overflow-hidden max-w-md mx-auto">
                    <BeautifulVideoPlayer
                      url={videoItem.url}
                      poster={videoItem.thumbUrl || selectedPost.photoUrl || undefined}
                      isDark={isDark}
                      tc={tc}
                    />
                    {selectedPost.videoList!.length > 1 && (
                      <span className="text-[10px] text-slate-400 mt-1.5 font-mono select-none">د ويډيو فایل #{idx + 1}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : selectedPost.hasVideo && selectedPost.videoUrl ? (
              <div className="relative bg-black flex flex-col items-center border-b border-slate-850 w-full p-3">
                <BeautifulVideoPlayer
                  url={selectedPost.videoUrl}
                  poster={selectedPost.videoThumbUrl || selectedPost.photoUrl || undefined}
                  isDark={isDark}
                  tc={tc}
                />
              </div>
            ) : (selectedPost.photoUrls && selectedPost.photoUrls.length > 1) ? (
              <div className={`relative ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-205'} border-b p-4`}>
                <div className={`grid gap-2.5 ${
                  selectedPost.photoUrls.length === 2 ? 'grid-cols-2' : 
                  selectedPost.photoUrls.length === 3 ? 'grid-cols-3' : 
                  'grid-cols-2 sm:grid-cols-3'
                }`}>
                  {selectedPost.photoUrls.map((url, idx) => (
                    <div key={idx} className={`relative group overflow-hidden rounded-xl aspect-square border ${isDark ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-200'}`}>
                      <img
                        src={url}
                        referrerPolicy="no-referrer"
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition duration-300"
                        onClick={() => {
                          openPhotoLightbox(url, selectedPost.photoUrls);
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadImage(url);
                        }}
                        style={{ cursor: 'pointer' }}
                        className="absolute bottom-2 right-2 bg-slate-950/80 hover:bg-indigo-600 p-1.5 rounded-lg text-white transition active:scale-95 shadow-sm opacity-0 group-hover:opacity-100 duration-200"
                        title="ډاونلوډ"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-2.5 text-center select-none font-sans`}>
                  د زوم کولو لپاره په هر عکس کلیک وکړئ • ټول {selectedPost.photoUrls.length} انځورونه
                </div>
              </div>
            ) : selectedPost.photoUrl ? (
              <div className={`relative ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-205'} flex flex-col items-center border-b`}>
                <img
                  src={selectedPost.photoUrl || null}
                  referrerPolicy="no-referrer"
                  alt="Reading visual"
                  className="w-full max-h-[380px] object-contain cursor-zoom-in hover:opacity-90 transition duration-200"
                  onClick={() => {
                    openPhotoLightbox(selectedPost.photoUrl!, [selectedPost.photoUrl!]);
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                
                {/* د عکس په صفحه کې د عکس دانلود او زوم ښودلو بټن زیاتول */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center gap-2">
                  <div className="text-[10px] text-slate-400 bg-slate-950/70 py-1 px-2 rounded-lg backdrop-blur-xs select-none font-sans">
                    د زوم کولو لپاره په عکس کلیک وکړئ
                  </div>
                  <button
                    onClick={() => handleDownloadImage(selectedPost.photoUrl!)}
                    style={{ cursor: 'pointer' }}
                    className="bg-indigo-600 hover:bg-indigo-505 active:scale-95 text-white rounded-xl py-2 px-3 text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/40 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>انځور ډاونلوډ کړئ</span>
                  </button>
                </div>
              </div>
            ) : null}

            {/* Content Text Below */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono select-none">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>{selectedPost.timeLabel || 'وروستی'}</span>
                </div>
                
                {/* Indicator badge for content elements */}
                <div className="flex items-center gap-1.5">
                  {selectedPost.hasVideo && (
                    <span className="bg-indigo-600/10 text-indigo-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/10">ویډیو</span>
                  )}
                </div>
              </div>

              {selectedPost.htmlText ? (
                <div
                  className={`${isDark ? 'text-slate-200' : 'text-slate-800 font-medium'} text-[15.5px] sm:text-[17px] leading-[1.85] sm:leading-[1.95] space-y-2.5 font-sans break-words telegram-styles text-right pr-1`}
                  dangerouslySetInnerHTML={{ __html: makeHtmlHashtagsClickable(selectedPost.htmlText) }}
                />
              ) : (
                <BeautifulTelegramText 
                  text={selectedPost.text} 
                  isDark={isDark} 
                  fs={{ body: 'text-[15.5px] sm:text-[17px]' }} 
                  limitLines={250} 
                  showExpander={false}
                />
              )}

              {/* Audio player in detailed post view (if any) */}
              {selectedPost.audioList && selectedPost.audioList.length > 0 ? (
                <div className="space-y-3">
                  {selectedPost.audioList.map((audioItem, idx) => (
                    <BeautifulAudioPlayer key={idx} url={audioItem.url} title={audioItem.title || 'غږیز فایل'} isDark={isDark} tc={tc} />
                  ))}
                </div>
              ) : null}

              {/* Link preview rendering under post body text */}
              {selectedPost.linkPreview ? (
                <a
                  href={selectedPost.linkPreview.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`block border rounded-xl overflow-hidden ${isDark ? 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-950/70' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'} transition p-3 mt-3`}
                >
                  <div className="flex items-center gap-3 text-right font-sans">
                    {selectedPost.linkPreview.thumbUrl && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                        <img 
                          src={selectedPost.linkPreview.thumbUrl} 
                          referrerPolicy="no-referrer"
                          alt="preview mini thumb" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      {selectedPost.linkPreview.siteName && (
                        <span className="text-[10px] text-indigo-400 font-mono uppercase font-bold tracking-wider">
                          {selectedPost.linkPreview.siteName}
                        </span>
                      )}
                      <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} truncate mt-0.5`}>
                        {selectedPost.linkPreview.title}
                      </h4>
                      <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} line-clamp-1 mt-0.5`}>
                        {selectedPost.linkPreview.description}
                      </p>
                    </div>
                  </div>
                </a>
              ) : extractUrl(selectedPost.text || '') ? (
                <CustomLinkPreview url={extractUrl(selectedPost.text || '')!} isDark={isDark} />
              ) : null}

              {/* Copy & Share Action Buttons Row */}
              {selectedPost.text && selectedPost.text.trim() !== '' && (
                <div className={`flex flex-col sm:flex-row gap-2.5 pt-3.5 border-t ${isDark ? 'border-slate-800/40' : 'border-slate-205'} justify-start`}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedPost.text || '');
                      showToast('متن په برياليتوب سره کاپي شو! 📋', 'success');
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`flex-1 py-3 px-4 ${isDark ? 'bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-900' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-750'} border rounded-xl text-xs font-bold transition active:scale-95 flex items-center justify-center gap-2 shadow-xs group`}
                  >
                    <Copy className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition" />
                    <span>متن کاپي کړئ (Copy)</span>
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'د مینې ډېوه',
                          text: selectedPost.text || '',
                          url: window.location.href,
                        }).catch((err) => console.log(err));
                      } else {
                        navigator.clipboard.writeText(`${selectedPost.text || ''}\n\nدا پيغام د پښتو شعرونو او ادب د اپليکيشن څخه شريک شو.`);
                        showToast('ستاسو سیسټم د مستقیم شریکولو ملاتړ نه کوي؛ پیغام کاپي شو! 📋', 'info');
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`flex-1 py-3 px-4 ${tc.bg} ${tc.hoverBg} rounded-xl text-xs font-bold text-white transition active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 group`}
                  >
                    <Share2 className="w-4 h-4 text-indigo-100 group-hover:scale-110 transition" />
                    <span>پیغام شریک کړئ (Share)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Dynamic Telegram Reactions Block (ايموجي ريکشن شمير د ټلیګرام په شان) */}
            {selectedPost.reactions && selectedPost.reactions.length > 0 && (
              <div className={`flex flex-wrap gap-1.5 pt-3.5 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'} justify-start px-5 sm:px-6 pb-4`}>
                {selectedPost.reactions.map((react, i) => (
                  <div
                    key={i}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 ${isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'} rounded-full border text-xs select-none`}
                  >
                    <span className="text-sm">{react.emoji}</span>
                    <span className={`font-mono text-[9px] ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold`}>{react.count}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer metadata counter */}
            <div className={`px-5 py-3.5 ${isDark ? 'bg-slate-950/40 border-slate-900 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'} border-t text-xs flex items-center justify-between`}>
              <span className="flex items-center gap-1.5 font-mono">
                <Eye className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                <span>{selectedPost.views || '0'} كتنې</span>
              </span>
              <span className={`text-[11.5px] font-sans ${isDark ? 'text-slate-300' : 'text-slate-800'} font-semibold`}>
                {selectedPost.authorName ? `خپرونکی: ${selectedPost.authorName}` : 'د مینې ډېوه خپرونه'}
              </span>
            </div>
          </article>
        ) : isAboutPageOpen ? (
          /* ==========================================================
             D. ABOUT ME SCREEN (د موږ په اړه ځانګړې صفحه)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right">
            <div className={`p-5 sm:p-6 rounded-3xl ${cardBg} border border-slate-500/10 dark:border-slate-800 overflow-hidden shadow-xl text-right`}>
              <div className={`px-5 py-4 ${isDark ? 'bg-slate-950/70 border-slate-800/20' : 'bg-slate-100/90 border-slate-200'} border-b flex items-center justify-between rounded-t-3xl -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5`}>
                <button
                  onClick={() => setIsAboutPageOpen(false)}
                  style={{ cursor: 'pointer' }}
                  className={`px-3 py-1.5 rounded-lg transition text-xs font-bold ${isDark ? 'text-slate-400 bg-slate-800 hover:text-white' : 'text-slate-700 bg-slate-200 hover:bg-slate-300'} flex items-center gap-1 shrink-0`}
                  title="شاته"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>کورپاڼه</span>
                </button>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${tc.text}`} />
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    زموږ په اړه
                  </span>
                </div>
              </div>

              {/* High-quality profile header card */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-900 p-6 flex flex-col items-center text-center gap-4 shadow-md">
                <div className={`absolute inset-0 bg-gradient-to-r ${tc.gradient} opacity-20`} />
                <div className="relative w-23 h-23 rounded-full border-2 border-indigo-500/40 p-1 flex items-center justify-center bg-slate-950 overflow-hidden shadow-inner shrink-0">
                  <div className={`w-full h-full rounded-full bg-gradient-to-tr ${tc.gradient} flex items-center justify-center`}>
                    <User className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="relative z-10 w-full font-sans">
                  <h3 className="text-base font-black text-white tracking-tight">عبیدالله غفاري (Obaidullah Ghaffari)</h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">طالب العلم • د علم، مطالعې او ټکنالوژۍ مینهوال</p>
                </div>

                {/* Direct quick action contacts on about page */}
                <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 w-full mt-2">
                  <a
                    href="https://wa.me/93779705897"
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-3 bg-emerald-600/90 hover:bg-emerald-600 border border-emerald-500 text-white rounded-lg text-[10.5px] font-bold transition flex items-center gap-1 shadow-sm font-sans"
                  >
                    <Phone className="w-3.5 h-3.5 text-white" />
                    <span>واټساپ اړیکه (+93779705897)</span>
                  </a>
                  <a
                    href="mailto:obaidkhanghafari@gmail.com"
                    className="py-1.5 px-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white rounded-lg text-[10.5px] font-bold transition flex items-center gap-1 shadow-sm font-sans"
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-400" />
                    <span>obaidkhanghafari@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Developer full characteristics and biographies */}
              <div className="space-y-4 mt-5 font-sans text-right">
                <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-3`}>
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                    <span className="text-xs">پېژندنه او زده کړې</span>
                    <User className="w-4 h-4" />
                  </div>
                  <p className={`text-[11.5px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-[1.8]`}>
                    زه <strong>عبیدالله غفاري</strong> یم، د جهادي مدرسې د اوومې درجې طالب العلم او د علم، مطالعې او ټکنالوژۍ مینهوال. زما هڅه دا ده چې د اسلامي ارزښتونو، ګټورو معلوماتو او مثبتو افکارو د خپرولو لپاره له عصري وسایلو او ټکنالوژۍ څخه ګټه واخلم.
                  </p>
                  <p className={`text-[11.5px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-[1.8]`}>
                    ځان د ټول عمر زده کوونکی ګڼم او باور لرم چې علم د انسان د پرمختګ او نېکمرغۍ تر ټولو ستره وسیله ده. له دیني زده کړو سره سره د کمپیوټر، ویبپاڼو، مصنوعي ځیرکتیا (AI)، لیکوالۍ او ډیجیټلي نړۍ په اړه هم زده کړې او تجربې ترلاسه کوم.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-2`}>
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                    <span className="text-xs">زما اساسي هدفونه</span>
                    <Rocket className="w-4 h-4" />
                  </div>
                  <p className={`text-[11.5px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-[1.8]`}>
                    زما موخه د اسلام خدمت، د ګټورې پوهې خپرول او د داسې محتوا وړاندې کول دي چې د خلکو لپاره د خیر، پوهې او مثبت بدلون سبب شي. هڅه کوم چې د خپلو وړتیاوو او امکاناتو په اندازه د اسلامي او تعلیمي خدمتونو په برخه کې اغېزمن رول ولرم.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-2`}>
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                    <span className="text-xs">خوښې برخه او بوختیاوې</span>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <p className={`text-[11.5px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-[1.8]`}>
                    مطالعه، لیکوالي، د نوو مهارتونو زده کړه، د ګټورو پروژو جوړول او د وخت اغېزمنه ګټه اخیستنه زما له خوښیو څخه دي. باور لرم چې اخلاص، دوامداره زده کړه او نېک نیت د هر بریالي کار بنسټ جوړوي.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border-2 border-emerald-500/20 bg-emerald-500/5 space-y-2`}>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                    <span className="text-xs">زما شعار</span>
                    <span className="text-base">🌿📖</span>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-emerald-300' : 'text-emerald-850'} leading-relaxed font-black text-center py-1`}>
                    "غوره انسان هغه دی چې خلکو ته ډېر ګټور وي." 🌿📖
                  </p>
                </div>

                <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-2`}>
                  <div className="flex items-center gap-1.5 text-teal-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                    <span className="text-xs">د اپلیکیشن کلتوري اسانتیاوې</span>
                    <Check className="w-4 h-4" />
                  </div>
                  <ul className="space-y-2 text-[11px] text-slate-400 font-sans mt-2 pr-1 leading-relaxed">
                    <li className="flex items-start gap-2 justify-start">
                      <Check className={`w-3.5 h-3.5 ${tc.text} mt-0.5 shrink-0`} />
                      <span>د انټرنیټ غوښتنو پرمختللی شیمر لوډر اغېزه د چټک غبرګون لپاره.</span>
                    </li>
                    <li className="flex items-start gap-2 justify-start">
                      <Check className={`w-3.5 h-3.5 ${tc.text} mt-0.5 shrink-0`} />
                      <span>د کورپاڼې د غوره فیچر سلایډر کنټرول د غاړې تڼیو او پرمختللي لاس اشارې وسيلې (Swipe) په واسطه.</span>
                    </li>
                    <li className="flex items-start gap-2 justify-start">
                      <Check className={`w-3.5 h-3.5 ${tc.text} mt-0.5 shrink-0`} />
                      <span>بشپړ کنټرول مینو او د روښانه او تیاره بڼو پرمختللی تطبیق په پښتني رنګونو کې.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Developer Credits Card */}
              <div className={`mt-6 p-4 rounded-2xl ${subCardBg} border border-slate-500/5 flex flex-col gap-2.5 text-right font-sans`}>
                <span className={`text-[9.5px] ${tc.text} font-black uppercase tracking-wider block`}>د اړیکو بله پاڼه او کلتوري ډالۍ</span>
                <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-655'} leading-relaxed`}>
                  تاسو کولی شئ د هر ډول رغنده وړاندیز, نوښت او خپلو شعرونو د کتنې او اضافه کولو د بډاینې لپاره لاندې رسمي لینک سره اړیکه ونیسئ.
                </p>
                <a
                  href="mailto:poetry.pashto@dewa-design.one"
                  className={`inline-flex items-center gap-1.5 self-start text-[10px] font-black ${tc.text} hover:underline mt-1`}
                >
                  <span>poetry.pashto@dewa-design.one</span>
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ) : isContactPageOpen ? (
          /* ==========================================================
             D2. CONTACT ME SCREEN (د اړیکې بېله او ځانګړې نوې صفحه الوتکې سره)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right">
            <div className={`p-5 sm:p-6 rounded-3xl ${cardBg} border border-slate-500/10 dark:border-slate-800 overflow-hidden shadow-xl text-right`}>
              <div className={`px-5 py-4 ${isDark ? 'bg-slate-950/70 border-slate-800/20' : 'bg-slate-100/90 border-slate-200'} border-b flex items-center justify-between rounded-t-3xl -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5`}>
                <button
                  onClick={() => setIsContactPageOpen(false)}
                  style={{ cursor: 'pointer' }}
                  className={`px-3 py-1.5 rounded-lg transition text-xs font-bold ${isDark ? 'text-slate-400 bg-slate-800 hover:text-white' : 'text-slate-700 bg-slate-200 hover:bg-slate-300'} flex items-center gap-1 shrink-0`}
                  title="شاته"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>کورپاڼه</span>
                </button>
                <div className="flex items-center gap-2">
                  <Mail className={`w-4 h-4 ${tc.text}`} />
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    رابطه او د ټلیګرام روباټ له لارې پیغام لیږل
                  </span>
                </div>
              </div>

              {contactSuccess ? (
                <div className="text-center py-10 space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="text-sm font-black text-emerald-500 dark:text-emerald-400">ستاسو پیغام واستول شو!</h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    ستاسو لیکنه د ټلیګرام د اډمین روباټ ته په مستقیم او خوندي ډول واستول شوه. اډمین به ډیر ژر ستاسو پېغام ولولي او ځواب کړي. مننه له همکارۍ مو!
                  </p>
                  <button
                    onClick={() => {
                      setContactSuccess(false);
                      setContactName('');
                      setContactMsg('');
                      setContactError(null);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`px-8 py-3 ${tc.bg} ${tc.hoverBg} text-white rounded-xl text-xs font-black transition shadow-lg inline-flex items-center gap-1.5`}
                  >
                    <span>بل پیغام لیږل</span>
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-5 max-w-lg mx-auto">
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    خپل نوم او د پېغام متن ولیکئ ترڅو په مستقیم او اتومات ډول زمونږ د ټلیګرام روباټ اډمین ته د لید لپاره ورسیږي:
                  </p>

                  {contactError && (
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-xs text-rose-400 leading-relaxed font-sans space-y-2">
                      <p className="font-bold flex items-center gap-1.5 justify-start">
                        <span>⚠️ د پیوستون ستونزه:</span>
                      </p>
                      <p>{contactError}</p>
                      {(contactError.includes('TELEGRAM_BOT_TOKEN') || contactError.includes('configuration_missing')) && (
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/10 dark:border-slate-800/40 text-[10.5px] text-slate-400 space-y-1.5 mt-2">
                          <p className="font-bold text-slate-300">💡 د تنظیماتو ساده لارښود:</p>
                          <p>۱. په **Google AI Studio** کې د خپلو Secrets یا پاڼې د تنظیماتو برخې ته لاړ شئ.</p>
                          <p>۲. د اوپن سورس بوټ پرمخ بیولو لپاره دا دوه چاپیریالي متغییرونه (Secrets) زیات کړئ:</p>
                          <p className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-indigo-405 font-semibold text-center block">TELEGRAM_BOT_TOKEN</p>
                          <p className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-indigo-405 font-semibold text-center block">TELEGRAM_ADMIN_CHAT_ID</p>
                          <p>۳. د ارزښتونو تر ثبتولو وروسته اپلیکیشن تنظیم کړئ ترڅو پیغامونه واستول شي.</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-black block`}>
                      ستاسو نوم یا پېژندنه:
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      disabled={contactSending}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="دلته د ځان پېژندنه ولیکئ..."
                      className={`w-full focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-xs font-semibold outline-none transition text-right font-sans ${isDark ? 'bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-650' : 'bg-slate-100 border border-slate-205 text-slate-900 placeholder-slate-500'}`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-black block`}>
                      ستاسو د پيغام متن:
                    </label>
                    <textarea
                      value={contactMsg}
                      disabled={contactSending}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="خپل پیغام یا وړاندیز دلته ولیکئ..."
                      rows={6}
                      className={`w-full focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-xs font-semibold outline-none transition text-right font-sans resize-none ${isDark ? 'bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-650' : 'bg-slate-100 border border-slate-205 text-slate-900 placeholder-slate-500'}`}
                    />
                  </div>

                  <button
                    onClick={handleSendTelegramContact}
                    disabled={contactSending}
                    style={{ cursor: contactSending ? 'not-allowed' : 'pointer' }}
                    className={`w-full py-3.5 ${tc.bg} ${tc.hoverBg} text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50`}
                  >
                    {contactSending ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>د لېږلو په حال کې دی...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 -rotate-12" />
                        <span>پیغام واستوه په مستقیم ډول</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : isSettingsPageOpen ? (
          /* ==========================================================
             E. SETTINGS SCREEN (د ترتیباتو او تنظیماتو بېله صفحه)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right">
            <div className={`p-5 sm:p-6 rounded-3xl ${cardBg} border border-slate-800/10 dark:border-slate-800 overflow-hidden shadow-xl text-right`}>
              <div className={`px-5 py-4 ${isDark ? 'bg-slate-950/70 border-slate-800/20' : 'bg-slate-100/90 border-slate-200'} border-b flex items-center justify-between rounded-t-3xl -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5`}>
                <button
                  onClick={() => setIsSettingsPageOpen(false)}
                  style={{ cursor: 'pointer' }}
                  className={`px-3 py-1.5 rounded-lg transition text-xs font-bold ${isDark ? 'text-slate-400 bg-slate-800 hover:text-white' : 'text-slate-700 bg-slate-200 hover:bg-slate-300'} flex items-center gap-1 shrink-0`}
                  title="شاته"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>کورپاڼه</span>
                </button>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-indigo-400" />
                </div>
              </div>

              {/* Main settings body layout */}
              <div className="space-y-6 text-right font-sans">
                
                {/* 1. HOME LAYOUTS */}
                <div className="space-y-2.5">
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                    <Layers className={`w-3.5 h-3.5 ${tc.text}`} />
                    <span>{tr.homeLayout}</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {(['standard', 'grid', 'compact', 'masonry', 'minimalist'] as const).map((layout) => (
                      <button
                        key={layout}
                        onClick={() => setHomeLayout(layout)}
                        style={{ cursor: 'pointer' }}
                        className={`py-2.5 px-2 rounded-xl border text-[11px] font-semibold transition flex items-center justify-start gap-1.5 ${
                          homeLayout === layout
                            ? `${tc.bg} ${tc.border} text-white shadow-xs`
                            : `${isDark ? 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-205 text-slate-700 hover:bg-slate-150'}`
                        }`}
                      >
                        <span className="shrink-0">{homeLayout === layout ? '●' : '○'}</span>
                        <span className="truncate">{tr[layout]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. THEME MODE */}
                <div className="space-y-2.5 border-t border-slate-500/10 pt-4">
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                    {isDark ? <Moon className={`w-3.5 h-3.5 ${tc.text}`} /> : <Sun className={`w-3.5 h-3.5 ${tc.text}`} />}
                    <span>{tr.themeMode}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setThemeMode('dark')}
                      style={{ cursor: 'pointer' }}
                      className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold transition flex items-center justify-center gap-2 ${
                        isDark
                          ? `${tc.bg} ${tc.border} text-white shadow-md`
                          : 'bg-slate-100 border-slate-205 text-slate-700 hover:bg-slate-150'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>{tr.dark}</span>
                    </button>
                    <button
                      onClick={() => setThemeMode('light')}
                      style={{ cursor: 'pointer' }}
                      className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold transition flex items-center justify-center gap-2 ${
                        !isDark
                          ? `${tc.bg} ${tc.border} text-white shadow-md`
                          : 'bg-slate-950/60 border-slate-855 text-slate-305 hover:bg-slate-850'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>{tr.light}</span>
                    </button>
                  </div>
                </div>

                {/* 3. COLOR THEME PRESETS */}
                <div className="space-y-2.5 border-t border-slate-500/10 pt-4">
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                    <Palette className={`w-3.5 h-3.5 ${tc.text}`} />
                    <span>{tr.colorThemes}</span>
                  </label>
                  <div className="grid grid-cols-5 gap-2 px-1">
                    {Object.keys(themeColorsMap).map((colorName) => {
                      const config = themeColorsMap[colorName];
                      const isSelected = primaryColorTheme === colorName;
                      
                      const pashtoLabels: Record<string, string> = {
                        indigo: 'لاجوردي',
                        emerald: 'شین',
                        rose: 'اماراتي',
                        amber: 'ژیړ',
                        violet: 'فکري',
                        cyan: 'اسماني',
                        teal: 'فیروزيي',
                        crimson: 'سور',
                        orange: 'نارنجي',
                        slate: 'فولادي'
                      };

                      return (
                        <button
                          key={colorName}
                          onClick={() => setPrimaryColorTheme(colorName as any)}
                          style={{ cursor: 'pointer' }}
                          title={pashtoLabels[colorName] || colorName}
                          className="flex flex-col items-center gap-1 group focus:outline-none"
                        >
                          <span
                            style={{ backgroundColor: config.hex }}
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition active:scale-90 shadow-md ${
                              isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 border border-black/45' : 'opacity-85 hover:opacity-100 border border-slate-500/25'
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                          </span>
                          <span className={`text-[8.5px] ${isSelected ? `${tc.text} font-black` : 'text-slate-500'} truncate w-full text-center`}>
                            {pashtoLabels[colorName] || colorName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. TEXT SIZE CONTROLS */}
                <div className="space-y-2.5 border-t border-slate-500/10 pt-4">
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                    <Type className={`w-3.5 h-3.5 ${tc.text}`} />
                    <span>{tr.textColor}</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setTextSizeClass(sz)}
                        style={{ cursor: 'pointer' }}
                        className={`py-2.5 px-1 rounded-xl border text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                          textSizeClass === sz
                            ? `${tc.bg} ${tc.border} text-white shadow-md`
                            : `${isDark ? 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-205 text-slate-700 hover:bg-slate-150'}`
                        }`}
                      >
                        {textSizeClass === sz && <Check className="w-3 h-3 text-white shrink-0" />}
                        <span>
                          {sz === 'sm' && 'وړوکي'}
                          {sz === 'base' && 'منځنی'}
                          {sz === 'lg' && 'لوی'}
                          {sz === 'xl' && 'ډېر لوی'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. NOTIFICATIONS TOGGLE */}
                <div className="flex items-center justify-between p-3.5 bg-slate-500/5 rounded-xl border border-slate-500/10 text-right font-sans pt-1 mt-1">
                  <div className="flex items-center gap-1.5 text-right">
                    {notificationsEnabled ? <Bell className={`w-4 h-4 ${tc.text}`} /> : <BellOff className="w-4 h-4 text-slate-500" />}
                    <span className={`text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-850'} font-bold`}>{tr.notifications}:</span>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    style={{ cursor: 'pointer' }}
                    className={`py-1.5 px-3 rounded-lg text-[10px] font-black tracking-wide uppercase transition ${
                      notificationsEnabled ? 'bg-emerald-500/15 border border-emerald-500/25 text-emerald-450 dark:text-emerald-400' : 'bg-slate-500/10 border border-slate-500/20 text-slate-500'
                    }`}
                  >
                    {notificationsEnabled ? tr.enabled : tr.disabled}
                  </button>
                </div>



                {/* 8. RESET STORAGE / CLEAR CACHE */}
                <div className="space-y-2 border-t border-slate-500/10 pt-4">
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>{tr.clearCache}</span>
                  </label>
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-rose-500/5 border-rose-500/15' : 'bg-rose-50 border-rose-250'} flex flex-col gap-2.5`}>
                    <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>{tr.clearCacheHelp}</p>
                    <button
                      onClick={() => {
                        setShowClearCacheConfirm(true);
                      }}
                      style={{ cursor: 'pointer' }}
                      className="bg-rose-600 hover:bg-rose-550 active:scale-95 text-white py-2.5 px-3.5 rounded-xl text-[10.5px] font-bold transition flex items-center justify-center gap-1.5 self-start"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{tr.clearCacheBtn}</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setIsSettingsPageOpen(false)}
                  style={{ cursor: 'pointer' }}
                  className={`w-full py-3 ${tc.bg} ${tc.hoverBg} text-white rounded-xl text-xs font-bold transition mt-2`}
                >
                  {appLanguage === 'en' ? 'Home' : 'کورپاڼه'}
                </button>
              </div>
            </div>
          </div>
        ) : isSearchOpen ? (
          /* ==========================================================
             D. SEARCH PAGE (د پلټنې بېله او ځانګړې صفحه)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right">
            <div className={`border rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 shadow-xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className={`text-xs font-bold ${isDark ? 'text-slate-350' : 'text-slate-700'}`}>په ټولو پوسټونو کې موضوع یا کلیمه وپلټئ:</span>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="دلته د پوسټونو موضوع یا کلمه وپلټئ..."
                  className={`w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-3 pr-10 pl-4 text-xs font-medium outline-none transition duration-200 text-right font-sans ${isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-102 border-slate-300 text-slate-900'}`}
                  autoFocus
                />
                <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ cursor: 'pointer' }}
                    className={`absolute left-3 top-2.5 text-[10px] font-bold px-2.5 py-1 rounded transition ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'}`}
                  >
                    بیا پیل
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-[10px] text-indigo-400 text-right font-semibold">
                  موندل شوي پوسټونه: {allPosts.length} د غوښتنې مطابق
                </p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              {allPosts.length > 0 ? (
                allPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    style={{ cursor: 'pointer' }}
                    className={`${isDark ? 'bg-slate-900/95 hover:bg-slate-850/90 border-slate-800/20 text-slate-100' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-900'} border p-4 rounded-xl flex items-center gap-4 transition group active:scale-[0.99] select-none text-right shadow-md`}
                  >
                    {post.photoUrl && (!post.photoUrls || post.photoUrls.length <= 1) ? (
                      <div className="w-16 h-16 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                        <img
                          src={post.photoUrl || null}
                          referrerPolicy="no-referrer"
                          alt="thumb"
                          className="w-full h-full object-cover cursor-zoom-in"
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoomPhotoUrl(post.photoUrl!);
                            setZoomScale(1);
                          }}
                        />
                      </div>
                    ) : null}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1 font-mono">
                        <span className={`${isDark ? 'bg-slate-950' : 'bg-slate-100'} px-2 py-0.5 rounded text-[9.5px] font-mono text-indigo-400 font-bold`}>#{post.id}</span>
                        <span>{post.timeLabel || 'وروستی'}</span>
                      </div>
                      <BeautifulTelegramText 
                        text={getPostTextWithFallback(post)}
                        isDark={isDark}
                        fs={{ body: 'text-[13.5px]' }}
                        limitLines={6}
                      />
                      {post.photoUrls && post.photoUrls.length > 1 && (
                        <div 
                          onClick={(e) => e.stopPropagation()} 
                          className="flex gap-2 overflow-x-auto pb-1.5 pt-1 scrollbar-thin scrollbar-thumb-slate-705 mt-2 rtl"
                          style={{ direction: 'rtl' }}
                        >
                          {post.photoUrls.map((url, imgIdx) => (
                            <div 
                              key={imgIdx} 
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 bg-slate-950/40 border border-slate-855/10 relative group"
                            >
                              <img
                                src={url}
                                referrerPolicy="no-referrer"
                                alt="post gallery"
                                className="w-full h-full object-cover hover:scale-105 transition duration-200 cursor-zoom-in"
                                onClick={() => {
                                  setZoomPhotoUrl(url);
                                  setZoomScale(1);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {post.audioList && post.audioList.length > 0 ? (
                        <div className="mt-2.5 space-y-2.5">
                          {post.audioList.map((audioItem, idx) => (
                            <BeautifulAudioPlayer key={idx} url={audioItem.url} title={audioItem.title || 'غږیز فایل خپرونه'} duration={audioItem.duration} isDark={isDark} tc={tc} />
                          ))}
                        </div>
                      ) : post.hasAudio && post.audioUrl ? (
                        <div className="mt-2.5">
                          <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))
               ) : (
                <div className="py-16 text-center text-slate-500 text-xs font-sans">
                  هيڅ کلمه ورته پیدا نه شوه، مهرباني وکړئ بله موضوع وپلټئ.
                </div>
               )}
            </div>
          </div>
        ) : !isFullFeedOpen ? (
          /* ==========================================================
             A. HOME SCREEN (لومړی د کور صفحه غوره ډیزاین)
             ========================================================== */
          <div className="space-y-6 animate-fade-in">

            {/* FEATURED SLIDER HERO HEADER (انډیکيټر سره لس انځور لرونکي پوسټونه - ساده او ښکلی) */}
            {featuredPosts.length > 0 && (
              <section className={`${isDark ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-slate-200 shadow-md'} rounded-2xl p-3.5 border flex flex-col gap-2.5 transition-colors duration-300`}>
                {/* Main Slider Screen */}
                <div 
                  onClick={() => setSelectedPost(featuredPosts[featuredIndex])}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  style={{ cursor: 'pointer' }}
                  className="relative h-44 sm:h-48 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/60 flex items-center justify-center group"
                >
                  {(featuredPosts[featuredIndex].photoUrl || featuredPosts[featuredIndex].videoThumbUrl) ? (
                    <img
                      src={(featuredPosts[featuredIndex].photoUrl || featuredPosts[featuredIndex].videoThumbUrl) || null}
                      referrerPolicy="no-referrer"
                      alt="Featured node"
                      className="w-full h-full object-cover select-none transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (() => {
                    const featText = featuredPosts[featuredIndex].text || '';
                    const cleanFeatText = featText.replace(/(#[\u0600-\u06FFa-zA-Z0-9_]+)/g, '').trim();
                    const featLines = cleanFeatText.split('\n').map(l => l.trim()).filter(l => l !== '');
                    const visibleFeatLines = featLines.slice(0, 4).join('\n');
                    const featuredGradients = [
                      "from-sky-500 via-indigo-600 to-purple-700",
                      "from-rose-500 via-pink-600 to-indigo-700",
                      "from-emerald-500 via-teal-600 to-cyan-700",
                      "from-amber-500 via-red-600 to-rose-700",
                      "from-violet-500 via-purple-600 to-pink-700",
                      "from-cyan-500 via-blue-600 to-indigo-700",
                      "from-fuchsia-500 via-rose-600 to-orange-700",
                      "from-teal-500 via-emerald-600 to-lime-700"
                    ];
                    const selectedGradient = featuredGradients[featuredIndex % featuredGradients.length];
                    return (
                      <div className={`w-full h-full bg-gradient-to-tr ${selectedGradient} p-5 flex flex-col items-center justify-center text-center text-white relative select-none`}>
                        {/* Beautiful quotation mark background */}
                        <span className="absolute top-2 right-4 text-white/10 text-8xl font-serif leading-none select-none">”</span>
                        <p className="text-white text-xs sm:text-sm font-black font-sans leading-relaxed max-w-[85%] pr-1 text-center whitespace-pre-line line-clamp-4" style={{ direction: 'rtl' }}>
                          {visibleFeatLines || 'پښتو غزل او شعر د لوستلو لپاره ...'}
                        </p>
                      </div>
                    );
                  })()}

                  {/* Left Arrow Button Overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevFeatured();
                    }}
                    style={{ cursor: 'pointer' }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/85 text-white rounded-full p-1.5 transition active:scale-90 shadow-lg border border-white/10 backdrop-blur-xs z-10"
                    title="مخکینی"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>

                  {/* Right Arrow Button Overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextFeatured();
                    }}
                    style={{ cursor: 'pointer' }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/85 text-white rounded-full p-1.5 transition active:scale-90 shadow-lg border border-white/10 backdrop-blur-xs z-10"
                    title="بل پوسټ"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>

                  {/* Subtle Indicator Badge */}
                  <div className={`absolute top-3 left-3 ${tc.bg} text-white font-mono font-black text-xs px-2.5 py-1 rounded-xl shadow-md select-none z-10`}>
                    {featuredIndex + 1}/{featuredPosts.length}
                  </div>
                  
                  {featuredPosts[featuredIndex].hasVideo && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/35 pointer-events-none">
                      <PlayCircle className="w-10 h-10 text-indigo-400 drop-shadow" />
                    </span>
                  )}
                </div>

                {/* Title outline */}
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700 font-bold'} mt-0.5 truncate text-right leading-relaxed px-1`}>
                  {featuredPosts[featuredIndex].text || 'د لوستلو لپاره کلیک کړئ...'}
                </p>

                {/* Dot slider indicator with fully visible dots (added non-active width classes w-1.5) */}
                <div className="flex justify-center items-center gap-1.5 mt-0.5">
                  {featuredPosts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFeaturedIndex(idx)}
                      style={{ cursor: 'pointer' }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === featuredIndex 
                          ? `w-5.5 ${tc.bg}` 
                          : `w-1.5 ${isDark ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-300 hover:bg-slate-400'}`
                      }`}
                      title={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* CATEGORIES GRID TABS (د پوسټونو بېلا بېلې کټګورۍ) */}
            <div className="w-full mt-4 mb-2">
              <div className="flex items-center mb-2 px-1 text-right">
                <span className={`text-[11px] font-black ${isDark ? 'text-slate-300' : 'text-slate-700'} font-sans`}>
                  د پورته شويو پوسټونو موضوعي کټګورۍ:
                </span>
              </div>
              <div 
                className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-right"
                style={{ direction: 'rtl' }}
              >
                {[
                  { id: 'all', label: 'ټول', icon: Layers },
                  { id: 'videos', label: 'ويډيوګانې', icon: Video },
                  { id: 'images', label: 'انځورونه', icon: ImageIcon },
                  { id: 'audio', label: 'غږيز فايلونه', icon: Music },
                  { id: 'pdf', label: 'کتابونه pdf', icon: BookOpen },
                  { id: 'writings', label: 'ليکنې', icon: FileText },
                ].map((cat) => {
                  const CatIcon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{ cursor: 'pointer' }}
                      className={`px-3.5 py-2 rounded-xl text-[10.5px] font-black font-sans transition flex items-center gap-1.5 shrink-0 select-none shadow-sm ${
                        isActive
                          ? `${tc.bg} text-white`
                          : `${isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'} border`
                      }`}
                    >
                      <CatIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tc.text}`} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RECENT COMPACT LISTS (د هر پوسټ لږ متن او څنګ ته د عکسونو ښکلی ډیزاین) */}
            <div className="space-y-3">
              {homePosts.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">پوسټونه نشته.</div>
              ) : (
                  <div className={`
                    ${homeLayout === 'grid' ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-2.5'}
                  `}>
                    {homePosts.map((post) => {
                      const handleClick = () => setSelectedPost(post);
                      
                      // 1. STANDARD LIST VIEW OR FALLBACK
                      if (homeLayout === 'standard' || !homeLayout) {
                        return (
                          <div
                            key={post.id}
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                            className={`${cardBg} p-4 rounded-xl flex items-center gap-4 transition group active:scale-[0.99] select-none text-right shadow-md border border-slate-500/5`}
                          >
                            {(post.photoUrl || post.videoThumbUrl || post.hasVideo) && (
                              post.photoUrl ? (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                                  <img
                                    src={post.photoUrl || null}
                                    referrerPolicy="no-referrer"
                                    alt="thumb"
                                    className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.04]"
                                  />
                                  {post.photoUrls && post.photoUrls.length > 1 && (
                                    <span className="absolute top-1.5 left-1.5 bg-slate-950/85 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-0.5 border border-white/10 shadow">
                                      <Images className="w-2.5 h-2.5 text-indigo-400" />
                                      <span>+{post.photoUrls.length - 1}</span>
                                    </span>
                                  )}
                                  {post.hasVideo && (
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                                      <PlayCircle className="w-6 h-6 text-white drop-shadow" />
                                    </span>
                                  )}
                                </div>
                              ) : post.videoThumbUrl ? (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                                  <img
                                    src={post.videoThumbUrl || null}
                                    referrerPolicy="no-referrer"
                                    alt="thumb"
                                    className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.04]"
                                  />
                                  <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                                    <PlayCircle className="w-6 h-6 text-white drop-shadow" />
                                  </span>
                                </div>
                              ) : post.hasVideo ? (
                                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl ${subCardBg} flex items-center justify-center shrink-0 text-indigo-400`}>
                                  <Video className={`w-8 h-8 ${tc.text}`} />
                                </div>
                              ) : null
                            )}

                            <div className="flex-1 min-w-0 text-right flex flex-col justify-between py-0.5 h-full">
                              <div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1.5 font-sans">
                                  <span className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-bold text-white ${tc.bg}`}>#{post.id}</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-550" />
                                    {post.timeLabel || 'وروستی'}
                                  </span>
                                </div>
                                <BeautifulTelegramText 
                                  text={getPostTextWithFallback(post)}
                                  isDark={isDark}
                                  fs={fs}
                                  limitLines={6}
                                />

                                {post.photoUrls && post.photoUrls.length > 1 && (
                                  <div 
                                    onClick={(e) => e.stopPropagation()} 
                                    className="flex gap-2 overflow-x-auto pb-1.5 pt-1 scrollbar-thin scrollbar-thumb-slate-700 mt-2.5 rtl"
                                    style={{ direction: 'rtl' }}
                                  >
                                    {post.photoUrls.map((url, imgIdx) => (
                                      <div 
                                        key={imgIdx} 
                                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-slate-950/40 border border-slate-850/10 relative group"
                                      >
                                        <img
                                          src={url}
                                          referrerPolicy="no-referrer"
                                          alt="post gallery"
                                          className="w-full h-full object-cover hover:scale-105 transition duration-200 cursor-zoom-in"
                                          onClick={() => {
                                            setZoomPhotoUrl(url);
                                            setZoomScale(1);
                                          }}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {post.audioList && post.audioList.length > 0 ? (
                                  <div className="space-y-2.5">
                                    {post.audioList.map((audioItem, idx) => (
                                      <BeautifulAudioPlayer key={idx} url={audioItem.url} title={audioItem.title || 'غږیز فایل خپرونه'} duration={audioItem.duration} isDark={isDark} tc={tc} />
                                    ))}
                                  </div>
                                ) : post.hasAudio && post.audioUrl ? (
                                  <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
                                ) : null}

                                {getIsBook(post) && (
                                  <CustomBookDownload post={post} isDark={isDark} tc={tc} />
                                )}

                                {post.linkPreview ? (
                                  <a
                                    href={post.linkPreview.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className={`mt-2 block ${isDark ? 'bg-slate-950/40 hover:bg-slate-950/60 border-indigo-500/15' : 'bg-slate-100 hover:bg-slate-150 border-indigo-500/10'} hover:border-indigo-500/40 border rounded-xl p-2.5 transition text-right`}
                                  >
                                    <div className="flex gap-2 min-w-0">
                                      {post.linkPreview.photoUrl && (
                                        <img
                                          src={post.linkPreview.photoUrl}
                                          referrerPolicy="no-referrer"
                                          className="w-8 h-8 rounded bg-slate-900 object-cover shrink-0"
                                          alt="lnk"
                                        />
                                      )}
                                      <div className="min-w-0 flex-1 text-right">
                                        <h5 className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-slate-900'} truncate leading-normal`}>{post.linkPreview.title}</h5>
                                        <p className="text-[9px] text-slate-400 truncate leading-normal mt-0.5">{post.linkPreview.description}</p>
                                      </div>
                                    </div>
                                  </a>
                                ) : extractUrl(post.text || '') ? (
                                  <CustomLinkPreview url={extractUrl(post.text || '')!} isDark={isDark} />
                                ) : null}
                              </div>

                              {post.reactions && post.reactions.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2.5 justify-start">
                                  {post.reactions.slice(0, 4).map((react, rIdx) => (
                                    <span
                                      key={rIdx}
                                      className={`${isDark ? 'bg-slate-950/80' : 'bg-slate-100'} rounded-lg px-2 py-0.5 text-[10px] flex items-center gap-1 text-slate-550 border border-slate-800/10`}
                                    >
                                      <span>{react.emoji}</span>
                                      <span className="font-mono text-[9px]">{react.count}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }

                      // 2. CARD GRID DESIGN (2 columns)
                      if (homeLayout === 'grid') {
                        return (
                          <div
                            key={post.id}
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                            className={`${cardBg} rounded-xl overflow-hidden flex flex-col transition group active:scale-[0.98] select-none text-right shadow-sm border border-slate-500/5`}
                          >
                            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                              {post.photoUrl ? (
                                <img
                                  src={post.photoUrl || null}
                                  referrerPolicy="no-referrer"
                                  alt="grid-thumb"
                                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                                />
                              ) : post.videoThumbUrl ? (
                                <img
                                  src={post.videoThumbUrl || null}
                                  referrerPolicy="no-referrer"
                                  alt="grid-thumb"
                                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <div className={`w-full h-full ${subCardBg} flex items-center justify-center`}>
                                  <BookOpen className={`w-7 h-7 ${tc.text} opacity-50`} />
                                </div>
                              )}
                              {post.photoUrls && post.photoUrls.length > 1 && (
                                <span className="absolute top-2 left-2 bg-slate-950/85 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-0.5 border border-white/10 shadow">
                                  <Images className="w-2.5 h-2.5 text-indigo-400" />
                                  <span>+{post.photoUrls.length - 1}</span>
                                </span>
                              )}
                              {post.hasVideo && (
                                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <PlayCircle className="w-8 h-8 text-white" />
                                </span>
                              )}
                              <span className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold text-white ${tc.bg}`}>
                                #{post.id}
                              </span>
                            </div>
                            <div className="p-3 flex-1 flex flex-col justify-between gap-1.5">
                              <div>
                                <span className="text-[9px] text-slate-500 flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />
                                  {post.timeLabel || 'Recent'}
                                </span>
                                <BeautifulTelegramText 
                                  text={getPostTextWithFallback(post)}
                                  isDark={isDark}
                                  fs={{ body: 'text-[11.5px] sm:text-xs font-semibold' }}
                                  limitLines={4}
                                />
                                {post.photoUrls && post.photoUrls.length > 1 && (
                                  <div 
                                    onClick={(e) => e.stopPropagation()} 
                                    className="flex gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none mt-2.5 rtl"
                                    style={{ direction: 'rtl' }}
                                  >
                                    {post.photoUrls.map((url, imgIdx) => (
                                      <div 
                                        key={imgIdx} 
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden shrink-0 bg-slate-950/40 border border-slate-850/10 relative group"
                                      >
                                        <img
                                          src={url}
                                          referrerPolicy="no-referrer"
                                          alt="post gallery"
                                          className="w-full h-full object-cover hover:scale-105 transition duration-200 cursor-zoom-in"
                                          onClick={() => {
                                            setZoomPhotoUrl(url);
                                            setZoomScale(1);
                                          }}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {post.audioList && post.audioList.length > 0 ? (
                                  <div className="space-y-2.5">
                                    {post.audioList.map((audioItem, idx) => (
                                      <BeautifulAudioPlayer key={idx} url={audioItem.url} title={audioItem.title || 'غږیز فایل خپرونه'} duration={audioItem.duration} isDark={isDark} tc={tc} />
                                    ))}
                                  </div>
                                ) : post.hasAudio && post.audioUrl ? (
                                  <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
                                ) : null}

                                {getIsBook(post) && (
                                  <CustomBookDownload post={post} isDark={isDark} tc={tc} />
                                )}
                              </div>
                              {post.reactions && post.reactions.length > 0 && (
                                <div className="flex flex-wrap gap-1 justify-start">
                                  {post.reactions.slice(0, 2).map((react, rIdx) => (
                                    <span key={rIdx} className="text-[9px] flex items-center gap-0.5 text-slate-550">
                                      <span>{react.emoji}</span>
                                      <span className="font-mono">{react.count}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }

                      // 3. COMPACT LIST VIEW
                      if (homeLayout === 'compact') {
                        return (
                          <div
                            key={post.id}
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                            className={`${cardBg} py-2.5 px-3.5 rounded-lg flex items-center gap-3 transition group active:scale-[0.99] select-none text-right shadow-2xs border border-slate-500/5`}
                          >
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 font-mono text-[9px] font-black text-white ${tc.bg}`}>
                              {post.id}
                            </span>
                            <div className="flex-1 min-w-0 pr-1">
                              <p className={`text-[12.5px] sm:text-[13px] ${isDark ? 'text-slate-200' : 'text-slate-800'} font-semibold truncate`}>
                                {getPostTextWithFallback(post)}
                              </p>
                              <span className="text-[9px] text-slate-500 flex items-center gap-1.5 mt-0.5 font-sans">
                                {post.timeLabel || 'ثبت شوی'}
                              </span>
                              {post.audioList && post.audioList.length > 0 ? (
                                <div className="mt-1.5 max-w-xs scale-95 origin-right space-y-1.5">
                                  {post.audioList.map((audioItem, idx) => (
                                    <BeautifulAudioPlayer key={idx} url={audioItem.url} title={audioItem.title || 'غږیز فایل خپرونه'} duration={audioItem.duration} isDark={isDark} tc={tc} />
                                  ))}
                                </div>
                              ) : post.hasAudio && post.audioUrl ? (
                                <div className="mt-1.5 max-w-xs scale-95 origin-right">
                                  <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
                                </div>
                              ) : null}

                              {getIsBook(post) && (
                                <div className="mt-1.5 max-w-xs scale-95 origin-right">
                                  <CustomBookDownload post={post} isDark={isDark} tc={tc} />
                                </div>
                              )}
                            </div>
                            {post.photoUrl && (
                              <div className="w-8 h-8 rounded-md bg-slate-950 overflow-hidden shrink-0 relative">
                                <img src={post.photoUrl} className="w-full h-full object-cover" />
                                {post.photoUrls && post.photoUrls.length > 1 && (
                                  <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[8px] font-black">
                                    +{post.photoUrls.length - 1}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }

                      // 4. LARGE MASONRY CARDS (Bento / Masonry Style)
                      if (homeLayout === 'masonry') {
                        return (
                          <div
                            key={post.id}
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                            className={`${cardBg} rounded-2xl overflow-hidden flex flex-col transition group active:scale-[0.99] select-none text-right shadow-md border border-slate-500/5`}
                          >
                            {(post.photoUrl || post.videoThumbUrl) && (
                              <div className="relative h-56 sm:h-64 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                                <img
                                  src={post.photoUrl || post.videoThumbUrl || undefined}
                                  referrerPolicy="no-referrer"
                                  alt="masonry-full"
                                  className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                />
                                {post.photoUrls && post.photoUrls.length > 1 && (
                                  <span className="absolute top-3 left-3 bg-slate-950/85 text-white text-[10px] px-2 py-0.5 rounded-lg font-bold flex items-center gap-1 border border-white/10 shadow">
                                    <Images className="w-3 h-3 text-indigo-400" />
                                    <span>{post.photoUrls.length} انځورونه</span>
                                  </span>
                                )}
                                {post.hasVideo && (
                                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                                    <PlayCircle className="w-12 h-12 text-white drop-shadow-md" />
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="p-5 space-y-3">
                              <div className="flex items-center justify-between pb-1 border-b border-slate-500/10">
                                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold text-white ${tc.bg}`}>
                                  پوسټ #{post.id}
                                </span>
                                <span className="text-xs text-slate-500 flex items-center gap-1 font-sans">
                                  <Clock className="w-3.5 h-3.5" />
                                  {post.timeLabel || 'پورته شوی'}
                                </span>
                              </div>
                              <BeautifulTelegramText 
                                text={getPostTextWithFallback(post)}
                                isDark={isDark}
                                fs={fs}
                                limitLines={8}
                              />
                              {post.audioList && post.audioList.length > 0 ? (
                                <div className="space-y-2.5">
                                  {post.audioList.map((audioItem, idx) => (
                                    <BeautifulAudioPlayer key={idx} url={audioItem.url} title={audioItem.title || 'غږیز فایل خپرونه'} duration={audioItem.duration} isDark={isDark} tc={tc} />
                                  ))}
                                </div>
                              ) : post.hasAudio && post.audioUrl ? (
                                <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
                              ) : null}

                              {getIsBook(post) && (
                                <CustomBookDownload post={post} isDark={isDark} tc={tc} />
                              )}
                              {post.reactions && post.reactions.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 justify-start">
                                  {post.reactions.slice(0, 5).map((react, rIdx) => (
                                    <span
                                      key={rIdx}
                                      className={`${isDark ? 'bg-slate-950/80' : 'bg-slate-100'} rounded-lg px-2.5 py-1 text-xs flex items-center gap-1 text-slate-550 border border-slate-800/10`}
                                    >
                                      <span>{react.emoji}</span>
                                      <span className="font-mono text-[10px] text-slate-500">{react.count}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }

                      // 5. MINIMALIST DETAILS (Pure Typography View)
                      if (homeLayout === 'minimalist') {
                        return (
                          <div
                            key={post.id}
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                            className={`${cardBg} p-5 rounded-2xl flex flex-col gap-3 transition group active:scale-[0.99] select-none text-right border border-slate-500/5`}
                          >
                            <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                              <span className={`text-[10px] font-extrabold ${tc.text}`}>#{post.id} پوسټ</span>
                              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.timeLabel || 'Recent'}
                              </span>
                            </div>
                            <BeautifulTelegramText 
                              text={getPostTextWithFallback(post)}
                              isDark={isDark}
                              fs={fs}
                              limitLines={8}
                            />
                            {post.audioList && post.audioList.length > 0 ? (
                              <div className="space-y-2.5">
                                {post.audioList.map((audioItem, idx) => (
                                  <BeautifulAudioPlayer key={idx} url={audioItem.url} title={audioItem.title || 'غږیز فایل خپرونه'} duration={audioItem.duration} isDark={isDark} tc={tc} />
                                ))}
                              </div>
                            ) : post.hasAudio && post.audioUrl ? (
                              <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
                            ) : null}

                            {getIsBook(post) && (
                              <CustomBookDownload post={post} isDark={isDark} tc={tc} />
                            )}
                            {post.reactions && post.reactions.length > 0 && (
                              <div className="flex flex-wrap gap-1 justify-start pt-1">
                                {post.reactions.slice(0, 3).map((react, rIdx) => (
                                  <span key={rIdx} className={`${isDark ? 'bg-slate-950' : 'bg-slate-100'} px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] text-slate-550 border border-slate-800/5`}>
                                    <span>{react.emoji}</span>
                                    <span className="font-mono text-[9px]">{react.count}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
              )}
            </div>

            {/* VIEW MORE BUTTON TO LAND IN FULL FEED (نور وګورئ بټن) */}
            {fullFeedPosts.length > 30 && (
              <div className="py-6 flex justify-center">
                <button
                  onClick={() => {
                    setIsFullFeedOpen(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ cursor: 'pointer' }}
                  className={`w-full max-w-sm py-3.5 px-6 ${tc.bg} ${tc.hoverBg} text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition flex items-center justify-center gap-2`}
                >
                  <span>نور وګورئ</span>
                  <ArrowLeft className="w-4 h-4 text-white animate-pulse" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ==========================================================
             B. DETAILED FULL LIST VIEW PAGE (بشپړ لیست پاڼه د ۱۰ باچ باچ لوډیدو سره)
             ========================================================== */
          <div className="space-y-5 animate-fade-in">
             {/* Compact items list for full archive feed */}
            <div className="flex flex-col gap-2.5">
              {fullFeedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  style={{ cursor: 'pointer' }}
                  className={`${isDark ? 'bg-slate-900/50 border-white/40 hover:bg-slate-800/60' : 'bg-white border-slate-200 hover:bg-slate-100/80 shadow-md'} border p-4 rounded-xl flex items-center gap-4 transition group select-none text-right`}
                >
                  {/* Right: Enlarged thumbnail image with no white stroke */}
                  {(post.photoUrl || post.videoThumbUrl || post.hasVideo) && (
                    post.photoUrl && (!post.photoUrls || post.photoUrls.length <= 1) ? (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                        <img
                          src={post.photoUrl || null}
                          referrerPolicy="no-referrer"
                          alt="Scrape preview node"
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        {post.hasVideo && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                            <PlayCircle className="w-6 h-6 text-indigo-400 drop-shadow" />
                          </span>
                        )}
                      </div>
                    ) : post.videoThumbUrl ? (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                        <img
                          src={post.videoThumbUrl || null}
                          referrerPolicy="no-referrer"
                          alt="Scrape preview node"
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                          <PlayCircle className="w-6 h-6 text-indigo-400 drop-shadow" />
                        </span>
                      </div>
                    ) : post.hasVideo ? (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950/60 flex items-center justify-center shrink-0 text-indigo-400">
                        <Video className="w-8 h-8 text-indigo-400" />
                      </div>
                    ) : null
                  )}

                  {/* Left: Snippet Text & Reactions */}
                  <div className="flex-1 min-w-0 text-right flex flex-col justify-between py-0.5 h-full w-full">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1.5 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-bold text-white ${tc.bg}`}>#{post.id}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          {post.timeLabel || 'Recent'}
                        </span>
                      </div>
                      <BeautifulTelegramText 
                        text={getPostTextWithFallback(post)}
                        isDark={isDark}
                        fs={{ body: 'text-[12.5px] sm:text-[13px] font-semibold' }}
                        limitLines={6}
                      />

                      {post.photoUrls && post.photoUrls.length > 1 && (
                        <div 
                          onClick={(e) => e.stopPropagation()} 
                          className="flex gap-2 overflow-x-auto pb-1.5 pt-1 scrollbar-thin scrollbar-thumb-slate-705 mt-2.5 rtl"
                          style={{ direction: 'rtl' }}
                        >
                          {post.photoUrls.map((url, imgIdx) => (
                            <div 
                              key={imgIdx} 
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-slate-950/40 border border-slate-850/10 relative group"
                            >
                              <img
                                src={url}
                                referrerPolicy="no-referrer"
                                alt="post gallery"
                                className="w-full h-full object-cover hover:scale-105 transition duration-200 cursor-zoom-in"
                                onClick={() => {
                                  setZoomPhotoUrl(url);
                                  setZoomScale(1);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {post.audioList && post.audioList.length > 0 ? (
                        <div className="space-y-2.5 mt-2">
                          {post.audioList.map((audioItem, idx) => (
                            <BeautifulAudioPlayer key={idx} url={audioItem.url} title={audioItem.title || 'غږیز فایل خپرونه'} duration={audioItem.duration} isDark={isDark} tc={tc} />
                          ))}
                        </div>
                      ) : post.hasAudio && post.audioUrl ? (
                        <div className="mt-2">
                          <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
                        </div>
                      ) : null}

                      {getIsBook(post) && (
                        <div className="mt-2.5">
                          <CustomBookDownload post={post} isDark={isDark} tc={tc} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AUTOMATED INFINITE SCROLL SENTINEL FOR ARCHIVE SCREEN */}
            {feedData?.posts && (
              <div id="infinite-scroll-sentinel" className="py-6 flex flex-col justify-center items-center gap-2">
                {isScrapingMore ? (
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-slate-700 border-t-indigo-500 animate-spin shrink-0"></span>
                    <span className="text-xs text-slate-400 font-sans">د تېرو او پخوانيو پوسټونو کښته کول... (لوډیږي)</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-500 font-sans opacity-70">د نورو پوسټونو د موندلو او لوډیدو لپاره لاندې لاړ شئ...</span>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ==========================================================
         SPLASH SCREEN OVERLAY (ښایسته شروع صفحه د ۵ سکینډه وال لوډینګ سره)
         ========================================================== */}
      {showSplash && (
        <div className={`fixed inset-0 z-[100] ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-800'} flex flex-col items-center justify-between py-12 px-6 text-center select-none transition-colors duration-300`}>
          {/* Top spacer to push contents down */}
          <div className="flex-1" />

          <div className="w-full max-w-sm flex flex-col items-center gap-6">
            {/* Logo/Avatar container with animated glow styling */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative p-1 bg-gradient-to-tr from-indigo-500 to-indigo-600 rounded-full shadow-2xl"
            >
              <img
                src={feedData?.channelInfo?.avatarUrl || 'https://telegram.org/img/t_logo.png'}
                referrerPolicy="no-referrer"
                className={`w-24 h-24 rounded-full ${isDark ? 'bg-slate-900' : 'bg-white'} object-cover shadow-inner`}
                alt="Channel logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://telegram.org/img/t_logo.png';
                }}
              />
            </motion.div>
            
            {/* Channel title & metadata */}
            <div className="space-y-4">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-wide font-sans text-center`}
              >
                {feedData?.channelInfo?.title || 'ښه راغلاست'}
              </motion.h2>
            </div>

            {/* Timed progress loader */}
            <div className={`w-4/5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'} h-1.5 rounded-full overflow-hidden border relative mt-4`}>
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-75 ease-out" 
                style={{ width: `${splashProgress}%` }}
              />
            </div>
            
            <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'} font-mono tracking-wider`}>
              صبر وکړئ، معلومات لوډیږي... {Math.round(splashProgress)}%
            </span>
          </div>

          {/* Spacer to push developer info to bottom */}
          <div className="flex-1" />

          {/* Developer credit at the bottom of the screen */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="w-full flex justify-center pb-2"
          >
            <div className={`text-xs font-mono font-bold tracking-wider uppercase ${isDark ? 'text-indigo-400 bg-indigo-950/40 border-indigo-900/40' : 'text-indigo-600 bg-indigo-50 border-indigo-200'} border px-4 py-1.5 rounded-full shadow-sm`}>
              Develop by obaidullah ghafari
            </div>
          </motion.div>
        </div>
      )}

      {/* ==========================================================
         FIRST-TIME WELCOME DIALOG (د يوځل لپاره د ښه راغلاست ډیالوګ)
         ========================================================== */}
      <AnimatePresence>
        {showWelcome && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-[80] backdrop-blur-xs"
            />
            {/* Centered Modal view */}
            <div className="fixed inset-0 z-[85] overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative text-right"
              >
                {/* Visual Icon */}
                <div className="mx-auto w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 animate-bounce">
                  <Sparkles className="w-6 h-6" />
                </div>
                
                <h3 className="text-sm font-bold text-white text-center mb-2.5">
                  رسمي اپلیکیشن ته ښه راغلاست!
                </h3>
                
                <p className="text-[11.5px] text-slate-350 leading-relaxed text-right mb-5">
                  دا مینه دیوه رسمي خپرونې خوندور اپلیکیشن ته ښه راغلاست. دلته به تاسو ته د کانال ټول علمي، ادبي او فکري پوسټونه، په خورا ښکلي او منظم ډیزاین کې وړاندې شي.
                </p>

                <div className="space-y-2 bg-slate-950/40 p-3.5 rounded-2xl border border-slate-850 text-[10.5px] text-slate-400 mb-6">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span>ثانیه کې د انځورونو کښته کول</span>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5 justify-end mt-1">
                    <span>ګړندی او باوري د لټون سیسټم</span>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                <button
                  onClick={() => {
                    localStorage.setItem('dewa_welcome_shown', 'true');
                    setShowWelcome(false);
                  }}
                  style={{ cursor: 'pointer' }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-550 active:scale-95 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 font-sans"
                >
                  مننه، د اپلیکیشن کارول پیل کړئ
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ==========================================================
         EXIT CONFIRMATION DIALOG (ښکلی د وتلو ډیالوګ په پښتو ژبه)
         ========================================================== */}
      <AnimatePresence>
        {showExitConfirmation && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitConfirmation(false)}
              className="fixed inset-0 bg-black/80 z-[110] backdrop-blur-xs cursor-pointer"
            />
            {/* Centered Modal view */}
            <div className="fixed inset-0 z-[120] overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className={`w-full max-w-sm border rounded-3xl p-6 shadow-2xl relative text-right font-sans ${isDark ? 'bg-slate-900 border-slate-800 text-white shadow-slate-950/95' : 'bg-white border-slate-200 text-slate-800 shadow-slate-400/30'}`}
              >
                {/* Visual Exit Confirmation Icon */}
                <div className="mx-auto w-14 h-14 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
                  <AlertCircle className="w-8 h-8" />
                </div>
                
                <h3 className="text-sm font-black text-center mb-2 font-sans">
                  له اپلیکیشن څخه وتل
                </h3>
                
                <p className={`text-[12px] text-center leading-relaxed mb-6 font-sans ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  ایا تاسو واقعیا غواړئ چې له اپلیکیشن څخه ووځئ؟ که غواړئ پاتې شئ یا بل څه وګورئ نو د منسوخ تڼۍ کېکاږئ.
                </p>

                <div className="flex items-center gap-3 w-full font-sans">
                  {/* Cancel Button */}
                  <button
                    onClick={() => setShowExitConfirmation(false)}
                    style={{ cursor: 'pointer' }}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all text-center ${isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-200' : 'bg-slate-100 hover:bg-slate-150 text-slate-700'}`}
                  >
                    منسوخ (پاتې کېدل)
                  </button>

                  {/* Confirm Exit Button */}
                  <button
                    onClick={handleExitApp}
                    style={{ cursor: 'pointer' }}
                    className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-red-500 text-white hover:from-rose-550 hover:to-red-450 active:scale-95 rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-600/20 text-center"
                  >
                    هو، وتل غواړم
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ==========================================================
         SIDEBAR TRIGGERED MODALS (تنظيمات, زمونږ په اړه, اړيكه, نو اپليکيشنونه)
         ========================================================== */}
      <AnimatePresence>
        {activeModal && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-xs cursor-pointer"
            />
            
            {/* Centered Modal container */}
            <div className="fixed inset-0 z-[65] overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className={`w-full max-w-sm ${cardBg} border border-slate-800/20 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-right`}
              >
                {/* Header title block */}
                <div className={`px-5 py-4 ${isDark ? 'bg-slate-950/70 border-slate-800/10 dark:border-slate-800/60' : 'bg-slate-100 border-slate-200'} border-b flex items-center justify-between`}>
                  <button
                    onClick={() => setActiveModal(null)}
                    style={{ cursor: 'pointer' }}
                    className={`p-1 ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-655 hover:bg-slate-200'} rounded-lg transition`}
                    title="تړل"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    {activeModal === 'settings' && 'تنظیمات'}
                    {activeModal === 'about' && 'زمونږ په اړه معلومات'}
                    {activeModal === 'contact' && 'رابطه او د پیغام لیږل'}
                    {activeModal === 'apps' && 'زمونږ نوي وړاندیز شوي اپونه'}
                  </span>
                </div>

                {/* Main scrollable body template */}
                <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4">
                  {/* Settings Content */}
                  {activeModal === 'settings' && (
                    <div className="space-y-5 text-right font-sans">
                      
                      {/* 1. HOME LAYOUTS */}
                      <div className="space-y-2">
                        <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                          <Layers className={`w-3.5 h-3.5 ${tc.text}`} />
                          <span>{tr.homeLayout}</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                          {(['standard', 'grid', 'compact', 'masonry', 'minimalist'] as const).map((layout) => (
                            <button
                              key={layout}
                              onClick={() => setHomeLayout(layout)}
                              style={{ cursor: 'pointer' }}
                              className={`py-2 px-1.5 rounded-xl border text-[10.5px] font-semibold transition flex items-center justify-start gap-1.5 ${
                                homeLayout === layout
                                  ? `${tc.bg} ${tc.border} text-white shadow-xs`
                                  : `${isDark ? 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-150'}`
                              }`}
                            >
                              <span className="shrink-0">{homeLayout === layout ? '●' : '○'}</span>
                              <span className="truncate">{tr[layout]}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 2. THEME MODE */}
                      <div className="space-y-2 border-t border-slate-500/10 pt-3">
                        <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                          {isDark ? <Moon className={`w-3.5 h-3.5 ${tc.text}`} /> : <Sun className={`w-3.5 h-3.5 ${tc.text}`} />}
                          <span>{tr.themeMode}</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setThemeMode('dark')}
                            style={{ cursor: 'pointer' }}
                            className={`py-2 px-3 rounded-xl border text-[11px] font-bold transition flex items-center justify-center gap-2 ${
                              isDark
                                ? `${tc.bg} ${tc.border} text-white shadow-md`
                                : 'bg-slate-100 border-slate-205 text-slate-700 hover:bg-slate-150'
                            }`}
                          >
                            <Moon className="w-3.5 h-3.5" />
                            <span>{tr.dark}</span>
                          </button>
                          <button
                            onClick={() => setThemeMode('light')}
                            style={{ cursor: 'pointer' }}
                            className={`py-2 px-3 rounded-xl border text-[11px] font-bold transition flex items-center justify-center gap-2 ${
                              !isDark
                                ? `${tc.bg} ${tc.border} text-white shadow-md`
                                : 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <Sun className="w-3.5 h-3.5" />
                            <span>{tr.light}</span>
                          </button>
                        </div>
                      </div>

                      {/* 3. 10 COLOR THEME PRESETS */}
                      <div className="space-y-2 border-t border-slate-500/10 pt-3">
                        <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                          <Palette className={`w-3.5 h-3.5 ${tc.text}`} />
                          <span>{tr.colorThemes}</span>
                        </label>
                        <div className="grid grid-cols-5 gap-2 px-1">
                          {Object.keys(themeColorsMap).map((colorName) => {
                            const config = themeColorsMap[colorName];
                            const isSelected = primaryColorTheme === colorName;
                            
                            const pashtoLabels: Record<string, string> = {
                              indigo: 'لاجوردي',
                              emerald: 'شین',
                              rose: 'اماراتي',
                              amber: 'ژیړ',
                              violet: 'فکري',
                              cyan: 'اسماني',
                              teal: 'فیروزيي',
                              crimson: 'سور',
                              orange: 'نارنجي',
                              slate: 'فولادي'
                            };

                            return (
                              <button
                                key={colorName}
                                onClick={() => setPrimaryColorTheme(colorName as any)}
                                style={{ cursor: 'pointer' }}
                                title={pashtoLabels[colorName] || colorName}
                                className="flex flex-col items-center gap-1 group focus:outline-none"
                              >
                                <span
                                  style={{ backgroundColor: config.hex }}
                                  className={`w-7 h-7 rounded-full flex items-center justify-center transition active:scale-90 shadow-md ${
                                    isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 border border-black/45' : 'opacity-85 hover:opacity-100 border border-slate-500/25'
                                  }`}
                                >
                                  {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                                </span>
                                <span className={`text-[8.5px] ${isSelected ? `${tc.text} font-black` : 'text-slate-500'} truncate w-full text-center`}>
                                  {pashtoLabels[colorName] || colorName}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 4. TEXT SIZE CONTROLS */}
                      <div className="space-y-2 border-t border-slate-500/10 pt-3">
                        <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                          <Type className={`w-3.5 h-3.5 ${tc.text}`} />
                          <span>{tr.textColor}</span>
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setTextSizeClass(sz)}
                              style={{ cursor: 'pointer' }}
                              className={`py-2 px-1 rounded-xl border text-[10.5px] font-bold transition flex items-center justify-center gap-1 ${
                                textSizeClass === sz
                                  ? `${tc.bg} ${tc.border} text-white shadow-md`
                                  : `${isDark ? 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-205 text-slate-700 hover:bg-slate-150'}`
                              }`}
                            >
                              {textSizeClass === sz && <Check className="w-3 h-3 text-white shrink-0" />}
                              <span>
                                {sz === 'sm' && 'وړوکي'}
                                {sz === 'base' && 'منځنی'}
                                {sz === 'lg' && 'لوی'}
                                {sz === 'xl' && 'ډېر لوی'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 6. NOTIFICATIONS TOGGLE */}
                      <div className="flex items-center justify-between p-3.5 bg-slate-500/5 rounded-xl border border-slate-500/10 text-right font-sans pt-1 mt-1">
                        <div className="flex items-center gap-1.5 text-right">
                          {notificationsEnabled ? <Bell className={`w-4 h-4 ${tc.text}`} /> : <BellOff className="w-4 h-4 text-slate-500" />}
                          <span className={`text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-850'} font-bold`}>{tr.notifications}:</span>
                        </div>
                        <button
                          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                          style={{ cursor: 'pointer' }}
                          className={`py-1.5 px-3 rounded-lg text-[10px] font-black tracking-wide uppercase transition ${
                            notificationsEnabled ? 'bg-emerald-500/15 border border-emerald-500/25 text-emerald-450 dark:text-emerald-400' : 'bg-slate-500/10 border border-slate-500/20 text-slate-500'
                          }`}
                        >
                          {notificationsEnabled ? tr.enabled : tr.disabled}
                        </button>
                      </div>

                      {/* 7. CUSTOM BACKEND HOST ADDRESS */}
                      <div className="space-y-2 border-t border-slate-500/10 pt-3">
                        <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                          <span>د لینک سرور آدرس (Server API Host)</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={backendHostInput}
                            onChange={(e) => {
                              setBackendHostInput(e.target.value);
                            }}
                            placeholder="https://your-backend-server.com"
                            className={`w-full ${isDark ? 'bg-slate-950/80 border-slate-855 text-slate-100' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2.5 text-[11px] ltr outline-none focus:ring-1 focus:ring-indigo-500`}
                          />
                          <button
                            onClick={() => {
                              localStorage.setItem('dewa_custom_backend_host', backendHostInput);
                              alert('د سرور نوی پیوستون آدرس خوندي شو؛ اوس به له لاندې سرور څخه معلومات پروسیس کیږي.');
                            }}
                            style={{ cursor: 'pointer' }}
                            className={`${tc.bg} ${tc.hoverBg} active:scale-95 text-white rounded-xl px-4 text-xs font-bold transition shrink-0`}
                          >
                            {tr.pari}
                          </button>
                        </div>
                      </div>

                      {/* 8. RESET STORAGE / CLEAR CACHE */}
                      <div className="space-y-2 border-t border-slate-500/10 pt-3">
                        <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          <span>{tr.clearCache}</span>
                        </label>
                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-rose-500/5 border-rose-500/15' : 'bg-rose-50 border-rose-200'} flex flex-col gap-2.5`}>
                          <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>{tr.clearCacheHelp}</p>
                          <button
                            onClick={() => {
                              setShowClearCacheConfirm(true);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="bg-rose-600 hover:bg-rose-550 active:scale-95 text-white py-2 px-3 rounded-xl text-[10.5px] font-bold transition flex items-center justify-center gap-1.5 self-start"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{tr.clearCacheBtn}</span>
                          </button>
                        </div>
                      </div>

                      {/* Dynamic System Status info card */}
                      <div className={`p-3 rounded-xl border ${subCardBg} space-y-1.5 text-right font-sans`}>
                        <p className="text-[9.5px] text-slate-500">د تړاو او سیستم کچه:</p>
                        <div className="flex items-center justify-between text-[10.5px]">
                          <span className={`text-[10px] ${isDark ? 'bg-slate-850' : 'bg-slate-200'} px-2 py-0.5 rounded font-mono ${tc.text}`}>سکریپ غاړه ایښودنه</span>
                          <span className={`${isDark ? 'text-slate-350' : 'text-slate-755'}`}>د معلوماتو طریقه:</span>
                        </div>
                        <div className="flex items-center justify-between text-[10.5px]">
                          <span className="text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-500 font-mono">آنلاین (ثبت)</span>
                          <span className={`${isDark ? 'text-slate-350' : 'text-slate-755'}`}>د اپلیکیشن کیفیت:</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveModal(null)}
                        style={{ cursor: 'pointer' }}
                        className={`w-full py-2.5 ${tc.bg} ${tc.hoverBg} text-white rounded-xl text-xs font-bold transition mt-2`}
                      >
                        {appLanguage === 'en' ? 'Home' : 'کورپاڼه'}
                      </button>
                    </div>
                  )}

                  {/* About Content */}
                  {activeModal === 'about' && (
                    <div className="space-y-4 text-right font-sans max-h-[75vh] overflow-y-auto pr-1">
                      {/* Hero Section Card */}
                      <div className="relative overflow-hidden rounded-2xl border border-slate-500/10 shadow-lg">
                        {/* Gradient Header */}
                        <div className="h-24 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 flex items-end justify-center pb-2 relative">
                          <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[8px] font-mono text-indigo-300">
                            Developer Profile
                          </div>
                        </div>
                        {/* Profile Info Card Content */}
                        <div className={`pt-12 pb-5 px-4 text-center relative ${subCardBg}`}>
                          {/* Circular Avatar */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-slate-900 bg-slate-950 overflow-hidden shadow-lg">
                            <img
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                              className="w-full h-full object-cover"
                              alt="Obaidullah Ghaffari Portal"
                            />
                          </div>
                          
                          <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>عبیدالله غفاري</h4>
                          <span className="text-[10px] text-slate-400 block mt-1 tracking-wider">
                            طالب العلم • AI Developer • Web Enthusiast
                          </span>

                          {/* Quick Action Contact Buttons */}
                          <div className="flex items-center justify-center gap-2 mt-4">
                            <a
                              href="https://ghafoori.me"
                              target="_blank"
                              rel="noreferrer"
                              className="py-1.5 px-3 bg-indigo-650/10 hover:bg-indigo-600/20 text-indigo-400 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                            >
                              <Globe className="w-3 h-3" />
                              <span>Website</span>
                            </a>
                            <a
                              href="mailto:contact@ghafoori.me"
                              className="py-1.5 px-3 bg-indigo-650/10 hover:bg-indigo-600/20 text-indigo-400 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Email</span>
                            </a>
                            <a
                              href="https://wa.me/93700005555"
                              target="_blank"
                              rel="noreferrer"
                              className="py-1.5 px-3 bg-indigo-650/10 hover:bg-indigo-600/20 text-indigo-400 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* About Me Card */}
                      <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-2 text-right`}>
                        <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                          <span className="text-xs">زما په اړه</span>
                          <User className="w-4 h-4" />
                        </div>
                        <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
                          زه عبیدالله غفاري یم، د لوګر ولایت اوسېدونکی او د جهادي مدرسې د اوومې درجې طالب العلم. د ټکنالوژۍ، ویب پرافتیا, مصنوعي ځیرکتیا او زده کړې سره ځانګړې مینه لرم او هڅه کوم چې د دین، هېواد او پښتو ژبې لپاره ګټور ډیجیټلي خدمتونه وړاندې کړم.
                        </p>
                      </div>

                      {/* Mission Card */}
                      <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-2 text-right`}>
                        <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                          <span className="text-xs">زما موخه</span>
                          <Rocket className="w-4 h-4" />
                        </div>
                        <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
                          دین ته خدمت، هېواد ته خدمت، پښتو ژبې ته وده ورکول، امت او بشریت ته ګټور پاتې کېدل، د پوهې خپرول، نوښت او پرمختګ.
                        </p>
                      </div>

                      {/* Activities Card */}
                      <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-2 text-right`}>
                        <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                          <span className="text-xs">ورځنۍ بوختیاوې</span>
                          <Calendar className="w-4 h-4" />
                        </div>
                        <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
                          مطالعه، دیني زده کړې، AI او ټکنالوژي، ویب پرافتیا، کتاب لوستل، آنلاین کورسونه، ټولنیزې رسنۍ، نوې تجربې.
                        </p>
                      </div>

                      {/* Skills Section */}
                      <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-2.5 text-right`}>
                        <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                          <span className="text-xs">مهارتونه (Skills)</span>
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {['AI', 'Web Development', 'Blogging', 'Content Creation', 'Research', 'Learning', 'UI Design', 'Problem Solving'].map((sk) => (
                            <span
                              key={sk}
                              className={`py-1 px-2.5 rounded-lg text-[9.5px] font-bold ${
                                isDark ? 'bg-slate-950 text-indigo-400 border border-slate-850/80' : 'bg-slate-100 text-indigo-600 border border-slate-200'
                              }`}
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Interests Card */}
                      <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-2 text-right`}>
                        <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                          <span className="text-xs">خوښونې</span>
                          <Heart className="w-4 h-4" />
                        </div>
                        <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-705'} leading-relaxed`}>
                          لیکوالي، بلاګ لیکنه، مطالعه، ټکنالوژي، پروګرامنګ، ویبپاڼې، نوښت، ګټورتوب.
                        </p>
                      </div>

                      {/* Quote Card (Glass Card) */}
                      <div className="p-4 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-md relative overflow-hidden text-right">
                        <Quote className="absolute -left-1 -bottom-1 w-16 h-16 text-indigo-500/10 -rotate-12 pointer-events-none" />
                        <div className="flex items-start gap-2 justify-end">
                          <p className="text-[10.5px] text-indigo-300 font-medium italic leading-relaxed">
                            "بریالیتوب منزل نه دی، بلکې د زده کړې، هڅې او خدمت دوامداره سفر دی."
                          </p>
                          <Quote className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        </div>
                      </div>

                      {/* Statistics Section */}
                      <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-3 text-right`}>
                        <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                          <span className="text-xs">احصایه او پرمختګ</span>
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="space-y-2 w-full">
                          {/* Item 1 */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[9.5px]">
                              <span className="font-mono text-indigo-400">90%</span>
                              <span className="text-slate-350">لوستل او زده کړه</span>
                            </div>
                            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '90%' }} />
                            </div>
                          </div>
                          {/* Item 2 */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[9.5px]">
                              <span className="font-mono text-indigo-400">85%</span>
                              <span className="text-slate-350">ټکنالوژي</span>
                            </div>
                            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '85%' }} />
                            </div>
                          </div>
                          {/* Item 3 */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[9.5px]">
                              <span className="font-mono text-indigo-400">80%</span>
                              <span className="text-slate-350">نوښت</span>
                            </div>
                            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '80%' }} />
                            </div>
                          </div>
                          {/* Item 4 */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[9.5px]">
                              <span className="font-mono text-indigo-400">95%</span>
                              <span className="text-slate-350">خدمت</span>
                            </div>
                            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-indigo-505 h-full rounded-full" style={{ width: '95%' }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Section */}
                      <div className="pt-2 border-t border-slate-500/10 flex flex-col items-center gap-1 text-center font-sans">
                        <span className="text-[10px] text-slate-400 flex items-center justify-center">
                          Made with <Heart className="w-3 h-3 text-rose-500 mx-1 inline" /> by عبیدالله غفاري
                        </span>
                        <span className="text-[9px] text-slate-500">Version 1.0</span>
                      </div>

                      <button
                        onClick={() => setActiveModal(null)}
                        style={{ cursor: 'pointer' }}
                        className={`w-full py-2.5 ${tc.bg} ${tc.hoverBg} text-white rounded-xl text-xs font-bold transition mt-2`}
                      >
                        {appLanguage === 'en' ? 'Close' : 'بند کړئ'}
                      </button>
                    </div>
                  )}

                  {/* Recommended Apps Grid */}
                  {activeModal === 'apps' && (
                    <div className="space-y-4">
                      <p className="text-[11px] text-slate-400">زمونږ د مینه والو لپاره نور وړاندیز شوي ګټور اپلیکیشنونه:</p>
                      
                      <div className="space-y-2.5">
                        {/* App 1 */}
                        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 flex items-center justify-between gap-3 text-right">
                          <a
                            href="https://t.me/da_mine_dewa"
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-indigo-600/10 hover:bg-indigo-600/30 font-mono text-[9.5px] font-bold rounded text-indigo-400 shrink-0 select-none"
                          >
                            خلاصول
                          </a>
                          <div className="min-w-0 flex-1">
                            <h5 className="text-[11.5px] font-bold text-white truncate">پښتو کیبورډ پرو</h5>
                            <p className="text-[9.5px] text-slate-500 line-clamp-1 mt-0.5">افغاني ښکلي سټیکرونه او پراخه لغاتونه</p>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                            <Grid className="w-4 h-4 text-indigo-400" />
                          </div>
                        </div>

                        {/* App 2 */}
                        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 flex items-center justify-between gap-3 text-right">
                          <a
                            href="https://t.me/da_mine_dewa"
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-indigo-600/10 hover:bg-indigo-600/30 font-mono text-[9.5px] font-bold rounded text-indigo-400 shrink-0 select-none"
                          >
                            خلاصول
                          </a>
                          <div className="min-w-0 flex-1">
                            <h5 className="text-[11.5px] font-bold text-white truncate">پښتنې ادبي خزانه</h5>
                            <p className="text-[9.5px] text-slate-500 line-clamp-1 mt-0.5">تر ۱۰۰۰۰ ډیر غزلونه او کیسې پښتو کتابونه</p>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveModal(null)}
                        style={{ cursor: 'pointer' }}
                        className="w-full py-2.5 bg-slate-800 hover:bg-slate-755 text-slate-300 rounded-xl text-xs font-bold transition"
                      >
                        بند کړئ
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* 4. PHOTO LIGHTBOX (د انځور د زومولو او ليدلو ځانګړی ماډل) */}
      <AnimatePresence>
        {zoomPhotoUrl && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomPhotoUrl(null)}
              className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center cursor-zoom-out p-4 select-none backdrop-blur-md"
            >
              {/* Controls Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomPhotoUrl(null);
                  }}
                  style={{ cursor: 'pointer' }}
                  className="p-3 bg-slate-900/90 hover:bg-slate-800 rounded-full border border-slate-800 text-white transition active:scale-95"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="flex gap-2 items-center">
                  {zoomPhotoUrlsList.length > 1 && (
                    <span className="bg-slate-900/95 text-white px-3 py-1.5 rounded-xl text-xs font-mono font-black border border-slate-800 select-none">
                      {zoomPhotoIndex + 1} / {zoomPhotoUrlsList.length}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomScale(prev => Math.max(1, prev - 0.5));
                    }}
                    style={{ cursor: 'pointer' }}
                    className="py-2 px-3.5 bg-slate-900/90 hover:bg-slate-800 rounded-xl border border-slate-800 text-xs font-bold text-white transition active:scale-95"
                  >
                    کوچنی کول (-)
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomScale(prev => Math.min(4, prev + 0.5));
                    }}
                    style={{ cursor: 'pointer' }}
                    className="py-2 px-3.5 bg-slate-900/90 hover:bg-slate-800 rounded-xl border border-slate-800 text-xs font-bold text-white transition active:scale-95"
                  >
                    زوم کول (+)
                  </button>
                </div>
              </div>

              {/* Navigation arrows for multi-image switching */}
              {zoomPhotoUrlsList.length > 1 && (
                <>
                  {/* Previous Button (Left Arrow) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const prevIndex = (zoomPhotoIndex - 1 + zoomPhotoUrlsList.length) % zoomPhotoUrlsList.length;
                      setZoomPhotoIndex(prevIndex);
                      setZoomPhotoUrl(zoomPhotoUrlsList[prevIndex]);
                      setZoomScale(1);
                    }}
                    style={{ cursor: 'pointer' }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition active:scale-90 z-[1000] border border-white/10"
                    title="مخکینی انځور"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>

                  {/* Next Button (Right Arrow) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIndex = (zoomPhotoIndex + 1) % zoomPhotoUrlsList.length;
                      setZoomPhotoIndex(nextIndex);
                      setZoomPhotoUrl(zoomPhotoUrlsList[nextIndex]);
                      setZoomScale(1);
                    }}
                    style={{ cursor: 'pointer' }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition active:scale-90 z-[1000] border border-white/10"
                    title="بل انځور"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Zoom Preview Canvas */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: zoomScale }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="max-w-full max-h-[80vh] flex items-center justify-center p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  // Cycle zoom scale between 1x, 2x, and 3x
                  setZoomScale(prev => {
                    if (prev === 1) return 2;
                    if (prev === 2) return 3;
                    return 1;
                  });
                }}
              >
                <img
                  src={zoomPhotoUrl}
                  referrerPolicy="no-referrer"
                  alt="Zoom detail view"
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl cursor-pointer"
                />
              </motion.div>
              
              <div className="absolute bottom-6 text-center text-xs text-slate-400 bg-slate-900/50 py-1.5 px-4 rounded-full backdrop-blur-xs">
                بېرته وتلو لپاره په شا او خوا تور پړاو کلیک وکړئ
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
