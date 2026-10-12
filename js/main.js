"use strict";

const STORAGE_KEY = "still-seen-photo-records-v1";
const DATA_VERSION_KEY = "still-seen-photo-data-version";
const DATA_VERSION = "7";
const LEGACY_IMAGE_IDS = {
  p01: "1500530855697-b586d89ba3ee",
  p02: "1519608487953-e999c86e7455",
  p03: "1470770841072-f978cf4d019e",
  p04: "1519608487953-e999c86e7455",
  p05: "1448375240586-882707db888b",
  p06: "1534528741775-53994a69daeb",
  p07: "1511818966892-d7d671e672a2",
  p08: "1500534623283-312aade485b7",
  p09: "1519608487953-e999c86e7455",
  p10: "1473448912268-2022ce9509d8",
  p11: "1487958449943-2429e8be8625",
  p12: "1506794778202-cad84cf45f1d"
};
const LEGACY_IMAGE_PATHS = {
  p04: "img/night-sky.webp",
  p09: "img/night-sky.webp"
};
const unsplashCredit = photoId => ({
  author: "Unsplash",
  license: "Unsplash License",
  licenseUrl: "https://unsplash.com/license",
  source: `https://images.unsplash.com/photo-${photoId}?fit=crop&w=1200&h=900&q=78`
});
const starterPhotos = [
  { id: "p01", title: "Where the Day Begins", category: "Landscape", location: "Dolomites, Italy", year: 2026, camera: "Fujifilm X-T5", image: "img/dolomites.webp", description: "The first light reaches the ridgeline long before it finds the valley." },
  { id: "p02", title: "After the Last Light", category: "Travel", location: "Vik, Iceland", year: 2025, camera: "Sony A7 III", image: "img/night-sky.webp", description: "A quiet evening under a sky that seemed to go on forever." },
  { id: "p03", title: "Still Water, Open Sky", category: "Landscape", location: "Lake Bled, Slovenia", year: 2025, camera: "Canon EOS R6", image: "img/alpine-lake.webp", description: "A mountain reflection held perfectly still for just a moment." },
  { id: "p04", title: "The Long Way Home", category: "Street", location: "Lisbon, Portugal", year: 2024, camera: "Fujifilm X100V", image: "img/lisbon-street.webp", description: "The last warm color of the day settles across an unfamiliar street." },
  { id: "p05", title: "Between the Pines", category: "Wildlife", location: "Olympic National Park, USA", year: 2026, camera: "Nikon Z6 II", image: "img/pine-forest.webp", description: "A forest trail disappears into the soft green of the trees." },
  { id: "p06", title: "A Room of Her Own", category: "Portrait", location: "Tampa, Florida", year: 2025, camera: "Sony A7 III", image: "img/portrait-woman.webp", description: "A natural-light portrait made in a familiar, quiet place." },
  { id: "p07", title: "Lines in the Sand", category: "Architecture", location: "Valencia, Spain", year: 2024, camera: "Canon EOS R6", image: "img/city-architecture.webp", description: "Late sunlight draws a changing geometry across the city." },
  { id: "p08", title: "The Other Side of Morning", category: "Travel", location: "Maui, Hawaii", year: 2026, camera: "Fujifilm X-T5", image: "img/maui-coast.webp", description: "Clouds give way to a bright coastline at the edge of the day." },
  { id: "p09", title: "Small Hours", category: "Street", location: "New York, USA", year: 2025, camera: "Fujifilm X100V", image: "img/new-york-street.webp", description: "The city shifts into a different rhythm after the crowds leave." },
  { id: "p10", title: "A Wild Quiet", category: "Wildlife", location: "Yellowstone, USA", year: 2024, camera: "Nikon Z6 II", image: "img/woodland.webp", description: "A still stretch of woodland, full of sounds just outside the frame." },
  { id: "p11", title: "The Shape of Home", category: "Architecture", location: "Tampa, Florida", year: 2025, camera: "Canon EOS R6", image: "img/modern-house.webp", description: "Clean forms and warm light give a familiar building a new character." },
  { id: "p12", title: "Window Light", category: "Portrait", location: "Brooklyn, USA", year: 2024, camera: "Sony A7 III", image: "img/portrait-man.webp", description: "A portrait shaped by nothing more than afternoon light and a pause." },
  { id: "p13", title: "The Blue Between", category: "Seascape", location: "North Shore, Oahu", year: 2026, camera: "Fujifilm X-T5", image: "img/open-ocean.webp", description: "Open water and a long horizon make the world feel wonderfully wide." },
  { id: "p14", title: "Salt on the Air", category: "Seascape", location: "Maui, Hawaii", year: 2025, camera: "Canon EOS R6", image: "img/coastal-shore.webp", description: "A bright stretch of coast where the tide leaves its shifting patterns." },
  { id: "p15", title: "Dune Lines", category: "Landscape", location: "Sahara, Morocco", year: 2024, camera: "Nikon Z6 II", image: "img/desert-dunes.webp", description: "Wind draws delicate lines across the warm, open surface of the dunes." },
  { id: "p16", title: "A Field in Bloom", category: "Nature", location: "Provence, France", year: 2026, camera: "Sony A7 III", image: "img/wildflowers.webp", description: "Wildflowers lean into the late light at the edge of a country lane." },
  { id: "p17", title: "Curious Company", category: "Wildlife", location: "Tampa, Florida", year: 2025, camera: "Fujifilm X-T5", image: "img/cat-portrait.webp", description: "A watchful neighborhood cat takes a brief break from exploring." },
  { id: "p18", title: "The Morning Table", category: "Food", location: "Florence, Italy", year: 2025, camera: "Canon EOS R6", image: "img/market-table.webp", description: "Fresh ingredients and soft window light before the market gets busy." },
  { id: "p19", title: "Last Table by the Window", category: "Food", location: "Portland, Oregon", year: 2024, camera: "Sony A7 III", image: "img/cafe-evening.webp", description: "A neighborhood cafe settles into the warm glow of the evening." },
  { id: "p20", title: "The Street Becomes a Stage", category: "Culture", location: "New Orleans, USA", year: 2026, camera: "Fujifilm X100V", image: "img/festival-crowd.webp", description: "Music and movement gather a crowd into one bright shared moment." },
  { id: "p21", title: "Sun Between the Leaves", category: "Portrait", location: "San Francisco, USA", year: 2025, camera: "Nikon Z6 II", image: "img/portrait-sunlight.webp", description: "A quiet portrait framed by soft daylight and the shade of nearby trees." },
  { id: "p22", title: "The Hills Hold the Mist", category: "Nature", location: "Scottish Highlands", year: 2024, camera: "Canon EOS R6", image: "img/misty-hills.webp", description: "Cloud and land meet in the first still minutes of a mountain morning." },
  { id: "p23", title: "Above the Tree Line", category: "Landscape", location: "Banff, Canada", year: 2026, camera: "Sony A7 III", image: "img/mountain-ridge.webp", description: "A clear view across a rugged alpine ridge after the clouds lift." },
  { id: "p24", title: "A Mirror for the Mountains", category: "Travel", location: "Hallstatt, Austria", year: 2024, camera: "Fujifilm X-T5", image: "img/lake-reflection.webp", description: "Still water doubles the mountains and small lakeside village at dawn." },
  { id: "p26", title: "A Campus Landmark", category: "USF", location: "University of South Florida, Tampa", year: 2025, camera: "Campus field notes", image: "img/usf-water-tower.jpg", description: "The water tower rises above campus as a familiar landmark on the University of South Florida grounds.", credit: { author: "Izzxox", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Water_tower_at_University_of_South_Florida.jpg" } },
  { id: "p27", title: "The Long View", category: "Landscape", location: "Alpine field notes", year: 2026, image: "img/collection-27.jpg", description: "A broad, quiet landscape draws the eye from the water toward the distant peaks.", credit: unsplashCredit("1501785888041-af3ef285b470") },
  { id: "p28", title: "When the Sky Turns Gold", category: "Nature", location: "Evening field notes", year: 2025, image: "img/collection-28.jpg", description: "The last warm light settles over the land, turning an ordinary evening into a small spectacle.", credit: unsplashCredit("1470252649378-9c29740c9fa8") },
  { id: "p29", title: "Open Country", category: "Landscape", location: "Highland field notes", year: 2024, image: "img/collection-29.jpg", description: "Soft green hills and an open sky make room for a slower kind of looking.", credit: unsplashCredit("1472214103451-9374bd1c798e") },
  { id: "p30", title: "Above the Clouds", category: "Landscape", location: "Mountain field notes", year: 2026, image: "img/collection-30.jpg", description: "A rugged ridgeline meets the high, clear light of the mountains.", credit: unsplashCredit("1464822759023-fed622ff2c3b") },
  { id: "p31", title: "A World of Green", category: "Nature", location: "Forest field notes", year: 2025, image: "img/collection-31.jpg", description: "Layered greens and filtered sunlight turn the forest into a study of texture.", credit: unsplashCredit("1469474968028-56623f02e42e") },
  { id: "p32", title: "Between Earth and Sky", category: "Travel", location: "Open-country field notes", year: 2024, image: "img/collection-32.jpg", description: "A far-reaching view captures the calm that comes with being somewhere wide open.", credit: unsplashCredit("1500534623283-312aade485b7") },
  { id: "p33", title: "The Forest Keeps Its Quiet", category: "Nature", location: "Woodland field notes", year: 2026, image: "img/collection-33.jpg", description: "A close look into the trees reveals a softer rhythm beneath the canopy.", credit: unsplashCredit("1511497584788-876760111969") },
  { id: "p34", title: "A Visitor in the Clearing", category: "Wildlife", location: "Wildlife field notes", year: 2025, image: "img/collection-34.jpg", description: "A quiet encounter reminds us that the landscape is never quite empty.", credit: unsplashCredit("1472396961693-142e6e269027") },
  { id: "p35", title: "A Path Through the Trees", category: "Nature", location: "Forest field notes", year: 2024, image: "img/collection-35.jpg", description: "Light slips between the trunks and marks a way deeper into the woods.", credit: unsplashCredit("1441974231531-c6227db76b6e") },
  { id: "p36", title: "The Shape of a Wave", category: "Seascape", location: "Open-water field notes", year: 2026, image: "img/collection-36.jpg", description: "The ocean folds into shifting lines, each one gone almost as soon as it appears.", credit: unsplashCredit("1518837695005-2083093ee35b") },
  { id: "p37", title: "Where the Tide Leaves Its Mark", category: "Seascape", location: "Coastal field notes", year: 2025, image: "img/collection-37.jpg", description: "A bright shoreline records the tide in patterns of foam, sand, and blue.", credit: unsplashCredit("1507525428034-b723cf961d3e") },
  { id: "p38", title: "Saltwater Morning", category: "Travel", location: "Island field notes", year: 2024, image: "img/collection-38.jpg", description: "A coastal view catches the changing color of water in the early light.", credit: unsplashCredit("1473116763249-2faaef81ccda") },
  { id: "p39", title: "Small Things in Bloom", category: "Nature", location: "Garden field notes", year: 2026, image: "img/collection-39.jpg", description: "A close study of flowers finds a whole landscape inside a few delicate details.", credit: unsplashCredit("1490750967868-88aa4486c946") },
  { id: "p40", title: "The Day Slows Down", category: "Landscape", location: "Sunset field notes", year: 2025, image: "img/collection-40.jpg", description: "As daylight fades, the horizon softens into warm tones and long shadows.", credit: unsplashCredit("1490730141103-6cac27aaab94") },
  { id: "p41", title: "Light Finds a Way In", category: "Nature", location: "Woodland field notes", year: 2024, image: "img/collection-41.jpg", description: "A patch of sunlight opens up the forest and makes the green feel almost luminous.", credit: unsplashCredit("1502082553048-f009c37129b9") },
  { id: "p42", title: "A Colder Kind of Blue", category: "Landscape", location: "Alpine field notes", year: 2026, image: "img/collection-42.jpg", description: "Snow and shadow give the mountain a spare, striking geometry.", credit: unsplashCredit("1519681393784-d120267933ba") },
  { id: "p43", title: "A Sky Without Edges", category: "Culture", location: "Night-sky field notes", year: 2025, image: "img/collection-43.jpg", description: "A distant view of the cosmos makes the familiar world feel wonderfully small.", credit: unsplashCredit("1462331940025-496dfbfc7564") },
  { id: "p44", title: "A Landmark in the Light", category: "Architecture", location: "City field notes", year: 2024, image: "img/collection-44.jpg", description: "Shape and shadow turn a familiar built form into a study of changing light.", credit: unsplashCredit("1518709268805-4e9042af9f23") },
  { id: "p45", title: "The Mountain Holds the Morning", category: "Landscape", location: "Lakeside field notes", year: 2026, image: "img/collection-45.jpg", description: "A still body of water holds the mountains for a moment before the day moves on.", credit: unsplashCredit("1493246507139-91e8fad9978e") },
  { id: "p46", title: "Across the High Country", category: "Travel", location: "High-country field notes", year: 2025, image: "img/collection-46.jpg", description: "The view opens across a distant range, inviting the eye to keep wandering.", credit: unsplashCredit("1510798831971-661eb04b3739") },
  { id: "p47", title: "The City Rises", category: "Architecture", location: "Urban field notes", year: 2024, image: "img/collection-47.jpg", description: "A city view turns vertical lines and distant rooftops into a layered composition.", credit: unsplashCredit("1483728642387-6c3bdd6c93e5") },
  { id: "p48", title: "Between the Buildings", category: "Street", location: "City field notes", year: 2026, image: "img/collection-48.jpg", description: "Looking upward reveals a quieter conversation between the streets and the sky.", credit: unsplashCredit("1480714378408-67cf0d13bc1b") },
  { id: "p49", title: "After the Rush", category: "Street", location: "Night-city field notes", year: 2025, image: "img/collection-49.jpg", description: "City lights take over after sunset and give familiar streets a different pulse.", credit: unsplashCredit("1519501025264-65ba15a82390") },
  { id: "p50", title: "Built to Catch the Eye", category: "Architecture", location: "Architecture field notes", year: 2024, image: "img/collection-50.jpg", description: "A clean architectural form makes a graphic study of proportion and shadow.", credit: unsplashCredit("1518005020951-eccb494ad742") },
  { id: "p51", title: "A Green Place to Pause", category: "Nature", location: "Forest field notes", year: 2026, image: "img/collection-51.jpg", description: "A quiet pocket of green offers a pause from the movement beyond the frame.", credit: unsplashCredit("1523712999610-f77fbcfc3843") },
  { id: "p52", title: "The First Cup", category: "Food", location: "Cafe field notes", year: 2025, image: "img/collection-52.jpg", description: "The day begins slowly with a warm cup and a little room to think.", credit: unsplashCredit("1494526585095-c41746248156") },
  { id: "p53", title: "A Table for the Evening", category: "Food", location: "Restaurant field notes", year: 2024, image: "img/collection-53.jpg", description: "Warm light and a thoughtfully set table turn an ordinary meal into an occasion.", credit: unsplashCredit("1517248135467-4c7edcad34c4") },
  { id: "p54", title: "Color on the Plate", category: "Food", location: "Kitchen field notes", year: 2026, image: "img/collection-54.jpg", description: "Fresh ingredients and rich colors make a small still life ready to be shared.", credit: unsplashCredit("1504674900247-0877df9cc836") },
  { id: "p55", title: "The Afternoon Pause", category: "Food", location: "Cafe field notes", year: 2025, image: "img/collection-55.jpg", description: "A quiet coffee break becomes its own kind of daily ritual.", credit: unsplashCredit("1494438639946-1ebd1d20bf85") },
  { id: "p56", title: "Before the Room Fills", category: "Food", location: "Restaurant field notes", year: 2024, image: "img/collection-56.jpg", description: "An empty room holds the anticipation of conversations still to come.", credit: unsplashCredit("1555396273-367ea4eb4db5") },
  { id: "p57", title: "A Face in Soft Light", category: "Portrait", location: "Portrait field notes", year: 2026, image: "img/collection-57.jpg", description: "A relaxed portrait lets expression and natural light do the talking.", credit: unsplashCredit("1500648767791-00dcc994a43e") },
  { id: "p58", title: "The Look Between Moments", category: "Portrait", location: "Portrait field notes", year: 2025, image: "img/collection-58.jpg", description: "A quiet portrait finds its story in a thoughtful glance and a pause.", credit: unsplashCredit("1531123897727-8f129e1688ce") },
  { id: "p59", title: "Easy Company", category: "Portrait", location: "Portrait field notes", year: 2024, image: "img/collection-59.jpg", description: "An informal portrait keeps the warmth and character of a passing moment.", credit: unsplashCredit("1535713875002-d1d0cf377fde") },
  { id: "p60", title: "A Little More Sunlight", category: "Portrait", location: "Portrait field notes", year: 2026, image: "img/collection-60.jpg", description: "Soft daylight and an open expression make a simple portrait feel generous.", credit: unsplashCredit("1524504388940-b1c1722653e1") },
  { id: "p61", title: "A Study in Presence", category: "Portrait", location: "Portrait field notes", year: 2025, image: "img/collection-61.jpg", description: "A close portrait gives the smallest details space to hold our attention.", credit: unsplashCredit("1544005313-94ddf0286df2") },
];

const lightMoods = [
  { id: "dawn", label: "Dawn", title: "A fresh start", copy: "The first light is quiet and generous, turning the ridgeline into a soft horizon of possibility.", intensity: 32, accent: "#7d8f67", photoId: "p01" },
  { id: "daylight", label: "Daylight", title: "An honest view", copy: "The scene opens up in clear, steady color, letting detail and texture carry the story.", intensity: 68, accent: "#5f6d82", photoId: "p13" },
  { id: "golden", label: "Golden", title: "A warmer pause", copy: "The light turns amber and cinematic, softening edges and making every frame feel like a memory.", intensity: 82, accent: "#b37a58", photoId: "p19" },
  { id: "night", label: "Night", title: "The hush after dark", copy: "Silence settles in, and the sky becomes a patient, wide field of contrast and wonder.", intensity: 24, accent: "#495a63", photoId: "p02" }
];

const storyNotes = [
  { photoId: "p03", badge: "01 · Picked up in the field", category: "Landscape", title: "The quiet before the valley wakes", quote: "A frame can hold the moment before the world fully wakes up.", location: "Lake Bled, Slovenia", year: 2025, tags: ["Stillness", "Reflection", "Morning"] },
  { photoId: "p20", badge: "02 · Street memory", category: "Culture", title: "Noise becomes a story", quote: "The city is loud, but every face is already writing a chapter.", location: "New Orleans, USA", year: 2026, tags: ["Movement", "Crowd", "Rhythm"] },
  { photoId: "p06", badge: "03 · Portrait study", category: "Portrait", title: "A little room, a little light", quote: "Some portraits are made with a camera, but shaped by comfort.", location: "Tampa, Florida", year: 2025, tags: ["Portrait", "Natural light", "Pause"] },
  { photoId: "p15", badge: "04 · Wind note", category: "Landscape", title: "The desert keeps moving", quote: "Even in a still photograph, the land is always still changing.", location: "Sahara, Morocco", year: 2024, tags: ["Texture", "Dunes", "Wind"] },
  { photoId: "p22", badge: "05 · Weather report", category: "Nature", title: "Mist teaches patience", quote: "The mountain reveals itself only when it decides to be seen.", location: "Scottish Highlands", year: 2024, tags: ["Mist", "Mountain", "Slow light"] }
];

const journeyStops = [
  { photoId: "p03", meta: "Landscape · Dolomites", title: "Where the light lingers", description: "A quiet edge of the day where the mountain and the water seem to hold the same breath." },
  { photoId: "p20", meta: "Culture · New Orleans", title: "The city keeps moving", description: "Even in the noise, a crowded street becomes a shared performance that never repeats itself." },
  { photoId: "p13", meta: "Seascape · Oahu", title: "The horizon keeps opening", description: "Open water and bright sky create a feeling of distance that feels both calm and alive." },
  { photoId: "p02", meta: "Travel · Vik", title: "Dark skies, deep stillness", description: "Night light turns the land into a patient silhouette, wide and almost endless under the stars." },
  { photoId: "p06", meta: "Portrait · Tampa", title: "Warm rooms, quiet stories", description: "A familiar place becomes the setting for a softer, more intimate kind of attention." }
];

function getPhotos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === null) return starterPhotos.map(photo => ({ ...photo }));
  const photos = JSON.parse(stored);
  if (!Array.isArray(photos)) throw new Error("Saved photography records are not in the expected format.");
  if (localStorage.getItem(DATA_VERSION_KEY) !== DATA_VERSION) {
    const removedImages = new Set(["img/usf-campus-overlook.jpg", "img/usf-marshall-center.jpg"]);
    const retainedPhotos = photos.filter(photo => !removedImages.has(photo.image));
    const starterById = new Map(starterPhotos.map(photo => [photo.id, photo]));
    retainedPhotos.forEach(photo => {
      const legacyImageId = LEGACY_IMAGE_IDS[photo.id];
      const legacyImagePath = LEGACY_IMAGE_PATHS[photo.id];
      const replacement = starterById.get(photo.id);
      const hasLegacyImage = (legacyImageId && String(photo.image).includes(`photo-${legacyImageId}`))
        || (legacyImagePath && photo.image === legacyImagePath);
      if (hasLegacyImage && replacement) {
        photo.image = replacement.image;
      }
    });
    const retainedIds = new Set(retainedPhotos.map(photo => photo.id));
    const additions = starterPhotos.filter(photo => Number(photo.id.slice(1)) >= 13 && !retainedIds.has(photo.id));
    retainedPhotos.push(...additions.map(photo => ({ ...photo })));
    savePhotos(retainedPhotos);
    return retainedPhotos;
  }
  return photos;
}

function savePhotos(photos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  localStorage.setItem(DATA_VERSION_KEY, DATA_VERSION);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function updateSharedStatistics(photos) {
  const categories = new Set(photos.map(photo => photo.category));
  document.querySelectorAll("[data-stat-total]").forEach(element => { element.textContent = String(photos.length).padStart(2, "0"); });
  document.querySelectorAll("[data-stat-categories]").forEach(element => { element.textContent = String(categories.size).padStart(2, "0"); });
  document.querySelectorAll("[data-collection-total]").forEach(element => { element.textContent = String(photos.length).padStart(2, "0"); });
  document.querySelectorAll("[data-year]").forEach(element => { element.textContent = String(new Date().getFullYear()); });
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");
  if (!toggle || !navigation) return;
  function setOpen(isOpen) {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", isOpen);
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });
  navigation.addEventListener("click", event => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setOpen(false);
  });
}

function setupLightExplorer() {
  const explorer = document.querySelector("[data-light-explorer]");
  if (!explorer) return;
  const image = explorer.querySelector("#light-explorer-image");
  const label = explorer.querySelector("#light-mood-label");
  const title = explorer.querySelector("#light-mood-title");
  const copy = explorer.querySelector("#light-mood-copy");
  const meter = explorer.querySelector("#light-meter-fill");
  const location = explorer.querySelector("#light-location");
  const category = explorer.querySelector("#light-category");
  const year = explorer.querySelector("#light-year");
  const buttons = [...explorer.querySelectorAll("[data-mood]")];

  function applyMood(moodId) {
    const mood = lightMoods.find(option => option.id === moodId) || lightMoods[0];
    const photos = getPhotos();
    const photo = photos.find(entry => entry.id === mood.photoId) || photos[0];
    if (!photo) return;

    explorer.style.setProperty("--explorer-accent", mood.accent);
    image.src = photo.image;
    image.alt = photo.title;
    label.textContent = mood.label;
    title.textContent = mood.title;
    copy.textContent = mood.copy;
    meter.style.width = `${mood.intensity}%`;
    location.textContent = photo.location;
    category.textContent = photo.category;
    year.textContent = String(photo.year);

    buttons.forEach(button => {
      const isActive = button.dataset.mood === mood.id;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  const currentHour = new Date().getHours();
  let defaultMood = "dawn";
  if (currentHour >= 9 && currentHour < 16) defaultMood = "daylight";
  else if (currentHour >= 16 && currentHour < 20) defaultMood = "golden";
  else if (currentHour >= 20 || currentHour < 5) defaultMood = "night";

  applyMood(defaultMood);
  buttons.forEach(button => button.addEventListener("click", () => applyMood(button.dataset.mood)));
}

function setupStoryReel() {
  const reel = document.querySelector("[data-story-reel]");
  if (!reel) return;

  const image = reel.querySelector("#story-image");
  const badge = reel.querySelector("#story-badge");
  const category = reel.querySelector("#story-category");
  const title = reel.querySelector("#story-title");
  const quote = reel.querySelector("#story-quote");
  const location = reel.querySelector("#story-location");
  const year = reel.querySelector("#story-year");
  const tags = reel.querySelector("#story-tags");
  const shuffleButton = reel.querySelector("#shuffle-story");

  function renderStory(noteIndex) {
    const photos = getPhotos();
    const note = storyNotes[noteIndex % storyNotes.length];
    const photo = photos.find(entry => entry.id === note.photoId) || photos[0];
    if (!photo) return;

    image.src = photo.image;
    image.alt = photo.title;
    badge.textContent = note.badge;
    category.textContent = note.category;
    title.textContent = note.title;
    quote.textContent = `“${note.quote}”`;
    location.textContent = photo.location || note.location;
    year.textContent = String(photo.year || note.year);
    tags.innerHTML = note.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join("");
  }

  let activeIndex = 0;
  renderStory(activeIndex);
  shuffleButton.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % storyNotes.length;
    renderStory(activeIndex);
  });
}

function setupJourneyMap() {
  const mapSection = document.querySelector("[data-journey-map]");
  if (!mapSection) return;

  const image = mapSection.querySelector("#journey-image");
  const meta = mapSection.querySelector("#journey-meta");
  const title = mapSection.querySelector("#journey-title");
  const description = mapSection.querySelector("#journey-description");
  const stops = [...mapSection.querySelectorAll(".route-stop")];

  function updateStop(index) {
    const stop = journeyStops[index];
    const photos = getPhotos();
    const photo = photos.find(entry => entry.id === stop.photoId) || photos[0];
    if (!photo) return;

    image.src = photo.image;
    image.alt = photo.title;
    meta.textContent = stop.meta;
    title.textContent = stop.title;
    description.textContent = stop.description;

    stops.forEach((button, i) => {
      const isActive = i === index;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  stops.forEach((button, index) => button.addEventListener("click", () => updateStop(index)));
  updateStop(0);
}

function setupFrameGame() {
  const game = document.querySelector("[data-frame-game]");
  if (!game) return;

  const image = game.querySelector("#frame-game-image");
  const options = game.querySelector("#frame-game-options");
  const feedback = game.querySelector("#frame-game-feedback");
  const score = game.querySelector("#frame-game-score");
  const nextButton = game.querySelector("#frame-game-next");
  const browseLink = game.querySelector("#frame-game-browse");
  const photos = getPhotos();
  const categories = [...new Set(photos.map(photo => photo.category))];
  if (!photos.length || categories.length < 2) {
    feedback.textContent = "Add photographs in at least two categories to play.";
    options.hidden = true;
    nextButton.hidden = true;
    return;
  }

  let currentPhoto;
  let previousPhotoId;
  let correctAnswers = 0;
  let attempts = 0;

  function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const otherIndex = Math.floor(Math.random() * (index + 1));
      [items[index], items[otherIndex]] = [items[otherIndex], items[index]];
    }
    return items;
  }

  function startRound() {
    const collection = getPhotos();
    const availablePhotos = collection.filter(photo => photo.id !== previousPhotoId);
    currentPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)] || collection[0];
    previousPhotoId = currentPhoto.id;

    const distractors = shuffle([...new Set(collection.map(photo => photo.category))]
      .filter(category => category !== currentPhoto.category))
      .slice(0, 2);
    const answers = shuffle([currentPhoto.category, ...distractors]);

    image.src = currentPhoto.image;
    image.alt = `Guess the category of ${currentPhoto.title}`;
    options.replaceChildren(...answers.map(category => {
      const button = document.createElement("button");
      button.className = "frame-game-option";
      button.type = "button";
      button.textContent = category;
      button.addEventListener("click", () => chooseAnswer(button, category));
      return button;
    }));
    feedback.textContent = "Look closely at the light, the lines, and the little details.";
    nextButton.hidden = true;
    browseLink.hidden = true;
  }

  function chooseAnswer(selectedButton, answer) {
    if (!currentPhoto || selectedButton.disabled) return;
    attempts += 1;
    const isCorrect = answer === currentPhoto.category;
    if (isCorrect) correctAnswers += 1;
    score.textContent = `${correctAnswers} correct · ${attempts} tried`;

    options.querySelectorAll("button").forEach(button => {
      button.disabled = true;
      if (button.textContent === currentPhoto.category) button.classList.add("is-correct");
    });
    if (!isCorrect) selectedButton.classList.add("is-wrong");

    feedback.textContent = isCorrect
      ? `Exactly — ${currentPhoto.title} is ${currentPhoto.category.toLowerCase()}. ${currentPhoto.description}`
      : `A thoughtful guess. This is ${currentPhoto.category.toLowerCase()}: ${currentPhoto.title}. ${currentPhoto.description}`;
    browseLink.href = `portfolio.html?category=${encodeURIComponent(currentPhoto.category)}`;
    browseLink.hidden = false;
    nextButton.hidden = false;
  }

  nextButton.addEventListener("click", startRound);
  startRound();
}

function setupGallery() {
  const grid = document.querySelector("#photo-grid");
  if (!grid) return;
  const search = document.querySelector("#photo-search");
  const category = document.querySelector("#category-filter");
  const sort = document.querySelector("#sort-order");
  const count = document.querySelector("#gallery-count");
  const empty = document.querySelector("#gallery-empty");
  const dialog = document.querySelector("#photo-dialog");
  const requestedPhotoId = new URLSearchParams(window.location.search).get("photo");
  const categories = [...new Set(getPhotos().map(photo => photo.category))].sort();
  categories.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    category.append(option);
  });
  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  const matchingCategory = [...category.options].find(option => option.value.toLocaleLowerCase() === (requestedCategory || "").toLocaleLowerCase());
  if (matchingCategory) category.value = matchingCategory.value;

  function showPhoto(photo) {
    if (!photo) return;
    document.querySelector("#dialog-image").src = photo.image;
    document.querySelector("#dialog-image").alt = photo.title;
    document.querySelector("#dialog-category").textContent = `${photo.category} · ${photo.location}`;
    document.querySelector("#dialog-title").textContent = photo.title;
    document.querySelector("#dialog-description").textContent = photo.description;
    document.querySelector("#dialog-location").textContent = photo.location;
    document.querySelector("#dialog-year").textContent = photo.year;
    document.querySelector("#dialog-camera").textContent = photo.camera || "Not recorded";
    const credit = document.querySelector("#dialog-credit");
    const creditText = photo.credit?.author === "Unsplash"
      ? "Image from Unsplash."
      : photo.credit ? `Photo by ${escapeHTML(photo.credit.author)}.` : "";
    credit.innerHTML = photo.credit
      ? `${creditText} <a href="${escapeHTML(photo.credit.source)}" target="_blank" rel="noopener noreferrer">Source</a> · <a href="${escapeHTML(photo.credit.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(photo.credit.license)}</a>.`
      : "";
    dialog.showModal();
  }

  function render() {
    let photos = getPhotos();
    const query = search.value.trim().toLocaleLowerCase();
    if (category.value !== "all") photos = photos.filter(photo => photo.category === category.value);
    if (query) photos = photos.filter(photo => [photo.title, photo.location, photo.category, photo.camera].some(value => String(value || "").toLocaleLowerCase().includes(query)));
    if (sort.value === "oldest") photos.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
    else if (sort.value === "title") photos.sort((a, b) => a.title.localeCompare(b.title));
    else photos.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    count.textContent = `${photos.length} ${photos.length === 1 ? "photograph" : "photographs"} in this view`;
    empty.hidden = photos.length !== 0;
    grid.innerHTML = photos.map(photo => `<button class="gallery-card" type="button" data-photo-id="${escapeHTML(photo.id)}" aria-label="View ${escapeHTML(photo.title)}"><span class="gallery-image"><img src="${escapeHTML(photo.image)}" alt="${escapeHTML(photo.title)}" loading="lazy"><span>${escapeHTML(photo.location)}</span></span><span class="gallery-card-copy"><span><p>${escapeHTML(photo.category)} · ${escapeHTML(photo.year)}</p><h2>${escapeHTML(photo.title)}</h2></span><time>${escapeHTML(photo.year)}</time></span></button>`).join("");
    grid.querySelectorAll(".gallery-card").forEach(button => button.addEventListener("click", () => {
      const photo = getPhotos().find(entry => entry.id === button.dataset.photoId);
      showPhoto(photo);
    }));
  }

  [search, category, sort].forEach(control => control.addEventListener("input", render));
  document.querySelector("#clear-filters").addEventListener("click", () => {
    search.value = "";
    category.value = "all";
    sort.value = "newest";
    render();
  });
  document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => {
    if (!new URLSearchParams(window.location.search).has("photo")) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("photo");
    history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  });
  window.addEventListener("storage", event => { if (event.key === STORAGE_KEY) render(); });
  render();
  if (requestedPhotoId) showPhoto(getPhotos().find(photo => photo.id === requestedPhotoId));
}

function setupManager() {
  const form = document.querySelector("#photo-form");
  if (!form) return;
  const field = id => document.querySelector(`#${id}`);
  const list = field("records-list");
  const feedback = field("form-feedback");
  const empty = field("records-empty");
  const count = field("record-count");
  const submit = field("submit-photo");
  const categoryOptions = ["Landscape", "Portrait", "Street", "Travel", "Architecture", "Wildlife", "Seascape", "Nature", "Food", "Culture", "USF"];

  function resetForm() {
    form.reset();
    field("photo-id").value = "";
    field("photo-year").value = String(new Date().getFullYear());
    field("form-heading").textContent = "Add a photograph";
    field("form-mode").textContent = "NEW RECORD";
    submit.innerHTML = 'Add to collection <span aria-hidden="true">↗</span>';
    field("cancel-edit").hidden = true;
  }

  function render() {
    const photos = getPhotos();
    count.textContent = `(${photos.length})`;
    empty.hidden = photos.length > 0;
    list.innerHTML = [...photos].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title)).map(photo => `<article class="record-row"><img src="${escapeHTML(photo.image)}" alt="" loading="lazy"><div class="record-info"><p>${escapeHTML(photo.category)} · ${escapeHTML(photo.year)}</p><h3>${escapeHTML(photo.title)}</h3><span>${escapeHTML(photo.location)}</span></div><div class="record-actions"><button type="button" data-edit="${escapeHTML(photo.id)}">Edit</button><button class="delete-record" type="button" data-delete="${escapeHTML(photo.id)}">Delete</button></div></article>`).join("");
    list.querySelectorAll("[data-edit]").forEach(button => button.addEventListener("click", () => {
      const photo = getPhotos().find(entry => entry.id === button.dataset.edit);
      if (!photo) return;
      field("photo-id").value = photo.id;
      field("photo-title").value = photo.title;
      field("photo-category").value = photo.category;
      field("photo-year").value = photo.year;
      field("photo-location").value = photo.location;
      field("photo-image").value = new URL(photo.image, window.location.href).href;
      field("photo-description").value = photo.description;
      field("photo-camera").value = photo.camera || "";
      field("form-heading").textContent = "Update photograph";
      field("form-mode").textContent = "EDITING RECORD";
      submit.innerHTML = 'Save changes <span aria-hidden="true">↗</span>';
      field("cancel-edit").hidden = false;
      field("photo-title").focus();
    }));
    list.querySelectorAll("[data-delete]").forEach(button => button.addEventListener("click", () => {
      const photo = getPhotos().find(entry => entry.id === button.dataset.delete);
      if (!photo) return;
      if (!window.confirm(`Remove “${photo.title}” from the collection?`)) return;
      savePhotos(getPhotos().filter(entry => entry.id !== photo.id));
      if (field("photo-id").value === photo.id) resetForm();
      feedback.classList.remove("error");
      feedback.textContent = "Photograph removed from this browser’s collection.";
      render();
      updateSharedStatistics(getPhotos());
    }));
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = {
      title: field("photo-title").value.trim(),
      category: field("photo-category").value,
      location: field("photo-location").value.trim(),
      year: Number(field("photo-year").value),
      image: field("photo-image").value.trim(),
      description: field("photo-description").value.trim(),
      camera: field("photo-camera").value.trim()
    };
    if (!categoryOptions.includes(data.category) || !Number.isInteger(data.year) || data.year < 1900 || data.year > 2100) {
      feedback.textContent = "Check the category and year before saving.";
      feedback.classList.add("error");
      return;
    }
    const photos = getPhotos();
    const editingId = field("photo-id").value;
    if (editingId) {
      const index = photos.findIndex(photo => photo.id === editingId);
      if (index < 0) {
        feedback.textContent = "This record no longer exists. Refresh the collection and try again.";
        feedback.classList.add("error");
        return;
      }
      photos[index] = { ...photos[index], ...data };
    } else {
      data.id = `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      photos.unshift(data);
    }
    savePhotos(photos);
    render();
    updateSharedStatistics(photos);
    feedback.classList.remove("error");
    feedback.textContent = editingId ? "Changes saved to this browser." : "Photograph added to this browser’s collection.";
    resetForm();
  });

  field("cancel-edit").addEventListener("click", resetForm);
  window.addEventListener("storage", event => { if (event.key === STORAGE_KEY) render(); });
  render();
}

function setupAnalytics() {
  const totalElement = document.querySelector("#metric-total");
  if (!totalElement) return;
  const photos = getPhotos();
  const categories = countBy(photos, photo => photo.category);
  const years = countBy(photos, photo => String(photo.year));
  const locations = countBy(photos, photo => photo.location);
  const yearsSorted = Object.keys(years).sort();
  const categoriesSorted = Object.keys(categories).sort();
  totalElement.textContent = String(photos.length);
  document.querySelector("#metric-categories").textContent = String(Object.keys(categories).length);
  document.querySelector("#metric-locations").textContent = String(Object.keys(locations).length);
  document.querySelector("#metric-years").textContent = String(Object.keys(years).length);

  if (typeof Chart === "undefined") {
    document.querySelector("#chart-error").hidden = false;
    return;
  }
  const palette = ["#68735a", "#b47753", "#929a80", "#cfb781", "#53666a", "#b8a79a", "#7f7566"];
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#50534d", boxWidth: 10, padding: 16, font: { family: "DM Sans", size: 10 } } },
      tooltip: { backgroundColor: "#20241f", padding: 11, titleFont: { family: "DM Sans" }, bodyFont: { family: "DM Sans" } }
    }
  };
  new Chart(document.querySelector("#category-chart"), {
    type: "doughnut",
    data: { labels: Object.keys(categories), datasets: [{ data: Object.values(categories), backgroundColor: palette, borderColor: "#f4f2ed", borderWidth: 3, hoverOffset: 5 }] },
    options: { ...commonOptions, cutout: "67%", plugins: { ...commonOptions.plugins, legend: { ...commonOptions.plugins.legend, position: "bottom" } } }
  });
  new Chart(document.querySelector("#year-chart"), {
    type: "bar",
    data: { labels: Object.keys(years).sort(), datasets: [{ label: "Photographs", data: Object.keys(years).sort().map(year => years[year]), backgroundColor: "#68735a", borderRadius: 2, maxBarThickness: 54 }] },
    options: { ...commonOptions, scales: chartScales(), plugins: { ...commonOptions.plugins, legend: { display: false } } }
  });
  const sortedLocations = Object.entries(locations).sort((a, b) => b[1] - a[1]).slice(0, 8);
  new Chart(document.querySelector("#location-chart"), {
    type: "bar",
    data: { labels: sortedLocations.map(([name]) => name), datasets: [{ label: "Photographs", data: sortedLocations.map(([, amount]) => amount), backgroundColor: "#929a80", borderRadius: 2, maxBarThickness: 30 }] },
    options: { ...commonOptions, indexAxis: "y", scales: chartScales(), plugins: { ...commonOptions.plugins, legend: { display: false } } }
  });
  const categoryYearColors = ["#68735a", "#b47753", "#929a80", "#cfb781", "#53666a", "#b8a79a", "#7f7566", "#9c745d", "#aab19a", "#596e72", "#d2b989"];
  new Chart(document.querySelector("#category-year-chart"), {
    type: "bar",
    data: {
      labels: yearsSorted,
      datasets: categoriesSorted.map((category, index) => ({
        label: category,
        data: yearsSorted.map(year => photos.filter(photo => photo.category === category && String(photo.year) === year).length),
        backgroundColor: categoryYearColors[index % categoryYearColors.length],
        borderRadius: 2
      }))
    },
    options: {
      ...commonOptions,
      scales: {
        x: { ...chartScales().x, stacked: true },
        y: { ...chartScales().y, stacked: true }
      }
    }
  });
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function chartScales() {
  const ticks = { color: "#777a71", font: { family: "DM Sans", size: 9 } };
  return {
    x: { beginAtZero: true, ticks: { ...ticks, precision: 0 }, grid: { color: "rgba(32,36,31,.08)" }, border: { display: false } },
    y: { ticks, grid: { display: false }, border: { display: false } }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  updateSharedStatistics(getPhotos());
  setupLightExplorer();
  setupStoryReel();
  setupJourneyMap();
  setupFrameGame();
  setupGallery();
  setupManager();
  setupAnalytics();
});
