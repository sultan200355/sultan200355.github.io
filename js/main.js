/* =========================================================
   SULTAN AL JARAMANI - PORTFOLIO SCRIPT
   ---------------------------------------------------------
   Small, optional extras. The site still works if this file
   fails to load: text, images and links are all plain HTML.

   1. Fade-in on scroll
   2. Before/after slider
   3. Lightbox (click an image to see it bigger)
   4. Current year in the footer
   ========================================================= */


/* 1. FADE-IN ON SCROLL -------------------------------------
   Any element with class="reveal" starts invisible (see the
   CSS) and fades in when it scrolls into view. We use an
   IntersectionObserver: the browser tells us when an element
   becomes visible, which is much lighter than checking on
   every scroll movement. */

function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  // Very old browser? Just show everything.
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  elements.forEach((el) => observer.observe(el));
}


/* 2. BEFORE/AFTER SLIDER -----------------------------------
   Works with mouse, finger and keyboard.
   - Mouse/finger: we listen for "pointer" events on the photo
     and turn the pointer position into a percentage.
   - Keyboard: a hidden <input type="range"> receives the
     arrow keys. Screen readers announce it as a slider.
   The percentage is saved in the CSS variable --pos, and the
   CSS uses it to cut off the top photo. */

function initCompare(compare) {
  const frame = compare.querySelector(".compare__frame");
  const range = compare.querySelector(".compare__range");
  if (!frame || !range) return;

  let dragging = false;

  function setPosition(percent) {
    const value = Math.min(100, Math.max(0, percent));
    frame.style.setProperty("--pos", value + "%");
    range.value = value;
    range.setAttribute("aria-valuetext", Math.round(value) + "% concept");
  }

  function positionFromPointer(event) {
    const box = frame.getBoundingClientRect();
    setPosition(((event.clientX - box.left) / box.width) * 100);
  }

  frame.addEventListener("pointerdown", (event) => {
    dragging = true;
    frame.setPointerCapture(event.pointerId); // keep following even outside the photo
    positionFromPointer(event);
  });

  frame.addEventListener("pointermove", (event) => {
    if (dragging) positionFromPointer(event);
  });

  const stop = () => (dragging = false);
  frame.addEventListener("pointerup", stop);
  frame.addEventListener("pointercancel", stop); // e.g. the phone started scrolling instead

  range.addEventListener("input", () => setPosition(range.valueAsNumber));

  setPosition(range.valueAsNumber);
}


/* 3. LIGHTBOX ----------------------------------------------
   Any link with data-lightbox="group-name" opens its image
   in a full-screen viewer. Links with the same group name
   can be browsed with the arrows (or the arrow keys).
   Without JavaScript the link simply opens the image file. */

function initLightbox() {
  const links = Array.from(document.querySelectorAll("a[data-lightbox]"));
  if (!links.length || typeof HTMLDialogElement !== "function") return;

  // Build the viewer once and add it to the page
  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Image viewer");
  dialog.innerHTML = `
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="">
      <figcaption class="lightbox__caption" aria-hidden="true"></figcaption>
    </figure>
    <button class="lightbox__btn lightbox__close" type="button" aria-label="Close">&times;</button>
    <button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous image">&larr;</button>
    <button class="lightbox__btn lightbox__next" type="button" aria-label="Next image">&rarr;</button>
  `;
  document.body.append(dialog);

  const image = dialog.querySelector(".lightbox__img");
  const caption = dialog.querySelector(".lightbox__caption");
  const prevButton = dialog.querySelector(".lightbox__prev");
  const nextButton = dialog.querySelector(".lightbox__next");

  let group = [];
  let index = 0;

  function show(newIndex) {
    index = (newIndex + group.length) % group.length; // wrap around at the ends
    const link = group[index];
    const thumb = link.querySelector("img");
    const text = link.dataset.caption || (thumb ? thumb.alt : "");

    image.src = link.href;
    image.alt = thumb ? thumb.alt : "";
    caption.textContent = text;

    const single = group.length < 2;
    prevButton.hidden = single;
    nextButton.hidden = single;
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      group = links.filter((other) => other.dataset.lightbox === link.dataset.lightbox);
      show(group.indexOf(link));
      dialog.showModal();
    });
  });

  dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
  prevButton.addEventListener("click", () => show(index - 1));
  nextButton.addEventListener("click", () => show(index + 1));

  // Click on the dark area around the image to close
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });

  // Empty the image when closing, so the old one doesn't flash next time
  dialog.addEventListener("close", () => image.removeAttribute("src"));
}


/* 4. CURRENT YEAR ------------------------------------------
   Fills in the year in the footer, so "(c) 2026" never goes
   out of date. */

function initYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = year));
}


/* START ------------------------------------------------------
   The <script> tag uses "defer", so this runs after the HTML
   has loaded. */

initReveal();
document.querySelectorAll("[data-compare]").forEach(initCompare);
initLightbox();
initYear();
