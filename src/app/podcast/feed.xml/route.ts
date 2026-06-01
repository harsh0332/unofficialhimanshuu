export async function GET() {
  const currentYear = new Date().getFullYear();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/" 
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Unofficial Talks</title>
    <description>Celebrity Dialogues, Real Stories, and Unfiltered Insights from Indore, India. Hosted by Himanshu Soni.</description>
    <link>https://unofficialstudios.com/podcast</link>
    <language>en-IN</language>
    <copyright>Copyright ${currentYear} The Unofficial Studios</copyright>
    <itunes:author>Himanshu Soni</itunes:author>
    <itunes:summary>Indore's most honest hot seat. We sit down with leaders, medical experts, tech founders, and community builders to extract the raw, unscripted truths that other media outlets edit out.</itunes:summary>
    <itunes:owner>
      <itunes:name>The Unofficial Studios</itunes:name>
      <itunes:email>work.unofficialhimanshu@gmail.com</itunes:email>
    </itunes:owner>
    <itunes:image href="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&amp;w=600&amp;h=600&amp;fit=crop" />
    <itunes:category text="Society &amp; Culture" />
    <itunes:category text="Technology" />
    <atom:link href="https://unofficialstudios.com/podcast/feed.xml" rel="self" type="application/rss+xml" />
    
    <item>
      <title>Garbh Sanskar Explained by Dr. Priyanka Vedi | Full Podcast</title>
      <itunes:author>Dr. Priyanka Vedi</itunes:author>
      <itunes:summary>Dr. Priyanka Vedi explains the ancient Ayurveda philosophy of Garbh Sanskar, breaking down how maternal micro-habits, cognitive health, and environmental cues shape fetal growth.</itunes:summary>
      <description>Dr. Priyanka Vedi explains the ancient Ayurveda philosophy of Garbh Sanskar, breaking down how maternal micro-habits, cognitive health, and environmental cues shape fetal growth.</description>
      <pubDate>Mon, 01 Jun 2026 10:00:00 GMT</pubDate>
      <enclosure url="https://unofficialstudios.com/audio/ep1.mp3" length="55000000" type="audio/mpeg" />
      <itunes:duration>55:00</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
      <guid>the-unofficial-talks-ep-1</guid>
      <link>https://www.youtube.com/watch?v=eYiMwCQ85Kg</link>
    </item>

    <item>
      <title>Inside the Mind of a Surgeon | Dr. Rakesh Shivhare Podcast Part 1</title>
      <itunes:author>Dr. Rakesh Shivhare</itunes:author>
      <itunes:summary>GI &amp; Laparoscopic Surgeon Dr. Rakesh Shivhare details what happens behind surgical doors in corporate hospitals, the psychological demands of intense operation theaters, and medical training realities in India.</itunes:summary>
      <description>GI &amp; Laparoscopic Surgeon Dr. Rakesh Shivhare details what happens behind surgical doors in corporate hospitals, the psychological demands of intense operation theaters, and medical training realities in India.</description>
      <pubDate>Sun, 24 May 2026 12:00:00 GMT</pubDate>
      <enclosure url="https://unofficialstudios.com/audio/ep2.mp3" length="48000000" type="audio/mpeg" />
      <itunes:duration>48:00</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
      <guid>the-unofficial-talks-ep-2</guid>
      <link>https://www.youtube.com/watch?v=oGiTvl1vv8E</link>
    </item>

    <item>
      <title>Reality of Medical Profession in India | Dr. Rakesh Shivhare Podcast Part 2</title>
      <itunes:author>Dr. Rakesh Shivhare</itunes:author>
      <itunes:summary>In Part 2, Dr. Rakesh Shivhare opens up about healthcare ethics, commercial pressures in modern medicine, and the structural reforms needed to protect young medical aspirants in India.</itunes:summary>
      <description>In Part 2, Dr. Rakesh Shivhare opens up about healthcare ethics, commercial pressures in modern medicine, and the structural reforms needed to protect young medical aspirants in India.</description>
      <pubDate>Sun, 17 May 2026 12:00:00 GMT</pubDate>
      <enclosure url="https://unofficialstudios.com/audio/ep3.mp3" length="50000000" type="audio/mpeg" />
      <itunes:duration>50:00</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
      <guid>the-unofficial-talks-ep-3</guid>
      <link>https://www.youtube.com/watch?v=5M0K5Mdlnqo</link>
    </item>

    <item>
      <title>5G Kyu Slow Lagta Hai? | Lease Line vs Normal Internet</title>
      <itunes:author>Aditya Singh Sengar</itunes:author>
      <itunes:summary>Co-Founder Aditya Singh Sengar breaks down modern telecommunication infrastructure, explaining why retail 5G networks experience massive throttling, and details how dedicated fiber lease-lines secure corporate hubs.</itunes:summary>
      <description>Co-Founder Aditya Singh Sengar breaks down modern telecommunication infrastructure, explaining why retail 5G networks experience massive throttling, and details how dedicated fiber lease-lines secure corporate hubs.</description>
      <pubDate>Sun, 10 May 2026 09:00:00 GMT</pubDate>
      <enclosure url="https://unofficialstudios.com/audio/ep4.mp3" length="36000000" type="audio/mpeg" />
      <itunes:duration>36:00</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
      <guid>the-unofficial-talks-ep-4</guid>
      <link>https://www.youtube.com/watch?v=usALSHOTDKQ</link>
    </item>

    <item>
      <title>Nayab Midha Loves Indore Food? Fun Conversation at Sarafa &amp; 56 Dukan</title>
      <itunes:author>Nayab Midha</itunes:author>
      <itunes:summary>Celebrated spoken word poet Nayab Midha sits down in Sarafa Indore for a lighthearted discussion on writing processes, digital audiences storytelling, and regional Central India culinary culture.</itunes:summary>
      <description>Celebrated spoken word poet Nayab Midha sits down in Sarafa Indore for a lighthearted discussion on writing processes, digital audiences storytelling, and regional Central India culinary culture.</description>
      <pubDate>Sun, 03 May 2026 15:00:00 GMT</pubDate>
      <enclosure url="https://unofficialstudios.com/audio/ep5.mp3" length="25000000" type="audio/mpeg" />
      <itunes:duration>25:00</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
      <guid>the-unofficial-talks-ep-5</guid>
      <link>https://www.youtube.com/watch?v=nYIfXqh8_14</link>
    </item>

    <item>
      <title>NEET UG 2026 Cancelled | Paper Leak Shock | 22 Lakh Students Affected</title>
      <itunes:author>Indore Students Community</itunes:author>
      <itunes:summary>A critical ground-reality panel discussion with Indore-based medical aspirants analyzing the national NEET exam controversies, public administrative paper leaks, and the immediate psychological toll on students.</itunes:summary>
      <description>A critical ground-reality panel discussion with Indore-based medical aspirants analyzing the national NEET exam controversies, public administrative paper leaks, and the immediate psychological toll on students.</description>
      <pubDate>Sun, 26 Apr 2026 11:00:00 GMT</pubDate>
      <enclosure url="https://unofficialstudios.com/audio/ep6.mp3" length="30000000" type="audio/mpeg" />
      <itunes:duration>30:00</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
      <guid>the-unofficial-talks-ep-6</guid>
      <link>https://www.youtube.com/watch?v=v2gzlQSdjHc</link>
    </item>
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=18000",
    },
  });
}
