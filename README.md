# ⛽ CarbuPrix

Une application web moderne, rapide et responsive permettant de trouver les stations-services les plus proches en France, de comparer les prix des carburants en temps réel et de vérifier la disponibilité des stocks (ruptures temporaires et définitives).

Les données sont directement issues de l'API officielle OpenData du gouvernement (`data.economie.gouv.fr`).

🌐 **Démo en ligne :** [https://vincent67580.github.io/CarbuPrix/](https://vincent67580.github.io/CarbuPrix/)

---

## ✨ Fonctionnalités principales

- 📍 **Géolocalisation & Recherche :**
  - Détection automatique de la position de l'utilisateur.
  - Recherche par ville ou code postal partout en France via l'API Adresse (BAN).
  - Choix du rayon de recherche dynamique (5 km à 50 km).
  - Calcul de la distance exacte entre votre position et chaque station.

- 💰 **Prix des carburants en temps réel :**
  - Affichage clair des prix (Gazole, SP95, SP98, E10, E85, GPLc).
  - Horodatage de la dernière mise à jour des prix transmise par la station.
  - Tri dynamique des stations par prix croissant selon le carburant sélectionné.

- ⚠️ **Suivi des ruptures de stock :**
  - Signalement visuel des **ruptures temporaires** (avec date de début si disponible).
  - Distinction des carburants **non proposés (ruptures définitives)**.

- 🗺️ **Itinéraire GPS précis :**
  - Lancement direct du guidage GPS via **Google Maps** (`dir_action=navigate`) ou **Waze** directement calé sur les coordonnées GPS exactes de la station (`geom`).

- ℹ️ **Informations détaillées sur la station :**
  - Enseigne et adresse complète.
  <!-- - Services proposés (Automate 24/24, Laverie, Gonflage, Vente de gaz, DAB, etc.).
  - Horaires d'ouverture détaillés jour par jour. -->

---

## 🛠️ Technologies utilisées

- **Frontend :** React.js (Vite) / JavaScript (ES6+)
- **Styles :** CSS3 / Flexbox & CSS Grid / Responsive Design
- **Cartographie :** Leaflet / React-Leaflet
- **Déploiement :** GitHub Pages
- **Données :** 
  - API OpenData `prix-des-carburants-en-france-flux-instantane-v2` (`data.economie.gouv.fr`)
  - API Adresse BAN (`api-adresse.data.gouv.fr`)

---

## 🚀 Utilisation & Lancement local

### En ligne
L'application est directement accessible depuis n'importe quel navigateur mobile ou ordinateur à l'adresse :  
👉 **[https://vincent67580.github.io/CarbuPrix/](https://vincent67580.github.io/CarbuPrix/)**

### En local

#### Prérequis
- [Node.js](https://nodejs.org/) (version 16+ recommandée)
- `npm`

#### 1. Cloner le projet
git clone https://github.com/vincent67580/CarbuPrix.git
cd CarbuPrix

#### 2. Installer les dépendances
npm install

#### 3. Lancer en mode développement
npm run dev

L'application sera accessible par défaut sur `http://localhost:5173`.

#### 4. Build pour la production
npm run build

---

## 📁 Structure du projet

CarbuPrix/
├── src/
│   ├── api/                 # Modules d'appels aux API externes (fuelApi, addressApi)
│   ├── components/          # Composants UI (StationCard, SearchBar, RadiusSelector, MapView...)
│   ├── utils/               # Fonctions utilitaires (tri, calcul de distance, extraction GPS, navigation)
│   ├── App.jsx              # Orchestrateur principal
│   ├── App.css              # Feuille de style globale
│   └── main.jsx             # Point d'entrée React
├── public/                  # Assets statiques
└── package.json

---

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de le réutiliser et de le modifier.