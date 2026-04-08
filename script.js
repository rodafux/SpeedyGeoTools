let currentLogoBase64 = null;

const i18n = {
    fr: {
        warnTitle: "Félicitations! Vous l'avez trouvée! (intentionnellement, ou pas)",
        warnIntro: "C'est quoi cette boite? Que fait-elle là?",
        warnBody: "Ceci fait partie d'un jeu mondial dédié aux utilisateurs de GPS appelé \"Geocaching\". Le principe de ce jeu est basé sur le fait de cacher un \"trésor\" (dans votre cas cette boite et son contenu), et ensuite de publier les coordonnées exactes sur Internet afin de permettre aux autres joueurs de partir à sa recherche. La seule règle est la suivante: si vous comptez emporter un élément du conteneur, vous devez à votre tour y laisser quelque chose, et noter un mot au sujet de votre visite dans le cahier ci-joint.",
        warnAccident: "SI VOUS AVEZ TROUVÉ CETTE BOITE PAR ACCIDENT :",
        warnL1: "S'il vous plaît, veuillez ne pas la déplacer, la voler ou la vandaliser",
        warnL2: "Si vous le désirez, emportez quelque chose de son contenu, mais veuillez y laisser quelque chose d'autre, en échange.",
        warnL3: "N'oubliez pas de signer le logbook!",
        warnOutro: "Plus d'informations sur le site web officiel.",
        date: "Date",
        pseudo: "Pseudo",
        dateEmpty: "Date : ........",
        pseudoEmpty: "Pseudo : ................",
        emTitle: "LOGBOOK DE SECOURS",
        emBy: "Déposé par :",
        emFor: "Pour la cache N° :",
        qrTitle: "Lien du créateur de la cache",
        qrWarn: "Attention : Vérifiez toujours l'URL avant d'ouvrir un lien. Ne téléchargez aucun fichier suspect.",
        tampon: "Espace Tampon",
        createdOn: "Logbook créé sur speedygeotools.com"
    },
    en: {
        warnTitle: "Congratulations, you've found it! (Intentionally or not!)",
        warnIntro: "What is this hidden container sitting here for?",
        warnBody: "It is part of a worldwide game dedicated to GPS users, called \"Geocaching\". The game involves hiding a \"treasure\" (this container and its exact contents), and publishing the exact coordinates so other players can search for it. The only rules are: if you take something from the geocache, leave something of equal or greater value, and write about your find in the logbook.",
        warnAccident: "IF YOU FOUND THIS CONTAINER BY ACCIDENT:",
        warnL1: "Great! Please do not move or vandalize it.",
        warnL2: "If you wish, go ahead and take something. But please leave something of your own for others to find.",
        warnL3: "Don't forget to sign the logbook!",
        warnOutro: "More information on the official website.",
        date: "Date",
        pseudo: "Name",
        dateEmpty: "Date: ........",
        pseudoEmpty: "Name: ................",
        emTitle: "EMERGENCY LOGBOOK",
        emBy: "Placed by:",
        emFor: "For cache #:",
        qrTitle: "Cache owner's link",
        qrWarn: "Warning: Always check the URL before opening a link. Do not download suspicious files.",
        tampon: "Buffer Space",
        createdOn: "Logbook created on speedygeotools.com"
    },
    de: {
        warnTitle: "Herzlichen Glückwunsch, du hast es gefunden! (Absichtlich oder nicht!)",
        warnIntro: "Was ist das für ein Behälter und was macht er hier?",
        warnBody: "Er ist Teil eines weltweiten Spiels für GPS-Nutzer, genannt \"Geocaching\". Das Spiel besteht darin, einen \"Schatz\" (diesen Behälter und seinen Inhalt) zu verstecken und die genauen Koordinaten im Internet zu veröffentlichen, damit andere Spieler ihn suchen können. Die einzige Regel lautet: Wenn du etwas aus dem Geocache nimmst, lege etwas von gleichem oder höherem Wert hinein und trage deinen Fund in das Logbuch ein.",
        warnAccident: "WENN DU DIESEN BEHÄLTER ZUFÄLLIG GEFUNDEN HAST:",
        warnL1: "Bitte bewege oder beschädige ihn nicht.",
        warnL2: "Wenn du möchtest, nimm etwas heraus. Aber bitte hinterlasse auch etwas von dir für andere.",
        warnL3: "Vergiss nicht, das Logbuch zu unterschreiben!",
        warnOutro: "Weitere Informationen auf der offiziellen Website.",
        date: "Datum",
        pseudo: "Name",
        dateEmpty: "Datum: ........",
        pseudoEmpty: "Name: ................",
        emTitle: "NOTFALL-LOGBUCH",
        emBy: "Gelegt von:",
        emFor: "Für Cache-Nr.:",
        qrTitle: "Link des Cache-Owners",
        qrWarn: "Achtung: URL vor dem Öffnen immer prüfen. Keine verdächtigen Dateien herunterladen.",
        tampon: "Pufferzone",
        createdOn: "Logbuch erstellt auf speedygeotools.com"
    },
    es: {
        warnTitle: "¡Enhorabuena, lo has encontrado! (¡Intencionadamente o no!)",
        warnIntro: "¿Qué es este contenedor escondido aquí?",
        warnBody: "Forma parte de un juego mundial dedicado a los usuarios de GPS, llamado \"Geocaching\". El juego consiste en esconder un \"tesoro\" (este contenedor y su contenido), y publicar las coordenadas exactas en Internet para que otros jugadores puedan buscarlo. Las únicas reglas son: si te llevas algo del geocaché, deja algo de igual o mayor valor, y escribe sobre tu hallazgo en el libro de registro.",
        warnAccident: "SI HAS ENCONTRADO ESTE CONTENEDOR POR ACCIDENTE:",
        warnL1: "¡Genial! Por favor, no lo muevas ni lo vandalices.",
        warnL2: "Si lo deseas, adelante, llévate algo. Pero por favor deja algo tuyo para que otros lo encuentren.",
        warnL3: "¡No olvides firmar el logbook!",
        warnOutro: "Más información en el sitio web oficial.",
        date: "Fecha",
        pseudo: "Nombre",
        dateEmpty: "Fecha: ........",
        pseudoEmpty: "Nombre: ................",
        emTitle: "LOGBOOK DE EMERGENCIA",
        emBy: "Colocado por:",
        emFor: "Para el caché n°:",
        qrTitle: "Enlace del propietario",
        qrWarn: "Atención: Compruebe siempre la URL antes de abrir un enlace. No descargue archivos sospechosos.",
        tampon: "Espacio intermedio",
        createdOn: "Logbook creado en speedygeotools.com"
    },
    it: {
        warnTitle: "Congratulazioni, l'hai trovato! (Intenzionalmente o no!)",
        warnIntro: "Cos'è questo contenitore nascosto qui?",
        warnBody: "Fa parte di un gioco mondiale dedicato agli utenti GPS, chiamato \"Geocaching\". Il gioco consiste nel nascondere un \"tesoro\" (questo contenitore e il seu contenuto) e pubblicare le coordinate esatte su Internet in modo che altri giocatori possano cercarlo. L'unica regola è: se prendi qualcosa dal geocache, lascia qualcosa di valore uguale o superiore e scrivi del tuo ritrovamento nel logbook.",
        warnAccident: "SE HAI TROVATO QUESTO CONTENITORE PER CASO:",
        warnL1: "Fantastico! Per favore non spostarlo o vandalizzarlo.",
        warnL2: "Se lo desideri, prendi pure qualcosa. Ma per favore lascia qualcosa di tuo per gli altri.",
        warnL3: "Non dimenticare di firmare il logbook!",
        warnOutro: "Maggiori informazioni sul sito ufficiale.",
        date: "Data",
        pseudo: "Nome",
        dateEmpty: "Data: ........",
        pseudoEmpty: "Nome: ................",
        emTitle: "LOGBOOK DI EMERGENZA",
        emBy: "Nascosto da:",
        emFor: "Per la cache n°:",
        qrTitle: "Link del proprietario",
        qrWarn: "Attenzione: controlla sempre l'URL prima di aprire un link.",
        tampon: "Spazio Timbro",
        createdOn: "Logbook creato su speedygeotools.com"
    },
    pt: {
        warnTitle: "Parabéns, encontraste! (Intencionalmente ou não!)",
        warnIntro: "O que é este recipiente escondido aqui?",
        warnBody: "Faz parte de um jogo mundial dedicado aos utilizadores de GPS, chamado \"Geocaching\". O jogo consiste em esconder um \"tesouro\" (este recipiente e o seu conteúdo) e publicar as coordenadas exatas na Internet pour que outros jogadores possam procurá-lo. A única regra é: se tirares algo da geocache, deixa algo de valor igual ou superior, e regista o teu achado no logbook.",
        warnAccident: "SE ENCONTRASTE ESTE RECIPIENTE POR ACASO:",
        warnL1: "Ótimo! Por favor, não o movas nem o vandalizes.",
        warnL2: "Se quiseres, podes levar alguma coisa. Mas por favor deixa algo teu para os outros encontrarem.",
        warnL3: "Não te esqueças de assinar o logbook!",
        warnOutro: "Mais informações no site oficial.",
        date: "Data",
        pseudo: "Nome",
        dateEmpty: "Data: ........",
        pseudoEmpty: "Nome: ................",
        emTitle: "LOGBOOK DE EMERGÊNCIA",
        emBy: "Escondido por:",
        emFor: "Para a cache n°:",
        qrTitle: "Link do proprietário",
        qrWarn: "Aviso: Verifique sempre o URL antes de abrir um link.",
        tampon: "Espaço Carimbo",
        createdOn: "Logbook criado em speedygeotools.com"
    },
    nl: {
        warnTitle: "Gefeliciteerd, je hebt hem gevonden! (Per ongeluk of expres!)",
        warnIntro: "Wat is dit voor een doosje en wat doet het hier?",
        warnBody: "Het maakt deel uit van een wereldwijd spel voor GPS-gebruikers, genaamd \"Geocaching\". Het spel bestaat uit het verstoppen van een \"schat\" (dit doosje en de inhoud), en het publiceren van de exacte coördinaten op het internet zodat andere spelersernaar kunnen zoeken. De enige regel is: als je iets uit de geocache haalt, laat dan iets van gelijke of grotere waarde achter, en schrijf over je vondst in het logboek.",
        warnAccident: "ALS JE DIT DOOSJE PER ONGELUK HEBT GEVONDEN:",
        warnL1: "Geweldig! Verplaats of verniel het alsjeblieft niet.",
        warnL2: "Als je wilt, ga je gang en neem iets. Maar laat alsjeblieft iets van jezelf achter voor anderen.",
        warnL3: "Vergeet niet het logboek te tekenen!",
        warnOutro: "Meer informatie op de officielle website.",
        date: "Datum",
        pseudo: "Naam",
        dateEmpty: "Datum: ........",
        pseudoEmpty: "Naam: ................",
        emTitle: "NOOD LOGBOEK",
        emBy: "Geplaatst door:",
        emFor: "Voor cache nr:",
        qrTitle: "Link van de eigenaar",
        qrWarn: "Waarschuwing: Controleer altijd de URL. Download geen verdachte bestanden.",
        tampon: "Bufferruimte",
        createdOn: "Logboek gemaakt op speedygeotools.com"
    },
    cs: {
        warnTitle: "Gratulujeme, našli jste to! (Úmyslně nebo ne!)",
        warnIntro: "Co tu dělá tato ukrytá schránka?",
        warnBody: "Je součástí celosvětové hry pro uživatele GPS s názvem \"Geocaching\". Hra spočívá v ukrytí \"pokladu\" (této schránky a jejího obsahu) a zveřejnění přesných souřadnic na internetu, aby ji mohli hledat ostatní hráči. Jediným pravidlem je: pokud si z geocache něco vezmete, zanechte něco stejné nebo vyšší hodnoty a zapište svůj nález do logbooku.",
        warnAccident: "POKUD JSTE TUTO SCHRÁNKU NAŠLI NÁHODOU:",
        warnL1: "Skvělé! Prosím, nepřemisťujte ji ani neničte.",
        warnL2: "Pokud chcete, něco si vezměte. Ale prosím, zanechte pro ostatní něco svého.",
        warnL3: "Nezapomeňte se podepsat do logbooku!",
        warnOutro: "Více informací na oficiálních stránkách.",
        date: "Datum",
        pseudo: "Jméno",
        dateEmpty: "Datum: ........",
        pseudoEmpty: "Jméno: ................",
        emTitle: "NOUZOVÝ LOGBOOK",
        emBy: "Uložil:",
        emFor: "Pro keš č.:",
        qrTitle: "Odkaz vlastníka",
        qrWarn: "Upozornění: Vždy zkontrolujte URL. Nestahujte podezřelé soubory.",
        tampon: "Prostor pro razítko",
        createdOn: "Logbook vytvořen na speedygeotools.com"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    renderHistory();
    updateCounter();
});

function updateCounter() {
    const counterElement = document.getElementById('totalLogbooksCounter');
    if (counterElement) {
        const total = parseInt(localStorage.getItem('sgt_total_logbooks')) || 0;
        counterElement.innerText = total;
    }
}

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

function saveToHistory(config) {
    let history = JSON.parse(localStorage.getItem('sgt_logbook_history')) || [];
    const newEntry = {
        id: Date.now(),
        dateStr: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        ...config
    };
    history.unshift(newEntry);
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    localStorage.setItem('sgt_logbook_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('sgt_logbook_history')) || [];
    const listDiv = document.getElementById('historyList');
    const emptyText = document.getElementById('historyEmpty');
    const clearBtn = document.getElementById('clearHistoryBtn');
    
    if(!listDiv) return;

    listDiv.innerHTML = '';

    if (history.length === 0) {
        emptyText.style.display = 'block';
        clearBtn.style.display = 'none';
    } else {
        emptyText.style.display = 'none';
        clearBtn.style.display = 'block';

        history.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.onclick = () => loadFromHistory(index);

            const title = item.cacheName || item.cacheCode || `Logbook ${item.stripWidth}mm`;

            div.innerHTML = `
                <div class="history-item-title">${title}</div>
                <div class="history-item-date">${item.dateStr}</div>
            `;
            listDiv.appendChild(div);
        });
    }
}

function showLogoWarning() {
    const toast = document.getElementById('toastNotification');
    if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 6000);
    }
}

function loadFromHistory(index) {
    const history = JSON.parse(localStorage.getItem('sgt_logbook_history')) || [];
    const item = history[index];
    if (!item) return;

    const isEmergencyCb = document.getElementById('isEmergency');
    isEmergencyCb.checked = false;
    isEmergencyCb.dispatchEvent(new Event('change'));

    document.getElementById('cacheName').value = item.cacheName || '';
    document.getElementById('cacheCode').value = item.cacheCode || '';

    document.getElementById('logoInput').value = '';
    currentLogoBase64 = null;

    const hasQrCodeCb = document.getElementById('hasQrCode');
    hasQrCodeCb.checked = item.hasQrCode || false;
    document.getElementById('qrUrl').value = item.qrUrl || '';
    hasQrCodeCb.dispatchEvent(new Event('change'));

    document.getElementById('hasWarning').checked = item.hasWarning || false;

    const widthSel = document.getElementById('stripWidth');
    widthSel.value = item.stripWidth || '35';
    widthSel.dispatchEvent(new Event('change'));

    document.getElementById('stripCount').value = item.stripCount || '5';

    const langSel = document.getElementById('pdfLanguage');
    if (langSel && item.pdfLanguage) {
        langSel.value = item.pdfLanguage;
    }

    const hasFtfCb = document.getElementById('hasFtf');
    hasFtfCb.checked = item.hasFtf || false;
    document.getElementById('hasFtfTampon').checked = item.hasFtfTampon || false;
    hasFtfCb.dispatchEvent(new Event('change'));

    const hasStfTtfCb = document.getElementById('hasStfTtf');
    hasStfTtfCb.checked = item.hasStfTtf || false;
    document.getElementById('hasStfTtfTampon').checked = item.hasStfTtfTampon || false;
    hasStfTtfCb.dispatchEvent(new Event('change'));

    window.scrollTo({ top: 0, behavior: 'smooth' });
    showLogoWarning();
}

function clearHistory() {
    if (confirm("Voulez-vous vraiment effacer votre historique de création ?")) {
        localStorage.removeItem('sgt_logbook_history');
        renderHistory();
    }
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
    const t = i18n[pdfLangCode] || i18n['fr'];

    if (!isEmergency) {
        saveToHistory({
            cacheName,
            cacheCode,
            hasWarning,
            hasQrCode,
            qrUrl,
            stripWidth,
            stripCount: totalStrips,
            pdfLanguage: pdfLangCode,
            hasFtf,
            hasFtfTampon,
            hasStfTtf,
            hasStfTtfTampon
        });
    }

    const renderArea = document.getElementById('render-area');
    renderArea.innerHTML = '';

    const warningContent = `
        <strong>${t.warnTitle}</strong>
        ${t.warnIntro}<br>
        ${t.warnBody}<br><br>
        <strong>${t.warnAccident}</strong>
        <ul>
            <li>${t.warnL1}</li>
            <li>${t.warnL2}</li>
            <li>${t.warnL3}</li>
        </ul>
        ${t.warnOutro}
    `;

    const stripsPerPage = Math.floor(180 / stripWidth);
    const totalPages = Math.ceil(totalStrips / stripsPerPage);
    let stripCounter = 0;
    let podiumPrinted = false;

    const dateText = is25mm ? '' : t.dateEmpty;
    const pseudoText = is25mm ? '' : t.pseudoEmpty;

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

                    // Bandeau noir SpeedyGeoTools
                    const createdBox = document.createElement('div');
                    createdBox.className = 'created-on';
                    createdBox.innerText = t.createdOn;
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
                        qrTitle.innerText = t.qrTitle;

                        const qrCanvas = document.createElement('canvas');
                        new QRious({
                            element: qrCanvas,
                            value: qrUrl,
                            size: 70
                        });

                        const qrWarn = document.createElement('div');
                        qrWarn.className = 'qr-warn';
                        qrWarn.innerText = t.qrWarn;

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
                        <strong>${t.emTitle}</strong>
                        ${t.emBy} <em>${pseudoDisplay}</em><br><br>
                        ${t.emFor} ........................................
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
                        const tamponHtml = hasFtfTampon ? `<div class="podium-tampon">${t.tampon}</div>` : '';
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
                        const tamponHtml = hasStfTtfTampon ? `<div class="podium-tampon">${t.tampon}</div>` : '';

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
                        row.innerHTML = `<div class="log-date">${t.date}</div><div class="log-name">${t.pseudo}</div>`;
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
    
    let totalLogbooks = parseInt(localStorage.getItem('sgt_total_logbooks')) || 0;
    localStorage.setItem('sgt_total_logbooks', totalLogbooks + 1);
    updateCounter();

    setTimeout(() => {
        window.print();
    }, 500);
}