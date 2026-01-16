// /public/loader.js — ultra-advanced WS key gate with persistent status overlay and auto-access
(async function () {
  if (window.__OVERLAY_LOADED__) return;
  window.__OVERLAY_LOADED__ = true;

  const WS_VERIFY_URL = "wss://chat--nextgen676.replit.app/chat";

  async function waitForBody() {
    if (document.body) return;
    if (document.readyState === "loading") {
      await new Promise(r =>
        document.addEventListener("DOMContentLoaded", r, { once: true })
      );
    }
    while (!document.body) {
      await new Promise(r => setTimeout(r, 10));
    }
  }
  await waitForBody();


  async function loadClient() {
    const thirdPartyJS = [
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js",
      "https://unpkg.com/gifler@latest/gifler.min.js"
    ];
    const thirdPartyCSS = [
      "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
    ];
    const bundles = [
      ["./assets/js/main.bundle.js", "/assets/js/main.bundle.js"],
      ["./assets/js/chat.js", "/assets/js/chat.js"]
    ];

    function css(h) {
      return new Promise(r => {
        const l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = h;
        l.onload = r;
        document.head.appendChild(l);
      });
    }

    function js(s) {
      return new Promise(r => {
        const e = document.createElement("script");
        e.src = s;
        e.async = false;
        e.onload = () => r(true);
        e.onerror = () => r(false);
        document.head.appendChild(e);
      });
    }

    async function tryPair(p) {
      for (const s of p) if (await js(s)) return;
    }

    for (const c of thirdPartyCSS) await css(c);
    for (const j of thirdPartyJS) await js(j);
    for (const b of bundles) await tryPair(b);

    document.dispatchEvent(new Event("DOMContentLoaded"));
    window.dispatchEvent(new Event("load"));
    requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
  }

 
})();
