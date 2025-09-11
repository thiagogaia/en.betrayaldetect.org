// gg.js

// ============ UTMIFY ============
(function loadUtmify() {
  const s = document.createElement("script");
  s.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
  s.async = true;
  s.defer = true;
  s.setAttribute("data-utmify-ignore-iframe", "");
  document.head.appendChild(s);
})();

// ============ GOOGLE ANALYTICS / GTM ============
(function loadGA() {
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=GT-MBGH2SDZ";
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("set","linker",{"domains":["en.betrayaldetect.org"]});
  gtag("js", new Date());
  gtag("config", "GT-MBGH2SDZ");
})();

// ============ CLARITY ============
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "t8xlagi0nl");