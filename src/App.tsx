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
  ChevronUp,
  ChevronDown,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Clock,
  History,
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
  LogOut,
  Hash,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom elegant PDF Book display and download component
function CustomBookDownload({ post, isDark, tc }: { post: TelegramPost; isDark: boolean; tc: any }) {
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [activeFile, setActiveFile] = useState<{ fileName: string; fileSize?: string; url?: string; postUrl?: string } | null>(null);

  const defaultFileName = post.fileName || post.text?.split('\n')?.[0]?.slice(0, 45) || 'پښتو ادبي خزانه کتاب (PDF)';
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

function toPashtoNumber(num: number): string {
  const pashtoDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (d) => pashtoDigits[parseInt(d)]);
}

function getRelativeTimeInPashto(dateStr: string | undefined | null, fallbackLabel: string): string {
  if (!dateStr) return fallbackLabel || 'وروستی';
  try {
    const postDate = new Date(dateStr);
    if (isNaN(postDate.getTime())) return fallbackLabel || 'وروستی';

    const now = new Date();
    const diffMs = now.getTime() - postDate.getTime();
    
    if (diffMs < 0) {
      return 'همدا اوس';
    }

    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
      return 'همدا اوس';
    }
    if (diffMins < 60) {
      if (diffMins === 1) return '۱ دقيقه مخکې';
      if (diffMins === 2) return '۲ دقيقې مخکې';
      return `${toPashtoNumber(diffMins)} دقيقې مخکې`;
    }
    if (diffHours < 24) {
      if (diffHours === 1) return '۱ ساعت مخکې';
      if (diffHours === 2) return '۲ ساعته مخکې';
      return `${toPashtoNumber(diffHours)} ساعته مخکې`;
    }
    if (diffDays < 30) {
      if (diffDays === 1) return '۱ ورځ مخکې';
      if (diffDays === 2) return '۲ ورځې مخکې';
      return `${toPashtoNumber(diffDays)} ورځې مخکې`;
    }

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) {
      if (diffMonths === 1) return '۱ میاشت مخکې';
      if (diffMonths === 2) return '۲ میاشتې مخکې';
      return `${toPashtoNumber(diffMonths)} میاشتې مخکې`;
    }

    const diffYears = Math.floor(diffDays / 365);
    if (diffYears === 1) return '۱ کال مخکې';
    if (diffYears === 2) return '۲ کاله مخکې';
    return `${toPashtoNumber(diffYears)} کاله مخکې`;

  } catch (error) {
    return fallbackLabel || 'وروستی';
  }
}

const makeHtmlHashtagsClickable = (html: string) => {
  if (!html) return '';
  return html.replace(/(#[\u0600-\u06FFa-zA-Z0-9_]+)/g, (match) => {
    return `<span class="text-indigo-400 hover:text-indigo-350 font-black hover:underline mx-0.5 inline-block" style="cursor: pointer;" onclick="if(window.handleHashtagClickGlobal) window.handleHashtagClickGlobal('${match}')">${match}</span>`;
  });
};

// Custom text component to render Telegram formatting beautifully (with line-breaks and stanzas)
function BeautifulTelegramText({ 
  text, 
  isDark, 
  fs, 
  limitLines = 6, 
  showExpander = true,
  onReadMoreClick 
}: { 
  text: string; 
  isDark: boolean; 
  fs: any; 
  limitLines?: number; 
  showExpander?: boolean;
  onReadMoreClick?: () => void;
}) {
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

  // Enforce exactly 2 lines limit if onReadMoreClick is provided, otherwise standard 3 lines
  const actualLimit = onReadMoreClick ? 2 : (showExpander ? 3 : limitLines);

  // Split by newline to respect visual poetry stanzas and empty line spacing
  let lines = cleanText.split('\n');
  
  // For List View previews, remove any completely empty/whitespace-only lines so they don't consume preview constraints
  if (showExpander || onReadMoreClick) {
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
      if (onReadMoreClick) {
        // Render suffix locally or in a button block instead of inside elements
      } else {
        elements.push(
          <span
            key="more-suffix"
            className="text-indigo-400 font-bold hover:text-indigo-350 transition select-none mr-2 inline-block whitespace-nowrap align-middle"
            style={{ direction: 'rtl' }}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(true);
            }}
          >
            ... نور وګورئ
          </span>
        );
      }

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
      {needsTruncation && !expanded && onReadMoreClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReadMoreClick();
          }}
          className="mt-1 pb-1 text-[11.5px] text-indigo-400 hover:text-indigo-300 font-extrabold flex items-center gap-1 cursor-pointer transition select-none ml-auto"
        >
          <span>نور ولولئ</span>
          <span className="text-[9px]">◀</span>
        </button>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// GLOBAL BACKGROUND AUDIO SERVICE (شالید/بیکګراونډ کې د بې غږه غږولو سیسټم)
// -------------------------------------------------------------
interface GlobalAudioState {
  url: string;
  title: string;
  duration?: string;
  progress: number;
  currentTime: string;
  totalDuration: string;
  isPlaying: boolean;
  playbackRate?: number;
}

let globalAudioElement: HTMLAudioElement | null = null;
let globalAudioState: GlobalAudioState = {
  url: '',
  title: '',
  duration: '',
  progress: 0,
  currentTime: '0:00',
  totalDuration: '0:00',
  isPlaying: false,
  playbackRate: 1.0,
};

const audioSubscribers = new Set<(state: GlobalAudioState) => void>();

function updateGlobalAudio(patch: Partial<GlobalAudioState>) {
  globalAudioState = { ...globalAudioState, ...patch };
  audioSubscribers.forEach((sub) => sub(globalAudioState));
}

function subscribeToGlobalAudio(sub: (state: GlobalAudioState) => void) {
  audioSubscribers.add(sub);
  sub(globalAudioState);
  return () => {
    audioSubscribers.delete(sub);
  };
}

function playGlobalAudio(url: string, title: string, duration?: string) {
  if (!globalAudioElement) {
    globalAudioElement = new Audio();
    
    globalAudioElement.addEventListener('play', () => {
      if (globalAudioElement) {
        globalAudioElement.playbackRate = globalAudioState.playbackRate || 1.0;
      }
      updateGlobalAudio({ isPlaying: true });
    });
    globalAudioElement.addEventListener('pause', () => {
      updateGlobalAudio({ isPlaying: false });
    });
    globalAudioElement.addEventListener('timeupdate', () => {
      if (!globalAudioElement) return;
      const cur = globalAudioElement.currentTime;
      const dur = globalAudioElement.duration || 0;
      const progress = dur > 0 ? (cur / dur) * 100 : 0;
      
      const formatTime = (secs: number) => {
        if (isNaN(secs)) return '0:00';
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
      };

      updateGlobalAudio({
        progress,
        currentTime: formatTime(cur),
        totalDuration: dur > 0 ? formatTime(dur) : (globalAudioState.duration || '0:00')
      });
    });
    globalAudioElement.addEventListener('loadedmetadata', () => {
      if (!globalAudioElement) return;
      globalAudioElement.playbackRate = globalAudioState.playbackRate || 1.0;
      const formatTime = (secs: number) => {
        if (isNaN(secs)) return '0:00';
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
      };
      updateGlobalAudio({
        totalDuration: formatTime(globalAudioElement.duration)
      });
    });
    globalAudioElement.addEventListener('ended', () => {
      updateGlobalAudio({ isPlaying: false, progress: 0, currentTime: '0:00' });
    });
  }

  // Stop other standard videos before starting globally
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(v => v.pause());

  if (globalAudioState.url === url) {
    if (globalAudioElement) {
      globalAudioElement.playbackRate = globalAudioState.playbackRate || 1.0;
    }
    globalAudioElement.play().catch(err => console.warn(err));
  } else {
    globalAudioElement.src = url;
    globalAudioElement.preload = 'auto';
    if (globalAudioElement) {
      globalAudioElement.playbackRate = globalAudioState.playbackRate || 1.0;
    }
    updateGlobalAudio({
      url,
      title,
      duration: duration || '0:00',
      progress: 0,
      currentTime: '0:00',
      totalDuration: duration || '0:00',
      isPlaying: true
    });
    globalAudioElement.play().catch(err => {
      console.warn("Background audio play failed:", err);
    });
  }
}

function pauseGlobalAudio() {
  if (globalAudioElement) {
    globalAudioElement.pause();
  }
}

function seekGlobalAudio(percent: number) {
  if (globalAudioElement) {
    const dur = globalAudioElement.duration || 0;
    if (dur > 0) {
      globalAudioElement.currentTime = (percent / 100) * dur;
      updateGlobalAudio({ progress: percent });
    }
  }
}

function stopAndCloseGlobalAudio() {
  if (globalAudioElement) {
    globalAudioElement.pause();
    globalAudioElement.src = '';
  }
  updateGlobalAudio({
    url: '',
    title: '',
    duration: '',
    progress: 0,
    currentTime: '0:00',
    totalDuration: '0:00',
    isPlaying: false
  });
}

function setGlobalPlaybackRate(rate: number) {
  updateGlobalAudio({ playbackRate: rate });
  if (globalAudioElement) {
    globalAudioElement.playbackRate = rate;
  }
}

function useGlobalAudio() {
  const [state, setState] = useState<GlobalAudioState>(globalAudioState);
  useEffect(() => {
    return subscribeToGlobalAudio((newState) => {
      setState(newState);
    });
  }, []);
  return state;
}

// -------------------------------------------------------------
// BEAUTIFUL WAVEFORM VISUALIZER COMPONENT
// -------------------------------------------------------------
function BeautifulWaveform({ 
  progress, 
  isPlaying, 
  onSeek, 
  seed = "dewa",
  isDark,
  tc 
}: { 
  progress: number; 
  isPlaying: boolean; 
  onSeek: (percent: number) => void; 
  seed?: string;
  isDark: boolean;
  tc: any;
}) {
  const bars = React.useMemo(() => {
    const count = 45;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const result: { height: number; delay: string }[] = [];
    for (let i = 0; i < count; i++) {
      const pseudoRandom = Math.sin(hash + i * 1.8) * 0.4 + 0.6;
      const height = Math.floor(20 + pseudoRandom * 75); // 20% to 95%
      const delay = (i * 0.03).toFixed(3) + 's';
      result.push({ height, delay });
    }
    return result;
  }, [seed]);

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    onSeek(percent);
  };

  return (
    <div 
      onClick={handleWaveformClick}
      className="relative flex items-center justify-between h-7 w-full cursor-pointer select-none group px-1 rounded-md"
    >
      <style>{`
        @keyframes tg-waveform-pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.4); }
        }
        .tg-wave-active-animated {
          animation: tg-waveform-pulse 0.8s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
      {bars.map((bar, idx) => {
        const barPercent = (idx / bars.length) * 100;
        const isActive = progress >= barPercent;
        
        let barColorClass = '';
        if (isActive) {
          barColorClass = tc.bg || 'bg-indigo-650';
        } else {
          barColorClass = isDark ? 'bg-slate-800' : 'bg-slate-300';
        }

        return (
          <div
            key={idx}
            style={{ 
              height: `${bar.height}%`, 
              animationDelay: isPlaying && isActive ? bar.delay : undefined,
              transition: 'background-color 0.2s, height 0.15s'
            }}
            className={`w-[1.5px] sm:w-[2.2px] rounded-full ${barColorClass} ${isPlaying && isActive ? 'tg-wave-active-animated' : ''}`}
          />
        );
      })}
    </div>
  );
}

// Helper to parse a beautiful, human-readable audio chapter or voice title
function getBeautifulAudioTitle(audioTitle: string | undefined, fallbackTitle: string | undefined, postText?: string, idx?: number): string {
  const genericTitles = ['غږیز فایل / پیغام', 'غږیز فایل خپرونه', 'غږیز پیغام', 'غږیز فایل', 'اصلي معرفي کوونکی فایل غږول', 'غور چاڼ غږونه'];
  const baseTitle = (audioTitle || '').trim();
  const isGeneric = !baseTitle || genericTitles.some(t => baseTitle.includes(t)) || baseTitle.length < 3;
  
  if (isGeneric) {
    if (fallbackTitle && fallbackTitle.trim() !== '') {
      let t = fallbackTitle.trim();
      if (t.length > 55) t = t.slice(0, 52) + '...';
      return t;
    }
    if (postText && postText.trim() !== '') {
      const firstLine = postText.replace(/#[^\s]+/g, '').split('\n').filter(l => l.trim() !== '')[0];
      if (firstLine && firstLine.trim().length > 3) {
        let cleaned = firstLine.trim();
        if (cleaned.length > 55) {
          cleaned = cleaned.slice(0, 52) + '...';
        }
        return cleaned;
      }
    }
    return idx !== undefined ? `غږیز روایت ${idx + 1}` : 'د رومان برخه غږول';
  }
  return baseTitle;
}

// Custom elegant audio player with prominent progress tracker and visual waveform matching the video player's style
function BeautifulAudioPlayer({ url, title, duration, isDark, tc }: { key?: any; url: string; title: string; duration?: string; isDark: boolean; tc: any }) {
  const globalAudio = useGlobalAudio();
  const isThisActive = globalAudio.url === url;

  const isPlaying = isThisActive ? globalAudio.isPlaying : false;
  const progress = isThisActive ? globalAudio.progress : 0;
  const currentTime = isThisActive ? globalAudio.currentTime : '0:00';
  const totalDuration = isThisActive ? globalAudio.totalDuration : (duration || '0:00');
  const activeSpeed = isThisActive ? (globalAudio.playbackRate || 1.0) : 1.0;

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisActive) {
      if (isPlaying) {
        pauseGlobalAudio();
      } else {
        playGlobalAudio(url, title, duration);
      }
    } else {
      playGlobalAudio(url, title, duration);
    }
  };

  const handleSeek = (percent: number) => {
    if (isThisActive) {
      seekGlobalAudio(percent);
    } else {
      playGlobalAudio(url, title, duration);
      setTimeout(() => {
        seekGlobalAudio(percent);
      }, 150);
    }
  };

  const handleSpeedCycle = (e: React.MouseEvent) => {
    e.stopPropagation();
    let nextSpeed = 1.0;
    const currentSpeed = globalAudio.playbackRate || 1.0;
    if (currentSpeed === 1.0) nextSpeed = 1.5;
    else if (currentSpeed === 1.5) nextSpeed = 2.0;
    else nextSpeed = 1.0;
    
    setGlobalPlaybackRate(nextSpeed);
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      style={{ direction: 'rtl' }}
      className={`p-3.5 rounded-3xl border select-none transition-all duration-300 mt-2.5 w-full flex items-center gap-3.5 text-right ${
        isDark 
          ? 'bg-slate-900/80 border-slate-805/70 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-slate-850/90' 
          : 'bg-slate-50/90 border-slate-205/85 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:bg-slate-100/90'
      }`}
    >
      {/* 1. PLAY BUTTON (Right side in RTL) */}
      <div className="relative shrink-0 select-none">
        {isPlaying && (
          <span className={`absolute -inset-1 rounded-full animate-ping opacity-20 ${tc.bg || 'bg-indigo-650'}`} />
        )}
        <button
          onClick={togglePlay}
          style={{ cursor: 'pointer' }}
          className={`w-11 h-11 rounded-full ${tc.bg || 'bg-indigo-650'} ${tc.hoverBg || 'bg-indigo-600'} hover:scale-105 active:scale-95 text-white flex items-center justify-center relative z-10 transition duration-300 shadow-[0_3px_10px_rgba(30,30,30,0.15)]`}
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5 fill-current text-white animate-pulse" viewBox="0 0 24 24">
              <rect x="5" y="4" width="4" height="16" rx="1.5" />
              <rect x="15" y="4" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current text-white translate-x-[-1.5px]" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" style={{ transform: 'scaleX(-1)', transformOrigin: 'center' }} />
            </svg>
          )}
        </button>
      </div>

      {/* 2. AUDIO INNER DETAILS & WAVEFORM */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5 justify-center">
        
        {/* Top bar: Title + Speed Badge */}
        <div className="flex items-center justify-between gap-2">
          {/* Title on the right */}
          <span className={`text-[12px] sm:text-[12.5px] font-black truncate pr-0.5 ${isDark ? 'text-slate-100' : 'text-slate-900'} font-sans`}>
            {title}
          </span>

          {/* Speed cycle badge on the left */}
          <button
            onClick={handleSpeedCycle}
            style={{ cursor: 'pointer' }}
            title="د غږ سرعت تنظیمول"
            className={`px-2 py-0.5 rounded-full text-[9px] font-black font-mono transition-all duration-200 uppercase select-none shrink-0 ${
              activeSpeed !== 1.0 
                ? (isDark ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-100 text-indigo-700 border border-indigo-205')
                : (isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-750' : 'bg-slate-200 text-slate-600 hover:bg-slate-250')
            }`}
          >
            {activeSpeed.toFixed(1)}x
          </button>
        </div>

        {/* Middle Line: Waveform Visualizer */}
        <div className="w-full">
          <BeautifulWaveform 
            progress={progress} 
            isPlaying={isPlaying} 
            onSeek={handleSeek} 
            seed={url || title}
            isDark={isDark}
            tc={tc}
          />
        </div>

        {/* Bottom bar: Timers */}
        <div className="flex items-center justify-between py-0.5 select-none text-[9.5px]">
          {/* Time text e.g. 0:04 / 3:15 */}
          <span className="text-slate-400 font-mono tracking-tight shrink-0">
            {currentTime} / {totalDuration}
          </span>
        </div>

      </div>
    </div>
  );
}

// Custom elegant video player with progress seek bar tracking and overlay play buttons
function BeautifulVideoPlayer({ url, poster, isDark, tc, onClickOverride, autoPlay }: { url: string; poster?: string; isDark: boolean; tc: any; onClickOverride?: () => void; autoPlay?: boolean }) {
  const cachedUrl = useCachedUrl(url);
  const cachedPoster = useCachedUrl(poster);
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
      
      // Stop or pause global background audio
      pauseGlobalAudio();
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name !== 'AbortError') {
            console.warn("Video playback failed:", err);
          }
        });
      }
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

  // Handle Autoplay safely
  useEffect(() => {
    if (autoPlay && videoRef.current) {
      // Pause other playing videos or audios
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(v => {
        if (v !== videoRef.current) v.pause();
      });
      const allAudios = document.querySelectorAll('audio');
      allAudios.forEach(a => a.pause());

      pauseGlobalAudio();

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.warn("Autoplay unmuted blocked by browser, trying muted:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(e => {
              console.warn("Muted autoplay blocked too:", e);
            });
          }
        });
      }
    }
  }, [autoPlay, url]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={() => {
        if (onClickOverride) {
          onClickOverride();
        } else {
          togglePlay();
        }
      }}
      className="relative w-full max-h-[360px] rounded-2xl overflow-hidden bg-black group shadow-xl border border-slate-500/10 dark:border-slate-800 flex items-center justify-center font-sans select-none"
    >
      <video 
        ref={videoRef}
        src={cachedUrl || url}
        poster={cachedPoster || poster || undefined}
        className="w-full h-full max-h-[360px] object-contain cursor-pointer"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
        playsInline
      />
      
      {/* Big Pause/Play Center Overlay Indicator Icon */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none transition duration-300">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              if (onClickOverride) {
                onClickOverride();
              } else {
                togglePlay(e);
              }
            }}
            className="w-12 h-12 rounded-full bg-slate-905/80 backdrop-blur border border-white/20 flex items-center justify-center text-white scale-100 hover:scale-105 active:scale-95 transition cursor-pointer pointer-events-auto shadow-lg"
          >
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

const getIsPoem = (post: TelegramPost | null): boolean => {
  if (!post) return false;
  const isPlain = !post.hasVideo && !post.photoUrl && !(post.photoUrls && post.photoUrls.length > 0) && !post.hasAudio && !getIsBook(post);
  if (!isPlain) return false;

  const text = post.text || '';
  // Check for poetry hashtags (including Pashto & Arabic letter variations)
  const poemHashtags = ['#شعر', '#شعرونه', '#غزل', '#غزلونه', '#نظم', '#بیت', '#شاعر', '#ټپه', '#ترانه'];
  const hasPoemHashtag = poemHashtags.some(tag => text.includes(tag));
  if (hasPoemHashtag) return true;

  // Check if writing hashtags are present (exclusive priority)
  const writingHashtags = ['#ليکنه', '#لیکنه', '#ليکنې', '#لیکنی', '#ليکنه', '#مقاله', '#لیکنه'];
  const hasWritingHashtag = writingHashtags.some(tag => text.includes(tag));
  if (hasWritingHashtag) return false;

  // Fallback to text analysis if no hashtags are present
  const textLower = text.toLowerCase();
  const poetryTerms = [
    'شعر', 'غزل', 'نظم', 'بیت', 'شاعر', 'ټپه', 'چاربيته', 'لنډۍ', 'دروېش', 'کاروان', 'خم نا اشنا', 
    'ساحل', 'ترانه', 'ترانې', 'غزلونه', 'شعرونه', 'بيتونه', 'ټپيزه', 'ټپيزې', 'مصرع', 'مصرعې', 
    'پښتو شعر', 'اشعار', 'مليار', 'خم', 'شراب'
  ];
  const hasPoetryKeyword = poetryTerms.some(term => textLower.includes(term));

  const lines = text.trim().split('\n').filter(l => l.trim().length > 0);
  const isPoeticStructure = lines.length >= 4 && lines.every(line => line.length < 60);

  return hasPoetryKeyword || isPoeticStructure;
};

const getIsWriting = (post: TelegramPost | null): boolean => {
  if (!post) return false;
  const isPlain = !post.hasVideo && !post.photoUrl && !(post.photoUrls && post.photoUrls.length > 0) && !post.hasAudio && !getIsBook(post);
  if (!isPlain) return false;

  const text = post.text || '';
  // Check for writing hashtags (including Pashto & Arabic letter variations)
  const writingHashtags = ['#ليکنه', '#لیکنه', '#ليکنې', '#لیکنی', '#ليکنه', '#مقاله', '#لیکنه'];
  const hasWritingHashtag = writingHashtags.some(tag => text.includes(tag));
  if (hasWritingHashtag) return true;

  // Check if poem hashtags are present (exclusive priority)
  const poemHashtags = ['#شعر', '#شعرونه', '#غزل', '#غزلونه', '#نظم', '#بیت', '#شاعر', '#ټپه', '#ترانه'];
  const hasPoemHashtag = poemHashtags.some(tag => text.includes(tag));
  if (hasPoemHashtag) return false;

  // Fallback to non-poem plain posts
  return !getIsPoem(post);
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

const preloadedUrls = new Set<string>();
const blobUrlMap = new Map<string, string>();
const DEWA_MEDIA_CACHE_NAME = 'dewa-telegram-media-v3';

// Direct background Cache Storage helper that converts file URLs to local blobs gracefully
async function cacheAndGetBlobUrl(url: string): Promise<string> {
  if (!url) return '';
  if (blobUrlMap.has(url)) {
    return blobUrlMap.get(url)!;
  }
  if (!('caches' in window)) return url;

  try {
    const cache = await caches.open(DEWA_MEDIA_CACHE_NAME);
    const matched = await cache.match(url);
    if (matched) {
      const blob = await matched.blob();
      const bUrl = URL.createObjectURL(blob);
      blobUrlMap.set(url, bUrl);
      return bUrl;
    }

    // Pull from network and store in cache asynchronously
    // Using fetch with cors mode, fallback to original if blocked by CORS
    const res = await fetch(url).catch(() => null);
    if (res && res.ok) {
      await cache.put(url, res.clone());
      const blob = await res.blob();
      const bUrl = URL.createObjectURL(blob);
      blobUrlMap.set(url, bUrl);
      return bUrl;
    }
  } catch (err) {
    console.warn("Background caching error:", err);
  }
  return url;
}

function preloadImg(url: string) {
  if (!url || preloadedUrls.has(url)) return;
  preloadedUrls.add(url);
  cacheAndGetBlobUrl(url);
}

function preloadVid(url: string) {
  if (!url || preloadedUrls.has(url)) return;
  preloadedUrls.add(url);
  cacheAndGetBlobUrl(url);
}

function useCachedUrl(url: string | undefined | null): string {
  const [cachedUrl, setCachedUrl] = useState<string>(url || '');

  useEffect(() => {
    if (!url) {
      setCachedUrl('');
      return;
    }

    if (blobUrlMap.has(url)) {
      setCachedUrl(blobUrlMap.get(url)!);
      return;
    }

    setCachedUrl(url);
    let isMounted = true;

    cacheAndGetBlobUrl(url).then((resolved) => {
      if (isMounted) {
        setCachedUrl(resolved);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return cachedUrl;
}

interface CachedImageProps {
  src: string;
  [key: string]: any;
}

function CachedImage({ src, ...props }: CachedImageProps) {
  const cachedSrc = useCachedUrl(src);
  return <img src={cachedSrc || src} {...props} referrerPolicy="no-referrer" />;
}

function preloadPostMedia(post: any) {
  if (!post) return;
  if (post.photoUrl) {
    preloadImg(post.photoUrl);
  }
  if (post.photoUrls && Array.isArray(post.photoUrls)) {
    post.photoUrls.forEach((url: any) => {
      if (typeof url === 'string') preloadImg(url);
    });
  }
  if (post.videoUrl) {
    preloadVid(post.videoUrl);
  }
  if (post.videoList && Array.isArray(post.videoList)) {
    post.videoList.forEach((v: any) => {
      const url = typeof v === 'string' ? v : (v && v.url);
      if (url) preloadVid(url);
    });
  }
}

/* Global helper function for identifying stories */
export function isStoryPost(post: any) {
  if (!post || !post.text) return false;
  const lowerText = post.text.toLowerCase();
  return lowerText.includes('#سټوري') || lowerText.includes('#ستوری') || lowerText.includes('#story') || lowerText.includes('#سټوريانې');
}

/* Global helper function for identifying novels and their parts */
export function getIsNovelOrNovelPart(post: any | null): boolean {
  if (!post || !post.text) return false;
  const text = post.text.toLowerCase();
  
  // 1. If it's explicitly a Novel Profile
  if (isPostNovelProfileGlobal(post)) return true;
  
  // 2. Contains novel or roman tags
  const hashtags = getPostHashtags(post.text);
  const novelTags = ['#ناول', '#novel', '#رومان', '#ناول_برخه', '#رومان_برخه'];
  const hasNovelTag = hashtags.some(tag => novelTags.includes(tag));
  if (hasNovelTag) return true;

  // 3. Fallback: text contains hashtag #ناول or #رومان
  if (text.includes('#ناول') || text.includes('#رومان')) {
    return true;
  }
  
  return false;
}

/* Global helper function for extracting hashtags */
export function getPostHashtags(text: string): string[] {
  if (!text) return [];
  const matches = text.match(/#[^\s#\.,'\?\!\"🗺️✨🎙️🎵📚✍️():؛،«»\-]+/g) || [];
  return matches.map(tag => tag.trim());
}

/* Global helper function for stripping hashtags entirely */
export function removeHashtagsOnly(text: string): string {
  if (!text) return '';
  const withRemoved = text.replace(/#[^\s#\.,'\?\!\"🗺️✨🎙️🎵📚✍️():؛،«»\-]+/g, '');
  return withRemoved.split('\n').map(line => line.trim()).filter(line => line !== '').join('\n');
}

/* Global helper function for getting unique novel identification-tag */
export function getUniqueNovelHashtagGlobal(text: string): string | null {
  const hashtags = getPostHashtags(text);
  const excluded = [
    '#ناول', '#ناول_پروفایل', '#ناول_پروفايل', '#پروفایل', '#پروفايل', 
    '#پروفایل_ناول', '#پروفايل_ناول', '#کتاب', '#بشپړ', '#معلومات', '#پېژندنه', '#پیژندنه',
    '#پښتو', '#افغانستان', '#audio', '#mp3', '#غږیز', '#صوتي', '#کیسه', '#کيسه',
    '#کیسې', '#کيسې', '#داستان', '#لنډه_کیسه', '#novel_profile', '#profile_novel'
  ];
  return hashtags.find(tag => !excluded.includes(tag)) || null;
}

/* Global helper to determine if a post is a Novel Profile */
export function isPostNovelProfileGlobal(post: any | null): boolean {
  if (!post || !post.text) return false;
  const hashtags = getPostHashtags(post.text);
  return hashtags.some(tag => 
    tag === '#novel_profile' || 
    tag === '#ناول_پروفایل' || 
    tag === '#ناول_پروفايل' || 
    tag === '#profile_novel'
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
    // Fall back to window origin only if we are running in a standard public web environment
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      const origin = window.location.origin;
      const isMobileProtocol = origin.startsWith('file:') || origin.startsWith('capacitor:') || origin.startsWith('chrome-extension:');
      const isLocalUrl = origin.includes('localhost') || origin.includes('127.0.0.1');
      if (!isMobileProtocol && !isLocalUrl) {
        return origin;
      }
    }
    // Mobile apps and local dev fallback to the production deployed host
    return 'https://da-mine-dewa.web.app';
  });
  
  // States for navigation flows
  const [selectedPost, setSelectedPost] = useState<TelegramPost | null>(null);
  const [isFullFeedOpen, setIsFullFeedOpen] = useState(false);
  const chapterScrollRef = useRef<HTMLDivElement | null>(null);

  // Custom states for Favorites system & Bottom Text Sheet
  const [favoritePostIds, setFavoritePostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dewa_favorite_post_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isFavoritesMenuOpen, setIsFavoritesMenuOpen] = useState(false);
  const [activeFavoriteFilter, setActiveFavoriteFilter] = useState<'videos' | 'images' | 'writings' | 'pdf' | 'audio' | null>(null);

  // Reading history state and page state
  const [readingHistoryIds, setReadingHistoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dewa_reading_history_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isReadingHistoryOpen, setIsReadingHistoryOpen] = useState(false);

  // Toggling favorite post helper and automatic sync to localStorage (د خوښې پوسټ ثبت او لرې والي سیسټم)
  const toggleFavorite = (postId: string) => {
    setFavoritePostIds(prev => {
      const exists = prev.includes(postId);
      const updated = exists ? prev.filter(id => id !== postId) : [...prev, postId];
      try {
        localStorage.setItem('dewa_favorite_post_ids', JSON.stringify(updated));
      } catch (e) {
        console.error("Error toggling favorite:", e);
      }
      
      // In-app interactive user feedback toast
      if (exists) {
        showToast('پوسټ ستاسو د خوښو شویو څخه لرې شو! 💔', 'info');
      } else {
        showToast('پوسټ په بریالیتوب سره ستاسو خوښو شویو کې اضافه شو! ❤️', 'success');
      }
      return updated;
    });
  };

  // Share post text directly to WhatsApp with prefilled invite back to channel (واټساپ سره د د شعر د شریکولو بټنه)
  const handleWhatsAppShare = (post: TelegramPost) => {
    if (!post) return;
    const cleanText = getPostTextWithFallback(post) || '';
    
    // Channel Join Link
    const channelUsername = feedData?.channelInfo?.username || 'da_mine_dewa';
    const channelLink = `https://t.me/${channelUsername}`;
    
    // Construct pre-filled message with post body and viral backlink
    const messageTemplate = `${cleanText}\n\n🍀 د پښتو خوږو شعرونو او رسمي ادب پاڼه:\n👉 join: ${channelLink}`;
    
    const encoded = encodeURIComponent(messageTemplate);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    
    window.open(whatsappUrl, '_blank');
    showToast('واټساپ ته د شریکولو دوسیه خلاصه شوه! 🟢', 'success');
  };

  // Smoothly scroll back to the page top (پورته تلو بټن)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const [bottomSheetPost, setBottomSheetPost] = useState<TelegramPost | null>(null);
  const [readPostIds, setReadPostIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dewa_read_posts_ids');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const markPostAsRead = (postId: string) => {
    if (!postId) return;
    setReadPostIds((prev) => {
      if (prev.includes(postId)) return prev;
      const updated = [...prev, postId];
      try {
        localStorage.setItem('dewa_read_posts_ids', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save read posts', err);
      }
      return updated;
    });
  };

  useEffect(() => {
    if (selectedPost && selectedPost.id) {
      markPostAsRead(selectedPost.id);
    }
  }, [selectedPost]);
  const [overlayActiveText, setOverlayActiveText] = useState<string | null>(null);
  const [visibleHomeCount, setVisibleHomeCount] = useState(30);
  const [isAutoloadingMore, setIsAutoloadingMore] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Pagination states for all posts list (starts with 5, loads 5 more automatically)
  const [visibleFullCount, setVisibleFullCount] = useState(5);
  const [isSettingsPageOpen, setIsSettingsPageOpen] = useState(false);
  const [isAboutPageOpen, setIsAboutPageOpen] = useState(false);
  const [isContactPageOpen, setIsContactPageOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isReelsOpen, setIsReelsOpen] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'next' | 'prev'>('next');
  const [isPhotoReelsOpen, setIsPhotoReelsOpen] = useState(false);
  const [activePhotoReelIndex, setActivePhotoReelIndex] = useState(0);
  const [photoSwipeDirection, setPhotoSwipeDirection] = useState<'next' | 'prev'>('next');
  const [isCategoryPageOpen, setIsCategoryPageOpen] = useState(false);
  const [isNovelsPageOpen, setIsNovelsPageOpen] = useState(false);
  const [novelsFeedData, setNovelsFeedData] = useState<FeedResponse | null>(null);
  const [activeNovelTextChapter, setActiveNovelTextChapter] = useState<any | null>(null);
  const [novelScrollProgress, setNovelScrollProgress] = useState(0);
  
  // Custom states and handlers for continuing reading and liked chapters/novels
  const [novelReadingProgressList, setNovelReadingProgressList] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('dewa_novel_reading_progress');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [likedChaptersList, setLikedChaptersList] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('dewa_liked_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const updateNovelReadingProgress = (item: any, progressPercent: number, parentProfilePost?: any) => {
    setNovelReadingProgressList(prev => {
      const filtered = prev.filter(x => x.id !== item.id);
      
      let cleanTitle = item.title || '';
      if (!cleanTitle && item.text) {
        cleanTitle = item.text.split('\n').filter((l: string) => l.trim() !== '')[0]?.replace(/#[^\s]+/g, '').trim() || 'بې سرلیکه اثر';
      }
      if (!cleanTitle) {
        cleanTitle = 'برخه';
      }

      const updatedItem = {
        id: item.id,
        title: cleanTitle,
        progress: progressPercent,
        timestamp: Date.now(),
        post: item,
        parentPost: parentProfilePost || null,
      };
      
      const newList = [updatedItem, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('dewa_novel_reading_progress', JSON.stringify(newList));
      } catch (e) {
        console.error("Error writing reading progress:", e);
      }
      return newList;
    });
  };

  const toggleChapterFavorite = (chapter: any, parentPost?: any) => {
    setLikedChaptersList(prev => {
      const exists = prev.some(x => x.id === chapter.id);
      let updated;
      if (exists) {
        updated = prev.filter(x => x.id !== chapter.id);
      } else {
        const cleanText = chapter.text 
          ? chapter.text.replace(/#[^\s]+/g, '').trim()
          : 'بې سرلیکه برخه';
        const cleanTitle = cleanText.split('\n')[0] || 'بې سرلیکه چپتر';
        
        updated = [{
          id: chapter.id,
          title: cleanTitle,
          post: chapter,
          parentPost: parentPost || null,
          timestamp: Date.now()
        }, ...prev];
      }
      try {
        localStorage.setItem('dewa_liked_chapters', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    
    toggleFavorite(chapter.id);
  };

  const resumeReadingItem = (item: any) => {
    if (item.parentPost) {
      setSelectedPost(item.parentPost);
      setActiveNovelTextChapter(item.post);
    } else {
      setSelectedPost(item.post);
    }
  };

  const removeReadingProgress = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNovelReadingProgressList(prev => {
      const updated = prev.filter(x => x.id !== id);
      try {
        localStorage.setItem('dewa_novel_reading_progress', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const [bookmarksList, setBookmarksList] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('dewa_novel_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (chapterId: string, chapter: any, novel: any, pIndex: number, pText: string) => {
    setBookmarksList(prev => {
      const keyId = `${chapterId}_p_${pIndex}`;
      const exists = prev.some(x => x.id === keyId);
      let updated;
      if (exists) {
        updated = prev.filter(x => x.id !== keyId);
      } else {
        const cleanText = chapter.text 
          ? chapter.text.replace(/#[^\s]+/g, '').trim()
          : 'بې سرلیکه برخه';
        const cleanChapterTitle = cleanText.split('\n')[0] || 'بې سرلیکه چپتر';
        const cleanNovelTitle = novel?.text 
          ? novel.text.replace(/#کیسه|#ناول|#داستان|#کیسې|#رومان|#غږیز|#صوتي|#کتاب|#داستانونه/g, '').split('\n')[0].trim()
          : 'بې نومه اثر';

        const newBookmark = {
          id: keyId,
          chapterId: chapterId,
          chapterTitle: cleanChapterTitle,
          novelId: novel?.id || '',
          novelTitle: cleanNovelTitle,
          paragraphIndex: pIndex,
          textSnippet: pText.substring(0, 75) + (pText.length > 75 ? '...' : ''),
          paragraphText: pText,
          timestamp: Date.now(),
          chapterPost: chapter,
          novelPost: novel || null
        };
        updated = [newBookmark, ...prev];
      }
      try {
        localStorage.setItem('dewa_novel_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.error("Error writing bookmarks:", e);
      }
      return updated;
    });
  };

  const removeBookmarkRaw = (keyId: string) => {
    setBookmarksList(prev => {
      const updated = prev.filter(x => x.id !== keyId);
      try {
        localStorage.setItem('dewa_novel_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const [activeBookmarkParagraphIndex, setActiveBookmarkParagraphIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeNovelTextChapter && activeBookmarkParagraphIndex !== null) {
      const t = setTimeout(() => {
        const element = document.getElementById(`para-${activeBookmarkParagraphIndex}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('animate-pulse', 'ring-2', 'ring-indigo-500/30', 'p-2', 'rounded-2xl');
          setTimeout(() => {
            element.classList.remove('animate-pulse', 'ring-2', 'ring-indigo-500/30', 'p-2', 'rounded-2xl');
          }, 3000);
        }
        setActiveBookmarkParagraphIndex(null);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [activeNovelTextChapter, activeBookmarkParagraphIndex]);
  const [isNovelsLoading, setIsNovelsLoading] = useState(false);
  const [novelsErrorMsg, setNovelsErrorMsg] = useState<string | null>(null);
  const [activeNovelCategory, setActiveNovelCategory] = useState<'stories' | 'novels'>('stories');
  const [activeNovelSubTab, setActiveNovelSubTab] = useState<'audio' | 'written'>('audio');
  const [isNovelsScrapingMore, setIsNovelsScrapingMore] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  // Splash Screen and Onboarding states
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeOnboardingPage, setActiveOnboardingPage] = useState(0);
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
    localStorage.removeItem('dewa_custom_backend_host');
    setBackendHostInput(typeof window !== 'undefined' && window.location?.origin ? window.location.origin : 'https://da-mine-dewa.web.app');
    setFeedData(null);
    setIsLoading(true);
    setIsSettingsPageOpen(false);
    setActiveModal(null);
    setShowClearCacheConfirm(false);
    showToast(appLanguage === 'en' ? 'App storage and cache cleared successfully!' : 'کاشه په بریالیتوب سره پاکه شوه او غوښتنلیک بیا فعاله شو!', 'success');
    fetchChannelData();
  };

  // ==========================================================
  // PULL TO REFRESH ENGINE FOR HOME MESSAGE FEED
  // ==========================================================
  const [pullDistance, setPullDistance] = useState<number>(0);
  const [pullState, setPullState] = useState<'idle' | 'pulling' | 'ready' | 'refreshing'>('idle');
  const pullStartYRef = useRef<number | null>(null);

  useEffect(() => {
    // Only bind if we are on the home screen view of the feed (no modal pages, no sub views)
    const isHomeActive = !selectedPost && 
                         !isAboutPageOpen && 
                         !isContactPageOpen && 
                         !isSettingsPageOpen && 
                         !isReelsOpen && 
                         !isPhotoReelsOpen && 
                         !isCategoryPageOpen;

    if (!isHomeActive) {
      setPullDistance(0);
      setPullState('idle');
      return;
    }

    const handleTouchStart = (e: TouchEvent) => {
      // Check if we are scrolled to the absolute top
      if (window.scrollY <= 2) {
        pullStartYRef.current = e.touches[0].clientY;
      } else {
        pullStartYRef.current = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (pullStartYRef.current === null) return;

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - pullStartYRef.current;

      if (deltaY > 0) {
        // We are pulling down!
        // Apply friction to the pull distance
        const friction = 0.45;
        const dragDist = deltaY * friction;
        const limitedDistance = Math.min(130, dragDist);

        if (limitedDistance > 10) {
          // Prevent browser overscroll/refresh behavior (bounce effects)
          if (e.cancelable) {
            e.preventDefault();
          }
          setPullDistance(limitedDistance);
          setPullState(limitedDistance > 75 ? 'ready' : 'pulling');
        }
      } else {
        // Scrolled upwards during a pull
        pullStartYRef.current = null;
        setPullDistance(0);
        setPullState('idle');
      }
    };

    const handleTouchEnd = () => {
      if (pullStartYRef.current === null) return;
      pullStartYRef.current = null;

      if (pullDistance > 75) {
        // Trigger refetch
        setPullState('refreshing');
        // Smoothly stick indicator to an active refreshing height
        setPullDistance(55);
        fetchChannelData().finally(() => {
          // Once loading finishes, slide it transitionally back to 0
          setPullDistance(0);
          setPullState('idle');
        });
      } else {
        // Reset back to normal
        setPullDistance(0);
        setPullState('idle');
      }
    };

    // Attach non-passive listeners so we can call e.preventDefault()
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    selectedPost,
    isAboutPageOpen,
    isContactPageOpen,
    isSettingsPageOpen,
    isReelsOpen,
    isPhotoReelsOpen,
    isCategoryPageOpen,
    pullDistance
  ]);

  // Redundant resilience check to ensure everything resets when isLoading becomes false
  useEffect(() => {
    if (!isLoading && pullState === 'refreshing') {
      setPullDistance(0);
      setPullState('idle');
    }
  }, [isLoading, pullState]);

  // Automatically clear toast alerts after a brief visual display duration
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // Advanced Dual-Session Scroll Restoration Tracker
  const homeScrollPosRef = useRef<number>(0); // Keeps track of main home page scroll position
  const detailScrollPosRef = useRef<number>(0); // Keeps track of scroll position of the list we came from before opening selectedPost
  const prevInSubpageRef = useRef<boolean>(false);
  const prevSelectedPostRef = useRef<any>(null);
  const prevInPanelRef = useRef<boolean>(false);

  // 1. Background Scroll Tracker (captures main home feed scroll whenever we are not in any subpage or panel)
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const isInAnySubpage = !!(selectedPost || isAboutPageOpen || isContactPageOpen || isSettingsPageOpen || isFullFeedOpen || isSearchOpen || isReelsOpen || isPhotoReelsOpen || isCategoryPageOpen);
      if (!isInAnySubpage) {
        if (currentScroll > 0) {
          homeScrollPosRef.current = currentScroll;
        }
      }
      // Toggle Scroll to Top button after scrolling 500 pixels
      if (currentScroll > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedPost, isAboutPageOpen, isContactPageOpen, isSettingsPageOpen, isFullFeedOpen, isSearchOpen, isReelsOpen, isPhotoReelsOpen, isCategoryPageOpen]);

  // 2. SelectedPost Transitions Tracker (opening and closing detailed post reading page)
  useEffect(() => {
    const isOpening = selectedPost && !prevSelectedPostRef.current;
    const isClosing = !selectedPost && prevSelectedPostRef.current;

    if (isOpening) {
      // Synchronously capture lists scroll position
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > 0) {
        detailScrollPosRef.current = currentScroll;
      }
    } else if (isClosing) {
      // Returning from post reading back to the list: restore scroll position across staggered intervals
      const savedPos = detailScrollPosRef.current;
      if (savedPos > 0) {
        window.scrollTo(0, savedPos);
        setTimeout(() => window.scrollTo(0, savedPos), 30);
        setTimeout(() => window.scrollTo(0, savedPos), 90);
        setTimeout(() => window.scrollTo(0, savedPos), 180);
        setTimeout(() => window.scrollTo(0, savedPos), 350);
      }
    }
    prevSelectedPostRef.current = selectedPost;
  }, [selectedPost]);

  // 3. Other Panels Transitions Tracker (returning back to home view from settings/category/search etc.)
  useEffect(() => {
    const isInPanel = !!(isAboutPageOpen || isContactPageOpen || isSettingsPageOpen || isFullFeedOpen || isSearchOpen || isReelsOpen || isPhotoReelsOpen || isCategoryPageOpen);
    const isReturningToHome = !isInPanel && prevInPanelRef.current && !selectedPost;

    if (isReturningToHome) {
      const savedPos = homeScrollPosRef.current;
      if (savedPos > 0) {
        window.scrollTo(0, savedPos);
        setTimeout(() => window.scrollTo(0, savedPos), 30);
        setTimeout(() => window.scrollTo(0, savedPos), 90);
        setTimeout(() => window.scrollTo(0, savedPos), 180);
        setTimeout(() => window.scrollTo(0, savedPos), 350);
      }
    }
    prevInPanelRef.current = isInPanel;
  }, [selectedPost, isAboutPageOpen, isContactPageOpen, isSettingsPageOpen, isFullFeedOpen, isSearchOpen, isReelsOpen, isPhotoReelsOpen, isCategoryPageOpen]);

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

  // Native Capacitor Background Notification Scheduler
  const scheduleNativeBackgroundNotifications = React.useCallback(async (posts: TelegramPost[]) => {
    if (!notificationsEnabled) return;
    try {
      const { LocalNotifications } = await import('@capacitor/local-notifications');
      
      const permStatus = await LocalNotifications.checkPermissions();
      if (permStatus.display !== 'granted') {
        const reqStatus = await LocalNotifications.requestPermissions();
        if (reqStatus.display !== 'granted') {
          console.log('[Dewa Native Notif] Native permission denied.');
          return;
        }
      }

      const available = posts.filter(p => p && p.text && p.text.length > 20);
      if (available.length === 0) return;

      // Cancel previous scheduled background items (Ids 100 to 110)
      try {
        await LocalNotifications.cancel({
          notifications: Array.from({ length: 10 }, (_, i) => ({ id: 100 + i }))
        });
      } catch (cE) {
        console.warn('[Dewa Native Notif] Cancel error:', cE);
      }

      // Schedule 5 notifications spread over the next 24 hours (Surprises are picked randomly!)
      const scheduledList: any[] = [];
      const spreadIntervalHours = [4.8, 9.6, 14.4, 19.2, 24.0];

      for (let i = 0; i < spreadIntervalHours.length; i++) {
        const delayHours = spreadIntervalHours[i];
        const triggerTime = new Date(Date.now() + delayHours * 60 * 60 * 1000);
        
        const rPost = available[Math.floor(Math.random() * available.length)];
        const cleanText = rPost.text ? rPost.text.replace(/(#[\u0600-\u06FFa-zA-Z0-9_]+)/g, '').trim() : '';
        const snippet = cleanText.substring(0, 100) + (cleanText.length > 100 ? '...' : '');

        scheduledList.push({
          title: 'پښتو ادبي خزانه 🌸',
          body: snippet,
          id: 100 + i,
          schedule: { at: triggerTime },
          extra: { postId: rPost.id },
          smallIcon: 'res://ic_stat_name',
          actionTypeId: 'OPEN_POST'
        });
      }

      if (scheduledList.length > 0) {
        await LocalNotifications.schedule({ notifications: scheduledList });
        console.log('[Dewa Native Notif] Scheduled 5 background surprises successfully on-device!');
      }

    } catch (err) {
      console.warn('[Dewa Native Notif] Background scheduling not supported:', err);
    }
  }, [notificationsEnabled]);

  // Triggers real HTML5 notifications (or native system notifications via Capacitor if running on Android)
  const triggerLocalNotification = React.useCallback(async (post: TelegramPost) => {
    if (!notificationsEnabled) return;
    
    const poetryText = post.text || '';
    // Strip hashtags or clean lines for a beautiful preview
    const cleanPoetryText = poetryText.replace(/(#[\u0600-\u06FFa-zA-Z0-9_]+)/g, '').trim();
    const snippet = cleanPoetryText.substring(0, 120) + (cleanPoetryText.length > 120 ? '...' : '');
    
    const notificationTitle = 'پښتو ادبي خزانه 📢';
    
    // Play subtle chime sound if possible
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch (e) {
      console.log('Audio chime not supported / blocked', e);
    }

    // Try Native Local Notifications first for Android system bar notification
    let nativeSuccess = false;
    try {
      const { LocalNotifications } = await import('@capacitor/local-notifications');
      const checkResult = await LocalNotifications.checkPermissions();
      if (checkResult.display === 'granted') {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: notificationTitle,
              body: snippet,
              id: Math.floor(Math.random() * 95000) + 1000,
              schedule: { at: new Date(Date.now() + 100) }, // Trigger immediately
              extra: { postId: post.id },
              smallIcon: 'res://ic_stat_name',
              actionTypeId: 'OPEN_POST'
            }
          ]
        });
        nativeSuccess = true;
        console.log('[Dewa Native Notif] Dispatched immediate native system notification successfully!');
      }
    } catch (nativeErr) {
      console.log('[Dewa Native Notif] Native local notification skipped (Web/Browser fallback):', nativeErr);
    }

    if (!nativeSuccess) {
      if ('Notification' in window && Notification.permission === 'granted') {
        try {
          const notif = new Notification(notificationTitle, {
            body: snippet,
            icon: '/favicon.ico',
            tag: 'dewa_poetry_notif_' + post.id,
            requireInteraction: false
          });
          
          notif.onclick = () => {
            window.focus();
            setSelectedPost(post);
            setIsReelsOpen(false);
            setIsPhotoReelsOpen(false);
            setIsCategoryPageOpen(false);
            notif.close();
          };
        } catch (err) {
          console.warn('Native notification failed:', err);
        }
      }
    }
  }, [notificationsEnabled]);

  // Request standard push notification permission on opening the app
  useEffect(() => {
    const askPermission = async () => {
      if ('Notification' in window) {
        if (Notification.permission === 'default') {
          try {
            await Notification.requestPermission();
          } catch (e) {
            console.warn('System Notification.requestPermission failed', e);
          }
        }
      }
    };
    
    // Trigger prompt directly upon opening with a tiny friendly delay
    const timer = setTimeout(() => {
      askPermission();
    }, 1800);
    
    return () => clearTimeout(timer);
  }, []);

  // Reset novel scroll progress and restore previous scroll state on load
  useEffect(() => {
    setNovelScrollProgress(0);
    if (activeNovelTextChapter) {
      const existing = novelReadingProgressList.find(x => x.id === activeNovelTextChapter.id);
      if (existing) {
        setNovelScrollProgress(existing.progress || 0);
        if (existing.progress > 0) {
          const t = setTimeout(() => {
            if (chapterScrollRef.current) {
              const el = chapterScrollRef.current;
              const totalScroll = el.scrollHeight - el.clientHeight;
              if (totalScroll > 0) {
                el.scrollTop = (existing.progress / 100) * totalScroll;
              }
            }
          }, 150);
          return () => clearTimeout(t);
        }
      } else {
        updateNovelReadingProgress(activeNovelTextChapter, 0, selectedPost);
      }
    }
  }, [activeNovelTextChapter]);

  // Click Action Listener to handle deep linking when the native notification is clicked
  useEffect(() => {
    let sub: any = null;
    const registerListener = async () => {
      try {
        const { LocalNotifications } = await import('@capacitor/local-notifications');
        sub = await LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
          console.log('[Dewa Native Notif] Click received in background:', action);
          const postId = action.notification.extra?.postId;
          if (postId && feedData?.posts) {
            const found = feedData.posts.find(p => p.id === postId);
            if (found) {
              setSelectedPost(found);
              setIsReelsOpen(false);
              setIsPhotoReelsOpen(false);
              setIsCategoryPageOpen(false);
            }
          }
        });
      } catch (err) {
        // Web fallthrough
      }
    };
    registerListener();
    return () => {
      if (sub) {
        sub.remove().catch(() => {});
      }
    };
  }, [feedData?.posts]);

  // Automatic Scheduled Reminder Effect (And Background native scheduler registration)
  useEffect(() => {
    if (!notificationsEnabled || !feedData?.posts || feedData.posts.length === 0) return;
    
    // Register scheduling for when app goes to background / sleep
    scheduleNativeBackgroundNotifications(feedData.posts);

    // Schedule an initial test notification 10 seconds after opening so the user gets fully tested results!
    const testTimer = setTimeout(() => {
      const availablePosts = feedData.posts.filter(p => p && p.text && p.text.length > 20);
      if (availablePosts.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePosts.length);
        triggerLocalNotification(availablePosts[randomIndex]);
      }
    }, 10000); // 10 seconds teaser trigger
    
    // Trigger every 4.8 hours to deliver exactly 5 high-quality poetry notifications over 24 hours!
    const intervalMs = 4.8 * 60 * 60 * 1000; 
    const scheduledInterval = setInterval(() => {
      const availablePosts = feedData.posts.filter(p => p && p.text && p.text.length > 20);
      if (availablePosts.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePosts.length);
        triggerLocalNotification(availablePosts[randomIndex]);
      }
    }, intervalMs);
    
    return () => {
      clearTimeout(testTimer);
      clearInterval(scheduledInterval);
    };
  }, [notificationsEnabled, feedData?.posts, triggerLocalNotification, scheduleNativeBackgroundNotifications]);

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
    let apiSucceeded = false;

    // Try API first
    try {
      const response = await dewaFetch(apiEndpoint, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        apiSucceeded = true;
        const data: FeedResponse = await response.json();
        if (data && data.posts && data.posts.length > 0) {
          loadedPosts = data.posts;
        }
      }
    } catch (err) {
      console.warn('[Dewa Paging] API dynamic page fetch failed, falling back to direct browser scraping...', err);
    }

    // Direct Scrape Fallback - Only trigger if the API fetch failed/was unreachable
    if (!apiSucceeded && loadedPosts.length === 0) {
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
        console.warn('[Dewa Paging] Direct scraper paging failed (expected in browser environment due to CORS):', err);
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
    const isNativePlatform = !!(cap && cap.getPlatform && (cap.getPlatform() === 'ios' || cap.getPlatform() === 'android'));
    const hasCapacitorHttp = isNativePlatform && !!(cap.Plugins && cap.Plugins.CapacitorHttp);
    
    if (hasCapacitorHttp) {
      // CapacitorHttp requires absolute URLs. Convert relative routes to absolute using current origin.
      let requestUrl = url;
      if (url.startsWith('/')) {
        requestUrl = window.location.origin + url;
      }

      console.log('[Dewa Fetch] Invoking native CapacitorHttp for URL:', requestUrl);
      try {
        const nativeResp = await cap.Plugins.CapacitorHttp.get({
          url: requestUrl,
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
    setNovelsFeedData(newData);
    try {
      localStorage.setItem('dewa_cached_novels_data', JSON.stringify(newData));
    } catch (e) {}
  };

  const fetchNovelsChannelData = async (forceRefetch = false) => {
    if (novelsFeedData && !forceRefetch) return;
    setIsNovelsLoading(true);
    setNovelsErrorMsg(null);

    const checkIsCapacitor = !!(window as any).Capacitor;
    const isMobileProtocol = window.location.protocol === 'file:' || window.location.protocol.startsWith('capacitor:');
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isMobileApp = checkIsCapacitor || isMobileProtocol || (isLocalhost && window.location.port !== '3000');

    const cleanBackendHost = backendHostInput.trim().replace(/\/+$/, '');
    const novelsChannel = 'da_mine_dewa';
    const apiEndpoint = isMobileApp 
      ? `${cleanBackendHost}/api/telegram-feed?channel=${encodeURIComponent(novelsChannel)}`
      : `/api/telegram-feed?channel=${encodeURIComponent(novelsChannel)}`;

    let apiSucceeded = false;

    // 1. Try API first
    try {
      console.log(`[Dewa Novels] Attempting fetch via Backend API: ${apiEndpoint}`);
      const response = await dewaFetch(apiEndpoint, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        apiSucceeded = true;
        const data: FeedResponse = await response.json();
        if (data && data.posts && data.posts.length > 0) {
          setNovelsFeedData(data);
          setFeedData(data);
          try {
            localStorage.setItem('dewa_cached_novels_data', JSON.stringify(data));
            localStorage.setItem('dewa_cached_feed_data', JSON.stringify(data));
          } catch (e) {}
          console.log('[Dewa Novels] Data loaded successfully from remote API.');
          setIsNovelsLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('[Dewa Novels] API channel fetch failed, falling back to direct browser scraping...', err);
    }

    // 2. Direct Scrape Fallback
    if (!apiSucceeded) {
      try {
        const directUrl = `https://t.me/s/${novelsChannel}`;
        console.log(`[Dewa Novels] Attempting direct scrape from: ${directUrl}`);
        const response = await dewaFetch(directUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
            'Accept-Language': 'ps,en-US;q=0.9,en;q=0.8',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9'
          }
        });
        if (response.ok) {
          const htmlText = await response.text();
          if (htmlText && htmlText.includes('tgme_widget_message_wrap')) {
            const parsedData = parseClientTelegramHtml(htmlText, novelsChannel);
            if (parsedData && parsedData.posts && parsedData.posts.length > 0) {
              try {
                let currentPagingPosts = [...parsedData.posts];
                const uniqueIds = new Set(parsedData.posts.map(p => p.id));
                for (let pageIdx = 2; pageIdx <= 10; pageIdx++) {
                  if (parsedData.posts.length >= 100) break;
                  const postIdsNumeric = currentPagingPosts.map(p => parseInt(p.id)).filter(id => !isNaN(id));
                  if (postIdsNumeric.length === 0) break;
                  const minPostId = Math.min(...postIdsNumeric);
                  const nextUrl = `https://t.me/s/${novelsChannel}?before=${minPostId}`;
                  const responseN = await dewaFetch(nextUrl, {
                    headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36' }
                  });
                  if (!responseN.ok) break;
                  const htmlTextN = await responseN.text();
                  const parsedDataN = parseClientTelegramHtml(htmlTextN, novelsChannel);
                  if (!parsedDataN || !parsedDataN.posts || parsedDataN.posts.length === 0) break;
                  const filteredNew = parsedDataN.posts.filter(p => !uniqueIds.has(p.id));
                  if (filteredNew.length === 0) break;
                  filteredNew.forEach(p => uniqueIds.add(p.id));
                  parsedData.posts.push(...filteredNew);
                  currentPagingPosts = parsedDataN.posts;
                }
              } catch (colErr) {
                console.warn('[Dewa Novels] Direct client paging error:', colErr);
              }
              parsedData.posts.sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));
              setNovelsFeedData(parsedData);
              setFeedData(parsedData);
              try {
                localStorage.setItem('dewa_cached_novels_data', JSON.stringify(parsedData));
                localStorage.setItem('dewa_cached_feed_data', JSON.stringify(parsedData));
              } catch (e) {}
              setIsNovelsLoading(false);
              return;
            }
          }
        }
      } catch (err: any) {
        console.error('[Dewa Novels] Both methods failed for novels channel.', err);
      }
    }

    // Try offline recovery from local cache
    const hasCached = localStorage.getItem('dewa_cached_novels_data');
    if (hasCached) {
      try {
        const cachedObj = JSON.parse(hasCached);
        if (cachedObj && cachedObj.posts && cachedObj.posts.length > 0) {
          setNovelsFeedData(cachedObj);
          setIsNovelsLoading(false);
          return;
        }
      } catch (e) {
        console.error('[Dewa Novels] Failed to parse cached novels', e);
      }
    }

    setNovelsErrorMsg('د پوسټونو په لوډولو کې ستونزه رامنځته شوه. مهرباني وکړئ انټرنیټ وصل کړئ او بیا ځلي هڅه وکړئ.');
    setIsNovelsLoading(false);
  };

  const loadMoreNovelsData = async () => {
    if (isNovelsScrapingMore || !novelsFeedData || !novelsFeedData.posts || novelsFeedData.posts.length === 0) return;
    setIsNovelsScrapingMore(true);

    const ids = novelsFeedData.posts.map(p => parseInt(p.id)).filter(id => !isNaN(id));
    if (ids.length === 0) {
      setIsNovelsScrapingMore(false);
      return;
    }
    const minPostId = Math.min(...ids);

    const checkIsCapacitor = !!(window as any).Capacitor;
    const isMobileProtocol = window.location.protocol === 'file:' || window.location.protocol.startsWith('capacitor:');
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isMobileApp = checkIsCapacitor || isMobileProtocol || (isLocalhost && window.location.port !== '3000');

    const cleanBackendHost = backendHostInput.trim().replace(/\/+$/, '');
    const novelsChannel = 'da_mine_dewa';
    const apiEndpoint = isMobileApp 
      ? `${cleanBackendHost}/api/telegram-feed?channel=${encodeURIComponent(novelsChannel)}&before=${minPostId}`
      : `/api/telegram-feed?channel=${encodeURIComponent(novelsChannel)}&before=${minPostId}`;

    let loadedPosts: TelegramPost[] = [];
    let apiSucceeded = false;

    try {
      const response = await dewaFetch(apiEndpoint, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        apiSucceeded = true;
        const data: FeedResponse = await response.json();
        if (data && data.posts && data.posts.length > 0) {
          loadedPosts = data.posts;
        }
      }
    } catch (err) {
      console.warn('[Dewa Novels Paging] API fetch failed:', err);
    }

    if (!apiSucceeded && loadedPosts.length === 0) {
      try {
        const directUrl = `https://t.me/s/${novelsChannel}?before=${minPostId}`;
        const response = await dewaFetch(directUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36' }
        });
        if (response.ok) {
          const htmlText = await response.text();
          const parsed = parseClientTelegramHtml(htmlText, novelsChannel);
          if (parsed && parsed.posts && parsed.posts.length > 0) {
            loadedPosts = parsed.posts;
          }
        }
      } catch (err) {
        console.warn('[Dewa Novels Paging] Direct scrape failed:', err);
      }
    }

    if (loadedPosts.length > 0) {
      const existingIds = new Set(novelsFeedData.posts.map(p => p.id));
      const filteredNew = loadedPosts.filter(p => p && p.id && !existingIds.has(p.id));
      if (filteredNew.length > 0) {
        setNovelsFeedData(prev => {
          if (!prev) return prev;
          const updatedPosts = [...prev.posts, ...filteredNew];
          updatedPosts.sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));
          const updatedData = { ...prev, posts: updatedPosts };
          localStorage.setItem('dewa_cached_novels_data', JSON.stringify(updatedData));
          return updatedData;
        });
      }
    }
    setIsNovelsScrapingMore(false);
  };

  const filterNovelsPosts = React.useCallback((isNovelTab: boolean, isAudioSubTab: boolean) => {
    const dataObj = novelsFeedData || feedData;
    if (!dataObj || !dataObj.posts) return [];
    
    // Helper to get hashtags
    const getHashtags = (t: string): string[] => {
      if (!t) return [];
      const matches = t.match(/#[^\s#\.,'\?\!\"🗺️✨🎙️🎵📚✍️():؛،«»\-]+/g) || [];
      return matches.map(tag => tag.trim());
    };

    return dataObj.posts.filter(post => {
      const text = post.text || '';
      const textLower = text.toLowerCase();
      const hashtags = getHashtags(text);

      // Check if it's a Story (has #کيسه or #کیسه hashtag)
      const hasStoryTag = hashtags.some(tag => tag === '#کيسه' || tag === '#کیسه');

      // Check if it's a Novel Profile (has #novel_profile or variations)
      const hasNovelProfileTag = hashtags.some(tag => 
        tag === '#novel_profile' || 
        tag === '#ناول_پروفایل' || 
        tag === '#ناول_پروفايل' || 
        tag === '#profile_novel'
      );

      // General audio indicator check
      const hasAudioAttachment = !!(post.hasAudio || post.audioUrl || (post.audioList && post.audioList.length > 0));
      const hasAudioKeywords = textLower.includes('audio') || textLower.includes('mp3') || textLower.includes('آډیو') || textLower.includes('اډیو') || textLower.includes('غږیز') || textLower.includes('غږيز');
      const hasAudioHashtagGeneral = hashtags.some(tag => tag === '#audio' || tag === '#mp3' || tag === '#غږیز' || tag === '#اډیو' || tag === '#غږيز');
      const isAudio = hasAudioAttachment || hasAudioKeywords || hasAudioHashtagGeneral;

      if (isNovelTab) {
        // Must have #novel_profile (or equivalent)
        if (!hasNovelProfileTag) return false;

        // If it has #audio hashtag, then it is an audio novel; if not, it is a written novel.
        const hasAudioHashtag = hashtags.some(tag => tag === '#audio' || tag === '#mp3');
        return isAudioSubTab === hasAudioHashtag;
      } else {
        // Must have #کيسه or #کیسه hashtag
        if (!hasStoryTag) return false;

        // If it has audio, then it goes to audio stories, otherwise written
        return isAudioSubTab === isAudio;
      }
    });
  }, [novelsFeedData]);

  useEffect(() => {
    if (isNovelsPageOpen) {
      fetchNovelsChannelData();
    }
  }, [isNovelsPageOpen]);

  useEffect(() => {
    const cached = localStorage.getItem('dewa_cached_novels_data');
    if (cached) {
      try {
        const obj = JSON.parse(cached);
        if (obj && obj.posts) setNovelsFeedData(obj);
      } catch (e) {}
    }
  }, []);

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
        if (overlayActiveText) {
          setOverlayActiveText(null);
        } else if (zoomPhotoUrl) {
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
        } else if (isReelsOpen) {
          setIsReelsOpen(false);
        } else if (isPhotoReelsOpen) {
          setIsPhotoReelsOpen(false);
        } else if (isCategoryPageOpen) {
          setIsCategoryPageOpen(false);
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
  }, [zoomPhotoUrl, activeModal, isSettingsPageOpen, isAboutPageOpen, isContactPageOpen, isSidebarOpen, selectedPost, isFullFeedOpen, isSearchOpen, showExitConfirmation, isReelsOpen, isPhotoReelsOpen, isCategoryPageOpen, overlayActiveText]);

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
        
        // After splash closes, check if onboarding should be shown
        const hasShownOnboarding = localStorage.getItem('dewa_onboarding_shown_v2');
        if (!hasShownOnboarding) {
          setShowOnboarding(true);
        }
      }
    }, intervalTime);
    
    return () => clearInterval(progressInterval);
  }, []);

  // Dynamic filtering of all posts by search string, always sorted latest first
  const allPosts = feedData?.posts ? feedData.posts.filter(p => {
    if (!p) return false;
    
    // 1. Filter out the '#dev' post
    const textLower = (p.text || '').toLowerCase();
    if (textLower.includes('#dev')) {
      return false;
    }
    
    // 2. Filter out 'channel created' post or post ID '1'
    if (textLower.includes('channel created') || p.id === '1') {
      return false;
    }

    const matchesSearch = !searchQuery || (p.text && p.text.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  }).sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0)) : [];

  // Find the custom '#dev' post (from raw posts pool) to dynamically populate the About Us section
  const devPost = React.useMemo(() => {
    if (!feedData?.posts) return null;
    return feedData.posts.find(p => p && p.text && p.text.toLowerCase().includes('#dev'));
  }, [feedData?.posts]);

  // Slider featured posts (10 random posts from any category to keep it dynamic and fresh)
  const featuredPosts = React.useMemo(() => {
    if (!allPosts || allPosts.length === 0) return [];
    // Hide stories and novels from featured slider so they don't block normal features
    const nonStoryPosts = allPosts.filter(p => !isStoryPost(p) && !getIsNovelOrNovelPart(p));
    if (nonStoryPosts.length === 0) return [];
    const shuffled = [...nonStoryPosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, [allPosts]);

  // 1. Filtered archive matching selection criteria (either Category or activeFavoriteFilter)
  const filteredHomePosts = React.useMemo(() => {
    let list = allPosts;

    if (activeFavoriteFilter) {
      list = list.filter(p => favoritePostIds.includes(p.id));
      // By default exclude stories and novels from general favorites categorization lists
      list = list.filter(p => !isStoryPost(p) && !getIsNovelOrNovelPart(p));
      
      if (activeFavoriteFilter === 'videos') {
        list = list.filter(p => !!p.hasVideo || !!p.videoUrl || !!p.videoThumbUrl);
      } else if (activeFavoriteFilter === 'images') {
        list = list.filter(p => !!p.photoUrl || (p.photoUrls && p.photoUrls.length > 0));
      } else if (activeFavoriteFilter === 'audio') {
        list = list.filter(p => !!p.hasAudio || !!p.audioUrl);
      } else if (activeFavoriteFilter === 'pdf') {
        list = list.filter(p => getIsBook(p));
      } else if (activeFavoriteFilter === 'writings') {
        list = list.filter(p => !p.hasVideo && !p.photoUrl && !(p.photoUrls && p.photoUrls.length > 0) && !p.hasAudio && !getIsBook(p));
      }
    } else {
      if (selectedCategory === 'stories') {
        // ONLY show story posts in 'stories' category
        list = list.filter(p => isStoryPost(p));
      } else if (selectedCategory === 'novels') {
        // ONLY show Novel Profiles in 'novels' category
        list = list.filter(p => isPostNovelProfileGlobal(p));
      } else {
        // Exclude stories and novels (including parts) from all standard categories (and 'all')
        list = list.filter(p => !isStoryPost(p) && !getIsNovelOrNovelPart(p));

        if (selectedCategory === 'videos') {
          list = list.filter(p => !!p.hasVideo || !!p.videoUrl || !!p.videoThumbUrl);
        } else if (selectedCategory === 'images') {
          list = list.filter(p => !!p.photoUrl || (p.photoUrls && p.photoUrls.length > 0));
        } else if (selectedCategory === 'audio') {
          list = list.filter(p => !!p.hasAudio || !!p.audioUrl);
        } else if (selectedCategory === 'pdf') {
          list = list.filter(p => getIsBook(p));
        } else if (selectedCategory === 'writings_plain') {
          list = list.filter(p => getIsWriting(p));
        } else if (selectedCategory === 'poems') {
          list = list.filter(p => getIsPoem(p));
        } else if (selectedCategory === 'writings') {
          list = list.filter(p => !p.hasVideo && !p.photoUrl && !(p.photoUrls && p.photoUrls.length > 0) && !p.hasAudio && !getIsBook(p));
        }
      }
    }
    return list;
  }, [allPosts, selectedCategory, activeFavoriteFilter, favoritePostIds]);

  // Reset infinite scroll page-size whenever selection filter parameters shift
  useEffect(() => {
    setVisibleHomeCount(30);
  }, [selectedCategory, activeFavoriteFilter, searchQuery]);

  // Home Page compact items filtered by category and sliced by infinite scroll
  const homePosts = React.useMemo(() => {
    return filteredHomePosts.slice(0, visibleHomeCount);
  }, [filteredHomePosts, visibleHomeCount]);

  // Automated Infinite Scroll loading effect for Homepage Compact Items with Shimmer delays
  useEffect(() => {
    const sentinel = document.getElementById('home-infinite-scroll-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isAutoloadingMore) {
          // Check if there are actually more posts left to load
          if (visibleHomeCount < filteredHomePosts.length) {
            setIsAutoloadingMore(true);
            setTimeout(() => {
              setVisibleHomeCount((prev) => {
                const nextVal = prev + 30;
                return nextVal;
              });
              setIsAutoloadingMore(false);
            }, 850); // Simulated delay displaying luxurious skeleton shimmer cards
          } else if (!isScrapingMore) {
            // No more local cache posts, scrape/load more older posts from Telegram 30 by 30!
            setIsAutoloadingMore(true);
            loadMoreOlderPosts().then(() => {
              setVisibleHomeCount((prev) => prev + 30);
            }).finally(() => {
              setIsAutoloadingMore(false);
            });
          }
        }
      },
      { threshold: 0.1, rootMargin: '300px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isLoading, isAutoloadingMore, isScrapingMore, filteredHomePosts.length, visibleHomeCount]);

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
    if (selectedCategory === 'writings_plain') {
      return allPosts.filter(p => getIsWriting(p));
    }
    if (selectedCategory === 'poems') {
      return allPosts.filter(p => getIsPoem(p));
    }
    if (selectedCategory === 'writings') {
      return allPosts.filter(p => !p.hasVideo && !p.photoUrl && !(p.photoUrls && p.photoUrls.length > 0) && !p.hasAudio && !getIsBook(p));
    }
    return allPosts;
  }, [allPosts, selectedCategory]);

  // Immersive TikTok/Reels lists extractor for zero-overhead vertical swiper
  const reelsList = React.useMemo(() => {
    const list: { post: TelegramPost; videoUrl: string; poster?: string }[] = [];
    allPosts.forEach(post => {
      if (post.videoList && post.videoList.length > 0) {
        post.videoList.forEach(vid => {
          if (vid.url) {
            list.push({
              post,
              videoUrl: vid.url,
              poster: vid.thumbUrl || post.photoUrl
            });
          }
        });
      } else if (post.hasVideo && post.videoUrl) {
        list.push({
          post,
          videoUrl: post.videoUrl,
          poster: post.videoThumbUrl || post.photoUrl
        });
      }
    });
    return list;
  }, [allPosts]);

  // Photo Reels list extractor for zero-overhead vertical images swiper
  const photoReelsList = React.useMemo(() => {
    const list: { post: TelegramPost; photoUrl: string }[] = [];
    allPosts.forEach(post => {
      if (post.photoUrls && post.photoUrls.length > 0) {
        post.photoUrls.forEach(url => {
          if (url) {
            list.push({ post, photoUrl: url });
          }
        });
      } else if (post.photoUrl) {
        list.push({ post, photoUrl: post.photoUrl });
      }
    });
    return list;
  }, [allPosts]);

  // Hook resolutions for immersive active screen layers (Installs Offline Video Caching)
  const activeReelObj = reelsList && reelsList.length > 0 ? reelsList[activeReelIndex] : null;
  const cachedActiveReelVideoUrl = useCachedUrl(isReelsOpen ? activeReelObj?.videoUrl : null);
  const cachedActiveReelPosterUrl = useCachedUrl(isReelsOpen ? activeReelObj?.poster : null);

  const activePhotoReelObj = photoReelsList && photoReelsList.length > 0 ? photoReelsList[activePhotoReelIndex] : null;
  const cachedActivePhotoReelUrl = useCachedUrl(isPhotoReelsOpen ? activePhotoReelObj?.photoUrl : null);

  // Extract unique hashtags with counts from the original feed posts
  const hashtagsWithCount = React.useMemo(() => {
    if (!feedData?.posts) return [];
    const countMap = new Map<string, number>();
    feedData.posts.forEach(p => {
      if (p && p.text) {
        const matches = p.text.match(/#[^\s#.,!?;:()\[\]{}'"]+/g);
        if (matches) {
          const uniqueInPost = new Set<string>(matches);
          uniqueInPost.forEach(tag => {
            countMap.set(tag, (countMap.get(tag) || 0) + 1);
          });
        }
      }
    });
    return Array.from(countMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [feedData?.posts]);

  // Background Snappy Media Preloading Engine (Videos and Images)
  React.useEffect(() => {
    // 1. If a Post detail view is open, preload its own media (if multi-media) AND preload adjacent posts
    if (selectedPost) {
      preloadPostMedia(selectedPost);

      // Find selected post in homePosts list to preload next items
      const idx = homePosts.findIndex((p) => p.id === selectedPost.id);
      if (idx !== -1) {
        // Preload next 2 posts
        for (let i = 1; i <= 2; i++) {
          const nextPost = homePosts[idx + i];
          if (nextPost) preloadPostMedia(nextPost);
        }
        // Preload previous post
        const prevPost = homePosts[idx - 1];
        if (prevPost) preloadPostMedia(prevPost);
      }
    }

    // 2. If Reels is open, preload subsequent video reels
    if (isReelsOpen && reelsList && reelsList.length > 0) {
      const currentReel = reelsList[activeReelIndex];
      const nextReel1 = reelsList[(activeReelIndex + 1) % reelsList.length];
      const nextReel2 = reelsList[(activeReelIndex + 2) % reelsList.length];

      if (currentReel) {
        if (currentReel.videoUrl) preloadVid(currentReel.videoUrl);
        if (currentReel.poster) preloadImg(currentReel.poster);
      }
      if (nextReel1) {
        if (nextReel1.videoUrl) preloadVid(nextReel1.videoUrl);
        if (nextReel1.poster) preloadImg(nextReel1.poster);
      }
      if (nextReel2) {
        if (nextReel2.videoUrl) preloadVid(nextReel2.videoUrl);
        if (nextReel2.poster) preloadImg(nextReel2.poster);
      }
    }

    // 3. If Photo Reels is open, preload next image reels
    if (isPhotoReelsOpen && photoReelsList && photoReelsList.length > 0) {
      const currentPR = photoReelsList[activePhotoReelIndex];
      const nextPR1 = photoReelsList[(activePhotoReelIndex + 1) % photoReelsList.length];
      const nextPR2 = photoReelsList[(activePhotoReelIndex + 2) % photoReelsList.length];

      if (currentPR && currentPR.photoUrl) preloadImg(currentPR.photoUrl);
      if (nextPR1 && nextPR1.photoUrl) preloadImg(nextPR1.photoUrl);
      if (nextPR2 && nextPR2.photoUrl) preloadImg(nextPR2.photoUrl);
    }
  }, [selectedPost, activeReelIndex, isReelsOpen, reelsList, activePhotoReelIndex, isPhotoReelsOpen, photoReelsList, homePosts]);

  // Open Reels player specifically targeting a requested video URL
  const openReelWithVideoUrl = React.useCallback((videoUrl: string) => {
    const index = reelsList.findIndex(r => r.videoUrl === videoUrl);
    if (index !== -1) {
      setActiveReelIndex(index);
      setIsReelsOpen(true);
    } else {
      // Look for custom submatches or fallback to index 0
      const subIndex = reelsList.findIndex(r => r.videoUrl.includes(videoUrl) || videoUrl.includes(r.videoUrl));
      if (subIndex !== -1) {
        setActiveReelIndex(subIndex);
      } else {
        setActiveReelIndex(0);
      }
      setIsReelsOpen(true);
    }
  }, [reelsList]);

  // Open Photos Swipe page specifically targeting a requested photo URL
  const openPhotoReelWithUrl = React.useCallback((photoUrl: string) => {
    const index = photoReelsList.findIndex(r => r.photoUrl === photoUrl);
    if (index !== -1) {
      setActivePhotoReelIndex(index);
      setIsPhotoReelsOpen(true);
    } else {
      const subIndex = photoReelsList.findIndex(r => r.photoUrl.includes(photoUrl) || photoUrl.includes(r.photoUrl));
      if (subIndex !== -1) {
        setActivePhotoReelIndex(subIndex);
      } else {
        setActivePhotoReelIndex(0);
      }
      setIsPhotoReelsOpen(true);
    }
  }, [photoReelsList]);

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

  // ==========================================================
  // SHORT VIDEO REELS GESTURES & MEDIA ENGINE
  // ==========================================================
  const [reelPlaying, setReelPlaying] = useState(true);
  const [reelMuted, setReelMuted] = useState(false);
  const [reelProgress, setReelProgress] = useState(0);
  const [reelLoading, setReelLoading] = useState(false);
  const reelVideoRef = useRef<HTMLVideoElement | null>(null);

  const [showCenterIcon, setShowCenterIcon] = useState(false);
  const [centerIconType, setCenterIconType] = useState<'play' | 'pause' | null>(null);
  const centerIconTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const flashCenterIcon = (type: 'play' | 'pause') => {
    setCenterIconType(type);
    setShowCenterIcon(true);
    if (centerIconTimeoutRef.current) {
      clearTimeout(centerIconTimeoutRef.current);
    }
    centerIconTimeoutRef.current = setTimeout(() => {
      setShowCenterIcon(false);
    }, 1800); // Disappear after 1.8 seconds (2 seconds auto disappear)
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (centerIconTimeoutRef.current) {
        clearTimeout(centerIconTimeoutRef.current);
      }
    };
  }, []);

  /* ==========================================================
     STORIES CORE STATE ENGINE (د سټوريانو د حساب او کنټرول برخې)
     ========================================================== */
  const storiesList = React.useMemo(() => {
    if (!feedData?.posts) return [];
    return feedData.posts.filter(isStoryPost);
  }, [feedData?.posts]);

  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const storyProgressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNextStory = () => {
    setStoryProgress(0);
    setActiveStoryIndex((prev) => {
      if (prev < storiesList.length - 1) {
        return prev + 1;
      } else {
        setIsStoryViewerOpen(false);
        return prev;
      }
    });
  };

  const handlePrevStory = () => {
    setStoryProgress(0);
    setActiveStoryIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  // Story Autoplay & interval loop
  useEffect(() => {
    if (!isStoryViewerOpen || storiesList.length === 0 || isStoryPaused) {
      if (storyProgressIntervalRef.current) {
        clearInterval(storyProgressIntervalRef.current);
      }
      return;
    }

    const duration = 6500; // 6.5s per story
    const intervalTime = 40;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    storyProgressIntervalRef.current = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          handleNextStory();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => {
      if (storyProgressIntervalRef.current) {
        clearInterval(storyProgressIntervalRef.current);
      }
    };
  }, [isStoryViewerOpen, activeStoryIndex, isStoryPaused, storiesList.length]);

  const handleNextReel = () => {
    if (reelsList.length === 0) return;
    if (reelVideoRef.current) {
      reelVideoRef.current.pause();
    }
    setSwipeDirection('next');
    setActiveReelIndex((prev) => (prev + 1) % reelsList.length);
  };

  const handlePrevReel = () => {
    if (reelsList.length === 0) return;
    if (reelVideoRef.current) {
      reelVideoRef.current.pause();
    }
    setSwipeDirection('prev');
    setActiveReelIndex((prev) => (prev - 1 + reelsList.length) % reelsList.length);
  };

  const lastReelWheelTimeRef = useRef<number>(0);
  const handleReelWheel = (e: React.WheelEvent) => {
    if (!isReelsOpen) return;
    const now = Date.now();
    if (now - lastReelWheelTimeRef.current < 750) return; // 750ms throttle
    if (Math.abs(e.deltaY) > 20) {
      lastReelWheelTimeRef.current = now;
      if (e.deltaY > 0) {
        handleNextReel();
      } else {
        handlePrevReel();
      }
    }
  };

  const [reelTouchStartY, setReelTouchStartY] = useState<number | null>(null);
  const [reelTouchEndY, setReelTouchEndY] = useState<number | null>(null);

  const onReelTouchStart = (e: React.TouchEvent) => {
    setReelTouchEndY(null);
    setReelTouchStartY(e.targetTouches[0].clientY);
  };

  const onReelTouchMove = (e: React.TouchEvent) => {
    setReelTouchEndY(e.targetTouches[0].clientY);
  };

  const onReelTouchEnd = () => {
    if (!reelTouchStartY || !reelTouchEndY) return;
    const distance = reelTouchStartY - reelTouchEndY;
    const minSwipeDistance = 35;
    if (distance > minSwipeDistance) {
      handleNextReel();
    } else if (distance < -minSwipeDistance) {
      handlePrevReel();
    }
  };

  // Reset mute state when opening Reels so first video always plays with active audio automatically
  useEffect(() => {
    if (isReelsOpen) {
      setReelMuted(false);
      setReelPlaying(true);
    }
  }, [isReelsOpen]);

  // Autoplay video on Index changes or overlay load with complete cleanup (پخوانی ویډیو درول ترڅو د غږونو ګډوډي رامنځته نشي)
  useEffect(() => {
    if (!isReelsOpen || reelsList.length === 0) {
      if (reelVideoRef.current) {
        reelVideoRef.current.pause();
      }
      return;
    }
    setReelPlaying(true);
    setReelProgress(0);
    setReelLoading(true);

    const video = reelVideoRef.current;
    if (video) {
      video.muted = reelMuted;
      video.volume = 1.0; // Ensure sound is active and loud
      
      // Stop all background videos and audios
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(v => {
        if (v !== video) v.pause();
      });
      const allAudios = document.querySelectorAll('audio');
      allAudios.forEach(a => a.pause());

      // Stop or pause global background audio
      pauseGlobalAudio();

      video.play().then(() => {
        setReelLoading(false);
        setReelPlaying(true);
      }).catch(err => {
        console.warn('Autoplay failed or was blocked by browser:', err);
        setReelPlaying(false);
        setReelLoading(false);
      });
    }

    return () => {
      // Explicitly pause the video on swipe/scroll/exit cleanup to prevent overlapping track signals
      if (video) {
        video.pause();
      }
    };
  }, [activeReelIndex, isReelsOpen]);

  // Handle keyboard arrow keys for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isReelsOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextReel();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevReel();
      } else if (e.key === ' ') {
        e.preventDefault();
        if (reelVideoRef.current) {
          if (reelPlaying) {
            reelVideoRef.current.pause();
            setReelPlaying(false);
          } else {
            // Stop or pause global background audio
            pauseGlobalAudio();
            
            const playPromise = reelVideoRef.current.play();
            if (playPromise !== undefined) {
              playPromise.catch(err => {
                if (err.name !== 'AbortError') {
                  console.warn("Reel play failed:", err);
                }
              });
            }
            setReelPlaying(true);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReelsOpen, activeReelIndex, reelPlaying, reelsList.length]);

  // ==========================================================
  // SHORT PHOTO REELS GESTURES & ENGINE
  // ==========================================================
  const handleNextPhotoReel = () => {
    if (photoReelsList.length === 0) return;
    setPhotoSwipeDirection('next');
    setActivePhotoReelIndex((prev) => (prev + 1) % photoReelsList.length);
  };

  const handlePrevPhotoReel = () => {
    if (photoReelsList.length === 0) return;
    setPhotoSwipeDirection('prev');
    setActivePhotoReelIndex((prev) => (prev - 1 + photoReelsList.length) % photoReelsList.length);
  };

  const lastPhotoReelWheelTimeRef = useRef<number>(0);
  const handlePhotoReelWheel = (e: React.WheelEvent) => {
    if (!isPhotoReelsOpen) return;
    const now = Date.now();
    if (now - lastPhotoReelWheelTimeRef.current < 450) return; // 450ms throttle for smooth image paging
    if (Math.abs(e.deltaY) > 20) {
      lastPhotoReelWheelTimeRef.current = now;
      if (e.deltaY > 0) {
        handleNextPhotoReel();
      } else {
        handlePrevPhotoReel();
      }
    }
  };

  const [photoReelTouchStartY, setPhotoReelTouchStartY] = useState<number | null>(null);
  const [photoReelTouchEndY, setPhotoReelTouchEndY] = useState<number | null>(null);

  const onPhotoReelTouchStart = (e: React.TouchEvent) => {
    setPhotoReelTouchEndY(null);
    setPhotoReelTouchStartY(e.targetTouches[0].clientY);
  };

  const onPhotoReelTouchMove = (e: React.TouchEvent) => {
    setPhotoReelTouchEndY(e.targetTouches[0].clientY);
  };

  const onPhotoReelTouchEnd = () => {
    if (!photoReelTouchStartY || !photoReelTouchEndY) return;
    const distance = photoReelTouchStartY - photoReelTouchEndY;
    const minSwipeDistance = 35;
    if (distance > minSwipeDistance) {
      handleNextPhotoReel();
    } else if (distance < -minSwipeDistance) {
      handlePrevPhotoReel();
    }
  };

  // Keyboard navigation for image swiper
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPhotoReelsOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextPhotoReel();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevPhotoReel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPhotoReelsOpen, activePhotoReelIndex, photoReelsList.length]);

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
      {!isReelsOpen && (
        <header className={`sticky top-0 z-40 ${headerBg} backdrop-blur-md border-b pb-4 px-4 sm:px-6 flex items-center justify-between shadow-lg safe-header-pt`}>
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
                {selectedPost ? 'د پوسټ لوستل' : isAboutPageOpen ? 'زمونږ په اړه معلومات' : isContactPageOpen ? 'زمونږ سره اړیکه' : isSettingsPageOpen ? 'د اپلیکیشن تنظیمات' : isSearchOpen ? 'په پوسټونو کې پلټنه' : isFullFeedOpen ? 'ټول آرشیف پوسټونه' : isReelsOpen ? 'شارټ ویډیوګانې (Reels)' : isPhotoReelsOpen ? 'ښکلي انځورونه (Images Carousel)' : isCategoryPageOpen ? 'د شعرونو ډلبندي (ککړۍ)' : isNovelsPageOpen ? 'د کیسو او ناولونو برخه' : 'پښتو ادبي خزانه'}
              </h1>
            </div>
          </div>

          {/* Left side: Back navigation actions and the Action popup */}
          <div className="flex items-center gap-2 relative">
            {(selectedPost || isAboutPageOpen || isContactPageOpen || isSettingsPageOpen || isFullFeedOpen || isSearchOpen || isReelsOpen || isPhotoReelsOpen || isCategoryPageOpen || isNovelsPageOpen) && (
              <button
                onClick={() => {
                  setSelectedPost(null);
                  setIsSettingsPageOpen(false);
                  setIsAboutPageOpen(false);
                  setIsContactPageOpen(false);
                  setIsFullFeedOpen(false);
                  setIsSearchOpen(false);
                  setIsReelsOpen(false);
                  setIsPhotoReelsOpen(false);
                  setIsCategoryPageOpen(false);
                  setIsNovelsPageOpen(false);
                  setSearchQuery('');
                  setContactSuccess(false);
                  setContactError(null);
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
      )}

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
                
                {/* 1. د اپلیکیشن رسمي بڼه (بڼکه او پښتو ادبي خزانه) */}
                <div className={`flex flex-col items-center text-center ${subCardBg} rounded-2xl p-5 border gap-2.5 shadow-sm`}>
                  <div className={`w-14 h-14 rounded-full ${isDark ? 'bg-indigo-550/10' : 'bg-indigo-600/10'} flex items-center justify-center border border-indigo-500/30`}>
                    <Feather className={`w-7 h-7 ${tc.text}`} />
                  </div>
                  <h4 className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight font-sans`}>
                    {appLanguage === 'en' ? 'Pashto Literary Treasure' : 'پښتو ادبي خزانه'}
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
        
        {/* Pull to Refresh Dynamic Indicator */}
        <AnimatePresence>
          {(pullDistance > 0 || pullState === 'refreshing') && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                height: pullState === 'refreshing' ? 56 : pullDistance,
                y: 0
              }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="w-full overflow-hidden flex items-center justify-center pointer-events-none"
            >
              <div className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border backdrop-blur-md shadow-md ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 text-slate-100' 
                  : 'bg-white/90 border-slate-200 text-slate-800'
              }`}>
                {/* Animator Arrow or Spinner */}
                <span className="flex items-center justify-center">
                  {pullState === 'refreshing' ? (
                    <RefreshCw className={`w-4 h-4 animate-spin ${tc.text}`} />
                  ) : (
                    <ArrowDown 
                      className={`w-4 h-4 transition-transform duration-200 ${tc.text}`} 
                      style={{ 
                        transform: `rotate(${pullState === 'ready' ? 180 : 0}deg) scale(${Math.min(1.2, pullDistance / 50)})`,
                      }}
                    />
                  )}
                </span>

                {/* Status Text in Pashto & English */}
                <span className="text-[11px] font-sans font-bold leading-none">
                  {pullState === 'pulling' && (appLanguage === 'en' ? 'Pull down to refresh...' : 'د تازه کولو لپاره لاندې کش کړئ...')}
                  {pullState === 'ready' && (appLanguage === 'en' ? 'Release to refresh...' : 'اوس خوشې کړي (بوش کړئ)...')}
                  {pullState === 'refreshing' && (appLanguage === 'en' ? 'Refreshing feed...' : 'د معلوماتو تازه کولو په حال کې...')}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
          isPostNovelProfileGlobal(selectedPost) ? (
            activeNovelTextChapter ? (
              /* ==========================================================
                 C3. DEDICATED MINIMALIST CHAPTER TEXT READER PAGE
                 (د څپرکي د متن لوستلو بېله او ساده ممتازه لوستونکې پاڼه)
                 ========================================================== */
              <div className={`p-5 sm:p-7 rounded-3xl ${cardBg} border border-slate-500/10 dark:border-slate-800 shadow-xl text-right animate-fade-in font-sans space-y-6 select-none`} style={{ direction: 'rtl' }}>
                
                {/* Header with Back action */}
                <div className={`px-5 py-4 ${isDark ? 'bg-slate-950/80 border-slate-850/40' : 'bg-slate-100/90 border-slate-200'} border-b flex items-center justify-between rounded-t-3xl -mx-5 -mt-5 sm:-mx-7 sm:-mt-7 mb-4`}>
                  <button
                    onClick={() => setActiveNovelTextChapter(null)}
                    style={{ cursor: 'pointer' }}
                    className={`px-3 py-1.5 rounded-lg transition text-xs font-black ${isDark ? 'text-slate-400 bg-slate-800 hover:text-white' : 'text-slate-705 bg-slate-200 hover:bg-slate-300'} flex items-center gap-1 shrink-0`}
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>مخکینۍ پاڼې ته تلل</span>
                  </button>
                  
                  {/* Action buttons inside reader header */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => toggleChapterFavorite(activeNovelTextChapter, selectedPost)}
                      style={{ cursor: 'pointer' }}
                      className={`p-1.8 rounded-xl transition-all duration-200 ${
                        likedChaptersList.some(x => x.id === activeNovelTextChapter.id)
                          ? 'bg-rose-500/15 text-rose-500 border border-rose-500/20'
                          : isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-350 hover:text-white border border-slate-700/60' : 'bg-slate-150 hover:bg-slate-200 text-slate-605 hover:text-slate-900 border border-slate-200/50'
                      }`}
                      title={likedChaptersList.some(x => x.id === activeNovelTextChapter.id) ? "له خوښې لرې کول" : "څپرکی خوښول"}
                    >
                      <Heart className={`w-3.5 h-3.5 transition-transform group-active:scale-95 ${likedChaptersList.some(x => x.id === activeNovelTextChapter.id) ? 'fill-rose-500 text-rose-500 animate-pulse' : ''}`} />
                    </button>
                    
                    <div className="flex items-center gap-1.5">
                      <BookOpen className={`w-4 h-4 ${tc.text} animate-pulse`} />
                      <span className={`text-[11px] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        بېله ساده لوستنې پاڼه (خوندي متن)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modern Interactive Scroll Progress Bar & Info */}
                <div className="space-y-2.5 select-none px-1 pb-2 border-b border-slate-500/10">
                  <div className="flex flex-row-reverse items-center justify-between text-[11.5px] font-extrabold font-sans">
                    <span className={`${isDark ? 'text-indigo-400' : 'text-indigo-650'} flex items-center gap-1.5`}>
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                      لوستل شوی پورشن: {novelScrollProgress}%
                    </span>
                    <span className={`${isDark ? 'text-slate-350' : 'text-slate-600'}`}>
                      {novelScrollProgress >= 95 ? '🎉 څپرکی بشپړ لوستل شوی دی!' : 'لوستلو ته دوام ورکړئ'}
                    </span>
                  </div>
                  <div className={`w-full h-2 ${isDark ? 'bg-slate-900/60' : 'bg-slate-100'} rounded-full overflow-hidden relative shadow-inner`}>
                    <div 
                      className="absolute inset-y-0 right-0 bg-gradient-to-l from-indigo-500 via-purple-600 to-pink-500 h-full rounded-full transition-all duration-150"
                      style={{ width: `${novelScrollProgress}%` }}
                    />
                  </div>
                </div>

                {/* Chapter Title */}
                <div className="text-center py-2 border-b border-slate-500/10 pb-4">
                  <h2 className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    {activeNovelTextChapter.text 
                      ? activeNovelTextChapter.text.replace(/#[^\s]+/g, '').split('\n').filter((l: string) => l.trim() !== '')[0] || 'بې سرلیکه برخه'
                      : 'بې سرلیکه برخه'
                    }
                  </h2>
                </div>

                {/* Minimalist Scrollable Content with strict select-none and block copies */}
                <div 
                  ref={chapterScrollRef}
                  className="text-right overflow-y-auto max-h-[60vh] pr-1 pl-1"
                  onScroll={(e) => {
                    const target = e.currentTarget;
                    const totalScroll = target.scrollHeight - target.clientHeight;
                    if (totalScroll > 0) {
                      const pct = (target.scrollTop / totalScroll) * 100;
                      const roundedPct = Math.round(pct);
                      setNovelScrollProgress(roundedPct);
                      updateNovelReadingProgress(activeNovelTextChapter, roundedPct, selectedPost);
                    }
                  }}
                  onCopy={(e) => { e.preventDefault(); return false; }}
                  onContextMenu={(e) => { e.preventDefault(); return false; }}
                  style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                >
                  <div 
                    className={`text-right font-sans leading-relaxed text-[13.5px] sm:text-[14px] ${isDark ? 'text-slate-200' : 'text-slate-800'} space-y-4`}
                    style={{ direction: 'rtl', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                  >
                    {removeHashtagsOnly(activeNovelTextChapter.text || '')
                      .split('\n')
                      .filter((line, i) => {
                        const firstLineRaw = activeNovelTextChapter.text.split('\n')[0] || '';
                        const firstLineClean = firstLineRaw.replace(/#[^\s]+/g, '').trim();
                        return i > 0 || (line.trim() !== firstLineClean && line.trim() !== '');
                      })
                      .map((para, idx) => {
                        const trimmedPara = para.trim();
                        if (!trimmedPara) return null;

                        const bookmarkKey = `${activeNovelTextChapter.id}_p_${idx}`;
                        const isBookmarked = bookmarksList.some(x => x.id === bookmarkKey);

                        return (
                          <div 
                            key={idx}
                            id={`para-${idx}`}
                            onClick={() => toggleBookmark(activeNovelTextChapter.id, activeNovelTextChapter, selectedPost, idx, trimmedPara)}
                            style={{ cursor: 'pointer' }}
                            className={`group relative p-3 rounded-2xl transition-all duration-200 text-right flex items-start gap-3 select-none border border-transparent ${
                              isBookmarked 
                                ? isDark 
                                  ? 'bg-indigo-950/20 border-indigo-500/20 shadow-[0_2px_12px_rgba(99,102,241,0.08)]' 
                                  : 'bg-indigo-50/55 border-indigo-200/60 shadow-xs'
                                : 'hover:bg-slate-500/5'
                            }`}
                          >
                            <div className="flex-1 text-right min-w-0">
                              <p className={`font-medium whitespace-pre-wrap leading-relaxed text-[13px] sm:text-[13.5px] ${
                                isBookmarked 
                                  ? isDark ? 'text-indigo-200' : 'text-indigo-950 font-black' 
                                  : isDark ? 'text-slate-200' : 'text-slate-800'
                              }`}>
                                {trimmedPara}
                              </p>
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(activeNovelTextChapter.id, activeNovelTextChapter, selectedPost, idx, trimmedPara);
                              }}
                              style={{ cursor: 'pointer' }}
                              className={`p-1.5 rounded-lg shrink-0 transition-all duration-200 ${
                                isBookmarked 
                                  ? 'bg-indigo-500/20 text-indigo-500' 
                                  : 'opacity-20 group-hover:opacity-100 hover:opacity-100 text-slate-400 hover:text-indigo-400 hover:bg-slate-500/10'
                              }`}
                              title={isBookmarked ? "ښکاره نښه (بوکمارک) لرې کول" : "نښه کول (بوکمارک کول)"}
                            >
                              {isBookmarked ? (
                                <BookmarkCheck className="w-3.5 h-3.5 fill-indigo-500 text-indigo-500 animate-pulse" />
                              ) : (
                                <Bookmark className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>

                {/* Guard notice */}
                <div className="pt-4 border-t border-slate-505/10 text-center select-none">
                  <span className="text-[10px] text-slate-400 font-bold font-sans flex items-center justify-center gap-1">
                    🔒 د کاپي او شریکولو وړتیا بنده ده (متن خوندي دی)
                  </span>
                </div>
              </div>
            ) : (
              /* ==========================================================
                 C2. DEDICATED NOVEL'S MAIN DETAIL PAGE (د رومان ځانګړې پېژندنې او څپرکو بېله پاڼه)
                 ========================================================== */
              <div className={`p-4 sm:p-6 rounded-3xl ${cardBg} border border-slate-500/10 dark:border-slate-800 shadow-xl text-right animate-fade-in font-sans space-y-6`} style={{ direction: 'rtl' }}>
                
                {/* Header with Back action */}
                <div className={`px-5 py-4 ${isDark ? 'bg-slate-950/80 border-slate-850/40' : 'bg-slate-100/90 border-slate-200'} border-b flex items-center justify-between rounded-t-3xl -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 mb-5`}>
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      setActiveNovelTextChapter(null);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`px-3 py-1.5 rounded-lg transition text-xs font-black ${isDark ? 'text-slate-400 bg-slate-800 hover:text-white' : 'text-slate-705 bg-slate-200 hover:bg-slate-300'} flex items-center gap-1 shrink-0`}
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>مخکینۍ پاڼې ته تلل</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className={`w-4 h-4 ${tc.text} animate-pulse`} />
                    <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      د ناول پېژندنه او څپرکي
                    </span>
                  </div>
                </div>

                {/* Novel Hero Card (كاور او خلاصه) */}
                <div className="flex flex-col md:flex-row gap-5 items-center md:items-start text-right pb-5 border-b border-slate-500/10">
                  {/* Cover Image container */}
                  <div className="w-[140px] sm:w-[170px] aspect-[2/3] shrink-0 rounded-2xl overflow-hidden border border-slate-500/10 shadow-2xl relative group bg-black/5 dark:bg-black/20">
                    <CachedImage
                      src={selectedPost.photoUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&auto=format&fit=crop&q=80"}
                      alt="Novel Cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onClick={() => {
                        if (selectedPost.photoUrl) {
                          openPhotoLightbox(selectedPost.photoUrl, [selectedPost.photoUrl]);
                        }
                      }}
                    />
                    {selectedPost.photoUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadImage(selectedPost.photoUrl!);
                        }}
                        style={{ cursor: 'pointer' }}
                        className="absolute bottom-2 left-2 bg-slate-950/80 hover:bg-indigo-650 p-2 rounded-lg text-white transition active:scale-95 shadow-lg opacity-0 group-hover:opacity-100 duration-200 pointer-events-auto"
                        title="کاور ډاونلوډ"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Novel Meta and Description */}
                  <div className="flex-1 space-y-3.5 w-full">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 justify-start mb-1 select-none">
                        <span className="bg-indigo-505/10 text-indigo-400 font-sans font-black text-[9px] px-2 py-0.5 rounded border border-indigo-505/10">
                          {selectedPost.hasAudio ? '🔊 غږیز رومان' : '✍️ لیکل شوی رومان'}
                        </span>
                        <span className="bg-emerald-500/15 text-emerald-500 font-sans font-black text-[9px] px-2 py-0.5 rounded border border-emerald-500/10">
                          📖 بشپړ رومان
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 flex items-center gap-1 mr-1">
                          <Eye className="w-3 h-3 text-slate-500" />
                          {selectedPost.views || '0'} کتنې
                        </span>
                      </div>
                      <h2 className={`text-base sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tight mt-1.5 font-sans`}>
                        {selectedPost.text ? selectedPost.text.replace(/#کیسه|#ناول|#داستان|#کیسې|#رومان|#غږیز|#صوتي|#کتاب|#داستانونه/g, '').split('\n')[0].trim() : 'بې نومه اثر'}
                      </h2>
                    </div>

                    {/* Overview text (HASHTAGS INVISIBLE - د ناول پېژندنې معلومات بې له هشټاګونو) */}
                    <div className={`p-4 rounded-2.5xl border ${isDark ? 'bg-slate-950/40 border-slate-805/70' : 'bg-slate-50 border-slate-100'} w-full`}>
                      <h3 className="text-xs font-black text-indigo-400 mb-2 font-sans flex items-center gap-1">
                        <span>📌 د دې اثر خلاصه او پېژندنه:</span>
                      </h3>
                      <BeautifulTelegramText 
                        text={removeHashtagsOnly(selectedPost.text || '')} 
                        isDark={isDark} 
                        fs={{ body: 'text-[12.5px] sm:text-[13px] text-right font-medium leading-relaxed' }} 
                        limitLines={15} 
                        showExpander={false} 
                      />
                    </div>

                    {/* Audio files nested directly inside novel presentation */}
                    {selectedPost.audioList && selectedPost.audioList.length > 0 && (
                      <div className="w-full">
                        {selectedPost.audioList.map((audioItem, idx) => {
                          const cleanIntroTitle = getBeautifulAudioTitle(audioItem.title, selectedPost.title || 'د اثر پېژندنې معرفي غږ', selectedPost.text, idx);
                          return (
                            <BeautifulAudioPlayer
                              key={idx}
                              url={audioItem.url}
                              title={cleanIntroTitle}
                              duration={audioItem.duration}
                              isDark={isDark}
                              tc={tc}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bookmarks Section (خوندي شوي پاراګرافونه / یادښتونه) */}
                {(() => {
                  const activeNovelBookmarks = bookmarksList.filter(b => b.novelId === selectedPost.id);
                  if (activeNovelBookmarks.length === 0) return null;

                  return (
                    <div className="space-y-3.5 pt-2 border-b border-dashed border-slate-500/10 pb-5">
                      <div className="flex items-center justify-between text-right">
                        <div className="flex items-center gap-2">
                          <BookmarkCheck className="w-4 h-4 text-indigo-400 fill-indigo-400 animate-pulse" />
                          <h3 className={`text-xs sm:text-sm font-black ${isDark ? 'text-indigo-300' : 'text-slate-800'} font-sans`}>
                            📌 پدې رومان کې ستاسو نښه شوي پاڼې او یاداښتونه (بوکمارکونه)
                          </h3>
                        </div>
                        <span className={`text-[9px] font-sans font-black ${isDark ? 'bg-indigo-950/40 text-indigo-400 border border-indigo-900/40' : 'bg-indigo-100/60 text-indigo-700'} px-2.5 py-0.5 rounded-lg`}>
                          یادښتونه: {toPashtoNumber(activeNovelBookmarks.length.toString())}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[320px] overflow-y-auto pr-1 pl-1">
                        {activeNovelBookmarks.map((bookmark) => (
                          <div 
                            key={bookmark.id}
                            onClick={() => {
                              markPostAsRead(bookmark.chapterPost.id);
                              setActiveNovelTextChapter(bookmark.chapterPost);
                              setActiveBookmarkParagraphIndex(bookmark.paragraphIndex);
                            }}
                            style={{ cursor: 'pointer' }}
                            className={`p-3.5 rounded-2.5xl border transition-all duration-300 flex flex-col justify-between gap-3 text-right hover:scale-[1.012] hover:border-indigo-500/35 relative group ${
                              isDark 
                                ? 'bg-indigo-955/15 border-indigo-950/40 hover:bg-slate-900/80 shadow-md' 
                                : 'bg-indigo-50/20 border-indigo-100/60 hover:bg-white shadow-xs'
                            }`}
                          >
                            <div className="space-y-1.5 min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                                  {bookmark.chapterTitle}
                                </span>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeBookmarkRaw(bookmark.id);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                  className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors z-10"
                                  title="لرې کول"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                              <p className={`text-[11.5px] font-medium leading-relaxed font-sans line-clamp-3 pr-1 ${
                                isDark ? 'text-slate-300' : 'text-slate-700'
                              }`}>
                                {bookmark.textSnippet}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between border-t border-slate-500/5 pt-2 mt-1">
                              <span className="text-[8.5px] text-slate-450 font-mono">
                                {getRelativeTimeInPashto(new Date(bookmark.timestamp).toISOString(), 'اوسمهال')}
                              </span>
                              <span className="text-[8.5px] font-black text-indigo-505 flex items-center gap-1">
                                <span>دلته لوستل پیل کړئ</span>
                                <ChevronLeft className="w-2.5 h-2.5" />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Chapters List (څپرکي په لیست او ډیزاین کې) */}
                {(() => {
                  const uniqueNovelTag = getUniqueNovelHashtagGlobal(selectedPost.text || '');
                  if (!uniqueNovelTag) return null;

                  const allNovelFeedPosts = novelsFeedData?.posts || feedData?.posts || [];
                  const relatedParts = allNovelFeedPosts.filter(p => {
                    const pTags = getPostHashtags(p.text || '');
                    return pTags.includes(uniqueNovelTag);
                  }).sort((a, b) => {
                    const getPartNumber = (txt: string): number => {
                      const match = txt.match(/برخه\s*(\d+)/i) || txt.match(/برخه\s*([۰-۹]+)/i);
                      if (match) {
                        let numStr = match[1];
                        const easternToWestern: Record<string, string> = {
                          '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
                          '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
                        };
                        numStr = numStr.split('').map(char => easternToWestern[char] || char).join('');
                        return parseInt(numStr) || 0;
                      }
                      return 0;
                    };
                    const partA = getPartNumber(a.text || '');
                    const partB = getPartNumber(b.text || '');
                    if (partA && partB) return partA - partB;
                    return (parseInt(a.id) || 0) - (parseInt(b.id) || 0);
                  });

                  const chapterParts = relatedParts.filter(part => !isPostNovelProfileGlobal(part));

                  return (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between border-b pb-2.5 border-slate-500/10">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-5 h-5 text-indigo-400" />
                          <span className={`text-xs sm:text-sm font-black ${isDark ? 'text-indigo-300' : 'text-slate-850'} font-sans`}>
                            ✨ د دې رومان ټول خپاره شوي څپرکي او برخې
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-sans font-black bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-xl">
                          ټولې برخې: {toPashtoNumber(chapterParts.length)}
                        </span>
                      </div>

                      {chapterParts.length === 0 ? (
                        <div className="p-8 text-center border border-dashed border-slate-550/15 rounded-2xl bg-black/5 dark:bg-black/15">
                          <p className="text-xs text-slate-400 font-bold font-sans">پدې ناول پورې اړوند کوم بل خپرو شوی څپرکی ونه موندل شو.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1 pl-1">
                          {chapterParts.map((part, index) => {
                            let partTitle = part.text 
                              ? part.text.replace(/#[^\s]+/g, '').split('\n').filter((l: string) => l.trim() !== '')[0] || `برخه ${index + 1}`
                              : `برخه ${index + 1}`;
                            
                            if (partTitle.length > 55) {
                              partTitle = partTitle.slice(0, 52) + '...';
                            }

                            const hasAudio = !!(part.hasAudio || part.audioUrl || (part.audioList && part.audioList.length > 0));
                            const isRead = readPostIds.includes(part.id);

                            if (hasAudio) {
                              // 1. Audio Chapters - Render playbacks completely in place without leaving
                              const postAudioItems = part.audioList && part.audioList.length > 0
                                ? part.audioList
                                : (part.audioUrl ? [{ url: part.audioUrl, title: part.audioTitle || partTitle, duration: part.audioDuration }] : []);

                              return (
                                <div key={part.id} className="w-full">
                                  {postAudioItems.map((audioItem: any, aIdx: number) => {
                                    const cleanAudioTitle = getBeautifulAudioTitle(audioItem.title, partTitle, part.text, index);
                                    return (
                                      <BeautifulAudioPlayer
                                        key={aIdx}
                                        url={audioItem.url}
                                        title={cleanAudioTitle}
                                        duration={audioItem.duration}
                                        isDark={isDark}
                                        tc={tc}
                                      />
                                    );
                                  })}
                                </div>
                              );
                            } else {
                              // 2. Text Chapters - Opens on clicking in a Dedicated, clean protect-reading page
                              return (
                                <div 
                                  key={part.id}
                                  onClick={() => {
                                    markPostAsRead(part.id);
                                    setActiveNovelTextChapter(part);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                  className={`p-3.5 rounded-3xl border transition-all duration-300 flex items-center justify-between gap-3 text-right hover:scale-[1.015] active:scale-[0.99] select-none ${
                                    isDark 
                                      ? 'bg-slate-900/60 border-slate-805/85 hover:bg-slate-800 hover:border-indigo-500/20 shadow-md' 
                                      : 'bg-white border-slate-205 shadow-sm hover:bg-slate-50 hover:border-indigo-500/20'
                                  } ${isRead ? 'opacity-45 saturate-[0.55] hover:opacity-95' : ''}`}
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                                      isDark ? 'bg-emerald-950/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                                    }`}>
                                      {toPashtoNumber(index + 1)}
                                    </div>
                                    <div className="text-right min-w-0">
                                      <h4 className={`text-[12px] sm:text-[12.5px] font-black line-clamp-1 h-5 ${
                                        isDark ? 'text-white' : 'text-slate-900'
                                      }`}>
                                        {partTitle}
                                      </h4>
                                      <p className="text-[9.5px] text-slate-450 mt-1 flex items-center gap-2 select-none">
                                        <span>{getRelativeTimeInPashto(part.date, part.timeLabel || 'وروستی')}</span>
                                        <span>•</span>
                                        <span className="text-emerald-500 flex items-center gap-1 font-bold">
                                          ✍️ متن لوستل
                                        </span>
                                      </p>
                                    </div>
                                  </div>

                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition ${
                                    isDark 
                                      ? 'bg-slate-950 border-slate-800 text-emerald-400' 
                                      : 'bg-slate-50 border-slate-200 text-emerald-600'
                                  }`}>
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      )}
                    </div>
                  );
                })()}
                
                {/* Novel Profile Page Reactions */}
                {selectedPost.reactions && selectedPost.reactions.length > 0 && (
                  <div className={`flex flex-wrap gap-1.5 pt-4 border-t ${isDark ? 'border-slate-800/40' : 'border-slate-205'} justify-start pb-1`}>
                    {selectedPost.reactions.map((react, i) => (
                      <div
                        key={i}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 ${isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'} rounded-full border text-xs select-none`}
                      >
                        <span className="text-sm">{react.emoji}</span>
                        <span className={`font-mono text-[9px] ${isDark ? 'text-slate-400' : 'text-slate-505'} font-bold`}>{react.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          ) : (
          
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
              <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'} font-bold flex items-center gap-1.5`}>
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>{getRelativeTimeInPashto(selectedPost.date, selectedPost.timeLabel || 'وروستی')}</span>
              </span>
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
                      onClickOverride={() => openReelWithVideoUrl(videoItem.url)}
                      autoPlay={true}
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
                  onClickOverride={() => openReelWithVideoUrl(selectedPost.videoUrl!)}
                  autoPlay={true}
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
                      <CachedImage
                        src={url}
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
                <CachedImage
                  src={selectedPost.photoUrl || ''}
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
                  {selectedPost.audioList.map((audioItem, idx) => {
                    const cleanTitle = getBeautifulAudioTitle(audioItem.title, selectedPost.title, selectedPost.text, idx);
                    return (
                      <BeautifulAudioPlayer key={idx} url={audioItem.url} title={cleanTitle} isDark={isDark} tc={tc} />
                    );
                  })}
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

              {/* UNIQUE NOVEL RELATIONSHIP (د ناول برخې او کيسې تړاو تړون) */}
              {(() => {
                const getHashtags = (t: string): string[] => {
                  if (!t) return [];
                  const matches = t.match(/#[^\s#\.,'\?\!\"🗺️✨🎙️🎵📚✍️():؛،«»\-]+/g) || [];
                  return matches.map(tag => tag.trim());
                };

                const getUniqueNovelHashtag = (t: string): string | null => {
                  const hashtags = getHashtags(t);
                  const excluded = [
                    '#ناول', '#ناول_پروفایل', '#ناول_پروفايل', '#پروفایل', '#پروفايل', 
                    '#پروفایل_ناول', '#پروفايل_ناول', '#کتاب', '#بشپړ', '#معلومات', '#پېژندنه', '#پیژندنه',
                    '#پښتو', '#افغانستان', '#audio', '#mp3', '#غږیز', '#صوتي', '#کیسه', '#کيسه',
                    '#کیسې', '#کيسې', '#داستان', '#لنډه_کیسه', '#novel_profile', '#profile_novel'
                  ];
                  return hashtags.find(tag => !excluded.includes(tag)) || null;
                };

                const uniqueNovelTag = getUniqueNovelHashtag(selectedPost.text || '');
                if (!uniqueNovelTag) return null;

                // Search all posts from novels feed that share this unique tag
                const allNovelFeedPosts = novelsFeedData?.posts || [];
                const relatedParts = allNovelFeedPosts.filter(p => {
                  const pTags = getHashtags(p.text || '');
                  return pTags.includes(uniqueNovelTag);
                }).sort((a, b) => {
                  const getPartNumber = (txt: string): number => {
                    const match = txt.match(/برخه\s*(\d+)/i) || txt.match(/برخه\s*([۰-۹]+)/i);
                    if (match) {
                      let numStr = match[1];
                      const easternToWestern: Record<string, string> = {
                        '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
                        '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
                      };
                      numStr = numStr.split('').map(char => easternToWestern[char] || char).join('');
                      return parseInt(numStr) || 0;
                    }
                    return 0;
                  };
                  const partA = getPartNumber(a.text || '');
                  const partB = getPartNumber(b.text || '');
                  if (partA && partB) return partA - partB;
                  return (parseInt(a.id) || 0) - (parseInt(b.id) || 0);
                });

                if (relatedParts.length <= 1) return null;

                const profilePost = relatedParts.find(p => {
                  const pTags = getHashtags(p.text || '');
                  return pTags.some(tag => 
                    tag.includes('پروفایل') || 
                    tag.includes('پروفايل') || 
                    tag.includes('profile') || 
                    tag.includes('پېژندنه') || 
                    tag.includes('پیژندنه')
                  );
                });

                return (
                  <div className={`mt-5 p-4 rounded-2xl border text-right space-y-3 ${isDark ? 'bg-indigo-950/20 border-indigo-500/20' : 'bg-indigo-50/40 border-indigo-100'}`} style={{ direction: 'rtl' }}>
                    <div className="flex flex-row-reverse items-center justify-between border-b pb-2 mb-2 border-indigo-500/10">
                      <div className="flex flex-row-reverse items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-xs sm:text-sm font-black text-indigo-400 font-sans">
                          📖 د دې رومان ځانګړي فصلونه (Novel Chapters / Parts)
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold font-sans">
                        ټولې برخې: {relatedParts.length}
                      </span>
                    </div>
                    
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans mb-1">
                      دا پوسټ د <span className="text-indigo-400 font-bold">{uniqueNovelTag}</span> تر سرلیک لاندې رومان پورې تړاو لري:
                    </p>

                    {profilePost && selectedPost.id !== profilePost.id && (
                      <button
                        onClick={() => setSelectedPost(profilePost)}
                        style={{ cursor: 'pointer' }}
                        className={`w-full py-2.5 px-4 rounded-xl border font-black text-xs text-center flex items-center justify-center gap-2 transition active:scale-[0.98] mb-3 ${
                          isDark 
                            ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300 hover:bg-indigo-650/30' 
                            : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5 animate-bounce shrink-0" />
                        <span>📖 د دې ناول عمومي پېژندنه او د ټولو څپرکو بېله پاڼه کتل</span>
                      </button>
                    )}

                    {/* Chapters Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {relatedParts.map((part, index) => {
                        const isCurrent = part.id === selectedPost.id;
                        const partHashtags = getHashtags(part.text || '');
                        const isPartProfile = partHashtags.some(tag => 
                          tag.includes('پروفایل') || 
                          tag.includes('پروفايل') || 
                          tag.includes('profile') || 
                          tag.includes('پېژندنه') || 
                          tag.includes('پیژندنه')
                        );
                        
                        let partLabel = `برخه ${index + 1}`;
                        if (isPartProfile) {
                          partLabel = "🖼️ عمومي پروفایل";
                        } else {
                          const partMatch = (part.text || '').match(/برخه\s*(\d+)/i) || (part.text || '').match(/برخه\s*([۰-۹]+)/i) || (part.text || '').match(/برخه\s*(\w+)/);
                          if (partMatch) {
                            partLabel = `برخه ${partMatch[1]}`;
                          }
                        }

                        return (
                          <button
                            key={part.id}
                            onClick={() => {
                              setSelectedPost(part);
                            }}
                            style={{ cursor: 'pointer' }}
                            className={`p-2 rounded-xl text-[10.5px] font-sans font-black border text-center transition active:scale-95 flex flex-col items-center justify-center gap-1 ${
                              isCurrent
                                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                                : isDark
                                  ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className="truncate max-w-full font-bold">{partLabel}</span>
                            {!isPartProfile && (
                              <span className="text-[8px] opacity-70">
                                {part.hasAudio ? '🔊 غږیز' : '✍️ لیکل شوی'}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Copy, Like, WhatsApp & Share Action Buttons Row (د شعر د کاپي، خوښولو، واټساپ او شریکولو ښکلي بټنې) */}
              {selectedPost.text && selectedPost.text.trim() !== '' && (
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-3.5 border-t ${isDark ? 'border-slate-800/40' : 'border-slate-205'}`}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedPost.text || '');
                      showToast('متن په برياليتوب سره کاپي شو! 📋', 'success');
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`py-3 px-3.5 ${isDark ? 'bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-900' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-755'} border rounded-xl text-[11px] sm:text-[11.5px] font-bold transition active:scale-95 flex items-center justify-center gap-2 shadow-xs group`}
                  >
                    <Copy className="w-4 h-4 text-indigo-450 group-hover:scale-110 transition" />
                    <span>کاپي کول</span>
                  </button>

                  <button
                    onClick={() => toggleFavorite(selectedPost.id)}
                    style={{ cursor: 'pointer' }}
                    className={`py-3 px-3.5 border rounded-xl text-[11px] sm:text-[11.5px] font-bold transition active:scale-95 flex items-center justify-center gap-2 group shadow-xs ${
                      favoritePostIds.includes(selectedPost.id)
                        ? 'bg-rose-500/15 border-rose-500/30 text-rose-500 font-black'
                        : `${isDark ? 'bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-900' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-755'}`
                    }`}
                  >
                    <Heart className={`w-4 h-4 transition-all duration-300 ${
                      favoritePostIds.includes(selectedPost.id) ? 'text-rose-500 fill-rose-500 scale-110 animate-pulse' : 'text-slate-400 group-hover:text-rose-500'
                    }`} />
                    <span>{favoritePostIds.includes(selectedPost.id) ? 'خوښ شوی' : 'خوښول'}</span>
                  </button>

                  <button
                    onClick={() => handleWhatsAppShare(selectedPost)}
                    style={{ cursor: 'pointer' }}
                    className="py-3 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] sm:text-[11.5px] font-bold transition active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10 group"
                  >
                    <svg className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition fill-current" viewBox="0 0 24 24">
                      <path d="M12.012 3c-4.96-.005-9.005 4.02-9.01 8.977a8.94 8.94 0 0 0 1.202 4.492L3 21l4.7-.1.353-.1.332.352c1.082.52 2.274.8 3.518.8h.01c4.965.004 9.01-4.015 9.013-8.977A8.97 8.97 0 0 0 12.012 3zm4.5 12c-.2.5-.9.9-1.4 1-1 .2-2.3-.2-3.8-1.5-1.5-1.3-2.5-2.8-2.8-3.4-.3-.5-.4-.9-.4-1.3 0-.6.3-.9.4-1.1.1-.2.2-.2.3-.2l.7.1c.2 0 .4.1.5.3.3.6.7 1.4.8 1.5.1.2.1.4 0 .6-.1.2-.2.3-.3.4l-.4.3c-.1.1-.1.2 0 .4.4.8 1 1.4 1.8 1.8.2.1.3.1.4 0 .2-.2.4-.5.6-.7l.4-.2c.2 0 .4.1.7.3.7.4 1.2.7 1.3.8.3.1.3.3.2.4-.1.4-.4.8-.8 1z"/>
                    </svg>
                    <span>واټساپ</span>
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
                    className={`py-3 px-3.5 ${tc.bg} ${tc.hoverBg} rounded-xl text-[11px] sm:text-[11.5px] font-bold text-white transition active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 group`}
                  >
                    <Share2 className="w-4 h-4 text-indigo-100 group-hover:scale-110 transition" />
                    <span>نور شریکول</span>
                  </button>
                </div>
              )}
            </div>

            {/* Dynamic Telegram Reactions Block (ايموجي ريکشن شمير د ټلیګرام په شان) */}
            {selectedPost.reactions && selectedPost.reactions.length > 0 && (
              <div className={`flex flex-wrap gap-1.5 pt-3.5 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-205'} justify-start px-5 sm:px-6 pb-4`}>
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
        )
      ) : isReelsOpen ? (
          /* ==========================================================
             REELS / SHORTS VIEW (د ټک ټاک او شارټس په ډیزاین د ویډیوګانو بېله زړه پورې پاڼه)
             ========================================================== */
          <div className="fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden flex flex-col justify-center items-center font-sans animate-fade-in">
            {reelsList.length === 0 ? (
              <div className="space-y-4 text-center p-8 max-w-sm mx-auto text-white animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-400 mb-4 border border-slate-800">
                  <Video className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-black text-white">لا تر اوسه هیڅ ویډیوګانې نشته</h3>
                <p className="text-xs text-slate-400 leading-relaxed">زموږ په چینل کې تر اوسه پورې هیڅ ویډیوګانې نه دي پورته شوي، مهرباني وکړئ وروسته وګورئ.</p>
                <button
                  onClick={() => setIsReelsOpen(false)}
                  className={`px-6 py-2.5 ${tc.bg} hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition`}
                >
                  شاته لاړ شئ
                </button>
              </div>
            ) : (() => {
              const activeReel = reelsList[activeReelIndex];
              if (!activeReel) return null;
              
              const handleShareReel = (e: React.MouseEvent) => {
                e.stopPropagation();
                const shareUrl = activeReel.post.postUrl || window.location.href;
                if (navigator.share) {
                  navigator.share({
                    title: 'د مينې ډېوه د وېډو خپرونه',
                    text: activeReel.post.text || '',
                    url: shareUrl
                  }).catch(err => console.log(err));
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  setToast('د ويډيو پيوند ادرس کاپي شو!');
                }
              };

              const handleCopyReelText = (e: React.MouseEvent) => {
                e.stopPropagation();
                navigator.clipboard.writeText(activeReel.post.text || '');
                setToast('د ويډيو پېغام شعر متن کاپي شو!');
              };

              return (
                <div 
                  className="w-full h-full relative bg-black flex flex-col justify-center items-center overflow-hidden"
                  onWheel={handleReelWheel}
                  onTouchStart={onReelTouchStart}
                  onTouchMove={onReelTouchMove}
                  onTouchEnd={onReelTouchEnd}
                >
                  {/* Floating Action Glass Back navigation button, positioned top-right for high ergonomics */}
                  <button
                    onClick={() => setIsReelsOpen(false)}
                    style={{ top: 'calc(1.25rem + env(safe-area-inset-top, 0px))', right: '1.25rem', cursor: 'pointer' }}
                    className="absolute z-40 px-4 py-2.5 rounded-full bg-black/60 hover:bg-white/10 border border-white/10 text-white shadow-2xl active:scale-95 transition backdrop-blur-md flex items-center gap-2 font-sans font-bold text-xs"
                    title="کورپاڼې ته شاته لاړ شئ"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                    <span>شاته تګ</span>
                  </button>

                  {/* Complete black background beautiful fullscreen theater overlay */}
                  <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
                    <AnimatePresence initial={false} custom={swipeDirection}>
                      <motion.div
                        key={activeReelIndex}
                        custom={swipeDirection}
                        variants={{
                          enter: (dir) => ({
                            y: dir === 'next' ? '100%' : '-100%',
                            opacity: 0,
                            scale: 0.96
                          }),
                          center: {
                            y: 0,
                            opacity: 1,
                            scale: 1
                          },
                          exit: (dir) => ({
                            y: dir === 'next' ? '-100%' : '100%',
                            opacity: 0,
                            scale: 0.96
                          })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 240,
                          damping: 26,
                          mass: 0.8
                        }}
                        className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
                      >
                        {/* 1. IMMERSIVE VIDEO ELEMENT */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black">
                          <video
                            ref={(el) => {
                              if (el) {
                                reelVideoRef.current = el;
                              }
                            }}
                            src={cachedActiveReelVideoUrl || activeReel.videoUrl}
                            poster={cachedActiveReelPosterUrl || activeReel.poster}
                            loop
                            playsInline
                            autoPlay
                            muted={reelMuted}
                            preload="auto"
                            onClick={() => {
                              if (reelVideoRef.current) {
                                if (reelPlaying) {
                                  reelVideoRef.current.pause();
                                  setReelPlaying(false);
                                  flashCenterIcon('pause');
                                } else {
                                  pauseGlobalAudio();
                                  const playPromise = reelVideoRef.current.play();
                                  if (playPromise !== undefined) {
                                    playPromise.catch((err) => {
                                      if (err.name !== 'AbortError') {
                                        console.warn("Reel play failed on click:", err);
                                      }
                                    });
                                  }
                                  setReelPlaying(true);
                                  flashCenterIcon('play');
                                }
                              }
                            }}
                            onTimeUpdate={() => {
                              if (reelVideoRef.current) {
                                const cur = reelVideoRef.current.currentTime;
                                const dur = reelVideoRef.current.duration || 1;
                                setReelProgress((cur / dur) * 100);
                              }
                            }}
                            className="w-full h-full object-contain cursor-pointer"
                          />
                        </div>

                        {/* 2. LOADING SPIN OVERLAY */}
                        {reelLoading && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-25 pointer-events-none">
                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}

                        {/* 3. DYNAMIC PLAY/PAUSE ICON OVERLAY WITH 2-SECOND AUTOHIDE (د ۲ ثانیو وروسته د بټن خپله ورکېدل) */}
                        <AnimatePresence>
                          {showCenterIcon && centerIconType && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.4 }}
                              transition={{ duration: 0.30 }}
                              className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none select-none"
                            >
                              <div className="bg-black/55 backdrop-blur-md p-6 sm:p-6.5 rounded-full border border-white/20 shadow-[0_8px_32px_rgba(99,102,241,0.25)] text-white">
                                {centerIconType === 'play' ? (
                                  <Play className="w-10 h-10 text-white fill-white translate-x-0.5" />
                                ) : (
                                  <Pause className="w-10 h-10 text-white fill-white" />
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* 4. LIGHTNING GRADIENT OVERLAYS */}
                        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/85 via-black/35 to-transparent pointer-events-none z-10" />
                        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />

                        {/* 5. TOP FLOATING REELS STATS BAR */}
                        <div className="absolute left-6 right-6 flex items-center justify-between z-20 text-white" style={{ top: 'calc(1.5rem + env(safe-area-inset-top, 0px))' }}>
                          {/* Left: Indicator of reel progress */}
                          <span className="text-[11px] font-mono font-black bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full shadow select-none">
                            {activeReelIndex + 1} / {reelsList.length}
                          </span>
                          
                          {/* Right heading */}
                          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full shadow select-none">
                            <div className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                            <span className="text-[11.5px] font-black text-rose-300 font-sans">لنډه ويډيو (Shorts)</span>
                          </div>
                        </div>

                        {/* 6. CONTROL BUTTONS IN THE BOTTOM RIGHT CORNER (د ويډیو لپاره کاپي، غږ او نور عمده تڼۍ په لاندې ښي اړخ کې) */}
                        <div 
                          className="absolute bottom-24 right-5 sm:right-7 flex flex-col gap-4.5 z-25 items-center select-none" 
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Like / Heart Button (د ويډيو خوښول) */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(activeReel.post.id);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="flex flex-col items-center group active:scale-90 transition"
                            title="خوښ بټن"
                          >
                            <div className={`w-11.5 h-11.5 rounded-full border flex items-center justify-center backdrop-blur-md transition-all shadow-xl ${
                              favoritePostIds.includes(activeReel.post.id)
                                ? 'bg-rose-600/80 border-rose-500 scale-105'
                                : 'bg-black/60 border-white/10 hover:border-rose-500 hover:scale-105 hover:bg-black/80'
                            }`}>
                              <Heart className={`w-5 h-5 transition duration-250 ${
                                favoritePostIds.includes(activeReel.post.id) 
                                  ? 'text-white fill-white scale-110' 
                                  : 'text-slate-100 group-hover:text-rose-500 group-hover:scale-110'
                              }`} />
                            </div>
                            <span className="text-[10px] text-slate-300 mt-1 font-bold shadow-md select-none pr-0.5">
                              {favoritePostIds.includes(activeReel.post.id) ? 'خوښ شو' : 'خوښول'}
                            </span>
                          </button>

                          {/* Share button */}
                          <button 
                            onClick={handleShareReel}
                            style={{ cursor: 'pointer' }}
                            className="flex flex-col items-center group active:scale-90 transition"
                            title="شریکول"
                          >
                            <div className="w-11.5 h-11.5 rounded-full bg-black/60 border border-white/10 hover:border-indigo-400 hover:scale-105 flex items-center justify-center text-white backdrop-blur-md hover:bg-black/80 transition-all shadow-xl">
                              <Share2 className="w-5 h-5 text-slate-100 group-hover:text-indigo-400 group-hover:scale-110 transition duration-250" />
                            </div>
                            <span className="text-[10px] text-slate-300 mt-1 font-bold shadow-md select-none pr-0.5">شریک کړئ</span>
                          </button>

                          {/* Copy poetry text button */}
                          <button 
                            onClick={handleCopyReelText}
                            style={{ cursor: 'pointer' }}
                            className="flex flex-col items-center group active:scale-90 transition"
                            title="شعر کاپي کړه"
                          >
                            <div className="w-11.5 h-11.5 rounded-full bg-black/60 border border-white/10 hover:border-pink-400 hover:scale-105 flex items-center justify-center text-white backdrop-blur-md hover:bg-black/80 transition-all shadow-xl">
                              <Copy className="w-5 h-5 text-slate-100 group-hover:text-pink-400 group-hover:scale-110 transition duration-250" />
                            </div>
                            <span className="text-[10px] text-slate-300 mt-1 font-bold shadow-md select-none pr-0.5">کاپي کول</span>
                          </button>

                          {/* Mute/Volume Toggle */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (reelVideoRef.current) {
                                const isM = !reelMuted;
                                reelVideoRef.current.muted = isM;
                                setReelMuted(isM);
                              }
                            }}
                            style={{ cursor: 'pointer' }}
                            className="flex flex-col items-center group active:scale-95 transition"
                            title={reelMuted ? "غږ فعال کړه" : "غږ پټ کړه"}
                          >
                            <div className="w-11.5 h-11.5 rounded-full bg-black/60 border border-white/10 hover:border-indigo-400 hover:scale-105 flex items-center justify-center text-white backdrop-blur-md hover:bg-black/80 transition-all shadow-xl">
                              {reelMuted ? (
                                <VolumeX className="w-5 h-5 text-rose-450 group-hover:scale-110 transition duration-250" />
                              ) : (
                                <Volume2 className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition duration-250" />
                              )}
                            </div>
                            <span className="text-[10px] text-slate-300 mt-1 font-bold shadow-md select-none pr-0.5">{reelMuted ? "غږ فعالول" : "غږ پټول"}</span>
                          </button>

                          {/* Desktop Up Indicator (Previous video) */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrevReel();
                            }}
                            style={{ cursor: 'pointer' }}
                            className="hidden sm:flex flex-col items-center group active:scale-95 transition"
                            title="مخکینی ویډیو"
                          >
                            <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 transition shadow">
                              <ChevronUp className="w-4.5 h-4.5 text-white animate-pulse" />
                            </div>
                          </button>

                          {/* Desktop Down Indicator (Next video) */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNextReel();
                            }}
                            style={{ cursor: 'pointer' }}
                            className="hidden sm:flex flex-col items-center group active:scale-95 transition"
                            title="بل ویډیو"
                          >
                            <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 transition shadow">
                              <ChevronDown className="w-4.5 h-4.5 text-white animate-pulse" />
                            </div>
                          </button>
                        </div>

                        {/* 7. BOTTOM POETRY OVERLAY CAPTION BLOCK */}
                        <div className="absolute bottom-6 right-24 sm:right-28 left-6 z-20 text-white select-text pointer-events-none text-right flex flex-col gap-2">
                          <div className="flex items-center gap-2 justify-end select-none pointer-events-none">
                            <span className="text-white text-[11px] font-black leading-tight drop-shadow font-sans">
                              پښتو ادبي خزانه
                            </span>
                            <div 
                              onClick={() => {
                                if (storiesList.length > 0) {
                                  setActiveStoryIndex(0);
                                  setIsStoryViewerOpen(true);
                                }
                              }}
                              style={{ cursor: storiesList.length > 0 ? 'pointer' : 'default' }}
                              className={`pointer-events-auto shrink-0 transition-all duration-300 ${
                                storiesList.length > 0 
                                  ? 'p-[2px] bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 rounded-full animate-pulse-slow active:scale-95 shadow-[0_0_12px_rgba(236,72,153,0.55)]' 
                                  : 'w-6.5 h-6.5 rounded-full border border-white/20 shadow-md overflow-hidden'
                              }`}
                              title={storiesList.length > 0 ? "پښتو ادبي خزانه سټوري وګورئ" : ""}
                            >
                              <div className={`rounded-full overflow-hidden ${storiesList.length > 0 ? 'w-5.5 h-5.5' : 'w-full h-full'}`}>
                                <img 
                                  src={feedData?.channelInfo?.avatarUrl || "https://t.me/i/userpic/320/obaidapp.jpg"} 
                                  alt="avatar" 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Poetry text message body */}
                          <div className="pointer-events-auto mt-1 pr-1 text-right flex flex-col gap-0.5" style={{ direction: 'rtl' }}>
                            <p className="text-white text-[12.5px] sm:text-[13.5px] leading-relaxed drop-shadow font-sans font-semibold break-words text-right line-clamp-2 select-text whitespace-pre-line">
                              {activeReel.post.text || 'پښتو شعر د کتنې لپاره...'}
                            </p>
                            {(activeReel.post.text && (activeReel.post.text.length > 50 || activeReel.post.text.includes('\n'))) ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOverlayActiveText(activeReel.post.text);
                                  markPostAsRead(activeReel.post.id);
                                }}
                                className="bg-black/45 hover:bg-black/65 px-2.5 py-0.5 rounded-lg text-[10.5px] font-black text-indigo-300 hover:text-indigo-200 text-right cursor-pointer self-start select-none w-max border border-white/10 shadow-md mt-1 transition pointer-events-auto"
                              >
                                نور ولولئ
                              </button>
                            ) : null}
                          </div>

                          {/* Views count and date indicator */}
                          <div className="flex items-center gap-3 justify-end text-[9px] text-slate-350 pointer-events-none select-none drop-shadow mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                              {activeReel.post.timeLabel || 'وروستی'}
                            </span>
                            <span className="flex items-center gap-1 font-mono">
                              <Eye className="w-3.5 h-3.5 text-indigo-400" />
                              {activeReel.post.views || '0'} كتنې
                            </span>
                          </div>
                        </div>

                        {/* 8. MINI RUNNING TIMELINE PROGRESS TRACKER BAR */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 pointer-events-none">
                          <div 
                            className="h-full bg-linear-to-r from-indigo-500 via-pink-500 to-rose-500 transition-all duration-100" 
                            style={{ width: `${reelProgress}%` }}
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : isPhotoReelsOpen ? (
          /* ==========================================================
             PHOTO REELS / IMAGES SWIPER VIEW (د انځورونو بېله او مستقله زړه پورې پاڼه کټ مټ د ويډيوګانو غوندې)
             ========================================================== */
          <div className="fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden flex flex-col justify-center items-center font-sans animate-fade-in">
            {photoReelsList.length === 0 ? (
              <div className="space-y-4 text-center p-8 max-w-sm mx-auto text-white animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-400 mb-4 border border-slate-800">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-black text-white">لا تر اوسه هیڅ انځورونه نشته</h3>
                <p className="text-xs text-slate-400 leading-relaxed">زموږ په چینل کې تر اوسه پورې هیڅ انځورونه نه دي پورته شوي، مهرباني وکړئ وروسته وګورئ.</p>
                <button
                  onClick={() => setIsPhotoReelsOpen(false)}
                  className={`px-6 py-2.5 ${tc.bg} hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition`}
                >
                  شاته لاړ شئ
                </button>
              </div>
            ) : (() => {
              const activePhotoReel = photoReelsList[activePhotoReelIndex];
              if (!activePhotoReel) return null;
              
              const handleSharePhotoReel = (e: React.MouseEvent) => {
                e.stopPropagation();
                const shareUrl = activePhotoReel.post.postUrl || window.location.href;
                if (navigator.share) {
                  navigator.share({
                    title: 'د مينې ډېوه د شعر انځور',
                    text: activePhotoReel.post.text || '',
                    url: shareUrl
                  }).catch(err => console.log(err));
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  setToast('د انځور پيوند ادرس کاپي شو!');
                }
              };

              const handleCopyPhotoReelText = (e: React.MouseEvent) => {
                e.stopPropagation();
                navigator.clipboard.writeText(activePhotoReel.post.text || '');
                setToast('د شعر متن کاپي شو!');
              };

              return (
                <div 
                  className="w-full h-full relative bg-black flex flex-col justify-center items-center overflow-hidden animate-fade-in"
                  onWheel={handlePhotoReelWheel}
                  onTouchStart={onPhotoReelTouchStart}
                  onTouchMove={onPhotoReelTouchMove}
                  onTouchEnd={onPhotoReelTouchEnd}
                >
                  {/* Floating Action Glass Back navigation button, positioned top-right for high ergonomics */}
                  <button
                    onClick={() => setIsPhotoReelsOpen(false)}
                    style={{ cursor: 'pointer' }}
                    className="absolute top-5 right-5 z-40 px-4 py-2.5 rounded-full bg-black/60 hover:bg-white/10 border border-white/10 text-white shadow-2xl active:scale-95 transition backdrop-blur-md flex items-center gap-2 font-sans font-bold text-xs"
                    title="کورپاڼې ته شاته لاړ شئ"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                    <span>شاته تګ</span>
                  </button>

                  {/* Complete black background beautiful fullscreen theater overlay */}
                  <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
                    <AnimatePresence initial={false} custom={photoSwipeDirection}>
                      <motion.div
                        key={activePhotoReelIndex}
                        custom={photoSwipeDirection}
                        variants={{
                          enter: (dir) => ({
                            y: dir === 'next' ? '100%' : '-100%',
                            opacity: 0,
                            scale: 0.96
                          }),
                          center: {
                            y: 0,
                            opacity: 1,
                            scale: 1
                          },
                          exit: (dir) => ({
                            y: dir === 'next' ? '-100%' : '100%',
                            opacity: 0,
                            scale: 0.96
                          })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 240,
                          damping: 26,
                          mass: 0.8
                        }}
                        className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
                      >
                        {/* 1. IMMERSIVE PHOTO ELEMENT */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/95">
                          <img
                            src={cachedActivePhotoReelUrl || activePhotoReel.photoUrl}
                            alt="photo reel display"
                            className="w-full h-full object-contain select-none max-h-screen"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* 2. LIGHTNING GRADIENT OVERLAYS */}
                        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/85 via-black/35 to-transparent pointer-events-none z-10" />
                        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />

                        {/* 3. TOP FLOATING STATUS BAR */}
                        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 text-white">
                          {/* Left: Indicator of photo progress */}
                          <span className="text-[11px] font-mono font-black bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full shadow select-none">
                            {activePhotoReelIndex + 1} / {photoReelsList.length}
                          </span>
                          
                          {/* Right heading */}
                          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full shadow select-none">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-[11.5px] font-black text-indigo-300 font-sans">ښکلي انځورونه (Swipe)</span>
                          </div>
                        </div>

                        {/* 4. CONTROL BUTTONS IN THE BOTTOM RIGHT CORNER */}
                        <div 
                          className="absolute bottom-24 right-5 sm:right-7 flex flex-col gap-4.5 z-25 items-center select-none" 
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Like / Heart Button (د انځور خوښول) */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(activePhotoReel.post.id);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="flex flex-col items-center group active:scale-90 transition"
                            title="خوښ بټن"
                          >
                            <div className={`w-11.5 h-11.5 rounded-full border flex items-center justify-center backdrop-blur-md transition-all shadow-xl ${
                              favoritePostIds.includes(activePhotoReel.post.id)
                                ? 'bg-rose-600/80 border-rose-500 scale-105'
                                : 'bg-black/60 border-white/10 hover:border-rose-500 hover:scale-105 hover:bg-black/80'
                            }`}>
                              <Heart className={`w-5 h-5 transition duration-250 ${
                                favoritePostIds.includes(activePhotoReel.post.id) 
                                  ? 'text-white fill-white scale-110' 
                                  : 'text-slate-100 group-hover:text-rose-500 group-hover:scale-110'
                              }`} />
                            </div>
                            <span className="text-[10px] text-slate-300 mt-1 font-bold shadow-md select-none pr-0.5">
                              {favoritePostIds.includes(activePhotoReel.post.id) ? 'خوښ شو' : 'خوښول'}
                            </span>
                          </button>

                          {/* Share button */}
                          <button 
                            onClick={handleSharePhotoReel}
                            style={{ cursor: 'pointer' }}
                            className="flex flex-col items-center group active:scale-90 transition"
                            title="شریکول"
                          >
                            <div className="w-11.5 h-11.5 rounded-full bg-black/60 border border-white/10 hover:border-indigo-400 hover:scale-105 flex items-center justify-center text-white backdrop-blur-md hover:bg-black/80 transition-all shadow-xl">
                              <Share2 className="w-5 h-5 text-slate-100 group-hover:text-indigo-400 group-hover:scale-110 transition duration-250" />
                            </div>
                            <span className="text-[10px] text-slate-300 mt-1 font-bold shadow-md select-none pr-0.5">شریک کړئ</span>
                          </button>

                          {/* Copy poetry text button */}
                          <button 
                            onClick={handleCopyPhotoReelText}
                            style={{ cursor: 'pointer' }}
                            className="flex flex-col items-center group active:scale-90 transition"
                            title="شعر کاپي کړه"
                          >
                            <div className="w-11.5 h-11.5 rounded-full bg-black/60 border border-white/10 hover:border-pink-400 hover:scale-105 flex items-center justify-center text-white backdrop-blur-md hover:bg-black/80 transition-all shadow-xl">
                              <Copy className="w-5 h-5 text-slate-100 group-hover:text-pink-400 group-hover:scale-110 transition duration-250" />
                            </div>
                            <span className="text-[10px] text-slate-300 mt-1 font-bold shadow-md select-none pr-0.5">کاپي کول</span>
                          </button>

                          {/* Desktop Up Indicator (Previous image) */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrevPhotoReel();
                            }}
                            style={{ cursor: 'pointer' }}
                            className="hidden sm:flex flex-col items-center group active:scale-95 transition"
                            title="مخکینی انځور"
                          >
                            <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 transition shadow">
                              <ChevronUp className="w-4.5 h-4.5 text-white animate-pulse" />
                            </div>
                          </button>

                          {/* Desktop Down Indicator (Next image) */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNextPhotoReel();
                            }}
                            style={{ cursor: 'pointer' }}
                            className="hidden sm:flex flex-col items-center group active:scale-95 transition"
                            title="بل انځور"
                          >
                            <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 transition shadow">
                              <ChevronDown className="w-4.5 h-4.5 text-white animate-pulse" />
                            </div>
                          </button>
                        </div>

                        {/* 5. BOTTOM POETRY OVERLAY CAPTION BLOCK */}
                        <div className="absolute bottom-6 right-24 sm:right-28 left-6 z-20 text-white select-text pointer-events-none text-right flex flex-col gap-2">
                          <div className="flex items-center gap-2 justify-end select-none pointer-events-none">
                            <span className="text-white text-[11px] font-black leading-tight drop-shadow font-sans">
                              پښتو ادبي خزانه
                            </span>
                            <div 
                              onClick={() => {
                                if (storiesList.length > 0) {
                                  setActiveStoryIndex(0);
                                  setIsStoryViewerOpen(true);
                                }
                              }}
                              style={{ cursor: storiesList.length > 0 ? 'pointer' : 'default' }}
                              className={`pointer-events-auto shrink-0 transition-all duration-300 ${
                                storiesList.length > 0 
                                  ? 'p-[2px] bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 rounded-full animate-pulse-slow active:scale-95 shadow-[0_0_12px_rgba(236,72,153,0.55)]' 
                                  : 'w-6.5 h-6.5 rounded-full border border-white/20 shadow-md overflow-hidden'
                              }`}
                              title={storiesList.length > 0 ? "پښتو ادبي خزانه سټوري وګورئ" : ""}
                            >
                              <div className={`rounded-full overflow-hidden ${storiesList.length > 0 ? 'w-5.5 h-5.5' : 'w-full h-full'}`}>
                                <img 
                                  src={feedData?.channelInfo?.avatarUrl || "https://t.me/i/userpic/320/obaidapp.jpg"} 
                                  alt="avatar" 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Poetry text message body */}
                          <div className="pointer-events-auto mt-1 pr-1 text-right flex flex-col gap-0.5" style={{ direction: 'rtl' }}>
                            <p className="text-white text-[12.5px] sm:text-[13.5px] leading-relaxed drop-shadow font-sans font-semibold break-words text-right line-clamp-2 select-text whitespace-pre-line">
                              {activePhotoReel.post.text || 'پښتو شعر د کتنې لپاره...'}
                            </p>
                            {(activePhotoReel.post.text && (activePhotoReel.post.text.length > 50 || activePhotoReel.post.text.includes('\n'))) ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOverlayActiveText(activePhotoReel.post.text);
                                  markPostAsRead(activePhotoReel.post.id);
                                }}
                                className="bg-black/45 hover:bg-black/65 px-2.5 py-0.5 rounded-lg text-[10.5px] font-black text-indigo-300 hover:text-indigo-200 text-right cursor-pointer self-start select-none w-max border border-white/10 shadow-md mt-1 transition pointer-events-auto"
                              >
                                نور ولولئ
                              </button>
                            ) : null}
                          </div>

                          {/* Views count and date indicator */}
                          <div className="flex items-center gap-3 justify-end text-[9px] text-slate-350 pointer-events-none select-none drop-shadow mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                              {activePhotoReel.post.timeLabel || 'وروستی'}
                            </span>
                            <span className="flex items-center gap-1 font-mono">
                              <Eye className="w-3.5 h-3.5 text-indigo-400" />
                              {activePhotoReel.post.views || '0'} كتنې
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : isSearchOpen ? (
          /* ==========================================================
             G. INTEGRATED DEWA SEARCH SCREEN (د شعرونو د پلټنې ځانګړې صفحه)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right">
            <div className={`p-5 sm:p-6 rounded-3xl ${cardBg} border border-slate-500/10 dark:border-slate-800 overflow-hidden shadow-xl text-right`}>
              
              {/* Header inside card */}
              <div className={`px-5 py-4 ${isDark ? 'bg-slate-950/70 border-slate-800/20' : 'bg-slate-100/90 border-slate-200'} border-b flex items-center justify-between rounded-t-3xl -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5`}>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  style={{ cursor: 'pointer' }}
                  className={`px-3 py-1.5 rounded-lg transition text-xs font-bold ${isDark ? 'text-slate-400 bg-slate-800 hover:text-white' : 'text-slate-700 bg-slate-200 hover:bg-slate-300'} flex items-center gap-1 shrink-0`}
                  title="شاته"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>کورپاڼه</span>
                </button>
                <div className="flex items-center gap-2">
                  <Search className={`w-4 h-4 ${tc.text}`} />
                  <span className={`text-[12px] sm:text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    په شعرونو او پوسټونو کې پلټنه
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5 text-right">
                <h4 className={`text-sm font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  د شعرونو او پيغامونو چټک لټون
                </h4>
                <p className={`text-xs ${textMuted} leading-relaxed`}>
                  خپله خوښه کلمه، شاعر، موضوع یا برخه دلته ولیکئ تر څو اړونده ټول شعرونه او پیغامونه په اوتومات ډول وموندل شي.
                </p>
              </div>

              {/* Main Search Input field inside the dedicated search page */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="د لټون لپاره څه ولیکئ (مثلا: هیواد، مینه، باران)..."
                  autoFocus
                  className={`w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-3.5 pr-10 pl-4 text-xs font-bold outline-none transition duration-200 text-right font-sans ${isDark ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600' : 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400'}`}
                />
                <Search className="absolute right-3.5 top-4 w-4 h-4 text-slate-500 pointer-events-none animate-pulse" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ cursor: 'pointer' }}
                    className={`absolute left-3 top-2.5 text-[10px] font-bold px-2.5 py-1.5 rounded transition ${isDark ? 'bg-slate-800 hover:bg-slate-755 text-slate-300' : 'bg-slate-200 hover:bg-slate-300'}`}
                  >
                    پاکول
                  </button>
                )}
              </div>

              {/* Quick Hashtag Suggestions */}
              {!searchQuery && (
                <div className="space-y-3 mb-6 animate-fade-in text-right">
                  <span className="text-[11px] font-black text-slate-450 block font-sans">عام لټونونه او په زړه پورې هشټاګونه:</span>
                  <div className="flex flex-wrap gap-2 justify-start md:justify-end" style={{ direction: 'rtl' }}>
                    {hashtagsWithCount.slice(0, 10).map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(item.tag)}
                        style={{ cursor: 'pointer' }}
                        className={`text-[11.5px] px-3.5 py-2 rounded-xl transition font-bold select-none border whitespace-nowrap active:scale-95 ${
                          isDark 
                            ? 'bg-slate-900/40 border-slate-850 hover:bg-indigo-950/40 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300' 
                            : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-indigo-400 hover:shadow-xs text-slate-700'
                        }`}
                      >
                        {item.tag} <span className="text-[9.5px] opacity-60">({item.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Display list of search results */}
              {searchQuery && (
                <div className="space-y-4 animate-fade-in text-right">
                  <div className={`p-3 rounded-xl flex items-center justify-between text-xs font-bold leading-normal ${isDark ? 'bg-indigo-950/20 text-indigo-300 border border-indigo-900/20' : 'bg-indigo-50 text-indigo-700 border border-indigo-100/50'}`} style={{ direction: 'rtl' }}>
                    <span>د "{searchQuery}" لپاره پايلې:</span>
                    <span>{filteredHomePosts.length} پېغامونه وموندل شول</span>
                  </div>

                  {filteredHomePosts.length === 0 ? (
                    <div className="text-center py-16 px-4 rounded-3xl bg-slate-500/5 border border-dashed border-slate-500/10">
                      <Search className="w-12 h-12 text-slate-400 mx-auto opacity-30 mb-3" />
                      <p className={`text-xs ${textMuted} font-black`}>
                        بښنه غواړو، ستاسو د لټون اړوند هیڅ پوسټ پیدا نه شو.
                      </p>
                      <p className={`text-[11px] ${textMuted} mt-1`}>
                        بله بېله کلمه واستوئ یا نور هشټاګونه امتحان کړئ.
                      </p>
                    </div>
                  ) : (
                    /* Search results posts list */
                    <div className="flex flex-col gap-3">
                      {filteredHomePosts.slice(0, 40).map((post) => {
                        const isRead = readPostIds.includes(post.id);
                        return (
                          <div
                            key={post.id}
                            onClick={() => {
                              const currentScroll = window.scrollY || document.documentElement.scrollTop;
                              if (currentScroll > 0) {
                                detailScrollPosRef.current = currentScroll;
                              }
                              setSelectedPost(post);
                            }}
                            style={{ cursor: 'pointer' }}
                            className={`${isDark ? 'bg-slate-950/40 border-slate-900 hover:bg-slate-900/60' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-xs'} border p-3.5 rounded-xl flex items-center gap-3.5 transition group select-none text-right ${isRead ? 'opacity-55 saturate-[0.65] dark:opacity-45 hover:opacity-100 dark:hover:opacity-100' : ''}`}
                          >
                            {/* Right side teaser */}
                            {(post.photoUrl || post.videoThumbUrl || post.hasVideo) && (
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                                <img
                                  src={post.photoUrl || post.videoThumbUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&auto=format&fit=crop&q=80"}
                                  alt="Search item cover"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                                {post.hasVideo && (
                                  <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                                    <Play className="w-4 h-4 text-indigo-400" />
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Center-Left information */}
                            <div className="flex-grow min-w-0 text-right">
                              <span className="text-[9.5px] text-slate-500 block font-sans mb-1">
                                {getRelativeTimeInPashto(post.date, post.timeLabel || 'Recent')}
                              </span>
                              <p className={`text-xs font-bold leading-relaxed line-clamp-2 ${isDark ? 'text-slate-250' : 'text-slate-750'}`}>
                                {post.text ? post.text.slice(0, 150) + '...' : 'پوسټ پايلې'}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        ) : isNovelsPageOpen ? (
          /* ==========================================================
             D2. NOVELS & STORIES CHANNEL BROWSER (د پښتو کیسو او ناولونو برخه - انلاین مجله)
             ========================================================== */
          <div className="space-y-6 animate-fade-in text-right">
            <div className={`p-4 sm:p-5 rounded-3xl ${cardBg} border-0 shadow-lg text-right relative overflow-hidden backdrop-blur-md`}>
              
              {/* Header inside card */}
              <div className={`px-4.5 py-3.5 ${isDark ? 'bg-slate-900/60' : 'bg-slate-50/80'} border-0 flex items-center justify-between rounded-2xl mb-7 shadow-xs`}>
                <button
                  onClick={() => setIsNovelsPageOpen(false)}
                  style={{ cursor: 'pointer' }}
                  className={`px-3.5 py-1.8 rounded-xl transition-all duration-250 text-xs font-black ${isDark ? 'text-slate-200 bg-slate-800/80 hover:bg-slate-750' : 'text-slate-700 bg-white hover:bg-slate-100'} flex items-center gap-1.5 shrink-0 shadow-sm`}
                  title="شاته"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>شا ته لاسرسی</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-xs sm:text-[13px] font-black ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    د کیسو او ناولونو مډرن بايسکل
                  </span>
                  <div className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* CONTENT MODULES CONTROLLER */}
              {isNovelsLoading && !novelsFeedData ? (
                /* LOADING SHIMMER SKEL */
                <div className="space-y-4 py-12 text-center flex flex-col items-center justify-center auto-fade-in">
                  <div className="w-10 h-10 rounded-full border-4 border-violet-550 border-t-transparent animate-spin mb-2" />
                  <p className="text-xs text-slate-400 font-bold font-sans">د پښتو کیسو او رومانټیکو ناولونو غوړ او رنګین ارشيف پورته کېږي...</p>
                </div>
              ) : novelsErrorMsg ? (
                /* ERROR HANDLING FRAME */
                <div className="p-6 text-center border border-dashed border-red-500/20 bg-red-500/5 rounded-2xl flex flex-col items-center justify-center gap-3">
                  <AlertCircle className="w-8 h-8 text-red-400 animate-bounce" />
                  <p className="text-xs text-slate-300 font-bold leading-relaxed">{novelsErrorMsg}</p>
                  <button
                    onClick={() => fetchNovelsChannelData(true)}
                    style={{ cursor: 'pointer' }}
                    className="mt-2 px-4 py-1.5 bg-violet-600 hover:bg-violet-550 text-white font-sans text-xs font-bold rounded-lg transition"
                  >
                    بیاځلي هڅه وکړئ (Retry)
                  </button>
                </div>
              ) : (() => {
                // Deconstruct our 4 core arrays directly from live feed data
                const audioStories = filterNovelsPosts(false, true);
                const audioNovels = filterNovelsPosts(true, true);
                const writtenStories = filterNovelsPosts(false, false);
                const writtenNovels = filterNovelsPosts(true, false);

                const totalResolvedCount = audioStories.length + audioNovels.length + writtenStories.length + writtenNovels.length;

                // Simple helper to render a horizontal scrolling list section with gorgeous compact card layout
                const renderHorizontalCarouselSection = (
                  titlePashto: string,
                  subtitlePashto: string,
                  postsList: any[],
                  styleType: 'story' | 'novel',
                  accentGradient: string,
                  iconComponent: React.ReactNode
                ) => {
                  return (
                    <div className="space-y-4 mb-8 pb-3 text-right font-sans" style={{ direction: 'rtl' }}>
                      {/* Section Title with luxury badgified icon and counter */}
                      <div className="flex flex-row-reverse items-center justify-between text-right px-2 pb-1.5 select-none">
                        <div className="flex flex-row-reverse items-center gap-3 text-right">
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${accentGradient} text-white shrink-0 shadow-md shadow-indigo-500/10`}>
                            {iconComponent}
                          </div>
                          <div className="flex flex-col items-start text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[8.5px] font-black tracking-wider ${
                              isDark 
                                ? 'bg-slate-900 text-indigo-400 border border-indigo-950/60' 
                                : 'bg-indigo-50 text-indigo-700 border border-indigo-100/60'
                            }`}>
                              {titlePashto === "غږیزې کیسې" ? "غږیز ادب 🔊" :
                               titlePashto === "غږیز ناولونه" ? "غږیز رومانونه 🎙️" :
                               titlePashto === "لیکلې کیسې" ? "قلمي داستانونه ✍️" :
                               "ادبي شهکارونه 📚"}
                            </span>
                            <h3 className={`text-sm sm:text-base font-sans font-black tracking-tight mt-1 ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              {titlePashto}
                            </h3>
                          </div>
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl transition-colors duration-200 ${
                          isDark 
                            ? 'bg-slate-900/95 text-indigo-400 border border-slate-800' 
                            : 'bg-indigo-50/60 text-indigo-700 border border-indigo-100/50'
                        } font-sans shadow-2xs`}>
                          {postsList.length} توکي
                        </span>
                      </div>

                      {/* Horizontal Scrolling wrapper */}
                      {postsList.length === 0 ? (
                        <div className="py-8 text-center border border-dashed border-slate-500/10 rounded-2xl flex flex-col items-center justify-center bg-black/10 dark:bg-black/20">
                          <BookOpen className="w-5 h-5 text-slate-600 opacity-40 mb-1" />
                          <p className="text-[10px] text-slate-500 font-bold font-sans">تر اوسه په دې برخه کې هیڅ کیسه یا ناول نشته.</p>
                        </div>
                      ) : (
                        <div className="flex flex-row-reverse gap-3.5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none">
                          {postsList.map((post) => {
                            const isRead = readPostIds.includes(post.id);
                            
                            const coverImg = post.photoUrl || (
                              styleType === 'story' 
                                ? "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&auto=format&fit=crop&q=80"
                                : "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80"
                            );

                            // Clean tags out of text
                            const cleanText = post.text 
                              ? post.text.replace(/#کیسه|#ناول|#داستان|#کیسې|#رومان|#غږیز|#صوتي|#کتاب|#داستانونه/g, '').trim()
                              : 'بې سرلیکه اثر';

                            // Determine if post has audio
                            const isAudioType = post.hasAudio || post.audioUrl || (post.audioList && post.audioList.length > 0);
                            const typeLabel = styleType === 'novel' ? 'ناول' : 'کیسه';
                            const typeIcon = isAudioType 
                              ? <Volume2 className="w-2.5 h-2.5 text-pink-400" /> 
                              : <BookOpen className="w-2.5 h-2.5 text-emerald-400" />;

                            return (
                              <button
                                key={post.id}
                                onClick={() => {
                                  setSelectedPost(post);
                                  if (styleType === 'story') {
                                    updateNovelReadingProgress(post, 10);
                                  }
                                }}
                                style={{ cursor: 'pointer' }}
                                className={`w-[115px] sm:w-[135px] aspect-[2/3.1] shrink-0 snap-start rounded-2xl border-0 transition-all duration-350 relative overflow-hidden flex flex-col text-right hover:scale-[1.04] active:scale-[0.97] ${
                                  isDark 
                                    ? 'shadow-[0_8px_18px_rgba(0,0,0,0.55)] hover:shadow-violet-650/15' 
                                    : 'shadow-[0_8px_16px_rgba(99,102,241,0.06)] hover:shadow-[0_12px_24px_rgba(99,102,241,0.12)]'
                                } group`}
                              >
                                {/* Book Spine Overlay decoration (Elegant 3D curved wrapper) */}
                                <div className="absolute left-0 inset-y-0 w-2 sm:w-2.5 bg-gradient-to-r from-black/50 via-black/15 to-transparent z-15 pointer-events-none" />
                                <div className="absolute left-[0.8px] inset-y-0 w-[0.8px] bg-white/10 z-16 pointer-events-none" />

                                {/* Full cover image in the background */}
                                <img 
                                  src={coverImg} 
                                  alt="novel-cover" 
                                  referrerPolicy="no-referrer"
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105 group-hover:rotate-0.5"
                                />
                                
                                {/* Dark vignette gradients to protect text contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                                
                                {/* Top Floating Badge: Type and Icon */}
                                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-lg border border-white/5 text-white text-[7.5px] font-black shadow-xs z-11">
                                  {typeIcon}
                                  <span>{typeLabel}</span>
                                </div>

                                {/* Title/Name at the bottom */}
                                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 pb-2.5 line-clamp-2 text-right z-12 flex flex-col justify-end">
                                  <p className="text-[9.5px] sm:text-[10.5px] font-black leading-snug text-white font-sans line-clamp-2 drop-shadow-md">
                                    {cleanText}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                };

                return (
                  <div className="space-y-4">
                    {/* Continue Reading and Liked Collection items definition */}
                    {(() => {
                      const likedNovelsAndStories = [...audioStories, ...audioNovels, ...writtenStories, ...writtenNovels].filter(post => 
                        favoritePostIds.includes(post.id)
                      );

                      return (
                        <>
                          {/* د مطالعې ادامه (Continue Reading) Section */}
                          {novelReadingProgressList.length > 0 && (
                            <div className="space-y-4 mb-8 pb-3 text-right font-sans border-b border-dashed border-slate-500/10" style={{ direction: 'rtl' }}>
                              <div className="flex flex-row-reverse items-center justify-between text-right px-2 pb-1.5 select-none">
                                <div className="flex flex-row-reverse items-center gap-3 text-right">
                                  <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-650 to-indigo-700 text-white shrink-0 shadow-md shadow-indigo-500/10">
                                    <History className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="flex flex-col items-start text-right">
                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[8.5px] font-black tracking-wider ${
                                      isDark 
                                        ? 'bg-slate-900 text-indigo-400 border border-indigo-950/60' 
                                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100/60'
                                    }`}>
                                      د منځپانګې بیا میشتیدنه 📖
                                    </span>
                                    <h3 className={`text-xs sm:text-sm font-sans font-black tracking-tight mt-1 ${
                                      isDark ? 'text-white' : 'text-slate-900'
                                    }`}>
                                      د مطالعې ادامه (لوستلو نښه)
                                    </h3>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-row-reverse gap-3.5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none">
                                {novelReadingProgressList.map((item) => {
                                  const post = item.post;
                                  const coverImg = post.photoUrl || (
                                    post.text?.includes('#ناول')
                                      ? "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80"
                                      : "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&auto=format&fit=crop&q=80"
                                  );

                                  return (
                                    <div
                                      key={item.id}
                                      onClick={() => resumeReadingItem(item)}
                                      style={{ cursor: 'pointer' }}
                                      className={`w-[130px] sm:w-[150px] shrink-0 snap-start rounded-2xl p-2.5 border transition-all duration-300 relative overflow-hidden flex flex-col text-right hover:scale-[1.03] active:scale-[0.98] ${
                                        isDark 
                                          ? 'bg-slate-905/70 border-slate-805/75 text-white hover:border-indigo-550/30' 
                                          : 'bg-white border-slate-200 text-slate-900 hover:border-indigo-550/30 shadow-xs'
                                      } group`}
                                    >
                                      <button
                                        onClick={(e) => removeReadingProgress(e, item.id)}
                                        style={{ cursor: 'pointer' }}
                                        className="absolute top-1.5 left-1.5 p-1 rounded-lg bg-black/65 backdrop-blur-md text-slate-300 hover:text-red-400 border border-white/5 z-15 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="لرې کول"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>

                                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative mb-2 shadow-inner">
                                        <img 
                                          src={coverImg} 
                                          alt="cover" 
                                          referrerPolicy="no-referrer"
                                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                        
                                        <span className="absolute bottom-1 right-1.5 text-[8px] font-black bg-indigo-600/95 text-white px-1.5 py-0.5 rounded-md">
                                          {item.progress}% لوستل شوی
                                        </span>
                                      </div>

                                      <span className={`text-[8px] font-black tracking-wider uppercase mb-0.5 block ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                        {item.parentPost ? "څپرکی / غاړه" : "بشپړ اثر"}
                                      </span>
                                      <h4 className={`text-[10.5px] sm:text-[11px] font-black line-clamp-1 mb-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                                        {item.title}
                                      </h4>

                                      <div className={`w-full h-1.5 ${isDark ? 'bg-slate-900' : 'bg-slate-100'} rounded-full overflow-hidden relative shadow-inner mt-auto`}>
                                        <div 
                                          className="absolute inset-y-0 right-0 bg-gradient-to-l from-indigo-500 to-pink-500 h-full rounded-full transition-all duration-150"
                                          style={{ width: `${item.progress}%` }}
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* زما خوښ شوي اثار (Liked Collection) */}
                          {(likedNovelsAndStories.length > 0 || likedChaptersList.length > 0) && (
                            <div className="space-y-4 mb-8 pb-3 text-right font-sans border-b border-dashed border-slate-500/10" style={{ direction: 'rtl' }}>
                              <div className="flex flex-row-reverse items-center justify-between text-right px-2 pb-1.5 select-none">
                                <div className="flex flex-row-reverse items-center gap-3 text-right">
                                  <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 via-rose-600 to-pink-650 text-white shrink-0 shadow-md shadow-rose-500/10">
                                    <Heart className="w-3.5 h-3.5 fill-rose-500 animate-pulse text-white" />
                                  </div>
                                  <div className="flex flex-col items-start text-right">
                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[8.5px] font-black tracking-wider ${
                                      isDark 
                                        ? 'bg-slate-900 text-rose-400 border border-rose-950/60' 
                                        : 'bg-rose-50 text-rose-700 border border-rose-100/60'
                                    }`}>
                                      ستاسو د خوښې رومانونه او داستانونه 💖
                                    </span>
                                    <h3 className={`text-xs sm:text-sm font-sans font-black tracking-tight mt-1 ${
                                      isDark ? 'text-white' : 'text-slate-900'
                                    }`}>
                                      زما خوښ شوي اثار
                                    </h3>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-row-reverse gap-3.5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none">
                                {/* 1. Loved stories & novels */}
                                {likedNovelsAndStories.map((post) => {
                                  const coverImg = post.photoUrl || (
                                    post.text?.includes('#ناول')
                                      ? "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80"
                                      : "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&auto=format&fit=crop&q=80"
                                  );
                                  const cleanText = post.text 
                                    ? post.text.replace(/#کیسه|#ناول|#داستان|#کیسې|#رومان|#غږیز|#صوتي|#کتاب|#داستانونه/g, '').trim()
                                    : 'بې سرلیکه اثر';

                                  return (
                                    <div
                                      key={post.id}
                                      onClick={() => setSelectedPost(post)}
                                      style={{ cursor: 'pointer' }}
                                      className={`w-[115px] sm:w-[135px] aspect-[2/3.1] shrink-0 snap-start rounded-2xl border-0 transition-all duration-350 relative overflow-hidden flex flex-col text-right hover:scale-[1.04] active:scale-[0.97] ${
                                        isDark 
                                          ? 'shadow-[0_8px_18px_rgba(0,0,0,0.55)] hover:shadow-rose-650/15' 
                                          : 'shadow-[0_8px_16px_rgba(244,63,94,0.06)] hover:shadow-[0_12px_24px_rgba(244,63,94,0.12)]'
                                      } group`}
                                    >
                                      <div className="absolute left-0 inset-y-0 w-2 sm:w-2.5 bg-gradient-to-r from-black/50 via-black/15 to-transparent z-15 pointer-events-none" />
                                      <img 
                                        src={coverImg} 
                                        alt="liked-cover" 
                                        referrerPolicy="no-referrer"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                                      
                                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-rose-600/90 backdrop-blur-md px-1.5 py-0.5 rounded-lg text-white text-[7px] font-black shadow-xs z-11">
                                        <Heart className="w-2 h-2 fill-white text-white" />
                                        <span>خوښ شوی اثار</span>
                                      </div>

                                      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 pb-2.5 text-right z-12">
                                        <p className="text-[9.5px] sm:text-[10.5px] font-black leading-snug text-white font-sans line-clamp-2">
                                          {cleanText}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* 2. Loved chapters */}
                                {likedChaptersList.map((item) => {
                                  const post = item.post;
                                  const coverImg = post.photoUrl || item.parentPost?.photoUrl || (
                                    post.text?.includes('#ناول')
                                      ? "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80"
                                      : "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&auto=format&fit=crop&q=80"
                                  );

                                  return (
                                    <div
                                      key={item.id}
                                      onClick={() => {
                                        if (item.parentPost) {
                                          setSelectedPost(item.parentPost);
                                          setActiveNovelTextChapter(item.post);
                                        } else {
                                          setActiveNovelTextChapter(item.post);
                                        }
                                      }}
                                      style={{ cursor: 'pointer' }}
                                      className={`w-[115px] sm:w-[135px] aspect-[2/3.1] shrink-0 snap-start rounded-2xl border-0 transition-all duration-350 relative overflow-hidden flex flex-col text-right hover:scale-[1.04] active:scale-[0.97] ${
                                        isDark 
                                          ? 'shadow-[0_8px_18px_rgba(0,0,0,0.55)] hover:shadow-cyan-650/15' 
                                          : 'shadow-[0_8px_16px_rgba(6,182,212,0.06)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.12)]'
                                      } group`}
                                    >
                                      <div className="absolute left-0 inset-y-0 w-2 sm:w-2.5 bg-gradient-to-r from-black/50 via-black/15 to-transparent z-15 pointer-events-none" />
                                      <img 
                                        src={coverImg} 
                                        alt="liked-chapter-cover" 
                                        referrerPolicy="no-referrer"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                                      
                                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-cyan-600/95 backdrop-blur-md px-1.5 py-0.5 rounded-lg text-white text-[7px] font-black shadow-xs z-11">
                                        <Heart className="w-2 h-2 fill-white text-white" />
                                        <span>خوښ شوی پورشن</span>
                                      </div>

                                      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 pb-2.5 text-right z-12">
                                        <span className="text-[7.5px] font-black tracking-wider text-cyan-300 block mb-0.5 uppercase line-clamp-1">
                                          {item.parentPost?.text?.split('\n')[0]?.replace(/#[^\s]+/g, '').trim().substring(0, 16) || 'رومان'}
                                        </span>
                                        <p className="text-[9.5px] sm:text-[10.5px] font-black leading-snug text-white font-sans line-clamp-2">
                                          {item.title}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}

                    {/* Horizontal 4 Lists */}
                    {renderHorizontalCarouselSection(
                      "غږیزې کیسې",
                      "",
                      audioStories,
                      'story',
                      'from-violet-600 to-indigo-605',
                      <Volume2 className="w-3.5 h-3.5" />
                    )}

                    {renderHorizontalCarouselSection(
                      "غږیز ناولونه",
                      "",
                      audioNovels,
                      'novel',
                      'from-purple-650 to-pink-655',
                      <Volume2 className="w-3.5 h-3.5" />
                    )}

                    {renderHorizontalCarouselSection(
                      "لیکلې کیسې",
                      "",
                      writtenStories,
                      'story',
                      'from-emerald-600 to-teal-605',
                      <BookOpen className="w-3.5 h-3.5" />
                    )}

                    {renderHorizontalCarouselSection(
                      "لیکلي ناولونه",
                      "",
                      writtenNovels,
                      'novel',
                      'from-amber-500 to-orange-655',
                      <BookOpen className="w-3.5 h-3.5" />
                    )}
                  </div>
                );
              })()}

            </div>
          </div>
        ) : isCategoryPageOpen ? (
          /* ==========================================================
             C2. CATEGORY HASHTAGS BROWSER (د شعرونو موضوعي ډلبندي)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right select-none">
            <div className={`p-5 sm:p-6 rounded-3xl ${cardBg} border border-slate-500/10 dark:border-slate-800 overflow-hidden shadow-xl text-right`}>
              
              {/* Header inside card */}
              <div className={`px-5 py-4 ${isDark ? 'bg-slate-950/70 border-slate-800/20' : 'bg-slate-100/90 border-slate-200'} border-b flex items-center justify-between rounded-t-3xl -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5`}>
                <button
                  onClick={() => setIsCategoryPageOpen(false)}
                  style={{ cursor: 'pointer' }}
                  className={`px-3 py-1.5 rounded-lg transition text-xs font-bold ${isDark ? 'text-slate-400 bg-slate-800 hover:text-white' : 'text-slate-700 bg-slate-200 hover:bg-slate-300'} flex items-center gap-1 shrink-0`}
                  title="شاته"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>کورپاڼه</span>
                </button>
                <div className="flex items-center gap-2">
                  <Hash className={`w-4 h-4 ${tc.text}`} />
                  <span className={`text-[12px] sm:text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    کټګوري او هشټاګونه
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5 text-right">
                <h4 className={`text-sm font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  د پښتو شعرونو موضوعي ډلبندي
                </h4>
                <p className={`text-xs ${textMuted} leading-relaxed`}>
                  د اسانتیا لپاره، لاندې د ټولو شعرونو او پوسټونو څخه ترلاسه شوي هشټاګونه لیست شوي دي. په نښه شوي موضوع باندې کلیک کولو سره به هماغه موضوع اړوند ټول شعرونه نندارې ته وړاندې شي.
                </p>
              </div>

              {/* Instant Search Bar for Hashtags */}
              <div className="relative mb-5">
                <input
                  type="text"
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                  placeholder="دلته اړونده موضوع یا هشټاګ پیدا کړئ (مثلا: #مینه)..."
                  className={`w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-3 pr-10 pl-4 text-xs font-medium outline-none transition duration-200 text-right font-sans ${isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
                />
                <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                {categorySearchQuery && (
                  <button
                    onClick={() => setCategorySearchQuery('')}
                    style={{ cursor: 'pointer' }}
                    className={`absolute left-3 top-2 text-[10px] font-bold px-2.5 py-1.5 rounded transition ${isDark ? 'bg-slate-800 hover:bg-slate-755 text-slate-300' : 'bg-slate-200 hover:bg-slate-300'}`}
                  >
                    بیا پیل
                  </button>
                )}
              </div>

              {/* Hashtags Grid */}
              {(() => {
                const filteredTags = hashtagsWithCount.filter(item => 
                  item.tag.toLowerCase().includes(categorySearchQuery.toLowerCase())
                );

                if (filteredTags.length === 0) {
                  return (
                    <div className="text-center py-10 px-4 rounded-2xl bg-slate-500/5 border border-dashed border-slate-500/10">
                      <Hash className="w-10 h-10 text-slate-400 mx-auto opacity-40 mb-3" />
                      <p className={`text-xs ${textMuted} font-semibold`}>
                        {categorySearchQuery ? 'هیڅ کټګوري یا هشټاګ پیدا نه شو!' : 'لا تر اوسه هیڅ یو هشټاګ نه دی ترلاسه شوی.'}
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" style={{ direction: 'rtl' }}>
                    {filteredTags.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSearchQuery(item.tag);
                          setIsCategoryPageOpen(false);
                          setIsSearchOpen(true);
                        }}
                        style={{ cursor: 'pointer' }}
                        className={`flex items-center justify-between gap-2.5 p-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-right select-none group ${
                          isDark 
                            ? 'bg-slate-900/30 border-slate-800/60 hover:bg-slate-900/80 hover:border-violet-500/40 text-slate-200' 
                            : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-violet-400 hover:shadow-md text-slate-800'
                        }`}
                      >
                        {/* Count Pill */}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDark 
                            ? 'bg-violet-950/40 text-violet-300 border border-violet-900/20 group-hover:bg-violet-900/40' 
                            : 'bg-violet-50 text-violet-600 border border-violet-100 group-hover:bg-violet-100/55'
                        }`}>
                          {item.count}
                        </span>

                        {/* Hashtag label */}
                        <span className="text-xs font-bold font-sans text-right truncate flex-1 leading-normal select-none">
                          {item.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}

            </div>
          </div>
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
                  <div className={`w-full h-full rounded-full bg-gradient-to-tr ${tc.gradient} flex items-center justify-center overflow-hidden`}>
                    {devPost?.photoUrl ? (
                      <img 
                        src={devPost.photoUrl} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                        alt="Profile Photo" 
                      />
                    ) : feedData?.channelInfo?.avatarUrl ? (
                      <img 
                        src={feedData.channelInfo.avatarUrl} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                        alt="Channel Avatar" 
                      />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                </div>
                <div className="relative z-10 w-full font-sans">
                  <h3 className="text-base font-black text-white tracking-tight">عبیدالله غفاري (Obaidullah Ghaffari)</h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">د علم، مطالعې او ټکنالوژۍ مینهوال</p>
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
                  {devPost ? (
                    <div className="text-right leading-[1.8]">
                      {devPost.htmlText ? (
                        <div 
                          className={`text-[11.5px] ${isDark ? 'text-slate-300' : 'text-slate-700'} whitespace-pre-wrap`}
                          dangerouslySetInnerHTML={{ __html: makeHtmlHashtagsClickable(devPost.htmlText.replace(/#dev/gi, '').trim()) }}
                        />
                      ) : (
                        <BeautifulTelegramText 
                          text={devPost.text.replace(/#dev/gi, '').trim()} 
                          isDark={isDark}
                          fs={fs}
                          showExpander={false}
                          limitLines={100}
                        />
                      )}
                    </div>
                  ) : (
                    <>
                      <p className={`text-[11.5px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-[1.8]`}>
                        زه <strong>عبیدالله غفاري</strong> یم، د علم، مطالعې او ټکنالوژۍ مینهوال. زما هڅه دا ده چې د اسلامي ارزښتونو، ګټورو معلوماتو او مثبتو افکارو د خپرولو لپاره له عصري وسایلو او ټکنالوژۍ څخه ګټه واخلم.
                      </p>
                      <p className={`text-[11.5px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-[1.8]`}>
                        ځان د ټول عمر زده کوونکی ګڼم او باور لرم چې علم د انسان د پرمختګ او نېکمرغۍ تر ټولو ستره وسیله ده. له دیني زده کړو سره سره د کمپیوټر، ویبپاڼو، مصنوعي ځیرکتیا (AI)، لیکوالۍ او ډیجیټلي نړۍ په اړه هم زده کړې او تجربې ترلاسه کوم.
                      </p>
                    </>
                  )}
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
                    مطالعه، لیکوالي، د نوو مهارتونو زده کړه، د ګټورو پروژو جوړول او د وخت اغېزمنه ګټه اخیستنه زما له خوښیو څخه دي.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : isContactPageOpen ? (
          /* ==========================================================
             E. CONTACT US SCREEN (اړیکه او د پیغامونو لیږل)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right">
            <div className={`p-5 sm:p-6 rounded-3xl ${cardBg} border border-slate-500/10 dark:border-slate-800 overflow-hidden shadow-xl text-right`}>
              <div className={`px-5 py-4 ${isDark ? 'bg-slate-950/70 border-slate-800/20' : 'bg-slate-100/90 border-slate-205'} border-b flex items-center justify-between rounded-t-3xl -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5`}>
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
                    رابطه او د پیغام لیږل
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
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-xs text-rose-400 leading-relaxed font-sans">
                      <p>{contactError}</p>
                    </div>
                  )}

                  <div className="space-y-3 font-sans">
                    <input
                      type="text"
                      placeholder="ستاسو محترم نوم"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className={`w-full ${isDark ? 'bg-slate-950/60 border-slate-800 text-slate-100' : 'bg-white border-slate-205 text-slate-900'} border rounded-xl px-4 py-3 text-xs text-right outline-none`}
                    />

                    <textarea
                      placeholder="خپل پیغام یا رغنده نیوکه دلته ولیکئ..."
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      rows={5}
                      className={`w-full ${isDark ? 'bg-slate-950/60 border-slate-800 text-slate-100' : 'bg-white border-slate-205 text-slate-900'} border rounded-2xl px-4 py-3 text-xs text-right outline-none`}
                    />

                    <button
                      onClick={handleSendTelegramContact}
                      disabled={contactSending}
                      style={{ cursor: 'pointer' }}
                      className={`w-full py-3 ${tc.bg} ${tc.hoverBg} text-white font-black rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50`}
                    >
                      {contactSending ? (
                        <span>د لیږلو په حال کې...</span>
                      ) : (
                        <>
                          <span>پیغام لیږل</span>
                          <Send className="w-3.5 h-3.5 rotate-180" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : isSettingsPageOpen ? (
          /* ==========================================================
             D3. SETTINGS SCREEN (د اپلیکیشن تنظیمات)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right">
            <div className={`p-5 sm:p-6 rounded-3xl ${cardBg} border border-slate-500/10 dark:border-slate-800 overflow-hidden shadow-xl text-right`}>
              <div className={`px-5 py-4 ${isDark ? 'bg-slate-950/70 border-slate-800/20' : 'bg-slate-100/90 border-slate-205'} border-b flex items-center justify-between rounded-t-3xl -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5`}>
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
                  <Settings className={`w-4 h-4 ${tc.text}`} />
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    تنظیمات او اسانتیاوې
                  </span>
                </div>
              </div>

              {/* Main settings body layout */}
              <div className="space-y-6 text-right font-sans">
                
                {/* 1. HOME LAYOUTS */}
                <div className="space-y-2.5">
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-707'} font-bold flex items-center justify-start gap-1 px-1`}>
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
                            : `${isDark ? 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-805' : 'bg-slate-100 border-slate-205 text-slate-707 hover:bg-slate-150'}`
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
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-707'} font-bold flex items-center justify-start gap-1 px-1`}>
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
                          : 'bg-slate-100 border-slate-205 text-slate-707 hover:bg-slate-150'
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
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-707'} font-bold flex items-center justify-start gap-1 px-1`}>
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
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition active:scale-95 shadow-md ${
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
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-707'} font-bold flex items-center justify-start gap-1 px-1`}>
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
                            : `${isDark ? 'bg-slate-950/60 border-slate-855 text-slate-305 hover:bg-slate-850' : 'bg-slate-100 border-slate-205 text-slate-707 hover:bg-slate-150'}`
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

              </div>
            </div>
          </div>
        ) : !isFullFeedOpen ? (
          /* ==========================================================
             F. HOME MAIN SCREEN (کورپاڼه)
             ========================================================== */
          <div className="space-y-5 animate-fade-in">
            {/* 0. STORIES HORIZONTAL SYSTEM TRAY (سټوري برخه د رنګیني حلقې او ځانګړو پیغامونو سره) */}
            {storiesList.length > 0 && (
              <div className="relative p-1 bg-slate-500/5 dark:bg-slate-900/10 rounded-2xl border border-slate-500/10" style={{ direction: 'rtl' }}>
                <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-500/5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
                    <span className={`text-[12px] font-black ${isDark ? 'text-white' : 'text-slate-950'} font-sans`}>
                      تازه سټورياني (Stories)
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold">د کتنې لپاره باندې کلیک وباسئ</span>
                </div>
                
                <div className="flex gap-5 items-center overflow-x-auto scrollbar-none py-3.5 px-4 justify-start">
                  {/* Dynamic story avatar for the whole app stories */}
                  <div 
                    onClick={() => {
                      setActiveStoryIndex(0);
                      setIsStoryViewerOpen(true);
                    }}
                    style={{ cursor: 'pointer' }}
                    className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 select-none group relative"
                  >
                    {/* Ring like story around app icon */}
                    <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 animate-pulse-slow shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300">
                      <div className={`w-13.5 h-13.5 rounded-full ${isDark ? 'bg-slate-950' : 'bg-white'} flex items-center justify-center p-1`}>
                        <div className={`w-full h-full rounded-full bg-gradient-to-br ${tc.gradient} flex items-center justify-center shadow-inner`}>
                          <Feather className="w-6.5 h-6.5 text-white transform -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition duration-300" />
                        </div>
                      </div>
                      <span className="absolute -bottom-1 -left-1 bg-pink-500 text-white rounded-full px-1.5 py-0.5 border border-slate-950 text-[7px] font-black pointer-events-none tracking-widest animate-pulse">سټوري</span>
                    </div>
                    <span className={`text-[10px] font-black ${isDark ? 'text-slate-200' : 'text-slate-800'} font-sans mt-0.5`}>د مېنې ډېوه</span>
                  </div>

                  {/* Individual stories listing */}
                  {storiesList.slice(0, 10).map((stPost, stIdx) => {
                    const thumb = stPost.photoUrl || (stPost.photoUrls && stPost.photoUrls[1] ? stPost.photoUrls[1] : (stPost.photoUrls && stPost.photoUrls[0] ? stPost.photoUrls[0] : null));
                    return (
                      <div
                        key={stPost.id}
                        onClick={() => {
                          setActiveStoryIndex(stIdx);
                          setIsStoryViewerOpen(true);
                        }}
                        style={{ cursor: 'pointer' }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 select-none group relative"
                      >
                        <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-rose-500 via-fuchsia-600 to-purple-600 shadow transform hover:scale-105 active:scale-95 transition duration-300">
                          <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-slate-900' : 'bg-white'} overflow-hidden p-0.5`}>
                            {thumb ? (
                              <img
                                src={thumb}
                                alt="thumb"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-slate-850 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-purple-400" />
                              </div>
                            )}
                          </div>
                        </div>
                        <span className={`text-[8.5px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'} font-sans truncate w-14 text-center mt-0.5`}>
                          {stPost.text ? stPost.text.replace(/#سټوري|#ستوری|#story|#سټوريانې/g, '').trim().substring(0, 15) : `کیسه ${stIdx + 1}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

{/* 1. FEATURED POSTS SLIDER (ښکلی او متحرک سلائیډر د شعرونو) */}
            {featuredPosts.length > 0 && (
              <div 
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="relative h-44 sm:h-52 rounded-2xl xs:rounded-3xl overflow-hidden shadow-lg border border-slate-500/10 group flex flex-col justify-end p-4 sm:p-5 text-white/95"
              >
                {/* Background image layer */}
                {(() => {
                  const fPost = featuredPosts[featuredIndex];
                  if (!fPost) return null;
                  
                  // Priority check for image
                  const imgUrl = fPost.photoUrl || (fPost.photoUrls && fPost.photoUrls[0]);
                  
                  return (
                    <div className="absolute inset-0 z-0">
                      {imgUrl ? (
                        <img 
                          src={imgUrl} 
                          alt="featured" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover brightness-[0.45] group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${tc.gradient} opacity-85 group-hover:brightness-105 transition duration-500`} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
                      
                      {/* Swipe / Navigation buttons */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevFeatured();
                        }}
                        style={{ cursor: 'pointer' }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition border border-white/10 opacity-0 group-hover:opacity-100 font-bold"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextFeatured();
                        }}
                        style={{ cursor: 'pointer' }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition border border-white/10 opacity-0 group-hover:opacity-100 font-bold"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Content Info */}
                      <div 
                        onClick={() => {
                          const currentScroll = window.scrollY || document.documentElement.scrollTop;
                          if (currentScroll > 0) {
                            detailScrollPosRef.current = currentScroll;
                          }
                          setSelectedPost(fPost);
                        }}
                        style={{ cursor: 'pointer' }}
                        className="absolute inset-x-0 bottom-0 z-5 flex flex-col justify-end p-4 text-right space-y-1"
                      >
                        <div className="flex items-center gap-2 self-end justify-end text-[10px] text-slate-300 font-sans">
                          <span>{getRelativeTimeInPashto(fPost.date, fPost.timeLabel || 'وروستی')}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-black font-sans leading-snug line-clamp-2 text-right">
                          {getPostTextWithFallback(fPost)}
                        </h4>
                        
                        {/* Pagination Dots */}
                        <div className="flex gap-1 justify-center pt-2">
                          {featuredPosts.map((_, i) => (
                            <span 
                              key={i} 
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === featuredIndex ? 'bg-indigo-400 w-3.5' : 'bg-white/45'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 2. EXQUISITE QUICK ACTIONS DYNAMIC GRID (چټک مینو بټنې: انځورونه، ویډیوګانې، کټګورۍ او پلټنه) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5" style={{ direction: 'rtl' }}>
              
              {/* ۱. ښکلي انځورونه */}
              <div 
                onClick={() => {
                  setIsPhotoReelsOpen(true);
                  setActivePhotoReelIndex(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-row items-center justify-between gap-1.5 h-13 sm:h-15 transition-all duration-350 transform hover:scale-[1.015] active:scale-[0.98] border border-white/15 shadow-[0_4px_15px_rgba(16,185,129,0.15)] hover:shadow-[0_8px_25px_rgba(5,150,105,0.3)] group action-btn-flow action-btn-photos text-white select-none cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <Images className="absolute -left-4 -bottom-4 w-14 h-14 text-white/5 pointer-events-none transform rotate-12 group-hover:scale-110 transition-all duration-500 ease-out" />
                
                <div className="flex-1 min-w-0 text-right z-10 flex flex-col justify-center">
                  <span className="text-[10px] sm:text-xs font-black tracking-tight font-sans">
                    ښکلي انځورونه
                  </span>
                  <span className="text-[7.5px] xs:text-[8px] text-emerald-100/90 font-bold font-sans">
                    البوم (Photo Slides)
                  </span>
                </div>
                <div className="shrink-0 w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-xs group-hover:bg-white/25 transition duration-300 z-10">
                  <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                </div>
              </div>

              {/* ۲. شارټ ویډیوګانې (Reels) */}
              <div 
                onClick={() => {
                  setIsReelsOpen(true);
                  setActiveReelIndex(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-row items-center justify-between gap-1.5 h-13 sm:h-15 transition-all duration-350 transform hover:scale-[1.015] active:scale-[0.98] border border-white/15 shadow-[0_4px_15px_rgba(244,63,94,0.15)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.3)] group action-btn-flow action-btn-reels text-white select-none cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <Video className="absolute -left-4 -bottom-4 w-14 h-14 text-white/5 pointer-events-none transform rotate-12 group-hover:scale-110 transition-all duration-500 ease-out" />
                
                <div className="flex-1 min-w-0 text-right z-10 flex flex-col justify-center">
                  <span className="text-[10px] sm:text-xs font-black tracking-tight font-sans">
                    شارټ ویډیوګانې
                  </span>
                  <span className="text-[7.5px] xs:text-[8px] text-rose-100/90 font-bold font-sans">
                    ریلیزونه (Reels)
                  </span>
                </div>
                <div className="shrink-0 w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-xs group-hover:bg-white/25 transition duration-300 z-10">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse ml-0.5" />
                </div>
              </div>

              {/* ۳. د شعرونو ډلبندي */}
              <div 
                onClick={() => {
                  setIsCategoryPageOpen(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-row items-center justify-between gap-1.5 h-13 sm:h-15 transition-all duration-350 transform hover:scale-[1.015] active:scale-[0.98] border border-white/15 shadow-[0_4px_15px_rgba(79,70,229,0.15)] hover:shadow-[0_8px_25px_rgba(67,56,202,0.3)] group action-btn-flow action-btn-categories text-white select-none cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <Layers className="absolute -left-4 -bottom-4 w-14 h-14 text-white/5 pointer-events-none transform rotate-12 group-hover:scale-110 transition-all duration-500 ease-out" />
                
                <div className="flex-1 min-w-0 text-right z-10 flex flex-col justify-center">
                  <span className="text-[10px] sm:text-xs font-black tracking-tight font-sans">
                    موضوعي ډلبندي
                  </span>
                  <span className="text-[7.5px] xs:text-[8px] text-blue-100/90 font-bold font-sans">
                    کټګورۍ (Category)
                  </span>
                </div>
                <div className="shrink-0 w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-xs group-hover:bg-white/25 transition duration-300 z-10">
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                </div>
              </div>

              {/* ۴. پلټنه */}
              <div 
                onClick={() => {
                  setIsSearchOpen(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-row items-center justify-between gap-1.5 h-13 sm:h-15 transition-all duration-350 transform hover:scale-[1.015] active:scale-[0.98] border border-white/15 shadow-[0_4px_15px_rgba(245,158,11,0.15)] hover:shadow-[0_8px_25px_rgba(217,119,6,0.3)] group action-btn-flow action-btn-search text-white select-none cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <Search className="absolute -left-4 -bottom-4 w-14 h-14 text-white/5 pointer-events-none transform rotate-12 group-hover:scale-110 transition-all duration-500 ease-out" />
                
                <div className="flex-1 min-w-0 text-right z-10 flex flex-col justify-center">
                  <span className="text-[10px] sm:text-xs font-black tracking-tight font-sans">
                    په پوسټونو پلټنه
                  </span>
                  <span className="text-[7.5px] xs:text-[8px] text-amber-100/90 font-bold font-sans">
                    لټون (Fast Search)
                  </span>
                </div>
                <div className="shrink-0 w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-xs group-hover:bg-white/25 transition duration-300 z-10">
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                </div>
              </div>

            </div>

            {/* د کیسو او ناولونو برخه (Special Stories & Novels Banner Button) */}
            <div 
              id="dewa-novels-stories-banner"
              onClick={() => {
                setIsNovelsPageOpen(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer' }}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-row-reverse items-center justify-between gap-3 transition-all duration-350 transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.985] border border-fuchsia-400/35 bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 animate-gradient-shift shadow-[0_6px_22px_rgba(219,39,119,0.22)] hover:shadow-[0_12px_32px_rgba(219,39,119,0.42)] group text-white select-none cursor-pointer mt-3 mb-2"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent)] pointer-events-none" />
              <BookOpen className="absolute -left-3 -bottom-3 w-16 h-16 text-white/10 pointer-events-none transform rotate-12 group-hover:scale-115 transition-all duration-500 ease-out" />
              
              <div className="flex flex-row-reverse items-center gap-2.5 z-10 text-right min-w-0">
                <div className="shrink-0 w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white shadow-md group-hover:bg-white/25 group-hover:rotate-6 transition duration-300">
                  <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 animate-pulse text-amber-300" />
                </div>
                <div className="min-w-0 flex flex-col justify-center text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="bg-rose-550 text-white text-[7.5px] xs:text-[8px] px-1.5 py-0.5 rounded-md font-sans font-black select-none animate-bounce">
                      نوی
                    </span>
                    <h3 className="text-xs sm:text-sm font-black tracking-tight font-sans text-white">
                      د کیسو او ناولونو غني جهان ✨
                    </h3>
                  </div>
                  <p className="text-[9.5px] sm:text-[10.5px] text-white/85 font-medium font-sans mt-0.5" style={{ direction: 'rtl' }}>
                    غږیزې او لیکل شوې کیسې او په زړه پورې رومانونه 🎧📖
                  </p>
                </div>
              </div>
              
              <div className="shrink-0 flex items-center justify-end z-10">
                <div className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/20 font-sans font-black text-[9.5px] sm:text-[10.5px] flex items-center justify-center gap-1 shadow-md group-hover:scale-105 active:scale-95 transition-all duration-300">
                  <span>ورننوځئ</span>
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* 2.5. BEAUTIVER DYNAMIC INFO & CONTACT NAVIGATION LINKS (زمونږ په اړه او تماس بټنې) */}
            <div id="dewa-quick-info-section" className="grid grid-cols-2 gap-3" style={{ direction: 'rtl' }}>
              {/* زمونږ په اړه مینو د غوړ پرمختللو حرکتونو سره */}
              <motion.div
                id="btn-about-us-home"
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.975 }}
                onClick={() => {
                  setIsAboutPageOpen(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
                className={`relative overflow-hidden rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between h-20 sm:h-22 border transition-all duration-300 group select-none shadow-[0_5px_15px_rgba(0,0,0,0.02)] ${
                  isDark 
                    ? 'bg-slate-900/40 border-indigo-500/20 text-white hover:border-indigo-400/40' 
                    : 'bg-white border-indigo-100 text-slate-900 hover:border-indigo-200 shadow-[0_4px_12px_rgba(79,70,229,0.04)]'
                }`}
              >
                {/* Decorative glowing gradient backdrop */}
                <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br ${tc.gradient} opacity-10 blur-xl group-hover:scale-150 transition-all duration-500`} />
                <div className="absolute left-3 bottom-2 text-indigo-500/10 pointer-events-none group-hover:text-indigo-500/20 transition duration-300">
                  <Info className="w-11 h-11 shrink-0" />
                </div>

                <div className="flex items-center justify-between w-full z-10">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-indigo-500/15 text-indigo-400 group-hover:bg-indigo-500/20' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100/70'}`}>
                    <Info className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${isDark ? 'bg-indigo-950/30 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>موږ وپېژنئ</span>
                </div>

                <div className="text-right z-10 pt-1">
                  <h4 className="text-xs sm:text-[13.5px] font-black tracking-tight font-sans text-right leading-none group-hover:text-indigo-500 transition-colors">
                    زموږ په اړه معلومات
                  </h4>
                  <p className="text-[8px] sm:text-[9px] text-slate-400 font-medium mt-1 leading-none">
                    هدفونه، پېژندنه او زموږ کړنې
                  </p>
                </div>
              </motion.div>

              {/* زمونږ سره اړیکه مینو د غوړ پرمختللو حرکتونو سره */}
              <motion.div
                id="btn-contact-us-home"
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.975 }}
                onClick={() => {
                  setIsContactPageOpen(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
                className={`relative overflow-hidden rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between h-20 sm:h-22 border transition-all duration-300 group select-none shadow-[0_5px_15px_rgba(0,0,0,0.02)] ${
                  isDark 
                    ? 'bg-slate-900/40 border-violet-500/20 text-white hover:border-violet-400/40' 
                    : 'bg-white border-violet-100 text-slate-900 hover:border-violet-200 shadow-[0_4px_12px_rgba(139,92,246,0.04)]'
                }`}
              >
                {/* Decorative glowing gradient backdrop */}
                <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 opacity-10 blur-xl group-hover:scale-150 transition-all duration-500" />
                <div className="absolute left-3 bottom-2 text-violet-500/10 pointer-events-none group-hover:text-violet-500/25 transition duration-300">
                  <Mail className="w-11 h-11 shrink-0" />
                </div>

                <div className="flex items-center justify-between w-full z-10">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-violet-500/15 text-violet-400 group-hover:bg-violet-500/20' : 'bg-violet-50 text-violet-600 group-hover:bg-violet-100/70'}`}>
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${isDark ? 'bg-violet-950/30 text-violet-300' : 'bg-violet-50 text-violet-600'}`}>پوښتنې او غبرګون</span>
                </div>

                <div className="text-right z-10 pt-1">
                  <h4 className="text-xs sm:text-[13.5px] font-black tracking-tight font-sans text-right leading-none group-hover:text-violet-500 transition-colors">
                    زموږ سره رسمي اړیکه
                  </h4>
                  <p className="text-[8px] sm:text-[9px] text-slate-400 font-medium mt-1 leading-none">
                    بریښنالیک او غونډې
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 3. CATEGORY FILTER TABS (د موضوع کټګوري ښکلي افقي ريسايکلر ويو) */}
            <div className="relative overflow-visible" style={{ direction: 'rtl' }}>
              <div className="flex gap-2.5 text-right relative overflow-x-auto py-4 px-2 scrollbar-none items-center snap-x snap-mandatory -my-2.5">
                {(() => {
                  const categoriesBase = [
                    { id: 'all', label: 'ټول', icon: Layers, activeClass: 'cat-btn-all-active' },
                    ...(storiesList.length > 0 ? [{ id: 'stories', label: 'سټوريانې', icon: Sparkles, activeClass: 'bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 border-transparent shadow-[0_4px_12px_rgba(236,72,153,0.35)]' }] : []),
                    { id: 'novels', label: 'ناولونه', icon: BookOpen, activeClass: 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 border-transparent shadow-[0_4px_12px_rgba(99,102,241,0.35)]' },
                    { id: 'writings_plain', label: 'ليکنې', icon: FileText, activeClass: 'cat-btn-writings-active' },
                    { id: 'poems', label: 'شعرونه', icon: Feather, activeClass: 'cat-btn-poems-active' },
                    { id: 'videos', label: 'ويډيويي', icon: Video, activeClass: 'cat-btn-videos-active' },
                    { id: 'audio', label: 'غږيز', icon: Music, activeClass: 'cat-btn-audio-active' },
                    { id: 'pdf', label: 'کتابونه', icon: BookOpen, activeClass: 'cat-btn-pdf-active' },
                    { id: 'images', label: 'انځورونه', icon: ImageIcon, activeClass: 'cat-btn-images-active' },
                  ];
                  return categoriesBase.map((cat) => {
                    const CatIcon = cat.icon;
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setActiveFavoriteFilter(null);
                        }}
                        style={{ cursor: 'pointer' }}
                        className={`snap-center flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12.5px] font-black transition-all duration-300 select-none border whitespace-nowrap active:scale-[0.96] ${
                          isActive 
                            ? cat.activeClass.includes('cat-btn') ? `${cat.activeClass} text-white border-transparent transform scale-[1.04]` : `${cat.activeClass} text-white border-transparent transform scale-[1.04]`
                            : `${isDark ? 'bg-slate-900/60 hover:bg-slate-800 border-slate-800/70 text-slate-300 hover:text-white shadow-xs' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950 shadow-xs'}`
                        }`}
                      >
                        <CatIcon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-white scale-110 rotate-3' : isDark ? 'text-slate-455' : 'text-slate-500'}`} />
                        <span className="font-sans tracking-tight">{cat.label}</span>
                      </button>
                    );
                  });
                })()}
              </div>
            </div>

            {/* 4. FAVORITES DASHBOARD (ښایسته خوښ شوي کټګورۍ) */}
            <div className="space-y-3">
              {/* د خوښو شویو لیکنو یو بټن چي تل په کورپاڼه کې ښکاره وي */}
              <button
                onClick={() => setIsFavoritesMenuOpen(!isFavoritesMenuOpen)}
                style={{ cursor: 'pointer' }}
                className={`w-full overflow-hidden rounded-2xl p-3.5 sm:p-4 flex flex-row items-center justify-between gap-3 transition-all duration-350 transform hover:scale-[1.01] active:scale-[0.99] border relative group select-none cursor-pointer ${
                  isFavoritesMenuOpen 
                    ? 'bg-rose-955/20 border-rose-500/40 text-rose-500 shadow-[0_4px_18px_rgba(244,63,94,0.18)]' 
                    : `${isDark ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 text-slate-100' : 'bg-slate-100 hover:bg-slate-150 border-slate-205 text-slate-800'}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${isFavoritesMenuOpen ? 'bg-rose-500/20 text-rose-500' : 'bg-slate-500/10 text-slate-500 group-hover:text-rose-500'}`}>
                    <Heart className={`w-5 h-5 ${isFavoritesMenuOpen ? 'fill-rose-500 animate-pulse' : ''}`} />
                  </div>
                  <div className="text-right">
                    <span className="block text-xs sm:text-sm font-black font-sans leading-tight">
                      ستاسو خوښ شوي او غوره اثار
                    </span>
                    <span className="block text-[8.5px] sm:text-[9.5px] text-slate-400 mt-1">
                      {favoritePostIds.length > 0 
                        ? `ټول ${favoritePostIds.length} توکي په دې مینو کې خوندي دي (مینو وازول)`
                        : 'خپل د خوښې پوسټونه پدې ځای کې د زړه تڼۍ په وازه کولو سره موندلی شئ'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    favoritePostIds.length > 0 
                      ? 'bg-rose-500 text-white font-bold' 
                      : 'bg-slate-500/10 text-slate-400'
                  }`}>
                    {favoritePostIds.length}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-350 ${isFavoritesMenuOpen ? 'transform rotate-180 text-rose-500' : ''}`} />
                </div>
              </button>

              {/* پنځه په زړه پورې ښایسته بټنې چې په کلسک کولو خلاصېږي */}
              <AnimatePresence>
                {isFavoritesMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.96 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-105 shadow-sm'} space-y-2.5`}>
                      <div className="text-right pb-1 border-b border-dashed border-slate-550/10">
                        <span className="text-[9.5px] text-slate-400 font-sans font-bold">لاندې په هره کټګورۍ کې خپل خوښ پيغامونه ولولئ (محرک او پاخه رنګونه د ښي څخه چپ لوري ته):</span>
                      </div>
                      
                      <div className="grid grid-cols-2 xs:grid-cols-5 gap-1.5 sm:gap-2" style={{ direction: 'rtl' }}>
                        {[
                          { id: 'videos', label: 'خوښې شوې ويډيوګاني', icon: Video, colorClass: 'fav-btn-videos' },
                          { id: 'images', label: 'خوښ شوي انځورونه', icon: ImageIcon, colorClass: 'fav-btn-images' },
                          { id: 'writings', label: 'خوښې شوې ليکنی', icon: FileText, colorClass: 'fav-btn-writings' },
                          { id: 'pdf', label: 'خوښ شوي کتابونه', icon: BookOpen, colorClass: 'fav-btn-pdf' },
                          { id: 'audio', label: 'خوښي شوي غږيزې', icon: Music, colorClass: 'fav-btn-audio' },
                        ].map((fav) => {
                          const FavIcon = fav.icon;
                          const isActive = activeFavoriteFilter === fav.id;
                          const count = allPosts.filter(p => {
                            if (!favoritePostIds.includes(p.id)) return false;
                            if (fav.id === 'videos') return !!p.hasVideo || !!p.videoUrl || !!p.videoThumbUrl;
                            if (fav.id === 'images') return !!p.photoUrl || (p.photoUrls && p.photoUrls.length > 0);
                            if (fav.id === 'audio') return !!p.hasAudio || !!p.audioUrl;
                            if (fav.id === 'pdf') return getIsBook(p);
                            if (fav.id === 'writings') return !p.hasVideo && !p.photoUrl && !(p.photoUrls && p.photoUrls.length > 0) && !p.hasAudio && !getIsBook(p);
                            return false;
                          }).length;

                          return (
                            <button
                              key={fav.id}
                              onClick={() => {
                                const newFilter = isActive ? null : fav.id as any;
                                setActiveFavoriteFilter(newFilter);
                                if (newFilter) {
                                  setSelectedCategory('all'); // Clear category selection so favorite filter is in primary display
                                }
                              }}
                              style={{ cursor: 'pointer' }}
                              className={`action-btn-flow ${fav.colorClass} relative overflow-hidden flex flex-col items-center justify-between p-2 rounded-xl transition text-center select-none duration-250 border active:scale-95 shadow-md min-h-[74px] sm:min-h-[82px] text-white ${
                                isActive ? 'ring-2 ring-white/75 border-white scale-[1.02]' : 'border-white/10 opacity-90 hover:opacity-100'
                              }`}
                            >
                              {/* Overlay for glass look */}
                              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition pointer-events-none" />
                              <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

                              <div className="p-1 rounded-lg mb-0.5 flex items-center justify-center bg-white/20 border border-white/25 shadow-inner z-10 shrink-0">
                                <FavIcon className="w-3.5 h-3.5 text-white animate-pulse" />
                              </div>
                              <span className="text-[9.5px] sm:text-[10px] font-black font-sans leading-tight block truncate-2-lines max-w-full drop-shadow-md z-10 text-white leading-normal">
                                {fav.label}
                              </span>
                              <div className="flex items-center gap-1 mt-0.5 font-mono text-[8px] sm:text-[8.5px] bg-black/35 px-1.5 py-0.25 rounded-md text-white border border-white/10 shadow-inner z-10 shrink-0">
                                <span className="font-bold">{count}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Active Favorites filter banner indicator */}
            {activeFavoriteFilter && (
              <div 
                className={`p-3 rounded-xl flex items-center justify-between border ${
                  isDark ? 'bg-indigo-950/40 border-indigo-900/40 text-indigo-200' : 'bg-indigo-50 border-indigo-100 text-indigo-850'
                } text-right`}
                style={{ direction: 'rtl' }}
              >
                <div className="flex items-center gap-1.5 font-bold font-sans text-xs">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                  <span>ښودل کیږي: {
                    activeFavoriteFilter === 'videos' ? 'خوښې شوې ويډيوګاني' :
                    activeFavoriteFilter === 'images' ? 'خوښ شوي انځورونه' :
                    activeFavoriteFilter === 'writings' ? 'خوښې شوې ليکنی' :
                    activeFavoriteFilter === 'pdf' ? 'خوښ شوي کتابونه' :
                    'خوښي شوي غږيزې'
                  }</span>
                </div>
                <button 
                  onClick={() => setActiveFavoriteFilter(null)} 
                  style={{ cursor: 'pointer' }}
                  className="px-2.5 py-1 text-[10px] font-black bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition active:scale-[0.95]"
                >
                  پورې کول / لغوه
                </button>
              </div>
            )}

            {/* RECENT COMPACT LISTS (د هر پوسټ لږ متن او څنګ ته د عکسونو ښکلی ډیزاین) */}
            <div className="space-y-3">
              {homePosts.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">پوسټونه نشته.</div>
              ) : selectedCategory === 'novels' ? (
                /* GORGEOUS 3-COLUMN GRID DESIGN FOR NOVELS (ناولونه) */
                <div className="grid grid-cols-3 gap-3 md:gap-5" style={{ direction: 'rtl' }}>
                  {homePosts.map((post) => {
                    const isRead = readPostIds.includes(post.id);
                    const coverImg = post.photoUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=350&auto=format&fit=crop&q=80";
                    
                    const cleanText = post.text 
                      ? post.text.replace(/#کیسه|#ناول|#داستان|#کیسې|#رومان|#غږیز|#صوتي|#کتاب|#داستانونه/g, '').trim()
                      : 'بې سرلیکه اثر';
                      
                    const firstLine = cleanText.split('\n')[0]?.trim() || 'بې نومه اثر';
                    const shortTitle = firstLine.length > 30 ? firstLine.slice(0, 27) + '...' : firstLine;

                    const isAudioType = post.hasAudio || post.audioUrl || (post.audioList && post.audioList.length > 0) || (post.text || '').toLowerCase().includes('audio') || (post.text || '').toLowerCase().includes('mp3') || (post.text || '').includes('آډیو') || (post.text || '').includes('غږیز');

                    const isFavorite = favoritePostIds.includes(post.id);

                    return (
                      <motion.div
                        key={post.id}
                        layoutId={`novel-card-${post.id}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => {
                          const currentScroll = window.scrollY || document.documentElement.scrollTop;
                          if (currentScroll > 0) {
                            detailScrollPosRef.current = currentScroll;
                          }
                          setSelectedPost(post);
                        }}
                        style={{ cursor: 'pointer' }}
                        className={`group relative flex flex-col aspect-[2/3.2] rounded-2xl overflow-hidden border transition-all duration-350 select-none ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-805 hover:border-violet-550/40 hover:shadow-2xl hover:shadow-violet-950/20' 
                            : 'bg-white border-slate-205 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-100/30'
                        }`}
                      >
                        {/* Book Spine Overlay decoration */}
                        <div className="absolute left-0 inset-y-0 w-2.5 sm:w-3.5 bg-gradient-to-r from-black/45 via-black/10 to-transparent z-15 pointer-events-none" />
                        <div className="absolute left-[2px] sm:left-[3px] inset-y-0 w-[1px] bg-white/15 z-16 pointer-events-none" />

                        {/* Covered page background */}
                        <div className="absolute inset-0 bg-slate-950">
                          <img 
                            src={coverImg} 
                            alt={shortTitle}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:rotate-1"
                          />
                        </div>

                        {/* Curved page 3D book shadow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none z-10" />

                        {/* Custom floating luxury badge */}
                        <div className="absolute top-2 right-2 m-0.5 z-12 flex items-center gap-1 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-lg border border-white/10 text-white text-[8px] sm:text-[9.5px] font-black shadow-lg">
                          {isAudioType ? (
                            <>
                              <Volume2 className="w-2.5 h-2.5 sm:w-3 text-pink-400" />
                              <span className="font-sans">غږیز</span>
                            </>
                          ) : (
                            <>
                              <BookOpen className="w-2.5 h-2.5 sm:w-3 text-emerald-400" />
                              <span className="font-sans">لیکلی</span>
                            </>
                          )}
                        </div>

                        {/* Favorite icon on top left */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(post.id);
                          }}
                          style={{ cursor: 'pointer' }}
                          className="absolute top-2 left-2 z-12 w-6.5 h-6.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/95 flex items-center justify-center transition active:scale-90"
                        >
                          <Heart className={`w-3 h-3 ${isFavorite ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                        </button>

                        {/* Floating title block */}
                        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 pb-3 sm:pb-4 bg-gradient-to-t from-black via-black/90 to-transparent text-right z-11 flex flex-col justify-end">
                          <h4 className="text-[10.5px] sm:text-[13px] font-black font-sans leading-snug text-white line-clamp-2 drop-shadow-md">
                            {shortTitle}
                          </h4>
                          
                          <div className="flex items-center justify-between mt-1.5 border-t border-white/10 pt-1.5">
                            <span className="text-[7.5px] sm:text-[9px] text-indigo-300 font-sans font-bold flex items-center gap-0.5 leading-none">
                              <Sparkles className="w-2 h-2 text-indigo-300 shrink-0" />
                              کتل پیل کړئ
                            </span>
                            {isRead && (
                              <span className="text-[7.5px] sm:text-[9px] text-emerald-400 font-sans font-black flex items-center gap-0.5 leading-none">
                                <Check className="w-2.5 h-2.5" />
                                لوستل شوی
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                  <div className={`
                    ${homeLayout === 'grid' ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-2.5'}
                  `}>
                    {homePosts.map((post) => {
                      const handleClick = () => {
                        // Synchronously capture the listing scroll position precisely before navigating
                        const currentScroll = window.scrollY || document.documentElement.scrollTop;
                        if (currentScroll > 0) {
                          detailScrollPosRef.current = currentScroll;
                        }

                        const hasVideo = post.hasVideo || post.videoUrl || (post.videoList && post.videoList.length > 0);
                        const hasImage = post.photoUrl || (post.photoUrls && post.photoUrls.length > 0);
                        
                        if (hasVideo) {
                          const idx = reelsList.findIndex(r => r.post.id === post.id);
                          if (idx !== -1) {
                            setActiveReelIndex(idx);
                            setIsReelsOpen(true);
                          } else {
                            setSelectedPost(post);
                          }
                        } else if (hasImage) {
                          const idx = photoReelsList.findIndex(p => p.post.id === post.id);
                          if (idx !== -1) {
                            setActivePhotoReelIndex(idx);
                            setIsPhotoReelsOpen(true);
                          } else {
                            setSelectedPost(post);
                          }
                        } else {
                          setSelectedPost(post);
                        }
                      };
                      
                      // 1. STANDARD LIST VIEW OR FALLBACK
                      if (homeLayout === 'standard' || !homeLayout) {
                        const isRead = readPostIds.includes(post.id);
                        return (
                          <div
                            key={post.id}
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                            className={`${cardBg} p-4 rounded-xl flex items-center gap-4 transition group active:scale-[0.99] select-none text-right shadow-md border border-slate-500/5 ${isRead ? 'opacity-55 saturate-[0.65] dark:opacity-45 hover:opacity-100 dark:hover:opacity-100 transition-opacity duration-300' : ''}`}
                          >
                            {(post.photoUrl || post.videoThumbUrl || post.hasVideo) && (
                              post.photoUrl ? (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                                  <CachedImage
                                    src={post.photoUrl || ''}
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
                                <div className="flex items-center justify-between w-full mb-1.5 text-[10px] text-slate-400 font-sans" style={{ direction: 'rtl' }}>
                                  <div className="flex items-center gap-2">
                                    {isRead && (
                                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[8.5px] font-bold flex items-center gap-0.5 border border-emerald-500/10 whitespace-nowrap">
                                        <Check className="w-2.5 h-2.5 text-emerald-500" />
                                        <span>لوستل شوی</span>
                                      </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-slate-550" />
                                      {getRelativeTimeInPashto(post.date, post.timeLabel || 'وروستی')}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1">
                                    {/* Share to WhatsApp Button */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleWhatsAppShare(post);
                                      }}
                                      className="focus:outline-hidden p-1.5 rounded-lg text-emerald-500 hover:text-emerald-400 hover:bg-emerald-550/10 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center gap-1 group"
                                      style={{ cursor: 'pointer' }}
                                      title="واټساپ کې مستقیم شریکول"
                                    >
                                      <svg className="w-4 h-4 fill-current group-hover:scale-110 transition duration-200" viewBox="0 0 24 24">
                                        <path d="M12.012 3c-4.96-.005-9.005 4.02-9.01 8.977a8.94 8.94 0 0 0 1.202 4.492L3 21l4.7-.1.353-.1.332.352c1.082.52 2.274.8 3.518.8h.01c4.965.004 9.01-4.015 9.013-8.977A8.97 8.97 0 0 0 12.012 3zm4.5 12c-.2.5-.9.9-1.4 1-1 .2-2.3-.2-3.8-1.5-1.5-1.3-2.5-2.8-2.8-3.4-.3-.5-.4-.9-.4-1.3 0-.6.3-.9.4-1.1.1-.2.2-.2.3-.2l.7.1c.2 0 .4.1.5.3.3.6.7 1.4.8 1.5.1.2.1.4 0 .6-.1.2-.2.3-.3.4l-.4.3c-.1.1-.1.2 0 .4.4.8 1 1.4 1.8 1.8.2.1.3.1.4 0 .2-.2.4-.5.6-.7l.4-.2c.2 0 .4.1.7.3.7.4 1.2.7 1.3.8.3.1.3.3.2.4-.1.4-.4.8-.8 1z"/>
                                      </svg>
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(post.id);
                                      }}
                                      className={`focus:outline-hidden p-1.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 ${
                                        favoritePostIds.includes(post.id)
                                          ? 'text-rose-500 bg-rose-500/10'
                                          : 'text-slate-400 hover:text-rose-400 hover:bg-slate-500/10'
                                      }`}
                                      style={{ cursor: 'pointer' }}
                                      title="خوښ کړل"
                                    >
                                      <Heart className={`w-3.5 h-3.5 ${favoritePostIds.includes(post.id) ? 'fill-rose-500' : ''}`} />
                                    </button>
                                  </div>
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
                                    {post.audioList.map((audioItem, idx) => {
                                      const cleanTitle = getBeautifulAudioTitle(audioItem.title, post.title, getPostTextWithFallback(post), idx);
                                      return (
                                        <BeautifulAudioPlayer key={idx} url={audioItem.url} title={cleanTitle} duration={audioItem.duration} isDark={isDark} tc={tc} />
                                      );
                                    })}
                                  </div>
                                ) : post.hasAudio && post.audioUrl ? (
                                  <BeautifulAudioPlayer url={post.audioUrl} title={getBeautifulAudioTitle(post.audioTitle, post.title, getPostTextWithFallback(post))} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
                        const isRead = readPostIds.includes(post.id);
                        return (
                          <div
                            key={post.id}
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                            className={`${cardBg} rounded-xl overflow-hidden flex flex-col transition group active:scale-[0.98] select-none text-right shadow-sm border border-slate-500/5 ${isRead ? 'opacity-55 saturate-[0.65] dark:opacity-45 hover:opacity-100 dark:hover:opacity-100 transition-opacity duration-300' : ''}`}
                          >
                            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                              {post.photoUrl ? (
                                <CachedImage
                                  src={post.photoUrl || ''}
                                  alt="grid-thumb"
                                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                                />
                              ) : post.videoThumbUrl ? (
                                <CachedImage
                                  src={post.videoThumbUrl || ''}
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
                            </div>
                            <div className="p-3 flex-1 flex flex-col justify-between gap-1.5">
                              <div>
                                <div className="flex items-center justify-between w-full mb-1">
                                  <span className="text-[9px] text-slate-500 flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5" />
                                    {getRelativeTimeInPashto(post.date, post.timeLabel || 'Recent')}
                                  </span>
                                  {isRead && (
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[8px] font-bold flex items-center gap-0.5 border border-emerald-500/10 whitespace-nowrap leading-none scale-[0.85]">
                                      <Check className="w-2.5 h-2.5 text-emerald-500" />
                                      <span>لوستل شوی</span>
                                    </span>
                                  )}
                                  <div className="flex items-center gap-1">
                                    {/* Share to WhatsApp Button */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleWhatsAppShare(post);
                                      }}
                                      className="focus:outline-hidden p-1 rounded text-emerald-500 hover:text-emerald-400 hover:bg-emerald-550/10 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center group"
                                      style={{ cursor: 'pointer' }}
                                      title="واټساپ کې شریکول"
                                    >
                                      <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition duration-200" viewBox="0 0 24 24">
                                        <path d="M12.012 3c-4.96-.005-9.005 4.02-9.01 8.977a8.94 8.94 0 0 0 1.202 4.492L3 21l4.7-.1.353-.1.332.352c1.082.52 2.274.8 3.518.8h.01c4.965.004 9.01-4.015 9.013-8.977A8.97 8.97 0 0 0 12.012 3zm4.5 12c-.2.5-.9.9-1.4 1-1 .2-2.3-.2-3.8-1.5-1.5-1.3-2.5-2.8-2.8-3.4-.3-.5-.4-.9-.4-1.3 0-.6.3-.9.4-1.1.1-.2.2-.2.3-.2l.7.1c.2 0 .4.1.5.3.3.6.7 1.4.8 1.5.1.2.1.4 0 .6-.1.2-.2.3-.3.4l-.4.3c-.1.1-.1.2 0 .4.4.8 1 1.4 1.8 1.8.2.1.3.1.4 0 .2-.2.4-.5.6-.7l.4-.2c.2 0 .4.1.7.3.7.4 1.2.7 1.3.8.3.1.3.3.2.4-.1.4-.4.8-.8 1z"/>
                                      </svg>
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(post.id);
                                      }}
                                      className={`focus:outline-hidden p-1 rounded transition-all transform hover:scale-105 active:scale-95 ${
                                        favoritePostIds.includes(post.id)
                                          ? 'text-rose-500 bg-rose-500/10'
                                          : 'text-slate-400 hover:text-rose-400 hover:bg-slate-500/10'
                                      }`}
                                      style={{ cursor: 'pointer' }}
                                      title="خوښ کړل"
                                    >
                                      <Heart className={`w-3 h-3 ${favoritePostIds.includes(post.id) ? 'fill-rose-500' : ''}`} />
                                    </button>
                                  </div>
                                </div>
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
                                    {post.audioList.map((audioItem, idx) => {
                                      const cleanTitle = getBeautifulAudioTitle(audioItem.title, post.title, getPostTextWithFallback(post), idx);
                                      return (
                                        <BeautifulAudioPlayer key={idx} url={audioItem.url} title={cleanTitle} duration={audioItem.duration} isDark={isDark} tc={tc} />
                                      );
                                    })}
                                  </div>
                                ) : post.hasAudio && post.audioUrl ? (
                                  <BeautifulAudioPlayer url={post.audioUrl} title={getBeautifulAudioTitle(post.audioTitle, post.title, getPostTextWithFallback(post))} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-white ${tc.bg}`}>
                              <Feather className="w-3.5 h-3.5" />
                            </span>
                            <div className="flex-1 min-w-0 pr-1">
                              <p className={`text-[12.5px] sm:text-[13px] ${isDark ? 'text-slate-200' : 'text-slate-800'} font-semibold truncate`}>
                                {getPostTextWithFallback(post)}
                              </p>
                              <span className="text-[9px] text-slate-550 flex items-center gap-1.5 mt-0.5 font-sans">
                                {getRelativeTimeInPashto(post.date, post.timeLabel || 'ثبت شوی')}
                              </span>
                              {post.audioList && post.audioList.length > 0 ? (
                                <div className="mt-1.5 max-w-xs scale-95 origin-right space-y-1.5">
                                  {post.audioList.map((audioItem, idx) => {
                                    const cleanTitle = getBeautifulAudioTitle(audioItem.title, post.title, getPostTextWithFallback(post), idx);
                                    return (
                                      <BeautifulAudioPlayer key={idx} url={audioItem.url} title={cleanTitle} duration={audioItem.duration} isDark={isDark} tc={tc} />
                                    );
                                  })}
                                </div>
                              ) : post.hasAudio && post.audioUrl ? (
                                <div className="mt-1.5 max-w-xs scale-95 origin-right">
                                  <BeautifulAudioPlayer url={post.audioUrl} title={getBeautifulAudioTitle(post.audioTitle, post.title, getPostTextWithFallback(post))} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
                              <div className="flex items-center justify-end pb-1 border-b border-slate-500/10">
                                <span className="text-xs text-slate-550 flex items-center gap-1 font-sans">
                                  <Clock className="w-3.5 h-3.5" />
                                  {getRelativeTimeInPashto(post.date, post.timeLabel || 'پورته شوی')}
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
                                  {post.audioList.map((audioItem, idx) => {
                                    const cleanTitle = getBeautifulAudioTitle(audioItem.title, post.title, getPostTextWithFallback(post), idx);
                                    return (
                                      <BeautifulAudioPlayer key={idx} url={audioItem.url} title={cleanTitle} duration={audioItem.duration} isDark={isDark} tc={tc} />
                                    );
                                  })}
                                </div>
                              ) : post.hasAudio && post.audioUrl ? (
                                <BeautifulAudioPlayer url={post.audioUrl} title={getBeautifulAudioTitle(post.audioTitle, post.title, getPostTextWithFallback(post))} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
                                      <span className="font-mono text-[10px] text-slate-555">{react.count}</span>
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
                            <div className="flex justify-end items-center pb-2 border-b border-slate-500/10">
                              <span className="text-[10px] text-slate-555 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {getRelativeTimeInPashto(post.date, post.timeLabel || 'Recent')}
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
                                {post.audioList.map((audioItem, idx) => {
                                  const cleanTitle = getBeautifulAudioTitle(audioItem.title, post.title, getPostTextWithFallback(post), idx);
                                  return (
                                    <BeautifulAudioPlayer key={idx} url={audioItem.url} title={cleanTitle} duration={audioItem.duration} isDark={isDark} tc={tc} />
                                  );
                                })}
                              </div>
                            ) : post.hasAudio && post.audioUrl ? (
                              <BeautifulAudioPlayer url={post.audioUrl} title={getBeautifulAudioTitle(post.audioTitle, post.title, getPostTextWithFallback(post))} duration={post.audioDuration} isDark={isDark} tc={tc} />
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

            {/* SHIMMER EFFECT WHEN LOADING MORE POSTS (متحرک ښکلي شیمر پوستونه د غوښتنې پر مهال) */}
            {isAutoloadingMore && (
              selectedCategory === 'novels' ? (
                <div className="mt-3 grid grid-cols-3 gap-3 md:gap-5">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className={`${cardBg} rounded-2xl aspect-[2/3.2] overflow-hidden flex flex-col border border-slate-500/5 animate-pulse text-right relative`}
                    >
                      <div className="absolute inset-0 bg-slate-400/10 dark:bg-slate-800/40" />
                      <div className="absolute inset-x-0 bottom-0 p-3 space-y-2 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="h-4 bg-slate-400/25 dark:bg-slate-800/40 rounded w-11/12" />
                        <div className="h-3 bg-slate-400/10 dark:bg-slate-800/20 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`mt-3 ${homeLayout === 'grid' ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-2.5'}`}>
                  {[1, 2, 3, 4].map((item) => (
                    homeLayout === 'grid' ? (
                    <div
                      key={item}
                      className={`${cardBg} rounded-xl overflow-hidden flex flex-col border border-slate-500/5 animate-pulse text-right`}
                    >
                      <div className="relative aspect-video w-full bg-slate-400/10 dark:bg-slate-800/40" />
                      <div className="p-3 flex-1 space-y-2">
                        <div className="h-3 bg-slate-400/10 dark:bg-slate-800/20 rounded w-1/3" />
                        <div className="h-4 bg-slate-400/25 dark:bg-slate-800/45 rounded w-11/12" />
                        <div className="h-3 bg-slate-400/10 dark:bg-slate-800/20 rounded w-2/3" />
                      </div>
                    </div>
                  ) : (
                    <div
                      key={item}
                      className={`${cardBg} p-4 rounded-xl flex items-center gap-4 border border-slate-500/5 animate-pulse text-right`}
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-400/15 dark:bg-slate-800/40 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-slate-400/10 dark:bg-slate-800/20 rounded w-1/4" />
                        <div className="h-4 bg-slate-400/25 dark:bg-slate-800/35 rounded w-3/4" />
                        <div className="h-3 bg-slate-400/15 dark:bg-slate-800/25 rounded w-5/6" />
                        <div className="h-3 bg-slate-400/10 dark:bg-slate-800/20 rounded w-1/2" />
                      </div>
                    </div>
                    )
                  ))}
                </div>
              )
            )}

            {/* INFINITE SCROLL SENTINEL & MANUAL OVERRIDE (د غبرکون سینټینل او نور وګورئ بټن) */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              {visibleHomeCount < filteredHomePosts.length && (
                <div id="home-infinite-scroll-sentinel" className="h-6 w-full flex items-center justify-center opacity-0 pointer-events-none" />
              )}
              
              {isAutoloadingMore || isScrapingMore ? (
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <span className="w-4 h-4 rounded-full border-2 border-slate-700 border-t-indigo-500 animate-spin shrink-0"></span>
                  <span className="text-xs font-semibold font-sans">صبر وکړئ، نور پوسټونه راغونډیږي...</span>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    setIsAutoloadingMore(true);
                    try {
                      if (visibleHomeCount < filteredHomePosts.length) {
                        setVisibleHomeCount((prev) => prev + 30);
                      } else {
                        await loadMoreOlderPosts();
                        setVisibleHomeCount((prev) => prev + 30);
                      }
                    } catch (err) {
                      console.error("Manual home posts loading failed:", err);
                    } finally {
                      setIsAutoloadingMore(false);
                    }
                  }}
                  className="w-full max-w-xs px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black transition-all duration-300 shadow-md active:scale-98 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4 text-indigo-100" />
                  <span>نور وګورئ (Load More)</span>
                </button>
              )}
            </div>
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
                  onClick={() => {
                    const currentScroll = window.scrollY || document.documentElement.scrollTop;
                    if (currentScroll > 0) {
                      detailScrollPosRef.current = currentScroll;
                    }
                    setSelectedPost(post);
                  }}
                  style={{ cursor: 'pointer' }}
                  className={`${isDark ? 'bg-slate-900/50 border-white/40 hover:bg-slate-800/60' : 'bg-white border-slate-205 hover:bg-slate-100/80 shadow-md'} border p-4 rounded-xl flex items-center gap-4 transition group select-none text-right`}
                >
                  {/* Right: Enlarged thumbnail image with no white stroke */}
                  {(post.photoUrl || post.videoThumbUrl || post.hasVideo) && (
                    post.photoUrl && (!post.photoUrls || post.photoUrls.length <= 1) ? (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                        <img
                          src={post.photoUrl || null}
                          referrerPolicy="no-referrer"
                          alt="Scrape preview node"
                          className="w-full h-full object-cover transition duration-305 group-hover:scale-105"
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
                          className="w-full h-full object-cover transition duration-305 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                          <PlayCircle className="w-6 h-6 text-indigo-400 drop-shadow" />
                        </span>
                      </div>
                    ) : post.hasVideo ? (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950/65 flex items-center justify-center shrink-0 text-indigo-400">
                        <Video className="w-8 h-8 text-indigo-400" />
                      </div>
                    ) : null
                  )}

                  {/* Left: Snippet Text & Reactions */}
                  <div className="flex-1 min-w-0 text-right flex flex-col justify-between py-0.5 h-full w-full">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1.5 font-sans">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          {getRelativeTimeInPashto(post.date, post.timeLabel || 'Recent')}
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
                          {post.audioList.map((audioItem, idx) => {
                            const cleanTitle = getBeautifulAudioTitle(audioItem.title, post.title, getPostTextWithFallback(post), idx);
                            return (
                              <BeautifulAudioPlayer key={idx} url={audioItem.url} title={cleanTitle} duration={audioItem.duration} isDark={isDark} tc={tc} />
                            );
                          })}
                        </div>
                      ) : post.hasAudio && post.audioUrl ? (
                        <div className="mt-2">
                          <BeautifulAudioPlayer url={post.audioUrl} title={getBeautifulAudioTitle(post.audioTitle, post.title, getPostTextWithFallback(post))} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
              <div id="infinite-scroll-sentinel" className="py-6 flex flex-col justify-center items-center gap-3">
                {isScrapingMore ? (
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-slate-700 border-t-indigo-500 animate-spin shrink-0"></span>
                    <span className="text-xs text-slate-400 font-sans">د تېرو او پخوانيو پوسټونو کښته کول... (لوډیږي)</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={async () => {
                        setIsScrapingMore(true);
                        try {
                          await loadMoreOlderPosts();
                          setVisibleFullCount(prev => prev + 10);
                        } catch (err) {
                          console.error("Manual loading archive failed:", err);
                        } finally {
                          setIsScrapingMore(false);
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white dark:text-slate-300 text-xs font-bold transition active:scale-95 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Eye className="w-4 h-4 text-indigo-400" />
                      <span>نور وګورئ (Load More)</span>
                    </button>
                    <span className="text-[10px] text-slate-500 font-sans opacity-75">د نورو پوستونو موندلو لپاره لاندې لاړ شئ یا په پورته بټن کلیک وکړئ.</span>
                  </div>
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
         FIRST-TIME 10-PAGE ONBOARDING CAROUSEL (ښکلی او د لسو پاڼو مډرن اونبورډینګ سلایډر)
         ========================================================== */}
      <AnimatePresence>
        {showOnboarding && (() => {
          const onboardingSlides = [
            {
              title: 'پښتو ادبي خزانه',
              desc: 'د پښتنو د مډرن ادب، کلتور، بې‌ساري ادبي زېرمو او خوندورو شعرونو یوازینی پوره ډیجیټل راټولونه.',
              icon: Sparkles,
              gradient: 'from-pink-500 via-fuchsia-600 to-rose-500',
              badge: 'بشپړه ادبي زېرمه'
            },
            {
              title: 'د غونډال ښکلي سټوريانې',
              desc: 'د لنډو شعرونو او خوندورو پیغامونو د مډرن کتنې لپاره د واټساپ سټایل په څېر ډینامیک پرمختګ کونکي سټوري ځانګړتیا.',
              icon: Feather,
              gradient: 'from-amber-500 to-orange-600',
              badge: 'سټوري بڼه (Stories)'
            },
            {
              title: 'شارټ او ترنمیز ریلزونه',
              desc: 'د زړګي کښلي پښتو ترنمونو او د شعرونو کیفیت لرونکي لړۍ په ځانګړو او رنګینو لنډو ویډیوګانو (Reels) بڼې سره.',
              icon: Video,
              gradient: 'from-red-500 to-rose-600',
              badge: 'شارټ ویډیوګانې'
            },
            {
              title: 'د انځورونو او بیتونو سلایډر',
              desc: 'د کښلو شعرونو څخه جوړ شوي لوړ کیفیت لرونکي انځورونه او ګرافیکي بڼې په یو پوره مډرن تصویري ریل کښې وګورئ.',
              icon: ImageIcon,
              gradient: 'from-emerald-500 to-teal-600',
              badge: 'انځورونه'
            },
            {
              title: 'غږيز ترنمونه او پوډکاسټونه',
              desc: 'د پښتلو د خوندورو ترنمونو، بېلابېلو غږیزو پیغامونو او خپرونو موندل او د شالید (Background Player) کې په اسانه غږول.',
              icon: Music,
              gradient: 'from-indigo-500 to-blue-600',
              badge: 'غږيز کلامونه'
            },
            {
              title: 'د ډلبندیو منظم موضوعات',
              desc: 'ټول پوسټونه په بشپړه توګه په څانګو وېشل شوي دي لکه: شعرونه، لیکنې، غږیز پیغامونه او د پښتو ادبي کتابونه.',
              icon: Layers,
              gradient: 'from-violet-500 to-purple-600',
              badge: 'کټګورۍ'
            },
            {
              title: 'د پښتو ادبي کتابونو لوی ارشیف',
              desc: 'د غوښتنلیک څخه په اسانۍ د تلیګرام لوی ادبي کتابونه او پي‌ډي‌اف (PDF) فایلونه کښته او په مستقیمه توګه مطالعه کړئ.',
              icon: BookOpen,
              gradient: 'from-cyan-500 to-blue-500',
              badge: 'کتابتون او PDF'
            },
            {
              title: 'د موبایل اصلي خبرتیاوې',
              desc: 'هیڅ کله نوې ادبی خپرونې مه له لاسه ورکوئ، سمدستي پخپل اندارئډ موبایل بار (System Bar) کې رښتینې خبرتیا ترلاسه کړئ.',
              icon: Bell,
              gradient: 'from-purple-500 via-pink-500 to-rose-500',
              badge: 'د غونډال خبرتیاوې'
            },
            {
              title: 'روښانه او د سترګو هوسا بېلابېل حالتونه',
              desc: 'د سترګو د هوساینې او په اسانه د لوستلو لپاره هر کله غوښتنلیک تیاره (Twilight Dark) یا روښانه بڼې ته اړولی شئ.',
              icon: Sun,
              gradient: 'from-orange-400 to-amber-500',
              badge: 'بهرني رنګونه'
            },
            {
              title: 'خوښې او نښه شوي شعرونه',
              desc: 'خپل تر ټولو محبوبه کلامونه په نښه کړئ او د انټرنیټ پرته یې په خپلو غوره والي کې د تل لپاره ذخیره وساتئ.',
              icon: Heart,
              gradient: 'from-rose-500 to-pink-600',
              badge: 'زما خوښې'
            }
          ];

          const currentSlide = onboardingSlides[activeOnboardingPage];
          if (!currentSlide) return null;
          const SlideIcon = currentSlide.icon;

          const handleFinishOnboarding = () => {
            localStorage.setItem('dewa_onboarding_shown_v2', 'true');
            setShowOnboarding(false);
          };

          const handleLaunchFeatureOnboard = (slideIndex: number) => {
            localStorage.setItem('dewa_onboarding_shown_v2', 'true');
            setShowOnboarding(false);
            
            // Close any overlay pages first to avoid overlapping
            setIsReelsOpen(false);
            setIsPhotoReelsOpen(false);
            setIsCategoryPageOpen(false);
            setIsSettingsPageOpen(false);
            setIsAboutPageOpen(false);
            setIsContactPageOpen(false);
            setIsFullFeedOpen(false);
            setIsSearchOpen(false);
            setSelectedPost(null);

            if (slideIndex === 0) {
              // ۱. پښتو ادبي خزانه
              setSelectedCategory('all');
            } else if (slideIndex === 1) {
              // ۲. د سټوريانو برخه
              if (storiesList.length > 0) {
                setActiveStoryIndex(0);
                setIsStoryViewerOpen(true);
              } else {
                setSelectedCategory('stories');
              }
            } else if (slideIndex === 2) {
              // ۳. شارټ او ترنمیز ریلزونه (Reels)
              setIsReelsOpen(true);
            } else if (slideIndex === 3) {
              // ۴. د انځورونو او بیتونو سلایډر
              setIsPhotoReelsOpen(true);
            } else if (slideIndex === 4) {
              // ۵. غږيز کلامونه
              setSelectedCategory('audio');
            } else if (slideIndex === 5) {
              // ۶. موضوعي ډلبندۍ
              setIsCategoryPageOpen(true);
            } else if (slideIndex === 6) {
              // ۷. د کتابونو ارشیف (PDF)
              setSelectedCategory('pdf');
            } else if (slideIndex === 7) {
              // ۸. د غونډال خبرتیاوې
              setIsSettingsPageOpen(true);
            } else if (slideIndex === 8) {
              // ۹. بهرني رنګونه (تھیم ترتیب)
              setIsSettingsPageOpen(true);
            } else if (slideIndex === 9) {
              // ۱۰. خوښ شوي اثار (Favorites)
              setIsFavoritesMenuOpen(true);
            }
          };

          return (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/95 z-[9991] backdrop-blur-md"
              />

              {/* Onboarding Dialog view */}
              <div className="fixed inset-0 z-[9992] overflow-y-auto flex items-center justify-center p-4">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: -30 }}
                  className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative text-right flex flex-col justify-between min-h-[580px]"
                >
                  
                  {/* Top Segmented Progress Bar and Skip Button */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4" style={{ direction: 'rtl' }}>
                      <span className="text-[10px] uppercase tracking-wider font-sans font-black text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full">
                        مرحله {activeOnboardingPage + 1} / 10
                      </span>
                      <button
                        onClick={handleFinishOnboarding}
                        style={{ cursor: 'pointer' }}
                        className="text-xs font-black font-sans text-rose-400 hover:text-rose-350 transition select-none active:scale-95"
                      >
                        تېرېدل / Skip
                      </button>
                    </div>

                    {/* Highly Interactive Navigable Segmented Progress Bars */}
                    <div className="flex gap-1 w-full" style={{ direction: 'rtl' }}>
                      {onboardingSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveOnboardingPage(idx)}
                          style={{ cursor: 'pointer' }}
                          title={`مرحله ${idx + 1}`}
                          className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden focus:outline-none transition-transform hover:scale-y-125"
                        >
                          <div
                            className={`h-full transition-all duration-300 ${
                              idx <= activeOnboardingPage
                                ? `bg-gradient-to-r ${currentSlide.gradient}`
                                : 'bg-transparent'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Icon and Animated Content inside the slider */}
                  <div className="my-5 flex flex-col items-center text-center">
                    
                    {/* Glowing outer ring and icon */}
                    <motion.div
                      key={activeOnboardingPage}
                      initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      onClick={() => handleLaunchFeatureOnboard(activeOnboardingPage)}
                      style={{ cursor: 'pointer' }}
                      className={`w-18 h-18 rounded-full bg-gradient-to-tr ${currentSlide.gradient} p-0.5 shadow-lg shadow-indigo-500/10 flex items-center justify-center mb-4 relative cursor-pointer active:scale-95 transition`}
                      title="د خلاصون لپاره کلیک وباسئ"
                    >
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                        <SlideIcon className={`w-8 h-8 text-white`} />
                      </div>
                      
                      <span className="absolute -bottom-2 bg-slate-950 text-white rounded-full px-2.5 py-0.5 border border-slate-850 text-[8px] font-black tracking-wider shadow">
                        {currentSlide.badge}
                      </span>
                    </motion.div>

                    {/* Texts with animations */}
                    <div className="space-y-2" style={{ direction: 'rtl' }}>
                      <motion.h3
                        key={`title_${activeOnboardingPage}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => handleLaunchFeatureOnboard(activeOnboardingPage)}
                        style={{ cursor: 'pointer' }}
                        className="text-[16px] font-black text-white hover:text-indigo-400 transition leading-tight font-sans cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {currentSlide.title}
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </motion.h3>

                      <motion.p
                        key={`desc_${activeOnboardingPage}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs text-slate-350 leading-relaxed font-semibold max-w-sm mx-auto px-2"
                      >
                        {currentSlide.desc}
                      </motion.p>
                    </div>

                  </div>

                  {/* HIGHLY INTERACTIVE GRID OF FEATURES (د فیچرونو ځانګړی لیست چي په کلیک کولو سره په مستقیم ډول خلاصيږي) */}
                  <div className="mb-6 border-t border-slate-800/80 pt-4 text-right w-full">
                    <span className="block text-[11px] font-black text-amber-400 mb-2.5 font-sans leading-none flex items-center justify-start gap-1 justify-end">
                      <span>د کتنې لپاره لاندې په هر بېلابېل فیچر باندې کلیک وباسئ:</span>
                      <Sparkles className="w-3 h-3 text-amber-450 animate-pulse" />
                    </span>
                    
                    <div className="grid grid-cols-2 gap-2 max-h-34 overflow-y-auto pr-1 pb-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                      {onboardingSlides.map((slide, idx) => {
                        const IconComponent = slide.icon;
                        const isCurrent = idx === activeOnboardingPage;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleLaunchFeatureOnboard(idx)}
                            style={{ cursor: 'pointer' }}
                            className={`flex items-center justify-between gap-2 p-2 rounded-xl border text-right transition-all duration-200 active:scale-[0.96] group ${
                              isCurrent 
                                ? 'bg-slate-800/90 border-indigo-500/50 text-white shadow-md' 
                                : 'bg-slate-950/65 border-slate-850 hover:border-slate-800 text-slate-300 hover:text-white'
                            }`}
                          >
                            <span className="text-[9.5px] font-bold truncate order-2 font-sans select-none pointer-events-none">
                              {slide.title}
                            </span>
                            <div className={`p-1.5 rounded-lg bg-gradient-to-tr ${slide.gradient} text-white shrink-0 shadow-xs order-1 pointer-events-none select-none`}>
                              <IconComponent className="w-3 h-3" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation controls next, back and get started */}
                  <div className="flex gap-3 items-center mt-2" style={{ direction: 'rtl' }}>
                    {activeOnboardingPage < 9 ? (
                      <button
                        onClick={() => setActiveOnboardingPage(prev => Math.min(prev + 1, 9))}
                        style={{ cursor: 'pointer' }}
                        className={`flex-1 py-3 bg-gradient-to-r ${currentSlide.gradient} active:scale-[0.98] text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 font-sans shadow-lg shadow-indigo-500/10`}
                      >
                        <span>بلې مرحلې ته لاړ شئ</span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishOnboarding}
                        style={{ cursor: 'pointer' }}
                        className="flex-1 py-3 bg-pink-600 hover:bg-pink-550 active:scale-[0.98] text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 font-sans shadow-lg shadow-pink-500/15"
                      >
                        <span>دلته پیل کړئ</span>
                        <Check className="w-4 h-4" />
                      </button>
                    )}

                    {activeOnboardingPage > 0 && (
                      <button
                        onClick={() => setActiveOnboardingPage(prev => Math.max(prev - 1, 0))}
                        style={{ cursor: 'pointer' }}
                        className="px-5 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-bold transition active:scale-[0.98]"
                      >
                        بېرته
                      </button>
                    )}
                  </div>

                </motion.div>
              </div>
            </>
          );
        })()}
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

                      {notificationsEnabled && (
                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-indigo-950/20 border-indigo-900/30 text-neutral-300' : 'bg-indigo-50/50 border-indigo-100 text-neutral-600'} flex items-center justify-between gap-2.5 text-right font-sans mt-1.5`}>
                          <p className="text-[9.5px] leading-relaxed flex-1">
                            🔔 **په ورځ کې ۵ پیغامونه** په نښه شوي دي ترڅو کاروونکی د اپلیکیشن کارولو لپاره وهڅوي. د سمدستي ازموینې لپاره ښي خوا ته تڼۍ کېکاږئ:
                          </p>
                          <button
                            onClick={() => {
                              const available = feedData?.posts?.filter(p => p && p.text && p.text.length > 20) || [];
                              if (available.length > 0) {
                                const rnd = Math.floor(Math.random() * available.length);
                                triggerLocalNotification(available[rnd]);
                              } else {
                                showToast('لا تر اوسه د شعرونو لیست ندی ترلاسه شوی.', 'error');
                              }
                            }}
                            style={{ cursor: 'pointer' }}
                            className="shrink-0 py-1.5 px-2.5 bg-indigo-600 hover:bg-indigo-550 text-white text-[9.5px] font-bold rounded-lg transition-all"
                          >
                            د نوټیفیکیشن ازمویل
                          </button>
                        </div>
                      )}

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
                              src={devPost?.photoUrl || feedData?.channelInfo?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"}
                              className="w-full h-full object-cover"
                              alt="Obaidullah Ghaffari Portal"
                            />
                          </div>
                          
                          <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>عبیدالله غفاري</h4>
                          <span className="text-[10px] text-slate-400 block mt-1 tracking-wider">
                            AI Developer • Web Enthusiast
                          </span>

                          {/* Quick Action Contact Buttons */}
                          <div className="flex items-center justify-center gap-2 mt-4">
                            <a
                              href="https://ghafoori.me"
                              target="_blank"
                              rel="noreferrer"
                              className="py-1.5 px-3 bg-indigo-650/10 hover:bg-indigo-600/20 text-indigo-400 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                            >
                              <Globe className="w-3" />
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
                        {devPost ? (
                          <div className="text-right text-[11px] leading-relaxed">
                            {devPost.htmlText ? (
                              <div 
                                className={`${isDark ? 'text-slate-300' : 'text-slate-700'} whitespace-pre-wrap`}
                                dangerouslySetInnerHTML={{ __html: makeHtmlHashtagsClickable(devPost.htmlText.replace(/#dev/gi, '').trim()) }}
                              />
                            ) : (
                              <BeautifulTelegramText 
                                text={devPost.text.replace(/#dev/gi, '').trim()} 
                                isDark={isDark}
                                fs={fs}
                                showExpander={false}
                                limitLines={50}
                              />
                            )}
                          </div>
                        ) : (
                          <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
                            زه عبیدالله غفاري یم، د لوګر ولایت اوسېدونکی. د ټکنالوژۍ، ویب پرافتیا, مصنوعي ځیرکتیا او زده کړې سره ځانګړې مینه لرم او هڅه کوم چې د دین، هېواد او پښتو ژبې لپاره ګټور ډیجیټلي خدمتونه وړاندې کړم.
                          </p>
                        )}
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

      {/* 5. GLASSMORPHIC BOTTOM SHEET (د بشپړ متن د لیدلو او شاته تګ ښکلی بار کښته شیټ) */}
      <AnimatePresence>
        {bottomSheetPost && (
          <>
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/65 z-[1001] backdrop-blur-xs"
              onClick={() => setBottomSheetPost(null)}
            />
            {/* Slide up sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 max-w-[580px] w-full mx-auto md:max-w-xl bg-slate-900/85 backdrop-blur-xl border-t border-white/15 rounded-t-3xl z-[1002] shadow-[0_-15px_40px_rgba(0,0,0,0.5)] flex flex-col max-h-[82vh]"
              style={{ direction: 'rtl' }}
            >
              {/* Drag handle block */}
              <div className="w-full flex justify-center py-3 select-none cursor-pointer" onClick={() => setBottomSheetPost(null)}>
                <div className="w-12 h-1.5 bg-slate-400/35 rounded-full" />
              </div>

              {/* Title Header */}
              <div className="px-5 pb-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 self-end">
                  <span className="text-[11px] text-indigo-400 font-sans font-bold">
                    {getRelativeTimeInPashto(bottomSheetPost.date, bottomSheetPost.timeLabel || 'وروستی')}
                  </span>
                </div>
                
                {/* Back / Close button */}
                <button
                  onClick={() => setBottomSheetPost(null)}
                  style={{ cursor: 'pointer' }}
                  className="p-1 px-3 bg-slate-800/80 hover:bg-rose-500/10 hover:text-rose-400 border border-slate-700/60 rounded-lg text-[10.5px] font-black text-slate-300 transition active:scale-95 flex items-center gap-1 self-start"
                >
                  ◀ شاته / بندول
                </button>
              </div>

              {/* Scrollable text content */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden relative mb-1">
                  <div className={`h-full ${tc.bg} rounded-full`} style={{ width: '100%' }} />
                </div>

                <div className="telegram-styles pr-1 leading-relaxed">
                  <BeautifulTelegramText
                    text={getPostTextWithFallback(bottomSheetPost)}
                    isDark={isDark}
                    fs={{ body: 'text-sm sm:text-base font-medium' }}
                    showExpander={false}
                  />
                </div>

                {/* Optional items such as audios within bottom sheet */}
                {bottomSheetPost.audioList && bottomSheetPost.audioList.length > 0 && (
                  <div className="space-y-2.5 pt-3 border-t border-white/5">
                    {bottomSheetPost.audioList.map((audioItem, idx) => {
                      const cleanTitle = getBeautifulAudioTitle(audioItem.title, bottomSheetPost.title, getPostTextWithFallback(bottomSheetPost), idx);
                      return (
                        <BeautifulAudioPlayer key={idx} url={audioItem.url} title={cleanTitle} duration={audioItem.duration} isDark={isDark} tc={tc} />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer safe area padding */}
              <div className="p-4 bg-slate-950/20 border-t border-white/15 flex justify-center safe-padding-bottom">
                <button
                  onClick={() => setBottomSheetPost(null)}
                  style={{ cursor: 'pointer' }}
                  className="w-full py-3 bg-indigo-650 hover:bg-indigo-600 text-white font-heavy rounded-2xl text-xs font-black shadow-lg shadow-indigo-600/20 transition active:scale-[0.98]"
                >
                  لوستل پای ته ورسېدل
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* G. IMMERSIVE REAL CAPTION GLASSY BOTTOM SHEET (د ویډیو او انځور د پوره متن لوستلو شیشه یي bottom sheet) */}
      <AnimatePresence>
        {overlayActiveText && (
          <>
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 z-[10001] backdrop-blur-sm"
              onClick={() => setOverlayActiveText(null)}
            />
            {/* Slide up bottom-sheet with drag-handle and back button */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 max-w-[580px] w-full mx-auto md:max-w-xl bg-slate-950/80 backdrop-blur-2xl border-t border-white/15 rounded-t-3xl z-[10002] shadow-[0_-15px_45px_rgba(0,0,0,0.6)] flex flex-col max-h-[80vh]"
              style={{ direction: 'rtl' }}
            >
              {/* Drag handle header bar */}
              <div 
                className="w-full flex justify-center py-3.5 select-none cursor-pointer" 
                onClick={() => setOverlayActiveText(null)}
              >
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>

              {/* Title and Close toolbar */}
              <div className="px-5 pb-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-[12px] text-indigo-300 font-bold font-sans">
                  د شعر پوره متن
                </span>
                
                {/* Back / Close button */}
                <button
                  onClick={() => setOverlayActiveText(null)}
                  style={{ cursor: 'pointer' }}
                  className="p-1 px-3 bg-white/10 hover:bg-rose-500/20 hover:text-rose-350 border border-white/10 rounded-lg text-xs font-black text-slate-100 transition active:scale-95 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>◀ تړنې / شاته</span>
                </button>
              </div>

              {/* Scrollable text body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 leading-relaxed text-right font-sans">
                <p className="text-white text-sm sm:text-base whitespace-pre-line font-medium leading-relaxed select-text">
                  {overlayActiveText}
                </p>
              </div>

              {/* Bottom dismissal button */}
              <div className="p-4 bg-black/30 border-t border-white/10 flex justify-center safe-padding-bottom">
                <button
                  onClick={() => setOverlayActiveText(null)}
                  style={{ cursor: 'pointer' }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-heavy rounded-2xl text-xs font-black shadow-lg shadow-indigo-600/20 transition active:scale-[0.98]"
                >
                  بیا کتنې ته ورګرځېدل
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FLOATING SCROLL TO TOP BUTTON (د پورته تللو ښکلې کارول اسانه بټنه) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top-floating-btn"
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 15 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            style={{ cursor: 'pointer' }}
            className={`fixed bottom-[105px] right-5 sm:right-7 z-[9900] w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg border outline-none transition-all duration-300 select-none ${
              isDark 
                ? 'bg-slate-900/95 border-indigo-500/35 text-indigo-400 hover:text-white hover:bg-indigo-600 shadow-[0_5px_20px_rgba(99,102,241,0.2)]' 
                : 'bg-white/95 border-indigo-150 text-indigo-600 hover:text-white hover:bg-indigo-600 shadow-[0_5px_16px_rgba(79,70,229,0.15)]'
            }`}
            title="پورته تللو بټنه"
          >
            <ChevronUp className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[3] animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ==========================================================
         STORIES IMMERSIVE FULLSCREEN VIEWER (د کیسو د کتلو پرمختللی د سمارټ فون د کیسو په شان سکرین)
         ========================================================== */}
      <AnimatePresence>
        {isStoryViewerOpen && storiesList.length > 0 && (() => {
          const activeStory = storiesList[activeStoryIndex];
          if (!activeStory) return null;

          const storyImage = activeStory.photoUrl || (activeStory.photoUrls && activeStory.photoUrls[0]);
          const storyVideo = activeStory.videoUrl;

          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 w-screen h-screen bg-black z-[10000] overflow-hidden flex flex-col justify-between select-none"
            >
              {/* Blurred background image/gradient for premium atmosphere */}
              <div className="absolute inset-0 z-0 opacity-40 blur-3xl pointer-events-none scale-110">
                {storyImage ? (
                  <img src={storyImage} alt="bg-ambient" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${tc.gradient}`} />
                )}
              </div>

              {/* Top Navigation Bar */}
              <div className="relative z-20 w-full pt-4 px-4 pb-2 bg-gradient-to-b from-black/85 via-black/40 to-transparent flex flex-col gap-3">
                
                {/* 1. Progress indicators */}
                <div className="flex gap-1.5 w-full">
                  {storiesList.map((_, index) => {
                    let progressPct = 0;
                    if (index < activeStoryIndex) progressPct = 100;
                    else if (index === activeStoryIndex) progressPct = storyProgress;

                    return (
                      <div key={index} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-[40ms] ease-linear"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* 2. Channel header */}
                <div className="flex items-center justify-between w-full" style={{ direction: 'rtl' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full p-[2.5px] bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-500 shadow-md">
                      <div className="w-full h-full rounded-full overflow-hidden border border-black/20">
                        <img
                          src={feedData?.channelInfo?.avatarUrl || "https://t.me/i/userpic/320/obaidapp.jpg"}
                          alt="channel-pic"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <h4 className="text-xs sm:text-sm font-black text-white drop-shadow">
                        پښتو ادبي خزانه
                      </h4>
                      <p className="text-[9px] text-slate-300 drop-shadow">
                        {getRelativeTimeInPashto(activeStory.date, activeStory.timeLabel || 'وروستی')}
                      </p>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setIsStoryViewerOpen(false)}
                    style={{ cursor: 'pointer' }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition active:scale-95"
                    title="تړل / Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Core Media Display */}
              <div className="relative flex-1 w-full flex items-center justify-center p-4">
                
                {/* Touches for navigating Left/Right */}
                <div
                  onMouseDown={() => setIsStoryPaused(true)}
                  onMouseUp={() => setIsStoryPaused(false)}
                  onTouchStart={() => setIsStoryPaused(true)}
                  onTouchEnd={() => setIsStoryPaused(false)}
                  className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextStory();
                  }}
                />
                
                <div
                  onMouseDown={() => setIsStoryPaused(true)}
                  onMouseUp={() => setIsStoryPaused(false)}
                  onTouchStart={() => setIsStoryPaused(true)}
                  onTouchEnd={() => setIsStoryPaused(false)}
                  className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevStory();
                  }}
                />

                {/* Content Layout */}
                <div className="w-full max-w-lg h-full flex flex-col justify-center items-center z-5">
                  {storyVideo ? (
                    <video
                      src={storyVideo}
                      autoPlay
                      playsInline
                      muted={false}
                      className="max-h-[70vh] max-w-full rounded-2xl shadow-2xl object-contain border border-white/10 bg-black/40"
                    />
                  ) : storyImage ? (
                    <img
                      src={storyImage}
                      alt="story-media"
                      referrerPolicy="no-referrer"
                      className="max-h-[70vh] max-w-full rounded-2xl shadow-2xl object-contain border border-white/10 bg-black/20"
                    />
                  ) : (
                    // Poetry background
                    <div className={`p-8 rounded-3xl bg-gradient-to-br ${tc.gradient} border border-white/15 shadow-[0_15px_50px_rgba(0,0,0,0.5)] text-center text-white max-w-sm mx-auto flex flex-col justify-center gap-4`}>
                      <Feather className="w-10 h-10 mx-auto text-white/50 animate-bounce-slow" />
                      <p className="text-sm font-black font-sans leading-relaxed tracking-wide select-text whitespace-pre-line text-center direction-rtl" style={{ direction: 'rtl' }}>
                        {activeStory.text ? activeStory.text.replace(/#سټوري|#ستوری|#story|#سټوريانې/g, '').trim() : ''}
                      </p>
                    </div>
                  )}

                  {/* Text caption overlay for media */}
                  {(storyVideo || storyImage) && activeStory.text && (
                    <div className="absolute bottom-6 inset-x-8 z-20" style={{ direction: 'rtl' }}>
                      <div className="p-4 sm:p-5 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-right flex flex-col gap-1 max-w-md mx-auto">
                        <p className="text-white text-xs sm:text-[13px] leading-relaxed font-sans font-semibold break-words text-right select-text whitespace-pre-line line-clamp-4">
                          {activeStory.text.replace(/#سټوري|#ستوری|#story|#سټوريانې/g, '').trim()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Premium Share Footer */}
              <div className="relative z-20 w-full pb-8 pt-4 px-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const shareUrl = activeStory.postUrl || window.location.href;
                    if (navigator.share) {
                      navigator.share({
                        title: 'د مينې ډېوه سټوري',
                        text: activeStory.text || '',
                        url: shareUrl
                      }).catch(err => console.log(err));
                    } else {
                      navigator.clipboard.writeText(shareUrl);
                      setToast('د سټوري پيوند ادرس کاپي شو!');
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                  className="px-6 py-2.5 bg-white/15 hover:bg-white/20 active:scale-95 text-white font-bold rounded-xl text-xs transition-all border border-white/10 flex items-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5 text-pink-400" />
                  <span>سټوري شریک کړئ</span>
                </button>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* GLOBAL FLOATING BACKGROUND AUDIO CONTROL (په شالید کې د غږیزو خپرونو وقفه او کنټرول) */}
      <GlobalFloatingAudioPlayer isDark={isDark} tc={tc} />
    </div>
  );
}

// Global Floating Dynamic Control Player (د هیواد په کچه خوځنده غږیز کنټرول)
function GlobalFloatingAudioPlayer({ isDark, tc }: { isDark: boolean; tc: any }) {
  const globalAudio = useGlobalAudio();
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(true);

  // Auto-hide title after 8 seconds of playing, but show on hover
  useEffect(() => {
    if (globalAudio.url) {
      setShowText(true);
      const timer = setTimeout(() => {
        setShowText(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [globalAudio.url]);

  // If there's no audio active, return null
  if (!globalAudio.url) return null;

  // Circle path math
  const radius = 28;
  const strokeWidth = 3.5;
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ * (1 - globalAudio.progress / 100);

  return (
    <AnimatePresence>
      {/* Wave ripples Keyframe Injector */}
      <style key="music-ripple-style">{`
        @keyframes musicRipple1 {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes musicRipple2 {
          0% { transform: scale(0.95); opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .music-ripple-1 {
          animation: musicRipple1 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .music-ripple-2 {
          animation: musicRipple2 3.0s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>

      <motion.div
        key="global-audio-fab"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
        className="fixed bottom-6 right-6 z-[99999] flex items-center gap-3 select-none flex-row-reverse"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* THE MAIN FAB CONTAINER WITH WAVES AND CIRCULAR PROGRESS */}
        <div className="relative w-[72px] h-[72px] flex items-center justify-center shrink-0">
          
          {/* Wave/Pulse Waves (wave څپې) behind the FAB button */}
          {globalAudio.isPlaying && (
            <>
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 pointer-events-none music-ripple-1" />
              <div className="absolute inset-0 rounded-full bg-indigo-500/10 pointer-events-none music-ripple-2" />
            </>
          )}

          {/* Circular Seeker/Progress Ring (دايروي سيګار) */}
          <svg className="absolute inset-0 -rotate-90 w-full h-full pointer-events-none z-10" viewBox="0 0 72 72">
            {/* Base/Track Circle */}
            <circle
              cx="36"
              cy="36"
              r={radius}
              className={`${isDark ? 'stroke-slate-800/80' : 'stroke-slate-200/90'}`}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Active Progress Circle */}
            <motion.circle
              cx="36"
              cy="36"
              r={radius}
              className="stroke-indigo-500"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circ}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.1, ease: 'linear' }}
              strokeLinecap="round"
            />
          </svg>

          {/* Central Play/Pause Action Button (سټاپ او شروع) */}
          <button
            onClick={() => {
              if (globalAudio.isPlaying) {
                pauseGlobalAudio();
              } else {
                playGlobalAudio(globalAudio.url, globalAudio.title, globalAudio.duration);
              }
            }}
            className={`relative z-20 w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              isDark 
                ? 'bg-slate-900 border border-slate-800 text-indigo-400 hover:text-indigo-300 hover:bg-slate-850' 
                : 'bg-white border border-slate-100 text-indigo-600 hover:text-indigo-500 hover:bg-slate-50'
            } active:scale-90`}
            style={{ cursor: 'pointer' }}
            title={globalAudio.isPlaying ? "وقف کړئ / Pause" : "وغږوئ / Play"}
          >
            {globalAudio.isPlaying ? (
              <Pause className="w-5 h-5 fill-current text-indigo-500" />
            ) : (
              <Play className="w-5 h-5 fill-current text-indigo-500 translate-x-[1px]" />
            )}
          </button>

          {/* Elegant Tiny Close Badge (Dismiss) */}
          <button
            onClick={stopAndCloseGlobalAudio}
            className="absolute -top-1 -right-1 z-30 w-5 h-5 rounded-full flex items-center justify-center border bg-rose-500 hover:bg-rose-600 border-white/20 text-white shadow-sm transition active:scale-95"
            style={{ cursor: 'pointer' }}
            title="بندول"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* SLIDING INFO PANEL (Next to FAB, to explain the title/progress) */}
        <AnimatePresence>
          {(showText || isHovered) && (
            <motion.div
              initial={{ opacity: 0, x: 25, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 25, scale: 0.95 }}
              transition={{ type: 'spring', damping: 18, stiffness: 220 }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-[22px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border backdrop-blur-md max-w-[200px] sm:max-w-[280px] text-right ${
                isDark 
                  ? 'bg-slate-950/90 border-slate-800/80 text-white shadow-slate-950/50' 
                  : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-slate-100/50'
              }`}
            >
              <div className="flex-1 min-w-0">
                <span className={`text-[11px] font-black block truncate mb-0.5 ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
                  {globalAudio.title || 'اصلي غږیزه برخه'}
                </span>
                
                <div className="flex items-center justify-end gap-1.5 select-none mt-0.5">
                  <span className="text-[9.5px] font-mono font-black text-slate-400">
                    {globalAudio.currentTime} / {globalAudio.totalDuration}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full ${globalAudio.isPlaying ? 'bg-indigo-500 animate-pulse' : 'bg-slate-400'}`} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  );
}
