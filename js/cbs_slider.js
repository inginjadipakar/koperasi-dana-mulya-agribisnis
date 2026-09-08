/**
 * ============================================================
 * CBS SLIDER & INTERACTION CONTROLLER
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. LAYER 1 BACKGROUND SLIDESHOW ---
  const bgSlides = document.querySelectorAll(".bg-slide");
  let currentBgIndex = 0;
  let bgInterval;

  function setBgSlide(index) {
    bgSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
    currentBgIndex = index;
  }

  function nextBgSlide() {
    let nextIndex = (currentBgIndex + 1) % bgSlides.length;
    setBgSlide(nextIndex);
  }

  function prevBgSlide() {
    let prevIndex = (currentBgIndex - 1 + bgSlides.length) % bgSlides.length;
    setBgSlide(prevIndex);
  }

  // Auto transition background every 4 seconds
  function startBgTimer() {
    bgInterval = setInterval(nextBgSlide, 4000);
  }

  function resetBgTimer() {
    clearInterval(bgInterval);
    startBgTimer();
  }

  startBgTimer();

  // --- 2. LAYER 2 SHOWCASE CAROUSEL SLIDER ---
  const track = document.getElementById("showcaseTrack");
  const slideCount = document.querySelectorAll(".showcase-slide").length;
  const indexDisplay = document.getElementById("slideIndexDisplay");
  let currentShowcaseIndex = 0;

  function updateShowcaseSlide(index) {
    if (!track) return;
    currentShowcaseIndex = (index + slideCount) % slideCount;
    track.style.transform = `translateX(-${currentShowcaseIndex * 100}%)`;
    if (indexDisplay) {
      indexDisplay.textContent = `${currentShowcaseIndex + 1}/${slideCount}`;
    }
  }

  // --- 3. ARROW NAVIGATION (CONTROLS BOTH BACKGROUND & SHOWCASE) ---
  const btnNext = document.getElementById("btnNextSlide");
  const btnPrev = document.getElementById("btnPrevSlide");

  if (btnNext) {
    btnNext.addEventListener("click", function () {
      nextBgSlide();
      updateShowcaseSlide(currentShowcaseIndex + 1);
      resetBgTimer();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", function () {
      prevBgSlide();
      updateShowcaseSlide(currentShowcaseIndex - 1);
      resetBgTimer();
    });
  }

  // Keyboard Navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      nextBgSlide();
      updateShowcaseSlide(currentShowcaseIndex + 1);
      resetBgTimer();
    } else if (e.key === "ArrowLeft") {
      prevBgSlide();
      updateShowcaseSlide(currentShowcaseIndex - 1);
      resetBgTimer();
    }
  });

  // --- 4. PANEL TAB MODE SWITCHING (LOGIN VS OVERVIEW) ---
  window.switchPanelMode = function (mode) {
    const overviewTab = document.getElementById("tabOverview");
    const loginTab = document.getElementById("tabLogin");
    const overviewContent = document.getElementById("contentOverview");
    const loginContent = document.getElementById("contentLogin");

    if (mode === "login") {
      loginTab.classList.add("active");
      overviewTab.classList.remove("active");
      loginContent.style.display = "block";
      overviewContent.style.display = "none";
    } else {
      overviewTab.classList.add("active");
      loginTab.classList.remove("active");
      overviewContent.style.display = "block";
      loginContent.style.display = "none";
    }
  };
});
