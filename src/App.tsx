/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  
  // States for navigation flows
  const [selectedPost, setSelectedPost] = useState<TelegramPost | null>(null);
  const [isFullFeedOpen, setIsFullFeedOpen] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Pagination states for all posts list (starts with 10, loads 10 more)
  const [visibleFullCount, setVisibleFullCount] = useState(10);

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
  const [textSizeClass, setTextSizeClass] = useState<'sm' | 'base' | 'lg'>('base');

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
      const photoWrap = postEl.querySelector('.tgme_widget_message_photo_wrap');
      if (photoWrap) {
        const style = photoWrap.getAttribute('style') || '';
        const match = style.match(/background-image:\s*url\s*\(\s*['"]?([^'"]+)['"]?\s*\)/i);
        if (match && match[1]) {
          photoUrl = match[1];
        }
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
    const backendHost = 'https://ais-pre-xqyurqglakdlwei24mzfpf-765204071973.us-east1.run.app';
    const apiEndpoint = isMobileApp 
      ? `${backendHost}/api/telegram-feed?channel=${encodeURIComponent(targetChannelName)}`
      : `/api/telegram-feed?channel=${encodeURIComponent(targetChannelName)}`;

    let backendError: string | null = null;
    let directError: string | null = null;
    let usingFallback = false;

    // Method A: Query Backend Cloud Scraper API
    try {
      console.log(`[Dewa Feed] Attempting fetch via Backend API: ${apiEndpoint}`);
      
      const response = await fetch(apiEndpoint, {
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

      const response = await fetch(directUrl, {
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

  // Dynamic filtering of all posts by search string
  const allPosts = feedData?.posts ? feedData.posts.filter(p => {
    if (!p) return false;
    const matchesSearch = !searchQuery || (p.text && p.text.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  }) : [];

  // Slider featured posts (10 posts containing images)
  const featuredPosts = allPosts.filter(p => !!p.photoUrl || p.hasVideo).slice(0, 10);

  // Home Page compact items (using visibleFullCount for continuous loading directly on-screen)
  const homePosts = allPosts.slice(0, visibleFullCount);

  // Full Feed Posts array with dynamic load limits (10, 20, 30...)
  const fullFeedPosts = allPosts.slice(0, visibleFullCount);

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

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600/35 leading-normal">
      
      {/* 1. TOP TOOLBAR (د چینل بار خوندور او پرمختللی ډیزاین) */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 py-4 px-4 sm:px-6 flex items-center justify-between shadow-lg">
        {/* Right side: Sidebar Hamburger Menu and Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{ cursor: 'pointer' }}
            className="p-2 bg-slate-800 hover:bg-slate-750 rounded-xl text-slate-200 hover:text-white transition active:scale-95 shrink-0"
            title="تبصره او مینو"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="min-w-0 text-right">
            <h1 className="text-sm sm:text-base font-bold text-white truncate leading-tight">
              {selectedPost ? 'د پوسټ لوستل' : isSearchOpen ? 'په پوسټونو کې پلټنه' : isFullFeedOpen ? 'ټول آرشیف پوسټونه' : (feedData?.channelInfo?.title || 'د مینې ډېوه')}
            </h1>
          </div>
        </div>

        {/* Left side: Back navigation actions and the Action popup */}
        <div className="flex items-center gap-2 relative">
          {(selectedPost || isFullFeedOpen || isSearchOpen) && (
            <button
              onClick={() => {
                setSelectedPost(null);
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
              className="fixed right-0 top-0 bottom-0 w-72 sm:w-80 bg-slate-900 border-l border-slate-800/80 z-50 shadow-2xl flex flex-col justify-between text-right"
            >
              {/* Sidebar Header */}
              <div className="p-5 border-b border-slate-800/60 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 tracking-wide uppercase font-sans">د اپلیکیشن برخې</h3>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    style={{ cursor: 'pointer' }}
                    className="p-1.5 bg-slate-850 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
                    title="تړل"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sidebar Content (عکس ➔ نوم ➔ بټنې) */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 text-right">
                
                {/* 1. د چینل عکس او نوم */}
                <div className="flex flex-col items-center text-center bg-slate-950/60 rounded-2xl p-4 border border-slate-850/40">
                  {/* د چینل عکس */}
                  <img
                    src={feedData?.channelInfo?.avatarUrl || 'https://telegram.org/img/t_logo.png'}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full border border-indigo-500/20 object-cover shadow-lg"
                    alt="Channel avatar"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://telegram.org/img/t_logo.png';
                    }}
                  />
                  {/* د چینل نوم */}
                  <h4 className="text-sm font-bold text-white mt-3 leading-tight font-sans">
                    {feedData?.channelInfo?.title || 'د مینې ډېوه'}
                  </h4>
                </div>

                {/* د مینو بټنې */}
                <div className="flex flex-col gap-2 font-sans">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 px-1 text-right">مینو او کړنې</p>
                  
                  {/* ۱. تنظیمات */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setActiveModal('settings');
                    }}
                    style={{ cursor: 'pointer' }}
                    className="w-full text-right px-4 py-3 bg-slate-950/40 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition border border-slate-800/10 flex items-center justify-start gap-2"
                  >
                    <Settings className="w-4 h-4 text-indigo-400" />
                    <span>تنظیمات</span>
                  </button>

                  {/* ۲. پلټنه */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setIsSearchOpen(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                    className="w-full text-right px-4 py-3 bg-slate-950/40 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition border border-slate-800/10 flex items-center justify-start gap-2"
                  >
                    <Search className="w-4 h-4 text-indigo-400" />
                    <span>پلټنه</span>
                  </button>

                  {/* ۳. زمونږ په اړه */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setActiveModal('about');
                    }}
                    style={{ cursor: 'pointer' }}
                    className="w-full text-right px-4 py-3 bg-slate-950/40 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition border border-slate-800/10 flex items-center justify-start gap-2"
                  >
                    <Info className="w-4 h-4 text-indigo-400" />
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
                    className="w-full text-right px-4 py-3 bg-slate-950/40 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition border border-slate-800/10 flex items-center justify-start gap-2"
                  >
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>زمونږ سره اړیکه</span>
                  </button>

                  {/* ۵. د ټلیګرام چینل */}
                  <a
                    href={`https://t.me/${feedData?.channelInfo?.username || 'da_mine_dewa'}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ cursor: 'pointer' }}
                    className="w-full text-right px-4 py-3 bg-slate-950/40 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition border border-slate-800/10 flex items-center justify-start gap-2"
                  >
                    <Send className="w-4 h-4 text-indigo-400 -rotate-12" />
                    <span>د ټلیګرام چینل</span>
                  </a>

                  {/* ۶. نوي اپلیکیشنونه */}
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setActiveModal('apps');
                    }}
                    style={{ cursor: 'pointer' }}
                    className="w-full text-right px-4 py-2.5 bg-slate-950/40 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition border border-slate-800/10 flex items-center justify-start gap-2"
                  >
                    <Grid className="w-4 h-4 text-indigo-400" />
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
                  <div className="text-[10px] text-slate-400 bg-slate-950/70 py-1 px-2 rounded-lg backdrop-blur-xs select-none">
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

              {/* Link Preview (if any) */}
              {selectedPost.linkPreview && (
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
                    {post.photoUrl ? (
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
                <div className="flex flex-col gap-2.5">
                  {homePosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      style={{ cursor: 'pointer' }}
                      className="bg-slate-900/90 hover:bg-slate-850/90 p-4 rounded-xl flex items-center gap-4 transition group active:scale-[0.99] select-none text-right shadow-sm"
                    >
                      {/* Right: Enlarged thumbnail image with no white stroke */}
                      {post.photoUrl ? (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
                          <img
                            src={post.photoUrl || null}
                            referrerPolicy="no-referrer"
                            alt="thumb"
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
                            alt="thumb"
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
                      ) : (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950/60 flex items-center justify-center shrink-0 text-slate-500">
                          <BookOpen className="w-8 h-8 text-indigo-500/40" />
                        </div>
                      )}

                      {/* Left Area: text info & reactions display */}
                      <div className="flex-1 min-w-0 text-right flex flex-col justify-between py-0.5 h-full">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1.5 font-sans">
                            <span className="bg-slate-950 px-2 py-0.5 rounded text-[9.5px] font-mono text-indigo-400 font-bold">#{post.id}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {post.timeLabel || 'وروستی'}
                            </span>
                          </div>
                          <p className="text-[14px] sm:text-[15px] text-slate-200 line-clamp-2 leading-relaxed font-sans pr-1 font-medium select-none">
                            {post.text || 'د انځور د خلاصولو او لوستلو لپاره دلته کلیک وکړئ...'}
                          </p>
                        </div>

                        {/* Scraped Telegram Emojis Section */}
                        {post.reactions && post.reactions.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2.5 justify-start">
                            {post.reactions.slice(0, 4).map((react, rIdx) => (
                              <span
                                 key={rIdx}
                                 className="bg-slate-955/90 rounded-lg px-2 py-0.5 text-[10px] flex items-center gap-1 text-slate-350 border border-slate-800/20"
                              >
                                <span>{react.emoji}</span>
                                <span className="font-mono text-[9px] text-slate-400">{react.count}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BUTTON TO LOAD MORE ON HOME PAGE: "نور وګورئ" ONLY - LOADS 50 POSTS */}
            {feedData?.posts && visibleFullCount < 50 && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    setVisibleFullCount(50);
                  }}
                  style={{ cursor: 'pointer' }}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-550 active:scale-95 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 group"
                >
                  <ArrowDown className="w-4 h-4 text-white animate-bounce group-hover:translate-y-0.5 transition" />
                  <span>نور وګورئ</span>
                </button>
              </div>
            )}

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
                  {post.photoUrl ? (
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
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950/60 flex items-center justify-center shrink-0 text-slate-500">
                      <BookOpen className="w-8 h-8 text-indigo-500/40" />
                    </div>
                  )}

                  {/* Left: Snippet Text & Reactions */}
                  <div className="flex-1 min-w-0 text-right flex flex-col justify-between py-0.5 h-full">
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
                    </div>

                    {/* Scraped Telegram Emojis Section */}
                    {post.reactions && post.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2.5 justify-start">
                        {post.reactions.slice(0, 4).map((react, rIdx) => (
                          <span
                            key={rIdx}
                            className="bg-slate-955/90 rounded-lg px-2 py-0.5 text-[10px] flex items-center gap-1 text-slate-350 border border-slate-800/20"
                          >
                            <span>{react.emoji}</span>
                            <span className="font-mono text-[9px] text-slate-400">{react.count}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION: LOAD 10 MORE IN BATCHES (لس لس رارسیږي) */}
            {feedData?.posts && visibleFullCount < feedData.posts.length && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => setVisibleFullCount((prev) => prev + 10)}
                  style={{ cursor: 'pointer' }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-850/80 border border-slate-800 active:scale-95 text-indigo-400 hover:text-indigo-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-405" />
                  <span>لس نور پوسټونه کښته کړئ (نور وګورئ)</span>
                </button>
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
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
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
                className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-right"
              >
                {/* Header title block */}
                <div className="px-5 py-4 bg-slate-950 border-b border-slate-850 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModal(null)}
                    style={{ cursor: 'pointer' }}
                    className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                    title="تړل"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-white">
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
                    <div className="space-y-4 text-right">
                      <p className="text-[11px] text-slate-400">ستاسو معلوماتو ته غاړه ایښودلو لپاره د کینوس کچه ټاکل:</p>
                      
                      <div className="space-y-2">
                        <label className="text-[10.5px] text-slate-300 font-bold block">د متن اندازه (بدلول):</label>
                        <div className="grid grid-cols-3 gap-2 col-span-3">
                          {(['sm', 'base', 'lg'] as const).map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setTextSizeClass(sz)}
                              style={{ cursor: 'pointer' }}
                              className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                                textSizeClass === sz
                                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                                  : 'bg-slate-950/60 border-slate-850 text-slate-300 hover:bg-slate-800'
                              }`}
                            >
                              {textSizeClass === sz && <Check className="w-3 h-3 text-white" />}
                              <span>
                                {sz === 'sm' && 'وړوکي'}
                                {sz === 'base' && 'منځنی'}
                                {sz === 'lg' && 'لوی'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 space-y-1.5 text-right mt-1 font-sans">
                        <p className="text-[9.5px] text-slate-500">نورې موندنې:</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-300">
                          <span className="text-[10px] bg-slate-850 px-2 py-0.5 rounded text-indigo-400 font-mono">آنلاین (آرشیف)</span>
                          <span>د معلوماتو سرچینه:</span>
                        </div>
                        <div className="flex items-center justify-between text-[11.5px] text-slate-350 mt-1">
                          <span className="text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-400 font-mono">فعال (پایداره)</span>
                          <span>د اپلیکیشن حالت:</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveModal(null)}
                        style={{ cursor: 'pointer' }}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold transition mt-2"
                      >
                        بند کړئ
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
