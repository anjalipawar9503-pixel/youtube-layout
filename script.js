// ============ VIDEO DATA ============
// Replace thumbnail/channel values with your own assets or an API response.
const videos = [
  { title: "Building a YouTube Clone with HTML, CSS & JS — Full Tutorial", channel: "Code with Zoya", views: "182K views", time: "2 days ago", duration: "18:24", color: "#7b3fe4" },
  { title: "10 VS Code Extensions Every Web Developer Needs in 2026", channel: "DevTools Daily", views: "94K views", time: "5 days ago", duration: "11:02", color: "#e0567a" },
  { title: "I Tried Cooking Only With a Rice Cooker for a Week", channel: "Kitchen Diaries", views: "1.2M views", time: "1 year ago", duration: "14:37", color: "#f2994a" },
  { title: "CSS Grid vs Flexbox — When to Use Which (With Examples)", channel: "Frontend Focus", views: "310K views", time: "3 weeks ago", duration: "09:15", color: "#2f80ed" },
  { title: "A Quiet Morning in the Himalayas 🏔️ Travel Vlog", channel: "Travel Diaries", views: "540K views", time: "6 months ago", duration: "22:48", color: "#27ae60" },
  { title: "Lo-fi Beats to Study/Relax to — 1 Hour Mix", channel: "Music Box", views: "3.4M views", time: "2 years ago", duration: "1:00:12", color: "#9b51e0" },
  { title: "Why Every Developer Should Learn Git Properly", channel: "Code with Zoya", views: "76K views", time: "4 days ago", duration: "13:05", color: "#7b3fe4" },
  { title: "Stand-Up Comedy Night — Best Moments Compilation", channel: "Laugh Track", views: "820K views", time: "8 months ago", duration: "16:40", color: "#eb5757" },
  { title: "Breaking Down the Latest Tech Announcements This Week", channel: "News Wire", views: "45K views", time: "12 hours ago", duration: "07:58", color: "#56ccf2" },
  { title: "Building a REST API with Node.js in Under 30 Minutes", channel: "DevTools Daily", views: "210K views", time: "1 month ago", duration: "29:11", color: "#e0567a" },
  { title: "Street Food Tour: Mumbai Edition 🍛", channel: "Kitchen Diaries", views: "1.8M views", time: "3 months ago", duration: "19:53", color: "#f2994a" },
  { title: "LIVE: Coding a Portfolio Site From Scratch", channel: "Code with Zoya", views: "12K watching", time: "Streamed live", duration: "LIVE", color: "#7b3fe4" },
];

// Deterministic placeholder thumbnail (no external image dependency)
function thumbnailSVG(seed, color) {
  const hue = Math.abs(seed) % 360;
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>
      <rect width='640' height='360' fill='hsl(${hue},60%,55%)'/>
      <circle cx='320' cy='180' r='46' fill='rgba(255,255,255,0.85)'/>
      <polygon points='305,155 305,205 350,180' fill='hsl(${hue},60%,40%)'/>
    </svg>`)}`;
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
  return hash;
}

function renderVideos(list) {
  const grid = document.getElementById("videoGrid");
  grid.innerHTML = "";

  list.forEach((video) => {
    const card = document.createElement("article");
    card.className = "video-card";
    card.innerHTML = `
      <div class="thumb-wrap">
        <img src="${thumbnailSVG(hashString(video.title), video.color)}" alt="${video.title}" loading="lazy" />
        <span class="duration">${video.duration}</span>
      </div>
      <div class="video-info">
        <div class="channel-avatar" style="background:${video.color}">${video.channel.charAt(0)}</div>
        <div class="video-text">
          <p class="video-title">${video.title}</p>
          <p class="video-meta">
            <span>${video.channel}</span>
            <span>${video.views} • ${video.time}</span>
          </p>
        </div>
      </div>
    `;
    card.addEventListener("click", () => {
      alert(`Playing: "${video.title}"\n(Hook this up to a real player/route in your app.)`);
    });
    grid.appendChild(card);
  });
}

// ============ CHIP FILTER (demo: filters by category keyword in title/channel) ============
document.getElementById("chips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;

  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");

  const category = chip.textContent.trim().toLowerCase();
  if (category === "all") {
    renderVideos(videos);
    return;
  }
  const filtered = videos.filter(
    (v) => v.title.toLowerCase().includes(category) || v.channel.toLowerCase().includes(category)
  );
  renderVideos(filtered.length ? filtered : videos);
});

// ============ SIDEBAR TOGGLE ============
document.getElementById("hamburgerBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("collapsed");
});

// ============ NAV ITEM ACTIVE STATE ============
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// ============ INITIAL RENDER ============
renderVideos(videos);