window.LabelFormats = window.LabelFormats || {};
window.LabelFormats.small = {
    generate: function(cache, t, isPreview, owner, mail) {
        let qrImgHtml = '';
        if (cache.hasQr && cache.qrUrl) {
            const tempCanvas = document.createElement('canvas');
            // AJOUT DE LA REDIRECTION ICI
            const finalQrUrl = "https://speedygeotools.com/redirection.html?url=" + encodeURIComponent(cache.qrUrl);
            new QRious({ element: tempCanvas, value: finalQrUrl, size: 150 });
            qrImgHtml = `
                <div style="flex: 0 0 11.5mm; display:flex; justify-content:flex-end; align-items:flex-end;">
                    <img src="${tempCanvas.toDataURL()}" style="width: 11.5mm; height: 11.5mm; object-fit: contain;">
                </div>`;
        }

        let leftColHtml = '';
        if (cache.logoBase64 || cache.code) {
            leftColHtml = `
                <div style="flex: 0 0 18mm; display:flex; flex-direction:column; align-items:center; justify-content:center; padding-right: 2mm; gap: 0.5mm;">
                    ${cache.logoBase64 ? `<img src="${cache.logoBase64}" style="max-height: 13mm; max-width: 16mm; object-fit: contain; flex-shrink:0;">` : ''}
                    ${cache.code ? `<div style="font-size: 8pt; font-weight:bold; color: #444; line-height:1; text-align:center;">${cache.code}</div>` : ''}
                </div>`;
        }

        const warnHtml = cache.hasWarn ? `<div style="font-size: 5pt; color: #d32f2f; font-weight:700; margin-bottom: 0.8mm; line-height:1.1; width:100%; text-align:left; white-space: normal;">${t.labelWarn}</div>` : '';
        const nameHtml = cache.name ? `<div style="width: 100%; text-align: center;"><div style="font-size: 7.2pt; font-weight:bold; color: #000; margin-bottom: 0; border: 1.2px solid #000; padding: 0.5mm 1mm; box-sizing:border-box; display:inline-block; max-width:100%; overflow-wrap: break-word; word-wrap: break-word; white-space: normal; line-height:1.1;">${cache.name}</div></div>` : '';
        const ownerHtml = owner ? `<div style="font-size: 6pt; color: #333; line-height:1.1; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${t.labelOwnerPrefix}${owner}</div>` : '';
        const mailHtml = mail ? `<div style="font-size: 6pt; color: #333; line-height:1.1; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${t.labelMailPrefix}${mail}</div>` : '';

        const borderStyle = isPreview ? 'border: 1px solid #ccc; box-shadow: 0 4px 6px rgba(0,0,0,0.1);' : 'border: 1px dashed #999;';

        return `
            <div class="print-label" style="width: 80mm; height: 40mm; background: #fff; box-sizing: border-box; display: flex; flex-direction: column; overflow: hidden; position: relative; ${borderStyle}">
                
                <div style="background-color: #2e7d32 !important; color: #fff !important; width: 100%; height: 9mm; text-align: center; flex-shrink: 0; box-sizing:border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; position: relative; display: flex; align-items: center; justify-content: center;">
                    <img src="Logo_Geocaching_4squares_White.png" style="position: absolute; left: 2.5mm; height: 6.5mm; width: auto; object-fit: contain;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-weight: 700; text-transform: uppercase; font-size: 7.5pt; line-height:1;">${t.labelHeader}</div>
                        <div style="font-size: 5.5pt; font-weight: 500; line-height:1; margin-top: 1px;">speedygeotools.com</div>
                    </div>
                </div>

                <div style="display:flex; flex-direction:row; flex:1; width: 100%; padding: 1mm 2mm; box-sizing:border-box; overflow:hidden; align-items: stretch;">
                    ${leftColHtml}
                    <div style="flex:1; display:flex; flex-direction:column; justify-content: space-between; min-width:0; height: 100%; overflow: hidden;">
                        <div style="flex: 1 1 auto; display: flex; flex-direction: column; min-height: 0; padding-top: 0.2mm;">
                            ${warnHtml}
                            ${nameHtml}
                        </div>
                        <div style="flex: 0 0 11.5mm; display:flex; flex-direction:row; width:100%; justify-content:space-between; align-items:flex-end;">
                            <div style="flex:1; min-width:0; overflow:hidden; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 0.2mm;">
                                ${ownerHtml}
                                ${mailHtml}
                            </div>
                            ${qrImgHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};