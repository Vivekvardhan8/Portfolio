document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  initSlideViewer();
});

function initSlideViewer() {
  const viewer = document.querySelector('.slide-viewer');
  if (!viewer) return;

  const img = viewer.querySelector('.slide-stage img');
  const counter = viewer.querySelector('.slide-counter');
  const progressBar = viewer.querySelector('.slide-progress-bar');
  const prevBtn = viewer.querySelector('.slide-nav-btn.prev');
  const nextBtn = viewer.querySelector('.slide-nav-btn.next');
  const total = parseInt(viewer.dataset.total, 10) || 1;
  let current = 1;

  function render() {
    img.src = `images/timeline-slides/slide-${current}.jpg`;
    img.alt = `Slide ${current} of ${total}`;
    counter.textContent = `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    progressBar.style.width = `${(current / total) * 100}%`;
  }

  function goPrev() { current = current > 1 ? current - 1 : total; render(); }
  function goNext() { current = current < total ? current + 1 : 1; render(); }

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  viewer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  });

  render();
}
