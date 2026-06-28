/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { FeedResponse, TelegramPost } from './types';
import sidebarBannerImg from './assets/images/sidebar_banner_1782207302113.jpg';
import developerAvatarImg from './assets/images/developer_avatar_1782207316232.jpg';
import adminAvatarImg from './assets/images/admin_avatar_1782207985680.jpg';
import { 
  Eye, 
  Calendar, 
  RefreshCw, 
  Image as ImageIcon, 
  Info,
  AlertCircle,
  HelpCircle,
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
  Github,
  Facebook,
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
  BookmarkCheck,
  RotateCw,
  Archive,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Memory fallback for environments where window.localStorage throws SecurityError (like sandbox iframes)
const inMemoryStorage: Record<string, string> = {};

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn('Storage security/quota restriction active, reading via fallback cache:', e);
    }
    return inMemoryStorage[key] !== undefined ? inMemoryStorage[key] : null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn('Storage security/quota restriction active, writing via fallback cache:', e);
    }
    inMemoryStorage[key] = value;
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn('Storage security/quota restriction active, removing via fallback cache:', e);
    }
    delete inMemoryStorage[key];
  }
};

// Override localStorage in this file with safeLocalStorage to prevent Security Errors / Sandbox crashes
const localStorage = safeLocalStorage;

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
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 text-slate-100 shadow-slate-950/90' 
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

interface PashtoVerse {
  couplet: string;
  author: string;
  meaning: string;
  postRef?: any;
}

const pashtoVersesList: PashtoVerse[] = [
  {
    couplet: "که مې مخ ته لمر خاته هم مخ لولم\nبې له ستا د مخ ليدو نه مې لمر څه؟",
    author: "خوشحال خان خټک",
    meaning: "له ځانګړې او حقیقي مینې او ښکلا پرته، حتی د لمر روښنايي هم بې ګټې برېښي."
  },
  {
    couplet: "زه رحمان په خپله عاجزي کښې پاچا یم\nما ته سر د کبرجنو زنګیدلی وي",
    author: "عبدالرحمن بابا",
    meaning: "هر څوک چې عاجزي او ریښتینی تواضع غوره کړي، په زړونو باندې راج کوي."
  },
  {
    couplet: "وایي اغیار چې د دوزخ ژبه ده\nزه به جنت ته د پښتو سره ځم",
    author: "امیر حمزه خان شینواری",
    meaning: "د خپل کلتور، ژبې او باوقاره هویت سره ژوره او د زړه له تلې غښتلې مینه."
  },
  {
    couplet: "ستا د سترګو د کتو په بیه ګرانه\nکه زما نه څوک دا ټول جهان غواړي، ویې غواړه!",
    author: "غني خان",
    meaning: "مینه تر بل هر مادي او معنوي شتمنۍ ارزښتمنه او لوړه ده."
  },
  {
    couplet: "د وطن مینه په هر زړه کې نڅیږي\nلکه مینه چې د مور په ځیګر کې وي",
    author: "ملنګ جان",
    meaning: "د هیواد مینه مقدسه او لکه د مور د غېږې غوندې بې حده بې غرضه وي."
  },
  {
    couplet: "که په غره باندې سيلاب د مصیبت راشي\nمخ اړول د پښتون لاره نه ده",
    author: "پښتو متل / شعر",
    meaning: "په سختیو او ازمېښتونو کې صبر، همت، مېړانه او د زړورتوب عالي فلسفه."
  },
  {
    couplet: "ګل به د بلبل په سر زنګیږي خوشحالي به وي\nسوله چې په کلي کې زموږ غېږه خپره کړي",
    author: "ولسي شعر",
    meaning: "د خپلو خلکو لپاره تلپاتې سوله، همغږي او د صمیمیت غوښتنه."
  },
  {
    couplet: "چې په خپله مینه پاکه پاچاهي کا\nد جهان تخت ورته هیڅ په نظر نه راځي",
    author: "رحمان بابا",
    meaning: "اصلي شتمني قناعت او د زړه د پاکۍ او ریښتنې مینې احساس دی."
  }
];

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

  // 1. Format the text beautifully to ensure proper spacing on clumped/glued texts, keeping hashtags
  const formattedText = beautifullyFormatPashtoText(text, true);

  // 2. Normalize literal \n, double escaped \\n, HTML line breaks, and empty lines
  const cleanText = formattedText
    .replace(/\\n/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  // Enforce exactly 2 lines limit if onReadMoreClick is provided or if showExpander is true to keep list texts at two rows
  const actualLimit = onReadMoreClick ? 2 : (showExpander ? 2 : limitLines);

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
    }
    return elements;
  };

  // Extract all hashtags from complete cleanText and find those that are currently hidden
  const allHashtags = Array.from(new Set(cleanText.match(/(#[\u0600-\u06FFa-zA-Z0-9_]+)/g) || []));
  const displayedHashtags = Array.from(new Set(displayedText.match(/(#[\u0600-\u06FFa-zA-Z0-9_]+)/g) || []));
  const missingHashtags = (needsTruncation && !expanded) ? allHashtags.filter(tag => !displayedHashtags.includes(tag)) : [];

  return (
    <div className="space-y-2.5 text-right w-full select-text" style={{ direction: 'rtl' }}>
      {(() => {
        const linesToRender = displayedText.split('\n');
        return linesToRender.map((line, idx) => {
          if (line.trim() === '') {
            return <div key={idx} className="h-1.5 sm:h-2" />;
          }
          const isLastLine = idx === linesToRender.length - 1;
          return (
            <p 
              key={idx}
              className={`${fs?.body || 'text-[12.5px] sm:text-[13px]'} ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              } break-words leading-[2.1] sm:leading-[2.25] pr-1 font-medium font-sans text-right`}
            >
              {renderWithHashtags(line, isLastLine && needsTruncation)}
            </p>
          );
        });
      })()}

      {missingHashtags.length > 0 && (
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
      )}

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
          ? 'bg-slate-900/80 border-slate-800/70 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-slate-850/90' 
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
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
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
    
    // Save to global window state so Reels can pick it up
    (window as any).lastWatchedVideo = {
      videoUrl: url,
      currentTime: cur,
      timestamp: Date.now()
    };
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
        onWaiting={() => setVideoLoading(true)}
        onPlaying={() => setVideoLoading(false)}
        onCanPlay={() => setVideoLoading(false)}
        onLoadStart={() => { setVideoLoading(true); setVideoError(false); }}
        onError={() => { setVideoLoading(false); setVideoError(true); }}
        preload="auto"
        playsInline
      />
      
      {/* 1. Video Loading Shimmer Overlay */}
      {videoLoading && !videoError && (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center pointer-events-none z-10 animate-fade-in">
          {/* Shimmering backdrop simulating the thumbnail loading */}
          <div className="absolute inset-0 shimmer opacity-40" />
          {/* Stylish loading center spinner */}
          <div className="relative flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-lg" />
            <span className="text-[10px] font-sans font-bold text-slate-400">ويډيو بارګیري کېږي...</span>
          </div>
        </div>
      )}

      {/* 2. Video Error / Offline state */}
      {videoError && (
        <div className="absolute inset-0 bg-slate-950 border border-slate-900 flex flex-col items-center justify-center p-4 text-center z-15 select-none">
          <div className="p-3 rounded-full bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 mb-2.5 animate-pulse shrink-0">
            <AlertCircle className="w-6 h-6 text-indigo-400" />
          </div>
          <h4 className="text-xs font-black text-white">ويډيو پورته نشوه</h4>
          <p className="text-[10px] text-slate-400 max-w-xs mt-1 leading-relaxed">د ويډیو د فایل خلاصولو کې تېروتنه رامنځته شوه. شونې ده چې انټرنیټ وصل نه وي.</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setVideoError(false);
              setVideoLoading(true);
              if (videoRef.current) {
                videoRef.current.load();
              }
            }}
            className="mt-2.5 px-3 py-1.5 text-[9px] font-black rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 transition active:scale-95 cursor-pointer border border-indigo-500/20"
          >
            بيا هڅه وکړئ
          </button>
        </div>
      )}
      
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
            className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur border border-white/20 flex items-center justify-center text-white scale-100 hover:scale-105 active:scale-95 transition cursor-pointer pointer-events-auto shadow-lg"
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
  className?: string;
  alt?: string;
  simple?: boolean;
  [key: string]: any;
}

function CachedImage({ src, className, alt = 'image-display', simple = false, ...props }: CachedImageProps) {
  const cachedSrc = useCachedUrl(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [src]);

  const isCircle = className?.includes('rounded-full');

  return (
    <div className={`relative overflow-hidden ${className || ''}`} style={props.style}>
      {/* 1. Shimmer effect during loading */}
      {loading && !error && (
        <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center z-10 w-full h-full">
          <div className="w-full h-full shimmer opacity-65" />
        </div>
      )}

      {/* 2. Error Fallback state */}
      {error && (
        <div className="absolute inset-0 bg-slate-950 flex items-center justify-center z-10 w-full h-full">
          <div className="w-full h-full shimmer opacity-80 bg-gradient-to-tr from-slate-900 to-slate-950 flex flex-col items-center justify-center p-2 text-center select-none">
            {isCircle ? (
              <Feather className="w-4 h-4 text-slate-600/60 animate-pulse" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1">
                <Feather className="w-6 h-6 text-slate-600/40 animate-pulse" />
                <span className="text-[9px] font-sans font-black tracking-widest text-slate-550/50 uppercase">د مېنې ډېوه</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Real Image */}
      {!error && (
        <img
          src={cachedSrc || src}
          alt={alt}
          {...props}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          referrerPolicy="no-referrer"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
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

/* Global helper function to check if browser notification system is supported safely */
export function isNotificationSupportedSafely(): boolean {
  try {
    if (typeof window !== 'undefined' && 'Notification' in window && (window as any).Notification) {
      return true;
    }
  } catch (e) {
    console.warn('Notification support check failed in sandbox:', e);
  }
  return false;
}

/* Global helper function to safely verify notification permission inside restricted cross-origin iframes */
export function getNotificationPermissionSafely(): string {
  try {
    if (isNotificationSupportedSafely()) {
      return (window as any).Notification.permission;
    }
  } catch (e) {
    console.warn('Notification.permission is inaccessible in this environment:', e);
  }
  return 'denied';
}

/* Global helper function for identifying stories */
export function isStoryPost(post: any) {
  if (!post || !post.text) return false;
  const lowerText = post.text.toLowerCase();
  return lowerText.includes('#سټوري') || lowerText.includes('#ستوری') || lowerText.includes('#story') || lowerText.includes('#سټوريانې');
}

/* Global helper function to get high-density premium video thumbnails */
export function getVideoThumbnail(post: any | null): string {
  if (!post) {
    return "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=80";
  }
  if (post.videoThumbUrl) return post.videoThumbUrl;
  if (post.photoUrl) return post.photoUrl;
  if (post.photoUrls && post.photoUrls[0]) return post.photoUrls[0];
  
  // Select beautiful cinematographic Unsplash fallbacks based on ID string
  const fallbacks = [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80"
  ];
  
  const idStr = String(post.id || '');
  const charSum = idStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return fallbacks[charSum % fallbacks.length];
}

/* Global helper function for identifying novels and their parts */
export function getIsNovelOrNovelPart(post: any | null): boolean {
  if (!post || !post.text) return false;
  const text = post.text.toLowerCase();
  
  // 1. If it's explicitly a Novel Profile
  if (isPostNovelProfileGlobal(post)) return true;
  
  // 2. Contains novel or roman tags
  const hashtags = getPostHashtags(post.text);
  const novelTags = ['#ناول', '#novel', '#رومان', '#ناول_برخه', '#رومان_برخه', '#ناول_مشترک', '#مشترک_ناول'];
  const hasNovelTag = hashtags.some(tag => novelTags.includes(tag));
  if (hasNovelTag) return true;

  // 3. Fallback: text contains hashtag #ناول or #رومان or #ناول_مشترک or #مشترک_ناول
  if (text.includes('#ناول') || text.includes('#رومان') || text.includes('#ناول_مشترک') || text.includes('#مشترک_ناول')) {
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
  return beautifullyFormatPashtoText(text, false);
}

/* Beautiful inline SVGs for social icons to be accessible globally */
export const WhatsAppIcon = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.335 4.97L2 22l5.233-1.371a9.957 9.957 0 004.779 1.218h.004c5.506 0 9.989-4.478 9.99-9.984A9.993 9.993 0 0012.012 2zm5.727 14.173c-.25.702-1.25 1.285-1.733 1.348-.483.064-.966.113-3.111-.733a11.111 11.111 0 01-4.833-4.246c-.95-1.272-1.533-2.733-1.533-4.246 0-1.728.895-2.584 1.218-2.918.322-.334.717-.417.95-.417.234 0 .467.013.667.025.213.013.433-.075.602.321.213.513.717 1.742.784 1.88.067.138.113.3.012.5-.1.2-.15.321-.3.5-.15.178-.312.3-.446.463-.15.178-.313.375-.125.7.188.325.833 1.371 1.783 2.221.95.85 1.75 1.112 2.083 1.25.334.138.533.113.733-.112.2-.226.85-.984 1.084-1.321.233-.338.466-.275.783-.163.317.112 2.017.996 2.367 1.171.35.175.583.263.667.413.083.15.083.863-.167 1.563z"/>
  </svg>
);

export const TelegramIcon = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .29z"/>
  </svg>
);

/* Global helper function for extracting links and text from developer/admin posts */
export function extractProfileLinksAndText(rawText: string, htmlText?: string) {
  if (!rawText && !htmlText) return { cleanText: '', links: [] };
  
  // Robust regex to match any URLs, emails, or custom contact schemas
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|mailto:[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi;
  const linksSet = new Set<string>();
  
  if (rawText) {
    const matches = rawText.match(urlRegex);
    if (matches) {
      matches.forEach(url => {
        let cleanUrl = url;
        // Strip trailing punctuation from URL
        while (cleanUrl && (cleanUrl.endsWith('.') || cleanUrl.endsWith(',') || cleanUrl.endsWith(')') || cleanUrl.endsWith(']') || cleanUrl.endsWith('؛') || cleanUrl.endsWith('،'))) {
          cleanUrl = cleanUrl.slice(0, -1);
        }
        if (cleanUrl) {
          const lowerUrl = cleanUrl.toLowerCase();
          
          // Handle https://mailto: or http://mailto: typo
          if (lowerUrl.startsWith('https://mailto:')) {
            cleanUrl = 'mailto:' + cleanUrl.slice(15);
          } else if (lowerUrl.startsWith('http://mailto:')) {
            cleanUrl = 'mailto:' + cleanUrl.slice(14);
          }
          
          // If it's a pure email (contains @, has no mailto: or http(s):// prefix), make it mailto:
          const nowLower = cleanUrl.toLowerCase();
          if (nowLower.includes('@') && !nowLower.startsWith('mailto:') && !nowLower.startsWith('http://') && !nowLower.startsWith('https://')) {
            cleanUrl = 'mailto:' + cleanUrl;
          }

          // Ensure protocol exists for absolute links (except tel: and mailto:)
          const finalLower = cleanUrl.toLowerCase();
          if (!finalLower.startsWith('http://') && !finalLower.startsWith('https://') && !finalLower.startsWith('tel:') && !finalLower.startsWith('mailto:')) {
            cleanUrl = 'https://' + cleanUrl;
          }
          linksSet.add(cleanUrl);
        }
      });
    }
  }

  if (htmlText) {
    const hrefRegex = /href=["']([^"']+)["']/gi;
    let match;
    while ((match = hrefRegex.exec(htmlText)) !== null) {
      let cleanUrl = match[1];
      if (cleanUrl) {
        // Strip trailing punctuation
        while (cleanUrl && (cleanUrl.endsWith('.') || cleanUrl.endsWith(',') || cleanUrl.endsWith(')') || cleanUrl.endsWith(']') || cleanUrl.endsWith('؛') || cleanUrl.endsWith('،'))) {
          cleanUrl = cleanUrl.slice(0, -1);
        }
        
        const lowerUrl = cleanUrl.toLowerCase();
        if (lowerUrl.startsWith('https://mailto:')) {
          cleanUrl = 'mailto:' + cleanUrl.slice(15);
        } else if (lowerUrl.startsWith('http://mailto:')) {
          cleanUrl = 'mailto:' + cleanUrl.slice(14);
        }
        
        const nowLower = cleanUrl.toLowerCase();
        if (nowLower.includes('@') && !nowLower.startsWith('mailto:') && !nowLower.startsWith('http://') && !nowLower.startsWith('https://')) {
          cleanUrl = 'mailto:' + cleanUrl;
        }

        const finalLower = cleanUrl.toLowerCase();
        if (!finalLower.startsWith('http://') && !finalLower.startsWith('https://') && !finalLower.startsWith('tel:') && !finalLower.startsWith('mailto:')) {
          cleanUrl = 'https://' + cleanUrl;
        }
        linksSet.add(cleanUrl);
      }
    }
  }

  // Remove URLs completely
  let cleanText = rawText ? rawText.replace(urlRegex, '') : '';
  // Remove all hashtags completely
  cleanText = cleanText.replace(/#[\u0600-\u06FFa-zA-Z0-9_]+/g, '');
  
  // Deduplicate consecutive or identical paragraphs/sentences/clauses
  cleanText = cleanText.replace(/[ \t]+/g, ' ').trim();
  
  // Try splitting the entire cleanText in half to check if it's duplicated (very common when text is doubled)
  const mid = Math.floor(cleanText.length / 2);
  if (cleanText.length > 20) {
    for (let offset = -15; offset <= 15; offset++) {
      const splitPoint = mid + offset;
      if (splitPoint > 5 && splitPoint < cleanText.length - 5) {
        const firstHalf = cleanText.substring(0, splitPoint).trim();
        const secondHalf = cleanText.substring(splitPoint).trim();
        
        const norm1 = firstHalf.replace(/[\s\p{P}]/gu, '');
        const norm2 = secondHalf.replace(/[\s\p{P}]/gu, '');
        if (norm1 === norm2 && norm1.length > 10) {
          cleanText = firstHalf;
          break;
        }
      }
    }
  }

  // Split into paragraphs and deduplicate paragraphs/sentences
  const paragraphs = cleanText.split('\n');
  const uniqueParagraphs: string[] = [];
  const seenParagraphs = new Set<string>();
  
  for (let para of paragraphs) {
    para = para.trim();
    if (!para) {
      if (uniqueParagraphs.length > 0 && uniqueParagraphs[uniqueParagraphs.length - 1] !== '') {
        uniqueParagraphs.push('');
      }
      continue;
    }
    
    // Normalize paragraph for duplicate check
    const normalizedPara = para.replace(/[\s\p{P}]/gu, '').toLowerCase();
    
    // Check if paragraph is similar or substring of already seen paragraphs
    let isDuplicate = false;
    for (const seen of seenParagraphs) {
      if (seen.includes(normalizedPara) || normalizedPara.includes(seen)) {
        isDuplicate = true;
        break;
      }
    }
    if (isDuplicate) {
      continue;
    }
    seenParagraphs.add(normalizedPara);
    
    // Check if the paragraph itself consists of duplicate halves (even without punctuation)
    const pMid = Math.floor(para.length / 2);
    let pResolved = para;
    if (para.length > 20) {
      for (let offset = -10; offset <= 10; offset++) {
        const splitPoint = pMid + offset;
        if (splitPoint > 5 && splitPoint < para.length - 5) {
          const firstHalf = para.substring(0, splitPoint).trim();
          const secondHalf = para.substring(splitPoint).trim();
          
          const norm1 = firstHalf.replace(/[\s\p{P}]/gu, '').toLowerCase();
          const norm2 = secondHalf.replace(/[\s\p{P}]/gu, '').toLowerCase();
          if (norm1 === norm2 && norm1.length > 8) {
            pResolved = firstHalf;
            break;
          }
        }
      }
    }
    
    // Also deduplicate sentences/phrases inside the paragraph split by common punctuation/spaces
    const sentences = pResolved.split(/(?<=[.!؟?])\s+/);
    const uniqueSentences: string[] = [];
    const seenSentences = new Set<string>();
    
    for (let sentence of sentences) {
      sentence = sentence.trim();
      if (!sentence) continue;
      
      const normalizedSentence = sentence.replace(/[\s\p{P}]/gu, '').toLowerCase();
      
      let isSentenceDup = false;
      for (const seenS of seenSentences) {
        if (seenS.includes(normalizedSentence) || normalizedSentence.includes(seenS)) {
          isSentenceDup = true;
          break;
        }
      }
      if (isSentenceDup) {
        continue;
      }
      seenSentences.add(normalizedSentence);
      uniqueSentences.push(sentence);
    }
    
    uniqueParagraphs.push(uniqueSentences.join(' '));
  }

  cleanText = uniqueParagraphs.join('\n').trim();

  return { cleanText, links: Array.from(linksSet) };
}

/* Reusable, beautifully-styled component to render social & link icons that work flawlessly in light and dark mode */
export function ProfileSocialLinks({ links }: { links: string[] }) {
  if (!links || links.length === 0) return null;
  
  return (
    <div className="mt-5 pt-4 border-t border-slate-500/10 flex justify-center items-center gap-5 flex-wrap">
      {links.map((link, idx) => {
        let IconComponent: any = ExternalLink;
        let btnStyle = "";
        let title = "تړونی وګورئ";
        const lower = link.toLowerCase();

        if (lower.includes('wa.me') || lower.includes('whatsapp')) {
          IconComponent = WhatsAppIcon;
          btnStyle = "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-500/30 dark:hover:bg-emerald-500 dark:hover:text-white dark:hover:border-emerald-500 shadow-md shadow-emerald-500/5 hover:shadow-lg hover:shadow-emerald-500/20";
          title = "واټساپ اړیکه";
        } else if (lower.includes('t.me') || lower.includes('telegram')) {
          IconComponent = TelegramIcon;
          btnStyle = "bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-500 hover:text-white hover:border-sky-500 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-500/30 dark:hover:bg-sky-500 dark:hover:text-white dark:hover:border-sky-500 shadow-md shadow-sky-500/5 hover:shadow-lg hover:shadow-sky-500/20";
          title = "ټیلیګرام";
        } else if (lower.includes('github')) {
          IconComponent = Github;
          btnStyle = "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-200 dark:hover:text-slate-900 dark:hover:border-slate-200 shadow-md shadow-slate-500/5 hover:shadow-lg";
          title = "ګېټ هب";
        } else if (lower.includes('facebook') || lower.includes('fb.com')) {
          IconComponent = Facebook;
          btnStyle = "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-500/30 dark:hover:bg-blue-500 dark:hover:text-white dark:hover:border-blue-500 shadow-md shadow-blue-500/5 hover:shadow-lg hover:shadow-blue-500/20";
          title = "فیسبوک";
        } else if (lower.startsWith('mailto:') || lower.includes('mail')) {
          IconComponent = Mail;
          btnStyle = "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white hover:border-rose-600 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-500/30 dark:hover:bg-rose-500 dark:hover:text-white dark:hover:border-rose-500 shadow-md shadow-rose-500/5 hover:shadow-lg hover:shadow-rose-500/20";
          title = "بریښنالیک";
        } else if (lower.includes('tel:') || lower.match(/phone|\+93/)) {
          IconComponent = Phone;
          btnStyle = "bg-teal-50 text-teal-600 border border-teal-200 hover:bg-teal-600 hover:text-white hover:border-teal-600 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-500/30 dark:hover:bg-teal-500 dark:hover:text-white dark:hover:border-teal-500 shadow-md shadow-teal-500/5 hover:shadow-lg hover:shadow-teal-500/20";
          title = "تلیفون";
        } else {
          btnStyle = "bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-500/30 dark:hover:bg-indigo-500 dark:hover:text-white dark:hover:border-indigo-500 shadow-md shadow-indigo-500/5 hover:shadow-lg hover:shadow-indigo-500/20";
        }

        return (
          <a
            key={idx}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 border hover:rotate-2 ${btnStyle}`}
          >
            <IconComponent className="w-6 h-6 shrink-0" />
          </a>
        );
      })}
    </div>
  );
}

/* Helper to format clumped/glued Pashto text into beautiful, spaced paragraphs, dialogue stanzas, and metadata lines */
export function beautifullyFormatPashtoText(text: string, keepHashtags: boolean = false): string {
  if (!text) return '';

  let clean = text;
  if (!keepHashtags) {
    // Strips hashtag words but retains punctuation or non-hashtag characters
    clean = clean.replace(/#[^\s#\.,'\?\!\"🗺️✨🎙️🎵📚✍️():؛،«»\-]+/g, '');
  }

  // Normalize all escaped/literal forms of newline and HTML breaks
  clean = clean
    .replace(/\\n/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  // Inject logical paragraph breaks before and after clear metadata lines (emoji prefixes)
  // so they are guaranteed to stand out on separate lines from previous and future text blocks.
  const markers = [
    { pattern: /(📘\s*(کتاب|کتابونه|ناول)\s*:?)/gi, replaceWith: '\n\n$1' },
    { pattern: /(📚\s*(موضوع|موضوعات|برخه)\s*:?)/gi, replaceWith: '\n\n$1' },
    { pattern: /(✍️\s*(ليکوال|لیکوال|ژباړن|شاعر)\s*:?)/gi, replaceWith: '\n\n$1' },
    { pattern: /(🎤\s*(غږ|راوي|انځورګر)\s*:?)/gi, replaceWith: '\n\n$1' },
    { pattern: /(🎙️\s*(وړاندې\s*کوونکی|ویاند)\s*:?)/gi, replaceWith: '\n\n$1' },
    { pattern: /(📖\s*(برخه|لوستل|سرلیک|څپرکی)\s*:?)/gi, replaceWith: '\n\n$1' },
    { pattern: /(✨\s*(څپرکی|ځانګړتیاوې|خوندور)\s*:?)/gi, replaceWith: '\n\n$1' },
    { pattern: /(📌\s*(د\s*دې\s*اثر\s*خلاصه\s*او\s*پېژندنه|پېژندنه|پیژندنه|نوټ|خلاصه)\s*:?)/gi, replaceWith: '\n\n$1' },
    { pattern: /(👇\s*(په\s*دې\s*برخه\s*کې|لاندې\s*برخه\s*کې|اورېدل|لوستل|تړون)\s*:?)/gi, replaceWith: '\n\n$1' },
    { pattern: /(📁\s*(ډلبندي|کټګوري)\s*:?)/gi, replaceWith: '\n\n$1' },
    { pattern: /(🔗\s*(تړون|رابطه|لینک)\s*:?)/gi, replaceWith: '\n\n$1' }
  ];

  markers.forEach(({ pattern, replaceWith }) => {
    clean = clean.replace(pattern, replaceWith);
  });

  // Split into lines to clean up and insert spacing for narrative dialogues
  const lines = clean.split('\n');
  const processed: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      if (processed.length > 0 && processed[processed.length - 1] !== '') {
        processed.push('');
      }
      continue;
    }

    // Story Dialogues: often start with symbols like —, -, or are enclosed in quotes « ... »
    // Dialogue lines are extremely important to represent on clean separate lines to avoid clumped novels
    const isDialogue = line.startsWith('—') || line.startsWith('-') || line.startsWith('«');
    
    if (isDialogue) {
      // If previous line wasn't empty, inject an empty line to start a fresh dialogue paragraph
      if (processed.length > 0 && processed[processed.length - 1] !== '') {
        processed.push('');
      }
      processed.push(line);
      continue;
    }

    processed.push(line);
  }

  // Collapse 3 or more consecutive empty lines into exactly one empty line
  const merged = processed.join('\n').replace(/\n{3,}/g, '\n\n');
  return merged.trim();
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

function ShimmerPageLoader({ isDark, viewKey = 'dashboard' }: { isDark: boolean; viewKey?: string }) {
  const shimmerClass = isDark ? 'shimmer' : 'shimmer-light';
  const cardBgClass = isDark ? 'bg-slate-900/35 border-slate-850/40' : 'bg-white border-slate-100 shadow-sm';

  // 1. STORY/NOVEL INDIVIDUAL CHAPTER TEXT READER PAGE SHIMMER
  if (viewKey.startsWith('chapter_')) {
    return (
      <div className="space-y-6 w-full text-right font-sans select-none" style={{ direction: 'rtl' }}>
        {/* Header bar mimic */}
        <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${shimmerClass} shrink-0`} />
            <div className={`h-3 w-32 rounded-full ${shimmerClass}`} />
          </div>
          <div className="flex gap-2">
            <div className={`w-7 h-7 rounded-lg ${shimmerClass}`} />
            <div className={`w-24 h-7 rounded-sm ${shimmerClass}`} />
          </div>
        </div>

        {/* Scroll details progress bar */}
        <div className="space-y-2 px-1">
          <div className="flex items-center justify-between">
            <div className={`h-3 w-24 rounded-full ${shimmerClass}`} />
            <div className={`h-3 w-16 rounded-full ${shimmerClass}`} />
          </div>
          <div className={`w-full h-2 rounded-full ${shimmerClass}`} />
        </div>

        {/* Typography settings panel wrapper */}
        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/30 border-slate-800/40' : 'bg-slate-50 border-slate-200'} flex items-center justify-between gap-3`}>
          <div className="flex gap-2">
            <div className={`w-14 h-8 rounded-xl ${shimmerClass}`} />
            <div className={`w-14 h-8 rounded-xl ${shimmerClass}`} />
          </div>
          <div className="flex gap-1.5">
            <div className={`w-7 h-7 rounded-full ${shimmerClass}`} />
            <div className={`w-7 h-7 rounded-full ${shimmerClass}`} />
            <div className={`w-7 h-7 rounded-full ${shimmerClass}`} />
          </div>
        </div>

        {/* Dense readable story paragraphs blocks */}
        <div className={`p-5 rounded-3xl border ${cardBgClass} space-y-4`}>
          <div className="space-y-2.5">
            <div className={`h-3.5 w-full rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-11/12 rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-full rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-[96.5%] rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-10/12 rounded-full ${shimmerClass}`} />
          </div>
          <div className="pt-3 space-y-2.5">
            <div className={`h-3.5 w-full rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-11/12 rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-[94%] rounded-full ${shimmerClass}`} />
            <div className={`h-3 w-1/3 rounded-full ${shimmerClass}`} />
          </div>
        </div>
      </div>
    );
  }

  // 2. DETAILED POST SCREEN / NOVEL INDEX PROFILE DISPLAY SHIMMER
  if (viewKey.startsWith('post_')) {
    return (
      <div className="space-y-6 w-full text-right font-sans select-none" style={{ direction: 'rtl' }}>
        {/* Back navigation header line */}
        <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
          <div className={`w-8 h-8 rounded-lg ${shimmerClass}`} />
          <div className={`h-3 w-36 rounded-full ${shimmerClass}`} />
        </div>

        {/* Cover widescreen picture poster */}
        <div className={`w-full aspect-[16/9] sm:h-56 rounded-3xl ${shimmerClass}`} />

        {/* Description body card */}
        <div className={`p-5 rounded-3xl border ${cardBgClass} space-y-4`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${shimmerClass} shrink-0`} />
            <div className="space-y-1.5 flex-1">
              <div className={`h-3.5 w-32 rounded-full ${shimmerClass}`} />
              <div className={`h-2.5 w-16 rounded-full ${shimmerClass}`} />
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className={`h-3.5 w-[94%] rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-[98%] rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-[85%] rounded-full ${shimmerClass}`} />
          </div>
        </div>

        {/* Audio players skeleton rows */}
        <div className="space-y-3">
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950/40 border-slate-900' : 'bg-slate-50 border-slate-200'} flex items-center gap-4`}>
            <div className={`w-10 h-10 rounded-full ${shimmerClass} shrink-0`} />
            <div className="space-y-2 flex-1">
              <div className={`h-3 w-2/5 rounded-full ${shimmerClass}`} />
              <div className={`h-2 w-full rounded-full ${shimmerClass}`} />
            </div>
          </div>
        </div>

        {/* Chapters list layout block */}
        <div className="space-y-3 pt-3">
          <div className={`h-3 w-28 rounded-full ${shimmerClass}`} />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900/20 border-slate-800/40' : 'bg-slate-50/60 border-slate-200'} flex items-center justify-between`}>
                <div className={`w-5 h-5 rounded-md ${shimmerClass}`} />
                <div className={`h-3 w-16 rounded-full ${shimmerClass}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. NOVELS & STORIES CHANNEL BROWSER SHIMMER
  if (viewKey === 'novels') {
    return (
      <div className="space-y-6 w-full text-right font-sans select-none" style={{ direction: 'rtl' }}>
        {/* Navigation header row */}
        <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
          <div className={`w-24 h-7 rounded-xl ${shimmerClass}`} />
          <div className="flex items-center gap-2">
            <div className={`h-3.5 w-36 rounded-full ${shimmerClass}`} />
            <div className={`w-8 h-8 rounded-xl ${shimmerClass}`} />
          </div>
        </div>

        {/* Multiple Carousel rows with book shape covers */}
        {[1, 2].map((secIndex) => (
          <div key={secIndex} className="space-y-4">
            {/* Horizontal heading row */}
            <div className="flex items-center justify-between px-2">
              <div className={`h-3.5 w-[8rem] rounded-full ${shimmerClass}`} />
              <div className="flex items-center gap-2.5">
                <div className={`h-3.5 w-24 rounded-full ${shimmerClass}`} />
                <div className={`w-7 h-7 rounded-lg ${shimmerClass}`} />
              </div>
            </div>

            {/* Book cards horizontal scrolling stream */}
            <div className="flex flex-row gap-3.5 overflow-hidden">
              {[1, 2, 3].map((cardId) => (
                <div 
                  key={cardId} 
                  className={`w-[115px] sm:w-[135px] aspect-[2/3.1] shrink-0 rounded-2xl ${shimmerClass} relative flex flex-col justify-end p-3`}
                >
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-11/12 bg-black/35 rounded-full" />
                    <div className="h-2 w-3/5 bg-black/20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 4. APP SETTINGS PAGE SHIMMER
  if (viewKey === 'settings') {
    return (
      <div className="space-y-6 w-full text-right font-sans select-none" style={{ direction: 'rtl' }}>
        {/* Header navigation bar */}
        <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
          <div className={`w-16 h-7 rounded-xl ${shimmerClass}`} />
          <div className={`h-3.5 w-28 rounded-full ${shimmerClass}`} />
        </div>

        {/* Interactive sliders & preferences panel */}
        <div className={`p-5 rounded-3xl border ${cardBgClass} space-y-6`}>
          <div className="space-y-4">
            <div className={`h-3 w-20 rounded-full ${shimmerClass}`} />
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between pt-1">
                <div className={`w-10 h-5 rounded-full ${shimmerClass}`} />
                <div className="space-y-1.5 flex-1 pr-4">
                  <div className={`h-3.5 w-28 rounded-full ${shimmerClass}`} />
                  <div className={`h-2 w-20 rounded-full ${shimmerClass}`} />
                </div>
              </div>
            ))}
          </div>

          <div className={`h-[1px] w-full ${isDark ? 'bg-slate-800/40' : 'bg-slate-100'}`} />

          <div className="space-y-4">
            <div className={`h-3 w-24 rounded-full ${shimmerClass}`} />
            <div className="grid grid-cols-3 gap-2">
              <div className={`h-10 rounded-xl ${shimmerClass}`} />
              <div className={`h-10 rounded-xl ${shimmerClass}`} />
              <div className={`h-10 rounded-xl ${shimmerClass}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. ABOUT APP INFORMATION PAGE SHIMMER
  if (viewKey === 'about') {
    return (
      <div className="space-y-6 w-full text-right font-sans select-none" style={{ direction: 'rtl' }}>
        {/* Header bar */}
        <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
          <div className={`w-16 h-7 rounded-xl ${shimmerClass}`} />
          <div className={`h-3.5 w-24 rounded-full ${shimmerClass}`} />
        </div>

        {/* Profile container card */}
        <div className={`p-6 rounded-3xl border ${cardBgClass} flex flex-col items-center text-center space-y-5`}>
          <div className={`w-24 h-24 rounded-full ${shimmerClass} border-2 border-indigo-500/25`} />
          <div className="space-y-2 flex flex-col items-center">
            <div className={`h-4 w-40 rounded-full ${shimmerClass}`} />
            <div className={`h-2.5 w-48 rounded-full ${shimmerClass}`} />
          </div>

          <div className="flex flex-wrap justify-center gap-2 w-full pt-2">
            <div className={`h-8 w-44 rounded-xl ${shimmerClass}`} />
            <div className={`h-8 w-48 rounded-xl ${shimmerClass}`} />
          </div>

          {/* Biography paragraph text */}
          <div className="w-full space-y-3 pt-4 border-t border-slate-500/10 text-right">
            <div className={`h-3.5 w-full rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-11/12 rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-9/12 rounded-full ${shimmerClass}`} />
          </div>
        </div>
      </div>
    );
  }

  // 6. CONTACT AND FEEDBACK CHANNELS PAGE SHIMMER
  if (viewKey === 'contact') {
    return (
      <div className="space-y-6 w-full text-right font-sans select-none" style={{ direction: 'rtl' }}>
        {/* Header */}
        <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
          <div className={`w-16 h-7 rounded-xl ${shimmerClass}`} />
          <div className={`h-3.5 w-24 rounded-full ${shimmerClass}`} />
        </div>

        {/* Direct contact telegram banner */}
        <div className={`p-5 rounded-2xl ${shimmerClass} h-16 w-full`} />

        {/* Full-width messaging form fields */}
        <div className={`p-5 rounded-3xl border ${cardBgClass} space-y-4`}>
          <div className="space-y-2">
            <div className={`h-3.5 w-24 rounded-full ${shimmerClass}`} />
            <div className={`h-11 w-full rounded-2xl ${shimmerClass}`} />
          </div>
          <div className="space-y-2">
            <div className={`h-3.5 w-28 rounded-full ${shimmerClass}`} />
            <div className={`h-24 w-full rounded-2xl ${shimmerClass}`} />
          </div>

          <div className={`h-12 w-full rounded-2xl ${shimmerClass} mt-4`} />
        </div>
      </div>
    );
  }

  // 7. POETRY CATEGORIES / DYNAMIC HASHTAGS BROWSER SHIMMER
  if (viewKey === 'category') {
    return (
      <div className="space-y-6 w-full text-right font-sans select-none" style={{ direction: 'rtl' }}>
        {/* Header */}
        <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
          <div className={`w-16 h-7 rounded-xl ${shimmerClass}`} />
          <div className={`h-3.5 w-28 rounded-full ${shimmerClass}`} />
        </div>

        {/* Instant Category search line */}
        <div className={`h-11 w-full rounded-xl ${shimmerClass}`} />

        {/* Grid of beautifully-spaced pills matching hashtags category screen */}
        <div className={`p-5 rounded-3xl border ${cardBgClass} space-y-4`}>
          <div className={`h-3 w-36 rounded-full ${shimmerClass}`} />
          <div className="flex flex-wrap gap-2.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <div 
                key={i} 
                className={`h-9 rounded-xl ${shimmerClass}`} 
                style={{ width: `${60 + (i * 7) % 70}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 8. LIVE SEARCH SEARCH ENGINE INPUT SCREEN SHIMMER
  if (viewKey === 'search') {
    return (
      <div className="space-y-6 w-full text-right font-sans select-none" style={{ direction: 'rtl' }}>
        {/* Header */}
        <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
          <div className={`w-16 h-7 rounded-xl ${shimmerClass}`} />
          <div className={`h-3.5 w-24 rounded-full ${shimmerClass}`} />
        </div>

        {/* Main large Input text bar */}
        <div className={`h-12 w-full rounded-2xl ${shimmerClass}`} />

        {/* Recent Search categories elements list */}
        <div className="space-y-3 ps-1">
          <div className={`h-3 w-28 rounded-full ${shimmerClass}`} />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-8 w-24 rounded-xl ${shimmerClass}`} />
            ))}
          </div>
        </div>

        {/* Search Results mimicking list rows */}
        <div className="space-y-4 pt-3">
          {[1, 2].map((i) => (
            <div key={i} className={`p-4 rounded-2xl border ${cardBgClass} flex items-center justify-between gap-3`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${shimmerClass} shrink-0`} />
                <div className="space-y-1.5 pr-2">
                  <div className={`h-3 w-28 rounded-full ${shimmerClass}`} />
                  <div className={`h-2.5 w-16 rounded-full ${shimmerClass}`} />
                </div>
              </div>
              <div className={`h-3.5 w-[90px] rounded-full ${shimmerClass}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 9. REELS / SHORT TELEGRAM VIDEOS PLAYER PAGE SHIMMER
  if (viewKey === 'reels') {
    return (
      <div className="space-y-6 w-full font-sans select-none" style={{ direction: 'rtl' }}>
        {/* Header */}
        <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
          <div className={`w-16 h-7 rounded-xl ${shimmerClass}`} />
          <div className={`h-3.5 w-28 rounded-full ${shimmerClass}`} />
        </div>

        {/* Vertical full-viewport Tiktok/Insta video stream block */}
        <div className={`w-full aspect-[9/16] rounded-3xl ${shimmerClass} relative p-5 flex flex-col justify-between`}>
          {/* Top header stats bar overlay */}
          <div className="flex justify-between w-full">
            <div className="w-8 h-8 rounded-full bg-black/20" />
            <div className="w-16 h-3.5 bg-black/35 rounded-full" />
          </div>

          {/* Bottom user meta + action floating elements details */}
          <div className="flex justify-between items-end w-full">
            <div className="w-9 h-9 rounded-full bg-black/25 shrink-0" />
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-black/20" />
              <div className="w-9 h-9 rounded-full bg-black/20" />
              <div className="w-9 h-9 rounded-full bg-black/20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 10. PHOTO REELS / CAROUSEL BENTO SLIDES BROWSER SHIMMER
  if (viewKey === 'photo_reels') {
    return (
      <div className="space-y-6 w-full font-sans select-none" style={{ direction: 'rtl' }}>
        {/* Navigation line bar */}
        <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
          <div className={`w-16 h-7 rounded-xl ${shimmerClass}`} />
          <div className={`h-3.5 w-32 rounded-full ${shimmerClass}`} />
        </div>

        {/* Dynamic carousel rectangle board */}
        <div className={`w-full aspect-[4/3] rounded-3xl ${shimmerClass}`} />

        {/* Indicators and post text info card */}
        <div className={`p-5 rounded-3xl border ${cardBgClass} space-y-3`}>
          <div className="flex justify-center gap-1.5 mb-2">
            <div className={`w-2 h-2 rounded-full ${shimmerClass}`} />
            <div className={`w-2 h-2 rounded-full ${shimmerClass}`} />
            <div className={`w-2 h-2 rounded-full ${shimmerClass}`} />
          </div>
          <div className={`h-3.5 w-full rounded-full ${shimmerClass}`} />
          <div className={`h-3 w-3/4 rounded-full ${shimmerClass}`} />
        </div>
      </div>
    );
  }

  // 11. DEFAULT FALLBACK / DASHBOARD MAIN PORTAL FEED SHIMMER
  return (
    <div className="space-y-6 w-full text-right font-sans select-none" style={{ direction: 'rtl' }}>
      {/* Search mock bar */}
      <div className={`h-11 w-full rounded-xl ${shimmerClass}`} />

      {/* Pill buttons horizontal layout */}
      <div className="flex flex-row gap-2 overflow-hidden py-1">
        {[1, 2, 3, 4, 5].map((item) => (
          <div 
            key={item} 
            className={`h-9 rounded-xl ${shimmerClass} shrink-0`} 
            style={{ width: `${60 + (item * 13) % 40}px` }}
          />
        ))}
      </div>

      {/* Primary channel profile notification banner card */}
      <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${shimmerClass} shrink-0`} />
          <div className="space-y-2">
            <div className={`h-3 w-32 rounded-full ${shimmerClass}`} />
            <div className={`h-2 w-16 rounded-full ${shimmerClass}`} />
          </div>
        </div>
        <div className={`h-7 w-20 rounded-xl ${shimmerClass}`} />
      </div>

      {/* Feed general list stream elements (2 massive poster posts cards) */}
      {[1, 2].map((i) => (
        <div key={i} className={`p-5 rounded-3xl border ${cardBgClass} space-y-4`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${shimmerClass} shrink-0`} />
            <div className="space-y-1.5 flex-1 select-none pr-1">
              <div className={`h-3.5 w-28 rounded-full ${shimmerClass}`} />
              <div className={`h-2.5 w-14 rounded-full ${shimmerClass}`} />
            </div>
          </div>
          <div className={`h-40 w-full rounded-2xl ${shimmerClass}`} />
          <div className="space-y-2">
            <div className={`h-3.5 w-full rounded-full ${shimmerClass}`} />
            <div className={`h-3.5 w-11/12 rounded-full ${shimmerClass}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

interface PremiumAvatarProps {
  src: string;
  sizeClass: string;
  ringSize?: string;
  showStoryRing?: boolean;
}

function PremiumAvatar({ src, sizeClass, ringSize = "p-[3px]", showStoryRing = true }: PremiumAvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isUiAvatar = src ? (src.includes('ui-avatars.com') || src.includes('placeholder')) : true;
  const isFallback = !src || isUiAvatar || hasError;

  if (isFallback) {
    return (
      <div className="relative flex items-center justify-center shrink-0">
        {/* 1. Gorgeous Instagram/TikTok style Story Ring */}
        {showStoryRing && (
          <div className={`absolute inset-0 bg-gradient-to-tr from-yellow-400 via-rose-500 to-indigo-500 rounded-full animate-pulse ${ringSize}`} />
        )}
        
        {/* 2. Beautiful custom designed feather avatar placeholder */}
        <div className={`relative rounded-full overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 ${showStoryRing ? 'm-[3px]' : ''} ${sizeClass} flex items-center justify-center border border-indigo-500/25 shadow-inner`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2)_0%,transparent_70%)] animate-pulse" />
          <Feather className="w-[52%] h-[52%] text-amber-400/90 drop-shadow-[0_2px_8px_rgba(251,191,36,0.35)] relative z-10 transform -rotate-12" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center shrink-0">
      {/* 1. Gorgeous Instagram/TikTok style Story Ring */}
      {showStoryRing && (
        <div className={`absolute inset-0 bg-gradient-to-tr from-yellow-400 via-rose-500 to-indigo-500 rounded-full animate-pulse ${ringSize}`} />
      )}
      
      {/* 2. Inner Gap & Container */}
      <div className={`relative rounded-full overflow-hidden bg-slate-950 ${showStoryRing ? 'm-[3px]' : ''} ${sizeClass} flex items-center justify-center border border-white/10`}>
        {/* Loader with Feather Icon */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <Feather className="w-1/2 h-1/2 text-indigo-400 animate-pulse" />
          </div>
        )}
        
        {/* Fallback Icon on Error */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <Feather className="w-1/2 h-1/2 text-slate-500" />
          </div>
        )}

        <img
          src={src}
          alt="Avatar"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(true);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
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
  const [toReadPostIds, setToReadPostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dewa_toread_post_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isFavoritesMenuOpen, setIsFavoritesMenuOpen] = useState(false);
  const [activeFavoriteFilter, setActiveFavoriteFilter] = useState<'videos' | 'images' | 'writings' | 'pdf' | 'audio' | 'toread' | null>(null);

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

  // Toggling to-read post helper and automatic sync to localStorage (د وروسته لوستلو لیست کې پوسټ اضافه کول)
  const toggleToRead = (postId: string) => {
    setToReadPostIds(prev => {
      const exists = prev.includes(postId);
      const updated = exists ? prev.filter(id => id !== postId) : [...prev, postId];
      try {
        localStorage.setItem('dewa_toread_post_ids', JSON.stringify(updated));
      } catch (e) {
        console.error("Error toggling to-read:", e);
      }
      
      if (exists) {
        showToast('پوسټ د وروسته لوستلو لیست څخه لرې شو! 🗑️', 'info');
      } else {
        showToast('پوسټ د وروسته لوستلو لیست کې اضافه شو! 📖', 'success');
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
    // Inject mobile safe area fallback custom properties to support edge-to-edge layout bounds
    const isMobileCheck = !!((window as any).Capacitor && typeof (window as any).Capacitor.getPlatform === 'function');
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || isMobileCheck;
    const isAndroid = /Android/i.test(navigator.userAgent) || (isMobileCheck && (window as any).Capacitor.getPlatform() === 'android');
    const root = document.documentElement;
    if (isMobile) {
      root.style.setProperty('--safe-top-fallback', isAndroid ? '28px' : '44px');
      root.style.setProperty('--safe-bottom-fallback', isAndroid ? '16px' : '24px');
    } else {
      root.style.setProperty('--safe-top-fallback', '0px');
      root.style.setProperty('--safe-bottom-fallback', '0px');
    }
  }, []);

  useEffect(() => {
    if (selectedPost && selectedPost.id) {
      markPostAsRead(selectedPost.id);
    }
  }, [selectedPost]);
  const [overlayActiveText, setOverlayActiveText] = useState<string | null>(null);
  const [visibleHomeCount, setVisibleHomeCount] = useState(30);
  const [isAutoloadingMore, setIsAutoloadingMore] = useState(false);
  const [visibleProfileCount, setVisibleProfileCount] = useState(15);
  const [isAutoloadingMoreProfile, setIsAutoloadingMoreProfile] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [currentVerseIndex, setCurrentVerseIndex] = useState<number>(() => {
    return new Date().getDate() % pashtoVersesList.length;
  });
  const [carouselActiveIndex, setCarouselActiveIndex] = useState<number>(0);

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
  const [selectedAuthorName, setSelectedAuthorName] = useState<string | null>(null);
  const isHistoryPushedRef = useRef(false);
  useEffect(() => {
    if (selectedAuthorName) {
      window.history.pushState({ view: 'profile' }, '');
      isHistoryPushedRef.current = true;
      
      const handlePopState = (e: PopStateEvent) => {
        isHistoryPushedRef.current = false;
        setSelectedAuthorName(null);
      };
      
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        if (isHistoryPushedRef.current) {
          isHistoryPushedRef.current = false;
          window.history.back();
        }
      };
    }
  }, [selectedAuthorName]);

  const [profileBackAuthorName, setProfileBackAuthorName] = useState<string | null>(null);
  const [profileBackOrigin, setProfileBackOrigin] = useState<'reels' | 'photo_reels' | null>(null);
  const [profileBackReelIndex, setProfileBackReelIndex] = useState<number>(0);
  const [reelsFromProfile, setReelsFromProfile] = useState<boolean>(false);
  const [photoReelsFromProfile, setPhotoReelsFromProfile] = useState<boolean>(false);
  const [storyFromProfile, setStoryFromProfile] = useState<boolean>(false);
  const [profileSelectedCategory, setProfileSelectedCategory] = useState<string>('all');
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [novelsFeedData, setNovelsFeedData] = useState<FeedResponse | null>(null);
  const [activeNovelTextChapter, setActiveNovelTextChapter] = useState<any | null>(null);
  const [novelScrollProgress, setNovelScrollProgress] = useState(0);

  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const storyProgressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const storyVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleLoadMoreHomePosts = async () => {
    if (isLoading || isAutoloadingMore) return;
    
    setIsAutoloadingMore(true);
    
    // Simulating a luxurious premium loading delay for smooth visual feel
    setTimeout(async () => {
      if (visibleHomeCount < filteredHomePosts.length) {
        setVisibleHomeCount((prev) => prev + 15);
        setIsAutoloadingMore(false);
      } else if (!isScrapingMore) {
        // No more local cache posts, scrape/load more older posts from Telegram
        try {
          await loadMoreOlderPosts();
          setVisibleHomeCount((prev) => prev + 15);
        } catch (err) {
          console.error("Error loading older posts:", err);
        } finally {
          setIsAutoloadingMore(false);
        }
      } else {
        setIsAutoloadingMore(false);
      }
    }, 1200);
  };

  const handleLoadMoreProfilePosts = async (currentFilteredLength: number) => {
    if (isLoading || isAutoloadingMoreProfile) return;
    
    setIsAutoloadingMoreProfile(true);
    
    setTimeout(async () => {
      if (visibleProfileCount < currentFilteredLength) {
        setVisibleProfileCount((prev) => prev + 15);
        setIsAutoloadingMoreProfile(false);
      } else if (!isScrapingMore) {
        try {
          await loadMoreOlderPosts();
          setVisibleProfileCount((prev) => prev + 15);
        } catch (err) {
          console.error("Error loading older profile posts:", err);
        } finally {
          setIsAutoloadingMoreProfile(false);
        }
      } else {
        setIsAutoloadingMoreProfile(false);
      }
    }, 1200);
  };

  // Novel reader settings with persistence
  const [readerFontSize, setReaderFontSize] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('dewa_reader_font_size');
      return saved ? parseInt(saved) : 16;
    } catch {
      return 16;
    }
  });
  const [readerLineHeight, setReaderLineHeight] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('dewa_reader_line_height');
      return saved ? parseFloat(saved) : 2.3;
    } catch {
      return 2.3;
    }
  });

  const changeReaderFontSize = (newSize: number) => {
    const size = Math.max(12, Math.min(26, newSize));
    setReaderFontSize(size);
    try {
      localStorage.setItem('dewa_reader_font_size', size.toString());
    } catch (e) {}
  };

  const changeReaderLineHeight = (newLineHeight: number) => {
    const lh = parseFloat(Math.max(1.8, Math.min(3.2, newLineHeight)).toFixed(1));
    setReaderLineHeight(lh);
    try {
      localStorage.setItem('dewa_reader_line_height', lh.toString());
    } catch (e) {}
  };
  
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

        const cleanSnippet = pText.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
        const newBookmark = {
          id: keyId,
          chapterId: chapterId,
          chapterTitle: cleanChapterTitle,
          novelId: novel?.id || '',
          novelTitle: cleanNovelTitle,
          paragraphIndex: pIndex,
          textSnippet: cleanSnippet.substring(0, 350) + (cleanSnippet.length > 350 ? '...' : ''),
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
  const [isAdminDetailOpen, setIsAdminDetailOpen] = useState(false);
  const [isDevDetailOpen, setIsDevDetailOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  // Recent search queries state (maximum 5) with localStorage persistence
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeViewKey = (() => {
    if (activeNovelTextChapter) {
      return `chapter_${activeNovelTextChapter.id || activeNovelTextChapter.title || 'unknown'}`;
    }
    if (selectedPost) {
      return `post_${selectedPost.id || 'unknown'}`;
    }
    if (selectedAuthorName) {
      return `author_${selectedAuthorName}`;
    }
    if (isSettingsPageOpen) return 'settings';
    if (isAboutPageOpen) return 'about';
    if (isContactPageOpen) return 'contact';
    if (isCategoryPageOpen) return 'category';
    if (isNovelsPageOpen) return 'novels';
    if (isFullFeedOpen) return 'full_feed';
    if (isReelsOpen) return 'reels';
    if (isPhotoReelsOpen) return 'photo_reels';
    if (isSearchOpen) return 'search';
    return 'dashboard';
  })();

  const lastViewKeyRef = useRef<string>(activeViewKey);

  useEffect(() => {
    if (activeViewKey !== lastViewKeyRef.current) {
      setIsTransitioning(true);
      lastViewKeyRef.current = activeViewKey;
      
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'instant' as any });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [activeViewKey]);

  const addToRecentSearches = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  useEffect(() => {
    if (!searchQuery) return;
    const timer = setTimeout(() => {
      addToRecentSearches(searchQuery);
    }, 1200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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
    return (localStorage.getItem('dewa_text_size') as any) || 'base';
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
  const [showDailySections, setShowDailySections] = useState<boolean>(() => {
    return localStorage.getItem('dewa_show_daily_sections') === 'true';
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
  const pullStartXRef = useRef<number | null>(null);

  useEffect(() => {
    // Only bind if we are on the home screen view of the feed (no modal pages, no sub views)
    const isHomeActive = !selectedPost && 
                         !selectedAuthorName &&
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
        pullStartXRef.current = e.touches[0].clientX;
      } else {
        pullStartYRef.current = null;
        pullStartXRef.current = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (pullStartYRef.current === null || pullStartXRef.current === null) return;

      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = currentY - pullStartYRef.current;
      const deltaX = Math.abs(currentX - pullStartXRef.current);

      // Cancel the pull gesture if it's primarily a horizontal swipe (so carousels can swipe beautifully)
      if (deltaX > Math.abs(deltaY) && deltaX > 8) {
        pullStartYRef.current = null;
        pullStartXRef.current = null;
        setPullDistance(0);
        setPullState('idle');
        return;
      }

      if (deltaY > 0) {
        // We are pulling down!
        // Apply responsive friction for instant and easy pull down
        const friction = 0.85;
        const dragDist = deltaY * friction;
        const limitedDistance = Math.min(130, dragDist);

        if (limitedDistance > 10) {
          // Prevent browser overscroll/refresh behavior (bounce effects)
          if (e.cancelable) {
            e.preventDefault();
          }
          setPullDistance(limitedDistance);
          setPullState(limitedDistance > 55 ? 'ready' : 'pulling');
        }
      } else {
        // Scrolled upwards during a pull
        pullStartYRef.current = null;
        pullStartXRef.current = null;
        setPullDistance(0);
        setPullState('idle');
      }
    };

    const handleTouchEnd = () => {
      if (pullStartYRef.current === null) return;
      pullStartYRef.current = null;
      pullStartXRef.current = null;

      if (pullDistance > 55) {
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
      const isInAnySubpage = !!(selectedPost || selectedAuthorName || isAboutPageOpen || isContactPageOpen || isSettingsPageOpen || isFullFeedOpen || isSearchOpen || isReelsOpen || isPhotoReelsOpen || isCategoryPageOpen);
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
  }, [selectedPost, selectedAuthorName, isAboutPageOpen, isContactPageOpen, isSettingsPageOpen, isFullFeedOpen, isSearchOpen, isReelsOpen, isPhotoReelsOpen, isCategoryPageOpen]);

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
    const isInPanel = !!(selectedAuthorName || isAboutPageOpen || isContactPageOpen || isSettingsPageOpen || isFullFeedOpen || isSearchOpen || isReelsOpen || isPhotoReelsOpen || isCategoryPageOpen);
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
  }, [selectedPost, selectedAuthorName, isAboutPageOpen, isContactPageOpen, isSettingsPageOpen, isFullFeedOpen, isSearchOpen, isReelsOpen, isPhotoReelsOpen, isCategoryPageOpen]);

  // 4. Author Profile Transition Tracker (restoring scroll position when returning to the profile screen)
  const prevSelectedAuthorNameRef = useRef<string | null>(null);
  useEffect(() => {
    const becameProfile = selectedAuthorName && !prevSelectedAuthorNameRef.current;
    if (becameProfile) {
      const savedPos = detailScrollPosRef.current;
      if (savedPos > 0) {
        window.scrollTo(0, savedPos);
        setTimeout(() => window.scrollTo(0, savedPos), 30);
        setTimeout(() => window.scrollTo(0, savedPos), 90);
        setTimeout(() => window.scrollTo(0, savedPos), 180);
        setTimeout(() => window.scrollTo(0, savedPos), 350);
      }
    }
    prevSelectedAuthorNameRef.current = selectedAuthorName;
  }, [selectedAuthorName]);

  // Reset profile pagination when the author or category changes
  useEffect(() => {
    setVisibleProfileCount(15);
  }, [selectedAuthorName, profileSelectedCategory]);

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

  useEffect(() => {
    localStorage.setItem('dewa_show_daily_sections', String(showDailySections));
  }, [showDailySections]);

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
      try {
        if (isNotificationSupportedSafely() && getNotificationPermissionSafely() === 'granted') {
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
        }
      } catch (err) {
        console.warn('Native notification failed:', err);
      }
    }
  }, [notificationsEnabled]);

  // Request standard push notification permission on opening the app
  useEffect(() => {
    const askPermission = async () => {
      try {
        if (isNotificationSupportedSafely()) {
          if (getNotificationPermissionSafely() === 'default') {
            await Notification.requestPermission();
          }
        }
      } catch (e) {
        console.warn('System Notification.requestPermission failed', e);
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
    
    const ids = feedData.posts.filter((p): p is TelegramPost => !!(p && p.id)).map(p => parseInt(p.id)).filter(id => !isNaN(id));
    if (ids.length === 0) return;
    const minPostId = Math.min(...ids);
    
    setIsScrapingMore(true);
    console.log('[Dewa Paging] Loading older posts dynamically, before ID:', minPostId);

    const checkIsCapacitor = !!((window as any).Capacitor && typeof (window as any).Capacitor.getPlatform === 'function');
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
      const existingIds = new Set(feedData.posts.filter((p): p is TelegramPost => !!(p && p.id)).map(p => p.id));
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
        setHasReachedEnd(true);
      }
    } else {
      setVisibleFullCount(prev => prev + 5);
      setHasReachedEnd(true);
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
          const prevHighestId = Math.max(...prevObj.posts.filter((p: any) => p && p.id).map((p: any) => parseInt(p.id) || 0));
          const newHighestId = Math.max(...newData.posts.filter((p: any) => p && p.id).map((p: any) => parseInt(p.id) || 0));
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

    const checkIsCapacitor = !!((window as any).Capacitor && typeof (window as any).Capacitor.getPlatform === 'function');
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
                const uniqueIds = new Set(parsedData.posts.filter((p): p is TelegramPost => !!(p && p.id)).map(p => p.id));
                for (let pageIdx = 2; pageIdx <= 10; pageIdx++) {
                  if (parsedData.posts.length >= 100) break;
                  const postIdsNumeric = currentPagingPosts.filter((p): p is TelegramPost => !!(p && p.id)).map(p => parseInt(p.id)).filter(id => !isNaN(id));
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

    const ids = novelsFeedData.posts.filter((p): p is TelegramPost => !!(p && p.id)).map(p => parseInt(p.id)).filter(id => !isNaN(id));
    if (ids.length === 0) {
      setIsNovelsScrapingMore(false);
      return;
    }
    const minPostId = Math.min(...ids);

    const checkIsCapacitor = !!((window as any).Capacitor && typeof (window as any).Capacitor.getPlatform === 'function');
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
      const existingIds = new Set(novelsFeedData.posts.filter((p): p is TelegramPost => !!(p && p.id)).map(p => p.id));
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
    const checkIsCapacitor = !!((window as any).Capacitor && typeof (window as any).Capacitor.getPlatform === 'function');
    const capacitorPlatform = checkIsCapacitor ? (((window as any).Capacitor.getPlatform && (window as any).Capacitor.getPlatform()) || 'unknown') : 'none';
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
        const uniqueIds = new Set(parsedData.posts.filter((p): p is TelegramPost => !!(p && p.id)).map(p => p.id));
        for (let pageIdx = 2; pageIdx <= 12; pageIdx++) {
          if (parsedData.posts.length >= 150) {
            break; // Stop client scraping once we have 150 posts initially
          }
          const postIdsNumeric = currentPagingPosts.filter((p): p is TelegramPost => !!(p && p.id)).map(p => parseInt(p.id)).filter(id => !isNaN(id));
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
    const isCap = !!((window as any).Capacitor && typeof (window as any).Capacitor.getPlatform === 'function');
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
          if (profileBackAuthorName) {
            setSelectedAuthorName(profileBackAuthorName);
            setProfileBackAuthorName(null);
          }
        } else if (isPhotoReelsOpen) {
          setIsPhotoReelsOpen(false);
          if (profileBackAuthorName) {
            setSelectedAuthorName(profileBackAuthorName);
            setProfileBackAuthorName(null);
          }
        } else if (isCategoryPageOpen) {
          setIsCategoryPageOpen(false);
        } else if (selectedPost) {
          setSelectedPost(null);
          if (profileBackAuthorName) {
            setSelectedAuthorName(profileBackAuthorName);
            setProfileBackAuthorName(null);
          }
        } else if (selectedAuthorName) {
          setSelectedAuthorName(null);
          setProfileBackAuthorName(null);
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
  }, [zoomPhotoUrl, activeModal, isSettingsPageOpen, isAboutPageOpen, isContactPageOpen, isSidebarOpen, selectedPost, isFullFeedOpen, isSearchOpen, showExitConfirmation, isReelsOpen, isPhotoReelsOpen, isCategoryPageOpen, overlayActiveText, profileBackAuthorName, selectedAuthorName]);

  // Dynamic status bar styling implementation matching current primary/theme modes
  useEffect(() => {
    const isCap = !!((window as any).Capacitor && typeof (window as any).Capacitor.getPlatform === 'function');
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
    // Increment progress bar over 4 seconds (4000ms)
    const intervalTime = 50; 
    const totalSteps = 4000 / intervalTime; // 80 steps
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
    
    // 1. Filter out the '#dev' and '#admin' posts
    const textLower = (p.text || '').toLowerCase();
    if (textLower.includes('#dev') || textLower.includes('#admin')) {
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

  // Find the custom '#admin' post (from raw posts pool) to dynamically populate the Admin profile
  const adminPost = React.useMemo(() => {
    if (!feedData?.posts) return null;
    return feedData.posts.find(p => p && p.text && p.text.toLowerCase().includes('#admin'));
  }, [feedData?.posts]);

  const devName = React.useMemo(() => {
    return devPost?.authorName || feedData?.channelInfo?.title || "پښتو ادبي خزانه";
  }, [devPost, feedData?.channelInfo?.title]);

  const adminName = React.useMemo(() => {
    return adminPost?.authorName || feedData?.channelInfo?.title || "پښتو ادبي خزانه";
  }, [adminPost, feedData?.channelInfo?.title]);

  // Group unique admin/developer authors for horizontal recycler view
  const adminsList = React.useMemo(() => {
    if (!feedData?.posts) return [];
    
    // 1. Dev author as the first item
    const devAuthor = {
      name: devName,
      post: devPost,
      isDev: true,
      avatar: devPost?.photoUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(devName) + "&background=6366f1&color=fff&size=128&bold=true",
      role: "سافټویر انجینر",
      badge: "جوړونکی / DEV"
    };

    // 2. Find all unique admin authors
    const adminPosts = feedData.posts.filter(p => p && p.text && p.text.toLowerCase().includes('#admin'));
    const seenAuthors = new Set<string>();
    seenAuthors.add(devName.toLowerCase());

    const uniqueAdmins: any[] = [];
    adminPosts.forEach(p => {
      const name = p.authorName || feedData?.channelInfo?.title || "پښتو ادبي خزانه";
      const lowerName = name.toLowerCase();
      if (!seenAuthors.has(lowerName)) {
        seenAuthors.add(lowerName);
        uniqueAdmins.push({
          name: name,
          post: p,
          isDev: false,
          avatar: p.photoUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=f59e0b&color=fff&size=128&bold=true",
          role: "محتوا خپرونکی",
          badge: "اډمین / ADMIN"
        });
      }
    });

    // Fallback default admin if not already present in uniqueAdmins
    if (adminPost) {
      const fallbackAdminName = adminPost.authorName || feedData?.channelInfo?.title || "پښتو ادبي خزانه";
      if (!seenAuthors.has(fallbackAdminName.toLowerCase())) {
        uniqueAdmins.push({
          name: fallbackAdminName,
          post: adminPost,
          isDev: false,
          avatar: adminPost?.photoUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(fallbackAdminName) + "&background=f59e0b&color=fff&size=128&bold=true",
          role: "محتوا خپرونکی",
          badge: "اډمین / ADMIN"
        });
      }
    }

    return [devAuthor, ...uniqueAdmins];
  }, [feedData?.posts, devName, devPost, adminPost, feedData?.channelInfo?.title]);

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
      if (activeFavoriteFilter === 'toread') {
        list = list.filter(p => toReadPostIds.includes(p.id));
      } else {
        list = list.filter(p => favoritePostIds.includes(p.id));
      }
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
  }, [allPosts, selectedCategory, activeFavoriteFilter, favoritePostIds, toReadPostIds]);

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
    let list = allPosts;
    if (selectedCategory !== 'stories' && selectedCategory !== 'novels') {
      list = list.filter(p => !isStoryPost(p) && !getIsNovelOrNovelPart(p));
    }
    if (selectedCategory === 'videos') {
      return list.filter(p => !!p.hasVideo || !!p.videoUrl || !!p.videoThumbUrl);
    }
    if (selectedCategory === 'images') {
      return list.filter(p => !!p.photoUrl || (p.photoUrls && p.photoUrls.length > 0));
    }
    if (selectedCategory === 'audio') {
      return list.filter(p => !!p.hasAudio || !!p.audioUrl);
    }
    if (selectedCategory === 'pdf') {
      return list.filter(p => getIsBook(p));
    }
    if (selectedCategory === 'writings_plain') {
      return list.filter(p => getIsWriting(p));
    }
    if (selectedCategory === 'poems') {
      return list.filter(p => getIsPoem(p));
    }
    if (selectedCategory === 'writings') {
      return list.filter(p => !p.hasVideo && !p.photoUrl && !(p.photoUrls && p.photoUrls.length > 0) && !p.hasAudio && !getIsBook(p));
    }
    return list;
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
      // Exclude novels and stories from the images section
      if (isStoryPost(post) || getIsNovelOrNovelPart(post)) {
        return;
      }
      // Explicitly check for story or novel hashtags in the post text to be absolutely safe
      if (post.text) {
        const textLower = post.text.toLowerCase();
        const hasStoryOrNovelTag = textLower.includes('#کيسه') || 
                                   textLower.includes('#کیسه') || 
                                   textLower.includes('#ناول') || 
                                   textLower.includes('#رومان');
        if (hasStoryOrNovelTag) {
          return;
        }
      }
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
    
    // Novel & Story hashtag detector to exclude them from main categories/hashtags list
    const isNovelOrStoryHashtag = (tag: string): boolean => {
      const normalized = tag.toLowerCase();
      const forbidden = [
        '#ناول', '#novel', '#رومان', '#ناول_برخه', '#رومان_برخه',
        '#novel_profile', '#ناول_پروفایل', '#ناول_پروفايل', '#profile_novel',
        '#کیسه', '#کيسه', '#کیسې', '#کيسې', '#کیسه_برخه', '#کيسه_برخه', '#داستان', '#داستانونه'
      ];
      if (forbidden.includes(normalized)) return true;
      
      if (
        normalized.startsWith('#ناول_') || 
        normalized.startsWith('#novel_') || 
        normalized.startsWith('#رومان_') ||
        normalized.startsWith('#کیسه_') ||
        normalized.startsWith('#کيسه_')
      ) {
        return true;
      }
      return false;
    };

    const countMap = new Map<string, number>();
    feedData.posts.forEach(p => {
      if (p && p.text) {
        const matches = p.text.match(/#[^\s#.,!?;:()\[\]{}'"]+/g);
        if (matches) {
          const uniqueInPost = new Set<string>(matches);
          uniqueInPost.forEach(tag => {
            if (!isNovelOrStoryHashtag(tag)) {
              countMap.set(tag, (countMap.get(tag) || 0) + 1);
            }
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

  const rotateCarouselNext = () => {
    setCarouselActiveIndex((prev) => (prev + 1) % 6);
  };

  const rotateCarouselPrev = () => {
    setCarouselActiveIndex((prev) => (prev - 1 + 6) % 6);
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
  const [reelError, setReelError] = useState(false);
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

  // Home dynamic 6-tab carousel items
  const homeCarouselItems = React.useMemo(() => {
    if (!allPosts || allPosts.length === 0) return null;

    // 1. Daily Prose / Writing
    const dailyWriting = allPosts.find(p => !p.hasVideo && !p.hasAudio && !p.photoUrl && !isStoryPost(p) && !getIsNovelOrNovelPart(p) && p.text && p.text.length > 40) || allPosts[0];

    // 2. Daily Poetry from real app posts / content (محتوا)
    let dailyPoetry: PashtoVerse;
    const realPoemPosts = allPosts.filter(getIsPoem);
    const poetrySource = realPoemPosts.length > 0 ? realPoemPosts : allPosts;
    
    const dayIndex = new Date().getDate(); // Deterministic index changing once per day (1-31)
    const selectedPost = poetrySource[dayIndex % poetrySource.length];
    
    // Extract couplet and format nicely
    let cleanText = selectedPost.text || '';
    // Strip off hashtags
    cleanText = cleanText.replace(/#[\u0600-\u06FFa-zA-Z0-9_]+/g, '').trim();
    
    let author = 'رحمان بابا'; // standard classic fallback
    const textLower = (selectedPost.text || '').toLowerCase();
    if (textLower.includes('رحمان بابا') || textLower.includes('رحمان بابا')) author = 'عبدالرحمان بابا';
    else if (textLower.includes('حمزه بابا')) author = 'حمزه شينواری';
    else if (textLower.includes('خوشحال')) author = 'خوشحال خان خټک';
    else if (textLower.includes('کاروان')) author = 'پیر محمد کاروان';
    else if (textLower.includes('تراب')) author = 'مطیع الله تراب';
    else if (textLower.includes('دروېش')) author = 'دروېش درانی';
    else if (textLower.includes('جهاني')) author = 'عبدالباري جهاني';
    else {
      // Look for poet signature pattern "شاعر: ..."
      const matchAuthor = cleanText.match(/(?:شاعر|لیکونکی)\s*:\s*([^\n]+)/i);
      if (matchAuthor && matchAuthor[1]) {
        author = matchAuthor[1].trim();
        author = author.replace(/#[\u0600-\u06FFa-zA-Z0-9_]+/g, '').trim();
      } else {
        const lines = cleanText.split('\n');
        const lastLine = lines[lines.length - 1]?.trim() || '';
        if ((lastLine.startsWith('ـ') || lastLine.startsWith('-') || lastLine.startsWith('—')) && lastLine.length > 1 && lastLine.length < 25) {
          author = lastLine.replace(/^[ـ\-\—]/, '').trim();
          lines.pop();
          cleanText = lines.join('\n').trim();
        } else {
          author = selectedPost.authorName || 'مېنې ډېوه همکار';
        }
      }
    }

    dailyPoetry = {
      couplet: cleanText,
      meaning: 'د پښتو ادبي خزانې غوره اثر',
      author: author,
      postRef: selectedPost
    };

    // 3. Highlighted Video Post
    const videoPost = allPosts.find(p => p.hasVideo || p.videoUrl || p.videoThumbUrl) || allPosts[0];

    // 4. Highlighted Image Post
    const imagePost = allPosts.find(p => p.photoUrl || (p.photoUrls && p.photoUrls.length > 0)) || allPosts[0];

    // 5. Featured Novel Chapter/Part
    const novelPost = (novelsFeedData?.posts || []).find(p => getIsNovelOrNovelPart(p)) || allPosts.find(p => getIsNovelOrNovelPart(p)) || allPosts[0];

    // 6. Featured Story Post
    const storyPost = storiesList[0] || allPosts.find(p => isStoryPost(p)) || allPosts[0];

    return {
      writing: dailyWriting,
      poetry: dailyPoetry,
      video: videoPost,
      image: imagePost,
      novel: novelPost,
      story: storyPost
    };
  }, [allPosts, novelsFeedData, storiesList, currentVerseIndex]);

  // Synchronize playing/pausing of story video on hold or pause
  useEffect(() => {
    if (storyVideoRef.current) {
      if (isStoryPaused || !isStoryViewerOpen) {
        storyVideoRef.current.pause();
      } else {
        storyVideoRef.current.play().catch((err) => console.log('Story video playback deferred or paused:', err));
      }
    }
  }, [isStoryPaused, isStoryViewerOpen, activeStoryIndex]);

  // Profile Back Navigation Auto-Restore System (پروفایل ته د شاتګ اتوماتیک سیستم)
  useEffect(() => {
    if (!selectedPost && !isReelsOpen && !isPhotoReelsOpen && !isStoryViewerOpen) {
      if (profileBackAuthorName) {
        setSelectedAuthorName(profileBackAuthorName);
        setProfileBackAuthorName(null);
      }
    }
  }, [selectedPost, isReelsOpen, isPhotoReelsOpen, isStoryViewerOpen, profileBackAuthorName]);

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
    const activeStory = storiesList[activeStoryIndex];
    const hasVideo = activeStory && (!!activeStory.videoUrl || (activeStory.videoList && activeStory.videoList.length > 0));

    // If the active story has a video, the default interval timer should not run.
    // The video player will update storyProgress and handle next story onEnded itself.
    if (!isStoryViewerOpen || storiesList.length === 0 || isStoryPaused || hasVideo) {
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
    setReelError(false);

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

      // Check if there's a matching last watched video and apply its current time
      const lastWatched = (window as any).lastWatchedVideo;
      if (lastWatched && lastWatched.videoUrl) {
        const activeReelObj = reelsList[activeReelIndex];
        const activeUrl = activeReelObj ? activeReelObj.videoUrl : '';
        if (
          activeUrl === lastWatched.videoUrl || 
          (activeUrl && activeUrl.includes(lastWatched.videoUrl)) || 
          (lastWatched.videoUrl && lastWatched.videoUrl.includes(activeUrl))
        ) {
          video.currentTime = lastWatched.currentTime;
        }
      }

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
    const interval = setInterval(() => {
      if (featuredPosts.length > 0) {
        nextFeatured();
      }
      setCarouselActiveIndex((prev) => (prev + 1) % 6);
    }, 7000);
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
      {!isReelsOpen && !selectedAuthorName && (
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
                {selectedPost ? 'د پوسټ لوستل' : selectedAuthorName ? `د ${selectedAuthorName} پېژندڅېره` : isAboutPageOpen ? 'زمونږ په اړه معلومات' : isContactPageOpen ? 'زمونږ سره اړیکه' : isSettingsPageOpen ? 'د اپلیکیشن تنظیمات' : isSearchOpen ? 'په پوسټونو کې پلټنه' : isFullFeedOpen ? 'ټول آرشیف پوسټونه' : isReelsOpen ? 'شارټ ویډیوګانې (Reels)' : isPhotoReelsOpen ? 'ښکلي انځورونه (Images Carousel)' : isCategoryPageOpen ? 'د شعرونو ډلبندي (ککړۍ)' : isNovelsPageOpen ? 'د کیسو او ناولونو برخه' : 'پښتو ادبي خزانه'}
              </h1>
            </div>
          </div>

          {/* Left side: Back navigation actions and the Action popup */}
          <div className="flex items-center gap-2 relative">
            {(selectedPost || selectedAuthorName || isAboutPageOpen || isContactPageOpen || isSettingsPageOpen || isFullFeedOpen || isSearchOpen || isReelsOpen || isPhotoReelsOpen || isCategoryPageOpen || isNovelsPageOpen) && (
              <button
                onClick={() => {
                  if (profileBackAuthorName && (selectedPost || isReelsOpen || isPhotoReelsOpen || isStoryViewerOpen)) {
                    setSelectedPost(null);
                    setIsReelsOpen(false);
                    setIsPhotoReelsOpen(false);
                    setIsStoryViewerOpen(false);
                    setSelectedAuthorName(profileBackAuthorName);
                    setProfileBackAuthorName(null);
                  } else {
                    setSelectedPost(null);
                    setSelectedAuthorName(null);
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
                    setProfileBackOrigin(null);
                    setProfileBackAuthorName(null);
                  }
                }}
                style={{ cursor: 'pointer' }}
                className={`px-3 py-1.5 ${tc.bg} ${tc.hoverBg} active:scale-95 rounded-lg text-xs font-bold text-white transition flex items-center gap-1.5 shrink-0`}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{profileBackAuthorName ? "شاته پروفایل ته" : "کورپاڼه"}</span>
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
              className={`fixed right-0 top-0 bottom-0 w-72 sm:w-80 ${sidebarBg} border-l z-50 shadow-2xl flex flex-col justify-between text-right overflow-hidden`}
            >
              {/* 1. IMMERSIVE HERO BANNER WITH GRADIENT OVERLAY (ټول بینر ښه ښکاري او لیکل پکې پښتو ادبي خزانه دي) */}
              <div className="relative h-44 w-full overflow-hidden flex-shrink-0 bg-slate-950 border-b border-indigo-500/20">
                <img 
                  src={sidebarBannerImg} 
                  alt="Pashto Literary Treasure Banner" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Contrast gradient layers for maximum readability on all screens */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/30" />
                <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-slate-950/90" />

                {/* Safe Area Header Overlay with explicit translation to Pashto Literary Treasure */}
                <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center z-10 select-none">
                  <span className="text-[9px] font-black tracking-widest text-indigo-400 uppercase bg-indigo-950/85 border border-indigo-500/30 px-2 py-0.5 rounded-md mb-1.5 backdrop-blur-xs">
                    د پښتني کلتور روښانه ډيوه
                  </span>
                  <h3 className="text-xl font-extrabold text-amber-400 font-sans tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.98)] text-center">
                    پښتو ادبي خزانه
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-1" />
                  <p className="text-[10px] text-slate-300 font-bold font-sans mt-1.5 drop-shadow">
                    شعرونه، لنډۍ او خوږ الګوریتمونه
                  </p>
                </div>

                {/* Ergonomic Close Button aligned safe for notches */}
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  style={{ top: 'calc(0.5rem + var(--safe-top))', cursor: 'pointer' }}
                  className="absolute left-2.5 z-30 p-1.5 bg-black/70 hover:bg-white/10 text-white rounded-full transition border border-white/15 backdrop-blur-md active:scale-90"
                  title="تړل"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2. EXCLUSIVE DEVELOPER PROFILE CARD (Interactive Developer - clickable, elegant, and highly immersive) */}
              <div className="relative px-3 pt-1 flex-shrink-0 z-25 text-center">
                <div className="w-full -mt-7 mb-2.5">
                  <motion.div
                    whileHover={{ scale: 1.02, translateY: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsDevDetailOpen(true)}
                    style={{ cursor: 'pointer' }}
                    className={`p-3.5 rounded-2xl border ${
                      isDark 
                        ? 'bg-slate-900/95 border-indigo-500/30 hover:border-indigo-500/50 hover:bg-slate-850/95' 
                        : 'bg-white border-indigo-100 hover:border-indigo-300 hover:bg-slate-50/50'
                    } text-center shadow-lg backdrop-blur-xs flex flex-row-reverse items-center justify-between gap-3.5 transition-all group relative overflow-hidden`}
                    title="د غوښتنلیک د لیکوال او جوړوونکي پېژندنه"
                  >
                    {/* Glowing background gradient */}
                    <div className="absolute -right-4 -top-4 w-12 h-12 rounded-full bg-indigo-500/10 blur-lg group-hover:scale-150 transition-all duration-500" />

                    <div className="flex items-center gap-3 flex-row-reverse min-w-0">
                      <div className="inline-block relative rounded-full p-0.5 bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-sm shrink-0">
                        <img
                          src={devPost?.photoUrl || developerAvatarImg}
                          alt="Obaidullah Ghaffari"
                          className="w-11 h-11 rounded-full object-cover border border-slate-900"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -top-0.5 -right-0.5 bg-blue-500 text-white rounded-full p-0.5 border border-slate-950 shadow flex items-center justify-center animate-pulse" style={{ width: '11px', height: '11px' }}>
                          <Check className="w-[6px] h-[6px] stroke-[4]" />
                        </span>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-slate-900 rounded-full" />
                      </div>
                      
                      <div className="text-right min-w-0">
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="bg-indigo-600/10 text-indigo-400 text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider border border-indigo-500/20">
                            سافټویر انجینر
                          </span>
                        </div>
                        <h4 className={`text-[12.5px] font-black ${isDark ? 'text-slate-100' : 'text-slate-800'} font-sans leading-tight mt-1`}>
                          {devName}
                        </h4>
                        <p className={`text-[9px] ${isDark ? 'text-indigo-300' : 'text-indigo-600'} font-bold mt-0.5`}>
                          د غوښتنلیک منځپانګه جوړوونکی
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 text-indigo-400 group-hover:text-white w-8 h-8 rounded-xl border border-indigo-500/20 transition-all duration-300 shrink-0">
                      <User className="w-4.5 h-4.5" />
                    </div>

                    {/* Interactive glowing guide indicator */}
                    <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 opacity-50 group-hover:opacity-100" />
                  </motion.div>
                </div>
              </div>

              {/* 3. SIDEBAR NAVIGATION CONTENT WITH INTERACTIVE GRADIENT BUTTONS */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin text-right">
                <div className="flex flex-col gap-2 font-sans">
                  <p className={`text-[10px] ${textMuted} font-black tracking-wider mb-1 px-1.5 uppercase`}>د پښتو ادبي خزانې برښنایي برخې</p>
                  
                  {/* ۱. تنظیمات */}
                  <motion.button
                    whileHover={{ x: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setIsSettingsPageOpen(true);
                      setSelectedPost(null);
                      setIsFullFeedOpen(false);
                      setIsSearchOpen(false);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${
                      isDark 
                        ? 'hover:bg-slate-800/85 text-slate-200 hover:text-indigo-400 hover:border-indigo-500/40' 
                        : 'hover:bg-slate-200/85 text-slate-800 hover:text-indigo-700 hover:border-indigo-400/40'
                    } rounded-xl text-xs font-black transition border flex items-center justify-between gap-3 shadow-xs group`}
                  >
                    <div className="flex items-center gap-2 text-right">
                      <Settings className={`w-4 h-4 text-indigo-500 group-hover:animate-spin-slow`} />
                      <span className="font-extrabold">{tr.settings}</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                  </motion.button>

                  {/* ۲. پلټنه */}
                  <motion.button
                    whileHover={{ x: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setIsSearchOpen(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${
                      isDark 
                        ? 'hover:bg-slate-800/85 text-slate-200 hover:text-indigo-400 hover:border-indigo-500/40' 
                        : 'hover:bg-slate-200/85 text-slate-800 hover:text-indigo-700 hover:border-indigo-400/40'
                    } rounded-xl text-xs font-black transition border flex items-center justify-between gap-3 shadow-xs group`}
                  >
                    <div className="flex items-center gap-2 text-right">
                      <Search className={`w-4 h-4 text-indigo-500`} />
                      <span className="font-extrabold">دلته ورننوځئ (پلټنه)</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                  </motion.button>

                  {/* ۳. زمونږ په اړه */}
                  <motion.button
                    whileHover={{ x: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setIsAboutPageOpen(true);
                      setIsSettingsPageOpen(false);
                      setIsFullFeedOpen(false);
                      setIsSearchOpen(false);
                      setSelectedPost(null);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${
                      isDark 
                        ? 'hover:bg-slate-800/85 text-slate-200 hover:text-indigo-400 hover:border-indigo-500/40' 
                        : 'hover:bg-slate-200/85 text-slate-800 hover:text-indigo-700 hover:border-indigo-400/40'
                    } rounded-xl text-xs font-black transition border flex items-center justify-between gap-3 shadow-xs group`}
                  >
                    <div className="flex items-center gap-2 text-right">
                      <Info className={`w-4 h-4 text-indigo-500`} />
                      <span className="font-extrabold">لیکوال او زمونږ په اړه</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                  </motion.button>

                  {/* ۵. د ټلیګرام چینل */}
                  <motion.a
                    whileHover={{ x: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://t.me/${feedData?.channelInfo?.username || 'da_mine_dewa'}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${
                      isDark 
                        ? 'hover:bg-slate-800/85 text-slate-200 hover:text-sky-400 hover:border-sky-500/40' 
                        : 'hover:bg-slate-200/85 text-slate-800 hover:text-sky-700 hover:border-sky-400/40'
                    } rounded-xl text-xs font-black transition border flex items-center justify-between gap-3 shadow-xs group`}
                  >
                    <div className="flex items-center gap-2 text-right">
                      <Send className={`w-4 h-4 text-sky-500 -rotate-12`} />
                      <span className="font-extrabold">زمونږ رسمي ټلیګرام چینل</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-sky-400" />
                  </motion.a>

                  {/* ۶. نور اپليکيشنونه */}
                  <motion.a
                    whileHover={{ x: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://t.me/obaidapp"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setIsSidebarOpen(false);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${
                      isDark 
                        ? 'hover:bg-slate-800/85 text-slate-200 hover:text-indigo-400 hover:border-indigo-500/40' 
                        : 'hover:bg-slate-200/85 text-slate-800 hover:text-indigo-700 hover:border-indigo-400/40'
                    } rounded-xl text-xs font-black transition border flex items-center justify-between gap-3 shadow-xs group`}
                  >
                    <div className="flex items-center gap-2 text-right">
                      <Grid className={`w-4 h-4 text-indigo-500`} />
                      <span className="font-extrabold">نور ښکلي اپليکيشنونه</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                  </motion.a>

                  {/* لارښود او پېژندنه */}
                  <motion.button
                    whileHover={{ x: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setActiveOnboardingPage(0);
                      setShowOnboarding(true);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${
                      isDark 
                        ? 'hover:bg-slate-800/85 text-slate-200 hover:text-amber-400 hover:border-amber-500/40' 
                        : 'hover:bg-slate-200/85 text-slate-800 hover:text-amber-700 hover:border-amber-400/40'
                    } rounded-xl text-xs font-black transition border flex items-center justify-between gap-3 shadow-xs group`}
                  >
                    <div className="flex items-center gap-2 text-right">
                      <HelpCircle className={`w-4 h-4 text-amber-500`} />
                      <span className="font-extrabold">لارښوونه او پیژندنه</span>
                    </div>
                    <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  </motion.button>

                  <div className="h-0.5 my-1" />

                  {/* ۷. له اپلیکیشن څخه وتل */}
                  <motion.button
                    whileHover={{ x: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setShowExitConfirmation(true);
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-3 ${subCardBg} ${
                      isDark 
                        ? 'hover:bg-rose-950/20 text-rose-450 border-rose-950/30 hover:border-rose-500/40' 
                        : 'hover:bg-rose-50 text-rose-600 border-rose-200 hover:border-rose-300'
                    } rounded-xl text-xs font-black transition border flex items-center justify-between gap-3 shadow-xs group`}
                  >
                    <div className="flex items-center gap-2 text-right">
                      <LogOut className="w-4 h-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
                      <span className="font-extrabold text-rose-550 dark:text-rose-400">اپلیکیشن بندول (وتل)</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main View Area */}
      <main className={`flex-1 w-full mx-auto flex flex-col ${
        selectedAuthorName 
          ? 'max-w-full px-0 py-0 gap-0' 
          : 'max-w-[580px] px-4 py-6 gap-6'
      }`}>
        
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
        {isTransitioning ? (
          <ShimmerPageLoader isDark={isDark} viewKey={activeViewKey} />
        ) : isLoading && !feedData ? (
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
                <div className="space-y-3 select-none px-1 pb-3 border-b border-slate-500/10">
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

                  {/* Elegant Interactive Typography Controls */}
                  <div className={`mt-3 p-3 rounded-2xl ${isDark ? 'bg-slate-900/40 border-slate-800/60' : 'bg-slate-100/50 border-slate-200'} border flex flex-col sm:flex-row items-center justify-between gap-3 text-right`}>
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[11px] font-black ${isDark ? 'text-slate-300' : 'text-slate-700'} font-sans`}>
                        ↔️ د کرښو عمودي فاصله (فاصله):
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => changeReaderLineHeight(readerLineHeight - 0.1)}
                          style={{ cursor: 'pointer' }}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black transition ${
                            isDark ? 'bg-slate-850 hover:bg-slate-750 text-white border border-slate-800' : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-250'
                          }`}
                          title="کمول"
                        >
                          -
                        </button>
                        <span className="min-w-[34px] text-center font-mono font-black text-xs text-indigo-400">
                          {toPashtoNumber(readerLineHeight.toFixed(1))}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeReaderLineHeight(readerLineHeight + 0.1)}
                          style={{ cursor: 'pointer' }}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black transition ${
                            isDark ? 'bg-slate-850 hover:bg-slate-755 text-white border border-slate-800' : 'bg-white hover:bg-slate-200 text-slate-850 border border-slate-250'
                          }`}
                          title="زیاتول"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className={`text-[11px] font-black ${isDark ? 'text-slate-300' : 'text-slate-700'} font-sans`}>
                        🔎 د هورفونو/متن اندازه:
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => changeReaderFontSize(readerFontSize - 1)}
                          style={{ cursor: 'pointer' }}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black transition ${
                            isDark ? 'bg-slate-850 hover:bg-slate-750 text-white border border-slate-800' : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-250'
                          }`}
                          title="کوچنی کول"
                        >
                          A-
                        </button>
                        <span className="min-w-[34px] text-center font-mono font-black text-xs text-indigo-400">
                          {toPashtoNumber(readerFontSize.toString())}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeReaderFontSize(readerFontSize + 1)}
                          style={{ cursor: 'pointer' }}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black transition ${
                            isDark ? 'bg-slate-850 hover:bg-slate-755 text-white border border-slate-800' : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-250'
                          }`}
                          title="لوی کول"
                        >
                          A+
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chapter Title */}
                <div className="text-center py-2 border-b border-slate-500/10 pb-4">
                  <h2 className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    {getPostTextWithFallback(activeNovelTextChapter) 
                      ? getPostTextWithFallback(activeNovelTextChapter).replace(/#[^\s]+/g, '').split('\n').filter((l: string) => l.trim() !== '')[0] || 'بې سرلیکه برخه'
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
                    className={`text-right font-sans ${isDark ? 'text-slate-200' : 'text-slate-800'} space-y-2 sm:space-y-2.5`}
                    style={{ direction: 'rtl', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                  >
                    {(() => {
                      const chapterFullText = getPostTextWithFallback(activeNovelTextChapter);
                      const cleanedText = removeHashtagsOnly(chapterFullText);
                      const lines = cleanedText.split('\n');
                      const firstLineRaw = chapterFullText.split('\n')[0] || '';
                      const firstLineClean = firstLineRaw.replace(/#[^\s]+/g, '').trim();

                      return lines
                        .filter((line, i) => {
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
                              className={`group relative p-3.5 sm:p-4 rounded-2.5xl transition-all duration-200 text-right flex items-start gap-3 select-none border border-transparent ${
                                isBookmarked 
                                  ? isDark 
                                    ? 'bg-indigo-950/25 border-indigo-500/20 shadow-[0_2px_12px_rgba(99,102,241,0.08)]' 
                                    : 'bg-indigo-50/55 border-indigo-200/60 shadow-xs'
                                  : 'hover:bg-slate-500/5'
                              }`}
                            >
                              <div className="flex-1 text-right min-w-0">
                                <p 
                                  className={`font-medium whitespace-pre-wrap ${
                                    isBookmarked 
                                      ? isDark ? 'text-indigo-200' : 'text-indigo-950 font-black' 
                                      : isDark ? 'text-slate-200' : 'text-slate-800'
                                  }`}
                                  style={{ fontSize: `${readerFontSize}px`, lineHeight: readerLineHeight }}
                                >
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
                                    ? 'bg-indigo-505/20 text-indigo-505' 
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
                        });
                    })()}
                  </div>
                </div>

                {/* Guard notice */}
                <div className="pt-4 border-t border-slate-500/10 text-center select-none">
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
                          {selectedPost.hasAudio ? '🔊 غږيز ناول' : '✍️ ليکل شوی ناول'}
                        </span>
                        <span className="bg-emerald-500/15 text-emerald-500 font-sans font-black text-[9px] px-2 py-0.5 rounded border border-emerald-500/10">
                          📖 : : بشپړ ناول
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 flex items-center gap-1 mr-1">
                          <Eye className="w-3 h-3 text-slate-500" />
                          {selectedPost.views || '0'} کتنې
                        </span>
                      </div>
                    </div>

                    {/* Overview text (HASHTAGS INVISIBLE - د ناول پېژندنې معلومات بې له هشټاګونو) */}
                    <div className={`p-4 rounded-2.5xl border ${isDark ? 'bg-slate-950/40 border-transparent' : 'bg-slate-50 border-slate-100'} w-full`}>
                      <h3 className="text-xs font-black text-indigo-400 mb-2 font-sans flex items-center gap-1">
                        <span>📌 د دې اثر خلاصه او پېژندنه:</span>
                      </h3>
                      <BeautifulTelegramText 
                        text={removeHashtagsOnly(getPostTextWithFallback(selectedPost))} 
                        isDark={isDark} 
                        fs={{ body: 'text-[13.5px] sm:text-[14px] text-right font-medium leading-[2.1] sm:leading-[2.3]' }} 
                        limitLines={250} 
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
                              <p className={`text-[11.5px] font-medium leading-[1.65] font-sans pr-1 text-justify ${
                                isDark ? 'text-slate-300' : 'text-slate-700'
                              }`}>
                                {bookmark.textSnippet ? bookmark.textSnippet.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim() : ''}
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
                                      ? 'bg-slate-900/60 border-slate-800/85 hover:bg-slate-800 hover:border-indigo-500/20 shadow-md' 
                                      : 'bg-white border-slate-205 shadow-sm hover:bg-slate-50 hover:border-indigo-500/20'
                                  }`}
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
                <span>{selectedAuthorName ? "شاته پروفایل ته" : "شاته کورپاڼې ته"}</span>
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
                  <div key={idx} className="relative bg-black flex flex-col items-center w-full p-1 border border-slate-800 rounded-xl overflow-hidden max-w-md mx-auto">
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
                <div className="space-y-3.5 sm:space-y-4 select-text" style={{ direction: 'rtl' }}>
                  {(() => {
                    // Split raw htmlText into individual pieces on HTML line breaks
                    const htmlParagraphs = selectedPost.htmlText.split(/<br\s*\/?>/gi);
                    return htmlParagraphs.map((htmlPara, idx) => {
                      const cleanPara = htmlPara.trim();
                      if (!cleanPara) {
                        return <div key={idx} className="h-1.5 sm:h-2" />;
                      }
                      return (
                        <div
                          key={idx}
                          className={`${isDark ? 'text-slate-200' : 'text-slate-800 font-medium'} text-[15.5px] sm:text-[17px] leading-[1.85] sm:leading-[1.95] font-sans break-words telegram-styles text-right pr-1`}
                          dangerouslySetInnerHTML={{ __html: makeHtmlHashtagsClickable(cleanPara) }}
                        />
                      );
                    });
                  })()}
                </div>
              ) : (
                <BeautifulTelegramText 
                  text={getPostTextWithFallback(selectedPost)} 
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
                                {part.hasAudio ? '🔊 غږيز' : '✍️ ليکل شوی'}
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
                <div className={`grid grid-cols-2 md:grid-cols-5 gap-2.5 pt-3.5 border-t ${isDark ? 'border-slate-800/40' : 'border-slate-205'}`}>
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
                    onClick={() => toggleToRead(selectedPost.id)}
                    style={{ cursor: 'pointer' }}
                    className={`py-3 px-3.5 border rounded-xl text-[11px] sm:text-[11.5px] font-bold transition active:scale-95 flex items-center justify-center gap-2 group shadow-xs ${
                      toReadPostIds.includes(selectedPost.id)
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-650 font-black dark:text-amber-400'
                        : `${isDark ? 'bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-900' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-755'}`
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 transition-all duration-300 ${
                      toReadPostIds.includes(selectedPost.id) ? 'text-amber-500 fill-amber-500 scale-110 animate-pulse' : 'text-slate-400 group-hover:text-amber-500'
                    }`} />
                    <span>{toReadPostIds.includes(selectedPost.id) ? 'وروسته لوستل کیږي' : 'وروسته لوستل'}</span>
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
              <span 
                onClick={() => {
                  const authorName = selectedPost.authorName || feedData?.channelInfo?.title || "پښتو ادبي خزانه";
                  setSelectedAuthorName(authorName);
                  setProfileBackAuthorName(null);
                  setSelectedPost(null);
                }}
                className={`text-[11.5px] font-sans ${isDark ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-800 hover:text-indigo-650'} font-semibold cursor-pointer transition`}
                title="د خپرونکي د ټولو پوسټونو لیدل"
              >
                {selectedPost.authorName ? `خپرونکی: ${selectedPost.authorName}` : 'د مینې ډېوه خپرونه'}
              </span>
            </div>
          </article>
        )
      ) : selectedAuthorName ? (
          /* ==========================================================
             AUTHOR PROFILE SCREEN (د لیکوال پېژندڅېرې پاڼه) - Full Screen/Full Width Layout
             ========================================================== */
          <div className="animate-fade-in text-right flex flex-col w-full min-h-screen">
            {/* Custom Transparent/Glassy Header overlaying the cover image */}
            <div 
              style={{ paddingTop: 'calc(0.75rem + var(--safe-top))' }}
              className="sticky top-0 z-50 w-full px-4 pb-3 bg-slate-950/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between shadow-xs"
            >
              <button
                onClick={() => {
                  if (profileBackOrigin === 'reels') {
                    setActiveReelIndex(profileBackReelIndex);
                    setIsReelsOpen(true);
                  } else if (profileBackOrigin === 'photo_reels') {
                    setActivePhotoReelIndex(profileBackReelIndex);
                    setIsPhotoReelsOpen(true);
                  }
                  setSelectedAuthorName(null);
                  setProfileBackOrigin(null);
                }}
                style={{ cursor: 'pointer' }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95 font-bold text-xs shrink-0 select-none"
                title="شاته کورپاڼې ته"
              >
                <ArrowRight className="w-4 h-4" />
                <span>شاته تګ</span>
              </button>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/10 text-white">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span className="text-xs font-black font-sans truncate max-w-[150px]">{selectedAuthorName}</span>
                </div>
              </div>
            </div>

              {/* Profile Card Header */}
              {(() => {
                const baseAuthorPosts = feedData?.posts ? feedData.posts.filter(p => {
                  if (!p) return false;
                  
                  // Exclude novel-related posts from profile
                  if (getIsNovelOrNovelPart(p)) {
                    return false;
                  }
                  
                  const pAuthor = p.authorName || feedData?.channelInfo?.title || "پښتو ادبي خزانه";
                  const textLower = (p.text || '').toLowerCase();

                  // Exclude hashtag-hidden posts (#dev, #admin) for all users under their profiles
                  if (textLower.includes('#dev') || textLower.includes('#admin')) {
                    return false;
                  }
                  
                  if (textLower.includes('channel created') || p.id === '1') {
                    return false;
                  }
                  
                  return pAuthor.toLowerCase() === (selectedAuthorName || '').toLowerCase();
                }) : [];

                const totalViewsCount = baseAuthorPosts.reduce((sum, p) => {
                  const v = parseInt((p.views || '0').replace(/[^0-9]/g, ''));
                  return sum + (isNaN(v) ? 0 : v);
                }, 0);

                const avatarUrl = selectedAuthorName && selectedAuthorName !== "پښتو ادبي خزانه" && selectedAuthorName !== (feedData?.channelInfo?.title)
                  ? `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedAuthorName)}&background=6366f1&color=fff&size=128&bold=true`
                  : (feedData?.channelInfo?.avatarUrl || "https://t.me/i/userpic/320/obaidapp.jpg");

                // Determine the profile photo and cover photo dynamically based on who the selectedAuthorName is:
                let finalProfileUrl = avatarUrl;
                let finalCoverUrl = "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200&auto=format&fit=crop&q=80";

                const authorNameLower = (selectedAuthorName || '').toLowerCase();
                const isDev = devName && authorNameLower === devName.toLowerCase();
                const isStaticAdmin = adminName && authorNameLower === adminName.toLowerCase();
                
                // Let's see if this author matches an admin in adminsList
                const matchingAdminInList = adminsList.find(a => a.name.toLowerCase() === authorNameLower);

                if (isDev) {
                  finalProfileUrl = devPost?.photoUrls?.[0] || devPost?.photoUrl || developerAvatarImg;
                  finalCoverUrl = devPost?.photoUrls?.[1] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80";
                } else if (matchingAdminInList) {
                  const p = matchingAdminInList.post;
                  finalProfileUrl = p?.photoUrls?.[0] || p?.photoUrl || matchingAdminInList.avatar;
                  finalCoverUrl = p?.photoUrls?.[1] || "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";
                } else if (isStaticAdmin) {
                  finalProfileUrl = adminPost?.photoUrls?.[0] || adminPost?.photoUrl || adminAvatarImg;
                  finalCoverUrl = adminPost?.photoUrls?.[1] || "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";
                } else {
                  // General author: Let's find any post by this author that has photos
                  const authorPostWithImg = feedData?.posts?.find(p => p && p.authorName && p.authorName.toLowerCase() === authorNameLower && (p.photoUrl || (p.photoUrls && p.photoUrls.length > 0)));
                  if (authorPostWithImg) {
                    finalProfileUrl = authorPostWithImg.photoUrls?.[0] || authorPostWithImg.photoUrl || finalProfileUrl;
                    if (authorPostWithImg.photoUrls && authorPostWithImg.photoUrls.length > 1) {
                      finalCoverUrl = authorPostWithImg.photoUrls[1];
                    } else {
                      finalCoverUrl = authorPostWithImg.photoUrl || finalCoverUrl;
                    }
                  }
                }

                // Filter by profile selected category
                const authorPosts = baseAuthorPosts.filter(p => {
                  if (profileSelectedCategory === 'all') return true;
                  if (profileSelectedCategory === 'writings_plain') return getIsWriting(p);
                  if (profileSelectedCategory === 'poems') return getIsPoem(p);
                  if (profileSelectedCategory === 'videos') return !!p.hasVideo || !!p.videoUrl || !!p.videoThumbUrl;
                  if (profileSelectedCategory === 'audio') return !!p.hasAudio || !!p.audioUrl;
                  if (profileSelectedCategory === 'pdf') return getIsBook(p);
                  if (profileSelectedCategory === 'images') return !!p.photoUrl || (p.photoUrls && p.photoUrls.length > 0);
                  return true;
                });

                return (
                  <div className="flex-1 w-full pb-16 flex flex-col">
                    {/* 1. Full Screen/Full Width Cover Image (کاور عکس پول سکرين) with beautiful top offset overlay */}
                    <div className="h-44 sm:h-56 w-full relative overflow-hidden -mt-[49px]">
                      <img
                        src={finalCoverUrl}
                        alt="Cover Background"
                        className="w-full h-full object-cover filter brightness-[0.65]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    </div>
                    
                    {/* 2. Overlapping Circular Profile Image (دايروي عکس) */}
                    <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center z-20">
                      <PremiumAvatar
                        src={finalProfileUrl}
                        sizeClass="w-32 h-32 sm:w-36 sm:h-36"
                        ringSize="p-[3.5px]"
                        showStoryRing={true}
                      />
                    </div>

                    {/* Spacer and Info */}
                    <div className="px-4 sm:px-6 pt-3 flex flex-col items-center text-center">
                      {/* 3. Beautifully Styled Name (نوم ښايسته سټايل) */}
                      <div className="space-y-1.5">
                        <h2 className={`text-2xl sm:text-3xl font-black font-sans tracking-tight drop-shadow-md select-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {selectedAuthorName}
                        </h2>
                        <p className="text-xs text-indigo-400 font-extrabold tracking-wide flex items-center justify-center gap-1.5 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                          <span>د پښتو ادبي خزانې غوره لیکوال / خپرونکی</span>
                        </p>
                      </div>

                      {/* Stats Row */}
                      <div className={`grid grid-cols-2 gap-4 w-full max-w-sm border-t border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} py-4 mt-6`}>
                        <div className="text-center">
                          <span className={`block text-xl font-black font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{baseAuthorPosts.length}</span>
                          <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-550'} font-bold`}>ټول خپاره شوي پوسټونه</span>
                        </div>
                        <div className="text-center border-r border-slate-900/60">
                          <span className={`block text-xl font-black font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{totalViewsCount.toLocaleString()}</span>
                          <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-550'} font-bold`}>ټولې لیدنې (Views)</span>
                        </div>
                      </div>

                      {/* Biography Button for Admins/Developers */}
                      {(() => {
                        const matchingAdmin = adminsList.find(a => a.name.toLowerCase() === (selectedAuthorName || '').toLowerCase());
                        if (!matchingAdmin) return null;
                        return (
                          <div className="mt-4 w-full max-w-sm">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                if (matchingAdmin.isDev) {
                                  setIsDevDetailOpen(true);
                                } else {
                                  setIsAdminDetailOpen(true);
                                }
                              }}
                              style={{ cursor: 'pointer' }}
                              className={`w-full py-3.5 px-5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 select-none ${
                                matchingAdmin.isDev
                                  ? 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white shadow-indigo-950/40 hover:shadow-indigo-500/35 border border-indigo-500/25'
                                  : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white shadow-amber-950/40 hover:shadow-amber-500/35 border border-amber-500/25'
                              }`}
                            >
                              <User className="w-4 h-4" />
                              <span>د پېژندنې او ژوندلیک بشپړ مینو وګورئ 👤</span>
                            </motion.button>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 4. Beautiful Category tab design like the Home page */}
                    <div className="px-4 sm:px-6 space-y-3 pt-6">
                      <div className="flex items-center justify-between border-b border-slate-500/10 dark:border-slate-800 pb-2" style={{ direction: 'rtl' }}>
                        <span className={`text-[12.5px] font-black ${isDark ? 'text-slate-300' : 'text-slate-800'} flex items-center gap-1.5`}>
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                          <span>موضوعات / ډلبندي (د لیکوال په مطالبو کې لټون)</span>
                        </span>
                        <span className="text-[11px] text-slate-400 font-bold">({authorPosts.length} پاڼې)</span>
                      </div>
                      
                      <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 overflow-visible">
                        <div 
                          className="flex gap-2.5 overflow-x-auto py-4 px-3.5 scrollbar-none snap-x snap-mandatory overflow-y-visible animate-fade-in"
                          style={{ direction: 'rtl', WebkitOverflowScrolling: 'touch' }}
                        >
                          {[
                            { id: 'all', label: 'ټول مطالب', icon: Sparkles, activeClass: 'bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 border-transparent shadow-[0_4px_12px_rgba(236,72,153,0.35)]' },
                            { id: 'writings_plain', label: 'ليکنې', icon: FileText, activeClass: 'cat-btn-writings-active' },
                            { id: 'poems', label: 'شعرونه', icon: Feather, activeClass: 'cat-btn-poems-active' },
                            { id: 'videos', label: 'ويډيويي', icon: Video, activeClass: 'cat-btn-videos-active' },
                            { id: 'audio', label: 'غږيز', icon: Music, activeClass: 'cat-btn-audio-active' },
                            { id: 'pdf', label: 'کتابونه', icon: BookOpen, activeClass: 'cat-btn-pdf-active' },
                            { id: 'images', label: 'انځورونه', icon: ImageIcon, activeClass: 'cat-btn-images-active' },
                          ].map((cat) => {
                            const CatIcon = cat.icon;
                            const isActive = profileSelectedCategory === cat.id;
                            return (
                              <button
                                key={cat.id}
                                onClick={() => setProfileSelectedCategory(cat.id)}
                                style={{ cursor: 'pointer' }}
                                className={`snap-center flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12.5px] font-black transition-all duration-300 select-none border whitespace-nowrap active:scale-[0.96] ${
                                  isActive 
                                    ? cat.activeClass.includes('cat-btn') ? `${cat.activeClass} text-white border-transparent transform scale-[1.04]` : `${cat.activeClass} text-white border-transparent transform scale-[1.04]`
                                    : `${isDark ? 'bg-slate-900/60 hover:bg-slate-800 border-slate-800/70 text-slate-300 hover:text-white shadow-xs' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950 shadow-xs'}`
                                }`}
                              >
                                <CatIcon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-white scale-110 rotate-3' : isDark ? 'text-slate-455' : 'text-slate-500'}`} />
                                <span className="font-sans tracking-tight">{cat.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Posts list */}
                    {authorPosts.length === 0 ? (
                      <div className="mx-4 sm:mx-6 mt-5 text-center py-16 px-4 rounded-3xl bg-slate-500/5 border border-dashed border-slate-500/10">
                        <FileText className="w-12 h-12 text-slate-400 mx-auto opacity-30 mb-3" />
                        <p className={`text-xs ${textMuted} font-black`}>
                          د دې کټګورۍ لپاره هیڅ پوسټ ونه موندل شو.
                        </p>
                      </div>
                    ) : (
                      <div className={`px-4 sm:px-6 pt-5 flex-1 ${
                        homeLayout === 'grid' ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3'
                      }`}>
                        {authorPosts.slice(0, visibleProfileCount).map((post) => {
                          const handleClick = () => {
                            setProfileBackOrigin(null);
                            
                            const currentScroll = window.scrollY || document.documentElement.scrollTop;
                            if (currentScroll > 0) {
                              detailScrollPosRef.current = currentScroll;
                            }
                            
                            // د شاتګ لپاره د اوسني لیکوال نوم خوندي کول او د پروفایل بندول
                            if (selectedAuthorName) {
                              setProfileBackAuthorName(selectedAuthorName);
                            }
                            setSelectedAuthorName(null);
                            
                            if (isStoryPost(post)) {
                              const stIdx = storiesList.findIndex(s => s.id === post.id);
                              if (stIdx !== -1) {
                                setActiveStoryIndex(stIdx);
                                setIsStoryViewerOpen(true);
                                markPostAsRead(post.id);
                              } else {
                                setSelectedPost(post);
                                markPostAsRead(post.id);
                              }
                            } else if (post.hasVideo || post.videoUrl || (post.videoList && post.videoList.length > 0)) {
                              const idx = reelsList.findIndex(r => r.post.id === post.id);
                              if (idx !== -1) {
                                setActiveReelIndex(idx);
                                setIsReelsOpen(true);
                                markPostAsRead(post.id);
                              } else {
                                setSelectedPost(post);
                                markPostAsRead(post.id);
                              }
                            } else if (post.photoUrl || (post.photoUrls && post.photoUrls.length > 0)) {
                              const idx = photoReelsList.findIndex(p => p.post.id === post.id);
                              if (idx !== -1) {
                                setActivePhotoReelIndex(idx);
                                setIsPhotoReelsOpen(true);
                                markPostAsRead(post.id);
                              } else {
                                setSelectedPost(post);
                                markPostAsRead(post.id);
                              }
                            } else {
                              setSelectedPost(post);
                              markPostAsRead(post.id);
                            }
                          };

                          // 1. STANDARD LIST VIEW OR FALLBACK
                          if (homeLayout === 'standard' || !homeLayout || homeLayout === 'minimalist' || homeLayout === 'cards') {
                            const isRead = readPostIds.includes(post.id);
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

                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleToRead(post.id);
                                          }}
                                          className={`focus:outline-hidden p-1.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 ${
                                            toReadPostIds.includes(post.id)
                                              ? 'text-amber-500 bg-amber-500/10'
                                              : 'text-slate-400 hover:text-amber-400 hover:bg-slate-500/10'
                                          }`}
                                          style={{ cursor: 'pointer' }}
                                          title="وروسته لوستل"
                                        >
                                          <Bookmark className={`w-3.5 h-3.5 ${toReadPostIds.includes(post.id) ? 'fill-amber-500' : ''}`} />
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
                                        className="flex gap-2 overflow-x-auto pb-1.5 pt-1 scrollbar-thin scrollbar-thumb-slate-700 mt-2.5"
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
                                className={`${cardBg} rounded-xl overflow-hidden flex flex-col transition group active:scale-[0.98] select-none text-right shadow-sm border border-slate-500/5`}
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
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                                      <PlayCircle className="w-8 h-8 text-white drop-shadow" />
                                    </span>
                                  )}
                                </div>

                                <div className="p-3 flex-1 flex flex-col justify-between gap-2.5 text-right">
                                  <BeautifulTelegramText 
                                    text={getPostTextWithFallback(post)}
                                    isDark={isDark}
                                    fs={fs}
                                    limitLines={4}
                                  />

                                  <div className="flex items-center justify-between text-[8.5px] text-slate-400 border-t border-slate-500/10 dark:border-slate-800/60 pt-2" style={{ direction: 'rtl' }}>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-2.5 h-2.5" />
                                      {getRelativeTimeInPashto(post.date, post.timeLabel || 'وروستی')}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleFavorite(post.id);
                                        }}
                                        className={`focus:outline-hidden p-1 rounded-md transition ${
                                          favoritePostIds.includes(post.id) ? 'text-rose-500 bg-rose-500/10' : 'text-slate-400'
                                        }`}
                                      >
                                        <Heart className={`w-3 h-3 ${favoritePostIds.includes(post.id) ? 'fill-rose-500' : ''}`} />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleToRead(post.id);
                                        }}
                                        className={`focus:outline-hidden p-1 rounded-md transition ${
                                          toReadPostIds.includes(post.id) ? 'text-amber-500 bg-amber-500/10' : 'text-slate-400'
                                        }`}
                                      >
                                        <Bookmark className={`w-3 h-3 ${toReadPostIds.includes(post.id) ? 'fill-amber-500' : ''}`} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    )}

                    {/* GORGEOUS LOAD MORE BUTTON FOR PROFILE SECTION */}
                    {(!isAutoloadingMoreProfile && (visibleProfileCount < authorPosts.length || !hasReachedEnd)) ? (
                      <div className="mt-8 mb-6 flex flex-col items-center justify-center text-center">
                        <button
                          onClick={() => handleLoadMoreProfilePosts(authorPosts.length)}
                          style={{ cursor: 'pointer' }}
                          className={`px-8 py-3.5 rounded-full font-black text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-95 select-none ${
                            isDark
                              ? 'bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 text-white shadow-indigo-950/40 hover:shadow-indigo-500/35 border border-indigo-500/20 hover:scale-[1.04]'
                              : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-indigo-100 hover:shadow-indigo-500/20 hover:scale-[1.04]'
                          }`}
                        >
                          <ArrowDown className="w-4 h-4 animate-bounce" />
                          <span>نور وګورئ (د لیکوال نوي مطالب لوډ کړئ)</span>
                        </button>
                      </div>
                    ) : isAutoloadingMoreProfile ? (
                      <div className="mt-6 mb-6 flex justify-center text-center animate-pulse">
                        <div className={`px-6 py-2.5 rounded-full text-xs font-black flex items-center gap-2 ${
                          isDark ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                          <span>د نویو مطالبو راوړل... لطفا صبر وکړئ</span>
                        </div>
                      </div>
                    ) : (
                      authorPosts.length > 0 && (
                        <div className="mt-8 mb-6 text-center text-xs text-slate-400 font-bold select-none animate-fade-in">
                          ✨ د دې لیکوال ټول خپاره شوي مطالب مو وکتل! ✨
                        </div>
                      )
                    )}
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

              {/* Recent Search Queries (وروستي پلټنې) */}
              {!searchQuery && recentSearches.length > 0 && (
                <div className="space-y-3 mb-6 animate-fade-in text-right">
                  <div className="flex items-center justify-between border-b border-slate-500/10 pb-2 mb-2" style={{ direction: 'rtl' }}>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="text-[11px] font-black font-sans">وروستي لټونونه (د پلټنو تاریخچه):</span>
                    </div>
                    <button
                      onClick={() => {
                        setRecentSearches([]);
                        try {
                          localStorage.removeItem('recentSearches');
                        } catch {}
                      }}
                      style={{ cursor: 'pointer' }}
                      className={`text-[10px] font-bold py-1 px-2.5 rounded flex items-center gap-1 transition ${
                        isDark 
                          ? 'text-red-400 bg-red-950/10 hover:bg-red-950/30 hover:text-red-300' 
                          : 'text-red-700 bg-red-50/50 hover:bg-red-50 hover:text-red-800'
                      }`}
                      title="تاریخچه پاکول"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>پاکول</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-start md:justify-end" style={{ direction: 'rtl' }}>
                    {recentSearches.map((term, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setSearchQuery(term);
                            addToRecentSearches(term);
                          }}
                          style={{ cursor: 'pointer' }}
                          className={`text-[11px] px-3 py-1.5 rounded-lg transition font-bold select-none border whitespace-nowrap active:scale-95 ${
                            isDark 
                              ? 'bg-slate-900/60 border-slate-800 hover:bg-indigo-950/40 hover:border-indigo-500/40 text-indigo-300 hover:text-indigo-200' 
                              : 'bg-slate-100 border-slate-200 hover:bg-white hover:border-indigo-400 hover:shadow-xs text-indigo-700 hover:text-indigo-800'
                          }`}
                        >
                          {term}
                        </button>
                        <button
                          onClick={() => {
                            setRecentSearches(prev => {
                              const updated = prev.filter(q => q !== term);
                              try {
                                localStorage.setItem('recentSearches', JSON.stringify(updated));
                              } catch {}
                              return updated;
                            });
                          }}
                          style={{ cursor: 'pointer' }}
                          className={`p-1.5 rounded-lg border transition ${
                            isDark 
                              ? 'bg-slate-900/20 border-slate-800 hover:border-red-500/50 hover:bg-red-950/20 text-slate-400 hover:text-red-400' 
                              : 'bg-slate-50 border-slate-200 hover:border-red-400 hover:bg-red-50 text-slate-500 hover:text-red-500'
                          }`}
                          title="حذف"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                            className={`${isDark ? 'bg-slate-950/40 border-slate-900 hover:bg-slate-900/60' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-xs'} border p-3.5 rounded-xl flex items-center gap-3.5 transition group select-none text-right`}
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
                                  const isAudio = post.hasAudio || post.audioUrl || post.text?.includes('#غږیز') || post.text?.includes('#غږیزه');
                                  const isNovel = post.text?.includes('#ناول');

                                  return (
                                    <div
                                      key={item.id}
                                      onClick={() => resumeReadingItem(item)}
                                      style={{ cursor: 'pointer' }}
                                      className={`w-[130px] sm:w-[150px] shrink-0 snap-start rounded-2xl p-2.5 border transition-all duration-300 relative overflow-hidden flex flex-col text-right hover:scale-[1.03] active:scale-[0.98] ${
                                        isDark 
                                          ? 'bg-slate-900/70 border-transparent text-white' 
                                          : 'bg-white border-slate-200 text-slate-900 hover:border-indigo-500/30 shadow-xs'
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
                                        {post.photoUrl ? (
                                          <>
                                            <img 
                                              src={post.photoUrl} 
                                              alt="cover" 
                                              referrerPolicy="no-referrer"
                                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                          </>
                                        ) : (
                                          /* Beautiful typographic and artistic text layout cover (یو ښایسته او هنري لیکلی پوښ) */
                                          <div className={`w-full h-full relative p-2 flex flex-col justify-between items-start text-right transition-all duration-300 select-none overflow-hidden ${
                                            isAudio 
                                              ? 'bg-gradient-to-br from-amber-600 via-amber-700 to-orange-950 text-white' 
                                              : isNovel
                                                ? 'bg-gradient-to-br from-indigo-700 via-indigo-850 to-purple-950 text-white'
                                                : 'bg-gradient-to-br from-rose-600 via-purple-700 to-indigo-900 text-white'
                                          }`}>
                                            {/* Decorative inside thin golden/silver border frame */}
                                            <div className="absolute inset-1 border border-white/10 rounded-lg pointer-events-none z-10" />
                                            
                                            {/* Elegant watermark background icon */}
                                            <div className="absolute -bottom-1 -left-1 opacity-15 select-none pointer-events-none">
                                              {isAudio ? (
                                                <Music className="w-16 h-16 text-white" />
                                              ) : (
                                                <BookOpen className="w-16 h-16 text-white" />
                                              )}
                                            </div>

                                            {/* Top micro tag */}
                                            <div className="z-12 flex gap-1 items-center">
                                              {isAudio ? (
                                                <span className="text-[7px] font-black bg-black/30 backdrop-blur-xs text-amber-300 px-1.2 py-0.5 rounded-md border border-amber-500/20 flex items-center gap-0.5">
                                                  <Volume2 className="w-1.5 h-1.5" /> غږیز اثر
                                                </span>
                                              ) : (
                                                <span className="text-[7px] font-black bg-black/30 backdrop-blur-xs text-indigo-200 px-1.2 py-0.5 rounded-md border border-indigo-400/20 flex items-center gap-0.5">
                                                  <Feather className="w-1.5 h-1.5" /> لیکلی اثر
                                                </span>
                                              )}
                                            </div>

                                            {/* Middle typographic core text */}
                                            <div className="z-12 w-full pr-1.5 pb-1 flex flex-col items-start justify-end mt-auto text-right">
                                              <p className="text-[9px] font-black font-sans leading-tight text-white line-clamp-2 drop-shadow-sm">
                                                {item.title}
                                              </p>
                                              <span className="text-[6px] text-white/70 font-bold mt-0.5 block tracking-wide">
                                                {isNovel ? 'پښتو ناول' : 'ادبي کیسه'}
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                        
                                        <span className="absolute bottom-1 right-1.5 text-[8px] font-black bg-indigo-600/95 text-white px-1.5 py-0.5 rounded-md z-15">
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
                                  const isAudio = post.hasAudio || post.audioUrl || post.text?.includes('#غږیز') || post.text?.includes('#غږیزه');
                                  const isNovel = post.text?.includes('#ناول');
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
                                      {post.photoUrl ? (
                                        <>
                                          <CachedImage 
                                            src={post.photoUrl} 
                                            alt="liked-cover" 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                                        </>
                                      ) : (
                                        /* Beautiful vertical text-based typographic book cover (ښکلی عمودي متن لرونکی د کتاب پوښ) */
                                        <div className={`absolute inset-0 w-full h-full p-2.5 flex flex-col justify-between items-start text-right transition-all duration-300 select-none ${
                                          isAudio 
                                            ? 'bg-gradient-to-br from-amber-600 via-amber-700 to-orange-950 text-white' 
                                            : isNovel
                                              ? 'bg-gradient-to-br from-indigo-700 via-indigo-850 to-purple-950 text-white'
                                              : 'bg-gradient-to-br from-rose-600 via-purple-700 to-indigo-900 text-white'
                                        }`}>
                                          {/* Decorative inside thin elegant border frame */}
                                          <div className="absolute inset-1 border border-white/10 rounded-lg pointer-events-none z-10" />
                                          
                                          {/* Elegant watermark background icon */}
                                          <div className="absolute -bottom-2 -left-2 opacity-15 select-none pointer-events-none">
                                            {isAudio ? (
                                              <Music className="w-16 h-16 text-white" />
                                            ) : (
                                              <BookOpen className="w-16 h-16 text-white" />
                                            )}
                                          </div>

                                          {/* Micro category tag */}
                                          <div className="z-12 flex gap-1 items-center mt-6">
                                            {isAudio ? (
                                              <span className="text-[7px] font-black bg-black/30 backdrop-blur-xs text-amber-300 px-1 py-0.5 rounded border border-amber-500/20 flex items-center gap-0.5">
                                                <Volume2 className="w-1.5 h-1.5" /> غږیزه
                                              </span>
                                            ) : (
                                              <span className="text-[7px] font-black bg-black/30 backdrop-blur-xs text-indigo-200 px-1 py-0.5 rounded border border-indigo-400/20 flex items-center gap-0.5">
                                                <Feather className="w-1.5 h-1.5" /> لیکلی
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      
                                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-rose-600/90 backdrop-blur-md px-1.5 py-0.5 rounded-lg text-white text-[7px] font-black shadow-xs z-11">
                                        <Heart className="w-2 h-2 fill-white text-white" />
                                        <span>خوښ شوی اثار</span>
                                      </div>

                                      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 pb-2.5 text-right z-12">
                                        <p className="text-[9.5px] sm:text-[10.5px] font-black leading-snug text-white font-sans line-clamp-2 drop-shadow-sm">
                                          {cleanText}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* 2. Loved chapters */}
                                {likedChaptersList.map((item) => {
                                  const post = item.post;
                                  const parentPost = item.parentPost;
                                  const hasCoverImg = !!(post.photoUrl || parentPost?.photoUrl);
                                  const coverImg = post.photoUrl || parentPost?.photoUrl || '';
                                  const isAudio = post.hasAudio || post.audioUrl || post.text?.includes('#غږیز') || post.text?.includes('#غږیزه') || parentPost?.text?.includes('#غږیز') || parentPost?.text?.includes('#غږیزه');
                                  const isNovel = post.text?.includes('#ناول') || parentPost?.text?.includes('#ناول');

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
                                      {hasCoverImg ? (
                                        <>
                                          <CachedImage 
                                            src={coverImg} 
                                            alt="liked-chapter-cover" 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                                        </>
                                      ) : (
                                        /* Beautiful vertical text-based typographic book cover (ښکلی عمودي متن لرونکی د کتاب پوښ) */
                                        <div className={`absolute inset-0 w-full h-full p-2.5 flex flex-col justify-between items-start text-right transition-all duration-300 select-none ${
                                          isAudio 
                                            ? 'bg-gradient-to-br from-amber-600 via-amber-700 to-orange-950 text-white' 
                                            : isNovel
                                              ? 'bg-gradient-to-br from-indigo-700 via-indigo-850 to-purple-950 text-white'
                                              : 'bg-gradient-to-br from-rose-600 via-purple-700 to-indigo-900 text-white'
                                        }`}>
                                          {/* Decorative inside thin elegant border frame */}
                                          <div className="absolute inset-1 border border-white/10 rounded-lg pointer-events-none z-10" />
                                          
                                          {/* Elegant watermark background icon */}
                                          <div className="absolute -bottom-2 -left-2 opacity-15 select-none pointer-events-none">
                                            {isAudio ? (
                                              <Music className="w-16 h-16 text-white" />
                                            ) : (
                                              <BookOpen className="w-16 h-16 text-white" />
                                            )}
                                          </div>

                                          {/* Micro category tag */}
                                          <div className="z-12 flex gap-1 items-center mt-6">
                                            {isAudio ? (
                                              <span className="text-[7px] font-black bg-black/30 backdrop-blur-xs text-amber-300 px-1 py-0.5 rounded border border-amber-500/20 flex items-center gap-0.5">
                                                <Volume2 className="w-1.5 h-1.5" /> غږیزه
                                              </span>
                                            ) : (
                                              <span className="text-[7px] font-black bg-black/30 backdrop-blur-xs text-indigo-200 px-1 py-0.5 rounded border border-indigo-400/20 flex items-center gap-0.5">
                                                <Feather className="w-1.5 h-1.5" /> برخه
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      
                                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-cyan-600/95 backdrop-blur-md px-1.5 py-0.5 rounded-lg text-white text-[7px] font-black shadow-xs z-11">
                                        <Heart className="w-2 h-2 fill-white text-white" />
                                        <span>خوښ شوی پورشن</span>
                                      </div>

                                      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 pb-2.5 text-right z-12">
                                        <span className="text-[7.5px] font-black tracking-wider text-cyan-300 block mb-0.5 uppercase line-clamp-1">
                                          {item.parentPost?.text?.split('\n')[0]?.replace(/#[^\s]+/g, '').trim().substring(0, 16) || 'رومان'}
                                        </span>
                                        <p className="text-[9.5px] sm:text-[10.5px] font-black leading-snug text-white font-sans line-clamp-2 drop-shadow-sm">
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
             C. CATEGORIES / HASHTAGS LIST (کتګورۍ او موضوعات)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right">
            <div className={`p-5 sm:p-6 rounded-3xl ${cardBg} border border-slate-500/10 dark:border-slate-800 overflow-hidden shadow-xl text-right`}>
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
                  <Grid className={`w-4 h-4 ${tc.text}`} />
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    کتګورۍ او موضوعات
                  </span>
                </div>
              </div>

              {(() => {
                const filteredTags = hashtagsWithCount.filter(item => 
                  item.tag !== '#غږیز' && item.tag !== '#غږیزه' && item.tag !== '#صوتي' &&
                  item.tag !== '#کتابونه' && item.tag !== '#کتاب' && item.tag !== '#اډمین' &&
                  item.tag !== '#admin' && item.tag !== '#dev' && item.tag !== '#ډیجیټل'
                );

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
                  <h3 className="text-base font-black text-white tracking-tight">{devName}</h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">د علم، مطالعې او ټکنالوژۍ مینهوال</p>
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
                      {(() => {
                        const { cleanText, links } = extractProfileLinksAndText(devPost.text, devPost.htmlText);
                        return (
                          <>
                            <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'} whitespace-pre-wrap leading-relaxed`}>
                              {cleanText.split('\n').map((line, lIdx) => (
                                <p key={lIdx} className="mb-2 font-medium leading-relaxed font-sans">{line}</p>
                              ))}
                            </div>
                            
                            {links.length > 0 && <ProfileSocialLinks links={links} />}
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <>
                      <p className={`text-[11.5px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-[1.8]`}>
                        زه <strong>{devName}</strong> یم، د علم، مطالعې او ټکنالوژۍ مینهوال. زما هڅه دا ده چې د اسلامي ارزښتونو، ګټورو معلوماتو او مثبتو افکارو د خپرولو لپاره له عصري وسایلو او ټکنالوژۍ څخه ګټه واخلم.
                      </p>
                      <p className={`text-[11.5px] ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-[1.8]`}>
                        ځان د ټول عمر زده کوونکی ګڼم او باور لرم چې علم د انسان د پرمختګ او نېکمرغۍ تر ټولو ستره وسیله ده. له دیني زده کړو سره سره د کمپیوټر، ویبپاڼو، مصنوعي ځیرکتیا (AI)، لیکوالۍ او ډیجیټلي نړۍ په اړه هم زده کړې او تجربې ترلاسه کوم.
                      </p>
                    </>
                  )}
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

              {/* Settings Content */}
              <div className="space-y-6 text-right font-sans">
                
                {/* 1. HOME LAYOUTS */}
                <div className="space-y-2">
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-705'} font-bold flex items-center justify-start gap-1 px-1`}>
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
                            : `${isDark ? 'bg-slate-950/60 border-slate-855 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-205 text-slate-707 hover:bg-slate-150'}`
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
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-705'} font-bold flex items-center justify-start gap-1 px-1`}>
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
                          : 'bg-slate-100 border-slate-205 text-slate-707 hover:bg-slate-150'
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
                          : 'bg-slate-950/60 border-slate-855 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>{tr.light}</span>
                    </button>
                  </div>
                </div>

                {/* 3. Color Themes */}
                <div className="space-y-2 border-t border-slate-500/10 pt-3">
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-705'} font-bold flex items-center justify-start gap-1 px-1`}>
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
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-705'} font-bold flex items-center justify-start gap-1 px-1`}>
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
                            : `${isDark ? 'bg-slate-950/60 border-slate-855 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-205 text-slate-707 hover:bg-slate-150'}`
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

                {/* 5. DAILY SECTIONS TOGGLE */}
                <div className="flex items-center justify-between p-3.5 bg-slate-500/5 rounded-xl border border-slate-500/10 text-right font-sans pt-1 mt-1">
                  <div className="flex items-center gap-1.5 text-right">
                    <Feather className={`w-4 h-4 ${tc.text}`} />
                    <span className={`text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-855'} font-bold`}>د ورځنیو ځانګړتیاوو (شعر او لیکنې) ښودل:</span>
                  </div>
                  <button
                    onClick={() => setShowDailySections(!showDailySections)}
                    style={{ cursor: 'pointer' }}
                    className={`py-1.5 px-3 rounded-lg text-[10px] font-black tracking-wide uppercase transition ${
                      showDailySections ? 'bg-emerald-500/15 border border-emerald-500/25 text-emerald-450 dark:text-emerald-400' : 'bg-slate-500/10 border border-slate-500/20 text-slate-500'
                    }`}
                  >
                    {showDailySections ? 'فعال' : 'غیر فعال'}
                  </button>
                </div>

                {/* 6. NOTIFICATIONS TOGGLE */}
                <div className="flex items-center justify-between p-3.5 bg-slate-500/5 rounded-xl border border-slate-500/10 text-right font-sans pt-1 mt-1">
                  <div className="flex items-center gap-1.5 text-right">
                    {notificationsEnabled ? <Bell className={`w-4 h-4 ${tc.text}`} /> : <BellOff className="w-4 h-4 text-slate-500" />}
                    <span className={`text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-855'} font-bold`}>{tr.notifications}:</span>
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
              </div>
            </div>
          </div>
        ) : !isFullFeedOpen ? (
          <div className="space-y-5 animate-fade-in text-right">

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
                    const hasVideo = !!stPost.videoUrl || (stPost.videoList && stPost.videoList.length > 0) || !!stPost.hasVideo || !!stPost.videoThumbUrl;
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
                          <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-slate-900' : 'bg-white'} overflow-hidden p-0.5 relative`}>
                            {thumb ? (
                              <CachedImage
                                src={thumb}
                                alt="thumb"
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-slate-850 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-purple-400" />
                              </div>
                            )}
                          </div>
                          
                          {hasVideo && (
                            <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1 rounded-full border border-slate-900 shadow flex items-center justify-center animate-pulse">
                              <Video className="w-2.5 h-2.5 text-black fill-current" />
                            </span>
                          )}
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

            {/* ۱. الهام بښونکی او ځانګړی ملوټي میډیا کروسرول (Custom Multi-Media & Literature Slider) */}
            {showDailySections && homeCarouselItems && (
              <div 
                className={`relative rounded-[2rem] overflow-hidden border transition-all duration-300 shadow-2xl ${
                  isDark 
                    ? 'bg-slate-950/70 border-indigo-500/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
                    : 'bg-white border-slate-200/80 shadow-[0_10px_30px_rgba(148,163,184,0.08)]'
                }`}
                style={{ direction: 'rtl' }}
              >
                {/* Visual glow element behind premium carousel */}
                <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-indigo-550/10 blur-3xl pointer-events-none" />
                <div className="absolute -left-24 -bottom-24 w-48 h-48 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

                {/* 1. Top pill selector tabs for Carousel (No emoji, custom lucide icons and colors) */}
                <div className={`flex items-center gap-2 overflow-x-auto scrollbar-none p-2.5 border-b ${
                  isDark ? 'bg-slate-900/40 border-slate-800/60' : 'bg-slate-50 border-slate-100'
                }`}>
                  {[
                    { label: 'ورځنی شعر', id: 0, Icon: Feather, activeColor: 'bg-gradient-to-r from-fuchsia-500 to-pink-600 font-black shadow-lg text-white' },
                    { label: 'ادبي لیکنه', id: 1, Icon: FileText, activeColor: 'bg-gradient-to-r from-indigo-500 to-violet-600 font-black shadow-lg text-white' },
                    { label: 'ځانګړې ویډیو', id: 2, Icon: Video, activeColor: 'bg-gradient-to-r from-red-500 to-rose-600 font-black shadow-lg text-white' },
                    { label: 'غوره انځور', id: 3, Icon: ImageIcon, activeColor: 'bg-gradient-to-r from-emerald-500 to-teal-600 font-black shadow-lg text-white' },
                    { label: 'رومانونه', id: 4, Icon: BookOpen, activeColor: 'bg-gradient-to-r from-purple-600 to-indigo-700 font-black shadow-lg text-white' },
                    { label: 'لنډه کیسه', id: 5, Icon: Sparkles, activeColor: 'bg-gradient-to-r from-pink-600 to-fuchsia-700 font-black shadow-lg text-white' }
                  ].map((tab) => {
                    const isActive = carouselActiveIndex === tab.id;
                    const TabIcon = tab.Icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setCarouselActiveIndex(tab.id);
                        }}
                        style={{ cursor: 'pointer' }}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-[11px] sm:text-[12px] font-bold transition-all duration-300 shrink-0 select-none ${
                          isActive
                            ? `${tab.activeColor} scale-[1.03]`
                            : isDark
                              ? 'bg-slate-950/30 border border-slate-800/40 text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                              : 'bg-slate-100 border border-slate-200/50 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                        }`}
                      >
                        <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 2. Main content block inside slider */}
                <div className="relative min-h-[190px] sm:min-h-[210px] flex flex-col justify-between p-5 sm:p-6 text-right overflow-hidden group">
                  <AnimatePresence mode="wait">
                    {carouselActiveIndex === 0 && (() => {
                      const coupletText = homeCarouselItems.poetry.couplet || '';
                      const poemLines = coupletText.split('\n').filter(l => l.trim().length > 0);
                      const isMoreThanTwoPoemLines = poemLines.length > 2;
                      const displayPoemText = isMoreThanTwoPoemLines 
                        ? coupletText.substring(0, 50).trim() + '...' 
                        : coupletText;

                      return (
                        <motion.div 
                          key="poetry"
                          initial={{ opacity: 0, scale: 0.98, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98, y: -5 }}
                          transition={{ duration: 0.25 }}
                          className="flex-1 flex flex-col justify-between h-full space-y-4 z-10 w-full"
                          onClick={() => {
                            if (homeCarouselItems.poetry.postRef) {
                              setSelectedPost(homeCarouselItems.poetry.postRef);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="space-y-2 w-full text-center relative py-1">
                            <Quote className={`absolute w-16 h-16 opacity-[0.04] -top-3 -right-3 pointer-events-none ${
                              isDark ? 'text-white' : 'text-indigo-600'
                            }`} />
                            
                            <div className="flex items-center justify-center gap-1.5">
                              <span className="flex items-center gap-1 text-[9px] font-sans font-black tracking-wider text-pink-500 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/10 uppercase">
                                <Feather className="w-2.5 h-2.5" />
                                <span>د نن ورځې الهام بښونکی کلام و شعر</span>
                              </span>
                            </div>
                            
                            <h4 className={`text-base sm:text-lg font-black leading-relaxed font-sans pt-2 max-w-xl mx-auto whitespace-pre-line tracking-wide ${
                              isDark ? 'text-slate-100' : 'text-slate-900'
                            }`}>
                              {displayPoemText}
                            </h4>

                            {isMoreThanTwoPoemLines && (
                              <div className="pt-1 select-none">
                                <span className="inline-flex items-center gap-1 text-[10px] font-black text-pink-500 bg-pink-500/10 hover:bg-pink-500/20 px-2.5 py-0.5 rounded border border-pink-500/15 cursor-pointer">
                                  <span>مکمل لوستل</span>
                                </span>
                              </div>
                            )}

                            {homeCarouselItems.poetry.meaning && !isMoreThanTwoPoemLines && (
                              <p className={`text-[10px] sm:text-[11px] font-medium max-w-lg mx-auto italic leading-relaxed pt-1 opacity-80 ${
                                isDark ? 'text-slate-450' : 'text-slate-550'
                              }`}>
                                {homeCarouselItems.poetry.meaning}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-500/5 pt-3 w-full">
                            <span className="text-[10.5px] font-black text-slate-450 flex items-center gap-1 font-sans">
                              <Feather className="w-3 h-3 text-fuchsia-500" />
                              <span>د {homeCarouselItems.poetry.author} اثر</span>
                            </span>
                            
                            <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                              <button
                                onClick={() => {
                                  const textToCopy = `"${homeCarouselItems.poetry.couplet}"\n- د ${homeCarouselItems.poetry.author} اثر\n\nوړاندې کونکی: د مېنې ډېوه اپلیکیشن`;
                                  navigator.clipboard.writeText(textToCopy);
                                  setOverlayActiveText("شعر په بریالیتوب سره کاپي شو! ✅");
                                }}
                                className={`p-1.5 rounded-xl text-[9px] flex items-center gap-1 border transition-all ${
                                  isDark 
                                    ? 'bg-slate-950/20 text-indigo-400 border-slate-800 hover:bg-slate-900 hover:text-white' 
                                    : 'bg-white text-indigo-700 border-slate-200 hover:bg-indigo-50 hover:border-indigo-200'
                                }`}
                                style={{ cursor: 'pointer' }}
                                title="کاپي"
                              >
                                <Copy className="w-3 h-3" />
                                <span>کاپي</span>
                              </button>
                              
                              <button
                                onClick={() => {
                                  if (navigator.share) {
                                    navigator.share({
                                      title: 'د نن ورځې کلام',
                                      text: `"${homeCarouselItems.poetry.couplet}"\n- د ${homeCarouselItems.poetry.author} اثر`,
                                      url: window.location.href,
                                    }).catch(() => {});
                                  } else {
                                    const textToCopy = `"${homeCarouselItems.poetry.couplet}"\n- د ${homeCarouselItems.poetry.author} اثر\n\nوړاندې کونکی: د مېنې ډېوه اپلیکیشن`;
                                    navigator.clipboard.writeText(textToCopy);
                                    setOverlayActiveText("شعر کاپي شو، ملګرو ته یې واستوئ! ✉️");
                                  }
                                }}
                                className={`p-1.5 rounded-xl text-[9px] flex items-center gap-1 border transition-all ${
                                  isDark 
                                    ? 'bg-slate-950/20 text-purple-400 border-slate-800 hover:bg-slate-900 hover:text-white' 
                                    : 'bg-white text-purple-700 border-slate-200 hover:bg-purple-50 hover:border-purple-200'
                                }`}
                                style={{ cursor: 'pointer' }}
                                title="شریکول"
                              >
                                <Share2 className="w-3 h-3" />
                                <span>شریکول</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}

                    {carouselActiveIndex === 1 && (() => {
                      const writingText = getPostTextWithFallback(homeCarouselItems.writing).replace(/#[^\s]+/g, '').trim();
                      const writingLines = writingText.split('\n').filter(l => l.trim().length > 0);
                      const isMoreThanTwoWritingLines = writingLines.length > 2;
                      const displayWritingText = isMoreThanTwoWritingLines 
                        ? writingText.substring(0, 50).trim() + '...' 
                        : writingText;

                      return (
                        <motion.div 
                          key="writing"
                          initial={{ opacity: 0, scale: 0.98, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98, y: -5 }}
                          transition={{ duration: 0.25 }}
                          className="flex-1 flex flex-col justify-between h-full space-y-3 z-10 w-full"
                          onClick={() => {
                            if (homeCarouselItems.writing) {
                              setSelectedPost(homeCarouselItems.writing);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="space-y-2 w-full">
                            <div className="flex items-center gap-2">
                              <span className="flex items-center gap-1 text-[9px] font-sans font-black text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/10">
                                <FileText className="w-2.5 h-2.5 text-indigo-400" />
                                <span>ورځنۍ په زړه پورې ادبي لیکنه</span>
                              </span>
                              {homeCarouselItems.writing?.date && (
                                <span className="text-[7.5px] text-slate-400 font-sans">
                                  {getRelativeTimeInPashto(homeCarouselItems.writing.date, 'اوسمهال')}
                                </span>
                              )}
                            </div>
                            
                            <p className={`text-xs sm:text-sm font-medium leading-relaxed font-sans mt-1 ${
                              isDark ? 'text-slate-200' : 'text-slate-800'
                            }`}>
                              {displayWritingText}
                            </p>

                            {isMoreThanTwoWritingLines && (
                              <div className="pt-1 select-none">
                                <span className="inline-flex items-center gap-1 text-[10px] font-black text-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 px-2.5 py-0.5 rounded border border-indigo-500/15 cursor-pointer">
                                  <span>مکمل لوستل</span>
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-slate-500/5 pt-3 mt-2 w-full font-sans">
                            <span className="text-[10px] font-black text-indigo-500 hover:text-indigo-600 flex items-center gap-1">
                              <span>جزییات او تبصرې ومومئ</span>
                              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                            </span>
                            <span className="text-[8px] text-slate-400 font-sans">پلټنه وکړۍ 📖</span>
                          </div>
                        </motion.div>
                      );
                    })()}

                    {carouselActiveIndex === 2 && (() => {
                      const pv = homeCarouselItems.video;
                      const hasVideoImg = pv && (pv.photoUrl || (pv.photoUrls && pv.photoUrls[0]) || pv.videoThumbUrl);
                      
                      return (
                        <motion.div 
                          key="video"
                          initial={{ opacity: 0, scale: 0.98, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98, y: -5 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0 z-0 flex flex-col justify-end w-full"
                          onClick={() => {
                            if (pv && pv.videoUrl) {
                              openReelWithVideoUrl(pv.videoUrl);
                            } else if (pv) {
                              setSelectedPost(pv);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* Image backdrop or colored grid */}
                          {hasVideoImg ? (
                            <img 
                              src={hasVideoImg} 
                              alt="video backdrop" 
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover brightness-[0.25] group-hover:scale-102 transition duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 brightness-35 w-full" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent w-full" />

                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <span className="w-12 h-12 rounded-full bg-indigo-600/90 hover:bg-indigo-500 border border-white/20 flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-90 transition duration-300">
                              <Play className="w-5 h-5 fill-white text-white ml-0.5 animate-pulse" />
                            </span>
                          </div>

                          <div className="p-5 z-10 space-y-1.5 relative w-full">
                            <span className="flex items-center gap-1 text-[8.5px] font-black text-rose-100 bg-rose-600/35 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-sans self-start inline-flex">
                              <Video className="w-2.5 h-2.5" />
                              <span>شاخص ویډیو (Video Highlights)</span>
                            </span>
                            <h4 className="text-xs sm:text-sm font-black line-clamp-1 text-white text-right mt-1 font-sans">
                              {pv ? getPostTextWithFallback(pv).substring(0, 70) : 'په زړه پورې غږیز او کلیپونه'}
                            </h4>
                          </div>
                        </motion.div>
                      );
                    })()}

                    {carouselActiveIndex === 3 && (() => {
                      const pi = homeCarouselItems.image;
                      const hasPic = pi && (pi.photoUrl || (pi.photoUrls && pi.photoUrls[0]));
                      return (
                        <motion.div 
                          key="image"
                          initial={{ opacity: 0, scale: 0.98, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98, y: -5 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0 z-0 flex flex-col justify-end w-full"
                          onClick={() => {
                            if (pi) setSelectedPost(pi);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          {hasPic ? (
                            <img 
                              src={hasPic} 
                              alt="featured background" 
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover brightness-[0.32] group-hover:scale-102 transition duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 brightness-35 w-full" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent w-full" />

                          <div className="p-4 z-10 space-y-1 relative w-full">
                            <span className="text-[8.5px] font-black text-emerald-100 bg-emerald-600/35 border border-emerald-500/35 px-2 py-0.5 rounded-md font-sans inline-block">
                              🖼️ د انځورونو ځانګړی البوم
                            </span>
                            <h4 className="text-xs sm:text-sm font-black line-clamp-1 text-white text-right mt-1 font-sans">
                              {pi ? getPostTextWithFallback(pi).substring(0, 60) : 'الهام بښونکي او ځانګړي انځورونه'}
                            </h4>
                          </div>
                        </motion.div>
                      );
                    })()}

                    {carouselActiveIndex === 4 && (() => {
                      const pn = homeCarouselItems.novel;
                      return (
                        <motion.div 
                          key="novel"
                          initial={{ opacity: 0, scale: 0.98, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98, y: -5 }}
                          transition={{ duration: 0.25 }}
                          className="flex-1 flex flex-col justify-between h-full space-y-3 z-10 w-full"
                          onClick={() => {
                            setIsNovelsPageOpen(true);
                            if (pn) {
                              setSelectedPost(pn);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="space-y-1.5 w-full">
                            <span className="text-[8.5px] font-black text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md font-sans">
                              📖 د افغان رومانونو او داستانونو غني برخه
                            </span>
                            <h4 className={`text-sm sm:text-base font-black leading-snug font-sans mt-1 line-clamp-2 text-right ${
                              isDark ? 'text-violet-100' : 'text-slate-900'
                            }`}>
                              {pn ? getPostTextWithFallback(pn).replace(/#[^\s]+/g, '').trim().substring(0, 85) : 'د ښکلو رومانټیکو او تاریخي ناولونو لوستل پیل کړئ.'}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-500/5 pt-2.5 mt-2 w-full">
                            <span className="text-[9.5px] font-black text-violet-500 flex items-center gap-1">
                              <span>دلته ناول پیل کړئ</span>
                              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                            </span>
                            <span className="text-[8px] text-slate-400 font-sans">د مېنې ډېوه 📚</span>
                          </div>
                        </motion.div>
                      );
                    })()}

                    {carouselActiveIndex === 5 && (() => {
                      const ps = homeCarouselItems.story;
                      return (
                        <motion.div 
                          key="story"
                          initial={{ opacity: 0, scale: 0.98, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98, y: -5 }}
                          transition={{ duration: 0.25 }}
                          className="flex-1 flex flex-col justify-between h-full space-y-3 z-10 w-full"
                          onClick={() => {
                            if (ps) {
                              setSelectedPost(ps);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="space-y-1.5 w-full">
                            <span className="text-[8.5px] font-black text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-md font-sans">
                              🍁 ځانګړې لنډه کیسه او حکایات
                            </span>
                            <h4 className={`text-sm sm:text-base font-black leading-snug mt-1 line-clamp-2 text-right ${
                              isDark ? 'text-pink-100' : 'text-slate-900'
                            }`}>
                              {ps ? getPostTextWithFallback(ps).replace(/#[^\s]+/g, '').trim().substring(0, 85) : 'پښتو صمیمي او د پند نه ډکې لنډې کیسې'}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-500/5 pt-2.5 mt-2 w-full">
                            <span className="text-[9.5px] font-black text-fuchsia-600 flex items-center gap-1">
                              <span>کیسې ته ورننوځئ</span>
                              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                            </span>
                            <span className="text-[8px] text-slate-400 font-sans">ادبي ارشیف ✨</span>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>

                  {/* 3. Slider navigation controls & indicators */}
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-500/5 relative z-10 w-full">
                    <div className="flex gap-1.5 justify-center">
                      {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <button 
                          key={idx} 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCarouselActiveIndex(idx);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === carouselActiveIndex ? 'bg-indigo-500 w-4.5' : 'bg-slate-400/40'}`} 
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          rotateCarouselPrev();
                        }}
                        style={{ cursor: 'pointer' }}
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition border ${
                          isDark 
                            ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white' 
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          rotateCarouselNext();
                        }}
                        style={{ cursor: 'pointer' }}
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition border ${
                          isDark 
                            ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white' 
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. EXQUISITE QUICK ACTIONS DYNAMIC GRID (چټک مینو بټنې: انځورونه، ویډیوګانې، کټګورۍ او پلټنه) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5" style={{ direction: 'rtl' }}>
              
              {/* ۱. ښکلي انځورونه */}
              <div 
                onClick={() => {
                  setIsPhotoReelsOpen(true);
                  // Preserve existing activePhotoReelIndex instead of resetting to 0
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
                  // Preserve existing activeReelIndex so we stay on the same video,
                  // unless it's the first time and there is a specific lastWatched video.
                  if (activeReelIndex === 0) {
                    let targetIndex = 0;
                    const lastWatched = (window as any).lastWatchedVideo;
                    if (lastWatched && lastWatched.videoUrl) {
                      const idx = reelsList.findIndex(r => 
                        r.videoUrl === lastWatched.videoUrl || 
                        (r.videoUrl && r.videoUrl.includes(lastWatched.videoUrl)) || 
                        (lastWatched.videoUrl && lastWatched.videoUrl.includes(r.videoUrl))
                      );
                      if (idx !== -1) {
                        targetIndex = idx;
                      }
                    }
                    setActiveReelIndex(targetIndex);
                  }
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

            {/* د کیسو او ناولونو یو نوی، ښکلی او د پام وړ کمپیګټ بټن (Sleek Interactive Novels & Stories Button) */}
            <div 
              id="dewa-novels-stories-banner"
              onClick={() => {
                setIsNovelsPageOpen(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer' }}
              className="relative overflow-hidden rounded-2xl p-2.5 px-3.5 flex flex-row-reverse items-center justify-between gap-3 transition-all duration-500 transform hover:scale-[1.015] hover:-translate-y-0.5 active:scale-[0.985] border border-white/20 bg-gradient-to-r from-red-550 via-pink-600 via-fuchsia-600 to-indigo-600 bg-[size:200%_200%] animate-gradient-shift shadow-[0_4px_18px_rgba(219,39,119,0.3)] hover:shadow-[0_8px_28px_rgba(219,39,119,0.55)] group text-white select-none cursor-pointer mt-3.5 mb-2.5"
            >
              {/* Dynamic diagonal sweep shimmer line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
              <BookOpen className="absolute -left-2 -bottom-2 w-12 h-12 text-white/10 pointer-events-none transform -rotate-12 group-hover:scale-115 transition-all duration-500 ease-out" />
              
              <div className="flex flex-row-reverse items-center gap-2.5 z-10 text-right min-w-0">
                <div className="shrink-0 w-7 h-7 rounded-lg bg-white/20 border border-white/25 flex items-center justify-center text-white shadow-sm group-hover:rotate-6 transition duration-300">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                </div>
                <div className="min-w-0 flex flex-col justify-center text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <h3 className="text-xs font-black tracking-tight font-sans text-white">
                      د رومان غني برخه (کیسې او ناولونه)
                    </h3>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-white/90 font-medium font-sans mt-0.5" style={{ direction: 'rtl' }}>
                    په زړه پورې غږیز او لیکلي رومانونه دلته ولولئ 🎧📖
                  </p>
                </div>
              </div>
              
              <div className="shrink-0 flex items-center justify-end z-10">
                <div className="px-2.5 py-1 rounded-lg bg-black/25 hover:bg-black/35 text-white border border-white/10 font-sans font-black text-[9px] sm:text-[10px] flex items-center justify-center gap-1 shadow-sm transition duration-300">
                  <span>دلته کلیک کړئ ⚡</span>
                  <ArrowLeft className="w-2.5 h-2.5 group-hover:-translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* 2.5. BEAUTIFUL HORIZONTAL RECYCLER VIEW OF PUBLISHERS/ADMINS */}
            <div id="dewa-admins-recycler-section" className="space-y-2.5 mt-3 mb-2.5" style={{ direction: 'rtl' }}>
              <div className="flex items-center justify-between px-1">
                <span className={`text-[12.5px] font-black ${isDark ? 'text-slate-300' : 'text-slate-800'} flex items-center gap-1.5`}>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span>د خپرونې فعال مسؤلین او لیکوالان</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold">بشپړې پېژندڅېرې وګورئ</span>
              </div>

              <div className="relative -mx-4 px-4 overflow-visible">
                <div 
                  className="flex gap-3 overflow-x-auto py-2 px-1.5 scrollbar-none snap-x snap-mandatory overflow-y-visible"
                  style={{ direction: 'rtl', WebkitOverflowScrolling: 'touch' }}
                >
                  {adminsList.map((admin, idx) => {
                    const isDev = admin.isDev;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedAuthorName(admin.name);
                          setSelectedPost(null);
                          setIsAboutPageOpen(false);
                          setIsContactPageOpen(false);
                          setIsSettingsPageOpen(false);
                          setIsCategoryPageOpen(false);
                          setIsNovelsPageOpen(false);
                          setIsReelsOpen(false);
                          setIsPhotoReelsOpen(false);
                          setIsSidebarOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{ cursor: 'pointer' }}
                        className="snap-center flex-shrink-0 w-24 select-none flex flex-col items-center text-center relative py-1"
                      >
                        {/* Circular Avatar with a professional Checkmark/Tick Overlay (ټکمارک) */}
                        <div className="relative">
                          <PremiumAvatar
                            src={admin.avatar}
                            sizeClass="w-14 h-14"
                            ringSize="p-[2px]"
                            showStoryRing={true}
                          />
                          
                          {/* Professional Checkmark Badge Overlay */}
                          <div className={`absolute bottom-0 right-0 rounded-full p-0.5 shadow border ${
                            isDark ? 'border-slate-950' : 'border-white'
                          } ${
                            isDev 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-amber-500 text-white'
                          }`}>
                            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                          </div>
                        </div>

                        {/* Name and Profession */}
                        <div className="mt-2 w-full min-w-0">
                          <h4 className={`text-[11px] font-black leading-tight truncate ${
                            isDark ? 'text-slate-100' : 'text-slate-800'
                          } font-sans`}>
                            {admin.name}
                          </h4>
                          
                          {/* Role/Profession Badge */}
                          <div className="flex justify-center mt-0.5">
                            <span className={`text-[8px] font-black inline-flex items-center gap-0.5 px-1 py-0.2 rounded-md ${
                              isDark 
                                ? isDev ? 'bg-indigo-950/50 text-indigo-400' : 'bg-amber-950/50 text-amber-400'
                                : isDev ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50/80 text-amber-600'
                            }`}>
                              {admin.role}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. CATEGORY FILTER TABS (د موضوع کټګوري ښکلي افقي ريسايکلر ويو) */}
            <div className="relative overflow-visible" style={{ direction: 'rtl' }}>
              <div className="flex gap-2.5 text-right relative overflow-x-auto py-4 px-3.5 scrollbar-none items-center snap-x snap-mandatory overflow-y-visible">
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
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-2" style={{ direction: 'rtl' }}>
                        {[
                          { id: 'videos', label: 'خوښې شوې ويډيوګاني', icon: Video, colorClass: 'fav-btn-videos' },
                          { id: 'images', label: 'خوښ شوي انځورونه', icon: ImageIcon, colorClass: 'fav-btn-images' },
                          { id: 'writings', label: 'خوښې شوې ليکنی', icon: FileText, colorClass: 'fav-btn-writings' },
                          { id: 'pdf', label: 'خوښ شوي کتابونه', icon: BookOpen, colorClass: 'fav-btn-pdf' },
                          { id: 'audio', label: 'خوښي شوي غږيزې', icon: Music, colorClass: 'fav-btn-audio' },
                          { id: 'toread', label: 'د وروسته لوستلو لیست', icon: Bookmark, colorClass: 'fav-btn-toread' },
                        ].map((fav) => {
                          const FavIcon = fav.icon;
                          const isActive = activeFavoriteFilter === fav.id;
                          const count = allPosts.filter(p => {
                            if (fav.id === 'toread') {
                              return toReadPostIds.includes(p.id);
                            }
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
                  {activeFavoriteFilter === 'toread' ? (
                    <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  ) : (
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                  )}
                  <span>ښودل کیږي: {
                    activeFavoriteFilter === 'videos' ? 'خوښې شوې ويډيوګاني' :
                    activeFavoriteFilter === 'images' ? 'خوښ شوي انځورونه' :
                    activeFavoriteFilter === 'writings' ? 'خوښې شوې ليکنی' :
                    activeFavoriteFilter === 'pdf' ? 'خوښ شوي کتابونه' :
                    activeFavoriteFilter === 'toread' ? 'د وروسته لوستلو لیست' :
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
              ) : selectedCategory === 'stories' ? (
                /* BEAUTIFUL CIRCULAR VIEW LISTS FOR STORIES (سټوريانې) */
                <div className="space-y-6 animate-fade-in text-right p-1" style={{ direction: 'rtl' }}>
                  <div className={`p-4 rounded-3xl ${isDark ? 'bg-slate-900/40 border border-slate-800' : 'bg-slate-50 border border-slate-205'} flex items-center justify-between text-xs`}>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
                      <span className={`font-black ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>پښتو ادبي سټوريانې (غوره کيسې)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">ستاسو لپاره غوره شوي {homePosts.length} سټوريانې</span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-7 justify-items-center" style={{ direction: 'rtl' }}>
                    {homePosts.map((post) => {
                      const stIdx = storiesList.findIndex(s => s.id === post.id);
                      const isRead = readPostIds.includes(post.id);
                      const thumb = post.photoUrl || (post.photoUrls && post.photoUrls[0]) || "https://images.unsplash.com/photo-1543508282-6319a3e2621d?w=200&q=80";
                      const cleanText = post.text 
                        ? post.text.replace(/#سټوري|#ستوری|#story|#سټوريانې/g, '').trim()
                        : 'ناول کیسه2';
                      const title = cleanText.split('\n')[0]?.trim() || `کیسه ${stIdx !== -1 ? stIdx + 1 : ''}`;
                      const displayTitle = title.length > 22 ? title.slice(0, 19) + '...' : title;
                      const hasVideo = !!post.videoUrl || (post.videoList && post.videoList.length > 0) || !!post.hasVideo || !!post.videoThumbUrl;

                      return (
                        <div
                          key={post.id}
                          onClick={() => {
                            if (stIdx !== -1) {
                              setActiveStoryIndex(stIdx);
                              setIsStoryViewerOpen(true);
                              markPostAsRead(post.id);
                            } else {
                              setSelectedPost(post);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                          className="flex flex-col items-center gap-2 cursor-pointer select-none group relative w-full"
                        >
                          {/* Rich Pink-Purple-Orange Glowing Circle Ring */}
                          <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-600 to-amber-500 transition-all duration-350 shadow-md group-hover:scale-108 group-hover:rotate-3">
                            <div className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full ${isDark ? 'bg-slate-900' : 'bg-white'} overflow-hidden p-0.5 relative`}>
                              <CachedImage
                                simple={true}
                                src={thumb}
                                alt={title}
                                className="w-full h-full object-cover rounded-full"
                              />
                              {/* Dark overlay with play sign on hover */}
                              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                                <Play className="w-5 h-5 text-white fill-white" />
                              </div>
                            </div>
                            
                            {/* Floating category badge on the bottom right */}
                            {hasVideo ? (
                              <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black text-[7px] sm:text-[8px] px-1.5 py-0.5 rounded-full border border-slate-950 shadow flex items-center gap-0.5 animate-pulse">
                                <Video className="w-2 h-2 text-black fill-current" />
                                سټوري (ويډيو)
                              </span>
                            ) : (
                              <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-[7px] sm:text-[8px] px-1.5 py-0.5 rounded-full border border-slate-950 shadow">
                                سټوري
                              </span>
                            )}
                          </div>

                          <span className={`text-[10px] sm:text-[11.5px] font-black tracking-tight text-center line-clamp-2 h-9 leading-tight mt-1 transition-colors duration-200 ${
                            isDark ? 'text-slate-200 group-hover:text-pink-400' : 'text-slate-800 group-hover:text-pink-600'
                          }`}>
                            {displayTitle}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : selectedCategory === 'videos' ? (
                /* BEAUTIFUL CIRCULAR VIEW + HIGH DENSITY CINEMATIC THUMBNAILS FOR VIDEOS (ویډیويي) */
                <div className="space-y-6 animate-fade-in text-right p-1" style={{ direction: 'rtl' }}>
                  
                  {/* Part A: Circular View List row for Videos */}
                <div className="relative p-1 bg-slate-500/5 dark:bg-slate-900/10 rounded-2xl border border-slate-500/10 mb-4" style={{ direction: 'rtl' }}>
                  <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-500/5">
                    <div className="flex items-center gap-1.5">
                      <PlayCircle className="w-4 h-4 text-emerald-500 animate-pulse" />
                      <span className={`text-[12px] font-black ${isDark ? 'text-white' : 'text-slate-950'} font-sans`}>
                        ویډیويي چټک ګرد لیست
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold">د کتنې لپاره ورګډ شئ</span>
                  </div>
                  
                  <div className="flex gap-4.5 items-center overflow-x-auto scrollbar-none py-3.5 px-4 justify-start">
                    {homePosts.map((post) => {
                      const thumb = getVideoThumbnail(post);
                      const isRead = readPostIds.includes(post.id);
                      
                      const handleVideoClick = () => {
                        const currentScroll = window.scrollY || document.documentElement.scrollTop;
                        if (currentScroll > 0) {
                          detailScrollPosRef.current = currentScroll;
                        }
                        const idx = reelsList.findIndex(r => r.post.id === post.id);
                        if (idx !== -1) {
                          setActiveReelIndex(idx);
                          setIsReelsOpen(true);
                        } else {
                          setSelectedPost(post);
                        }
                        markPostAsRead(post.id);
                      };

                      const cleanText = post.text 
                        ? post.text.replace(/#ویډیو|#ويډيو|#video|#ويډيوګانې/g, '').trim()
                        : 'پښتو ادبی ویډیو';
                      const title = cleanText.split('\n')[0]?.trim() || 'وېډیو پوسټ';
                      const displayTitle = title.length > 15 ? title.slice(0, 12) + '...' : title;

                      return (
                        <div
                          key={`circle-vid-${post.id}`}
                          onClick={handleVideoClick}
                          style={{ cursor: 'pointer' }}
                          className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 select-none group relative"
                        >
                          <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-600 to-indigo-500 shadow transform hover:scale-105 transition duration-300">
                            <div className={`w-13 h-13 rounded-full ${isDark ? 'bg-slate-900' : 'bg-white'} overflow-hidden p-[1.5px] relative`}>
                              <CachedImage
                                simple={true}
                                src={thumb}
                                alt={title}
                                className="w-full h-full object-cover rounded-full filter blur-[15px] scale-110 saturate-[1.35]"
                              />
                              <div className="absolute inset-0 bg-black/35 flex items-center justify-center rounded-full">
                                <Play className="w-4 h-4 text-white fill-white animate-pulse" />
                              </div>
                            </div>
                          </div>
                          <span className={`text-[8.5px] font-black ${isDark ? 'text-slate-300' : 'text-slate-700'} font-sans truncate w-14 text-center mt-0.5`}>
                            {displayTitle}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>


                  {/* Part B: Cinematic Videos Grid */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4" style={{ direction: 'rtl' }}>
                    {homePosts.map((post) => {
                      const isRead = readPostIds.includes(post.id);
                      const isFavorite = favoritePostIds.includes(post.id);
                      const thumb = getVideoThumbnail(post);
                      
                      const handleVideoClick = () => {
                        const currentScroll = window.scrollY || document.documentElement.scrollTop;
                        if (currentScroll > 0) {
                          detailScrollPosRef.current = currentScroll;
                        }
                        const idx = reelsList.findIndex(r => r.post.id === post.id);
                        if (idx !== -1) {
                          setActiveReelIndex(idx);
                          setIsReelsOpen(true);
                        } else {
                          setSelectedPost(post);
                        }
                        markPostAsRead(post.id);
                      };

                      const cleanText = post.text 
                        ? post.text.replace(/#ویډیو|#ويډيو|#video|#ويډيوګانې/g, '').trim()
                        : 'ادبي لنډه کیسه او ویډیو';
                      const firstLine = cleanText.split('\n')[0]?.trim() || 'ادبي ویډیو';
                      const shortTitle = firstLine.length > 25 ? firstLine.slice(0, 22) + '...' : firstLine;
                      
                      return (
                        <div
                          key={`grid-vid-${post.id}`}
                          onClick={handleVideoClick}
                          style={{ cursor: 'pointer' }}
                          className={`group rounded-2xl overflow-hidden border transition-all duration-350 flex flex-col relative ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-800/80 hover:border-amber-500/30 shadow-md' 
                              : 'bg-white border-slate-205 shadow-md hover:border-amber-500/30'
                          }`}
                        >
                          {/* Rich vertical rectangular aspect video ratio wrapper */}
                          <div className="w-full aspect-[9/15.5] bg-slate-950 overflow-hidden relative shadow-inner rounded-xl">
                            <CachedImage
                              src={thumb}
                              alt={shortTitle}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08] filter blur-[24px] saturate-[1.4] opacity-80"
                            />
                            
                            {/* Rich cinematic play overlay */}
                            <div className="absolute inset-0 bg-black/15 flex items-center justify-center transition-all duration-300 group-hover:bg-black/10">
                              <div className="w-10 h-10 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/30 flex items-center justify-center text-amber-500 scale-100 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 shadow-lg">
                                <Play className="w-4.5 h-4.5 fill-current translate-x-0.5" />
                              </div>
                            </div>

                            {/* Luxury metadata overlays */}
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 text-white text-[7.5px] font-black flex items-center gap-0.5 shadow-lg font-sans">
                              <Video className="w-2.5 h-2.5 text-amber-400" />
                              <span>وېډیو</span>
                            </div>

                            <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-sm text-white text-[7.5px] px-1.5 py-0.5 rounded border border-white/5 font-black flex items-center gap-0.5 font-sans">
                              <Eye className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                              <span>{post.views || '1.2K'} کتنې</span>
                            </span>
                          </div>

                          {/* Content bottom section */}
                          <div className="p-2 flex flex-col justify-between flex-grow text-right">
                            <h4 className={`text-[9px] sm:text-[11px] font-black leading-snug line-clamp-2 font-sans ${isDark ? 'text-slate-100 group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'} transition-colors duration-200`}>
                              {shortTitle}
                            </h4>
                            
                            <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-500/10">
                              <span className="text-[7px] sm:text-[8.5px] text-slate-455 flex items-center gap-0.5 font-sans">
                                <Clock className="w-2 h-2 text-slate-500 shrink-0" />
                                <span className="truncate">{getRelativeTimeInPashto(post.date, post.timeLabel || 'Recent')}</span>
                              </span>
                              
                              <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                <button
                                  onClick={() => handleWhatsAppShare(post)}
                                  className="p-1 rounded text-emerald-500 hover:bg-emerald-550/10 transition-all font-sans"
                                >
                                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12.012 3c-4.96-.005-9.005 4.02-9.01 8.977a8.94 8.94 0 0 0 1.202 4.492L3 21l4.7-.1.353-.1.332.352c1.082.52 2.274.8 3.518.8h.01c4.965.004 9.01-4.015 9.013-8.977A8.97 8.97 0 0 0 12.012 3zm4.5 12c-.2.5-.9.9-1.4 1-1 .2-2.3-.2-3.8-1.5-1.5-1.3-2.5-2.8-2.8-3.4-.3-.5-.4-.9-.4-1.3 0-.6.3-.9.4-1.1.1-.2.2-.2.3-.2l.7.1c.2 0 .4.1.5.3.3.6.7 1.4.8 1.5.1.2.1.4 0 .6-.1.2-.2.3-.3.4l-.4.3c-.1.1-.1.2 0 .4.4.8 1 1.4 1.8 1.8.2.1.3.1.4 0 .2-.2.4-.5.6-.7l.4-.2c.2 0 .4.1.7.3.7.4 1.2.7 1.3.8.3.1.3.3.2.4-.1.4-.4.8-.8 1z"/>
                                  </svg>
                                </button>
                                <button
                                  onClick={() => toggleFavorite(post.id)}
                                  className={`p-1 rounded transition-all ${isFavorite ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
                                >
                                  <Heart className={`w-3 h-3 ${isFavorite ? 'fill-rose-550' : ''}`} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
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
                            ? 'bg-slate-900/90 border-slate-800 hover:border-violet-550/40 hover:shadow-2xl hover:shadow-violet-950/20' 
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
                            className={`${cardBg} p-4 rounded-xl flex items-center gap-4 transition group active:scale-[0.99] select-none text-right shadow-md border border-slate-500/5`}
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

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleToRead(post.id);
                                      }}
                                      className={`focus:outline-hidden p-1.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 ${
                                        toReadPostIds.includes(post.id)
                                          ? 'text-amber-500 bg-amber-500/10'
                                          : 'text-slate-400 hover:text-amber-400 hover:bg-slate-500/10'
                                      }`}
                                      style={{ cursor: 'pointer' }}
                                      title="وروسته لوستل"
                                    >
                                      <Bookmark className={`w-3.5 h-3.5 ${toReadPostIds.includes(post.id) ? 'fill-amber-500' : ''}`} />
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
                            className={`${cardBg} rounded-xl overflow-hidden flex flex-col transition group active:scale-[0.98] select-none text-right shadow-sm border border-slate-500/5`}
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

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleToRead(post.id);
                                      }}
                                      className={`focus:outline-hidden p-1 rounded transition-all transform hover:scale-105 active:scale-95 ${
                                        toReadPostIds.includes(post.id)
                                          ? 'text-amber-500 bg-amber-500/10'
                                          : 'text-slate-400 hover:text-amber-400 hover:bg-slate-500/10'
                                      }`}
                                      style={{ cursor: 'pointer' }}
                                      title="وروسته لوستل"
                                    >
                                      <Bookmark className={`w-3 h-3 ${toReadPostIds.includes(post.id) ? 'fill-amber-500' : ''}`} />
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
                                <CachedImage src={post.photoUrl} className="w-full h-full object-cover" />
                                {post.photoUrls && post.photoUrls.length > 1 && (
                                  <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[8px] font-black z-10">
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
                    <div
                      key={item}
                      className={`${cardBg} p-5 rounded-xl border border-slate-500/5 animate-pulse text-right space-y-3`}
                    >
                      <div className="flex gap-2 items-center justify-end">
                        <div className="h-3 w-16 bg-slate-400/20 dark:bg-slate-800/30 rounded" />
                        <div className="h-8 w-8 rounded-full bg-slate-400/20 dark:bg-slate-800/30" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-400/25 dark:bg-slate-800/40 rounded w-full" />
                        <div className="h-3 bg-slate-400/10 dark:bg-slate-800/20 rounded w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* GORGEOUS LOAD MORE BUTTON WITH LUXURY HOVER EFFECT AND BEAUTIFUL INTERACTIVE SPINNER */}
            {(!isAutoloadingMore && (visibleHomeCount < filteredHomePosts.length || !hasReachedEnd)) ? (
              <div className="mt-8 mb-6 flex flex-col items-center justify-center text-center">
                <button
                  onClick={handleLoadMoreHomePosts}
                  style={{ cursor: 'pointer' }}
                  className={`px-8 py-3.5 rounded-full font-black text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-95 select-none ${
                    isDark
                      ? 'bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 text-white shadow-indigo-950/40 hover:shadow-indigo-500/35 border border-indigo-500/20 hover:scale-[1.04]'
                      : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-indigo-100 hover:shadow-indigo-500/20 hover:scale-[1.04]'
                  }`}
                >
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                  <span>نور وګورئ (نوي مطالب لوډ کړئ)</span>
                </button>
                
                {/* Hidden infinite-scroll-sentinel to seamlessly integrate with any automated loading */}
                <div id="home-infinite-scroll-sentinel" className="h-2 w-2 opacity-0" />
              </div>
            ) : isAutoloadingMore ? (
              <div className="mt-6 mb-6 flex justify-center text-center animate-pulse">
                <div className={`px-6 py-2.5 rounded-full text-xs font-black flex items-center gap-2 ${
                  isDark ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                  <span>د نویو مطالبو راوړل... لطفا صبر وکړئ</span>
                </div>
              </div>
            ) : (
              filteredHomePosts.length > 0 && (
                <div className="mt-8 mb-6 text-center text-xs text-slate-400 font-bold select-none animate-fade-in">
                  ✨ تاسو ټول خپاره شوي مطالب وکتل! نوي مطالب نشته. ✨
                </div>
              )
            )}
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in text-right">
            {/* Archive feed search banner / title */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'} text-right mb-4 flex items-center justify-between`} style={{ direction: 'rtl' }}>
              <div className="flex items-center gap-2">
                <Archive className={`w-5 h-5 ${tc.text}`} />
                <span className="text-sm font-black font-sans">بشپړ ارشیف پوسټونه</span>
              </div>
              <button
                onClick={() => setIsFullFeedOpen(false)}
                style={{ cursor: 'pointer' }}
                className="px-2.5 py-1 text-[10px] font-black bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition"
              >
                وتل / شاته
              </button>
            </div>

            {/* Archive Feed List */}
            <div className={`${homeLayout === 'grid' ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-2.5'}`}>
              {allPosts.slice(0, visibleFullCount).filter((p): p is TelegramPost => !!(p && p.id && !isStoryPost(p) && !getIsNovelOrNovelPart(p))).map((post) => {
                const handleClick = () => {
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

                const isRead = readPostIds.includes(post.id);
                return (
                  <div
                    key={post.id}
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                    className={`${cardBg} p-4 rounded-xl flex items-center gap-4 transition group active:scale-[0.99] select-none text-right shadow-md border border-slate-500/5`}
                  >
                    {(post.photoUrl || post.videoThumbUrl || post.hasVideo) && (
                      post.photoUrl ? (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                          <CachedImage
                            src={post.photoUrl || ''}
                            alt="thumb"
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.04]"
                          />
                          {post.hasVideo && (
                            <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                              <PlayCircle className="w-5 h-5 text-white drop-shadow" />
                            </span>
                          )}
                        </div>
                      ) : post.videoThumbUrl ? (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                          <img
                            src={post.videoThumbUrl || undefined}
                            referrerPolicy="no-referrer"
                            alt="thumb"
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.04]"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                            <PlayCircle className="w-5 h-5 text-white drop-shadow" />
                          </span>
                        </div>
                      ) : post.hasVideo ? (
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl ${subCardBg} flex items-center justify-center shrink-0 text-indigo-400`}>
                          <Video className={`w-6 h-6 ${tc.text}`} />
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
                              <Clock className="w-3 h-3 text-slate-555" />
                              {getRelativeTimeInPashto(post.date, post.timeLabel || 'وروستی')}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleWhatsAppShare(post);
                              }}
                              className="focus:outline-hidden p-1.5 rounded-lg text-emerald-500 hover:text-emerald-400 transition"
                              style={{ cursor: 'pointer' }}
                            >
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M12.012 3c-4.96-.005-9.005 4.02-9.01 8.977a8.94 8.94 0 0 0 1.202 4.492L3 21l4.7-.1.353-.1.332.352c1.082.52 2.274.8 3.518.8h.01c4.965.004 9.01-4.015 9.013-8.977A8.97 8.97 0 0 0 12.012 3zm4.5 12c-.2.5-.9.9-1.4 1-1 .2-2.3-.2-3.8-1.5-1.5-1.3-2.5-2.8-2.8-3.4-.3-.5-.4-.9-.4-1.3 0-.6.3-.9.4-1.1.1-.2.2-.2.3-.2l.7.1c.2 0 .4.1.5.3.3.6.7 1.4.8 1.5.1.2.1.4 0 .6-.1.2-.2.3-.3.4l-.4.3c-.1.1-.1.2 0 .4.4.8 1 1.4 1.8 1.8.2.1.3.1.4 0 .2-.2.4-.5.6-.7l.4-.2c.2 0 .4.1.7.3.7.4 1.2.7 1.3.8.3.1.3.3.2.4-.1.4-.4.8-.8 1z"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <h3 className={`text-xs font-sans font-black leading-snug truncate-2-lines max-w-full ${isDark ? 'text-slate-100 hover:text-indigo-400' : 'text-slate-900 hover:text-indigo-650'}`}>
                          {post.text ? post.text.slice(0, 75).trim() + '...' : 'پوسټ'}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Infinite Scroll Sentinel */}
            <div id="infinite-scroll-sentinel" className="h-10 w-full flex items-center justify-center">
              {visibleFullCount < allPosts.length && (
                <RefreshCw className="w-5 h-5 animate-spin text-slate-400" />
              )}
            </div>
          </div>
        )}
      </main>

      {/* ==========================================================
         SPLASH SCREEN OVERLAY (ښایسته شروع صفحه د ښکلي افکټونو او مډرن لوډینګ بار سره)
         ========================================================== */}
      {showSplash && (
        <div className={`fixed inset-0 z-[100] ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-800'} flex flex-col items-center justify-between py-12 px-6 text-center select-none transition-colors duration-300 overflow-hidden`}>
          {/* Rotating glowing background ambient blurs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-500/10 blur-[90px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-rose-500/10 blur-[110px] animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>

          {/* Top spacer to push contents down */}
          <div className="flex-1" />

          <div className="w-full max-w-sm flex flex-col items-center gap-6 relative z-10">
            {/* Logo/Avatar container with animated glow styling & ripple rings */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="relative p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full blur animate-ping opacity-25" />
              <img
                src={feedData?.channelInfo?.avatarUrl || 'https://telegram.org/img/t_logo.png'}
                referrerPolicy="no-referrer"
                className={`w-24 h-24 rounded-full ${isDark ? 'bg-slate-900 border-slate-900' : 'bg-white border-white'} object-cover shadow-inner relative z-10`}
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
                transition={{ delay: 0.2 }}
                className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-wide font-sans text-center drop-shadow-xs`}
              >
                {feedData?.channelInfo?.title || 'ښه راغلاست'}
              </motion.h2>
            </div>

            {/* Timed progress loader */}
            <div className={`w-64 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-205 border-slate-300'} h-3 rounded-full overflow-hidden border p-0.5 relative mt-4 shadow-inner`}>
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full transition-all duration-75 ease-out relative shadow-[0_0_12px_rgba(99,102,241,0.5)] overflow-hidden" 
                style={{ width: `${splashProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            
            <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'} font-sans font-black flex items-center gap-1.5`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span>
                {splashProgress < 20 ? 'د کلامونو او کتابونو راغونډول...' :
                 splashProgress < 45 ? 'د ښکلو ډیزاینونو او سټایلونو ترتیب کول...' :
                 splashProgress < 70 ? 'د شارټ او ترنمیز ریلزونو چمتو کول...' :
                 splashProgress < 90 ? 'د واټساپ شاعري سټورېز...' : 'اپلیکیشن چمتو دی! وګورئ...'}
              </span>
            </span>
          </div>

          {/* Spacer to push developer info to bottom */}
          <div className="flex-1" />

          {/* Developer credit at the bottom of the screen */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full flex justify-center pb-2 relative z-10"
          >
            <div className={`text-xs font-mono font-bold tracking-wider uppercase ${isDark ? 'text-indigo-400 bg-indigo-950/40 border-indigo-900/40' : 'text-indigo-600 bg-indigo-50 border-indigo-200'} border px-4 py-1.5 rounded-full shadow-sm`}>
              Develop by obaidullah ghafari
            </div>
          </motion.div>
        </div>
      )}


      {/* ==========================================================
         FIRST-TIME 5-PAGE ONBOARDING CAROUSEL (ښکلی، فول سکرین، د موضوع موافق روښانه/تیاره حالت ډیزاین)
         ========================================================== */}
      <AnimatePresence>
        {showOnboarding && (() => {
          const onboardingSlides = [
            {
              title: 'پښتو ادبي خزانه',
              desc: 'د پښتنو د مډرن ادب، کلتور، بې‌ساري ادبي زېرمو او خوندورو شعرونو یوازینی پوره ډیجیټل راټولونه.',
              icon: Sparkles,
              gradient: 'from-pink-500 via-rose-500 to-amber-500',
              badge: 'بشپړه ادبي زېرمه'
            },
            {
              title: 'د کیسو او ناولونو لړۍ',
              desc: 'رښتیني پښتو ناولونه، په زړه پورې کتابونه او د تلیګرام پی‌ډی‌اف ارشیف په مستقیم ډول ولولئ.',
              icon: BookOpen,
              gradient: 'from-violet-500 via-purple-600 to-indigo-600',
              badge: 'ناولونه او کتابونه'
            },
            {
              title: 'لنډ او زړه راښکونکي ریلزونه',
              desc: 'د پښتو ځانګړي ترنمونه، کښلي ویډیوګانې او لنډ ریلزونه (Reels) د ځانګړو ترتیباتو او غږونو سره وګورئ.',
              icon: Video,
              gradient: 'from-red-500 via-rose-600 to-pink-500',
              badge: 'شارټ ویډیوګانې'
            },
            {
              title: 'د واټساپ سټایل سټوریانې',
              desc: 'د لنډو شعرونو او په زړه پورې پیغامونو کتنې لپاره د واټساپ په څېر د ۲۴ ساعته سټوري سیستم.',
              icon: Layers,
              gradient: 'from-amber-400 via-orange-500 to-red-500',
              badge: 'شاعري او سټورېز'
            },
            {
              title: 'شخصي رنګونه او تېاره حالت',
              desc: 'د خپلې خوښې رنګ او په اسانۍ د لوستلو لپاره هر وخت ځانګړی تیاره (Twilight) یا روښانه بڼه غوره کړئ.',
              icon: Sun,
              gradient: 'from-blue-500 via-indigo-600 to-purple-600',
              badge: 'بهرني رنګونه'
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
              // ۲. د کیسو او ناولونو برخه
              setIsNovelsPageOpen(true);
            } else if (slideIndex === 2) {
              // ۳. شارټ او ترنمیز ریلزونه (Reels)
              setIsReelsOpen(true);
            } else if (slideIndex === 3) {
              // ۴. د سټورېز برخه
              if (storiesList.length > 0) {
                setActiveStoryIndex(0);
                setIsStoryViewerOpen(true);
              } else {
                setSelectedCategory('stories');
              }
            } else if (slideIndex === 4) {
              // ۵. غونډال رنګونه او تنظیمات
              setIsSettingsPageOpen(true);
            }
          };

          return (
            <>
              {/* Immersive Theme-Adaptive Full-Screen Setup View */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 z-[9991] overflow-y-auto flex flex-col justify-between p-6 sm:p-12 select-none transition-colors duration-300 ${
                  isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
                }`}
                style={{
                  paddingTop: 'calc(1.5rem + var(--safe-top))',
                  paddingBottom: 'calc(1.5rem + var(--safe-bottom))'
                }}
              >
                {/* Immersive background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
                  <div className={`absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[110px] opacity-20 bg-gradient-to-br ${currentSlide.gradient}`} />
                  <div className={`absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[130px] opacity-15 bg-gradient-to-tr ${currentSlide.gradient}`} />
                </div>

                <div className="relative z-10 max-w-lg mx-auto w-full h-full flex flex-col justify-between min-h-[550px] flex-1">
                  
                  {/* Top Segmented Progress Bar and Skip Button */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4" style={{ direction: 'rtl' }}>
                      <span className={`text-[10px] uppercase font-sans font-black ${
                        isDark ? 'text-slate-300 bg-slate-900 border-slate-800' : 'text-slate-700 bg-white border-slate-200'
                      } px-3.5 py-1.5 rounded-full border shadow-xs`}>
                        مرحله {activeOnboardingPage + 1} / 5
                      </span>
                      <button
                        onClick={handleFinishOnboarding}
                        style={{ cursor: 'pointer' }}
                        className="text-xs font-black font-sans text-rose-500 hover:text-rose-450 transition select-none active:scale-95 px-3 py-1.5 rounded-full hover:bg-rose-500/10"
                      >
                        تېرېدل / Skip
                      </button>
                    </div>

                    {/* Highly Interactive Navigable Segmented Progress Bars */}
                    <div className="flex gap-1.5 w-full" style={{ direction: 'rtl' }}>
                      {onboardingSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveOnboardingPage(idx)}
                          style={{ cursor: 'pointer' }}
                          title={`مرحله ${idx + 1}`}
                          className={`h-2 flex-1 rounded-full overflow-hidden focus:outline-none transition-all hover:scale-y-125 ${
                            isDark ? 'bg-slate-800' : 'bg-slate-250'
                          }`}
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
                  <div className="my-auto py-8 flex flex-col items-center text-center">
                    
                    {/* Glowing outer ring and icon */}
                    <motion.div
                      key={activeOnboardingPage}
                      initial={{ scale: 0.7, rotate: -15, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', damping: 12 }}
                      onClick={() => handleLaunchFeatureOnboard(activeOnboardingPage)}
                      style={{ cursor: 'pointer' }}
                      className={`w-28 h-28 rounded-full bg-gradient-to-tr ${currentSlide.gradient} p-0.5 shadow-2xl flex items-center justify-center mb-6 relative cursor-pointer active:scale-95 transition`}
                    >
                      <div className={`w-full h-full ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'} rounded-full flex items-center justify-center shadow-inner`}>
                        <SlideIcon className={`w-12 h-12`} />
                      </div>
                      
                      <span className="absolute -bottom-3 bg-slate-950 text-white rounded-full px-3 py-0.5 border border-slate-800 text-[9px] font-black tracking-wider shadow">
                        {currentSlide.badge}
                      </span>
                    </motion.div>

                    {/* Texts with animations */}
                    <div className="space-y-3" style={{ direction: 'rtl' }}>
                      <motion.h3
                        key={`title_${activeOnboardingPage}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => handleLaunchFeatureOnboard(activeOnboardingPage)}
                        style={{ cursor: 'pointer' }}
                        className={`text-xl sm:text-2xl font-black ${
                          isDark ? 'text-white' : 'text-slate-900'
                        } hover:text-indigo-400 transition leading-tight font-sans cursor-pointer flex items-center justify-center gap-1.5`}
                      >
                        {currentSlide.title}
                        <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                      </motion.h3>

                      <motion.p
                        key={`desc_${activeOnboardingPage}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className={`text-xs sm:text-sm ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        } leading-relaxed font-semibold max-w-sm mx-auto px-4`}
                      >
                        {currentSlide.desc}
                      </motion.p>
                    </div>

                  </div>

                  {/* Navigation controls next, back and get started */}
                  <div className="flex gap-3 items-center" style={{ direction: 'rtl' }}>
                    {activeOnboardingPage < 4 ? (
                      <button
                        onClick={() => setActiveOnboardingPage(prev => Math.min(prev + 1, 4))}
                        style={{ cursor: 'pointer' }}
                        className={`flex-1 py-3.5 bg-gradient-to-r ${currentSlide.gradient} active:scale-[0.98] text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 font-sans shadow-lg shadow-indigo-500/10 hover:brightness-110`}
                      >
                        <span>بلې مرحلې ته لاړ شئ</span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishOnboarding}
                        style={{ cursor: 'pointer' }}
                        className="flex-1 py-3.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:brightness-110 active:scale-[0.98] text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 font-sans shadow-lg shadow-pink-500/15"
                      >
                        <span>دلته پیل کړئ</span>
                        <Check className="w-4 h-4" />
                      </button>
                    )}

                    {activeOnboardingPage > 0 && (
                      <button
                        onClick={() => setActiveOnboardingPage(prev => Math.max(prev - 1, 0))}
                        style={{ cursor: 'pointer' }}
                        className={`px-5 py-3.5 rounded-xl text-xs font-bold transition active:scale-[0.98] ${
                          isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-300' : 'bg-slate-200 hover:bg-slate-250 text-slate-700 border border-slate-200'
                        }`}
                      >
                        بېرته
                      </button>
                    )}
                  </div>

                </div>
              </motion.div>
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
         STORY VIEWER FULL-SCREEN SYSTEM (د واټساپ سټایل سټوریانې کتل او د پرمختګ بارونه)
         ========================================================== */}
      <AnimatePresence>
        {isStoryViewerOpen && storiesList.length > 0 && (() => {
          const activeStory = storiesList[activeStoryIndex];
          if (!activeStory) return null;

          const hasVideo = !!activeStory.videoUrl || (activeStory.videoList && activeStory.videoList.length > 0);
          const photo = activeStory.photoUrl || (activeStory.photoUrls && activeStory.photoUrls[0]);

          const storyGradients = [
            'from-pink-500 via-rose-500 to-amber-500',
            'from-purple-600 via-pink-600 to-rose-600',
            'from-indigo-600 via-purple-600 to-pink-500',
            'from-amber-400 via-orange-500 to-rose-500',
            'from-teal-500 via-emerald-600 to-indigo-600',
            'from-blue-600 via-indigo-600 to-purple-600',
            'from-crimson-600 via-purple-600 to-pink-600'
          ];
          const charSum = String(activeStory.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const selectedGradient = storyGradients[charSum % storyGradients.length];

          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 w-screen h-screen bg-black/95 z-[10000] flex flex-col justify-between overflow-hidden select-none"
            >
              <div className="absolute inset-0 z-0 pointer-events-none">
                {photo ? (
                  <div className="relative w-full h-full">
                    <CachedImage
                      src={photo}
                      alt="Story background"
                      className="w-full h-full object-cover blur-2xl opacity-40 scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </div>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${selectedGradient} opacity-20`} />
                )}
              </div>

              <div className="relative z-10 w-full max-w-lg mx-auto h-full flex flex-col justify-between p-4 pb-8">
                <div className="space-y-3 w-full">
                  <div className="flex gap-1 w-full pt-2">
                    {storiesList.map((_, idx) => {
                      let widthPercent = 0;
                      if (idx < activeStoryIndex) widthPercent = 100;
                      else if (idx === activeStoryIndex) widthPercent = storyProgress;

                      return (
                        <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white transition-all duration-75 ease-out" 
                            style={{ width: `${widthPercent}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="flex items-center gap-2.5 flex-row-reverse text-right">
                      <PremiumAvatar 
                        src={feedData?.channelInfo?.avatarUrl || "https://telegram.org/img/t_logo.png"} 
                        sizeClass="w-9 h-9" 
                        showStoryRing={false} 
                      />
                      <div>
                        <h4 className="text-xs font-black text-white font-sans">{feedData?.channelInfo?.title || 'د مېنې ډېوه'}</h4>
                        <p className="text-[9px] text-slate-300 font-bold font-sans">کيسه {activeStoryIndex + 1} / {storiesList.length}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsStoryPaused(!isStoryPaused)}
                        style={{ cursor: 'pointer' }}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
                      >
                        {isStoryPaused ? <Play className="w-4 h-4 fill-current text-white" /> : <Pause className="w-4 h-4 fill-current text-white" />}
                      </button>
                      <button 
                        onClick={() => setIsStoryViewerOpen(false)}
                        style={{ cursor: 'pointer' }}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full flex items-center justify-center py-4 relative">
                  <div className="absolute inset-0 z-20 flex">
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevStory();
                      }}
                      className="w-[30%] h-full cursor-w-resize"
                    />
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextStory();
                      }}
                      className="w-[70%] h-full cursor-e-resize"
                    />
                  </div>

                  <div className="w-full max-h-[75vh] rounded-3xl overflow-hidden shadow-2xl relative flex items-center justify-center select-none bg-black/40 border border-white/10 z-10">
                    {hasVideo ? (
                      <video
                        ref={storyVideoRef}
                        src={activeStory.videoUrl || (activeStory.videoList && activeStory.videoList[0])}
                        autoPlay={!isStoryPaused}
                        playsInline
                        className="w-full h-full max-h-[70vh] object-contain"
                        onEnded={handleNextStory}
                        onTimeUpdate={() => {
                          if (storyVideoRef.current) {
                            const dur = storyVideoRef.current.duration || 6.5;
                            const cur = storyVideoRef.current.currentTime || 0;
                            setStoryProgress((cur / dur) * 100);
                          }
                        }}
                      />
                    ) : photo ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <CachedImage
                          src={photo}
                          alt="Story content"
                          className="w-full max-h-[70vh] object-contain"
                        />
                        {activeStory.text && (
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-right font-sans">
                            <p className="text-white text-xs sm:text-sm font-bold leading-relaxed whitespace-pre-line drop-shadow-md">
                              {activeStory.text.replace(/#سټوري|#ستوری|#story|#سټوريانې/g, '').trim()}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`w-full min-h-[400px] bg-gradient-to-br ${selectedGradient} p-8 flex flex-col items-center justify-center text-center relative`}>
                        <Quote className="absolute w-24 h-24 text-white/5 top-6 left-6 rotate-180" />
                        <p className="text-white text-base sm:text-lg font-black leading-relaxed whitespace-pre-line drop-shadow-md font-sans max-w-sm">
                          {activeStory.text ? activeStory.text.replace(/#سټوري|#ستوری|#story|#سټوريانې/g, '').trim() : 'ساده پیغام'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full flex items-center justify-between gap-3 relative z-30">
                  <button
                    onClick={() => {
                      const textToCopy = activeStory.text || '';
                      navigator.clipboard.writeText(textToCopy);
                      showToast('متن په بریالیتوب سره کاپي شو! ✅');
                    }}
                    style={{ cursor: 'pointer' }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white transition-all text-xs font-black flex items-center justify-center gap-2 border border-white/5 active:scale-95"
                  >
                    <Copy className="w-4 h-4" />
                    <span>متن کاپي کړئ</span>
                  </button>

                  <button
                    onClick={() => {
                      const url = activeStory.postUrl || window.location.href;
                      if (navigator.share) {
                        navigator.share({
                          title: 'د مېنې ډېوه سټوري',
                          text: activeStory.text || '',
                          url
                        }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(url);
                        showToast('د سټوري لینک کاپي شو! ✉️');
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white transition-all text-xs font-black flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-pink-500/20"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>سټوري شریک کړئ</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })()}
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
                          
                          <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{devName}</h4>
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
                        {devPost ? (
                          <div className="text-right text-[11px] leading-relaxed">
                            {(() => {
                              const { cleanText, links } = extractProfileLinksAndText(devPost.text, devPost.htmlText);
                              return (
                                <>
                                  <div className={`${isDark ? 'text-slate-300' : 'text-slate-700'} whitespace-pre-wrap leading-relaxed`}>
                                    {cleanText.split('\n').map((line, lIdx) => (
                                      <p key={lIdx} className="mb-2 font-medium leading-relaxed font-sans">{line}</p>
                                    ))}
                                  </div>
                                  
                                  {links.length > 0 && <ProfileSocialLinks links={links} />}
                                </>
                              );
                            })()}
                          </div>
                        ) : (
                          <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-705'} leading-relaxed`}>
                            زه {devName} یم، د لوګر ولایت اوسېدونکی. د ټکنالوژۍ، ویب پرافتیا, مصنوعي ځیرکتیا او زده کړې سره ځانګړې مینه لرم او هڅه کوم چې د دین، هېواد او پښتو ژبې لپاره ګټور ډیجیټلي خدمتونه وړاندې کړم.
                          </p>
                        )}
                      </div>

                      {/* Mission Card */}
                      <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-2 text-right`}>
                        <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                          <span className="text-xs">زما موخه</span>
                          <Rocket className="w-4 h-4" />
                        </div>
                        <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-705'} leading-relaxed`}>
                          دین ته خدمت، هېواد ته خدمت، پښتو ژبې ته وده ورکول، امت او بشریت ته ګټور پاتې کېدل، د پوهې خپرول، نوښت او پرمختګ.
                        </p>
                      </div>

                      {/* Activities Card */}
                      <div className={`p-4 rounded-xl border border-slate-500/10 ${subCardBg} space-y-2 text-right`}>
                        <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-500/5 pb-1.5 justify-end">
                          <span className="text-xs">ورځنۍ بوختیاوې</span>
                          <Calendar className="w-4 h-4" />
                        </div>
                        <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-705'} leading-relaxed`}>
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
                              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '95%' }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Section */}
                      <div className="pt-2 border-t border-slate-500/10 flex flex-col items-center gap-1 text-center font-sans">
                        <span className="text-[10px] text-slate-400 flex items-center justify-center">
                          Made with <Heart className="w-3 h-3 text-rose-500 mx-1 inline" /> by {devName}
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

                  {/* Contact form modal */}
                  {activeModal === 'contact' && (
                    <div className="space-y-4 text-right font-sans">
                      {contactSuccess ? (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center">
                          <Check className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                          <p className="text-xs font-bold">ستاسو پیغام په بریالیتوب سره واستول شو!</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-[11px] text-slate-400 leading-relaxed">زموږ د ملاتړ متخصص سره د اړیکې لپاره لاندې فارم ډک کړئ:</p>
                          {contactError && <div className="text-[10px] text-rose-500 bg-rose-500/5 p-2 rounded-lg">{contactError}</div>}
                          <div>
                            <input
                              type="text"
                              placeholder="ستاسو نوم"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className="w-full text-right p-2.5 bg-slate-950/50 border border-slate-800 rounded-xl text-xs select-auto text-white"
                            />
                          </div>
                          <div>
                            <textarea
                              placeholder="ستاسو پیغام..."
                              value={contactMsg}
                              rows={4}
                              onChange={(e) => setContactMsg(e.target.value)}
                              className="w-full text-right p-2.5 bg-slate-950/50 border border-slate-800 rounded-xl text-xs select-auto text-white"
                            />
                          </div>
                          <button
                            onClick={handleSendTelegramContact}
                            disabled={contactSending}
                            className={`w-full py-2.5 ${tc.bg} ${tc.hoverBg} text-white rounded-xl text-xs font-bold transition disabled:opacity-50`}
                          >
                            {contactSending ? 'پیغام لیږل کیږي...' : 'پیغام واستوئ'}
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => setActiveModal(null)}
                        style={{ cursor: 'pointer' }}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-755 text-slate-300 rounded-xl text-xs font-semibold transition"
                      >
                        بند کړئ
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

      {(() => {
        return (
          <>
            {/* Dynamic Admin Detail Modal (وحیدالله قلمیار پېژندندپاڼه په کليک کولو سره) */}
            <AnimatePresence>
              {isAdminDetailOpen && (() => {
                const rawText = adminPost?.text || "ښاغلی وحیدالله قلمیار د پښتو خوږې ژبې، ادب او مینه وال، د دې پښتو ادبي خزانې د ځانګړې نشراتي څانګې مسؤل دی.\n\nپه دې غوښتنلیک کې د ټولو ادبیاتو انتخاب، د خوږو شعرونو, کلامونو او نثرونو تفصیلي راټولونه او تصحیح د اډمین قلمیار صاحب له لوري په پوره امانتدارۍ او مینه ترسره کېږي ترڅو د پښتو مینه والو ته کره محتوا ورسېږي.";
                const { cleanText, links } = extractProfileLinksAndText(rawText, adminPost?.htmlText);
                const profileImg = adminPost?.photoUrls?.[0] || adminPost?.photoUrl || adminAvatarImg;
                const coverImg = adminPost?.photoUrls?.[1] || "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";

                return (
                  <div key="admin-detail-modal" className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
                    {/* Backdrop cover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsAdminDetailOpen(false)}
                      className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
                    />
                    {/* Modal Box */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 30 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 245 }}
                      className={`relative w-full max-w-lg rounded-3xl overflow-hidden border shadow-2xl flex flex-col text-right ${
                        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      {/* Header Image Header / Aesthetic Banner Cover (Second photo) */}
                      <div className="relative h-44 w-full bg-slate-950">
                        <img
                          src={coverImg}
                          alt="Cover Banner"
                          className="w-full h-full object-cover opacity-90"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                        
                        {/* Admin Role Emblem Badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full shadow-md border border-amber-300/30 text-[10px] font-black z-20">
                          <Shield className="w-3 h-3 fill-current text-slate-950" />
                          <span>د اپلیکیشن اډمین</span>
                        </div>
                        
                        {/* Close Button top-left */}
                        <button
                          onClick={() => setIsAdminDetailOpen(false)}
                          style={{ cursor: 'pointer' }}
                          className="absolute top-4 left-4 p-2 bg-slate-950/70 hover:bg-slate-900/95 text-white rounded-full transition border border-white/10 z-20 active:scale-90"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        {/* Circular Avatar Overlapping at bottom-right (First photo) */}
                        <div className="absolute -bottom-9 right-5 z-20 p-1 bg-slate-900 rounded-full shadow-xl">
                          <img
                            src={profileImg}
                            alt="Avatar"
                            className="w-20 h-20 rounded-full object-cover border-2 border-amber-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Scrollable Bio Text Content */}
                      <div className="p-5 pt-12 space-y-4 max-h-[55vh] overflow-y-auto scrollbar-thin text-right font-sans">
                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                            {adminName}
                          </span>
                          <h3 className={`text-base font-black font-sans mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            د پښتو ادبي خزانې د محتوا تنظیموونکی
                          </h3>
                        </div>

                        {/* Active status ribbon */}
                        <div className={`p-3 rounded-2xl flex items-center justify-between flex-row-reverse border ${
                          isDark ? 'bg-slate-850/50 border-slate-800' : 'bg-slate-50 border-slate-100'
                        }`}>
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                            فعال او انلاین اډمین
                          </span>
                          <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-550'} font-bold`}>
                            Publisher & Administrator
                          </span>
                        </div>

                        {/* Clean Text Content */}
                        <div className={`p-1.5 space-y-2.5 text-right leading-relaxed text-xs sm:text-sm font-semibold select-all ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}>
                          {cleanText.split('\n').map((line, idx) => (
                            <p key={idx} className="mb-2 font-medium leading-relaxed font-sans">{line}</p>
                          ))}
                        </div>

                        {/* Beautifully styled circular icon-only buttons for extracted links */}
                        {links.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-500/10 text-center space-y-3">
                            <h4 className="text-xs font-black text-amber-500">ارتباطي شبکې / اړيکې:</h4>
                            <ProfileSocialLinks links={links} />
                          </div>
                        )}
                      </div>

                      {/* Action Close Buttons footer */}
                      <div className={`p-4 border-t flex justify-end gap-2.5 flex-row-reverse ${
                        isDark ? 'border-slate-800 bg-slate-850/30' : 'border-slate-150 bg-slate-50/50'
                      }`}>
                        <button
                          onClick={() => setIsAdminDetailOpen(false)}
                          style={{ cursor: 'pointer' }}
                          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all shadow-md active:scale-95 flex items-center gap-1.5 flex-row-reverse"
                        >
                          <Check className="w-4 h-4 text-slate-950" />
                          <span>بندول</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAuthorName(adminName);
                            setIsAdminDetailOpen(false);
                            setSelectedPost(null);
                            setIsSidebarOpen(false);
                            setIsAboutPageOpen(false);
                            setIsContactPageOpen(false);
                            setIsSettingsPageOpen(false);
                            setIsCategoryPageOpen(false);
                            setIsNovelsPageOpen(false);
                            setIsReelsOpen(false);
                            setIsPhotoReelsOpen(false);
                          }}
                          style={{ cursor: 'pointer' }}
                          className="px-4 py-2.5 rounded-xl border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 text-xs font-black transition-all active:scale-95 flex items-center gap-1.5 flex-row-reverse"
                        >
                          <BookOpen className="w-4 h-4 text-amber-500" />
                          <span>ټول پوسټونه</span>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                );
              })()}
            </AnimatePresence>

            {/* Dynamic Developer Detail Modal (عبیدالله غفاري پېژندپاڼه په کليک کولو سره) */}
            <AnimatePresence>
              {isDevDetailOpen && (() => {
                const rawText = devPost?.text || "زه عبیدالله غفاري یم، د علم، مطالعې او ټکنالوژۍ مینهوال. زما هڅه دا ده چې د اسلامي ارزښتونو، ګټورو معلوماتو او مثبتو افکارو د خپرولو لپاره له عصري وسایلو او ټکنالوژۍ څخه ګټه واخلم.\n\nځان د ټول عمر زده کوونکی ګڼم او باور لرم چې علم د انسان د پرمختګ او نېکمرغۍ تر ټولو ستره وسیله ده. له دیني زده کړو سره سره د کمپیوټر، ویبپاڼو، مصنوعي ځیرکتیا (AI)، لیکوالۍ او ډیجیټلي نړۍ په اړه هم زده کړې او تجربې ترلاسه کوم.\n\nتاسو زما سره په لاندې لېنکونو اړیکه نیولی شئ:";
                const { cleanText, links } = extractProfileLinksAndText(rawText, devPost?.htmlText);
                const profileImg = devPost?.photoUrls?.[0] || devPost?.photoUrl || developerAvatarImg;
                const coverImg = devPost?.photoUrls?.[1] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80";

                return (
                  <div key="dev-detail-modal" className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
                    {/* Backdrop cover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsDevDetailOpen(false)}
                      className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
                    />
                    {/* Modal Box */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 30 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 245 }}
                      className={`relative w-full max-w-lg rounded-3xl overflow-hidden border shadow-2xl flex flex-col text-right ${
                        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      {/* Header Image Header / Aesthetic Banner Cover (Second photo) */}
                      <div className="relative h-44 w-full bg-slate-950">
                        <img
                          src={coverImg}
                          alt="Cover Banner"
                          className="w-full h-full object-cover opacity-90"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                        
                        {/* Dev Role Emblem Badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-indigo-600 text-slate-100 px-2.5 py-1 rounded-full shadow-md border border-indigo-300/30 text-[10px] font-black z-20">
                          <Cpu className="w-3 h-3 text-slate-100" />
                          <span>سافټویر انجینر / جوړونکی</span>
                        </div>
                        
                        {/* Close Button top-left */}
                        <button
                          onClick={() => setIsDevDetailOpen(false)}
                          style={{ cursor: 'pointer' }}
                          className="absolute top-4 left-4 p-2 bg-slate-950/70 hover:bg-slate-900/95 text-white rounded-full transition border border-white/10 z-20 active:scale-90"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        {/* Circular Avatar Overlapping at bottom-right (First photo) */}
                        <div className="absolute -bottom-9 right-5 z-20 p-1 bg-slate-900 rounded-full shadow-xl">
                          <img
                            src={profileImg}
                            alt="Avatar"
                            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Scrollable Bio Text Content */}
                      <div className="p-5 pt-12 space-y-4 max-h-[55vh] overflow-y-auto scrollbar-thin text-right font-sans">
                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400 bg-indigo-450/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                            {devName}
                          </span>
                          <h3 className={`text-base font-black font-sans mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            د غوښتنلیک سافټویر انجینر او منځپانګه جوړونکی
                          </h3>
                        </div>

                        {/* Active status ribbon */}
                        <div className={`p-3 rounded-2xl flex items-center justify-between flex-row-reverse border ${
                          isDark ? 'bg-slate-850/50 border-slate-800' : 'bg-slate-50 border-slate-100'
                        }`}>
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                            فعال او انلاین جوړونکی
                          </span>
                          <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-550'} font-bold`}>
                            Software Developer
                          </span>
                        </div>

                        {/* Clean Text Content */}
                        <div className={`p-1.5 space-y-2.5 text-right leading-relaxed text-xs sm:text-sm font-semibold select-all ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}>
                          {cleanText.split('\n').map((line, idx) => (
                            <p key={idx} className="mb-2 font-medium leading-relaxed font-sans">{line}</p>
                          ))}
                        </div>

                        {/* Beautifully styled circular icon-only buttons for extracted links */}
                        {links.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-500/10 text-center space-y-3">
                            <h4 className="text-xs font-black text-indigo-400">ارتباطي شبکې / اړيکې:</h4>
                            <ProfileSocialLinks links={links} />
                          </div>
                        )}
                      </div>

                      {/* Action Close Buttons footer */}
                      <div className={`p-4 border-t flex justify-end gap-2.5 flex-row-reverse ${
                        isDark ? 'border-slate-800 bg-slate-850/30' : 'border-slate-150 bg-slate-50/50'
                      }`}>
                        <button
                          onClick={() => setIsDevDetailOpen(false)}
                          style={{ cursor: 'pointer' }}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition-all shadow-md active:scale-95 flex items-center gap-1.5 flex-row-reverse"
                        >
                          <Check className="w-4 h-4" />
                          <span>بندول</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAuthorName(devName);
                            setIsDevDetailOpen(false);
                            setSelectedPost(null);
                            setIsSidebarOpen(false);
                            setIsAboutPageOpen(false);
                            setIsContactPageOpen(false);
                            setIsSettingsPageOpen(false);
                            setIsCategoryPageOpen(false);
                            setIsNovelsPageOpen(false);
                            setIsReelsOpen(false);
                            setIsPhotoReelsOpen(false);
                          }}
                          style={{ cursor: 'pointer' }}
                          className="px-4 py-2.5 rounded-xl border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 text-xs font-black transition-all active:scale-95 flex items-center gap-1.5 flex-row-reverse"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>ټول پوسټونه</span>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                );
              })()}
            </AnimatePresence>
          </>
        );
      })()}

      {/* FULLSCREEN REELS OVERLAY */}
      <AnimatePresence>
        {isReelsOpen && (() => {
          if (reelsList.length === 0) {
            return (
              <div className="fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden flex flex-col justify-center items-center font-sans animate-fade-in">
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
              </div>
            );
          }
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
            <div className="fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden flex flex-col justify-center items-center font-sans animate-fade-in">
              <div 
                className="w-full h-full relative bg-black flex flex-col justify-center items-center overflow-hidden touch-none select-none"
                onWheel={handleReelWheel}
                onTouchStart={onReelTouchStart}
                onTouchMove={onReelTouchMove}
                onTouchEnd={onReelTouchEnd}
              >
                {/* Floating Action Glass Back navigation button, positioned top-right for high ergonomics */}
                <button
                  onClick={() => {
                    setIsReelsOpen(false);
                    if (profileBackAuthorName) {
                      setSelectedAuthorName(profileBackAuthorName);
                      setProfileBackAuthorName(null);
                    }
                  }}
                  style={{ top: 'calc(1.25rem + var(--safe-top))', right: '1.25rem', cursor: 'pointer' }}
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
                          onWaiting={() => setReelLoading(true)}
                          onPlaying={() => setReelLoading(false)}
                          onCanPlay={() => setReelLoading(false)}
                          onLoadStart={() => { setReelLoading(true); setReelError(false); }}
                          onError={() => { setReelLoading(false); setReelError(true); }}
                          className="w-full h-full object-contain cursor-pointer"
                        />
                      </div>

                      {/* 2. LOADING SPIN OVERLAY */}
                      {reelLoading && !reelError && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center z-25 pointer-events-none">
                          <div className="absolute inset-0 shimmer opacity-25" />
                          <div className="relative flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px] font-sans font-bold text-indigo-300">ويډيو پورته کېږي...</span>
                          </div>
                        </div>
                      )}

                      {/* 2.1 REEL ERROR FALLBACK */}
                      {reelError && (
                        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center z-25 select-none">
                          <div className="p-3.5 rounded-full bg-rose-950/40 border border-rose-900/40 text-rose-500 mb-3 animate-pulse shrink-0">
                            <AlertCircle className="w-7 h-7 text-rose-500" />
                          </div>
                          <h4 className="text-sm font-black text-white">ویډیو لوډ نشوه</h4>
                          <p className="text-[11px] text-slate-400 max-w-xs mt-1 leading-relaxed">د شارټ ویډیو د پورته کولو پر مهال کومه ستونزه وه ځکه انټرنیټ یا شبکه فعاله نه ده.</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setReelError(false);
                              setReelLoading(true);
                              if (reelVideoRef.current) {
                                reelVideoRef.current.load();
                              }
                            }}
                            className="mt-4 px-4 py-2 text-[10px] font-black rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition active:scale-95 cursor-pointer border border-indigo-500/20"
                          >
                            بیا هڅه وکړئ
                          </button>
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
                      <div className="absolute left-6 z-20 text-white flex items-center justify-between" style={{ top: 'calc(1.5rem + var(--safe-top))', right: '10.5rem' }}>
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
                        className="absolute right-5 sm:right-7 flex flex-col gap-4.5 z-25 items-center select-none" 
                        style={{ bottom: 'calc(6rem + var(--safe-bottom))' }}
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

                        {/* Bookmark / To-Read Button (وروسته لوستل) */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleToRead(activeReel.post.id);
                          }}
                          style={{ cursor: 'pointer' }}
                          className="flex flex-col items-center group active:scale-90 transition"
                          title="وروسته لوستل"
                        >
                          <div className={`w-11.5 h-11.5 rounded-full border flex items-center justify-center backdrop-blur-md transition-all shadow-xl ${
                            toReadPostIds.includes(activeReel.post.id)
                              ? 'bg-amber-600/80 border-amber-500 scale-105'
                              : 'bg-black/60 border-white/10 hover:border-amber-500 hover:scale-105 hover:bg-black/80'
                          }`}>
                            <Bookmark className={`w-5 h-5 transition duration-250 ${
                              toReadPostIds.includes(activeReel.post.id) 
                                ? 'text-white fill-white scale-110' 
                                : 'text-slate-100 group-hover:text-amber-500 group-hover:scale-110'
                            }`} />
                          </div>
                          <span className="text-[10px] text-slate-300 mt-1 font-bold shadow-md select-none pr-0.5">
                            {toReadPostIds.includes(activeReel.post.id) ? 'نښه شو' : 'وروسته لوستل'}
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
                      <div className="absolute right-24 sm:right-28 left-6 z-20 text-white select-text pointer-events-none text-right flex flex-col gap-2"
                        style={{ bottom: 'calc(1.5rem + var(--safe-bottom))' }}
                      >
                        <div 
                          onClick={() => {
                            const authorName = activeReel.post.authorName || feedData?.channelInfo?.title || "پښتو ادبي خزانه";
                            setSelectedAuthorName(authorName);
                            setProfileBackAuthorName(null);
                            setProfileBackOrigin('reels');
                            setProfileBackReelIndex(activeReelIndex);
                            setIsReelsOpen(false);
                            if (reelVideoRef.current) {
                              reelVideoRef.current.pause();
                            }
                          }}
                          className="pointer-events-auto flex items-center gap-2.5 justify-end cursor-pointer hover:scale-105 active:scale-95 transition duration-200"
                          title="د خپرونکي د ټولو لیکنو لیدل"
                        >
                          <div className="flex flex-col items-end text-right">
                            <span className="text-white text-[12px] font-black leading-tight drop-shadow font-sans">
                              {activeReel.post.authorName || feedData?.channelInfo?.title || "پښتو ادبي خزانه"}
                            </span>
                            <span className="text-slate-300 text-[9.5px] font-medium leading-tight drop-shadow mt-0.5">
                              {getRelativeTimeInPashto(activeReel.post.date, activeReel.post.timeLabel || 'وروستی')}
                            </span>
                          </div>
                          <PremiumAvatar
                            src={activeReel.post.authorName 
                              ? `https://ui-avatars.com/api/?name=${encodeURIComponent(activeReel.post.authorName)}&background=6366f1&color=fff&size=128&bold=true` 
                              : (feedData?.channelInfo?.avatarUrl || "https://t.me/i/userpic/320/obaidapp.jpg")}
                            sizeClass="w-9 h-9"
                            ringSize="p-[1.5px]"
                            showStoryRing={true}
                          />
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
            </div>
          );
        })()}
      </AnimatePresence>

      {/* FULLSCREEN PHOTO REELS OVERLAY */}
      <AnimatePresence>
        {isPhotoReelsOpen && (() => {
          if (photoReelsList.length === 0) {
            return (
              <div className="fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden flex flex-col justify-center items-center font-sans animate-fade-in">
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
              </div>
            );
          }
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
            <div className="fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden flex flex-col justify-center items-center font-sans animate-fade-in">
              <div 
                className="w-full h-full relative bg-black flex flex-col justify-center items-center overflow-hidden animate-fade-in touch-none select-none"
                onWheel={handlePhotoReelWheel}
                onTouchStart={onPhotoReelTouchStart}
                onTouchMove={onPhotoReelTouchMove}
                onTouchEnd={onPhotoReelTouchEnd}
              >
                {/* Floating Action Glass Back navigation button, positioned top-right for high ergonomics */}
                <button
                  onClick={() => {
                    setIsPhotoReelsOpen(false);
                    if (profileBackAuthorName) {
                      setSelectedAuthorName(profileBackAuthorName);
                      setProfileBackAuthorName(null);
                    }
                  }}
                  style={{ top: 'calc(1.25rem + var(--safe-top))', right: '1.25rem', cursor: 'pointer' }}
                  className="absolute z-40 px-4 py-2.5 rounded-full bg-black/60 hover:bg-white/10 border border-white/10 text-white shadow-2xl active:scale-95 transition backdrop-blur-md flex items-center gap-2 font-sans font-bold text-xs"
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
                        <CachedImage
                          src={activePhotoReel.photoUrl}
                          alt="photo reel display"
                          className="w-full h-full object-contain select-none max-h-screen"
                        />
                      </div>

                      {/* 2. LIGHTNING GRADIENT OVERLAYS */}
                      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/85 via-black/35 to-transparent pointer-events-none z-10" />
                      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />

                      {/* 3. TOP FLOATING STATUS BAR */}
                      <div className="absolute left-6 z-20 text-white flex items-center justify-between" style={{ top: 'calc(1.5rem + var(--safe-top))', right: '10.5rem' }}>
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
                        className="absolute right-5 sm:right-7 flex flex-col gap-4.5 z-25 items-center select-none" 
                        style={{ bottom: 'calc(6rem + var(--safe-bottom))' }}
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

                        {/* Bookmark / To-Read Button (وروسته لوستل) */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleToRead(activePhotoReel.post.id);
                          }}
                          style={{ cursor: 'pointer' }}
                          className="flex flex-col items-center group active:scale-90 transition"
                          title="وروسته لوستل"
                        >
                          <div className={`w-11.5 h-11.5 rounded-full border flex items-center justify-center backdrop-blur-md transition-all shadow-xl ${
                            toReadPostIds.includes(activePhotoReel.post.id)
                              ? 'bg-amber-600/80 border-amber-500 scale-105'
                              : 'bg-black/60 border-white/10 hover:border-amber-500 hover:scale-105 hover:bg-black/80'
                          }`}>
                            <Bookmark className={`w-5 h-5 transition duration-250 ${
                              toReadPostIds.includes(activePhotoReel.post.id) 
                                ? 'text-white fill-white scale-110' 
                                : 'text-slate-100 group-hover:text-amber-500 group-hover:scale-110'
                            }`} />
                          </div>
                          <span className="text-[10px] text-slate-300 mt-1 font-bold shadow-md select-none pr-0.5">
                            {toReadPostIds.includes(activePhotoReel.post.id) ? 'نښه شو' : 'وروسته لوستل'}
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
                      <div className="absolute right-24 sm:right-28 left-6 z-20 text-white select-text pointer-events-none text-right flex flex-col gap-2"
                        style={{ bottom: 'calc(1.5rem + var(--safe-bottom))' }}
                      >
                        <div 
                          onClick={() => {
                            const authorName = activePhotoReel.post.authorName || feedData?.channelInfo?.title || "پښتو ادبي خزانه";
                            setSelectedAuthorName(authorName);
                            setProfileBackAuthorName(null);
                            setProfileBackOrigin('photo_reels');
                            setProfileBackReelIndex(activePhotoReelIndex);
                            setIsPhotoReelsOpen(false);
                          }}
                          className="pointer-events-auto flex items-center gap-2.5 justify-end cursor-pointer hover:scale-105 active:scale-95 transition duration-200"
                          title="د خپرونکي د ټولو لیکنو لیدل"
                        >
                          <div className="flex flex-col items-end text-right">
                            <span className="text-white text-[12px] font-black leading-tight drop-shadow font-sans">
                              {activePhotoReel.post.authorName || feedData?.channelInfo?.title || "پښتو ادبي خزانه"}
                            </span>
                            <span className="text-slate-300 text-[9.5px] font-medium leading-tight drop-shadow mt-0.5">
                              {getRelativeTimeInPashto(activePhotoReel.post.date, activePhotoReel.post.timeLabel || 'وروستی')}
                            </span>
                          </div>
                          <PremiumAvatar
                            src={activePhotoReel.post.authorName 
                              ? `https://ui-avatars.com/api/?name=${encodeURIComponent(activePhotoReel.post.authorName)}&background=6366f1&color=fff&size=128&bold=true` 
                              : (feedData?.channelInfo?.avatarUrl || "https://t.me/i/userpic/320/obaidapp.jpg")}
                            sizeClass="w-9 h-9"
                            ringSize="p-[1.5px]"
                            showStoryRing={true}
                          />
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

                        {/* Views count indicator */}
                        <div className="flex items-center gap-3 justify-end text-[9px] text-slate-350 pointer-events-none select-none drop-shadow mt-1">
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
            </div>
          );
        })()}
      </AnimatePresence>

      {/* BEAUTIFUL CUSTOM BOTTOM SHEET (بارک شیټ) FOR DISPLAYING FULL REEL TEXT */}
      <AnimatePresence>
        {overlayActiveText && (
          <>
            {/* Backdrop with elegant blur */}
            <motion.div
              key="text-sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOverlayActiveText(null)}
              className="fixed inset-0 bg-black/65 backdrop-blur-xs z-[10000] cursor-pointer"
            />

            {/* Bottom Sheet Container */}
            <motion.div
              key="text-sheet-panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className={`fixed inset-x-0 bottom-0 max-h-[82vh] rounded-t-[32px] border-t z-[10001] shadow-2xl overflow-hidden flex flex-col font-sans text-right ${
                isDark 
                  ? 'bg-slate-950 border-slate-850 text-white shadow-slate-950/60' 
                  : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/60'
              }`}
            >
              {/* Top drag handle indicator */}
              <div 
                className="w-full py-3.5 flex justify-center items-center cursor-pointer select-none shrink-0"
                onClick={() => setOverlayActiveText(null)}
              >
                <div className={`w-12 h-1.5 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
              </div>

              {/* Bottom Sheet Header */}
              <div className="px-6 pb-4 border-b border-slate-100 dark:border-slate-850 flex flex-row-reverse justify-between items-center shrink-0">
                <div className="flex items-center gap-2 flex-row-reverse">
                  <div className={`p-2 rounded-full ${isDark ? 'bg-indigo-950/40 text-indigo-400' : 'bg-indigo-555/10 text-indigo-650 dark:text-indigo-400'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black font-sans leading-none">
                    {appLanguage === 'en' ? 'Complete Description' : 'پوره متن او کلام'}
                  </h3>
                </div>

                <button
                  onClick={() => setOverlayActiveText(null)}
                  style={{ cursor: 'pointer' }}
                  className={`p-2 rounded-full transition ${isDark ? 'hover:bg-slate-850 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
                  title="تړل"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Sheet Content (Scrollable text) */}
              <div className="p-6 overflow-y-auto flex-1 select-text scrollbar-thin scrollbar-thumb-indigo-500/10">
                <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed font-semibold font-sans whitespace-pre-wrap break-words text-right" style={{ direction: 'rtl' }}>
                  {overlayActiveText}
                </p>
              </div>

              {/* Bottom Sheet Action Bar */}
              <div className={`p-5 px-6 border-t flex flex-row-reverse gap-4 items-center shrink-0 ${isDark ? 'bg-slate-900/45 border-slate-850' : 'bg-slate-50 border-slate-100'}`}>
                {/* Copy Text Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(overlayActiveText);
                    showToast(appLanguage === 'en' ? 'Text copied successfully!' : 'د شعر متن په بریالیتوب سره کاپي شو!');
                  }}
                  style={{ cursor: 'pointer' }}
                  className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-black transition active:scale-[0.98] ${
                    isDark
                      ? 'bg-indigo-600 hover:bg-indigo-550 text-white shadow-lg shadow-indigo-600/15'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/15'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  <span>{appLanguage === 'en' ? 'Copy Text' : 'متن کاپي کړئ'}</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'د مينې ډېوه',
                        text: overlayActiveText
                      }).catch(err => console.log(err));
                    } else {
                      navigator.clipboard.writeText(overlayActiveText);
                      showToast(appLanguage === 'en' ? 'Text copied to share!' : 'د شریکولو لپاره کاپي شو!');
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                  className={`px-5 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-black border transition active:scale-[0.98] ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>{appLanguage === 'en' ? 'Share' : 'شریک کړئ'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
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
        className="fixed right-6 z-[99999] flex items-center gap-3 select-none flex-row-reverse"
        style={{ bottom: 'calc(1.5rem + var(--safe-bottom))' }}
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
