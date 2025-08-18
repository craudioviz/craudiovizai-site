
(function(){
  const root = document.documentElement;
  const storeKey = 'crav_theme';
  const saved = localStorage.getItem(storeKey);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark':'light');
  root.setAttribute('data-theme', initial);

  function swapLogos(mode){
    document.querySelectorAll('img.brand-logo').forEach(img=>{
      const dark = img.getAttribute('data-dark');
      const light = img.getAttribute('data-light');
      const dark2 = img.getAttribute('data-dark-2x');
      const light2 = img.getAttribute('data-light-2x');
      if(mode==='dark' && dark){ img.src = dark; if(dark2) img.setAttribute('data-2x', dark2); }
      if(mode==='light' && light){ img.src = light; if(light2) img.setAttribute('data-2x', light2); }
    });
    // Re-run retina swap
    const pixelRatio = window.devicePixelRatio || 1;
    if (pixelRatio > 1) {
      document.querySelectorAll('img[data-2x]').forEach(img => {
        const twoX = img.getAttribute('data-2x');
        if (twoX) img.src = twoX;
      });
    }
  }
  swapLogos(initial);

  window.toggleTheme = function(){
    const next = root.getAttribute('data-theme') === 'dark' ? 'light':'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(storeKey, next);
    swapLogos(next);
  }
})();
