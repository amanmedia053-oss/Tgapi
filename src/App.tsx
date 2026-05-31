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
  Images
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom elegant audio player with progress bar tracking
function BeautifulAudioPlayer({ url, title, duration, isDark, tc }: { url: string; title: string; duration?: string; isDark: boolean; tc: any }) {
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

const extractUrl = (text: string): string | null => {
  if (!text) return null;
  const match = text.match(/https?:\/\/[^\s]+/);
  return match ? match[0] : null;
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
  const [feedData, setFeedData] = useState<FeedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
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

  // Optical Zoom states for image lightbox
  const [zoomPhotoUrl, setZoomPhotoUrl] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  // New states for Sidebar, three-dot menu, and search filtering
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Splash Screen and Welcome Dialog states
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
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
    return (localStorage.getItem('dewa_theme_mode') as any) || 'dark';
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

      // Videos
      const hasVideo = !!postEl.querySelector('.tgme_widget_message_video, .tgme_widget_message_video_player, video');
      let videoUrl = '';
      let videoThumbUrl = '';
      const videoEl = postEl.querySelector('.tgme_widget_message_video, video');
      if (videoEl) {
        videoUrl = videoEl.getAttribute('src') || '';
      }
      const videoPlayer = postEl.querySelector('.tgme_widget_message_video_player');
      if (videoPlayer) {
        const style = videoPlayer.getAttribute('style') || '';
        const match = style.match(/background-image:\s*url\s*\(\s*['"]?([^'"]+)['"]?\s*\)/i);
        if (match && match[1]) {
          videoThumbUrl = match[1];
        }
      }

      // Audio / Voice notes
      const hasAudio = !!postEl.querySelector('.tgme_widget_message_voice, .tgme_widget_message_audio, .tgme_widget_message_audio_player, audio');
      let audioUrl = '';
      let audioTitle = 'غږیز فایل / پیغام';
      let audioDuration = '';
      const audioNode = postEl.querySelector('audio');
      if (audioNode) {
        audioUrl = audioNode.getAttribute('src') || '';
      }
      const voiceNameNode = postEl.querySelector('.tgme_widget_message_voice_name, .tgme_widget_message_audio_title, .tgme_widget_message_document_title');
      if (voiceNameNode) {
        audioTitle = voiceNameNode.textContent?.trim() || 'غږیز فایل';
      }
      const voiceDurationNode = postEl.querySelector('.tgme_widget_message_voice_duration, .tgme_widget_message_audio_duration, .tgme_widget_message_document_extra');
      if (voiceDurationNode) {
        audioDuration = voiceDurationNode.textContent?.trim() || '';
      }

      // Files Documents
      const hasFile = !!postEl.querySelector('.tgme_widget_message_document') && !hasAudio;
      let fileName = 'سند / فایل';
      let fileSize = '';
      if (hasFile) {
        fileName = postEl.querySelector('.tgme_widget_message_document_title')?.textContent?.trim() || 'سند / فایل';
        fileSize = postEl.querySelector('.tgme_widget_message_document_extra')?.textContent?.trim() || '';
      }

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
          hasFile,
          fileName,
          fileSize,
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

      setFeedData(data);
      console.log('[Dewa Feed] Data loaded successfully from remote API.');
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

      // Try fetching older posts client-side for richer initial feed
      try {
        const postIdsNumeric = parsedData.posts.map(p => parseInt(p.id)).filter(id => !isNaN(id));
        if (postIdsNumeric.length > 0) {
          const minPostId1 = Math.min(...postIdsNumeric);
          const directUrl2 = `https://t.me/s/${targetChannelName}?before=${minPostId1}`;
          
          const response2 = await dewaFetch(directUrl2, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
            }
          });
          if (response2.ok) {
            const htmlText2 = await response2.text();
            const parsedData2 = parseClientTelegramHtml(htmlText2, targetChannelName);
            if (parsedData2 && parsedData2.posts.length > 0) {
              const uniqueIds = new Set(parsedData.posts.map(p => p.id));
              const filteredNew2 = parsedData2.posts.filter(p => !uniqueIds.has(p.id));
              parsedData.posts.push(...filteredNew2);

              // Try page 3 client-side
              const postIdsNumeric2 = parsedData2.posts.map(p => parseInt(p.id)).filter(id => !isNaN(id));
              if (postIdsNumeric2.length > 0) {
                const minPostId2 = Math.min(...postIdsNumeric2);
                const directUrl3 = `https://t.me/s/${targetChannelName}?before=${minPostId2}`;
                
                const response3 = await dewaFetch(directUrl3, {
                  headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
                  }
                });
                if (response3.ok) {
                  const htmlText3 = await response3.text();
                  const parsedData3 = parseClientTelegramHtml(htmlText3, targetChannelName);
                  if (parsedData3 && parsedData3.posts.length > 0) {
                    const uniqueIds2 = new Set(parsedData.posts.map(p => p.id));
                    const filteredNew3 = parsedData3.posts.filter(p => !uniqueIds2.has(p.id));
                    parsedData.posts.push(...filteredNew3);
                  }
                }
              }
            }
          }
        }
      } catch (colErr) {
        console.warn('[Dewa Feed] Direct client fallback paging failed but primary loaded ok', colErr);
      }

      // Sort posts latest first
      parsedData.posts.sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));

      setFeedData(parsedData);
      console.log('[Dewa Feed] Direct HTML scrape succeeded & formatted successfully on-client!');
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

      setErrorMsg('د خپرونو د راکښته کولو پروسه له ستونزو سره مخ شوه.');
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

  // Native back button listener integrated beautifully with routing and modals
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
        } else if (isSidebarOpen) {
          setIsSidebarOpen(false);
        } else if (selectedPost) {
          setSelectedPost(null);
        } else if (isFullFeedOpen) {
          setIsFullFeedOpen(false);
        } else if (isSearchOpen) {
          setIsSearchOpen(false);
          setSearchQuery('');
        } else {
          CapApp.exitApp();
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
  }, [zoomPhotoUrl, activeModal, isSettingsPageOpen, isSidebarOpen, selectedPost, isFullFeedOpen, isSearchOpen]);

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

  // Slider featured posts (10 posts containing images)
  const featuredPosts = allPosts.filter(p => !!p.photoUrl || p.hasVideo).slice(0, 10);

  // Home Page compact items (exactly 30 posts max)
  const homePosts = allPosts.slice(0, 30);

  // Full Feed Posts array (all posts loaded and none left out!)
  const fullFeedPosts = allPosts;

  // Next/prev for slider
  const nextFeatured = () => {
    if (featuredPosts.length === 0) return;
    setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevFeatured = () => {
    if (featuredPosts.length === 0) return;
    setFeaturedIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
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
    title: textSizeClass === 'sm' ? 'text-xs' : textSizeClass === 'base' ? 'text-sm' : textSizeClass === 'lg' ? 'text-base' : 'text-lg',
    body: textSizeClass === 'sm' ? 'text-[11.5px]' : textSizeClass === 'base' ? 'text-[12.5px] sm:text-[13px]' : textSizeClass === 'lg' ? 'text-[14px] sm:text-[14.5px]' : 'text-[16px] sm:text-[17px]',
    desc: textSizeClass === 'sm' ? 'text-[10px]' : textSizeClass === 'base' ? 'text-[11px]' : textSizeClass === 'lg' ? 'text-[12px]' : 'text-[13.5px]'
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
            className="p-2 bg-slate-800 hover:bg-slate-755 rounded-xl text-slate-200 hover:text-white transition active:scale-95 shrink-0"
            title="تبصره او مینو"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="min-w-0 text-right">
            <h1 className="text-sm sm:text-base font-bold text-white truncate leading-tight">
              {selectedPost ? 'د پوسټ لوستل' : isSettingsPageOpen ? 'د اپلیکیشن تنظیمات' : isSearchOpen ? 'په پوسټونو کې پلټنه' : isFullFeedOpen ? 'ټول آرشیف پوسټونه' : (feedData?.channelInfo?.title || 'د مینې ډېوه')}
            </h1>
          </div>
        </div>

        {/* Left side: Back navigation actions and the Action popup */}
        <div className="flex items-center gap-2 relative">
          {(selectedPost || isSettingsPageOpen || isFullFeedOpen || isSearchOpen) && (
            <button
              onClick={() => {
                setSelectedPost(null);
                setIsSettingsPageOpen(false);
                setIsFullFeedOpen(false);
                setIsSearchOpen(false);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer' }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 rounded-lg text-xs font-bold text-white transition flex items-center gap-1.5 shrink-0"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>کورپاڼه</span>
            </button>
          )}

          {/* Three-Dot Action Trigger */}
          <button
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            style={{ cursor: 'pointer' }}
            className={`p-2 rounded-xl transition duration-200 ${
              isPopupOpen ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
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
                
                {/* 1. د چینل عکس او نوم */}
                <div className={`flex flex-col items-center text-center ${subCardBg} rounded-2xl p-4 border`}>
                  {/* د چینل عکس */}
                  <img
                    src={feedData?.channelInfo?.avatarUrl || 'https://telegram.org/img/t_logo.png'}
                    referrerPolicy="no-referrer"
                    className={`w-16 h-16 rounded-full border ${tc.border}/20 object-cover shadow-lg`}
                    alt="Channel avatar"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://telegram.org/img/t_logo.png';
                    }}
                  />
                  {/* د چینل نوم */}
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'} mt-3 leading-tight font-sans`}>
                    {feedData?.channelInfo?.title || 'د مینې ډېوه'}
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
                      setActiveModal('about');
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
                      setContactSuccess(false);
                      setActiveModal('contact');
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

                  {/* ۶. نوي اپلیکیشنونه */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setActiveModal('apps');
                    }}
                    style={{ cursor: 'pointer' }}
                    className={`w-full text-right px-4 py-2.5 ${subCardBg} ${isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-200 text-slate-800'} rounded-xl text-xs font-semibold transition border flex items-center justify-start gap-2`}
                  >
                    <Grid className={`w-4 h-4 ${tc.text}`} />
                    <span>نوي اپلیکیشنونه</span>
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
          <div className="py-24 text-center flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-sm text-slate-400 font-medium">پوسټونه بار کیږي...</p>
          </div>
        ) : errorMsg ? (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-center text-slate-300 space-y-4 text-right flex flex-col items-center">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <div className="text-center w-full">
              <h3 className="text-sm font-bold text-white">اتصال ټینګ نه شو</h3>
              <p className="text-xs text-slate-400 mt-1">مهرباني وکړئ خپله انټرنیټي شبکه وګورئ او بیا هڅه وکړئ.</p>
            </div>
            
            <button
              onClick={fetchChannelData}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition shadow-lg shadow-rose-600/20"
            >
              کښته کول او بیا نښلول
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
          <article className="bg-slate-900 border border-slate-800/85 rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-fade-in">
            {/* Header / Back action */}
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-850 flex items-center justify-between">
              <button
                onClick={() => setSelectedPost(null)}
                style={{ cursor: 'pointer' }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>شاته کورپاڼې ته</span>
              </button>
              <span className="text-[10px] font-mono text-slate-500 font-semibold">پوسټ #{selectedPost.id}</span>
            </div>

            {/* Media on Top (عکس یا ویډیو وي) */}
            {selectedPost.hasVideo && selectedPost.videoUrl ? (
              <div className="relative bg-black flex flex-col items-center border-b border-slate-850 w-full p-1">
                <video
                  src={selectedPost.videoUrl || null}
                  controls
                  preload="metadata"
                  poster={(selectedPost.videoThumbUrl || selectedPost.photoUrl) || null}
                  className="w-full max-h-[380px] object-contain rounded-lg"
                />
              </div>
            ) : (selectedPost.photoUrls && selectedPost.photoUrls.length > 1) ? (
              <div className="relative bg-slate-950 border-b border-slate-850 p-4">
                <div className={`grid gap-2.5 ${
                  selectedPost.photoUrls.length === 2 ? 'grid-cols-2' : 
                  selectedPost.photoUrls.length === 3 ? 'grid-cols-3' : 
                  'grid-cols-2 sm:grid-cols-3'
                }`}>
                  {selectedPost.photoUrls.map((url, idx) => (
                    <div key={idx} className="relative group overflow-hidden rounded-xl aspect-square bg-slate-900 border border-slate-800/40">
                      <img
                        src={url}
                        referrerPolicy="no-referrer"
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition duration-300"
                        onClick={() => {
                          setZoomPhotoUrl(url);
                          setZoomScale(1);
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
                <div className="text-[10px] text-slate-400 mt-2.5 text-center select-none font-sans">
                  د زوم کولو لپاره په هر عکس کلیک وکړئ • ټول {selectedPost.photoUrls.length} انځورونه
                </div>
              </div>
            ) : selectedPost.photoUrl ? (
              <div className="relative bg-slate-950 flex flex-col items-center border-b border-slate-850">
                <img
                  src={selectedPost.photoUrl || null}
                  referrerPolicy="no-referrer"
                  alt="Reading visual"
                  className="w-full max-h-[380px] object-contain cursor-zoom-in hover:opacity-90 transition duration-200"
                  onClick={() => {
                    setZoomPhotoUrl(selectedPost.photoUrl!);
                    setZoomScale(1);
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
                  className="text-slate-200 text-[14.5px] leading-relaxed space-y-2.5 font-sans break-words telegram-styles text-right"
                  dangerouslySetInnerHTML={{ __html: selectedPost.htmlText }}
                />
              ) : (
                <p className="text-slate-200 text-[14.5px] leading-relaxed font-sans break-words whitespace-pre-wrap text-right">
                  {selectedPost.text}
                </p>
              )}

              {/* Audio player in detailed post view (if any) */}
              {selectedPost.hasAudio && selectedPost.audioUrl && (
                <BeautifulAudioPlayer url={selectedPost.audioUrl} title={selectedPost.audioTitle || 'غږیز فایل خپرونه'} duration={selectedPost.audioDuration} isDark={isDark} tc={tc} />
              )}

              {/* Link Preview (if any) */}
              {selectedPost.linkPreview ? (
                <a
                  href={selectedPost.linkPreview.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 transition hover:bg-slate-950/90"
                >
                  <div className="flex gap-3 min-w-0">
                    {selectedPost.linkPreview.photoUrl && (
                      <img
                        src={selectedPost.linkPreview.photoUrl || null}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded bg-slate-900 object-cover shrink-0 border border-slate-850"
                        alt="Link preview"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      {selectedPost.linkPreview.siteName && (
                        <span className="text-[10px] text-indigo-400 font-mono uppercase font-bold tracking-wider">
                          {selectedPost.linkPreview.siteName}
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-white truncate mt-0.5">
                        {selectedPost.linkPreview.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
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
                <div className="flex flex-col sm:flex-row gap-2.5 pt-3.5 border-t border-slate-800/40 justify-start">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedPost.text || '');
                      alert('لیست او متن په بریالیتوب سره کاپي شو!');
                    }}
                    style={{ cursor: 'pointer' }}
                    className="flex-1 py-3 px-4 bg-slate-950/70 hover:bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 transition active:scale-95 flex items-center justify-center gap-2 shadow-xs group"
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
                        navigator.clipboard.writeText(`${selectedPost.text || ''}\n\nدا پيغام د ښکلو کيسو او شعرونو د اپليکيشن څخه شريک شو.`);
                        alert('ستاسو سیسټم د مستقیم شریکولو ملاتړ نه کوي؛ پیغام کاپي شو چې په بل ځای کې یې پیسټ کړئ!');
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

              {/* Dynamic Telegram Reactions Block (ايموجي ريکشن شمير د ټلیګرام په شان) */}
              {selectedPost.reactions && selectedPost.reactions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-slate-800/60 justify-start">
                  {selectedPost.reactions.map((react, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-950/80 rounded-full border border-slate-800/40 text-xs text-slate-200 select-none"
                    >
                      <span className="text-sm">{react.emoji}</span>
                      <span className="font-mono text-[9px] text-slate-400 font-bold">{react.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer metadata counter */}
            <div className="px-5 py-3.5 bg-slate-950/40 border-t border-slate-950 text-xs text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>{selectedPost.views || '0'} كتنې</span>
              </span>
              <span className="text-[11.5px] font-sans text-slate-300 font-semibold">
                {selectedPost.authorName ? `خپرونکی: ${selectedPost.authorName}` : 'د مینې ډېوه خپرونه'}
              </span>
            </div>
          </article>
        ) : isSettingsPageOpen ? (
          /* ==========================================================
             E. SETTINGS SCREEN (د ترتیباتو او تنظیماتو بېله صفحه)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right">
            <div className={`p-5 sm:p-6 rounded-3xl ${cardBg} border border-slate-800/10 dark:border-slate-800 overflow-hidden shadow-xl text-right`}>
              <div className="px-5 py-4 bg-slate-950/70 border-b border-slate-800/20 flex items-center justify-between rounded-t-3xl -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5">
                <button
                  onClick={() => setIsSettingsPageOpen(false)}
                  style={{ cursor: 'pointer' }}
                  className={`px-3 py-1.5 rounded-lg transition text-xs font-bold ${isDark ? 'text-slate-400 bg-slate-800 hover:text-white' : 'text-slate-700 bg-slate-105 hover:bg-slate-200'} flex items-center gap-1 shrink-0`}
                  title="تړل"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>د ترتیباتو وتل</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
                    د اپلیکیشن تنظیمات (مستقیم ترتیبات)
                  </span>
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
                          {sz === 'xl' && 'بزرګ'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. APP LANGUAGE */}
                <div className="space-y-2.5 border-t border-slate-500/10 pt-4">
                  <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                    <Globe className={`w-3.5 h-3.5 ${tc.text}`} />
                    <span>{tr.language}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setAppLanguage('ps')}
                      style={{ cursor: 'pointer' }}
                      className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold transition ${
                        appLanguage === 'ps'
                          ? `${tc.bg} ${tc.border} text-white shadow-md`
                          : `${isDark ? 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-205 text-slate-700 hover:bg-slate-150'}`
                      }`}
                    >
                      <span>پښتو (Pashto)</span>
                    </button>
                    <button
                      onClick={() => setAppLanguage('en')}
                      style={{ cursor: 'pointer' }}
                      className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold transition ${
                        appLanguage === 'en'
                          ? `${tc.bg} ${tc.border} text-white shadow-md`
                          : `${isDark ? 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-205 text-slate-700 hover:bg-slate-150'}`
                      }`}
                    >
                      <span>English</span>
                    </button>
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
                <div className="space-y-2 border-t border-slate-500/10 pt-4">
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
                        alert('د سرور نوی پیوستون آدرس خوندي شو؛ له دې سرور څخه به پروسیس کې اخیستل کیږي.');
                      }}
                      style={{ cursor: 'pointer' }}
                      className={`${tc.bg} ${tc.hoverBg} active:scale-95 text-white rounded-xl px-4 text-xs font-bold transition shrink-0`}
                    >
                      {tr.pari}
                    </button>
                  </div>
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
                        if (window.confirm('ایا د سټوریج او فابریکې ترتیباتو د بیرته نصبولو اراده لرئ؟ (تایید کړئ)')) {
                          localStorage.clear();
                          alert(tr.clearCacheSuccess);
                          window.location.reload();
                        }
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
                  ټول تنظیمات خوندي کړئ او وتلئ
                </button>
              </div>
            </div>
          </div>
        ) : isSearchOpen ? (
          /* ==========================================================
             D. SEARCH PAGE (د پلټنې بېله او ځانګړې صفحه)
             ========================================================== */
          <div className="space-y-5 animate-fade-in text-right">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 shadow-xl">
              <span className="text-xs font-bold text-slate-350">په ټولو پوسټونو کې موضوع یا کلیمه وپلټئ:</span>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="دلته د پوسټونو موضوع یا کلمه وپلټئ..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-3 pr-10 pl-4 text-xs font-medium text-slate-100 outline-none transition duration-200 text-right font-sans"
                  autoFocus
                />
                <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ cursor: 'pointer' }}
                    className="absolute left-3 top-2.5 text-[10px] bg-slate-800 hover:bg-slate-755 font-bold px-2.5 py-1 rounded text-slate-300 transition"
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
                    className="bg-slate-900/95 hover:bg-slate-850/90 p-4 rounded-xl flex items-center gap-4 transition group active:scale-[0.99] select-none text-right shadow-sm border border-slate-800/20"
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
                        <span className="bg-slate-950 px-2 py-0.5 rounded text-[9.5px] font-mono text-indigo-400 font-bold">#{post.id}</span>
                        <span>{post.timeLabel || 'وروستی'}</span>
                      </div>
                      <p className="text-[13.5px] text-slate-205 line-clamp-2 leading-relaxed font-sans pr-1 font-medium mt-0.5">
                        {post.text || 'د انځور د خلاصولو او لوستلو لپاره دلته کلیک وکړئ...'}
                      </p>
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
                      {post.hasAudio && post.audioUrl && (
                        <div className="mt-2.5">
                          <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
                        </div>
                      )}
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
              <section className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 shadow-md flex flex-col gap-2.5">
                {/* Main Slider Screen */}
                <div 
                  onClick={() => setSelectedPost(featuredPosts[featuredIndex])}
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
                  ) : (
                    <div className="w-full h-full bg-slate-950/90 flex items-center justify-center text-indigo-400">
                      <Video className="w-12 h-12" />
                    </div>
                  )}
                  {/* Subtle Indicator Badge */}
                  <div className="absolute top-3 right-3 bg-indigo-600 text-white font-mono font-black text-xs px-3 py-1 rounded-xl shadow-md select-none">
                    {featuredIndex + 1}
                  </div>
                  
                  {featuredPosts[featuredIndex].hasVideo && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/35 pointer-events-none">
                      <PlayCircle className="w-10 h-10 text-indigo-400 drop-shadow" />
                    </span>
                  )}
                </div>

                {/* Title outline */}
                <p className="text-xs text-slate-200 mt-0.5 truncate font-medium text-right leading-relaxed px-1">
                  {featuredPosts[featuredIndex].text || 'د لوستلو لپاره کلیک کړئ...'}
                </p>

                {/* Dot slider indicator */}
                <div className="flex justify-center items-center gap-1.5 mt-0.5">
                  {featuredPosts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFeaturedIndex(idx)}
                      style={{ cursor: 'pointer' }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === featuredIndex ? 'w-4.5 bg-indigo-500' : 'w-1.5 bg-slate-700 hover:bg-slate-650'
                      }`}
                      title={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </section>
            )}

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
                                <p className={`${fs.body} ${isDark ? 'text-slate-200' : 'text-slate-800'} line-clamp-2 leading-relaxed font-sans pr-1 font-medium select-none`}>
                                  {post.text || 'د تفصیل خپرولو د لوستلو لپاره دلته کلیک وکړئ...'}
                                </p>

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

                                {post.hasAudio && post.audioUrl && (
                                  <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
                                <p className={`mt-1 text-[11.5px] sm:text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'} line-clamp-2 leading-relaxed`}>
                                  {post.text || 'لوستل پيلیږي...'}
                                </p>
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
                                {post.hasAudio && post.audioUrl && (
                                  <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
                                {post.text || 'لوستل پيل کړئ...'}
                              </p>
                              <span className="text-[9px] text-slate-500 flex items-center gap-1.5 mt-0.5 font-sans">
                                {post.timeLabel || 'ثبت شوی'}
                              </span>
                              {post.hasAudio && post.audioUrl && (
                                <div className="mt-1.5 max-w-xs scale-95 origin-right">
                                  <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
                              <p className={`${fs.body} ${isDark ? 'text-slate-100' : 'text-slate-850'} leading-relaxed font-sans pr-1 font-medium`}>
                                {post.text}
                              </p>
                              {post.hasAudio && post.audioUrl && (
                                <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
                            <p className={`${fs.body} ${isDark ? 'text-slate-200' : 'text-slate-800'} leading-relaxed pr-1`}>
                              {post.text || 'د تېرو معلوماتو لوستل پيل کړئ...'}
                            </p>
                            {post.hasAudio && post.audioUrl && (
                              <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
          </div>
        ) : (
          /* ==========================================================
             B. DETAILED FULL LIST VIEW PAGE (بشپړ لیست پاڼه د ۱۰ باچ باچ لوډیدو سره)
             ========================================================== */
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-805 px-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-indigo-500 rounded-full animate-bounce"></span>
                <h3 className="text-sm font-bold text-white">د آرشیف ټول پوسټونه (په تدریجي ډول لوډ کيدونکي)</h3>
              </div>
              <button
                onClick={() => {
                  setIsFullFeedOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
                className="text-xs text-indigo-400 font-bold hover:underline"
              >
                کورسفحه ⇽
              </button>
            </div>

             {/* Compact items list for full archive feed */}
            <div className="flex flex-col gap-2.5">
              {fullFeedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  style={{ cursor: 'pointer' }}
                  className="bg-slate-900/90 hover:bg-slate-850/90 p-4 rounded-xl flex items-center gap-4 transition group select-none text-right shadow-sm"
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
                        <span className="bg-slate-950 px-2 py-0.5 rounded text-[9.5px] font-mono text-indigo-400 font-bold">#{post.id}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          {post.timeLabel || 'Recent'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-xs text-slate-205 line-clamp-2 leading-relaxed font-sans pr-1">
                        {post.text || 'د انځور د خلاصولو او لوستلو لپاره دلته کلیک وکړئ...'}
                      </p>

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

                      {post.hasAudio && post.audioUrl && (
                        <BeautifulAudioPlayer url={post.audioUrl} title={post.audioTitle || 'غږیز فایل خپرونه'} duration={post.audioDuration} isDark={isDark} tc={tc} />
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
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 text-center select-none">
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
                className="w-24 h-24 rounded-full bg-slate-900 object-cover shadow-inner"
                alt="Channel logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://telegram.org/img/t_logo.png';
                }}
              />
            </motion.div>
            
            {/* Channel title & metadata */}
            <div className="space-y-2">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-black text-white tracking-wide"
              >
                {feedData?.channelInfo?.title || 'دا مینه دیوه'}
              </motion.h2>
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-indigo-400 font-mono"
              >
                @{feedData?.channelInfo?.username || 'da_mine_dewa'}
              </motion.p>
            </div>

            {/* Timed progress loader */}
            <div className="w-4/5 bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800 relative mt-4">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-75 ease-out" 
                style={{ width: `${splashProgress}%` }}
              />
            </div>
            
            <span className="text-[10px] text-slate-500 font-mono tracking-wider">
              صبر وکړئ، معلومات لوډیږي... {Math.round(splashProgress)}%
            </span>
          </div>
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
                <div className="px-5 py-4 bg-slate-950/70 border-b border-slate-800/10 dark:border-slate-800/60 flex items-center justify-between">
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
                                {sz === 'xl' && 'بزرګ'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 5. APP LANGUAGE */}
                      <div className="space-y-2 border-t border-slate-500/10 pt-3">
                        <label className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold flex items-center justify-start gap-1 px-1`}>
                          <Globe className={`w-3.5 h-3.5 ${tc.text}`} />
                          <span>{tr.language}</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setAppLanguage('ps')}
                            style={{ cursor: 'pointer' }}
                            className={`py-2 px-3 rounded-xl border text-[11px] font-bold transition ${
                              appLanguage === 'ps'
                                ? `${tc.bg} ${tc.border} text-white shadow-md`
                                : `${isDark ? 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-205 text-slate-700 hover:bg-slate-150'}`
                            }`}
                          >
                            <span>پښتو (Pashto)</span>
                          </button>
                          <button
                            onClick={() => setAppLanguage('en')}
                            style={{ cursor: 'pointer' }}
                            className={`py-2 px-3 rounded-xl border text-[11px] font-bold transition ${
                              appLanguage === 'en'
                                ? `${tc.bg} ${tc.border} text-white shadow-md`
                                : `${isDark ? 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-205 text-slate-700 hover:bg-slate-150'}`
                            }`}
                          >
                            <span>English</span>
                          </button>
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
                              if (window.confirm('ایا د سټوریج او فابریکې ترتیباتو د بیرته نصبولو اراده لرئ؟ (تایید کړئ)')) {
                                localStorage.clear();
                                alert(tr.clearCacheSuccess);
                                window.location.reload();
                              }
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
                        {tr.close}
                      </button>
                    </div>
                  )}

                  {/* About Content */}
                  {activeModal === 'about' && (
                    <div className="space-y-3.5 text-right font-sans">
                      <div className="flex flex-col items-center text-center pb-2">
                        <img
                          src={feedData?.channelInfo?.avatarUrl || 'https://telegram.org/img/t_logo.png'}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-full border border-indigo-500/20 object-cover mb-2 shadow-sm"
                          alt="Channel avatar"
                        />
                        <h4 className="text-white text-xs font-black font-mono">da_mine_dewa</h4>
                      </div>
                      <p className="text-[11.5px] text-slate-350 leading-relaxed">
                        دا مینه دیوه رسمي علمي پاڼه یو د پوهې، پرمختګ او پښتو فکري ځلا خپرندویه سرچینه ده زمونږ هدف پښتو فکری او کلتوري روزنه ده.
                      </p>
                      <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-850 pt-3">
                        دلته تاسې د پورې اړوند ټول نوي پوسټونه بدون له ځنډه لیدلی شئ. دا پښتو د عالي ټیکنالوجۍ په ذریعه خپرېږي.
                      </p>
                      <button
                        onClick={() => setActiveModal(null)}
                        style={{ cursor: 'pointer' }}
                        className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-bold transition mt-2"
                      >
                        بند کړئ
                      </button>
                    </div>
                  )}

                  {/* Contact Us Messaging Content */}
                  {activeModal === 'contact' && (
                    <div className="space-y-3 text-right">
                      {contactSuccess ? (
                        <div className="text-center py-6 space-y-3">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                            <Check className="w-6 h-6 animate-pulse" />
                          </div>
                          <h4 className="text-xs font-bold text-white">پیغام واستول شو!</h4>
                          <p className="text-[10px] text-slate-400 leading-normal">
                            ملاتړ ټیم ته ورسېد. ډیر ژر به ځواب شي.
                          </p>
                          <button
                            onClick={() => {
                              setContactSuccess(false);
                              setContactName('');
                              setContactMsg('');
                              setActiveModal(null);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="px-6 py-2 bg-slate-800 hover:bg-slate-75 * text-slate-250 rounded-xl text-xs font-semibold transition"
                          >
                            مننه
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-[11px] text-slate-400">ستاسو د اړیکې او پوښتنو فورمه:</p>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-300 font-bold block">ستاسو نوم یا شمیره:</label>
                            <input
                              type="text"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="پردلته نوم ولیکئ..."
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 outline-none focus:border-indigo-500 text-right font-sans"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-300 font-bold block">موضوع یا د پیغام متن:</label>
                            <textarea
                              value={contactMsg}
                              onChange={(e) => setContactMsg(e.target.value)}
                              placeholder="خپل پیغام ولیکئ..."
                              rows={3}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 outline-none focus:border-indigo-500 text-right font-sans resize-none"
                            />
                          </div>

                          <button
                            onClick={() => {
                              if (!contactName.trim() || !contactMsg.trim()) {
                                return;
                              }
                              setContactSuccess(true);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold transition mt-2 flex items-center justify-center gap-2 shadow-lg"
                          >
                            <Send className="w-3.5 h-3.5 -rotate-12 animate-pulse" />
                            <span>پیغام مې واستوئ</span>
                          </button>
                        </div>
                      )}
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
                <div className="flex gap-2">
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
