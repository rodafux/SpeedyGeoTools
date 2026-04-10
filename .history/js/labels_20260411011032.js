let labelCaches = [];
let cacheIdCounter = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cachesListContainer')) {
        onSizeChange();
        if (labelCaches.length === 0) addCacheCard();
    }
});

function onSizeChange() {
    renderCachesList();
    updateLabelPreview();
}

function addCacheCard() {
    const id = cacheIdCounter++;
    labelCaches.push({ id, name: '', code: '', qty: 1, hasQr: false, qrUrl: '', hasWarn: true, logoBase64: null });
    renderCachesList();
    updateLabelPreview();
}

function removeCache(id) {
    if (labelCaches.length <= 1) return;
    labelCaches = labelCaches.filter(c => c.id !== id);
    renderCachesList();
    updateLabelPreview();
}

function updateCacheData(id, field, value) {
    const cache = labelCaches.find(c => c.id === id);
    if (cache) { cache[field] = value; updateLabelPreview(); }
}

function handleLogoUpload(event, id) {
    const file = event.target.files[0];
    const cache = labelCaches.find(c => c.id === id);
    if (file && cache) {
        const reader = new FileReader();
        reader.onload = (e) => { cache.logoBase64 = e.target.result; updateLabelPreview(); };
        reader.readAsDataURL(file);
    }
}

function renderCachesList() {
    const container = document.getElementById('cachesListContainer');
    if (!container) return;
    
    const size = document.getElementById('labelSize').value;
    const canShowLogo = (size === 'small' || size === 'regular');
    const canShowQr = (size === 'small' || size === 'regular');
    
    container.innerHTML = '';
    labelCaches.forEach((cache, index) => {
        const card = document.createElement('div');
        card.style.marginBottom = '20px';
        card.style.padding = '15px';
        card.style.border = '1px solid var(--border-color)';
        card.style.borderRadius = '8px';
        card.style.backgroundColor = 'var(--bg-surface)';
        
        const isQrChecked = cache.hasQr ? 'checked' : '';
        const qrDisplay = (canShowQr && cache.hasQr) ? 'block' : 'none';
        
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-weight:bold;">
                Cache #${index + 1}
                <button onclick="removeCache(${cache.id})" style="width:auto; padding:5px 10px; background:transparent; color:#d32f2f; margin:0; box-shadow:none;">× Supprimer</button>
            </div>
            
            <div class="form-group">
                <label>Nom de la cache (75 car. max) :</label>
                <input type="text" value="${cache.name}" maxlength="75" onkeyup="updateCacheData(${cache.id}, 'name', this.value)">
            </div>
            <div class="form-group">
                <label>Code GC (8 car. max) :</label>
                <input type="text" value="${cache.code}" maxlength="8" onkeyup="updateCacheData(${cache.id}, 'code', this.value)">
            </div>
            <div class="form-group">
                <label>Quantité :</label>
                <input type="number" value="${cache.qty}" min="1" onchange="updateCacheData(${cache.id}, 'qty', parseInt(this.value) || 1)">
            </div>
            <div class="form-group" style="display: ${canShowLogo ? 'block' : 'none'};">
                <label>Logo personnalisé (Optionnel) :</label>
                <input type="file" accept="image/png, image/jpeg" onchange="handleLogoUpload(event, ${cache.id})">
            </div>
            
            <div class="form-group checkbox-group" style="display: ${canShowQr ? 'flex' : 'none'};">
                <input type="checkbox" id="qrCheck_${cache.id}" ${isQrChecked} onchange="updateCacheData(${cache.id}, 'hasQr', this.checked); document.getElementById('qrGroup_${cache.id}').style.display = this.checked ? 'block' : 'none';">
                <label for="qrCheck_${cache.id}">Ajouter un QR Code</label>
            </div>
            <div id="qrGroup_${cache.id}" class="form-group" style="display: ${qrDisplay};">
                <label>Lien du QR Code :</label>
                <input type="text" value="${cache.qrUrl}" placeholder="https://..." onkeyup="updateCacheData(${cache.id}, 'qrUrl', this.value)">
            </div>
            
            <div class="form-group checkbox-group">
                <input type="checkbox" id="warnCheck_${cache.id}" ${cache.hasWarn ? 'checked' : ''} onchange="updateCacheData(${cache.id}, 'hasWarn', this.checked)">
                <label for="warnCheck_${cache.id}">Imprimer l'avertissement Geocaching</label>
            </div>
        `;
        container.appendChild(card);
    });
}

function updateLabelPreview() {
    const container = document.getElementById('labelPreviewContainer');
    if (!container || labelCaches.length === 0) return;
    container.innerHTML = '';
    
    const size = document.getElementById('labelSize').value;
    const owner = document.getElementById('labelOwner').value;
    const mail = document.getElementById('labelMail').value;
    const langCode = document.getElementById('pdfLanguage').value;
    const t = typeof i18n !== 'undefined' ? (i18n[langCode] || i18n['fr']) : {};
    
    if(window.LabelFormats && window.LabelFormats[size]) {
        labelCaches.forEach((cache, index) => {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex'; 
            wrapper.style.flexDirection = 'column'; 
            wrapper.style.alignItems = 'center'; 
            wrapper.style.marginBottom = '20px';
            
            const title = document.createElement('div');
            title.style.marginBottom = '10px'; 
            title.style.fontWeight = 'bold'; 
            title.innerText = `Aperçu (Cache #${index + 1})`;
            wrapper.appendChild(title);
            
            const previewDiv = document.createElement('div');
            previewDiv.style.display = 'flex'; 
            previewDiv.style.justifyContent = 'center';
            previewDiv.innerHTML = window.LabelFormats[size].generate(cache, t, true, owner, mail);
            
            wrapper.appendChild(previewDiv);
            container.appendChild(wrapper);
        });
    }
}

function exportConfig() {
    let defaultName = `speedygeotools_labels_${new Date().toISOString().slice(0, 10)}`;
    let fileName = prompt("Sous quel nom voulez-vous enregistrer cette configuration ?", defaultName);
    
    if (!fileName) return;
    if (!fileName.endsWith(".json")) fileName += ".json";

    const config = {
        version: "1.1",
        global: {
            size: document.getElementById('labelSize').value,
            owner: document.getElementById('labelOwner').value,
            mail: document.getElementById('labelMail').value,
            lang: document.getElementById('pdfLanguage').value
        },
        caches: labelCaches
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function importConfig(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            if (config.global) {
                if(document.getElementById('labelSize')) document.getElementById('labelSize').value = config.global.size || 'regular';
                if(document.getElementById('labelOwner')) document.getElementById('labelOwner').value = config.global.owner || '';
                if(document.getElementById('labelMail')) document.getElementById('labelMail').value = config.global.mail || '';
                if(document.getElementById('pdfLanguage')) document.getElementById('pdfLanguage').value = config.global.lang || 'fr';
            }
            if (config.caches && Array.isArray(config.caches)) {
                labelCaches = config.caches;
                cacheIdCounter = 0;
                labelCaches.forEach(c => { 
                    c.id = cacheIdCounter++;
                });
            }
            onSizeChange();
            event.target.value = '';
        } catch (err) {
            alert("Erreur lors de l'import : fichier invalide.");
        }
    };
    reader.readAsText(file);
}

function generateLabelsAndPrint() {
    const size = document.getElementById('labelSize').value;
    const owner = document.getElementById('labelOwner').value.trim();
    const mail = document.getElementById('labelMail').value.trim();
    const langCode = document.getElementById('pdfLanguage').value;
    const t = typeof i18n !== 'undefined' ? (i18n[langCode] || i18n['fr']) : {};
    
    const renderArea = document.getElementById('render-area');
    renderArea.innerHTML = '';
    
    const page = document.createElement('div');
    page.className = 'a4-page';
    page.style.display = 'flex';
    page.style.flexWrap = 'wrap';
    page.style.gap = '2mm';
    page.style.alignContent = 'flex-start';
    
    if(window.LabelFormats && window.LabelFormats[size]) {
        labelCaches.forEach(cache => {
            for (let i = 0; i < cache.qty; i++) {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = window.LabelFormats[size].generate(cache, t, false, owner, mail);
                page.appendChild(wrapper.firstElementChild);
            }
        });
    }
    
    renderArea.appendChild(page);
    setTimeout(() => { window.print(); }, 500);
}