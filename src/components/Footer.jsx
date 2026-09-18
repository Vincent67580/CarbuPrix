import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-title">Sources & API utilisées :</p>
        
        <ul className="footer-api-list">
          <li>
            Prix & Ruptures :{' '}
            <a
              href="https://www.data.gouv.fr/fr/datasets/prix-des-carburants-en-france-flux-instantane-v2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Prix-Carburants (data.gouv.fr)
            </a>
          </li>
          <li>
            Recherche d'adresse :{' '}
            <a
              href="https://adresse.data.gouv.fr/api-doc/adresse"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Adresse (BAN)
            </a>
          </li>
          <li>
            Cartographie :{' '}
            <a
              href="https://www.openstreetmap.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap
            </a>{' '}
            &{' '}
            <a
              href="https://leafletjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leaflet
            </a>
          </li>
          <li>
            Base de marques :{' '}
            <a
              href="https://github.com/Aohzan/hass-prixcarburant/blob/master/custom_components/prix_carburant/stations_name.json"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aohzan / hass-prixcarburant
            </a>
          </li>
        </ul>

        <p className="footer-credits">
          © {currentYear} - Développement par{' '}
          <a
            href="https://github.com/Vincent67580"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vincent67580
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;