window.addEventListener('load', () => {
  const params = new URLSearchParams(location.search);

  console.log(location.href);
  console.log(params.has('zoom'));

  if (params.has('zoom')) {
    const docHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scale = viewportHeight / docHeight;

    document.body.style.zoom = scale;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.title');
  if (!title) {
    console.error('could not find title');
    return;
  }
  title.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const tocs = document.querySelectorAll('toc-item');

  tocs.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(event.target);
      const url = new URL(event.target.href);
      console.log();
      const target = document.querySelector(url.hash);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const tocLinks = document.querySelectorAll('.toc-link');
  const targetContainers = document.querySelectorAll('section.card');

  // For each target container
  targetContainers.forEach((container) => {
    tocLinks.forEach((link) => {
      const clone = link.cloneNode(true);
      container.appendChild(clone);
    });

    // Clone all TOC links and append to this container
  });
});
