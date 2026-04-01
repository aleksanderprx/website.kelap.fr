# KELAP - kelap.fr

## Projet
Site vitrine de l'agence digitale KELAP. Site statique (HTML/CSS/JS pur, pas de framework).
Heberge sur GitHub Pages : `aleksanderprx/kelap.fr`

## Structure
```
/                       Site FR (version par defaut)
/en/                    Site EN
/css/style.css          Styles principaux (responsive inclus)
/css/fonts.css          @font-face declarations
/css/animations.css     Keyframes CSS
/js/main.js             GSAP ScrollTrigger animations, form handling, Discord webhook
/js/three-bg.js         Three.js hero background (logo.glb particles, mouse + scroll parallax)
/js/country-picker.js   Country selector pour le formulaire telephone
/js/counters.js         Compteurs animes (stats section)
/js/portfolio.js        Hover effects portfolio
/js/cursor.js           Custom cursor
/assets/logo.glb        Modele 3D du logo KELAP
/assets/images/         Images portfolio, favicon, OG image
/assets/fonts/          Polices locales
/assets/icons/          Icones SVG
/assets/mockups/        Mockups
/404.html               Page 404 FR
/en/404.html            Page 404 EN
/sitemap.xml            Sitemap
/robots.txt             Robots
```

## Regles importantes

### Bilinguisme
- **Toute modification HTML doit etre faite dans les DEUX fichiers** : `index.html` (FR) et `en/index.html` (EN)
- Idem pour les pages 404 : `404.html` (FR) et `en/404.html` (EN)
- Le CSS et le JS sont partages entre les deux versions
- La version FR est la version par defaut (x-default hreflang)

### CSS
- Un seul fichier principal : `css/style.css`
- Breakpoints responsive : `768px` (tablette/mobile), `480px` (petits telephones)
- Variables CSS definies dans `:root` au debut du fichier
- Convention BEM pour les classes

### JavaScript
- GSAP + ScrollTrigger pour les animations (charge via CDN)
- Three.js r128 + GLTFLoader pour le hero 3D (charge via CDN)
- Pas de bundler, pas de npm, tout en vanilla JS

### Portfolio
- Grille 3 colonnes, 6 items, tous au meme ratio `aspect-ratio: 2/3`
- Images : `object-fit: cover` pour remplir le cadre
- Items actuels : Plancha Pizza, Atelier, Pulp, Voss FHS Luftsportlag, Saint-Nicolas Renovation, La Rentree
- Les 3 derniers sont en placeholder (pas encore d'images)

### Formulaire de contact
- Callback form avec country picker + telephone
- Envoie via Discord webhook (dans main.js)
- En mobile, le country picker et l'input tel restent sur la meme ligne (ne pas remettre flex-direction: column)

### Geo-redirect
- Script dans `index.html` <head> qui redirige les visiteurs non-FR vers `/en/` via ipapi.co
- `sessionStorage.setItem('kelap_geo', ...)` pour ne pas re-detecter a chaque page

### Deploy
- Push sur `main` branch → GitHub Pages deploie automatiquement
- Domaine : kelap.fr

## Ce qu'il ne faut PAS faire
- Ne jamais ajouter de bundler/framework, le site doit rester statique
- Ne jamais casser le bilinguisme (oublier de modifier une des deux versions)
- Ne pas mettre `flex-direction: column` sur `.cta__callback-row` en mobile
- Ne pas utiliser `object-fit: contain` sur les images portfolio (cause des bandes noires)
- Ne pas supprimer le geo-redirect sans demander
