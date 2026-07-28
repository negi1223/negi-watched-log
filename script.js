/* =========================================================================
   共通表示ロジック（アニメページ・漫画ページの両方で使用）
   PAGE_TYPE は各HTML側で "anime" または "manga" を指定しておく

   検索・評価絞り込みに対応。件数が増えても1ページで完結できるよう、
   一覧は「もっと見る」ボタンで少しずつ表示件数を増やす方式にしている
   （新しいHTMLページを増やさずに済むようにするため）。

   作品カードをクリックすると詳細モーダル（PV・評価・感想・公式サイト）を開く。
   ========================================================================= */

(function () {
  const isAnime = PAGE_TYPE === "anime";
  const imageFolder = isAnime ? "images/anime/" : "images/manga/";
  const csvUrl = isAnime ? sheetsSyncConfig.animeCsvUrl : sheetsSyncConfig.mangaCsvUrl;
  const fallbackData = isAnime ? animeData : mangaData;

  const PAGE_SIZE = 30;

  const listEl = document.getElementById("card-list");
  const indexListEl = document.getElementById("index-list");
  const countEl = document.getElementById("item-count");
  const searchInput = document.getElementById("search-input");
  const ratingFilter = document.getElementById("rating-filter");
  const sortSelect = document.getElementById("sort-select");
  const loadMoreBtn = document.getElementById("load-more");

  let masterItems = [];
  let filteredItems = [];
  let visibleCount = 0;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function cardHtml(item, index) {
    const anchorId = "work-" + index;
    const badge = item.recommend ? '<span class="card__badge">おすすめ</span>' : "";
    const rating =
      item.rating !== null && item.rating !== undefined && item.rating !== ""
        ? `<div class="card__rating" aria-label="評価">★ ${escapeHtml(item.rating)} / 10</div>`
        : "";
    const status = item.status ? `<div class="card__status">${escapeHtml(item.status)}</div>` : "";

    return `
      <article class="card" id="${anchorId}">
        <button type="button" class="card__media" data-index="${index}" aria-label="${escapeHtml(item.title)}の詳細を見る">
          <img src="${imageFolder}${encodeURI(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
          ${badge}
        </button>
        <div class="card__body">
          <button type="button" class="card__title" data-index="${index}">${escapeHtml(item.title)}</button>
          ${rating}
          ${status}
        </div>
      </article>`;
  }

  function sortItems(items, mode) {
    const sorted = items.slice();
    if (mode === "kana") {
      sorted.sort((a, b) => (a.reading || a.title).localeCompare(b.reading || b.title, "ja"));
    } else if (mode === "rating") {
      sorted.sort((a, b) => {
        const ar = a.rating === null || a.rating === undefined || a.rating === "" ? -Infinity : Number(a.rating);
        const br = b.rating === null || b.rating === undefined || b.rating === "" ? -Infinity : Number(b.rating);
        return br - ar;
      });
    }
    // "original" はそのまま（並び替えなし）
    return sorted;
  }

  function indexItemHtml(item, index) {
    const cls = item.recommend ? "index-list__link index-list__link--recommend" : "index-list__link";
    return `<li><a class="${cls}" data-index="${index}" href="#work-${index}">${escapeHtml(item.title)}</a></li>`;
  }

  function renderCards() {
    const visible = filteredItems.slice(0, visibleCount);
    listEl.innerHTML = visible.map(cardHtml).join("");
    loadMoreBtn.style.display = visibleCount < filteredItems.length ? "" : "none";
  }

  function renderAll() {
    if (indexListEl) {
      indexListEl.innerHTML = filteredItems.map(indexItemHtml).join("");
    }
    if (countEl) {
      countEl.textContent = String(filteredItems.length);
    }
    renderCards();
  }

  function applyFilters() {
    const q = (searchInput && searchInput.value.trim().toLowerCase()) || "";
    const ratingValue = ratingFilter && ratingFilter.value ? ratingFilter.value : null;
    const isMinRating = ratingValue === "10+";
    const ratingNumber = ratingValue !== null ? parseInt(ratingValue, 10) : null;

    filteredItems = masterItems.filter((item) => {
      if (q && !item.title.toLowerCase().includes(q)) return false;
      if (ratingNumber !== null) {
        if (item.rating === null || item.rating === undefined || item.rating === "") return false;
        const r = Number(item.rating);
        if (isMinRating ? r < ratingNumber : r !== ratingNumber) return false;
      }
      return true;
    });
    filteredItems = sortItems(filteredItems, (sortSelect && sortSelect.value) || "kana");

    visibleCount = Math.min(PAGE_SIZE, filteredItems.length);
    renderAll();
  }

  function initFilters() {
    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (ratingFilter) ratingFilter.addEventListener("change", applyFilters);
    if (sortSelect) sortSelect.addEventListener("change", applyFilters);
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        visibleCount = Math.min(visibleCount + PAGE_SIZE, filteredItems.length);
        renderCards();
      });
    }
  }

  function initDetailModal() {
    const modal = document.getElementById("detail-modal");
    const videoWrap = document.getElementById("detail-modal-video");
    const frame = document.getElementById("detail-modal-frame");
    const coverImg = document.getElementById("detail-modal-cover");
    const closeBtn = document.getElementById("detail-modal-close");
    const titleEl = document.getElementById("detail-modal-title");
    const ratingEl = document.getElementById("detail-modal-rating");
    const statusEl = document.getElementById("detail-modal-status");
    const commentEl = document.getElementById("detail-modal-comment");
    const officialEl = document.getElementById("detail-modal-official");
    if (!modal || !frame) return;

    function open(item) {
      titleEl.textContent = item.title;

      if (item.rating !== null && item.rating !== undefined && item.rating !== "") {
        ratingEl.textContent = "★ " + item.rating + " / 10";
        ratingEl.style.display = "";
      } else {
        ratingEl.style.display = "none";
      }

      if (item.status) {
        statusEl.textContent = item.status;
        statusEl.style.display = "";
      } else {
        statusEl.style.display = "none";
      }

      if (item.comment) {
        commentEl.textContent = item.comment;
        commentEl.style.display = "";
      } else {
        commentEl.style.display = "none";
      }

      if (item.official) {
        officialEl.href = item.official;
        officialEl.style.display = "";
      } else {
        officialEl.style.display = "none";
      }

      if (item.video) {
        frame.src = item.video;
        frame.style.display = "";
        coverImg.style.display = "none";
        coverImg.src = "";
        videoWrap.classList.remove("is-cover");
      } else {
        frame.src = "";
        frame.style.display = "none";
        coverImg.src = imageFolder + encodeURI(item.image);
        coverImg.alt = item.title;
        coverImg.style.display = "block";
        videoWrap.classList.add("is-cover");
      }
      videoWrap.style.display = "";

      modal.classList.add("is-open");
      document.body.classList.add("no-scroll");
    }

    function close() {
      modal.classList.remove("is-open");
      frame.src = "";
      document.body.classList.remove("no-scroll");
    }

    listEl.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-index]");
      if (!trigger) return;
      const idx = Number(trigger.dataset.index);
      const item = filteredItems[idx];
      if (item) open(item);
    });
    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function initPageTop() {
    const btn = document.getElementById("page-top");
    if (!btn) return;
    function toggle() {
      btn.classList.toggle("is-visible", window.scrollY > 300);
    }
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initAccordion() {
    const toggleBtn = document.getElementById("index-toggle");
    const panel = document.getElementById("index-panel");
    if (!toggleBtn || !panel) return;
    toggleBtn.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      toggleBtn.setAttribute("aria-expanded", String(open));
      toggleBtn.textContent = open ? "一覧 ▲" : "一覧 ▼";
    });
    panel.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-index]");
      if (!link) return;
      e.preventDefault();
      const idx = Number(link.dataset.index);
      panel.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.textContent = "一覧 ▼";

      // 絞り込み外・未表示の項目でもジャンプできるよう、必要なら表示件数を広げる
      if (idx >= visibleCount) {
        visibleCount = idx + 1;
        renderCards();
      }
      requestAnimationFrame(() => {
        const target = document.getElementById("work-" + idx);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function hideSplash() {
    const splash = document.getElementById("splash");
    if (!splash) return;
    splash.classList.add("is-hidden");
    setTimeout(() => splash.remove(), 600);
  }

  async function boot() {
    initFilters();
    initDetailModal();
    initPageTop();
    initAccordion();

    const remote = await SheetsSync.loadItems(csvUrl);
    masterItems = remote || fallbackData;
    applyFilters();
    hideSplash();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
