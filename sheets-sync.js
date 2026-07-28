/* =========================================================================
   Googleスプレッドシート連携
   =========================================================================
   data.js の sheetsSyncConfig にCSV公開URLを設定すると、そちらのデータで
   animeData / mangaData を上書きする。URL未設定・通信失敗時はフォールバック
   （data.js の animeData / mangaData）がそのまま使われるため、
   サイトが真っ白になることはない。

   列名は「完全一致」ではなく「キーワードを含むか」で自動的に探す。
   スプレッドシートの見出し文言を多少書き換えても壊れない。
   ========================================================================= */

const SheetsSync = (() => {
  const FETCH_TIMEOUT_MS = 9000;
  const SAFETY_MAX_ROWS = 1000;

  // 一度どれかの項目に使われた列は、他の項目の候補から除外される。
  // 具体的なキーワードを先に、広い意味になりがちなキーワードを後ろに置く。
  const ITEM_KEYWORDS = [
    ["image", ["画像", "写真"]],
    ["video", ["PV", "動画"]],
    ["official", ["公式", "リンク"]],
    ["recommend", ["おすすめ", "推し"]],
    ["rating", ["評価", "点数"]],
    ["comment", ["感想", "ひとこと", "コメント"]],
    ["status", ["視聴状況", "進捗"]],
    ["reading", ["よみ", "フリガナ", "読み"]],
    ["title", ["タイトル", "作品名"]],
  ];

  async function fetchWithTimeout(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
      if (!res.ok) throw new Error("HTTPエラー: " + res.status);
      return await res.text();
    } finally {
      clearTimeout(timer);
    }
  }

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function fetchWithRetry(url) {
    try {
      return await fetchWithTimeout(url);
    } catch (err) {
      await wait(700);
      return await fetchWithTimeout(url);
    }
  }

  // CSVパーサー（ダブルクォート・カンマ入りの値に対応した最小実装）
  function parseCsv(text) {
    const rows = [];
    let row = [], field = "", inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i], next = text[i + 1];
      if (inQuotes) {
        if (c === '"' && next === '"') { field += '"'; i++; }
        else if (c === '"') { inQuotes = false; }
        else { field += c; }
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(field); field = "";
      } else if (c === "\r") {
        // 無視
      } else if (c === "\n") {
        row.push(field); rows.push(row); row = []; field = "";
      } else {
        field += c;
      }
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows.filter((r) => r.some((v) => v !== ""));
  }

  // ヘッダー行からキーワードを含む列インデックスを判定する
  function detectColumns(header) {
    const used = new Set();
    const map = {};
    for (const [key, keywords] of ITEM_KEYWORDS) {
      const list = Array.isArray(keywords) ? keywords : [keywords];
      let found = -1;
      for (let i = 0; i < header.length; i++) {
        if (used.has(i)) continue;
        if (list.some((kw) => header[i].includes(kw))) { found = i; break; }
      }
      if (found !== -1) { map[key] = found; used.add(found); }
    }
    return map;
  }

  function toBool(v) {
    const s = String(v || "").trim();
    return s === "TRUE" || s === "true" || s === "1" || s === "○" || s === "✓" || s === "チェック";
  }

  function toRatingOrNull(v) {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  }

  function rowsToItems(rows) {
    if (!rows.length) return [];
    const header = rows[0];
    const map = detectColumns(header);
    const items = [];
    for (let i = 1; i < rows.length && i <= SAFETY_MAX_ROWS; i++) {
      const r = rows[i];
      const title = map.title !== undefined ? (r[map.title] || "").trim() : "";
      const image = map.image !== undefined ? (r[map.image] || "").trim() : "";
      if (!title || !image) continue; // 最低限タイトルと画像が無い行はスキップ
      items.push({
        title,
        image,
        video: map.video !== undefined ? (r[map.video] || "").trim() : "",
        official: map.official !== undefined ? (r[map.official] || "").trim() : "",
        recommend: map.recommend !== undefined ? toBool(r[map.recommend]) : false,
        rating: map.rating !== undefined ? toRatingOrNull(r[map.rating]) : null,
        comment: map.comment !== undefined ? (r[map.comment] || "").trim() : "",
        status: map.status !== undefined ? (r[map.status] || "").trim() : "",
        reading: map.reading !== undefined ? (r[map.reading] || "").trim() : "",
      });
    }
    return items;
  }

  /**
   * CSV URLからデータを取得する。失敗・未設定時は null を返す（呼び出し側でフォールバックを使う）。
   */
  async function loadItems(csvUrl) {
    if (!csvUrl) return null;
    try {
      const text = await fetchWithRetry(csvUrl);
      const rows = parseCsv(text);
      const items = rowsToItems(rows);
      return items.length ? items : null;
    } catch (e) {
      console.warn("スプレッドシートの取得に失敗したため、フォールバックデータを使用します。", e);
      return null;
    }
  }

  return { loadItems };
})();
