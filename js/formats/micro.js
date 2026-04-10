window.LabelFormats = window.LabelFormats || {};
window.LabelFormats.micro = {
    generate: function(cache, passedT, isPreview, owner, mail) {
        const fontScale = isPreview ? 1.4 : 1;
        
        // AUTO-GUÉRISON : Si l'impression envoie une variable 'passedT' cassée (ce qui cause le undefined),
        // le format va lui-même chercher la bonne langue dans ton objet i18n global.
        let t = passedT;
        if (!t || !t.labelHeader) {
            const langSelect = document.getElementById('pdfLanguage');
            const currentLang = langSelect ? langSelect.value : 'fr';
            if (typeof i18n !== 'undefined') {
                t = i18n[currentLang] || i18n['fr'];
            }
        }

        // Sécurité ultime pour l'affichage
        const safeHeader = (t && t.labelHeader) ? t.labelHeader : "GÉOCACHE OFFICIELLE";
        const safeWarn = (t && t.labelWarn) ? t.labelWarn : "SVP ne pas détruire ou déplacer. Ce récipient fait partie d'un jeu mondial (Geocaching). Laissez-le en place. Infos : geocaching.com";
        const safeOwnerPrefix = (t && t.labelOwnerPrefix) ? t.labelOwnerPrefix : "Créée par : ";
        const safeMailPrefix = (t && t.labelMailPrefix) ? t.labelMailPrefix : "Mail : ";

        // Tailles de police optimisées
        const sizeWarn = 4;
        const sizeName = 5.5; 
        const sizeCode = 5;
        const sizeContact = 4;

        // Application des textes sécurisés et traduits
        const warnHtml = cache.hasWarn ? `<div style="flex-shrink: 0; font-size: ${sizeWarn}pt; color: #d32f2f; font-weight:700; margin-bottom: 0.3mm; line-height:1; text-align:center; width:100%; white-space: normal;">${safeWarn}</div>` : '';
        
        const nameHtml = cache.name ? `<div style="flex-shrink: 0; width: 100%; text-align: center; margin-bottom: 0.3mm;"><div style="font-size: ${sizeName}pt; font-weight:bold; color: #000; border: 1px solid #000; padding: 0.2mm 0.8mm; box-sizing:border-box; display:inline-block; max-width:100%; overflow-wrap: break-word; word-wrap: break-word; white-space: normal; line-height:1;">${cache.name}</div></div>` : '';
        
        const codeHtml = cache.code ? `<div style="flex-shrink: 0; font-size: ${sizeCode}pt; font-weight:bold; color: #444; line-height:1; margin-bottom: 0.3mm; text-align: center;">${cache.code}</div>` : '';
        
        const ownerHtml = owner ? `<div style="flex-shrink: 0; font-size: ${sizeContact}pt; color: #333; line-height:1; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; max-width:100%; text-align: center;">${safeOwnerPrefix}${owner}</div>` : '';
        const mailHtml = mail ? `<div style="flex-shrink: 0; font-size: ${sizeContact}pt; color: #333; line-height:1; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; max-width:100%; text-align: center;">${safeMailPrefix}${mail}</div>` : '';

        return `
            <div class="print-label" style="width: ${isPreview ? '100%' : '50mm'}; height: ${isPreview ? 'auto' : '25mm'}; min-height: ${isPreview ? '130px' : '25mm'}; background: #fff; box-sizing: border-box; display: flex; flex-direction: column; overflow: hidden; position: relative; ${isPreview ? 'border:none;' : 'border: 1px dashed #999;'}">
                
                <div style="background-color: #2e7d32 !important; color: #fff !important; width: 100%; height: ${isPreview ? '32px' : '6.5mm'}; text-align: center; flex-shrink: 0; box-sizing:border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; position: relative; display: flex; align-items: center; justify-content: center;">
                    <img src="Logo_Geocaching_4squares_White.png" style="position: absolute; left: 1.5mm; height: ${isPreview ? '22px' : '4.5mm'}; width: auto; object-fit: contain;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: 700; text-transform: uppercase; font-size: ${6.5 * fontScale}pt; line-height:1;">${safeHeader}</div>
                        <div style="font-size: 4.5pt; font-weight: 500; line-height:1; margin-top: 0.5mm;">speedygeotools.com</div>
                    </div>
                </div>
                
                <div style="display:flex; flex-direction:column; flex:1; width: 100%; padding: 0.5mm 1mm; box-sizing:border-box; overflow:hidden; justify-content: space-between;">
                    
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; width: 100%; flex-shrink: 0;">
                        ${warnHtml}
                        ${nameHtml}
                        ${codeHtml}
                    </div>
                    
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 100%; flex-shrink: 0;">
                        ${ownerHtml}
                        ${mailHtml}
                    </div>
                    
                </div>
            </div>
        `;
    }
};