document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const printBtn = document.getElementById('printBtn');
    const previewPanel = document.getElementById('previewPanel');
    const singlePreview = document.getElementById('singlePreview');
    const printContainer = document.getElementById('printContainer');
    
    let currentLogoData = null;

    document.getElementById('qrLogo').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                currentLogoData = event.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            currentLogoData = null;
        }
    });

    generateBtn.addEventListener('click', () => {
        const url = document.getElementById('qrUrl').value;
        if (!url) {
            alert('Veuillez entrer un lien (URL).');
            return;
        }

        previewPanel.style.display = 'block';
        printBtn.style.display = 'inline-block';
        singlePreview.innerHTML = '';

        createQRCodeElement(singlePreview);
    });

    printBtn.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('qrQuantity').value, 10) || 1;
        printContainer.innerHTML = '';

        printContainer.style.display = 'flex';
        printContainer.style.flexWrap = 'wrap';
        printContainer.style.gap = '20px';
        printContainer.style.justifyContent = 'center';

        for (let i = 0; i < quantity; i++) {
            const wrapper = document.createElement('div');
            wrapper.style.pageBreakInside = 'avoid';
            wrapper.style.margin = '10px';
            wrapper.style.textAlign = 'center';
            createQRCodeElement(wrapper);
            printContainer.appendChild(wrapper);
        }

        window.print();
    });

    function createQRCodeElement(container) {
        const url = document.getElementById('qrUrl').value;
        const titleText = document.getElementById('qrTitle').value;
        const titlePos = document.getElementById('qrTitlePos').value;
        const color = document.getElementById('qrColor').value;
        const size = parseInt(document.getElementById('qrSize').value, 10) || 200;
        const design = document.getElementById('qrDesign').value;

        const itemBox = document.createElement('div');
        itemBox.style.fontFamily = 'Arial, sans-serif';
        itemBox.style.display = 'flex';
        itemBox.style.flexDirection = 'column';
        itemBox.style.alignItems = 'center';
        
        const titleEl = document.createElement('div');
        titleEl.textContent = titleText;
        titleEl.style.fontWeight = 'bold';
        titleEl.style.fontSize = (size * 0.1) + 'px';
        titleEl.style.margin = '5px 0';
        
        const qrBox = document.createElement('div');

        const options = {
            text: url,
            width: size,
            height: size,
            colorDark: color,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
            logo: currentLogoData,
            logoWidth: size * 0.25,
            logoHeight: size * 0.25,
            logoBackgroundTransparent: true,
            dotScale: design === 'rounded' ? 0.5 : 1
        };

        new QRCode(qrBox, options);

        if (titlePos === 'top' && titleText) {
            itemBox.appendChild(titleEl);
        }
        
        itemBox.appendChild(qrBox);

        if (titlePos === 'bottom' && titleText) {
            itemBox.appendChild(titleEl);
        }

        container.appendChild(itemBox);
    }
});