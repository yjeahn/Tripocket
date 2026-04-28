const jisooAvatar = './images/media__1776808544674.png';

const mockData = [
  {
    id: 1,
    region: 'Seoul',
    title: "Hongdae | Jisoo's Fashion Tour",
    spots: 5,
    days: "1 Day",
    style: ["Hip Spot", "Aesthetics"],
    duration: "1 Day",
    pace: "Fast",
    img: "./images/jisoo_thumb_v2_1777340483811.png",
    creator: {
      name: "Jisoo",
      avatar: jisooAvatar,
      verified: true
    }
  },
  {
    id: 2,
    region: 'Seoul',
    title: "Anguk | Dohoon's Local Aesthetics",
    spots: 4,
    days: "2 Days",
    style: ["Aesthetics", "Chill"],
    duration: "2 Days",
    pace: "Leisure",
    img: "./images/dohoon_thumb_1777340497145.png",
    creator: {
      name: "Dohoon",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      verified: false
    }
  },
  {
    id: 3,
    region: 'Seoul',
    title: "Gangnam | Ultimate Foodie Guide",
    spots: 8,
    days: "3 Days",
    style: ["Foodie", "Luxury"],
    duration: "3 Days",
    pace: "Moderate",
    img: "./images/minji_thumb_1777340508910.png",
    creator: {
      name: "Minji",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      verified: true
    }
  },
  {
    id: 4,
    region: 'Busan',
    title: "Haeundae | Beach & Cafe Hopping",
    spots: 6,
    days: "2 Days",
    style: ["Aesthetics", "Nature"],
    duration: "2 Days",
    pace: "Leisure",
    img: "./images/somi_thumb_1777340522613.png",
    creator: {
      name: "Somi",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
      verified: true
    }
  },
  {
    id: 5,
    region: 'Seoul',
    title: "Hongdae | Mina's Vintage Tour",
    spots: 4,
    days: "1 Day",
    style: ["Hip Spot", "Aesthetics"],
    duration: "1 Day",
    pace: "Fast",
    img: "./images/mina_thumb_1777340532950.png",
    creator: {
      name: "Mina",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      verified: false
    }
  }
];

const jisooSpots = [
  {
    time: "10:00 - 11:30",
    name: "Musinsa Standard Hongdae",
    desc: "Near Hongik Univ. Station Exit 9. Shop for the latest trendy fashion items.",
    link: "https://maps.app.goo.gl/fAavmx24ppcsHhqR8",
    img: "./images/media__1776807012797.png",
    images: [
      { url: "./images/media__1776807012797.png", caption: "" },
      { url: "./images/musinsa_img2_en_1777339944120.png", caption: "" },
      { url: "./images/musinsa_img3_en_1777339963301.png", caption: "" }
    ]
  },
  {
    time: "11:45 - 13:00",
    name: "as\"on",
    desc: "One of the most popular designer brands among Korean women in their 20s.",
    link: "https://maps.app.goo.gl/1ZiXj4KNdUMFJ47i9",
    img: "./images/media__1776807138081.jpg"
  },
  {
    time: "13:30 - 15:30",
    name: "nyunyu",
    desc: "Browse a huge variety of affordable accessories and goods.",
    link: "https://maps.app.goo.gl/woMgX2hPjP94XJJs9",
    img: "./images/media__1776807144210.jpg"
  },
  {
    time: "16:00 - 17:30",
    name: "Ader Error",
    desc: "Explore a unique showroom that feels like an art exhibition. Great for photos.",
    link: "https://maps.app.goo.gl/SXKaPnw6jJuTr3dr7",
    img: "./images/media__1776807159851.jpg"
  },
  {
    time: "18:00 - 20:00",
    name: "Damsot Hapjeong",
    desc: "Wrap up the day with a delicious traditional Korean pot rice dinner.",
    link: "https://maps.app.goo.gl/8xhwR1ZkiVEhXsJeA",
    img: "./images/media__1776807275562.jpg"
  }
];

let selectedRegion = '';
let activeFilters = {
  style: [],
  duration: [],
  pace: []
};

// DOM Elements
const regionScreen = document.getElementById('region-screen');
const feedScreen = document.getElementById('feed-screen');
const detailScreen = document.getElementById('detail-screen');

const regionCards = document.querySelectorAll('.region-card');
const backToRegionBtn = document.getElementById('back-to-region-btn');
const backToFeedBtn = document.getElementById('back-to-feed-btn');
const filterTags = document.querySelectorAll('.filter-tag:not(.more-btn)');
const clearBtn = document.getElementById('clear-btn');
const applyBtn = document.getElementById('apply-btn');
const itineraryList = document.getElementById('itinerary-list');

const moreStylesBtn = document.getElementById('more-styles-btn');
const expandedStyles = document.getElementById('expanded-styles');

// Event Listeners

const mainSearchInput = document.getElementById('main-search-input');
const homeSearchCenter = document.getElementById('home-search-center');
const regionSuggestions = document.getElementById('region-suggestions');
const homeMainLogo = document.getElementById('home-main-logo');

function activateSearch() {
  mainSearchInput.classList.add('active');
  homeSearchCenter.classList.add('active');
  regionSuggestions.classList.add('visible');
}

if (mainSearchInput) {
  mainSearchInput.addEventListener('click', activateSearch);
}
if (homeMainLogo) {
  homeMainLogo.addEventListener('click', activateSearch);
}
regionCards.forEach(card => {
  card.addEventListener('click', () => {
    selectedRegion = card.dataset.region;
    showFeedScreen();
  });
});

backToRegionBtn.addEventListener('click', () => {
  showRegionScreen();
});

let previousScreen = 'feed';

backToFeedBtn.addEventListener('click', () => {
  detailScreen.classList.add('hidden');
  if (previousScreen === 'saved') {
    savedScreen.classList.remove('hidden');
  } else {
    feedScreen.classList.remove('hidden');
  }
});

moreStylesBtn.addEventListener('click', () => {
  expandedStyles.classList.toggle('hidden');
  moreStylesBtn.textContent = expandedStyles.classList.contains('hidden') ? 'More' : '- Hide';
});

filterTags.forEach(tag => {
  tag.addEventListener('click', (e) => {
    e.target.classList.toggle('active');
  });
});

clearBtn.addEventListener('click', () => {
  filterTags.forEach(tag => tag.classList.remove('active'));
  activeFilters = { style: [], duration: [], pace: [] };
  renderItineraries(selectedRegion);
});

applyBtn.addEventListener('click', () => {
  activeFilters.style = Array.from(document.querySelectorAll('.filter-tag[data-filter="style"].active')).map(el => el.dataset.value);
  activeFilters.duration = Array.from(document.querySelectorAll('.filter-tag[data-filter="duration"].active')).map(el => el.dataset.value);
  activeFilters.pace = Array.from(document.querySelectorAll('.filter-tag[data-filter="pace"].active')).map(el => el.dataset.value);
  
  renderItineraries(selectedRegion);
});

function showFeedScreen() {
  regionScreen.classList.add('hidden');
  detailScreen.classList.add('hidden');
  savedScreen.classList.add('hidden');
  feedScreen.classList.remove('hidden');
  renderItineraries(selectedRegion);
}

function showRegionScreen() {
  feedScreen.classList.add('hidden');
  detailScreen.classList.add('hidden');
  savedScreen.classList.add('hidden');
  regionScreen.classList.remove('hidden');
  filterTags.forEach(tag => tag.classList.remove('active'));
  activeFilters = { style: [], duration: [], pace: [] };
  
  // Reset search UI
  if (mainSearchInput) {
    mainSearchInput.classList.remove('active');
    homeSearchCenter.classList.remove('active');
    regionSuggestions.classList.remove('visible');
  }
}

function renderItineraries(region) {
  let filtered = mockData.filter(item => item.region === region);

  if (activeFilters.style.length > 0) {
    filtered = filtered.filter(item => activeFilters.style.every(s => item.style.includes(s)));
  }
  if (activeFilters.duration.length > 0) {
    filtered = filtered.filter(item => activeFilters.duration.includes(item.duration));
  }
  if (activeFilters.pace.length > 0) {
    filtered = filtered.filter(item => activeFilters.pace.includes(item.pace));
  }

  itineraryList.innerHTML = '';

  if (filtered.length === 0) {
    itineraryList.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No itineraries found matching your filters.</div>';
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'feed-card';
    
    let tagsHtml = item.style.map(s => `<span>${s}</span>`).join('');
    tagsHtml += `<span>${item.duration}</span>`;
    
    card.innerHTML = `
      <img class="feed-card-img" src="${item.img}" alt="${item.title}">
      <div class="feed-card-content">
        <div class="feed-card-region">📍 ${item.title.split('|')[0].trim()}</div>
        <div class="feed-title">✨ ${item.title.split('|')[1].trim()}</div>
        <div class="feed-tags">${tagsHtml}</div>
        <div class="feed-creator">
          <div class="creator-avatar">
            <img src="${item.creator.avatar}" alt="${item.creator.name}">
            ${item.creator.verified ? '<div class="verified-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' : ''}
          </div>
          <div class="creator-info">
            <span class="creator-name">${item.creator.name}</span>
            <span class="creator-meta">· ${Math.floor(Math.random() * 50)/10 + 1}k followers</span>
          </div>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      if (item.id === 1) { // Jisoo
        previousScreen = 'feed';
        openJisooDetail();
      }
    });

    itineraryList.appendChild(card);
  });
}

function openJisooDetail() {
  feedScreen.classList.add('hidden');
  savedScreen.classList.add('hidden');
  detailScreen.classList.remove('hidden');
  
  const timelineEl = document.getElementById('timeline-spots');
  timelineEl.innerHTML = '';
  
  jisooSpots.forEach((spot, index) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    
    const colors = ['#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4'];
    
    let imageHtml = '';
    if (spot.images && spot.images.length > 0) {
      let slides = spot.images.map((imgObj, idx) => `
        <div class="spot-carousel-slide" id="slide-${index}-${idx}">
          <img src="${imgObj.url}" class="spot-image-large" alt="${spot.name}">
        </div>
      `).join('');
      
      let dots = spot.images.map((_, idx) => `<div class="carousel-dot ${idx === 0 ? 'active' : ''}"></div>`).join('');
      
      imageHtml = `
        <div class="spot-carousel-container">
          <button class="carousel-btn prev-btn" onclick="scrollCarousel(this, -1)">❮</button>
          <div class="spot-carousel-track" onscroll="updateDots(this, ${index})">
            ${slides}
          </div>
          <button class="carousel-btn next-btn" onclick="scrollCarousel(this, 1)">❯</button>
          <div class="carousel-indicators" id="indicators-${index}">
            ${dots}
          </div>
        </div>
      `;
    } else {
      imageHtml = `<img src="${spot.img}" class="spot-image" alt="${spot.name}">`;
    }

    item.innerHTML = `
      <div class="timeline-number" style="background: ${colors[index]}">${index + 1}</div>
      <div class="timeline-content">
        <div class="time-label">${spot.time}</div>
        <div class="spot-title">
          <span class="spot-title-text">${spot.name}</span>
          <a href="${spot.link}" target="_blank">🗺 Map</a>
        </div>
        <div class="spot-desc">${spot.desc}</div>
        ${imageHtml}
      </div>
    `;
    timelineEl.appendChild(item);
  });
}

function updateDots(trackEl, timelineIndex) {
  const scrollLeft = trackEl.scrollLeft;
  const slideWidth = trackEl.offsetWidth;
  const currentIndex = Math.round(scrollLeft / slideWidth);
  
  const indicatorsContainer = document.getElementById(`indicators-${timelineIndex}`);
  if (indicatorsContainer) {
    const dots = indicatorsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

function scrollCarousel(btn, direction) {
  const container = btn.parentElement;
  const track = container.querySelector('.spot-carousel-track');
  const slideWidth = track.offsetWidth;
  track.scrollBy({ left: direction * slideWidth, behavior: 'smooth' });
}

// Create Itinerary FAB Logic
const createFab = document.getElementById('create-fab');
if (createFab) {
  createFab.addEventListener('click', () => {
    toast.innerText = "Upload my itinerary ✨";
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  });
}

// ==========================================
// SAVED FOLDERS & OVERLAPPING SPOTS LOGIC
// ==========================================

// Mock data showing another creator with overlapping spots
const somiPicksData = {
  id: 101,
  title: "Hongdae | Somi's Trendy Picks",
  spots: 4,
  days: "1 Day",
  overlapCount: 1, // Overlaps with Jisoo
  isFollowing: true,
  creator: {
    name: "Somi",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
    verified: true
  }
};

let savedFolders = {
  Seoul: {
    Hongdae: [somiPicksData] // Start with Somi's picks so user can save Jisoo's to see overlap
  },
  Busan: {
    Haeundae: [
      {
        ...mockData[3], 
        overlapCount: 0,
        isFollowing: true
      }
    ]
  }
};

// Mock map points for Seoul's overlapping spots
const seoulOverlapSpots = [
  { name: 'Musinsa Standard Hongdae', count: 1, x: 30, y: 40 },
  { name: 'as"on', count: 1, x: 70, y: 60 }
];

let currentSavedView = 'regions'; 
let currentRegion = null;
let currentNeighborhood = null;
let filterFollowingOnly = false;
let sortBy = 'recent'; 

// DOM Elements
const savedScreen = document.getElementById('saved-screen');
const navHome = document.getElementById('nav-home');
const navSaved = document.getElementById('nav-saved');
const navProfile = document.getElementById('nav-profile');
const btnSaveItinerary = document.querySelector('.btn-save-itinerary');
const toast = document.getElementById('toast');

const savedContentArea = document.getElementById('saved-content-area');
const savedBreadcrumbs = document.getElementById('saved-breadcrumbs');
const savedFilterBar = document.getElementById('saved-filter-bar');
const savedOverlapSection = document.getElementById('saved-overlap-section');
const bcRegion = document.getElementById('bc-region');
const bcNeighborhood = document.getElementById('bc-neighborhood');
const sortDropdown = document.getElementById('sort-dropdown');
const filterToggle = document.getElementById('filter-toggle');

// Navigation Logic
navHome.addEventListener('click', () => {
  navHome.classList.add('active');
  navSaved.classList.remove('active');
  navProfile.classList.remove('active');
  
  savedScreen.classList.add('hidden');
  
  if (selectedRegion && !feedScreen.classList.contains('hidden')) {
    // We are already on the feed screen
  } else if (!detailScreen.classList.contains('hidden')) {
    // We are on the detail screen
  } else {
    showRegionScreen();
  }
});

navSaved.addEventListener('click', () => {
  navSaved.classList.add('active');
  navHome.classList.remove('active');
  navProfile.classList.remove('active');
  
  regionScreen.classList.add('hidden');
  feedScreen.classList.add('hidden');
  detailScreen.classList.add('hidden');
  savedScreen.classList.remove('hidden');
  
  renderSavedRegions();
});

// Breadcrumb clicks
bcRegion.addEventListener('click', () => {
  if (currentSavedView === 'itineraries') {
    renderSavedNeighborhoods(currentRegion);
  }
});

// Sort and Filter
sortDropdown.addEventListener('change', (e) => {
  sortBy = e.target.value;
  renderSavedItinerariesList(currentRegion, currentNeighborhood);
});

filterToggle.addEventListener('click', () => {
  filterFollowingOnly = !filterFollowingOnly;
  filterToggle.classList.toggle('active');
  renderSavedItinerariesList(currentRegion, currentNeighborhood);
});

// Rendering functions
function renderSavedRegions() {
  currentSavedView = 'regions';
  savedBreadcrumbs.classList.add('hidden');
  savedFilterBar.classList.add('hidden');
  savedOverlapSection.classList.add('hidden');
  
  const regions = Object.keys(savedFolders);
  
  if (regions.length === 0) {
    savedContentArea.innerHTML = '<div style="padding: 40px; text-align: center; color: #666; font-weight: 600;">No saved itineraries yet.</div>';
    return;
  }
  
  savedContentArea.innerHTML = '<div class="folder-grid"></div>';
  const grid = savedContentArea.querySelector('.folder-grid');
  
  regions.forEach(region => {
    const nbCount = Object.keys(savedFolders[region]).length;
    const card = document.createElement('div');
    card.className = 'folder-card';
    card.innerHTML = `
      <div class="folder-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      </div>
      <div class="folder-name">${region}</div>
      <div class="folder-count">${nbCount} Neighborhoods</div>
    `;
    card.addEventListener('click', () => renderSavedNeighborhoods(region));
    grid.appendChild(card);
  });
}

function renderSavedNeighborhoods(region) {
  currentSavedView = 'neighborhoods';
  currentRegion = region;
  
  savedBreadcrumbs.classList.remove('hidden');
  savedFilterBar.classList.add('hidden');
  savedOverlapSection.classList.remove('hidden');
  
  bcRegion.textContent = region;
  bcRegion.classList.add('active');
  bcRegion.nextElementSibling.classList.add('hidden'); // hide arrow
  bcNeighborhood.classList.add('hidden');
  
  // Render Top Overlapping Spots for this Region (mock logic)
  const isSeoul = region === 'Seoul';
  const spots = isSeoul ? seoulOverlapSpots : [];
  
  let mapPinsHTML = '';
  let listItemsHTML = '';
  
  if (spots.length > 0) {
    // Sort spots by overlap count descending
    spots.sort((a, b) => b.count - a.count);
    
    spots.forEach((spot, idx) => {
      // Pin size logic: Base 24px + (count * 4px)
      const pinSize = 20 + (spot.count * 6);
      mapPinsHTML += `
        <div class="map-pin" style="left: ${spot.x}%; top: ${spot.y}%;">
          <div class="pin-bubble" style="width: ${pinSize}px; height: ${pinSize}px; font-size: ${pinSize/2}px;">
            ${spot.count}
          </div>
          <div class="pin-label">${spot.name}</div>
        </div>
      `;
      
      listItemsHTML += `
        <div class="overlap-list-item">
          <div class="overlap-list-name">
            <span class="rank">${idx + 1}</span> ${spot.name}
          </div>
          <div class="overlap-list-count">In ${spot.count} Itineraries</div>
        </div>
      `;
    });
    
    savedOverlapSection.innerHTML = `
      <div class="overlap-section">
        <div class="section-title">🔥 Top Overlapping Spots in ${region}</div>
        <div class="overlap-map-container">
          ${mapPinsHTML}
        </div>
        <div class="overlap-list">
          ${listItemsHTML}
        </div>
        <div class="section-title" style="margin-top: 24px;">📁 Neighborhoods</div>
      </div>
    `;
  } else {
    savedOverlapSection.innerHTML = '';
  }

  // Render Folders
  const neighborhoods = Object.keys(savedFolders[region]);
  
  if (neighborhoods.length === 0) {
    savedContentArea.innerHTML = '<div style="padding: 40px; text-align: center; color: #666; font-weight: 600;">No saved neighborhoods.</div>';
    return;
  }
  
  savedContentArea.innerHTML = '<div class="folder-grid" style="padding-top: 0;"></div>';
  const grid = savedContentArea.querySelector('.folder-grid');
  
  neighborhoods.forEach(nb => {
    const itemNum = savedFolders[region][nb].length;
    const card = document.createElement('div');
    card.className = 'folder-card';
    card.innerHTML = `
      <div class="folder-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
      </div>
      <div class="folder-name">${nb}</div>
      <div class="folder-count">${itemNum} Itineraries</div>
    `;
    card.addEventListener('click', () => renderSavedItinerariesList(region, nb));
    grid.appendChild(card);
  });
}

function renderSavedItinerariesList(region, neighborhood) {
  currentSavedView = 'itineraries';
  currentNeighborhood = neighborhood;
  
  savedBreadcrumbs.classList.remove('hidden');
  savedFilterBar.classList.remove('hidden');
  savedOverlapSection.classList.add('hidden'); // hide map in list view
  
  bcRegion.classList.remove('active');
  bcRegion.nextElementSibling.classList.remove('hidden'); // show arrow
  bcNeighborhood.classList.remove('hidden');
  bcNeighborhood.textContent = neighborhood;
  
  let list = savedFolders[region][neighborhood] ? [...savedFolders[region][neighborhood]] : [];
  
  if (filterFollowingOnly) {
    list = list.filter(item => item.isFollowing);
  }
  
  if (sortBy === 'overlap') {
    list.sort((a, b) => b.overlapCount - a.overlapCount);
  } else {
    // recent
    list.sort((a, b) => b.id - a.id);
  }
  
  savedContentArea.innerHTML = '<div class="feed-list-container" style="min-height: 100%; padding-bottom: 40px;"></div>';
  const listContainer = savedContentArea.querySelector('.feed-list-container');
  
  if (list.length === 0) {
    listContainer.innerHTML = '<div style="padding: 40px; text-align: center; color: #666; font-weight: 600;">No itineraries match your criteria.</div>';
    return;
  }
  
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'itinerary-card';
    card.innerHTML = `
      <div class="itinerary-info">
        <div class="itinerary-title">${item.title}</div>
        <div class="itinerary-stats">${item.spots} Spots | ${item.days}</div>
        ${item.overlapCount > 0 ? `<div class="overlap-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l2-9 5 18 2-9h4"></path></svg> ${item.overlapCount} Overlapping Spots</div>` : ''}
      </div>
      <div class="creator-avatar">
        <img src="${item.creator.avatar}" alt="${item.creator.name}">
        ${item.creator.verified ? '<div class="verified-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' : ''}
      </div>
    `;
    
    // Add click event so we can view the itinerary
    card.addEventListener('click', () => {
      if (item.id === 1) { // Only mocked for Jisoo's right now
        previousScreen = 'saved';
        openJisooDetail();
      } else {
        alert("This is a mock itinerary. Try clicking Jisoo's tour!");
      }
    });

    listContainer.appendChild(card);
  });
}

// "Save to Itinerary" Button Action
btnSaveItinerary.addEventListener('click', () => {
  // Save Jisoo's tour to Seoul -> Hongdae
  if (!savedFolders['Seoul']) savedFolders['Seoul'] = {};
  if (!savedFolders['Seoul']['Hongdae']) savedFolders['Seoul']['Hongdae'] = [];
  
  // Check if already saved
  const alreadySaved = savedFolders['Seoul']['Hongdae'].find(i => i.id === 1);
  if (!alreadySaved) {
    savedFolders['Seoul']['Hongdae'].unshift({
      ...mockData[0], // Jisoo's data
      overlapCount: 2, // Mock overlap count
      isFollowing: true
    });
    
    // Increment overlap count for the map mock data for demonstration
    seoulOverlapSpots.forEach(spot => spot.count++);
  }
  
  toast.innerText = "Remixed! Saved to My Pocket.";
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    // Navigate to Saved Screen -> Seoul Region View to show map
    navSaved.click();
    renderSavedNeighborhoods('Seoul');
  }, 2000);
});

