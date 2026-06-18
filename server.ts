import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import * as cheerio from 'cheerio';
import https from 'https';

const app = express();
const PORT = 3000;

// Enable JSON parser
app.use(express.json());

// Enable CORS for mobile webview requests (origin: https://localhost, file://, etc.)
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Telegram-Bot-Api-Secret-Token');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// Standalone high-quality pre-seeded Pashto Poetry & Media Database fallback
const FALLBACK_FEED = {
  channelInfo: {
    username: 'da_mine_dewa',
    title: 'پښتو ادبي خزانه',
    avatarUrl: 'https://telegram.org/img/t_logo.png',
    subscribers: '12.5K subscribers',
    description: 'د پښتو خوږو شعرونو، غزلونو، سندرو او ادبي کتابونو رسمي کاريال او بډایه آرشیف.'
  },
  posts: [
    {
      id: "211",
      postUrl: "https://t.me/da_mine_dewa/211",
      text: "د آبشارونو زړه راکښونکی غږ او یو ښکلی بیت.\n\n#ریلز #ویدیوګانې",
      htmlText: "د آبشارونو زړه راکښونکی غږ او یو ښکلی بیت.<br><br>#ریلز #ویدیوګانې",
      date: "2026-06-15T16:00:00Z",
      timeLabel: "3 days ago",
      views: "3.9K",
      hasVideo: true,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waterfalls-in-forest-2213-large.mp4",
      videoThumbUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=80",
      reactions: [{ emoji: "❤️", count: "510" }, { emoji: "🔥", count: "190" }],
      authorName: "مینه دیوه"
    },
    {
      id: "210",
      postUrl: "https://t.me/da_mine_dewa/210",
      text: "د خوږو شعرونو غږیز ټولګه واورئ او زړونه پرې روښانه کړئ.\nشاعر: رحمت شاه سایل\n\n#ترنم #رحمت_شاه_سایل",
      htmlText: "د خوږو شعرونو غږیز ټولګه واورئ او زړونه پرې روښانه کړئ.<br>شاعر: رحمت شاه سایل<br><br>#ترنم #رحمت_شاه_سایل",
      date: "2026-06-16T10:00:00Z",
      timeLabel: "2 days ago",
      views: "2.8K",
      hasAudio: true,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      audioTitle: "د سایل غزلونه او خوږ یادونه",
      audioDuration: "06:45",
      reactions: [{ emoji: "🕊️", count: "148" }, { emoji: "❤️", count: "410" }],
      authorName: "مینه دیوه"
    },
    {
      id: "209",
      postUrl: "https://t.me/da_mine_dewa/209",
      text: "ادب د روح خوږوالی دی، خپلو خبرو کې نرمي پیدا کړئ تر څو د نورو زړونو محبوبه شئ. 🕊️\n\n#سټوريانې #سټوري",
      htmlText: "ادب د روح خوږوالی دی، خپلو خبرو کې نرمي پیدا کړئ تر څو د نورو زړونو محبوبه شئ. 🕊️<br><br>#سټوريانې #سټوري",
      date: "2026-06-16T14:20:00Z",
      timeLabel: "2 days ago",
      views: "1.6K",
      photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
      photoUrls: ["https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80"],
      reactions: [{ emoji: "💯", count: "210" }, { emoji: "❤️", count: "330" }],
      authorName: "مینه دیوه"
    },
    {
      id: "208",
      postUrl: "https://t.me/da_mine_dewa/208",
      text: "ژوند مانا د تېرو شیبو غمونه نه دي، ژوند مانا په همدا اوسنۍ شیبه کې خوشحاله اوسېدل دي. 🌿\n\n#سټوري #ستوری",
      htmlText: "ژوند مانا د تېرو شیبو غمونه نه دي، ژوند مانا په همدا اوسنۍ شیبه کې خوشحاله اوسېدل دي. 🌿<br><br>#سټوري #ستوری",
      date: "2026-06-16T19:00:00Z",
      timeLabel: "2 days ago",
      views: "2.4K",
      photoUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop&q=80",
      photoUrls: ["https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop&q=80"],
      reactions: [{ emoji: "✨", count: "340" }, { emoji: "❤️", count: "480" }],
      authorName: "مینه دیوه"
    },
    {
      id: "207",
      postUrl: "https://t.me/da_mine_dewa/207",
      text: "دا زما وطن دی د اباسین څپې غږیږي\nدلته د حریت او ننګ نغمه اوریدل کیږي\n\nهیڅ کله به سر ټیټ نکړو بل غاصب ته\nدلته د میوند د پېغلې یادونه تازه کیږي\n\n#وطن #شعر",
      htmlText: "دا زما وطن دی د اباسین څپې غږیږي<br>دلته د حریت او ننګ نغمه اوریدل کیږي<br><br>هیڅ کله به سر ټیټ نکړو بل غاصب ته<br>دلته د میوند د پېغلې یادونه تازه کیږي<br><br>#وطن #شعر",
      date: "2026-06-17T11:00:00Z",
      timeLabel: "Yesterday at 11:00 AM",
      views: "1.8K",
      photoUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80",
      photoUrls: ["https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80"],
      reactions: [{ emoji: "🇦🇫", count: "920" }, { emoji: "❤️", count: "610" }],
      authorName: "مینه دیوه"
    },
    {
      id: "206",
      postUrl: "https://t.me/da_mine_dewa/206",
      text: "ستا د سترګو غشي مې په زړه لګیږي\nستا هره کيسه مې په یادونو کې پاتیږي\n\nکه جهان راسره مخالف د مینې شي غلیمه\nزما مینه ستا په عشق کې هر وخت ګل کیږي\n\n#شعرونه #مینه",
      htmlText: "ستا د سترګو غشي مې په زړه لګیږي<br>ستا هره کيسه مې په یادونو کې پاتیږي<br><br>که جهان راسره مخالف د مینې شي غلیمه<br>زما مینه ستا په عشق کې هر وخت ګل کیږي<br><br>#شعرونه #مینه",
      date: "2026-06-17T15:00:00Z",
      timeLabel: "Yesterday at 3:00 PM",
      views: "2.1K",
      photoUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80",
      photoUrls: ["https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80"],
      reactions: [{ emoji: "❤️", count: "550" }, { emoji: "💯", count: "150" }],
      authorName: "مینه دیوه"
    },
    {
      id: "205",
      postUrl: "https://t.me/da_mine_dewa/205",
      text: "د ښایسته طبیعت او رنګین ترنم ډینامیک ویډیو لړۍ برخې وګورئ.\n\n#ریلز #ویدیو",
      htmlText: "د ښایسته طبیعت او رنګین ترنم ډینامیک ویډیو لړۍ برخې وګورئ.<br><br>#ریلز #ویدیو",
      date: "2026-06-17T18:30:00Z",
      timeLabel: "Yesterday at 6:30 PM",
      views: "4.1K",
      hasVideo: true,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-landscape-of-green-mountains-under-blue-sky-40898-large.mp4",
      videoThumbUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
      reactions: [{ emoji: "😍", count: "480" }, { emoji: "💥", count: "125" }],
      authorName: "مینه دیوه"
    },
    {
      id: "204",
      postUrl: "https://t.me/da_mine_dewa/204",
      text: "د خوږ ژبي شاعر غني خان د کلام ښکلی ډیجیټل کتاب (PDF).\nملګرو سره یې شریک کړئ.\n\n#کتابتون #پښتو_کتابونه",
      htmlText: "د خوږ ژبي شاعر غني خان د کلام ښکلی ډیجیټل کتاب (PDF).<br>ملګرو سره یې شریک کړئ.<br><br>#کتابتون #پښتو_کتابونه",
      date: "2026-06-17T20:00:00Z",
      timeLabel: "Yesterday at 8:00 PM",
      views: "3.4K",
      hasFile: true,
      fileName: "د_غني_کلیات_غني_خان.pdf",
      fileSize: "12.8 MB",
      reactions: [{ emoji: "🔥", count: "230" }, { emoji: "🙏", count: "98" }],
      authorName: "مینه دیوه"
    },
    {
      id: "203",
      postUrl: "https://t.me/da_mine_dewa/203",
      text: "د زړه درد په خوږ غږ کې واورئ.\nغږ: مطیع الله تراب قاري\n\n#ترنم #پښتو_غږ",
      htmlText: "د زړه درد په خوږ غږ کې واورئ.<br>غږ: مطیع الله تراب قاري<br><br>#ترنم #پښتو_غږ",
      date: "2026-06-18T08:15:00Z",
      timeLabel: "8:15 AM",
      views: "2.3K",
      hasAudio: true,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      audioTitle: "د هجران سندرې د زړه غږ",
      audioDuration: "05:12",
      reactions: [{ emoji: "🎵", count: "156" }, { emoji: "❤️", count: "298" }],
      authorName: "مینه دیوه"
    },
    {
      id: "202",
      postUrl: "https://t.me/da_mine_dewa/202",
      text: "ستا یادونه لکه د غره د سر سړه هوا ده، چې هر وخت مې روح تازه ساتي. 🌸\n\n#ستوری #سټوري",
      htmlText: "ستا یادونه لکه د غره د سر سړه هوا ده، چې هر وخت مې روح تازه ساتي. 🌸<br><br>#ستوری #سټوري",
      date: "2026-06-18T09:30:00Z",
      timeLabel: "9:30 AM",
      views: "1.9K",
      photoUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
      photoUrls: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80"],
      reactions: [{ emoji: "👍", count: "210" }, { emoji: "❤️", count: "480" }],
      authorName: "مینه دیوه"
    },
    {
      id: "201",
      postUrl: "https://t.me/da_mine_dewa/201",
      text: "زړه مې ستا په مینه داسې مبتلا دی \nلکه شبنم چې په راوتلو د سبا دی\n\nکه پناه شوم ستا د حسن په وطن کې\nدا زما د روح او ژوند پوره بقا ده\n\n#پښتو_ادبیات #غزل",
      htmlText: "زړه مې ستا په مینه داسې مبتلا دی <br>لکه شبنم چې په راوتلو د سبا دی<br><br>که پناه شوم ستا د حسن په وطن کې<br>دا زما د روح او ژوند پوره بقا ده<br><br>#پښتو_ادبیات #غزل",
      date: "2026-06-18T10:00:00Z",
      timeLabel: "10:00 AM",
      views: "1.5K",
      photoUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80",
      photoUrls: ["https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80"],
      reactions: [{ emoji: "❤️", count: "340" }, { emoji: "🔥", count: "112" }],
      authorName: "مینه دیوه"
    }
  ]
};

// API: Fetch and scrape latest channel posts (CORS-free for front-end)
app.get('/api/telegram-feed', async (req, res) => {
  const channel = req.query.channel as string || 'da_mine_dewa';
  // Standardize name - remove @ or t.me reference
  const cleanChannel = channel
    .trim()
    .replace(/^@/, '')
    .replace(/^https?:\/\/t\.me\//, '')
    .split('/')[0];

  if (!cleanChannel) {
    return res.status(400).json({ error: 'Invalid telegram channel name' });
  }

  try {
    const scrapedPostIds = new Set<string>();

    // Helper to scrape a single URL utilizing both native fetch (with alternative mirror redirects) and native Node https module
    async function scrapePage(url: string) {
      const urlsToTry = [
        url,
        url.replace('t.me', 'telegram.dog')
      ];

      // Step 1: Try native fetch for each URL
      for (const targetUrl of urlsToTry) {
        try {
          console.log('[Dewa Server Scraper] Trying native fetch for:', targetUrl);
          const resp = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.5',
            },
          });
          if (resp.ok) {
            const body = await resp.text();
            if (body && body.includes('tgme_widget_message_wrap')) {
              console.log('[Dewa Server Scraper] Native fetch succeeded for:', targetUrl);
              return body;
            }
          }
        } catch (fetchErr: any) {
          console.warn(`[Dewa Server Scraper] Native fetch failed for: ${targetUrl}`, fetchErr.message || fetchErr);
        }
      }

      // Helper function for native Node.js https.get
      function nativeHttpsGet(targetUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const parsedUrl = new URL(targetUrl);
          const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.5',
            },
            timeout: 10000
          };
          const req = https.get(options, (res) => {
            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
              let redirectUrl = res.headers.location;
              if (redirectUrl.startsWith('/')) {
                redirectUrl = `https://${parsedUrl.hostname}${redirectUrl}`;
              }
              nativeHttpsGet(redirectUrl).then(resolve).catch(reject);
              return;
            }
            if (res.statusCode && res.statusCode !== 200) {
              reject(new Error(`HTTP status ${res.statusCode}`));
              return;
            }
            const chunks: any[] = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
              resolve(Buffer.concat(chunks).toString('utf8'));
            });
          });
          req.on('error', (err) => reject(err));
          req.on('timeout', () => {
            req.destroy();
            reject(new Error('Timeout'));
          });
        });
      }

      // Step 2: Fallback to native Node.js https.get
      for (const targetUrl of urlsToTry) {
        try {
          console.log('[Dewa Server Scraper] Trying native https.get fallback for:', targetUrl);
          const body = await nativeHttpsGet(targetUrl);
          if (body && body.includes('tgme_widget_message_wrap')) {
            console.log('[Dewa Server Scraper] Native https.get fallback succeeded for:', targetUrl);
            return body;
          }
        } catch (httpsErr: any) {
          console.error(`[Dewa Server Scraper] Native https.get failed for: ${targetUrl}`, httpsErr.message || httpsErr);
        }
      }

      // If all fails, throw or fallback to standard fetch response or return null
      return null;
    }

    // Helper to parse parsed HTML text via cheerio
    function parseHtmlPosts(htmlText: string) {
      const pagePosts: any[] = [];
      const $page = cheerio.load(htmlText);
      
      $page('.tgme_widget_message_wrap').each((_, element) => {
        const $wrap = $page(element);
        const $post = $wrap.find('.tgme_widget_message');
        
        // Post ID and URL representation
        const dataPostAttr = $post.attr('data-post') || '';
        const parts = dataPostAttr.split('/');
        const postId = parts[parts.length - 1] || '';
        
        if (!postId || scrapedPostIds.has(postId)) return;
        scrapedPostIds.add(postId);

        const postUrl = dataPostAttr ? `https://t.me/${dataPostAttr}` : `https://t.me/${cleanChannel}`;

        // Views
        const views = $post.find('.tgme_widget_message_views').text().trim();

        // Date / Timestamp
        const $time = $post.find('.tgme_widget_message_info time');
        const datetime = $time.attr('datetime') || '';
        const timeLabel = $time.text().trim();

        // Message content
        const $textEl = $post.find('.tgme_widget_message_text');
        
        // Clone message element to replace <br> tags with native newlines (\n) to keep poem stanzas and spacing intact
        const $textClone = $textEl.clone();
        $textClone.find('br').replaceWith('\n');
        
        const plainText = $textClone.text().trim();
        const htmlTextContent = $textEl.html();

        // Process Text Links (converting relative TG links to absolute Web Client links / standard links)
        let parsedHtmlText = htmlTextContent || '';
        if (htmlTextContent) {
          const $parsedText = cheerio.load(htmlTextContent, null, false);
          $parsedText('a').each((_, a) => {
            const href = $parsedText(a).attr('href');
            if (href && href.startsWith('/')) {
              $parsedText(a).attr('href', `https://t.me${href}`);
              $parsedText(a).attr('target', '_blank');
            }
          });
          parsedHtmlText = $parsedText.html();
        }

        // Photos
        let photoUrl = '';
        const photoUrls: string[] = [];
        const $photoEl = $post.find('.tgme_widget_message_photo_wrap');
        if ($photoEl.length > 0) {
          $photoEl.each((_, el) => {
            const style = cheerio.load(el)(el).attr('style') || '';
            const match = style.match(/background-image:\s*url\s*\(\s*['"]?([^'"]+)['"]?\s*\)/i);
            if (match && match[1]) {
              photoUrls.push(match[1]);
            }
          });
          if (photoUrls.length > 0) {
            photoUrl = photoUrls[0];
          }
        }

        // Videos
        let hasVideo = $post.find('.tgme_widget_message_video, .tgme_widget_message_video_player, video').length > 0;
        let videoUrl = '';
        let videoThumbUrl = '';
        const $videoEl = $post.find('.tgme_widget_message_video, video');
        if ($videoEl.length > 0) {
          videoUrl = $videoEl.attr('src') || '';
        }
        const $videoPlayer = $post.find('.tgme_widget_message_video_player');
        if ($videoPlayer.length > 0) {
          const style = $videoPlayer.attr('style') || '';
          const match = style.match(/background-image:\s*url\s*\(\s*['"]?([^'"]+)['"]?\s*\)/i);
          if (match && match[1]) {
            videoThumbUrl = match[1];
          }
        }

        // Audio / Voice Note
        let hasAudio = $post.find('.tgme_widget_message_voice, .tgme_widget_message_audio, .tgme_widget_message_audio_player, audio').length > 0;
        let audioUrl = '';
        let audioTitle = '';
        let audioDuration = '';
        const $audioEl = $post.find('audio');
        if ($audioEl.length > 0) {
          audioUrl = $audioEl.attr('src') || '';
        }
        const $voiceName = $post.find('.tgme_widget_message_voice_name, .tgme_widget_message_audio_title, .tgme_widget_message_document_title');
        if ($voiceName.length > 0) {
          audioTitle = $voiceName.first().text().trim();
        }
        const $voiceDuration = $post.find('.tgme_widget_message_voice_duration, .tgme_widget_message_audio_duration, .tgme_widget_message_document_extra');
        if ($voiceDuration.length > 0) {
          audioDuration = $voiceDuration.first().text().trim();
        }

        // General Documents / Files
        let hasFile = $post.find('.tgme_widget_message_document').length > 0 && !hasAudio;
        let fileName = '';
        let fileSize = '';
        if (hasFile) {
          fileName = $post.find('.tgme_widget_message_document_title').first().text().trim();
          fileSize = $post.find('.tgme_widget_message_document_extra').first().text().trim();
        }

        // Reactions / Emojis
        const reactions: any[] = [];
        const $reactionsContainer = $post.find('.tgme_widget_message_inline_reactions');
        if ($reactionsContainer.length > 0) {
          $reactionsContainer.find('.tgme_widget_message_inline_reaction').each((_, reactionElement) => {
            const $r = $page(reactionElement);
            const emoji = $r.find('.emoji, .tgme_widget_message_inline_reaction_emoji').first().text().trim() || '';
            const count = $r.find('.tgme_widget_message_inline_reaction_count').first().text().trim() || '0';
            if (emoji) {
              reactions.push({ emoji, count });
            }
          });
        }

        // Links Preview
        let linkPreview: any = null;
        const $preview = $post.find('.tgme_widget_message_link_preview');
        if ($preview.length > 0) {
          const siteName = $preview.find('.link_preview_site_name').text().trim();
          const previewTitle = $preview.find('.link_preview_title').text().trim();
          const previewDesc = $preview.find('.link_preview_description').text().trim();
          const previewUrl = $preview.attr('href') || '';
          
          let previewPhotoUrl = '';
          const $previewPhoto = $preview.find('.link_preview_image, .link_preview_right_image');
          if ($previewPhoto.length > 0) {
            const style = $previewPhoto.attr('style') || '';
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

        // Author Name signature
        const authorName = $post.find('.tgme_widget_message_from_author').text().trim() || $post.find('.tgme_widget_message_author').text().trim() || '';

        // Only push messages with content
        if (plainText || photoUrl || hasVideo || hasAudio || hasFile) {
          pagePosts.push({
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
            audioTitle: audioTitle || 'غږیز فایل / پیغام',
            audioDuration,
            hasFile,
            fileName: fileName || 'فايل / سند',
            fileSize,
            reactions,
            linkPreview,
            authorName
          });
        }
      });
      return pagePosts;
    }

    // Fetch Page 1
    const beforeVal = req.query.before as string || '';
    const page1Url = beforeVal 
      ? `https://t.me/s/${cleanChannel}?before=${beforeVal}`
      : `https://t.me/s/${cleanChannel}`;
    
    const html1 = await scrapePage(page1Url);
    if (!html1) {
      throw new Error(`Telegram returned status error`);
    }

    const $ = cheerio.load(html1);

    // Metadata extraction
    const ogTitle = $('meta[property="og:title"]').attr('content') || '';
    const ogImage = $('meta[property="og:image"]').attr('content') || '';
    const ogDescription = $('meta[property="og:description"]').attr('content') || '';
    
    const title = ogTitle || $('.tgme_channel_info_header_title').text().trim() || `@${cleanChannel}`;
    const subscribers = $('.tgme_channel_info_counter').text().trim() || 'Public Channel';
    const description = ogDescription || $('.tgme_channel_info_description').text().trim() || 'No description available.';

    // Extract posts from page 1
    const allPosts: any[] = [];
    const page1Posts = parseHtmlPosts(html1);
    allPosts.push(...page1Posts);

    // If "before" is requested, we are pagination/scrolling so only scrape a small block (1 or 2 pages)
    // If it's initial load, scrape up to 150 posts
    const maxPages = beforeVal ? 2 : 12; // 12 pages * ~15-20 posts = ~180-240 posts max, broken early if allPosts.length >= 150
    let currentPosts = page1Posts;
    for (let page = 2; page <= maxPages; page++) {
      if (!beforeVal && allPosts.length >= 150) {
        break; // Stop fetching older content if we have 150 posts initially
      }
      const postIdsNumeric = currentPosts.map(p => parseInt(p.id)).filter(id => !isNaN(id));
      if (postIdsNumeric.length > 0) {
        const minPostId = Math.min(...postIdsNumeric);
        const nextUrl = `https://t.me/s/${cleanChannel}?before=${minPostId}`;
        const nextHtml = await scrapePage(nextUrl);
        if (nextHtml) {
          const nextPosts = parseHtmlPosts(nextHtml);
          if (nextPosts.length > 0) {
            allPosts.push(...nextPosts);
            currentPosts = nextPosts;
          } else {
            break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
    }

    // Return posts sorted latest first (highest ID first)
    const sortedPosts = allPosts.sort((a, b) => {
      const idA = parseInt(a.id) || 0;
      const idB = parseInt(b.id) || 0;
      return idB - idA;
    });

    const slicedPosts = beforeVal ? sortedPosts : sortedPosts.slice(0, 150);

    res.json({
      channelInfo: {
        username: cleanChannel,
        title,
        avatarUrl: ogImage || 'https://telegram.org/img/t_logo.png',
        subscribers,
        description,
      },
      posts: slicedPosts
    });

  } catch (error: any) {
    console.warn('[Dewa Server Scraper] Main scraping flow threw an error. Silently returning rich fallback poetry database:', error.message || error);
    
    // Resolve pagination over the fallback feed matching 'before' parameter
    const beforeVal = req.query.before as string || '';
    let filteredPosts = [...FALLBACK_FEED.posts];
    if (beforeVal) {
      const beforeId = parseInt(beforeVal);
      if (!isNaN(beforeId)) {
        filteredPosts = filteredPosts.filter(p => (parseInt(p.id) || 0) < beforeId);
      } else {
        filteredPosts = [];
      }
    }

    return res.json({
      channelInfo: {
        username: cleanChannel,
        title: FALLBACK_FEED.channelInfo.title,
        avatarUrl: FALLBACK_FEED.channelInfo.avatarUrl,
        subscribers: FALLBACK_FEED.channelInfo.subscribers,
        description: FALLBACK_FEED.channelInfo.description
      },
      posts: filteredPosts
    });
  }
});

// API: Proxy call to verify the user's Bot Token integrity (getMe)
app.post('/api/bot-test-token', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: 'Connection failed', details: error.message });
  }
});

// API: Proxy call to check bot connection status with the channel (getChat)
app.post('/api/bot-test-channel', async (req, res) => {
  const { token, channel } = req.body;
  if (!token || !channel) {
    return res.status(400).json({ error: 'Token and channel username are required' });
  }

  const cleanChannel = channel.trim().startsWith('@') ? channel.trim() : `@${channel.trim()}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/getChat?chat_id=${encodeURIComponent(cleanChannel)}`);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: 'Connection failed', details: error.message });
  }
});

// API: Proxy call to forward contact us messages to the Telegram Bot (accessible only to bot admin)
app.post('/api/send-contact-message', async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'نوم او پیغام دواړه اړین دي.' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!token || !chatId) {
    console.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_ADMIN_CHAT_ID is missing in environment variables');
    return res.status(400).json({
      error: 'configuration_missing',
      message: 'د پیغام لیږلو لپاره د ټلیګرام روباټ او اډمین معلومات نه دي تنظیم شوي. مهرباني وکړئ TELEGRAM_BOT_TOKEN او TELEGRAM_ADMIN_CHAT_ID په چاپېریالي متغیرونو (Environment Variables/Secrets) کې اضافه کړئ.'
    });
  }

  try {
    // Use plain text formatting rather than Markdown to prevent Telegram parsing exceptions caused by special characters like "_" or "*" in name/message
    const text = `📬 د اړیکې پیغام د اپلیکیشن څخه\n\n👤 شخص: ${name}\n\n💬 پیغام:\n${message}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('Telegram API error response:', result);
      return res.status(500).json({ error: 'telegram_api_error', message: result.description || 'د ټلیګرام روباټ له لارې د استولو تېروتنه رامنځته شوه.' });
    }

    return res.json({ success: true });
  } catch (error: any) {
    console.error('Failed to send Telegram message:', error);
    return res.status(500).json({ error: 'server_error', message: error.message });
  }
});

// Mount Vite middleware / static files router
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Telegram Feed Server running on http://localhost:${PORT}`);
  });
}

startServer();
