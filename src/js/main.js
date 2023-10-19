const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const thresholdSteps = [...Array(10).keys()].map(i => i / 10);
const isMobile = window.innerWidth <= 768
const isDesktop = window.innerWidth >= 1070

// sliders
const ticketsSlider = document.querySelectorAll('.js-tickets-slider');
ticketsSlider.forEach(el => {
    tns({
        container: el,
        autoWidth: true,
        items: 1.1,
        gutter: 16,
        mouseDrag: true,
        autoplay: false,
        nav: true,
        navPosition: 'bottom',
        controls: false,
        loop: false,
        responsive: {
            1070: {
                disable: true
            }
        }
    });
})


// menu
const menuToggleElement = document.querySelector('.menu-toggle');
if (menuToggleElement) {
    menuToggleElement.addEventListener('click', () => {
        if (!document.body.classList.contains('menu-opened') ) {
            document.body.classList.toggle('menu-opened');
        } else if (document.body.classList.contains('menu-opened')) {
            document.body.classList.remove('menu-opened');
        }
    });
}


function closeAllOpened() {
    document.querySelectorAll('.opened').forEach(el => el.classList.remove('opened'));
    document.body.classList.remove('menu-opened');
    document.querySelectorAll('.popup-opened').forEach(el => el.classList.remove('popup-opened'));
    document.querySelectorAll('.js-form-popup').forEach(el => el.classList.remove('opened'));
    document.querySelectorAll('.filters_content').forEach(el => el.classList.remove('opened'));
}

const fadeElement = document.querySelector('.fade');
if (fadeElement) {
    fadeElement.addEventListener('click', closeAllOpened);
}

const menuLinkElements = document.querySelectorAll('.menu_link, .header .button');
menuLinkElements.forEach(el => el.addEventListener('touchend', () => {
    // if (isMobile) {

        setTimeout(() => {
            document.body.classList.remove('menu-opened')
        }, 75);
    // }
}));

/* Popup */
const popupToggleElements = document.querySelectorAll('.js-popup-toggle');

function disableScroll(e) {
    const { target } = e
    let isInPopup = false;
    
    function findParentPopup(el) {
        if (!el.parentElement) {
            return
        }
        if (el.className.includes('popup_content')) {
            isInPopup = true
            return
        }

        findParentPopup(el.parentElement)
    }

    findParentPopup(target.parentElement)
    
    if (!isInPopup && !target.className.includes('contact-form')) {
        e.preventDefault();
    }
}

function openPopup(name) {
    const popup = document.querySelector(`.popup[data-popup="${name}"]`);
    if (popup) {
        popup.classList.add('opened');
        document.body.classList.add('popup-opened');
        window.addEventListener(wheelEvent, disableScroll, { passive: false });
    }
}
function closePopup(name) {
    document.querySelector('.popup.opened').classList.remove('opened');
    document.body.classList.remove('popup-opened');
    window.removeEventListener(wheelEvent, disableScroll, { passive: false });

}

popupToggleElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup(el.dataset.popup);
}));

const popupCloseElements = document.querySelectorAll('.popup_close');
popupCloseElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
}));


/* Tabs */
function initTabs() {
    const tabsContainers = document.querySelectorAll('.tabs');
    
    tabsContainers.forEach(tabContainer => {
        const tabsButtons = tabContainer.querySelectorAll('.tabs_button');
        const tabsBlocks = tabContainer.querySelectorAll('.tabs_content');
    
        if (tabsButtons.length) {
            function switchTab(e) {
                e.preventDefault();
    
                const index = e.target.dataset.tab;
                tabsButtons.forEach(el => el.classList.remove('active'));
                tabsBlocks.forEach(el => el.classList.remove('active'));
    
                tabsButtons[index - 1].classList.add('active');
                tabsBlocks[index - 1].classList.add('active');
            }
    
            tabsButtons.forEach(el => el.addEventListener('click', switchTab));
        }
    });
}

initTabs()

/* cookies */
if (Cookies) {
    const hasCookies = Cookies.get('CookieNotificationCookie');
    const cookiesBanner = document.querySelector('.cookies');
    const cookiesAcceptButton = document.querySelector('[data-cookies="accept"]');
    const cookiesDenyButton = document.querySelector('[data-cookies="deny"]');
    
    if (cookiesAcceptButton) {
        cookiesAcceptButton.addEventListener('click', function (e) {
            e.preventDefault();
            cookiesBanner.style.display = 'none';
            Cookies.set('CookieNotificationCookie', 'true', { expires: 365 });
        });
    }
    if (cookiesDenyButton) {
        cookiesDenyButton.addEventListener('click', function (e) {
            e.preventDefault();
            cookiesBanner.style.display = 'none';
            Cookies.set('CookieNotificationCookie', 'false', { expires: 365 });
        });
    }
    console.log(cookiesBanner, !hasCookies);

    if (cookiesBanner && !hasCookies) {
        cookiesBanner.style.display = 'flex';
    }
}

/* Accordion */
const accordionElements = document.querySelectorAll('.accordion');

accordionElements.forEach(accordion => {
    const accordionButtons = accordion.querySelectorAll('.accordion_button');
    
    function toggle(e) {
        e.preventDefault();
        
        if (e.target.classList.contains('active')) {
            e.target.classList.remove('active');
            e.currentTarget.nextElementSibling.classList.remove('active');
            e.currentTarget.parentElement.classList.remove('active');
            return;
        }
        
        if (isDesktop) {
            e.currentTarget.classList.add('active');
            e.currentTarget.nextElementSibling.classList.add('active');
            e.currentTarget.parentElement.classList.add('active');
        } else {
            e.currentTarget.classList.toggle('active');
            e.currentTarget.nextElementSibling.classList.toggle('active');
            e.currentTarget.parentElement.classList.toggle('active');
        }
    }
    
    
    accordionButtons.forEach(el => el.addEventListener('click', toggle));
    
    const accordionTabButtons = accordion.querySelectorAll('.accordion_tab-button');
    const accordionTabContent = accordion.querySelectorAll('.accordion_tab-content');

    accordionTabButtons.forEach(el => el.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('active')) {
            return;
        }

        accordionTabButtons.forEach(el => el.classList.remove('active'));
        accordionTabContent.forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        e.target.nextElementSibling.classList.add('active');
    }));
});

/* appaerance animation */
const animatedElements = document.querySelectorAll('.js-animation');

if (animatedElements.length) {
    animatedElements.forEach(el => {
        const isExpericenceBlock = el.classList.contains('experience');

        let ratio = (isMobile || isExpericenceBlock) ? 0.0005 : 0.3;
        if (el.classList.contains('section_image-wrapper') && !isMobile) {
            ratio = 0.6;
        }

        const observerCallback = function (e) {
            const { target, intersectionRatio } = e[0];
            if (intersectionRatio > ratio) {
                target.classList.add('animated');
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: '0px 0px -15% 0px',
            threshold: thresholdSteps,
            //root: document.body
        });
        observer.observe(el);
    })
}
