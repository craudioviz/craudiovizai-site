
(function(){
  const pixelRatio = window.devicePixelRatio || 1;
  if (pixelRatio <= 1) return;
  document.querySelectorAll('img[data-2x]').forEach(img => {
    const twoX = img.getAttribute('data-2x');
    if (twoX) img.src = twoX;
  });
})();
