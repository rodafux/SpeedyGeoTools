window.LabelFormats = window.LabelFormats || {};
window.LabelFormats.regular = {
    generate: function(cache, t, isPreview, owner, mail) {
        const fontScale = isPreview ? 1.2 : 1;
        let qrImgHtml = '';
        if (cache.hasQr && cache.qrUrl) {
            const tempCanvas = document.createElement('canvas');
            new QRious({ element: tempCanvas, value: cache.qrUrl, size: 250 });
            qrImgHtml = `<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; width: 22mm; flex-shrink: 0;"><img src="${tempCanvas.toDataURL()}" style="max-width: 100%; height: 18mm; object-fit: contain; display: block;"><div style="font-size: 5.5pt; color: #555; margin-top: 0.5mm; text-align: center; line-height: 1; width: 100%;">${t.labelQrWarn}</div></div>`;
        }

        const customLogoHtml = cache.logoBase64 ? `<img src="${cache.logoBase64}" style="max-height: 20mm; max-width: 100%; object-fit: contain; flex-shrink: 0;">` : '';
        const warnHtml = cache.hasWarn ? `<div style="font-size: 7.5pt; color: #d32f2f; font-weight:700; margin-bottom: 1.5mm; line-height:1.1; width:100%; text-align:left;">${t.labelWarn}</div>` : '';
        const nameHtml = cache.name ? `<div style="font-size: 11pt; font-weight:bold; color: #000; margin-bottom: 1.5mm; border: 1.5px solid #000; padding: 0.8mm 1.5mm; box-sizing:border-box; text-align:center; width:fit-content; max-width:100%; word-wrap: break-word; line-height:1.1;">${cache.name}</div>` : '';
        const codeHtml = cache.code ? `<div style="font-size: 10.5pt; font-weight:bold; color: #444; margin-bottom: 1mm;">${cache.code}</div>` : '';
        const ownerHtml = owner ? `<div style="font-size: 8.5pt; color: #333; line-height:1.1;">${t.labelOwnerPrefix}${owner}</div>` : '';
        const mailHtml = mail ? `<div style="font-size: 8.5pt; color: #333; line-height:1.1;">${t.labelMailPrefix}${mail}</div>` : '';

        return `
            <div class="print-label" style="width: ${isPreview ? '100%' : '120mm'}; height: ${isPreview ? 'auto' : '60mm'}; min-height: ${isPreview ? '250px' : '60mm'}; background: #fff; box-sizing: border-box; display: flex; flex-direction: column; overflow: hidden; position: relative; ${isPreview ? 'border:1px solid #ccc; margin-bottom:10px;' : 'border: 1px dashed #999;'}">
                <div style="background-color: #2e7d32 !important; color: #fff !important; width: 100%; height: ${isPreview ? '50px' : '12mm'}; text-align: center; flex-shrink: 0; box-sizing:border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; position: relative; display: flex; align-items: center; justify-content: center;">
                    <img src="Logo_Geocaching_4squares_White.png" style="position: absolute; left: ${isPreview ? '15px' : '3mm'}; height: ${isPreview ? '35px' : '9mm'}; width: auto; object-fit: contain;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: 800; text-transform: uppercase; font-size: ${11*fontScale}pt; line-height:1;">${t.labelHeader}</div>
                        <div style="font-size: 8pt; font-weight: 500; line-height:1; margin-top: 2px;">speedygeotools.com</div>
                    </div>
                </div>
                <div style="display:flex; flex-direction:row; flex:1; align-items:center; width: 100%; padding: 1mm 4mm; box-sizing:border-box; gap: 4mm; overflow:hidden;">
                    <div style="flex: 0 0 28mm; display:flex; justify-content:center; align-items:center;">
                        ${customLogoHtml}
                    </div>
                    <div style="flex:1; display:flex; flex-direction:column; justify-content:center; min-width:0; overflow:hidden;">
                        ${warnHtml}${nameHtml}${codeHtml}${ownerHtml}${mailHtml}
                    </div>
                    <div style="flex: 0 0 22mm; display:flex; justify-content:center; align-items:center;">
                        ${qrImgHtml}
                    </div>
                </div>
            </div>
        `;
    }
};