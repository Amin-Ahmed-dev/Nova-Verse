// Menu Toggle Btn
const toggleBtnOpen = document.querySelector(".toggle-btn-open")
const toggleBtnClose = document.querySelector(".toggle-btn-close")
const navMenu = document.querySelector(".nav-links-container")

function openMenu() {
  navMenu.classList.add("show")
}
toggleBtnOpen.addEventListener("click", openMenu)

function closeMenu() {
  navMenu.classList.remove("show")
}
toggleBtnClose.addEventListener("click", closeMenu)

// Side Bar
function moveTopBar() {
  const headerTopNavContainer = document.querySelector(".header-top-nav-container");
  const headerTopNav = document.querySelector(".header-top-nav")
  const navMenu = document.querySelector(".nav-links-container");
  const headerTopNavUL1 = document.querySelector(".header-top-nav-ul1")
  const headerTopNavUL2 = document.querySelector(".header-top-nav-ul2")
  const joinBeta = document.querySelector(".join-beta-li")
  const devPortal = document.querySelector(".dev-portal-li")
  const mobileBreakpoint = 992;

  if (window.innerWidth <= mobileBreakpoint) {
    if (!navMenu.contains(headerTopNavContainer)) {
      navMenu.appendChild(headerTopNavContainer)

      if (!headerTopNavUL1.contains(joinBeta, devPortal)) {
        headerTopNavUL1.appendChild(joinBeta)
        headerTopNavUL1.appendChild(devPortal)
      }
    }
  } else {
    if (!headerTopNav.contains(headerTopNavContainer)) {
      headerTopNav.appendChild(headerTopNavContainer)

      if (!headerTopNavUL2.contains(joinBeta, devPortal)) {
        headerTopNavUL2.insertBefore(devPortal, headerTopNavUL2.firstElementChild)
        headerTopNavUL2.insertBefore(joinBeta, headerTopNavUL2.firstElementChild)
      }
    }
  }
}

window.addEventListener('load', moveTopBar);
window.addEventListener('resize', moveTopBar);


// Nav Overlay Toggler
const navOverlay = document.querySelector(".nav-overlay")

function showOverlay() {
  navOverlay.classList.add("show")
}

toggleBtnOpen.addEventListener("click", showOverlay)

function hideOverlay() {
  navMenu.classList.remove("show")
  setTimeout(() =>{
    navOverlay.classList.remove("show")
  }, 500
  )
}

toggleBtnClose.addEventListener("click", hideOverlay)


// Search Box Toggler
const searchBtn = document.querySelector("#search-btn")
const searchOverlay = document.querySelector(".search-overlay")
const searchBox = document.querySelector(".search-box")
const searchInput = document.querySelector(".search-input")
const searchCloseBtn = document.querySelector(".close-search-btn")

function searchShow(e) {
    e.preventDefault()

    searchOverlay.classList.add("show")
    searchBox.classList.add("show")

    setTimeout(() => {
        searchInput.classList.add("show")
    }, 300)
    
    setTimeout(() => {
        searchInput.focus()
    }, 700)
}

function searchHide(e) {
    e.preventDefault()

    searchInput.classList.remove("show")

    setTimeout(() => {
        searchOverlay.classList.remove("show")
        searchBox.classList.remove("show")
    }, 300)
}

searchBtn.addEventListener("click", searchShow)
searchCloseBtn.addEventListener("click", searchHide)

// flask Number Addition
const flaskIcon = document.querySelector(".flask-icon")
const flaskNumberContainer = document.querySelector(".flask-number")
let flaskNumber = 2

flaskNumberContainer.innerHTML = flaskNumber

flaskIcon.addEventListener("click", (e) => {
    e.preventDefault()

    flaskNumber++
    flaskNumberContainer.innerHTML = flaskNumber
})

// Toggle Btn Trending Section
const toggleBtnTrending = document.querySelector(".toggle-btn-trending")
const trendingNavTabs = document.querySelector(".trending-section-nav-tabs")

function toggleBtnTrendingActive() {
  toggleBtnTrending.classList.toggle("change")
  trendingNavTabs.classList.toggle("show")
}
toggleBtnTrending.addEventListener("click", toggleBtnTrendingActive)

// Swiper Carousel
// Loop over each carousel-wrapper to initialize a separate Swiper instance
const swiperConfigs = {
  productsCarousel: {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    speed: 800,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    breakpoints: {
      0: { slidesPerView: 1.1, spaceBetween: 10 },
      480: { slidesPerView: 1.5, spaceBetween: 15 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 2.5, spaceBetween: 25 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
      1280: { slidesPerView: 3, spaceBetween: 35 },
    },
  },

  testimonialCarousel: {
    effect: 'slide',
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  }
};

document.querySelectorAll('.carousel-wrapper').forEach((wrapper) => {
  const swiperEl = wrapper.querySelector('.cards-carousel');
  const configKey = swiperEl.dataset.carouselId;
  const config = swiperConfigs[configKey] || {};

  const swiper = new Swiper(swiperEl, {
    ...config,
    pagination: {
      el: wrapper.querySelector('.swiper-pagination'),
      clickable: true
    },
    navigation: {
      nextEl: wrapper.querySelector('.swiper-button-next'),
      prevEl: wrapper.querySelector('.swiper-button-prev'),
    }
  });

  //Pause Autoplay on testimonial Carousel
  if (configKey === 'testimonialCarousel') {
    const pauseAutoplay = () => swiper.autoplay?.stop();
    const resumeAutoplay = () => swiper.autoplay?.start();

    const testimonialCards = swiperEl.querySelectorAll('.testimonial-card');

    testimonialCards.forEach(card => {
      card.addEventListener('mouseenter', pauseAutoplay);
      card.addEventListener('mouseleave', resumeAutoplay);

      card.addEventListener('touchstart', () => {
        card.classList.add('touched');
        pauseAutoplay();
      }, { passive: true });

      card.addEventListener('touchend', () => {
        card.classList.remove('touched');
        resumeAutoplay();
      });
    });
  }


  // Hover pause for testimonials
  if (configKey === 'productsCarousel') {
    const tabs = document.querySelectorAll('.trending-section-nav-tabs li');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const selectedCategory = tab.getAttribute('data-category');

        // Highlight active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter original slides only
        const originalSlides = swiper.slides.filter(slide =>
          !slide.classList.contains('swiper-slide-duplicate')
        );

        // Find real indices of slides matching the category
        const matchingRealIndices = originalSlides
          .filter(slide => slide.getAttribute('data-category') === selectedCategory)
          .map(slide => Number(slide.dataset.swiperSlideIndex));

        // Choose 2nd or 1st matching slide
        const targetRealIndex = matchingRealIndices[1] ?? matchingRealIndices[0];

        if (typeof targetRealIndex === 'number') {
          swiper.slideToLoop(targetRealIndex);
        }
      });
    });

    // Auto-select "AI Tools" tab on load
    window.addEventListener('load', () => {
      const defaultCategory = 'AI Tools';
      const defaultTab = Array.from(tabs).find(tab =>
        tab.getAttribute('data-category') === defaultCategory
      );
      if (defaultTab) {
        defaultTab.click();
      }
    });

    swiper.on('slideChange', () => {
    // 1. Get all real (non-duplicate) slides
    const realSlides = swiper.slides.filter(slide =>
      !slide.classList.contains('swiper-slide-duplicate')
    );

    // 2. Get the real index of the current active slide
    const currentIndex = swiper.realIndex;
    const currentSlide = realSlides.find(slide =>
      parseInt(slide.dataset.swiperSlideIndex) === currentIndex
    );

    if (!currentSlide) return;

    const currentCategory = currentSlide.getAttribute('data-category');

    // 3. Get all real slides in the same category
    const categorySlides = realSlides.filter(slide =>
      slide.getAttribute('data-category') === currentCategory
    );

    // 4. Get the second slide of that category
    const secondSlideIndex = categorySlides[1]
      ? parseInt(categorySlides[1].dataset.swiperSlideIndex)
      : parseInt(categorySlides[0]?.dataset.swiperSlideIndex);

    // 5. If we're on the second slide of that category → update tabs
    if (currentIndex === secondSlideIndex) {
      tabs.forEach(tab => {
        const tabCategory = tab.getAttribute('data-category');
        tab.classList.toggle('active', tabCategory === currentCategory);
      });
    }
  });
}
});


// Back To Top Btn
const backToTopBtn = document.querySelector(".back-to-top-btn")

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

backToTopBtn.addEventListener("click", topFunction)


// Resources Dropdown List Toggler
const resourcesBtn = document.querySelector(".resources-a")
const resourcesList = document.querySelector(".resources-dropdown-list")

resourcesBtn.addEventListener("click", (e) => {
  e.preventDefault()

  resourcesBtn.classList.toggle("toggle")
})