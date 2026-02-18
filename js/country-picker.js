/* ============================================
   KELAP - Country Picker with Search
   Custom dropdown for phone country codes
   ============================================ */

const CountryPicker = (() => {
    // Generate flag emoji from ISO 2-letter code
    const flag = (iso) => iso.toUpperCase().replace(/./g, c =>
        String.fromCodePoint(127397 + c.charCodeAt())
    );

    // [ISO, dialCode, English name, French name (if different)]
    const DATA = [
        ['AF','93','Afghanistan'],
        ['AL','355','Albania','Albanie'],
        ['DZ','213','Algeria','Algérie'],
        ['AD','376','Andorra','Andorre'],
        ['AO','244','Angola'],
        ['AR','54','Argentina','Argentine'],
        ['AM','374','Armenia','Arménie'],
        ['AU','61','Australia','Australie'],
        ['AT','43','Austria','Autriche'],
        ['AZ','994','Azerbaijan','Azerbaïdjan'],
        ['BH','973','Bahrain','Bahreïn'],
        ['BD','880','Bangladesh'],
        ['BY','375','Belarus','Biélorussie'],
        ['BE','32','Belgium','Belgique'],
        ['BJ','229','Benin','Bénin'],
        ['BO','591','Bolivia','Bolivie'],
        ['BA','387','Bosnia','Bosnie'],
        ['BW','267','Botswana'],
        ['BR','55','Brazil','Brésil'],
        ['BN','673','Brunei'],
        ['BG','359','Bulgaria','Bulgarie'],
        ['BF','226','Burkina Faso'],
        ['BI','257','Burundi'],
        ['KH','855','Cambodia','Cambodge'],
        ['CM','237','Cameroon','Cameroun'],
        ['CA','1','Canada'],
        ['CV','238','Cape Verde','Cap-Vert'],
        ['CF','236','Central African Republic','Centrafrique'],
        ['TD','235','Chad','Tchad'],
        ['CL','56','Chile','Chili'],
        ['CN','86','China','Chine'],
        ['CO','57','Colombia','Colombie'],
        ['KM','269','Comoros','Comores'],
        ['CG','242','Congo'],
        ['CD','243','DR Congo','RD Congo'],
        ['CR','506','Costa Rica'],
        ['HR','385','Croatia','Croatie'],
        ['CU','53','Cuba'],
        ['CY','357','Cyprus','Chypre'],
        ['CZ','420','Czech Republic','Tchéquie'],
        ['DK','45','Denmark','Danemark'],
        ['DJ','253','Djibouti'],
        ['DO','1','Dominican Republic','Rép. Dominicaine'],
        ['EC','593','Ecuador','Équateur'],
        ['EG','20','Egypt','Égypte'],
        ['SV','503','El Salvador'],
        ['GQ','240','Equatorial Guinea','Guinée Équatoriale'],
        ['ER','291','Eritrea','Érythrée'],
        ['EE','372','Estonia','Estonie'],
        ['SZ','268','Eswatini'],
        ['ET','251','Ethiopia','Éthiopie'],
        ['FJ','679','Fiji','Fidji'],
        ['FI','358','Finland','Finlande'],
        ['FR','33','France'],
        ['GA','241','Gabon'],
        ['GM','220','Gambia','Gambie'],
        ['GE','995','Georgia','Géorgie'],
        ['DE','49','Germany','Allemagne'],
        ['GH','233','Ghana'],
        ['GR','30','Greece','Grèce'],
        ['GT','502','Guatemala'],
        ['GN','224','Guinea','Guinée'],
        ['GW','245','Guinea-Bissau','Guinée-Bissau'],
        ['GY','592','Guyana'],
        ['HT','509','Haiti','Haïti'],
        ['HN','504','Honduras'],
        ['HK','852','Hong Kong'],
        ['HU','36','Hungary','Hongrie'],
        ['IS','354','Iceland','Islande'],
        ['IN','91','India','Inde'],
        ['ID','62','Indonesia','Indonésie'],
        ['IR','98','Iran'],
        ['IQ','964','Iraq','Irak'],
        ['IE','353','Ireland','Irlande'],
        ['IL','972','Israel','Israël'],
        ['IT','39','Italy','Italie'],
        ['CI','225','Ivory Coast',"Côte d'Ivoire"],
        ['JM','1','Jamaica','Jamaïque'],
        ['JP','81','Japan','Japon'],
        ['JO','962','Jordan','Jordanie'],
        ['KZ','7','Kazakhstan'],
        ['KE','254','Kenya'],
        ['KW','965','Kuwait','Koweït'],
        ['KG','996','Kyrgyzstan','Kirghizistan'],
        ['LA','856','Laos'],
        ['LV','371','Latvia','Lettonie'],
        ['LB','961','Lebanon','Liban'],
        ['LS','266','Lesotho'],
        ['LR','231','Liberia','Libéria'],
        ['LY','218','Libya','Libye'],
        ['LI','423','Liechtenstein'],
        ['LT','370','Lithuania','Lituanie'],
        ['LU','352','Luxembourg'],
        ['MO','853','Macau','Macao'],
        ['MG','261','Madagascar'],
        ['MW','265','Malawi'],
        ['MY','60','Malaysia','Malaisie'],
        ['MV','960','Maldives'],
        ['ML','223','Mali'],
        ['MT','356','Malta','Malte'],
        ['MR','222','Mauritania','Mauritanie'],
        ['MU','230','Mauritius','Maurice'],
        ['MX','52','Mexico','Mexique'],
        ['MD','373','Moldova','Moldavie'],
        ['MC','377','Monaco'],
        ['MN','976','Mongolia','Mongolie'],
        ['ME','382','Montenegro','Monténégro'],
        ['MA','212','Morocco','Maroc'],
        ['MZ','258','Mozambique'],
        ['MM','95','Myanmar'],
        ['NA','264','Namibia','Namibie'],
        ['NP','977','Nepal','Népal'],
        ['NL','31','Netherlands','Pays-Bas'],
        ['NZ','64','New Zealand','Nouvelle-Zélande'],
        ['NI','505','Nicaragua'],
        ['NE','227','Niger'],
        ['NG','234','Nigeria','Nigéria'],
        ['MK','389','North Macedonia','Macédoine du Nord'],
        ['NO','47','Norway','Norvège'],
        ['OM','968','Oman'],
        ['PK','92','Pakistan'],
        ['PS','970','Palestine'],
        ['PA','507','Panama'],
        ['PY','595','Paraguay'],
        ['PE','51','Peru','Pérou'],
        ['PH','63','Philippines'],
        ['PL','48','Poland','Pologne'],
        ['PT','351','Portugal'],
        ['QA','974','Qatar'],
        ['RE','262','Réunion','La Réunion'],
        ['RO','40','Romania','Roumanie'],
        ['RU','7','Russia','Russie'],
        ['RW','250','Rwanda'],
        ['SA','966','Saudi Arabia','Arabie Saoudite'],
        ['SN','221','Senegal','Sénégal'],
        ['RS','381','Serbia','Serbie'],
        ['SG','65','Singapore','Singapour'],
        ['SK','421','Slovakia','Slovaquie'],
        ['SI','386','Slovenia','Slovénie'],
        ['SO','252','Somalia','Somalie'],
        ['ZA','27','South Africa','Afrique du Sud'],
        ['KR','82','South Korea','Corée du Sud'],
        ['SS','211','South Sudan','Soudan du Sud'],
        ['ES','34','Spain','Espagne'],
        ['LK','94','Sri Lanka'],
        ['SD','249','Sudan','Soudan'],
        ['SR','597','Suriname'],
        ['SE','46','Sweden','Suède'],
        ['CH','41','Switzerland','Suisse'],
        ['SY','963','Syria','Syrie'],
        ['TW','886','Taiwan','Taïwan'],
        ['TJ','992','Tajikistan','Tadjikistan'],
        ['TZ','255','Tanzania','Tanzanie'],
        ['TH','66','Thailand','Thaïlande'],
        ['TG','228','Togo'],
        ['TT','1','Trinidad & Tobago','Trinité-et-Tobago'],
        ['TN','216','Tunisia','Tunisie'],
        ['TR','90','Turkey','Turquie'],
        ['TM','993','Turkmenistan','Turkménistan'],
        ['UG','256','Uganda','Ouganda'],
        ['UA','380','Ukraine'],
        ['AE','971','UAE','Émirats Arabes Unis'],
        ['GB','44','United Kingdom','Royaume-Uni'],
        ['US','1','United States','États-Unis'],
        ['UY','598','Uruguay'],
        ['UZ','998','Uzbekistan','Ouzbékistan'],
        ['VE','58','Venezuela'],
        ['VN','84','Vietnam','Viêt Nam'],
        ['YE','967','Yemen','Yémen'],
        ['ZM','260','Zambia','Zambie'],
        ['ZW','263','Zimbabwe'],
        ['GP','590','Guadeloupe'],
        ['MQ','596','Martinique'],
        ['GF','594','French Guiana','Guyane Française'],
        ['PF','689','French Polynesia','Polynésie Française'],
        ['NC','687','New Caledonia','Nouvelle-Calédonie'],
        ['YT','262','Mayotte'],
        ['WF','681','Wallis & Futuna','Wallis-et-Futuna']
    ];

    function init(containerId, defaultIso, lang) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const isFr = lang === 'fr';
        const countries = DATA.map(([iso, code, en, fr]) => ({
            iso,
            code: '+' + code,
            name: (isFr && fr) ? fr : en,
            flag: flag(iso)
        })).sort((a, b) => a.name.localeCompare(b.name, isFr ? 'fr' : 'en'));

        const defaultCountry = countries.find(c => c.iso === defaultIso) || countries[0];
        let selected = defaultCountry;

        // Build DOM
        container.innerHTML = `
            <button type="button" class="cta__country-btn" aria-haspopup="listbox" aria-expanded="false">
                <span class="cta__country-flag">${selected.flag}</span>
                <span class="cta__country-code">${selected.code}</span>
                <svg class="cta__country-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="cta__country-dropdown" role="listbox">
                <div class="cta__country-search-wrap">
                    <svg class="cta__country-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
                        <path d="M16 16L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <input type="text" class="cta__country-search" placeholder="${isFr ? 'Rechercher un pays...' : 'Search country...'}" autocomplete="off" spellcheck="false">
                </div>
                <div class="cta__country-list"></div>
            </div>
        `;

        const btn = container.querySelector('.cta__country-btn');
        const dropdown = container.querySelector('.cta__country-dropdown');
        const searchInput = container.querySelector('.cta__country-search');
        const list = container.querySelector('.cta__country-list');

        function renderList(filter) {
            const f = (filter || '').toLowerCase();
            const filtered = f
                ? countries.filter(c =>
                    c.name.toLowerCase().includes(f) ||
                    c.code.includes(f) ||
                    c.iso.toLowerCase() === f
                )
                : countries;

            if (filtered.length === 0) {
                list.innerHTML = `<p class="cta__country-empty">${isFr ? 'Aucun résultat' : 'No results'}</p>`;
                return;
            }

            list.innerHTML = filtered.map(c => `
                <button type="button" class="cta__country-option${c.iso === selected.iso ? ' cta__country-option--active' : ''}" data-iso="${c.iso}" role="option" aria-selected="${c.iso === selected.iso}">
                    <span class="cta__country-option-flag">${c.flag}</span>
                    <span class="cta__country-option-name">${c.name}</span>
                    <span class="cta__country-option-code">${c.code}</span>
                </button>
            `).join('');
        }

        function openDropdown() {
            container.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
            searchInput.value = '';
            renderList();
            requestAnimationFrame(() => searchInput.focus());
        }

        function closeDropdown() {
            container.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
        }

        function selectCountry(iso) {
            const country = countries.find(c => c.iso === iso);
            if (!country) return;
            selected = country;
            container.querySelector('.cta__country-flag').textContent = country.flag;
            container.querySelector('.cta__country-code').textContent = country.code;
            closeDropdown();
        }

        // Toggle dropdown
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            container.classList.contains('is-open') ? closeDropdown() : openDropdown();
        });

        // Search filtering
        searchInput.addEventListener('input', () => renderList(searchInput.value));
        searchInput.addEventListener('click', (e) => e.stopPropagation());

        // Keyboard nav in search
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeDropdown();
                btn.focus();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const firstOption = list.querySelector('.cta__country-option');
                if (firstOption) selectCountry(firstOption.dataset.iso);
            }
        });

        // Select country on click
        list.addEventListener('click', (e) => {
            const option = e.target.closest('.cta__country-option');
            if (option) {
                e.stopPropagation();
                selectCountry(option.dataset.iso);
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) closeDropdown();
        });

        // Close on Escape globally
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeDropdown();
        });

        // Public API
        container.getValue = () => selected.code;

        // Initial render
        renderList();
    }

    return { init };
})();
