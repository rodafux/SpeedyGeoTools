(function() {
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
        return null;
    }
    if (!getCookie('googtrans')) {
        const userLang = navigator.language || navigator.userLanguage;
        const shortLang = userLang.split('-')[0].toLowerCase();
        
        if (shortLang !== 'fr' && shortLang !== 'en') {
            document.cookie = "googtrans=/en/" + shortLang + "; path=/";
            document.cookie = "googtrans=/en/" + shortLang + "; domain=." + location.hostname + "; path=/";
        }
    }
})();

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

document.addEventListener('DOMContentLoaded', () => {
    initFavorites();
});

function toggleMobileMenu() {
    const content = document.getElementById('sidebarContent');
    if (content) {
        content.classList.toggle('active');
    }
}

function filterTools() {
    const input = document.getElementById('toolSearch');
    if (!input) return;
    const filter = input.value.toLowerCase();
    const nav = document.querySelector('.sidebar-nav');
    if (!nav) return;

    const links = nav.querySelectorAll('a');
    links.forEach(link => {
        const text = link.textContent.toLowerCase();
        
        let elementToHide = link;
        if (link.parentElement && link.parentElement.tagName.toLowerCase() === 'div') {
            const nextEl = link.nextElementSibling;
            if (nextEl && nextEl.classList.contains('star-btn')) {
                elementToHide = link.parentElement;
            }
        }

        if (text.includes(filter)) {
            elementToHide.style.display = (elementToHide === link) ? '' : 'flex';
        } else {
            elementToHide.style.display = 'none';
        }
    });

    const detailsBlocks = nav.querySelectorAll('details');
    detailsBlocks.forEach(detail => {
        const visibleLinks = Array.from(detail.querySelectorAll('a')).filter(a => {
            let el = a;
            if (a.parentElement && a.parentElement.tagName.toLowerCase() === 'div') {
                const nextEl = a.nextElementSibling;
                if (nextEl && nextEl.classList.contains('star-btn')) {
                    el = a.parentElement;
                }
            }
            return el.style.display !== 'none';
        });
        
        if (filter !== '') {
            detail.open = true;
            detail.style.display = visibleLinks.length > 0 ? 'block' : 'none';
        } else {
            detail.style.display = 'block';
        }
    });
}

function initFavorites() {
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (!sidebarNav) return;

    let favSection = document.getElementById('favorites-section');
    if (!favSection) {
        favSection = document.createElement('details');
        favSection.id = 'favorites-section';
        favSection.open = true;
        
        const currentLang = document.documentElement.lang;
        const favTitle = currentLang === 'fr' ? '⭐ Favoris' : '⭐ Favorites';
        
        const summary = document.createElement('summary');
        summary.innerHTML = favTitle;
        
        const list = document.createElement('div');
        list.id = 'favorites-list';
        list.style.display = 'flex';
        list.style.flexDirection = 'column';
        
        favSection.appendChild(summary);
        favSection.appendChild(list);
        
        const firstDetails = sidebarNav.querySelector('details');
        if (firstDetails) {
            sidebarNav.insertBefore(favSection, firstDetails);
        } else {
            sidebarNav.appendChild(favSection);
        }
    }

    const allLinks = Array.from(sidebarNav.querySelectorAll('details:not(#favorites-section) a'));
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('index.html') || href === '#') return;
        
        if (!link.querySelector('.star-btn')) {
            const text = link.textContent.trim();
            link.textContent = '';
            
            const textSpan = document.createElement('span');
            textSpan.textContent = text;
            
            const star = document.createElement('span');
            star.className = 'star-btn';
            star.innerHTML = '★';
            star.dataset.href = href;
            star.dataset.text = text;
            
            star.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(href, text);
            });
            
            link.appendChild(textSpan);
            link.appendChild(star);
        }
    });

    renderFavorites();
}

function toggleFavorite(href, text) {
    let favs = JSON.parse(localStorage.getItem('speedyGeoToolsFavs') || '[]');
    const cleanHref = href.replace('../', '');
    const index = favs.findIndex(f => f.href === cleanHref);
    
    if (index > -1) {
        favs.splice(index, 1);
    } else {
        favs.push({ href: cleanHref, text });
    }
    
    localStorage.setItem('speedyGeoToolsFavs', JSON.stringify(favs));
    renderFavorites();
}

function renderFavorites() {
    const list = document.getElementById('favorites-list');
    const section = document.getElementById('favorites-section');
    if (!list || !section) return;
    
    let favs = JSON.parse(localStorage.getItem('speedyGeoToolsFavs') || '[]');
    
    list.innerHTML = '';
    
    if (favs.length === 0) {
        section.style.display = 'none';
    } else {
        section.style.display = 'block';
        favs.forEach(fav => {
            const a = document.createElement('a');
            
            const inSubfolder = window.location.pathname.includes('/fr/');
            a.href = inSubfolder ? '../' + fav.href : fav.href;
            
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            if (currentPath === fav.href) a.className = 'active';
            
            const textSpan = document.createElement('span');
            textSpan.textContent = fav.text;
            
            const star = document.createElement('span');
            star.className = 'star-btn active';
            star.innerHTML = '★';
            star.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(fav.href, fav.text);
            });
            
            a.appendChild(textSpan);
            a.appendChild(star);
            list.appendChild(a);
        });
    }

    const allStars = document.querySelectorAll('.sidebar-nav details:not(#favorites-section) .star-btn');
    allStars.forEach(star => {
        const cleanHref = star.dataset.href.replace('../', '');
        if (favs.some(f => f.href === cleanHref)) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}