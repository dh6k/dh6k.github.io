/**
 * Keep Android Open – Countdown Banner
 * Licensed under the GNU General Public License v3.0
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * A self-contained, embeddable script that injects a countdown banner into any
 * web page. No external dependencies.
 *
 * Usage:
 *   <script src="https://keepandroidopen.org/banner.js"></script>
 *
 * Query parameters (appended to the script src URL):
 *   lang=fr       Override the browser language (default: auto-detected)
 *   id=myDiv      Insert the banner inside the element with this id
 *                 (default: prepend to <body>)
 *   size=normal   Banner size: "normal" (default), "mini" or "minimal"
 *   link=URL      Make the banner text a link (default: https://keepandroidopen.org)
 *                 Set link=none to disable the link
 *   hidebutton=on Show an X close button (default: on)
 *                 Set hidebutton=off to hide the close button
 *   animation=on  Add animation to border of banner (default: on)
 *                 Set animation=off to disable
 */
(function () {
  "use strict";

  // ── Localized banner strings ──────────────────────────────────────────
  var messages = {
    fa:      "دوران خوب قدیمی اندروید تا {countdown} دیگر به پایان می‌رسد. در حالی که بعضی‌ها هنوز مشغول ضربه زدن به خودشان هستند، ما حاضر نیستیم دست روی دست بگذاریم و تماشا کنیم.",
    ar:      "ينتهي عصر أندرويد الجميل القديم خلال {countdown}. وبينما لا يزال البعض منشغلًا بإيذاء نفسه، فإننا نرفض الوقوف مكتوفي الأيدي والمشاهدة.",
    he:      "עידן אנדרואיד הישן והטוב יסתיים בעוד {countdown}. בזמן שחלק עדיין עסוקים בלירות לעצמם ברגל, אנחנו מסרבים לעמוד מנגד ולצפות.",
    en:      "The good old Android era ends in {countdown}. While some are still busy shooting themselves in the foot, we refuse to stand by and watch.",
    mn:      "Андройдын сайхан хуучин үе {countdown}-ийн дараа дуусна. Зарим нь өөрсдөдөө гай тарьсаар байхад бид зүгээр хараад зогсохоос татгалзаж байна.",
    ca:      "La bona època d'Android s'acaba d'aquí a {countdown}. Mentre alguns encara estan ocupats disparant-se al peu, nosaltres ens neguem a quedar-nos de braços plegats mirant.",
    cs:      "Stará dobrá éra Androidu skončí za {countdown}. Zatímco si někteří stále střílejí do vlastní nohy, my odmítáme nečinně přihlížet.",
    de:      "Die gute alte Android-Ära endet in {countdown}. Während einige noch damit beschäftigt sind, sich selbst ins Knie zu schießen, weigern wir uns, tatenlos zuzusehen.",
    da:      "Den gode gamle Android-æra slutter om {countdown}. Mens nogle stadig har travlt med at skyde sig selv i foden, nægter vi at stå passivt og se til.",
    nl:      "Het goede oude Android-tijdperk eindigt over {countdown}. Terwijl sommigen nog druk bezig zijn zichzelf in de voet te schieten, weigeren wij werkeloos toe te kijken.",
    el:      "Η παλιά καλή εποχή του Android τελειώνει σε {countdown}. Ενώ κάποιοι συνεχίζουν να πυροβολούν τα πόδια τους, εμείς αρνούμαστε να μείνουμε άπραγοι και να κοιτάμε.",
    es:      "La buena época de Android termina en {countdown}. Mientras algunos siguen ocupados disparándose en el pie, nosotros nos negamos a quedarnos de brazos cruzados mirando.",
    fr:      "La belle époque d'Android se termine dans {countdown}. Pendant que certains continuent à se tirer une balle dans le pied, nous refusons de rester les bras croisés à regarder.",
    id:      "Era Android yang indah akan berakhir dalam {countdown}. Sementara sebagian pihak masih sibuk merugikan diri sendiri, kami menolak hanya berdiam diri dan menonton.",
    it:      "La cara vecchia era di Android termina tra {countdown}. Mentre alcuni sono ancora impegnati a darsi la zappa sui piedi, noi ci rifiutiamo di restare a guardare.",
    ko:      "좋았던 Android 시대가 {countdown} 후 끝납니다. 일부가 여전히 스스로 발등을 찍는 동안, 우리는 그저 서서 지켜보기만 하는 것을 거부합니다.",
    pl:      "Stara dobra era Androida kończy się za {countdown}. Podczas gdy niektórzy wciąż strzelają sobie w stopę, my nie zamierzamy stać z boku i patrzeć.",
    "pt-BR": "A boa e velha era do Android termina em {countdown}. Enquanto alguns ainda estão ocupados dando um tiro no próprio pé, nós nos recusamos a ficar parados assistindo.",
    ru:      "Старая добрая эпоха Android закончится через {countdown}. Пока некоторые продолжают стрелять себе в ногу, мы отказываемся стоять в стороне и наблюдать.",
    sk:      "Stará dobrá éra Androidu sa skončí o {countdown}. Kým si niektorí stále strieľajú do vlastnej nohy, my odmietame nečinne stáť a prizerať sa.",
    th:      "ยุค Android อันแสนดีจะสิ้นสุดลงในอีก {countdown} ขณะที่บางคนยังคงทำร้ายตัวเอง เราขอปฏิเสธที่จะยืนดูอยู่เฉย ๆ",
    tr:      "Android'un o güzel eski dönemi {countdown} içinde sona eriyor. Bazıları hâlâ kendi ayağına sıkmakla meşgulken biz kenarda durup izlemeyi reddediyoruz.",
    uk:      "Стара добра епоха Android закінчиться через {countdown}. Поки дехто й далі стріляє собі в ногу, ми відмовляємося стояти осторонь і спостерігати.",
    "zh-CN": "Android 的美好旧时代将在 {countdown} 后结束。虽然有些人仍忙着搬起石头砸自己的脚，但我们拒绝袖手旁观。",
    "zh-TW": "Android 的美好舊時代將在 {countdown} 後結束。雖然有些人仍忙著搬石頭砸自己的腳，但我們拒絕袖手旁觀。",
    ja:      "古き良き Android の時代は {countdown} 後に終わります。いまだに自ら墓穴を掘ることに忙しい人たちがいる一方で、私たちは黙って見過ごすことを拒みます。",
    fi:      "Androidin vanha hyvä aikakausi päättyy {countdown} kuluttua. Kun jotkut yhä ampuvat itseään jalkaan, me kieltäydymme seisomasta sivussa ja katsomasta.",
    hu:      "A régi szép Android-korszak {countdown} múlva véget ér. Miközben egyesek még mindig lábon lövik magukat, mi nem vagyunk hajlandók tétlenül végignézni.",
    vi:      "Kỷ nguyên Android tươi đẹp sẽ kết thúc sau {countdown}. Trong khi một số người vẫn mải tự chuốc họa vào thân, chúng tôi nhất quyết không đứng nhìn.",
    bg:      "Доброто старо време на Android приключва след {countdown}. Докато някои още се прострелват в крака, ние отказваме да стоим отстрани и да гледаме.",
    be:      "Старая добрая эпоха Android скончыцца праз {countdown}. Пакуль некаторыя ўсё яшчэ страляюць сабе ў нагу, мы адмаўляемся стаяць убаку і назіраць.",
    hi:      "Android का अच्छा पुराना दौर {countdown} में समाप्त हो जाएगा। जब कुछ लोग अब भी अपने ही पैर पर कुल्हाड़ी मारने में व्यस्त हैं, हम चुपचाप खड़े होकर तमाशा देखने से इनकार करते हैं।"
  };

  // ── Parse query parameters from the script's own src URL ──────────────
  function getScriptParams() {
    var params = {};
    try {
      var src = document.currentScript && document.currentScript.src;
      if (!src) return params;
      var q = src.indexOf("?");
      if (q === -1) return params;
      var pairs = src.substring(q + 1).split("&");
      for (var i = 0; i < pairs.length; i++) {
        var kv = pairs[i].split("=");
        params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
      }
    } catch (e) {}
    return params;
  }

  var params = getScriptParams();

  // ── Determine locale ──────────────────────────────────────────────────
  function resolveLocale(tag) {
    if (!tag) return "en";
    // Exact match
    if (messages[tag]) return tag;
    // Case-insensitive exact match (e.g. "pt-br" → "pt-BR")
    var lower = tag.toLowerCase();
    for (var key in messages) {
      if (key.toLowerCase() === lower) return key;
    }
    // Fallback to base language (e.g. "de-CH" → "de", "zh-Hans" → "zh")
    var base = lower.split("-")[0];
    for (var key2 in messages) {
      if (key2.toLowerCase() === base) return key2;
    }
    // Fallback to any regional variant of the base language (e.g. "pt" → "pt-BR")
    for (var key3 in messages) {
      if (key3.toLowerCase().split("-")[0] === base) return key3;
    }
    return "en";
  }

  var locale = resolveLocale(
    params.lang ||
    document.documentElement.lang ||
    navigator.language ||
    navigator.userLanguage
  );

  // ── Size variant ──────────────────────────────────────────────────────
  var size = params.size === "mini" ? "mini"
      : params.size === "minimal"
        ? "minimal"
        : "normal";

  // ── Link ────────────────────────────────────────────────────────────
  var linkParam = params.link;
  var defaultLink = "https://keepandroidopen.org" + (locale === "en" ? "" : "/" + locale + "/");
  var linkUrl = linkParam === "none" ? null : (linkParam || defaultLink);

  // ── Close button ────────────────────────────────────────────────────
  var showClose = params.hidebutton !== "off";
  var storageKey = "kao-banner-hidden";
  var dismissDays = 30;

  // ── Inject CSS ────────────────────────────────────────────────────────
  var cssNormal =
    ".kao-banner{" +
      "position:relative;" +
      "font-variant-numeric:tabular-nums;" +
      "background:var(--surface-raised,#15151d);" +
      "border:0;" +
      "border-bottom:1px solid var(--accent,#ff3d91);" +
      "color:var(--ink,#f4f1f5);" +
      "font-family:var(--mono,ui-monospace,SFMono-Regular,Consolas,Liberation Mono,monospace);" +
      "font-weight:600;" +
      "text-transform:none;" +
      "letter-spacing:0.04em;" +
      "font-size:1rem;" +
      "text-align:center;" +
      "text-shadow:none;" +
      "padding:0.65rem 3.25rem 0.65rem 1rem;" +
      "line-height:1.5;" +
      "overflow-wrap:anywhere;" +
      "box-sizing:border-box;" +
    "}";

  var cssMini =
    ".kao-banner{" +
      "position:relative;" +
      "font-variant-numeric:tabular-nums;" +
      "background:var(--surface-raised,#15151d);" +
      "border:0;" +
      "border-bottom:1px solid var(--accent,#ff3d91);" +
      "color:var(--ink,#f4f1f5);" +
      "font-family:var(--mono,ui-monospace,SFMono-Regular,Consolas,Liberation Mono,monospace);" +
      "font-weight:500;" +
      "text-transform:none;" +
      "letter-spacing:0.04em;" +
      "font-size:0.8rem;" +
      "text-align:center;" +
      "text-shadow:none;" +
      "padding:0.4rem 3.25rem 0.4rem 1rem;" +
      "line-height:1.4;" +
      "overflow-wrap:anywhere;" +
      "box-sizing:border-box;" +
    "}";

  var cssMinimal =
    ".kao-banner{" +
      "position:relative;" +
      "font-variant-numeric:tabular-nums;" +
      "min-height:2.75rem;" +
      "background:var(--surface-raised,#15151d);" +
      "border:0;" +
      "border-bottom:1px solid var(--accent,#ff3d91);" +
      "color:var(--ink,#f4f1f5);" +
      "font-family:var(--mono,ui-monospace,SFMono-Regular,Consolas,Liberation Mono,monospace);" +
      "font-weight:600;" +
      "text-transform:none;" +
      "letter-spacing:0.04em;" +
      "font-size:1.2rem;" +
      "text-align:center;" +
      "text-shadow:none;" +
      "padding:0.55rem 3.25rem 0.55rem 1rem;" +
      "line-height:1.4;" +
      "overflow-wrap:anywhere;" +
      "box-sizing:border-box;" +
    "}";

  var cssCommon =
    ".kao-banner a{color:var(--ink,#f4f1f5);text-decoration:none;}" +
    ".kao-banner a:hover{color:var(--accent,#ff3d91);text-decoration:none;}" +
    ".kao-banner a:focus-visible,.kao-banner-close:focus-visible{outline:2px solid var(--accent,#ff3d91);outline-offset:-4px;}" +
    ".kao-banner-close{" +
      "position:absolute;" +
      "top:0;" +
      "right:0;" +
      "bottom:0;" +
      "left:auto;" +
      "display:inline-grid;" +
      "place-items:center;" +
      "width:2.75rem;" +
      "min-width:2.75rem;" +
      "height:2.75rem;" +
      "min-height:2.75rem;" +
      "padding:0;" +
      "transform:none;" +
      "background:transparent;" +
      "border:0;" +
      "border-left:1px solid var(--line,#2b2832);" +
      "color:var(--muted,#aaa5af);" +
      "font:1rem/1 var(--mono,ui-monospace,SFMono-Regular,Consolas,Liberation Mono,monospace);" +
      "cursor:pointer;" +
      "opacity:1;" +
      "text-shadow:none;" +
      "box-sizing:border-box;" +
    "}" +
    ".kao-banner-close:hover{background:var(--surface,#111117);color:var(--accent,#ff3d91);opacity:1;}";

  var cssKaoPulse =
    ".kao-banner:not(.no-animation) { animation:kao-pulse 2s infinite; }" +
    "@keyframes kao-pulse{" +
      "0%{box-shadow:0 0 0 0 rgba(255,61,145,0.7)}" +
      "70%{box-shadow:0 0 0 15px rgba(255,61,145,0)}" +
      "100%{box-shadow:0 0 0 0 rgba(255,61,145,0)}" +
    "}";

  var cssNoClose = ".kao-banner{padding-right:1rem;}";

  var style = document.createElement("style");
  style.textContent = (size === "mini" ? cssMini : size === "minimal" ? cssMinimal : cssNormal)
    + (params.animation === "off" ? "" : cssKaoPulse)
    + (showClose ? "" : cssNoClose)
    + cssCommon;
  document.head.appendChild(style);

  // ── Check if previously dismissed (reappears after dismissDays) ─────
  if (showClose) {
    try {
      var dismissed = localStorage.getItem(storageKey);
      if (dismissed) {
        var elapsed = Date.now() - Number(dismissed);
        if (elapsed < dismissDays * 24 * 60 * 60 * 1000) return;
        localStorage.removeItem(storageKey);
      }
    } catch (e) {}
  }

  // ── Create banner DOM ─────────────────────────────────────────────────
  var banner = document.createElement("div");
  banner.className = params.animation === "off" ? "kao-banner no-animation" : "kao-banner";

  var messageTemplate = messages[locale] || messages.en;
  var messageParts = messageTemplate.split("{countdown}");
  var messageContainer = banner;

  if (linkUrl) {
    var link = document.createElement("a");
    link.href = linkUrl;
    link.target = "_blank";
    link.rel = "noopener";
    messageContainer = link;
    banner.appendChild(link);
  }

  messageContainer.appendChild(document.createTextNode(messageParts[0]));
  var countdownSpan = document.createElement("span");
  countdownSpan.textContent = "\u00A0";
  messageContainer.appendChild(countdownSpan);
  messageContainer.appendChild(document.createTextNode(messageParts[1]));

  // Close button
  if (showClose) {
    var closeBtn = document.createElement("button");
    closeBtn.className = "kao-banner-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.textContent = "\u2715";
    closeBtn.addEventListener("click", function () {
      banner.style.display = "none";
      try { localStorage.setItem(storageKey, String(Date.now())); } catch (e) {}
    });
    banner.appendChild(closeBtn);
  }

  // Insert into target element (by id) or prepend to <body>
  var targetId = params.id;
  if (targetId) {
    var target = document.getElementById(targetId);
    if (target) {
      target.appendChild(banner);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }
  } else {
    document.body.insertBefore(banner, document.body.firstChild);
  }

  // ── Countdown logic ───────────────────────────────────────────────────
  var countDownDate = new Date("Jan 1, 2027 00:00:00").getTime();

  var unitFormatters = {
    day: new Intl.NumberFormat(locale, { style: "unit", unit: "day", unitDisplay: "narrow" }),
    hour: new Intl.NumberFormat(locale, { style: "unit", unit: "hour", unitDisplay: "narrow" }),
    minute: new Intl.NumberFormat(locale, { style: "unit", unit: "minute", unitDisplay: "narrow" }),
    second: new Intl.NumberFormat(locale, { style: "unit", unit: "second", unitDisplay: "narrow" })
  };

  function formatUnit(value, unit) {
    return unitFormatters[unit].format(value);
  }

  var remaining = new Array(7);
  var separator = " ";
  var timer = null;

  function updateBanner() {
    var now = new Date().getTime();
    var rawDistance = countDownDate - now;
    var distance = Math.max(0, rawDistance);

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var parts = 0;
    remaining[0] = days > 0 ? formatUnit(days, "day") : null;
    if (remaining[0]) parts++;
    remaining[1] = parts ? separator : null;
    remaining[2] =
      parts || hours > 0
        ? formatUnit(hours, "hour")
        : null;
    if (remaining[2]) parts++;
    remaining[3] = parts ? separator : null;
    remaining[4] =
      parts || minutes > 0
        ? formatUnit(minutes, "minute")
        : null;
    if (remaining[4]) parts++;
    remaining[5] = parts ? separator : null;
    remaining[6] = formatUnit(seconds, "second");

    countdownSpan.textContent = remaining.join("");

    if (rawDistance < 0) {
      clearInterval(timer);
    }
  }

  timer = setInterval(updateBanner, 1000);
  updateBanner();
})();
