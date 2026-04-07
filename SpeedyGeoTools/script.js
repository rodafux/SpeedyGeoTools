let currentLogoBase64 = null;

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

document.getElementById('isEmergency').addEventListener('change', function (e) {
    const isEmergency = e.target.checked;
    document.getElementById('standardOptions').style.display = isEmergency ? 'none' : 'block';
    document.getElementById('podiumOptions').style.display = isEmergency ? 'none' : 'block';
    document.getElementById('emergencyPseudoGroup').style.display = isEmergency ? 'block' : 'none';
});

document.getElementById('hasQrCode').addEventListener('change', function (e) {
    document.getElementById('qrUrlGroup').style.display = e.target.checked ? 'block' : 'none';
});

document.getElementById('hasFtf').addEventListener('change', function (e) {
    document.getElementById('ftfTamponGroup').style.display = e.target.checked ? 'flex' : 'none';
});

document.getElementById('hasStfTtf').addEventListener('change', function (e) {
    document.getElementById('stfTtfTamponGroup').style.display = e.target.checked ? 'flex' : 'none';
});

function generateAndPrint() {
    const isEmergency = document.getElementById('isEmergency').checked;
    const emergencyPseudo = document.getElementById('emergencyPseudo').value.trim();

    const cacheName = document.getElementById('cacheName').value.trim();
    const cacheCode = document.getElementById('cacheCode').value.trim();
    const hasWarning = document.getElementById('hasWarning').checked;

    const hasQrCode = document.getElementById('hasQrCode').checked;
    const qrUrl = document.getElementById('qrUrl').value.trim();

    const hasFtf = isEmergency ? false : document.getElementById('hasFtf').checked;
    const hasFtfTampon = isEmergency ? false : document.getElementById('hasFtfTampon').checked;
    const hasStfTtf = isEmergency ? false : document.getElementById('hasStfTtf').checked;
    const hasStfTtfTampon = isEmergency ? false : document.getElementById('hasStfTtfTampon').checked;

    const totalStrips = parseInt(document.getElementById('stripCount').value) || 5;

    const renderArea = document.getElementById('render-area');
    renderArea.innerHTML = '';

    const warningContent = `
        <strong>Félicitations! Vous l'avez trouvée! (intentionnellement, ou pas)</strong>
        C'est quoi cette boite? Que fait-elle là?
        Ceci fait partie d'un jeu mondial dédié aux utilisateurs de GPS appelé "Geocaching". Le principe de ce jeu est basé sur le fait de cacher un "trésor" (dans votre cas cette boite et son contenu), et ensuite de publier les coordonnées exactes sur Internet afin de permettre aux autres joueurs de partir à sa recherche. La seule règle est la suivante: si vous comptez emporter un élément du conteneur, vous devez à votre tour y laisser quelque chose, et noter un mot au sujet de votre visite dans le cahier ci-joint.<br><br>
        <strong>SI VOUS AVEZ TROUVÉ CETTE BOITE PAR ACCIDENT :</strong>
        <ul>
            <li>S'il vous plaît, veuillez ne pas la déplacer, la voler ou la vandaliser</li>
            <li>Si vous le désirez, emportez quelque chose de son contenu, mais veuillez y laisser quelque chose d'autre, en échange.</li>
            <li>N'oubliez pas de signer le logbook!</li>
        </ul>
        Plus d'informations sur le site web officiel.
    `;

    const stripsPerPage = 5;
    const totalPages = Math.ceil(totalStrips / stripsPerPage);
    let stripCounter = 0;
    let podiumPrinted = false;

    for (let p = 0; p < totalPages; p++) {
        const page = document.createElement('div');
        page.className = 'a4-page';

        for (let i = 0; i < stripsPerPage; i++) {
            if (stripCounter >= totalStrips) break;

            const strip = document.createElement('div');
            strip.className = 'log-strip';

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
                        qrTitle.innerText = "Lien du créateur de la cache";

                        const qrCanvas = document.createElement('canvas');
                        new QRious({
                            element: qrCanvas,
                            value: qrUrl,
                            size: 70
                        });

                        const qrWarn = document.createElement('div');
                        qrWarn.className = 'qr-warn';
                        qrWarn.innerText = "Attention : Vérifiez toujours l'URL avant d'ouvrir un lien. Ne téléchargez aucun fichier suspect.";

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
                        <strong>LOGBOOK DE SECOURS</strong>
                        Déposé par : <em>${pseudoDisplay}</em><br><br>
                        Pour la cache N° : ........................................
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
                        const tamponHtml = hasFtfTampon ? '<div class="podium-tampon">Espace Tampon</div>' : '';
                        ftfLine.innerHTML = `
                            <div class="podium-header">
                                <span class="podium-title">FTF</span>
                                <span class="podium-input-date">Date : ........</span>
                                <span class="podium-input-pseudo">Pseudo : ................</span>
                            </div>
                            ${tamponHtml}
                        `;
                        podiumBox.appendChild(ftfLine);
                    }

                    if (hasStfTtf) {
                        const tamponHtml = hasStfTtfTampon ? '<div class="podium-tampon">Espace Tampon</div>' : '';

                        const stfLine = document.createElement('div');
                        stfLine.className = hasStfTtfTampon ? 'podium-stamp with-tampon' : 'podium-stamp';
                        stfLine.innerHTML = `
                            <div class="podium-header">
                                <span class="podium-title">STF</span>
                                <span class="podium-input-date">Date : ........</span>
                                <span class="podium-input-pseudo">Pseudo : ................</span>
                            </div>
                            ${tamponHtml}
                        `;
                        podiumBox.appendChild(stfLine);

                        const ttfLine = document.createElement('div');
                        ttfLine.className = hasStfTtfTampon ? 'podium-stamp with-tampon' : 'podium-stamp';
                        ttfLine.innerHTML = `
                            <div class="podium-header">
                                <span class="podium-title">TTF</span>
                                <span class="podium-input-date">Date : ........</span>
                                <span class="podium-input-pseudo">Pseudo : ................</span>
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
                    row.innerHTML = '<div class="log-date">Date</div><div class="log-name">Pseudo</div>';
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