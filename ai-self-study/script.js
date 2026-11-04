/* Keep the page usable without JavaScript; anchors and FAQ use native HTML. */
(() => {
  // Project the original screenshot into the photographed display.
  // This preserves the supplied product UI instead of redrawing its text.
  const art = document.querySelector('.hero-art');
  const scene = document.querySelector('.hero-scene');
  const screen = document.querySelector('.hero-original-screen');
  const sourcePoints = [[0, 0], [2590, 0], [2590, 1384], [0, 1384]];
  const targetPoints = [[976, 136], [1640, 81], [1637, 665], [951, 574]];
  const equations = [];
  sourcePoints.forEach(([x, y], index) => {
    const [u, v] = targetPoints[index];
    equations.push([x, y, 1, 0, 0, 0, -u * x, -u * y, u]);
    equations.push([0, 0, 0, x, y, 1, -v * x, -v * y, v]);
  });
  for (let column = 0; column < 8; column++) {
    let pivot = column;
    for (let row = column + 1; row < 8; row++) {
      if (Math.abs(equations[row][column]) > Math.abs(equations[pivot][column])) pivot = row;
    }
    [equations[column], equations[pivot]] = [equations[pivot], equations[column]];
    const divisor = equations[column][column];
    for (let k = column; k < 9; k++) equations[column][k] /= divisor;
    for (let row = 0; row < 8; row++) {
      if (row === column) continue;
      const multiplier = equations[row][column];
      for (let k = column; k < 9; k++) equations[row][k] -= multiplier * equations[column][k];
    }
  }
  const [a, b, c, d, e, f, g, h] = equations.map(row => row[8]);
  screen.style.transform = `matrix3d(${a},${d},0,${g},${b},${e},0,${h},0,0,1,0,${c},${f},0,1)`;
  screen.style.visibility = 'visible';
  const fitHero = () => {
    const width = art.clientWidth;
    const height = art.clientHeight;
    const scale = Math.max(width / 1672, height / 941);
    const horizontalPosition = width <= 600 ? 0.66 : width <= 900 ? 0.6 : 0.5;
    scene.style.transform = `translate(${(width - 1672 * scale) * horizontalPosition}px,${(height - 941 * scale) / 2}px) scale(${scale})`;
  };
  if ('ResizeObserver' in window) new ResizeObserver(fitHero).observe(art);
  else window.addEventListener('resize', fitHero);
  fitHero();

  const disclosures = [...document.querySelectorAll('.faq-list details')];
  disclosures.forEach(disclosure => {
    disclosure.addEventListener('toggle', () => {
      if (!disclosure.open) return;
      disclosures.forEach(other => {
        if (other !== disclosure) other.open = false;
      });
    });
  });
})();
