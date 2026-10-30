// ✏️ TOUT SE MODIFIE ICI (textes, date, horaires, lieux, tenue, lien du formulaire)

export const config = {
  prenom1: 'Nincekon',
  prenom2: 'Samira',
  date: '2026-12-12T10:00:00', // format AAAA-MM-JJTHH:MM:SS
  accueil: "Nous avons la joie de vous convier à célébrer le plus beau jour de notre vie.",

  // Lieux (ajoutez-en autant que nécessaire, ex: la mairie pour la cérémonie civile)
  lieux: [
    {
      id: 'mairie', // EXEMPLE à vérifier/modifier : lieu de la cérémonie civile
      nom: 'Mairie annexe de Cocody Djorogobité 2',
      adresse: 'A 500 mètres du CHU d\'Angré, Cocody Djorogobité 2, Abidjan',
      requete: 'Mairie annexe de Cocody Djorogobité 2, Abidjan',
    },
    {
      id: 'eead-temple-piete', // EXEMPLE à vérifier/modifier : lieu de la bénédiction nuptiale
      nom: 'EEAD Riviera Palmeraie Temple de la Piété',
      adresse: 'Non loin du marché Sion, à 500 m derrière la cité Sipim 4',
      requete: 'EEAD Riviera Palmeraie Temple de la Piété, Cocody Palmeraie, Abidjan',
    },
    {
      id: 'sipim', // EXEMPLE à vérifier/modifier : lieu de la réception
      nom: 'Terrain Sipim Planètes',
      adresse: 'Cité Sipim 4, Palmeraie, Cocody, Abidjan',
      requete: 'Ecole Sipim Planètes, Sipim 4 Palmeraie, Cocody, Abidjan', // recherche Google Maps
    },
    
  ],

  // Programme : "lieu" = id d'un lieu ci-dessus
  programme: [
    { heure: '08h00', titre: 'Cérémonie civile', lieu: 'mairie', texte: "L'échange des consentements devant l'officier d'état civil." },
    { heure: '11h00', titre: 'Bénédiction nuptiale', lieu: 'eead-temple-piete', texte: 'Nous unissons nos vies devant DIEU et nos proches.' },
    { heure: '14h00', titre: 'Réception', lieu: 'sipim', texte: 'Repas, musique et danse pour partager notre joie.' },
    { heure: '16h30', titre: 'Remerciements', lieu: 'sipim', texte: 'Un mot de gratitude pour tous ceux qui ont fait de ce jour un souvenir inoubliable.' },
  ],

  tenue: {
    texte: "Toute tenue élégante est la bienvenue, du moment qu'elle comporte au moins une de nos couleurs.",
    couleurs: [
      { nom: 'Bleu marine', hex: '#000080' },
      { nom: 'Orange', hex: '#e8762d' },
      { nom: 'Saumon', hex: '#f5a98c' },
    ],
  },

  rsvp: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdHk2Y6iFPsvvkjZXSN3zSY0D4Y9DjxD0HSYQDUWNca9n4_Uw/viewform?usp=dialog', // lien de votre formulaire (Google Forms, etc.)
    limite: '2026-11-28',
  },
}
