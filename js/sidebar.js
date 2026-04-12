document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('sidebar-placeholder');
    if (!sidebarContainer) return;

    const isFrench = window.location.pathname.includes('/fr/');
    const pathPrefix = isFrench ? '../' : '';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const menuData = {
        home: isFrench ? 'Accueil' : 'Home',
        searchPlaceholder: isFrench ? '🔍 Rechercher un outil...' : '🔍 Search a tool...',
        discordJoin: isFrench ? 'Rejoindre le Discord' : 'Join the Discord',
        cacheCreation: isFrench ? 'Création de Cache' : 'Cache Creation',
        labelCreator: isFrench ? "Créateur d'Étiquettes" : 'Label Creator',
        logbookCreator: isFrench ? 'Créateur de Logbook' : 'Logbook Creator',
        qrcodeCreator: isFrench ? 'Créateur de QR Code' : 'QR Code Creator'
    };

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
                        <svg viewBox="0 0 127.14 96.36" width="22" height="22" fill="currentColor"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.08,65.69,84.69,65.69Z"/></svg>
                        <span>${menuData.discordJoin}</span>
                    </a>
                </div>
                <div class="sidebar-nav">
                    <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">${menuData.home}</a>
                    <details open>
                        <summary>${menuData.cacheCreation}</summary>
                        <a href="labels.html" class="${currentPage === 'labels.html' ? 'active' : ''}">${menuData.labelCreator}</a>
                        <a href="logbook.html" class="${currentPage === 'logbook.html' ? 'active' : ''}">${menuData.logbookCreator}</a>
                        <a href="qrcode.html" class="${currentPage === 'qrcode.html' ? 'active' : ''}">${menuData.qrcodeCreator}</a>
                    </details>
                </div>
            </div>
        </div>
    `;

    sidebarContainer.innerHTML = sidebarHTML;
});