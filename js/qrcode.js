document.addEventListener('DOMContentLoaded', () => {
    const printStyle = document.createElement('style');
    printStyle.innerHTML = `
        @media screen {
            #printContainer { display: none !important; }
        }
        @media print {
            @page { margin: 10mm; size: A4 portrait; }
            #sidebar-placeholder, .app-sidebar, .site-footer, .no-print, header, nav, .container { 
                display: none !important; 
            }
            .app-content { 
                display: block !important; 
                margin: 0 !important; 
                padding: 0 !important; 
                border: none !important; 
            }
            #printContainer {
                display: flex !important;
                flex-wrap: wrap;
                align-content: flex-start;
                justify-content: flex-start;
                gap: 2mm;
                width: 100%;
                visibility: visible !important;
            }
        }
        .cut-wrapper {
            border: 1px dashed #999;
            box-sizing: border-box;
            background: #fff;
            page-break-inside: avoid;
            break-inside: avoid;
            overflow: hidden;
        }
        .qrcode-canvas canvas, .qrcode-canvas img {
            max-width: 100% !important;
            max-height: 100% !important;
            width: auto !important;
            height: auto !important;
            object-fit: contain;
        }
    `;
    document.head.appendChild(printStyle);

    const printBtn = document.getElementById('printBtn');
    const previewPanel = document.getElementById('previewPanel');
    const singlePreview = document.getElementById('singlePreview');
    const printContainer = document.getElementById('printContainer');
    const logoInput = document.getElementById('qrLogo');
    const isFrench = window.location.pathname.includes('/fr/');
    
    let currentLogoData = null;
    let previewTimeout = null;

    function triggerPreviewUpdate() {
        clearTimeout(previewTimeout);
        previewTimeout = setTimeout(updatePreview, 150);
    }

    const inputIds = ['qrUrl', 'qrTitle', 'qrTitleSize', 'qrTitlePos', 'qrColor', 'qrDesign', 'qrCornerSquare', 'qrCornerDot', 'qrSize'];
    inputIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', triggerPreviewUpdate);
            el.addEventListener('change', triggerPreviewUpdate);
        }
    });

    if (logoInput) {
        logoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.onload = function() {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const radius = Math.min(img.width, img.height) * 0.2;
                        
                        ctx.beginPath();
                        ctx.moveTo(radius, 0);
                        ctx.lineTo(canvas.width - radius, 0);
                        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
                        ctx.lineTo(canvas.width, canvas.height - radius);
                        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
                        ctx.lineTo(radius, canvas.height);
                        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
                        ctx.lineTo(0, radius);
                        ctx.quadraticCurveTo(0, 0, radius, 0);
                        ctx.closePath();
                        
                        ctx.clip();
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        
                        currentLogoData = canvas.toDataURL();
                        triggerPreviewUpdate();
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                currentLogoData = null;
                triggerPreviewUpdate();
            }
        });
    }

    async function updatePreview() {
        const url = document.getElementById('qrUrl').value;
        if (!url) {
            singlePreview.innerHTML = '';
            previewPanel.style.display = 'none';
            return;
        }

        const sizeInput = document.getElementById('qrSize');
        let sizeCm = parseFloat(sizeInput.value) || 5;
        if (sizeCm > 19) { sizeCm = 19; sizeInput.value = 19; }
        if (sizeCm < 2) { sizeCm = 2; sizeInput.value = 2; }

        previewPanel.style.display = 'flex';
        singlePreview.innerHTML = '';

        const preWrapper = document.createElement('div');
        preWrapper.className = 'cut-wrapper';
        singlePreview.appendChild(preWrapper);
        await createQRCodeElement(preWrapper, true);
    }

    if (printBtn) {
        printBtn.addEventListener('click', async () => {
            const url = document.getElementById('qrUrl').value;
            if (!url) {
                alert(isFrench ? 'Veuillez entrer un lien (URL) valide.' : 'Please enter a valid link (URL).');
                return;
            }

            const quantity = parseInt(document.getElementById('qrQuantity').value, 10) || 1;
            printContainer.innerHTML = '';

            const originalText = printBtn.textContent;
            printBtn.textContent = isFrench ? 'Préparation...' : 'Preparing...';
            printBtn.disabled = true;

            try {
                const promises = [];
                for (let i = 0; i < quantity; i++) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'cut-wrapper';
                    printContainer.appendChild(wrapper);
                    promises.push(createQRCodeElement(wrapper, false));
                }
                const results = await Promise.all(promises);
                
                const hasTruncation = results.some(r => r.isTruncated);
                if (hasTruncation) {
                    const msg = isFrench 
                        ? "Attention : Le titre est trop long pour la taille choisie et sera coupé sur le PDF. Voulez-vous continuer ?" 
                        : "Warning: The title is too long for the chosen size and will be truncated on the PDF. Continue?";
                    if (!confirm(msg)) {
                        printBtn.textContent = originalText;
                        printBtn.disabled = false;
                        return;
                    }
                }

                setTimeout(() => {
                    window.print();
                    printBtn.textContent = originalText;
                    printBtn.disabled = false;
                    setTimeout(() => { printContainer.innerHTML = ''; }, 1000);
                }, 500);
            } catch(e) {
                printBtn.textContent = originalText;
                printBtn.disabled = false;
            }
        });
    }

    function createQRCodeElement(container, isPreview) {
        return new Promise((resolve) => {
            const rawUrl = document.getElementById('qrUrl').value;
            const encodedUrl = encodeURIComponent(rawUrl);
            const redirectBase = isFrench 
                ? 'https://speedygeotools.com/fr/redirection.html?url=' 
                : 'https://speedygeotools.com/redirection.html?url=';
            const finalUrl = redirectBase + encodedUrl;

            const titleText = document.getElementById('qrTitle').value;
            const titlePos = document.getElementById('qrTitlePos').value;
            const titleSize = document.getElementById('qrTitleSize').value || 12;
            const color = document.getElementById('qrColor').value;
            
            const design = document.getElementById('qrDesign').value;
            const cornerSquare = document.getElementById('qrCornerSquare').value;
            const cornerDot = document.getElementById('qrCornerDot').value;
            
            const sizeCm = parseFloat(document.getElementById('qrSize').value) || 5;
            const renderRes = 1024;
            
            const boxWidth = isPreview ? 6 : sizeCm;
            container.style.width = boxWidth + 'cm';
            container.style.height = boxWidth + 'cm';
            container.style.padding = '1mm';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';

            const itemBox = document.createElement('div');
            itemBox.style.fontFamily = "'Inter', sans-serif";
            itemBox.style.display = 'flex';
            itemBox.style.flexDirection = 'column';
            itemBox.style.alignItems = 'center';
            itemBox.style.width = '100%';
            itemBox.style.height = '100%';
            itemBox.style.justifyContent = 'space-evenly';
            itemBox.style.boxSizing = 'border-box';
            itemBox.style.gap = '1px';
            
            const titleEl = document.createElement('div');
            titleEl.className = 'qrcode-title';
            titleEl.textContent = titleText;
            titleEl.style.fontWeight = 'bold';
            titleEl.style.color = '#333';
            titleEl.style.fontSize = titleSize + 'pt';
            titleEl.style.margin = '0';
            titleEl.style.textAlign = 'center';
            titleEl.style.width = '100%';
            titleEl.style.whiteSpace = 'nowrap';
            titleEl.style.overflow = 'hidden';
            titleEl.style.textOverflow = 'ellipsis';
            titleEl.style.flexShrink = '0';
            
            const qrBox = document.createElement('div');
            qrBox.className = 'qrcode-canvas';
            qrBox.style.display = 'flex';
            qrBox.style.alignItems = 'center';
            qrBox.style.justifyContent = 'center';
            qrBox.style.width = '100%';
            qrBox.style.flex = '1';
            qrBox.style.minHeight = '0';

            let resolved = false;
            const resolveOnce = () => {
                if (!resolved) {
                    resolved = true;
                    const isTruncated = titleEl.scrollWidth > titleEl.clientWidth;
                    resolve({ isTruncated });
                }
            };

            const qrCode = new QRCodeStyling({
                width: renderRes,
                height: renderRes,
                type: "canvas",
                data: finalUrl,
                image: currentLogoData || "",
                dotsOptions: {
                    color: color,
                    type: design
                },
                backgroundOptions: {
                    color: "#ffffff"
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 5,
                    imageSize: 0.3
                },
                cornersSquareOptions: {
                    color: color,
                    type: cornerSquare
                },
                cornersDotOptions: {
                    color: color,
                    type: cornerDot
                },
                qrOptions: {
                    errorCorrectionLevel: 'H'
                }
            });

            if (titlePos === 'top' && titleText) {
                itemBox.appendChild(titleEl);
                itemBox.appendChild(qrBox);
            } else if (titlePos === 'bottom' && titleText) {
                itemBox.appendChild(qrBox);
                itemBox.appendChild(titleEl);
            } else {
                itemBox.appendChild(qrBox);
            }

            container.appendChild(itemBox);
            
            qrCode.getRawData("png").then((buffer) => {
                const img = document.createElement('img');
                const blob = new Blob([buffer], { type: "image/png" });
                img.src = URL.createObjectURL(blob);
                qrBox.appendChild(img);
                resolveOnce();
            }).catch(() => {
                resolveOnce();
            });

            setTimeout(resolveOnce, 2000);
        });
    }

    triggerPreviewUpdate();
});