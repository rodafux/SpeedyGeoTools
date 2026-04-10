function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'fr',
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
        if (text.includes(filter)) {
            link.style.display = '';
        } else {
            link.style.display = 'none';
        }
    });

    const detailsBlocks = nav.querySelectorAll('details');
    detailsBlocks.forEach(detail => {
        const visibleLinks = Array.from(detail.querySelectorAll('a')).filter(a => a.style.display !== 'none');
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
        
        const summary = document.createElement('summary');
        summary.innerHTML = '⭐ Favoris';
        
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
        if (href === 'index.html' || href === '#') return;
        
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
    const index = favs.findIndex(f => f.href === href);
    
    if (index > -1) {
        favs.splice(index, 1);
    } else {
        favs.push({ href, text });
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
            a.href = fav.href;
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
        if (favs.some(f => f.href === star.dataset.href)) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}