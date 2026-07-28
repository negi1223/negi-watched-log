/* =========================================================================
   このファイルを編集するだけでサイトの内容を更新できます。

   ★通常はこのファイルを直接編集する必要はありません。
   　Googleスプレッドシートを設定すると、そちらのデータが優先的に使われます。
   　（sheetsSyncConfig にCSV公開URLを貼るだけ。設定方法は sheets-sync.js を参照）

   ★下の animeData / mangaData は「スプレッドシート未設定・通信失敗時」に
   　表示されるフォールバックデータです。サイトが真っ白にならないための保険なので、
   　基本的にはスプレッドシート側を更新してください。

   ・画像は images/anime/ または images/manga/ にファイルを置き、
     このファイルの image には「ファイル名のみ」（フォルダ名は含めない）を書きます
   ・reading（読み）はあいうえお順の並び替えに使うひらがなです。
     空欄の場合はタイトルそのもので代用されるため、必須ではありません。
   ・status（視聴状況）は「3期まで視聴」「完走」のような自由記述です。空欄可。
   ========================================================================= */

/* -------------------------------------------------------------------------
   Googleスプレッドシート連携の設定
   空欄（""）のままなら、下の animeData / mangaData がそのまま使われます。

   【設定手順】
   ① Googleスプレッドシートを開く（アニメ用・漫画用でシートを分ける）
   ② 「ファイル」→「共有」→「ウェブに公開」
   ③ 公開するシート名を選び、形式を「カンマ区切りの値（.csv）」にして「公開」
   ④ 表示されたURLを下の animeCsvUrl / mangaCsvUrl に "" で囲んで貼り付ける
   ------------------------------------------------------------------------- */
const sheetsSyncConfig = {
  animeCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9j4584yDM5LLk9lDo_5eLti1HSd5HJ0jWX6HfFlXrtY1kBFlhrPeCItAa5F9CbPNppAodOWCKrFIN/pub?gid=0&single=true&output=csv",
  mangaCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9j4584yDM5LLk9lDo_5eLti1HSd5HJ0jWX6HfFlXrtY1kBFlhrPeCItAa5F9CbPNppAodOWCKrFIN/pub?gid=1530010379&single=true&output=csv",
};

/* -------------------------------------------------------------------------
   フォールバックデータ（アニメ）
   旧サイト（negi1223.github.io-anime1〜4）から移行した154件。
   ------------------------------------------------------------------------- */
const animeData = [
  { title: 'Dr.STONE', image: 'anime-001.webp', video: 'https://www.youtube.com/embed/2ei4KpfCOAI', official: 'https://dr-stone.jp/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'ドラゴンボール', image: 'anime-002.webp', video: 'https://www.youtube.com/embed/iTEMSYAGnwY', official: 'https://dragon-ball-official.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'イジらないで、長瀞さん', image: 'anime-003.webp', video: 'https://www.youtube.com/embed/_ueGariBWSU', official: 'https://www.nagatorosan.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '異世界おじさん', image: 'anime-004.webp', video: 'https://www.youtube.com/embed/7ZGuf4jqltQ', official: 'https://isekaiojisan.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '五等分の花嫁', image: 'anime-005.webp', video: 'https://www.youtube.com/embed/pCwfEB6PbFk', official: 'https://www.tbs.co.jp/anime/5hanayome/2nd/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'SPY×FAMILY', image: 'anime-006.webp', video: 'https://www.youtube.com/embed/h_iYEoLmgww', official: 'https://spy-family.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '彼女、お借りします', image: 'anime-007.webp', video: 'https://www.youtube.com/embed/uIfxrlJg0Jw', official: 'https://kanokari-official.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '終わりのセラフ', image: 'anime-008.webp', video: 'https://www.youtube.com/embed/_63seZTwaw8', official: 'https://owarino-seraph.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '東京リベンジャーズ', image: 'anime-009.webp', video: 'https://www.youtube.com/embed/r9M34VgTfzY', official: 'https://tokyo-revengers-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'Free!', image: 'anime-010.webp', video: 'https://www.youtube.com/embed/JNU1ehnCVP8', official: 'http://1st.iwatobi-sc.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '鬼滅の刃', image: 'anime-011.webp', video: 'https://www.youtube.com/embed/BpiILiEZuF4', official: 'https://kimetsu.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ソードアート・オンライン', image: 'anime-012.webp', video: 'https://www.youtube.com/embed/zPMtY0Oen_Y', official: 'https://www.swordart-online.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '女神寮の寮母くん。', image: 'anime-013.webp', video: 'https://www.youtube.com/embed/wuRjV2Rnnwg', official: 'https://megamiryou.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '戦×恋', image: 'anime-014.webp', video: 'https://www.youtube.com/embed/Q3mAOyEKwpU', official: 'https://val-love.com/#index', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'メイドインアビス', image: 'anime-015.webp', video: 'https://www.youtube.com/embed/MuboGrmPDIg', official: 'http://miabyss.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '七つの大罪', image: 'anime-016.webp', video: 'https://www.youtube.com/embed/qj93NtDHxyw', official: 'https://7-taizai.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '進撃の巨人', image: 'anime-017.webp', video: 'https://www.youtube.com/embed/KKzmOh4SuBc', official: 'https://shingeki.tv/season1/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '無職転生', image: 'anime-018.webp', video: 'https://www.youtube.com/embed/Qx01pn9l-6g', official: 'https://mushokutensei.jp/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'その着せ替え人形は恋をする', image: 'anime-019.webp', video: 'https://www.youtube.com/embed/qJ8GyiSJ1KU', official: 'https://bisquedoll-anime.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '見える子ちゃん', image: 'anime-020.webp', video: 'https://www.youtube.com/embed/HD_TGzj7oU8', official: 'https://mierukochan.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'テラフォーマーズ', image: 'anime-021.webp', video: 'https://www.youtube.com/embed/NtpQOUR9Owc', official: 'http://terraformars.tv/annex1/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ラブライブ!サンシャイン!!', image: 'anime-022.webp', video: 'https://www.youtube.com/embed/Sbz9EeyUOIs', official: 'https://www.lovelive-anime.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'トニカクカワイイ', image: 'anime-023.webp', video: 'https://www.youtube.com/embed/GsqgtO0vgmY', official: 'https://tonikawa.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ウマ娘　プリティーダービー　Season1だけ', image: 'anime-024.webp', video: 'https://www.youtube.com/embed/zUNadqs1qMQ', official: 'https://anime-umamusume.jp/archive/1st/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'かぐや様は告らせたい', image: 'anime-025.webp', video: 'https://www.youtube.com/embed/5Jxw_ZMn-10', official: 'https://kaguya.love/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'Steins;Gate', image: 'anime-026.webp', video: 'https://www.youtube.com/embed/27OZc-ku6is', official: 'http://steinsgate.tv/index.html', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '終末のハーレム', image: 'anime-027.webp', video: 'https://www.youtube.com/embed/Jr3UJoIKGJM', official: 'https://end-harem-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'はたらく細胞!!', image: 'anime-028.webp', video: 'https://www.youtube.com/embed/AmCUeq24iZU', official: 'https://hataraku-saibou.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'カノジョも彼女', image: 'anime-029.webp', video: 'https://www.youtube.com/embed/nPn4JX9WURw', official: 'https://kanokano-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '転生したらスライムだった件', image: 'anime-030.webp', video: 'https://www.youtube.com/embed/bXCCKubabe0', official: 'https://www.ten-sura.com/anime/tensura', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '異世界魔王と召喚少女の奴隷魔術', image: 'anime-031.webp', video: 'https://www.youtube.com/embed/4tr8NxWw7NU', official: 'https://isekaimaou-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ワンパンマン', image: 'anime-032.webp', video: 'https://www.youtube.com/embed/6Bdb1V0Io_g', official: 'https://onepunchman-anime.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '俺だけ入れる隠しダンジョン', image: 'anime-033.webp', video: 'https://www.youtube.com/embed/WugNKiiE9bc', official: 'https://kakushidungeon-anime.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '宇崎ちゃんは遊びたい！', image: 'anime-034.webp', video: 'https://www.youtube.com/embed/dM-KXdVv49s', official: 'https://uzakichan.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'うらみちお兄さん', image: 'anime-035.webp', video: 'https://www.youtube.com/embed/9SkVV1koCUI', official: 'http://uramichi-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ひぐらしのなく頃に', image: 'anime-036.webp', video: 'https://www.youtube.com/embed/ViVnzjalOsc', official: 'https://higurashianime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '監獄学園', image: 'anime-037.webp', video: 'https://www.youtube.com/embed/HSvlOPMLQFQ', official: 'http://prison-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '八月のシンデレラナイン', image: 'anime-038.webp', video: 'https://www.youtube.com/embed/IQl4wa4UNPw', official: 'https://anime-hachinai.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'らんま1/2', image: 'anime-039.webp', video: '', official: 'https://www.shopro.co.jp/license/title/203/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '境界のRINNE', image: 'anime-040.webp', video: 'https://www.youtube.com/embed/8CYHjxK8Fvs', official: 'https://anime-rinne.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '恋愛フロップス', image: 'anime-041.webp', video: 'https://www.youtube.com/embed/19pB-I1pzv8', official: 'https://loveflops.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'チェンソーマン', image: 'anime-042.webp', video: 'https://www.youtube.com/embed/q15CRdE5Bv0', official: 'https://chainsawman.dog/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '夫婦以上、恋人未満。', image: 'anime-043.webp', video: 'https://www.youtube.com/embed/3n6lD60mDyk', official: 'https://fuukoi-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'モブサイコ100', image: 'anime-044.webp', video: 'https://www.youtube.com/embed/_E0wbdZZKRc', official: 'https://mobpsycho100.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '陰の実力者になりたくて！', image: 'anime-045.webp', video: 'https://www.youtube.com/embed/H-3fre7943U', official: 'https://shadow-garden.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '田中くんはいつもけだるげ', image: 'anime-046.webp', video: 'https://www.youtube.com/embed/r0U83wtmk28', official: 'https://tanakakun.tv/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '恋愛モンスター', image: 'anime-047.webp', video: 'https://www.youtube.com/embed/eaiLeonya7E', official: 'http://hatsukoimonster.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '俺の脳内選択肢が、学園ラブコメを全力で邪魔している', image: 'anime-048.webp', video: 'https://www.youtube.com/embed/QCgAbU5Xpeg', official: 'http://noucome.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ぼっち・ざ・ろっく！', image: 'anime-049.webp', video: 'https://www.youtube.com/embed/nomJbjuQXAY', official: 'https://bocchi.rocks/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '魔法少女まどか☆マギカ', image: 'anime-050.webp', video: 'https://www.youtube.com/embed/pUhiZ63PJZA', official: 'https://www.madoka-magica.com/tv/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'トモダチゲーム', image: 'anime-051.webp', video: 'https://www.youtube.com/embed/eP2FlJtfwL8', official: 'https://tomodachi-anime.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '金装のヴェルメイユ', image: 'anime-052.webp', video: 'https://www.youtube.com/embed/0qD4rzFX_pM', official: 'https://vermeilingold.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '約束のネバーランド', image: 'anime-053.webp', video: 'https://www.youtube.com/embed/yYWEjgvNWtg', official: 'https://neverland-anime.com/1st/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '群れなせ！シートン学園', image: 'anime-054.webp', video: 'https://www.youtube.com/embed/56_mMbRCMzc', official: 'https://anime-seton.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'うちの娘の為ならば、俺はもしかしたら魔王も倒せるかもしれない。', image: 'anime-055.webp', video: 'https://www.youtube.com/embed/dbDovK5jB3E', official: 'http://uchinoko-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '俺を好きなのはお前だけかよ', image: 'anime-056.webp', video: 'https://www.youtube.com/embed/heSKEguvKJs', official: 'https://ore.ski/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '可愛ければ変態でも好きになってくれますか？', image: 'anime-057.webp', video: 'https://www.youtube.com/embed/PKkEdYA9LCQ', official: 'https://hensuki.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ゾイドワイルド', image: 'anime-058.webp', video: 'https://www.youtube.com/embed/e9VFwQgf0VU', official: 'https://anime-zoidswild.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ダンベル何キロ持てる？', image: 'anime-059.webp', video: 'https://www.youtube.com/embed/2YPtn01c66M', official: 'https://dumbbell-anime.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '厨病激発ボーイ', image: 'anime-060.webp', video: 'https://www.youtube.com/embed/XIR-nm8LmMw', official: 'http://chubyou.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '手品先輩', image: 'anime-061.webp', video: 'https://www.youtube.com/embed/kfKLC2Hdh1Q', official: 'https://tejina-senpai.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ヴィンランド・サガ', image: 'anime-062.webp', video: 'https://www.youtube.com/embed/UkJmBWvCfNU', official: 'https://vinlandsaga.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '星合の空', image: 'anime-063.webp', video: 'https://www.youtube.com/embed/3HF5qamjeMA', official: 'http://www.tbs.co.jp/anime/hoshiai/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'バディファイト', image: 'anime-064.webp', video: 'https://www.youtube.com/embed/-nH_9Fk2qGs', official: 'https://tv-aichi.co.jp/fc-buddyfight/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ド級編隊エグゼロス', image: 'anime-065.webp', video: 'https://www.youtube.com/embed/CTa9na5BDw4', official: 'https://hxeros.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '放課後ていぼう日誌', image: 'anime-066.webp', video: 'https://www.youtube.com/embed/I-4fzURroFw', official: 'https://teibotv.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '炎炎ノ消防隊', image: 'anime-067.webp', video: 'https://www.youtube.com/embed/Dpae4acLLeA', official: 'https://fireforce-anime.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ご注文はうさぎですか？', image: 'anime-068.webp', video: 'https://www.youtube.com/embed/F64S_zQOtiQ', official: 'https://gochiusa.com/bloom/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ダンジョンに出会いを求めるのは間違っているだろうか', image: 'anime-069.webp', video: 'https://www.youtube.com/embed/wxhpfkyg7_c', official: 'https://danmachi.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'Re：ゼロから始める異世界生活', image: 'anime-070.webp', video: 'https://www.youtube.com/embed/Bwq7HxrHiZU', official: 'http://re-zero-anime.jp/tv/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'ポプテピピック', image: 'anime-071.webp', video: 'https://www.youtube.com/embed/CpZhgc6cEGM', official: 'http://hoshiiro.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ひげを剃る。そして女子高生を拾う。', image: 'anime-072.webp', video: 'https://www.youtube.com/embed/yNUJercMz1Q', official: 'http://higehiro-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ブルーロック', image: 'anime-073.webp', video: 'https://www.youtube.com/embed/w4V_e3iRxds', official: 'https://bluelock-pr.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'サマータイムレンダ', image: 'anime-074.webp', video: 'https://www.youtube.com/embed/y25UYqY_1ck', official: 'https://summertime-anime.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '僕とロボコ', image: 'anime-075.webp', video: 'https://www.youtube.com/embed/BkisGcd22mY', official: 'https://boku-to-roboco.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'あやかしトライアングル', image: 'anime-076.webp', video: 'https://www.youtube.com/embed/p1x5zMw8uBI', official: 'https://ayakashitriangle-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '久保さんは僕を許さない', image: 'anime-077.webp', video: 'https://www.youtube.com/embed/hKehQK3NqHI', official: 'https://kubosan-anime.jp/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '犬になったら好きな人に拾われた。', image: 'anime-078.webp', video: 'https://www.youtube.com/embed/RZ8WWz3YG5E', official: 'https://inuhiro-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ポケットモンスターXY&Z', image: 'anime-079.webp', video: 'https://www.youtube.com/embed/YZrIbwovv48', official: 'https://www.tv-tokyo.co.jp/anime/pokemon_xyz/index2.html', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'ポケットモンスター ベストウィッシュ', image: 'anime-080.webp', video: 'https://www.youtube.com/embed/z6gXO11q3CI', official: 'https://www.tv-tokyo.co.jp/anime/pokemon_bw/index2.html', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ポケットモンスター サン＆ムーン', image: 'anime-081.webp', video: 'https://www.youtube.com/embed/PPj5Db8JqGg', official: 'https://www.tv-tokyo.co.jp/anime/pokemon_sunmoon/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ハートキャッチプリキュア！', image: 'anime-082.webp', video: 'https://www.youtube.com/embed/MAGH6UADPM0', official: 'https://www.toei-anim.co.jp/tv/hc_precure/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'スイートプリキュア♪', image: 'anime-083.webp', video: 'https://www.youtube.com/embed/Jz6LgMc_vR0', official: 'https://www.toei-anim.co.jp/tv/suite_precure/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'スマイルプリキュア！', image: 'anime-084.webp', video: 'https://www.youtube.com/embed/mtLKxl2yg4k', official: 'https://www.toei-anim.co.jp/tv/smile_precure/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ドキドキ！プリキュア', image: 'anime-085.webp', video: 'https://www.youtube.com/embed/e0wh6e6lx1A', official: 'https://www.toei-anim.co.jp/tv/dokidoki_precure/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ひろがるスカイ！プリキュア', image: 'anime-086.webp', video: 'https://www.youtube.com/embed/j0DUgBhsg_A', official: 'https://www.toei-anim.co.jp/tv/precure/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ニセコイ', image: 'anime-087.webp', video: 'https://www.youtube.com/embed/qVDTHRqtGjc', official: 'https://www.nisekoi.jp/1st/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '弱キャラ友崎くん', image: 'anime-088.webp', video: 'https://www.youtube.com/embed/iktCgoEcI_E', official: 'http://tomozaki-koushiki.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'くまクマ熊ベアー', image: 'anime-089.webp', video: 'https://www.youtube.com/embed/yCt-m4fhynM', official: 'https://kumakumakumabear.com/1st/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ハッピーシュガーライフ', image: 'anime-090.webp', video: 'https://www.youtube.com/embed/fOLR53jhgfs', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'うたの☆プリンスさまっ♪', image: 'anime-091.webp', video: 'https://www.youtube.com/embed/mwq9LRdXi3w', official: 'http://archive1000.utapri.tv/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'School Days', image: 'anime-092.webp', video: 'https://www.youtube.com/embed/88Lbk2BKl7M', official: 'https://www.marv.jp/special/schooldays-anime/index.html', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'お兄ちゃんはおしまい！', image: 'anime-093.webp', video: 'https://www.youtube.com/embed/P5siWdBumBg', official: 'https://onimai.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ドメスティックな彼女', image: 'anime-094.webp', video: 'https://www.youtube.com/embed/v-ajpK25ajw', official: 'https://www.mbs.jp/domekano/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ゆらぎ荘の幽奈さん', image: 'anime-095.webp', video: 'https://www.youtube.com/embed/aEltzCbSdrM', official: 'https://yuragisou.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '無彩限のファントム・ワールド', image: 'anime-096.webp', video: 'https://www.youtube.com/embed/Vq5shaXgf3Y', official: 'http://phantom-world.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '怪盗ジョーカー', image: 'anime-097.webp', video: 'https://www.youtube.com/embed/RYXF1D5awjw', official: 'https://s.mxtv.jp/joker/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '山田くんと7人の魔女', image: 'anime-098.webp', video: 'https://www.youtube.com/embed/1_n_k5nNA3A', official: 'https://www.ytv.co.jp/yamajo-anime/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '寄生獣 セイの格率', image: 'anime-099.webp', video: 'https://www.youtube.com/embed/5hHXtiIm6ug', official: 'https://www.vap.co.jp/kiseiju/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'まじっく快斗1412', image: 'anime-100.webp', video: 'https://www.youtube.com/embed/Pwde-WS5t4g', official: 'https://www.ytv.co.jp/magickaito/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'SSSS.DYNAZENON', image: 'anime-101.webp', video: 'https://www.youtube.com/embed/-Io4aHizWvQ', official: 'https://dynazenon.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ぼくたちは勉強ができない', image: 'anime-102.webp', video: 'https://www.youtube.com/embed/Jad4ySgl0zc', official: 'https://boku-ben.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '乙女ゲー世界はモブに厳しい世界です', image: 'anime-103.webp', video: 'https://www.youtube.com/embed/MWI9DRlSvx8', official: 'https://mobseka.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '王様ランキング', image: 'anime-104.webp', video: 'https://www.youtube.com/embed/HtnGqgW_Hig', official: 'https://osama-ranking.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '【推しの子】', image: 'anime-105.webp', video: 'https://www.youtube.com/embed/BQ28u-8c-hI', official: 'https://ichigoproduction.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'スキップとローファー', image: 'anime-106.webp', video: 'https://www.youtube.com/embed/wMZjf66OhEI', official: 'https://skip-and-loafer.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '神無き世界のカミサマ活動', image: 'anime-107.webp', video: 'https://www.youtube.com/embed/h9eJalxtjbo', official: 'https://kamikatsu-anime.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '地獄楽', image: 'anime-108.webp', video: 'https://www.youtube.com/embed/UkYTGSrtePU', official: 'https://www.jigokuraku.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '僕の心のヤバイやつ', image: 'anime-109.webp', video: 'https://www.youtube.com/embed/c-yZsNd__0E', official: 'https://bokuyaba-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'マッシュル-MASHLE-', image: 'anime-110.webp', video: 'https://www.youtube.com/embed/zl0Kiv0kuQQ', official: 'https://mashle.pw/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '山田くんとLv999の恋をする', image: 'anime-111.webp', video: 'https://www.youtube.com/embed/LpZI3j6Axlo', official: 'https://yamadalv999-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '天国大魔境', image: 'anime-112.webp', video: 'https://www.youtube.com/embed/Sld5uW_BJU4', official: 'https://tdm-anime.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '勇者が死んだ！', image: 'anime-113.webp', video: 'https://www.youtube.com/embed/mWl1PRtiTb8', official: 'https://heroisdead.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '異世界でチート能力を手にした俺は、現実世界をも無双する ～レベルアップは人生を変えた～', image: 'anime-114.webp', video: 'https://www.youtube.com/embed/PqAFnv_ZbY4', official: 'https://www.iseleve.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'ちいかわ', image: 'anime-115.webp', video: 'https://www.youtube.com/embed/m4yfCS_YBUU', official: 'https://www.anime-chiikawa.jp/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '時光代理人', image: 'anime-116.webp', video: 'https://www.youtube.com/embed/0NhDPvc08n0', official: 'https://link-click.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ようこそ実力至上主義の教室へ', image: 'anime-117.webp', video: 'https://www.youtube.com/embed/iYsx6w5PNno', official: 'http://you-zitsu.com/1st/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'デッドマウント・デスプレイ', image: 'anime-118.webp', video: 'https://www.youtube.com/embed/q6NUZPq-QcM', official: 'https://dmdp-anime.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '政宗くんのリベンジ', image: 'anime-119.webp', video: 'https://www.youtube.com/embed/lYIn-gD3Kis', official: 'https://masamune-tv.com/1st/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ゲゲゲの鬼太郎 第6期のみ', image: 'anime-120.webp', video: 'https://www.youtube.com/embed/FqUSgs0t5i0', official: 'https://www.toei-anim.co.jp/kitaro/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '僕だけがいない街', image: 'anime-121.webp', video: 'https://www.youtube.com/embed/EoSiUDkccpM', official: 'https://bokumachi-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'アルスラーン戦記', image: 'anime-122.webp', video: 'https://www.youtube.com/embed/CWL5pcfEyKk', official: 'https://arslan.jp/index2.html', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'RS計画 -Rebirth Storage-', image: 'anime-123.webp', video: 'https://www.youtube.com/embed/f2yJj-5VnuE', official: 'https://twitter.com/RSPROJECT_ANIME', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ホリミヤ', image: 'anime-124.webp', video: 'https://www.youtube.com/embed/42LiC4xY8YE', official: 'https://horimiya-anime.com/1st/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: 'AIの遺伝子', image: 'anime-125.webp', video: 'https://www.youtube.com/embed/BDxJaOEVJEk', official: 'https://ai-no-idenshi.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '好きな子がめがねを忘れた', image: 'anime-126.webp', video: 'https://www.youtube.com/embed/45lyCUdzRx4', official: 'https://anime.shochiku.co.jp/sukimega/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ゾン100 〜ゾンビになるまでにしたい100のこと〜', image: 'anime-127.webp', video: 'https://www.youtube.com/embed/GAMrUx-esS8', official: 'https://zom100.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'デキる猫は今日も憂鬱', image: 'anime-128.webp', video: 'https://www.youtube.com/embed/FIp4KGfLdrI', official: 'https://dekineko-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'てんぷる', image: 'anime-129.webp', video: 'https://www.youtube.com/embed/twhRlwa2UgM', official: 'https://temple-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '夢見る男子は現実主義者', image: 'anime-130.webp', video: 'https://www.youtube.com/embed/sUJ9hUhViBo', official: 'https://yumemirudanshi.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ライアー・ライアー', image: 'anime-131.webp', video: 'https://www.youtube.com/embed/575E5WuJrV8', official: 'https://liar-liar-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ライザのアトリエ 〜常闇の女王と秘密の隠れ家〜', image: 'anime-132.webp', video: 'https://www.youtube.com/embed/CJsHBoZRfUU', official: 'https://ar-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'Lv1魔王とワンルーム勇者', image: 'anime-133.webp', video: 'https://www.youtube.com/embed/HuJuBPFkMe0', official: 'https://lv1room.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'わたしの幸せな結婚', image: 'anime-134.webp', video: 'https://www.youtube.com/embed/NEtx5jyVfh4', official: 'https://watakon-anime.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '巨蟲列島 劇場版', image: 'anime-135.webp', video: 'https://www.youtube.com/embed/5VCRdDQrs1c?si=CH0UIl5gT_DScqdN', official: 'https://kyochu-retto.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '青春ブタ野郎は バニーガール先輩の夢を見ない', image: 'anime-136.webp', video: 'https://www.youtube.com/embed/2OTVCHpEkrc?si=ZhcI3PJ8EWr45mvI', official: 'https://ao-buta.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'アンデットアンラック', image: 'anime-137.webp', video: 'https://www.youtube.com/embed/vR_ioX_-GoQ?si=2v5vH_-_4Z-k6XCk', official: 'https://undead-unluck.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '薬屋のひとりごと', image: 'anime-138.webp', video: 'https://www.youtube.com/embed/oyHqh8ue4zw?si=b9G2G36djgIKZOmR', official: 'https://kusuriyanohitorigoto.jp/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '君のことが大大大大大好きな100人の彼女', image: 'anime-139.webp', video: 'https://www.youtube.com/embed/qYsm_HQnEYQ?si=mvMt-_lpG6rW2Quu', official: 'https://hyakkano.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '16bitセンセーション ANOTHER LAYER', image: 'anime-140.webp', video: 'https://www.youtube.com/embed/2SshK7Ed2g8?si=Dgyqt7YwoJ2gyRHb', official: 'https://16bitsensation-al.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '七つの大罪 黙示録の四騎士', image: 'anime-141.webp', video: 'https://www.youtube.com/embed/2jhgBPI22wQ?si=i3WowkUTIIM32zLg', official: 'https://7sins-4knights.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ミギとダリ', image: 'anime-142.webp', video: 'https://www.youtube.com/embed/n2lxOSphDD4?si=ozBe6rVABL2qb4eA', official: 'https://migitodali.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '俺だけレベルアップな件', image: 'anime-143.webp', video: 'https://www.youtube.com/embed/Bca7dy1Hntc?si=wdkewVKysj2rAcp7', official: 'https://sololeveling-anime.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '戦隊大失格', image: 'anime-144.webp', video: 'https://www.youtube.com/embed/CUiUxP1p7hI?si=7vPAc_FzChlMBOSo', official: 'https://sh-anime.shochiku.co.jp/anime-sentai-daishikkaku/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ブルーアーカイブ The Animation', image: 'anime-145.webp', video: 'https://www.youtube.com/embed/pGoc4_imTi0?si=kZBfJ3Lt-x7k8_8D', official: 'https://sh-anime.shochiku.co.jp/bluearchive-anime/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'Re:Monster', image: 'anime-146.webp', video: 'https://www.youtube.com/embed/1P4_hyZpElo?si=5VIGFSaHziw3BfGm', official: 'https://re-monster.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '転生したら第七王子だったので、 気ままに魔術を極めます', image: 'anime-147.webp', video: 'https://www.youtube.com/embed/aK8Gtxw-9bE?si=ft0YgA2EzhRIb3Hj', official: 'https://dainanaoji.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ハイキュー!!', image: 'anime-148.webp', video: 'https://www.youtube.com/embed/9kLRkH9zC5k?si=oqMC5bMqrR9nvwZy', official: 'https://haikyu.jp/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '中二病でも恋がしたい！', image: 'anime-149.webp', video: 'https://www.youtube.com/embed/ud0fDdXHnYc?si=liWNpSlEXDrQRzcu', official: 'https://www.anime-chu-2.com/tv/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '精霊幻想記', image: 'anime-150.webp', video: 'https://www.youtube.com/embed/Kvy48qS48qQ?si=tTC28NEhqxIl7bx8', official: 'https://seireigensouki.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '怪獣８号', image: 'anime-151.webp', video: 'https://www.youtube.com/embed/xgvWhe8cmEc?si=fdG00be1maIIavwM', official: 'https://kaiju-no8.net/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '夜のクラゲは泳げない', image: 'anime-152.webp', video: 'https://www.youtube.com/embed/1sY76sX_kZQ?si=33ZAbJc_9Roxq-2P', official: 'https://yorukura-anime.com/', recommend: true, rating: null, comment: '', reading: '', status: '' },
  { title: '終末トレインどこへいく？', image: 'anime-153.webp', video: 'https://www.youtube.com/embed/WP1HMeFxJoM?si=HfJ_us6-PHQyKofZ', official: 'https://shumatsu-train.com/', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '忘却バッテリー', image: 'anime-154.webp', video: 'https://www.youtube.com/embed/N-R73WwXUgU?si=aDLo4mSguV3cYgYu', official: 'https://boukyaku-battery.com/', recommend: false, rating: null, comment: '', reading: '', status: '' }
];

/* -------------------------------------------------------------------------
   フォールバックデータ（漫画）
   旧サイト（negi1223.github.io-manga1）の画像から作成した雛形。
   PVリンク・公式サイトリンク・評価・感想は未入力のため、
   スプレッドシート側で追記していく想定。
   ------------------------------------------------------------------------- */
const mangaData = [
  { title: 'Dr.STONE', image: 'manga-001.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'DRAGON BALL', image: 'manga-002.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'SPY×FAMILY', image: 'manga-003.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'TSUYOSHI 誰も勝てない、アイツには', image: 'manga-004.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ウィッチウォッチ', image: 'manga-005.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ダンダダン', image: 'manga-006.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ドラゴンボール超', image: 'manga-007.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'ブルーロック', image: 'manga-008.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: 'マッシュル-MASHLE-', image: 'manga-009.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '君のことが大大大大大好きな100人の彼女', image: 'manga-010.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '怪獣8号', image: 'manga-011.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '水溜まりに浮かぶ島', image: 'manga-012.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '監獄学園', image: 'manga-013.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '約束のネバーランド', image: 'manga-014.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '食糧人類', image: 'manga-015.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' },
  { title: '鬼滅の刃', image: 'manga-016.webp', official: '', recommend: false, rating: null, comment: '', reading: '', status: '' }
];
