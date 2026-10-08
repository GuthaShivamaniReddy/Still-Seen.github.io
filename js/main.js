"use strict";

const STORAGE_KEY = "still-seen-photo-records-v1";
const DATA_VERSION_KEY = "still-seen-photo-data-version";
const DATA_VERSION = "6";
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
  document.querySelectorAll("[data-year]").forEach(element => { element.textContent = String(new Date().getFullYear()); });
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");
  if (!toggle || !navigation) return;
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });
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
      credit.innerHTML = photo.credit
        ? `Photo by ${escapeHTML(photo.credit.author)}. <a href="${escapeHTML(photo.credit.source)}" target="_blank" rel="noopener noreferrer">Source</a> · <a href="${escapeHTML(photo.credit.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(photo.credit.license)}</a>.`
        : "";
      dialog.showModal();
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
  window.addEventListener("storage", event => { if (event.key === STORAGE_KEY) render(); });
  render();
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
  setupGallery();
  setupManager();
  setupAnalytics();
});
