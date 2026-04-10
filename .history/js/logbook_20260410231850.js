let currentLogoBase64 = null;

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('logoInput')) {
        document.getElementById('logoInput').addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    currentLogoBase64 = event.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                currentLogoBase64 = null;
            }
        });
    }

    const isEmergencyCheck = document.getElementById('isEmergency');
    if(isEmergencyCheck) {
        isEmergencyCheck.addEventListener('change', function (e) {
            const isEmergency = e.target.checked;
            document.getElementById('standardOptions').style.display = isEmergency ? 'none' : 'block';
            document.getElementById('podiumOptions').style.display = isEmergency ? 'none' : 'block';
            document.getElementById('emergencyPseudoGroup').style.display = isEmergency ? 'block' : 'none';
        });
    }

    const hasQrCodeCheck = document.getElementById('hasQrCode');
    if(hasQrCodeCheck) {
        hasQrCodeCheck.addEventListener('change', function (e) {
            document.getElementById('qrUrlGroup').style.display = e.target.checked ? 'block' : 'none';
        });
    }

    const hasFtfCheck = document.getElementById('hasFtf');
    if(hasFtfCheck) {
        hasFtfCheck.addEventListener('change', function (e) {
            document.getElementById('ftfTamponGroup').style.display = e.target.checked ? 'flex' : 'none';
        });
    }

    const hasStfTtfCheck = document.getElementById('hasStfTtf');
    if(hasStfTtfCheck) {
        hasStfTtfCheck.addEventListener('change', function (e) {
            document.getElementById('stfTtfTamponGroup').style.display = e.target.checked ? 'flex' : 'none';
        });
    }

    const stripWidthSelect = document.getElementById('stripWidth');
    if (stripWidthSelect) {
        stripWidthSelect.addEventListener('change', function (e) {
            const is25mm = e.target.value === '25';
            const ftfTampon = document.getElementById('hasFtfTampon');
            const stfTtfTampon = document.getElementById('hasStfTtfTampon');
            if (ftfTampon) ftfTampon.disabled = is25mm;
            if (stfTtfTampon) stfTtfTampon.disabled = is25mm;
        });
    }
});

function exportLogbookConfig() {
    let defaultName = `speedygeotools_logbook_${new Date().toISOString().slice(0, 10)}`;
    let fileName = prompt("Sous quel nom voulez-vous enregistrer cette configuration ?", defaultName);
    
    if (!fileName) return;
    if (!fileName.endsWith(".json")) fileName += ".json";

    const config = {
        type: "logbook",
        isEmergency: document.getElementById('isEmergency') ? document.getElementById('isEmergency').checked : false,
        emergencyPseudo: document.getElementById('emergencyPseudo') ? document.getElementById('emergencyPseudo').value : '',
        cacheName: document.getElementById('cacheName') ? document.getElementById('cacheName').value : '',
        cacheCode: document.getElementById('cacheCode') ? document.getElementById('cacheCode').value : '',
        hasQrCode: document.getElementById('hasQrCode') ? document.getElementById('hasQrCode').checked : false,
        qrUrl: document.getElementById('qrUrl') ? document.getElementById('qrUrl').value : '',
        hasWarning: document.getElementById('hasWarning') ? document.getElementById('hasWarning').checked : false,
        hasFtf: document.getElementById('hasFtf') ? document.getElementById('hasFtf').checked : false,
        hasFtfTampon: document.getElementById('hasFtfTampon') ? document.getElementById('hasFtfTampon').checked : false,
        hasStfTtf: document.getElementById('hasStfTtf') ? document.getElementById('hasStfTtf').checked : false,
        hasStfTtfTampon: document.getElementById('hasStfTtfTampon') ? document.getElementById('hasStfTtfTampon').checked : false,
        stripWidth: document.getElementById('stripWidth') ? document.getElementById('stripWidth').value : '35',
        stripCount: document.getElementById('stripCount') ? document.getElementById('stripCount').value : '5',
        pdfLanguage: document.getElementById('pdfLanguage') ? document.getElementById('pdfLanguage').value : 'fr',
        logoBase64: currentLogoBase64 // Sauvegarde du logo personnalisé
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function importLogbookConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            if(config.type !== "logbook") {
                alert("Ceci n'est pas un fichier Logbook !");
                return;
            }

            if(document.getElementById('isEmergency')) {
                document.getElementById('isEmergency').checked = config.isEmergency || false;
                document.getElementById('isEmergency').dispatchEvent(new Event('change'));
            }
            if(config.emergencyPseudo && document.getElementById('emergencyPseudo')) document.getElementById('emergencyPseudo').value = config.emergencyPseudo;
            if(config.cacheName && document.getElementById('cacheName')) document.getElementById('cacheName').value = config.cacheName;
            if(config.cacheCode && document.getElementById('cacheCode')) document.getElementById('cacheCode').value = config.cacheCode;
            
            if(document.getElementById('hasQrCode')) {
                document.getElementById('hasQrCode').checked = config.hasQrCode || false;
                document.getElementById('hasQrCode').dispatchEvent(new Event('change'));
            }
            if(config.qrUrl && document.getElementById('qrUrl')) document.getElementById('qrUrl').value = config.qrUrl;
            if(document.getElementById('hasWarning')) document.getElementById('hasWarning').checked = config.hasWarning || false;
            
            if(document.getElementById('hasFtf')) {
                document.getElementById('hasFtf').checked = config.hasFtf || false;
                document.getElementById('hasFtf').dispatchEvent(new Event('change'));
            }
            if(document.getElementById('hasFtfTampon')) document.getElementById('hasFtfTampon').checked = config.hasFtfTampon || false;
            
            if(document.getElementById('hasStfTtf')) {
                document.getElementById('hasStfTtf').checked = config.hasStfTtf || false;
                document.getElementById('hasStfTtf').dispatchEvent(new Event('change'));
            }
            if(document.getElementById('hasStfTtfTampon')) document.getElementById('hasStfTtfTampon').checked = config.hasStfTtfTampon || false;
            
            if(config.stripWidth && document.getElementById('stripWidth')) document.getElementById('stripWidth').value = config.stripWidth;
            if(config.stripCount && document.getElementById('stripCount')) document.getElementById('stripCount').value = config.stripCount;
            if(config.pdfLanguage && document.getElementById('pdfLanguage')) document.getElementById('pdfLanguage').value = config.pdfLanguage;

            document.getElementById('logoInput').value = ''; // Réinitialiser le champ fichier visuel (sécurité navigateur)
            
            if (config.logoBase64) {
                currentLogoBase64 = config.logoBase64;
                alert("Configuration Logbook chargée ! (Le logo personnalisé a été restauré avec succès)");
            } else {
                currentLogoBase64 = null;
                alert("Configuration Logbook chargée !");
            }
            
            event.target.value = '';
        } catch (err) {
            alert("Fichier invalide.");
        }
    };
    reader.readAsText(file);
}

function generateAndPrint() {
    const isEmergency = document.getElementById('isEmergency').checked;
    const emergencyPseudo = document.getElementById('emergencyPseudo').value.trim();
    const cacheName = document.getElementById('cacheName').value.trim();
    const cacheCode = document.getElementById('cacheCode').value.trim();
    const hasWarning = document.getElementById('hasWarning').checked;
    const hasQrCode = document.getElementById('hasQrCode').checked;
    const qrUrl = document.getElementById('qrUrl').value.trim();
    const stripWidth = parseInt(document.getElementById('stripWidth').value) || 35;
    const is25mm = (stripWidth === 25);
    const hasFtf = isEmergency ? false : document.getElementById('hasFtf').checked;
    const hasFtfTampon = isEmergency || is25mm ? false : document.getElementById('hasFtfTampon').checked;
    const hasStfTtf = isEmergency ? false : document.getElementById('hasStfTtf').checked;
    const hasStfTtfTampon = isEmergency || is25mm ? false : document.getElementById('hasStfTtfTampon').checked;
    const totalStrips = parseInt(document.getElementById('stripCount').value) || 5;
    
    const pdfLangCode = document.getElementById('pdfLanguage') ? document.getElementById('pdfLanguage').value : 'fr';
    const t = typeof i18n !== 'undefined' ? (i18n[pdfLangCode] || i18n['fr']) : {};

    const renderArea = document.getElementById('render-area');
    renderArea.innerHTML = '';

    const warningContent = `
        <strong>${t.warnTitle || "Félicitations!"}</strong>
        ${t.warnIntro || "C'est quoi cette boite?"}<br>
        ${t.warnBody || "Ceci fait partie du Geocaching..."}<br><br>
        <strong>${t.warnAccident || "SI TROUVÉ PAR ACCIDENT:"}</strong>
        <ul>
            <li>${t.warnL1 || "Ne pas détruire"}</li>
            <li>${t.warnL2 || "Échangez"}</li>
            <li>${t.warnL3 || "Signez!"}</li>
        </ul>
        ${t.warnOutro || "Plus d'infos sur geocaching.com"}
    `;

    const stripsPerPage = Math.floor(180 / stripWidth);
    const totalPages = Math.ceil(totalStrips / stripsPerPage);
    let stripCounter = 0;
    let podiumPrinted = false;

    const dateText = is25mm ? '' : (t.dateEmpty || "Date:");
    const pseudoText = is25mm ? '' : (t.pseudoEmpty || "Pseudo:");

    for (let p = 0; p < totalPages; p++) {
        const page = document.createElement('div');
        page.className = 'a4-page';

        for (let i = 0; i < stripsPerPage; i++) {
            if (stripCounter >= totalStrips) break;

            const strip = document.createElement('div');
            strip.className = 'log-strip';
            strip.style.width = `${stripWidth}mm`;

            const stapleArea = document.createElement('div');
            stapleArea.className = 'staple-area';
            strip.appendChild(stapleArea);

            if (stripCounter === 0) {
                const officialLogoBox = document.createElement('div');
                officialLogoBox.className = 'official-logo-box';
                officialLogoBox.innerHTML = '<img src="Logo_Geocaching_4squares_Black.png" alt="Logo"><div>GEOCACHING.COM</div>';
                strip.appendChild(officialLogoBox);
            }

            let skipLogsThisStrip = false;
            let rowsToDeduct = 0;

            if (stripCounter === 0) {
                if (!isEmergency) {
                    if (currentLogoBase64) {
                        const logoContainer = document.createElement('div');
                        logoContainer.className = 'logo-container';
                        const img = document.createElement('img');
                        img.src = currentLogoBase64;
                        img.className = 'strip-logo';
                        logoContainer.appendChild(img);
                        strip.appendChild(logoContainer);
                    }

                    const createdBox = document.createElement('div');
                    createdBox.className = 'created-on';
                    createdBox.innerText = t.createdOn || "speedygeotools.com";
                    strip.appendChild(createdBox);

                    if (cacheName !== '' || cacheCode !== '') {
                        const infoBox = document.createElement('div');
                        infoBox.className = 'cache-info';
                        if (cacheName !== '') {
                            const strong = document.createElement('strong');
                            strong.innerText = cacheName;
                            infoBox.appendChild(strong);
                        }
                        if (cacheCode !== '') {
                            const span = document.createElement('span');
                            span.innerText = cacheCode;
                            infoBox.appendChild(span);
                        }
                        strip.appendChild(infoBox);
                    }
                }

                if (hasWarning) {
                    const warningBox = document.createElement('div');
                    warningBox.className = 'warning-text';
                    warningBox.innerHTML = warningContent;
                    strip.appendChild(warningBox);

                    if (!isEmergency && hasQrCode && qrUrl !== '') {
                        const qrBox = document.createElement('div');
                        qrBox.className = 'qr-box';

                        const qrTitle = document.createElement('div');
                        qrTitle.className = 'qr-title';
                        qrTitle.innerText = t.qrTitle || "Lien";

                        const qrCanvas = document.createElement('canvas');
                        new QRious({ element: qrCanvas, value: qrUrl, size: 70 });

                        const qrWarn = document.createElement('div');
                        qrWarn.className = 'qr-warn';
                        qrWarn.innerText = t.qrWarn || "Attention";

                        qrBox.appendChild(qrTitle);
                        qrBox.appendChild(qrCanvas);
                        qrBox.appendChild(qrWarn);
                        strip.appendChild(qrBox);
                    }

                    skipLogsThisStrip = true;
                }

                if (isEmergency) {
                    const emergencyBox = document.createElement('div');
                    emergencyBox.className = 'emergency-box';
                    const pseudoDisplay = emergencyPseudo !== '' ? emergencyPseudo : '........................................';
                    emergencyBox.innerHTML = `
                        <strong>${t.emTitle || "SECOURS"}</strong>
                        ${t.emBy || "Par:"} <em>${pseudoDisplay}</em><br><br>
                        ${t.emFor || "Pour:"} ........................................
                    `;
                    strip.appendChild(emergencyBox);

                    if (!hasWarning) {
                        rowsToDeduct = 4;
                    }
                }
            }

            if (!skipLogsThisStrip) {
                let addPodiumHere = false;
                if ((hasFtf || hasStfTtf) && !podiumPrinted) {
                    addPodiumHere = true;
                    podiumPrinted = true;
                }

                if (addPodiumHere) {
                    const podiumBox = document.createElement('div');
                    podiumBox.className = 'podium-box';

                    if (hasFtf) {
                        const ftfLine = document.createElement('div');
                        ftfLine.className = hasFtfTampon ? 'podium-stamp with-tampon' : 'podium-stamp';
                        const tamponHtml = hasFtfTampon ? `<div class="podium-tampon">${t.tampon || "Tampon"}</div>` : '';
                        ftfLine.innerHTML = `
                            <div class="podium-header">
                                <span class="podium-title">FTF</span>
                                <span class="podium-input-date">${dateText}</span>
                                <span class="podium-input-pseudo">${pseudoText}</span>
                            </div>
                            ${tamponHtml}
                        `;
                        podiumBox.appendChild(ftfLine);
                    }

                    if (hasStfTtf) {
                        const tamponHtml = hasStfTtfTampon ? `<div class="podium-tampon">${t.tampon || "Tampon"}</div>` : '';

                        const stfLine = document.createElement('div');
                        stfLine.className = hasStfTtfTampon ? 'podium-stamp with-tampon' : 'podium-stamp';
                        stfLine.innerHTML = `
                            <div class="podium-header">
                                <span class="podium-title">STF</span>
                                <span class="podium-input-date">${dateText}</span>
                                <span class="podium-input-pseudo">${pseudoText}</span>
                            </div>
                            ${tamponHtml}
                        `;
                        podiumBox.appendChild(stfLine);

                        const ttfLine = document.createElement('div');
                        ttfLine.className = hasStfTtfTampon ? 'podium-stamp with-tampon' : 'podium-stamp';
                        ttfLine.innerHTML = `
                            <div class="podium-header">
                                <span class="podium-title">TTF</span>
                                <span class="podium-input-date">${dateText}</span>
                                <span class="podium-input-pseudo">${pseudoText}</span>
                            </div>
                            ${tamponHtml}
                        `;
                        podiumBox.appendChild(ttfLine);
                    }

                    strip.appendChild(podiumBox);
                }

                let rowCount = 24 - rowsToDeduct;
                if (addPodiumHere) {
                    if (hasFtf) rowCount -= hasFtfTampon ? 3 : 1;
                    if (hasStfTtf) rowCount -= hasStfTtfTampon ? 6 : 2;
                }

                if (rowCount < 4) rowCount = 4;

                const logsContainer = document.createElement('div');
                logsContainer.className = 'logs-container';
                for (let r = 0; r < rowCount; r++) {
                    const row = document.createElement('div');
                    row.className = 'log-row';
                    if (is25mm) {
                        row.innerHTML = '<div class="log-date"></div><div class="log-name"></div>';
                    } else {
                        row.innerHTML = `<div class="log-date">${t.date || "Date"}</div><div class="log-name">${t.pseudo || "Pseudo"}</div>`;
                    }
                    logsContainer.appendChild(row);
                }
                strip.appendChild(logsContainer);
            }

            page.appendChild(strip);
            stripCounter++;
        }

        renderArea.appendChild(page);
    }

    setTimeout(() => {
        window.print();
    }, 500);
}