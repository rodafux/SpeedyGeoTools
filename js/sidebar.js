document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('sidebar-placeholder');
    if (!sidebarContainer) return;

    const pathParts = window.location.pathname.split('/');
    let currentLang = 'en';
    if (pathParts.includes('fr')) currentLang = 'fr';
    if (pathParts.includes('de')) currentLang = 'de';

    const pathPrefix = (currentLang === 'fr' || currentLang === 'de') ? '../' : '';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const translations = {
        en: {
            home: 'Home',
            searchPlaceholder: '🔍 Search a tool...',
            discordJoin: 'Join the Discord',
            favorites: 'Favorites',
            cacheCreation: 'All tools',
            tools: [
                { id: 'labels.html', name: 'Label Creator' },
                { id: 'logbook.html', name: 'Logbook Creator' },
                { id: 'qrcode.html', name: 'QR Code Creator' },
                { id: 'podium.html', name: 'Podium Creator' }
            ]
        },
        fr: {
            home: 'Accueil',
            searchPlaceholder: '🔍 Rechercher un outil...',
            discordJoin: 'Rejoindre le Discord',
            favorites: 'Favoris',
            cacheCreation: 'Tous les outils',
            tools: [
                { id: 'labels.html', name: "Créateur d'Étiquettes" },
                { id: 'logbook.html', name: 'Créateur de Logbook' },
                { id: 'qrcode.html', name: 'Créateur de QR Code' },
                { id: 'podium.html', name: 'Créateur de Podium' }
            ]
        },
        de: {
            home: 'Startseite',
            searchPlaceholder: '🔍 Werkzeug suchen...',
            discordJoin: 'Dem Discord beitreten',
            favorites: 'Favoriten',
            cacheCreation: 'Alle Werkzeuge',
            tools: [
                { id: 'labels.html', name: 'Etiketten-Ersteller' },
                { id: 'logbook.html', name: 'Logbuch-Ersteller' },
                { id: 'qrcode.html', name: 'QR-Code-Ersteller' },
                { id: 'podium.html', name: 'Podium-Ersteller' }
            ]
        }
    };

    const menuData = translations[currentLang];
    
    menuData.tools.sort((a, b) => a.name.localeCompare(b.name, currentLang));

    function renderSidebar() {
        let favorites = JSON.parse(localStorage.getItem('speedyGeoToolsFavorites') || '[]');

        function createToolLink(tool, isFavSection) {
            const isFav = favorites.includes(tool.id);
            const isActive = currentPage === tool.id ? 'active' : '';
            return `
                <div style="display: flex; align-items: center; justify-content: space-between; padding-right: 15px;">
                    <a href="${tool.id}" class="${isActive}" style="flex-grow: 1; padding-right: 5px; margin-bottom: 0;">${tool.name}</a>
                    <span class="star-btn ${isFav ? 'active' : ''}" data-target="${tool.id}" title="${menuData.favorites}" style="color: ${isFav ? 'var(--primary-color)' : '#d1d9d4'}; cursor: pointer; font-size: 1.2rem; transition: transform 0.2s, color 0.2s;">★</span>
                </div>
            `;
        }

        const favTools = menuData.tools.filter(t => favorites.includes(t.id));
        const allTools = menuData.tools;

        let favSection = '';
        if (favTools.length > 0) {
            favSection = `
                <details open>
                    <summary>⭐ ${menuData.favorites}</summary>
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        ${favTools.map(t => createToolLink(t, true)).join('')}
                    </div>
                </details>
            `;
        }

        const discordIcon = `<svg viewBox="0 0 127.14 96.36" width="22" height="22" fill="currentColor"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.08,65.69,84.69,65.69Z"/></svg>`;

        const sidebarHTML = `
            <div class="app-sidebar no-print">
                <div class="sidebar-header">
                    <a href="index.html" class="sidebar-brand">
                        <img src="${pathPrefix}logo.png" alt="SpeedyGeoTools" class="brand-logo">
                    </a>
                    <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">☰</button>
                </div>
                <div class="sidebar-content" id="sidebarContent">
                    <div class="search-container">
                        <input type="text" id="toolSearch" placeholder="${menuData.searchPlaceholder}" onkeyup="filterTools()">
                    </div>
                    <div class="sidebar-discord">
                        <a href="https://discord.gg/7D9yHJCKaA" target="_blank">
                            ${discordIcon}
                            <span>${menuData.discordJoin}</span>
                        </a>
                    </div>
                    <div class="sidebar-nav">
                        <a href="index.html" class="${currentPage === 'index.html' || currentPage === '' ? 'active' : ''}">${menuData.home}</a>
                        ${favSection}
                        <details open>
                            <summary>🛠️ ${menuData.cacheCreation}</summary>
                            <div id="toolsListContainer" style="display: flex; flex-direction: column; gap: 5px;">
                                ${allTools.map(t => createToolLink(t, false)).join('')}
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        `;

        sidebarContainer.innerHTML = sidebarHTML;

        document.querySelectorAll('.star-btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() { this.style.transform = 'scale(1.2)'; });
            btn.addEventListener('mouseleave', function() { this.style.transform = 'scale(1)'; });

            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('data-target');
                let currentFavs = JSON.parse(localStorage.getItem('speedyGeoToolsFavorites') || '[]');
                
                if (currentFavs.includes(target)) {
                    currentFavs = currentFavs.filter(f => f !== target);
                } else {
                    currentFavs.push(target);
                }
                
                localStorage.setItem('speedyGeoToolsFavorites', JSON.stringify(currentFavs));
                renderSidebar();
            });
        });
    }

    renderSidebar();
});