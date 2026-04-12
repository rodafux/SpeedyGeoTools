document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const generateBtn = document.getElementById('generateBtn');
    const printBtn = document.getElementById('printBtn');
    const previewPanel = document.getElementById('previewPanel');
    const singlePreview = document.getElementById('singlePreview');
    const printContainer = document.getElementById('printContainer');
    const logoInput = document.getElementById('qrLogo');
    
    // Stockage du logo en Base64
    let currentLogoData = null;

    // Gestion de l'upload et de la conversion du logo
    logoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Le résultat est une chaîne Base64 utilisable par la bibliothèque
                currentLogoData = event.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            currentLogoData = null;
        }
    });

    // Bouton Générer et Prévisualiser
    generateBtn.addEventListener('click', () => {
        const url = document.getElementById('qrUrl').value;
        if (!url) {
            alert('Veuillez entrer un lien (URL) valide.');
            return;
        }

        // Afficher le panneau et le bouton d'impression
        previewPanel.style.display = 'block';
        printBtn.style.display = 'inline-block';
        
        // Effacer la prévisualisation précédente
        singlePreview.innerHTML = '';

        // Générer un seul exemplaire pour la prévisualisation
        createQRCodeElement(singlePreview, true);
    });

    // Bouton Imprimer en PDF
    printBtn.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('qrQuantity').value, 10) || 1;
        
        // Effacer le conteneur d'impression
        printContainer.innerHTML = '';

        // Appliquer des styles de grille de base pour l'impression
        printContainer.style.display = 'flex';
        printContainer.style.flexWrap = 'wrap';
        printContainer.style.gap = '15px'; // Espace entre les codes
        printContainer.style.justifyContent = 'flex-start';

        // Générer le nombre d'exemplaires demandés
        for (let i = 0; i < quantity; i++) {
            const wrapper = document.createElement('div');
            // Force le saut de page si nécessaire
            wrapper.style.pageBreakInside = 'avoid';
            wrapper.style.marginBottom = '10px';
            wrapper.style.textAlign = 'center';
            
            // Créer le code (sans styles de prévisualisation)
            createQRCodeElement(wrapper, false);
            printContainer.appendChild(wrapper);
        }

        // Lancer la boîte de dialogue d'impression du navigateur
        window.print();
    });

    /**
     * Crée et insère un élément QR Code stylisé dans un conteneur cible.
     * @param {HTMLElement} container - Le conteneur où insérer le code.
     * @param {boolean} isPreview - Si vrai, applique des styles de bordure de prévisualisation.
     */
    function createQRCodeElement(container, isPreview) {
        // Récupération des paramètres
        const url = document.getElementById('qrUrl').value;
        const titleText = document.getElementById('qrTitle').value;
        const titlePos = document.getElementById('qrTitlePos').value;
        const color = document.getElementById('qrColor').value;
        const size = parseInt(document.getElementById('qrSize').value, 10) || 300;
        const design = document.getElementById('qrDesign').value;

        // Création de l'enveloppe principale de l'item
        const itemBox = document.createElement('div');
        itemBox.className = isPreview ? 'qrcode-wrapper preview-mode' : 'qrcode-wrapper';
        itemBox.style.fontFamily = "'Open Sans', sans-serif"; // Correspond au thème
        itemBox.style.display = 'flex';
        itemBox.style.flexDirection = 'column';
        itemBox.style.alignItems = 'center';
        itemBox.style.width = 'fit-content';
        itemBox.style.margin = 'auto';
        
        // Élément pour le Titre
        const titleEl = document.createElement('div');
        titleEl.className = 'qrcode-title';
        titleEl.textContent = titleText;
        titleEl.style.fontWeight = 'bold';
        titleEl.style.color = '#333';
        // Taille du titre relative à la taille du code
        titleEl.style.fontSize = Math.max(12, size * 0.08) + 'px';
        titleEl.style.margin = '5px 0 10px 0';
        
        // Élément pour le QR Code lui-même (Canvas)
        const qrBox = document.createElement('div');
        qrBox.className = 'qrcode-canvas';

        // Configuration de la bibliothèque EasyQRCodeJS
        const options = {
            text: url,
            width: size,
            height: size,
            colorDark: color, // Couleur personnalisée
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H, // Niveau de correction H (Haut) requis pour les logos
            
            // Paramètres du Logo central
            logo: currentLogoData, // Image en Base64
            logoWidth: size * 0.22, // Taille du logo relative (22%)
            logoHeight: size * 0.22,
            logoBackgroundColor: '#ffffff',
            logoBackgroundTransparent: false, // Arrière-plan blanc pour le logo
            
            // Paramètres de design (arrondi)
            // dotScale: définit l'arrondi. 1 = carré, 0.5 = très arrondi.
            dotScale: design === 'rounded' ? 0.6 : 1
        };

        // Génération effective du QR Code dans l'élément qrBox
        new QRCode(qrBox, options);

        // Assemblage final selon la position choisie du titre
        if (titlePos === 'top' && titleText) {
            itemBox.appendChild(titleEl);
        }
        
        itemBox.appendChild(qrBox);

        if (titlePos === 'bottom' && titleText) {
            itemBox.appendChild(titleEl);
        }

        // Élément optionnel pour afficher l'URL en petit
        const urlEl = document.createElement('div');
        urlEl.textContent = url.length > 30 ? url.substring(0, 27) + "..." : url;
        urlEl.style.fontSize = '10px';
        urlEl.style.color = '#777';
        urlEl.style.marginTop = '5px';
        itemBox.appendChild(urlEl);

        // Insertion dans le conteneur cible
        container.appendChild(itemBox);
    }
});