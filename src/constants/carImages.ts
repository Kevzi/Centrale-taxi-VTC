// Configuration des véhicules VTC disponibles en France
export const luxuryCarImages = {
  hero: [
    'https://www.autoscout24.fr/cms-content-assets/5wcSAfruUWwPxK8cRrmOhS-2a1233cf86bbb657991838cc2706b03a-AS24_-_Mercedes_Classe_V__6_-1100.JPG', // Mercedes Classe V
    'https://www.largus.fr/images/styles/max_1300x1300/public/images/toyota-camry-2019-01.jpg?itok=sLqs7eVd', // Toyota Camry
    'https://www.ridebuster.com/wp-content/uploads/2023/12/2023-Toyota-Prius-Insight-05.webp', // Toyota Prius
    'https://www.mercedes-benz.fr/content/france/fr/vans/models/vito/4477-xz2/overview/_jcr_content/root/responsivegrid/tabs/tabitem/hotspot_module/hotspot_simple_image.component.damq1.3400904125598.jpg/mercedes-benz-vito-tourer-exterior-highlights-SSPIP151987.jpg', // Mercedes Vito
  ],
  fleet: [
    {
      id: 'mercedes-v',
      image:
        'https://www.autoscout24.fr/cms-content-assets/5wcSAfruUWwPxK8cRrmOhS-2a1233cf86bbb657991838cc2706b03a-AS24_-_Mercedes_Classe_V__6_-1100.JPG',
      name: 'Mercedes-Benz Classe V',
      description: 'Van premium 7-8 places, idéal pour les groupes',
    },
    {
      id: 'camry',
      image:
        'https://www.largus.fr/images/styles/max_1300x1300/public/images/toyota-camry-2019-01.jpg?itok=sLqs7eVd',
      name: 'Toyota Camry Hybride',
      description: 'Berline premium pour vos déplacements professionnels',
    },
    {
      id: 'prius',
      image:
        'https://www.ridebuster.com/wp-content/uploads/2023/12/2023-Toyota-Prius-Insight-05.webp',
      name: 'Toyota Prius',
      description: 'La référence des VTC hybrides, économique et confortable',
    },
    {
      id: 'mercedes-vito',
      image:
        'https://www.mercedes-benz.fr/content/france/fr/vans/models/vito/4477-xz2/overview/_jcr_content/root/responsivegrid/tabs/tabitem/hotspot_module/hotspot_simple_image.component.damq1.3400904125598.jpg/mercedes-benz-vito-tourer-exterior-highlights-SSPIP151987.jpg',
      name: 'Mercedes-Benz Vito Tourer',
      description: 'Van spacieux et confortable pour 6-7 passagers',
    },
  ],
};

export const carFeatures = {
  'mercedes-v': [
    'Capacité 7-8 passagers',
    'Sièges cuir électriques',
    'Climatisation tri-zone',
    'Système audio Burmester',
    'Portes coulissantes électriques',
  ],
  camry: [
    'Motorisation hybride 218ch',
    'Sièges cuir premium',
    'Climatisation tri-zone',
    'Système audio JBL',
    'Coffre XXL 500L',
  ],
  prius: [
    'Motorisation hybride 122ch',
    'Consommation: 4.1L/100km',
    'Climatisation automatique',
    'GPS intégré',
    '4 places confortables',
  ],
  'mercedes-vito': [
    'Capacité 6-7 passagers',
    'Configuration flexible',
    'Climatisation avant/arrière',
    'Système multimédia MBUX',
    'Grand espace bagages',
  ],
};
