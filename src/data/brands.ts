export interface Brand {
  id: string;
  name: string;
  domain: string;
  category: 'Tech' | 'Automotive' | 'Fast Food' | 'Luxury' | 'Sports' | 'Social' | 'Retail';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

/**
 * Returns a robust logo URL using a high-reliability fallback chain.
 * Prioritizes CompanyEnrich as requested by user.
 */
export const getLogoUrl = (domain: string) => {
  // Primary: CompanyEnrich (Free/No-token as suggested by user)
  // Fallback: unavatar.io (high reliability aggregator)
  return `https://logo.companyenrich.com/${domain}?fallback=https://unavatar.io/${domain}?fallback=https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
};

export const BRANDS: Brand[] = [
  // Tech
  { id: '1', name: 'Apple', domain: 'apple.com', category: 'Tech', difficulty: 'Easy' },
  { id: '2', name: 'Google', domain: 'google.com', category: 'Tech', difficulty: 'Easy' },
  { id: '3', name: 'Microsoft', domain: 'microsoft.com', category: 'Tech', difficulty: 'Easy' },
  { id: '4', name: 'Amazon', domain: 'amazon.com', category: 'Tech', difficulty: 'Easy' },
  { id: '5', name: 'Nvidia', domain: 'nvidia.com', category: 'Tech', difficulty: 'Medium' },
  // Automotive
  { id: '6', name: 'Tesla', domain: 'tesla.com', category: 'Automotive', difficulty: 'Easy' },
  { id: '7', name: 'BMW', domain: 'bmw.com', category: 'Automotive', difficulty: 'Easy' },
  { id: '8', name: 'Mercedes-Benz', domain: 'mercedes-benz.com', category: 'Automotive', difficulty: 'Easy' },
  { id: '9', name: 'Ferrari', domain: 'ferrari.com', category: 'Automotive', difficulty: 'Medium' },
  { id: '10', name: 'Porsche', domain: 'porsche.com', category: 'Automotive', difficulty: 'Medium' },
  // Fast Food
  { id: '11', name: 'McDonald\'s', domain: 'mcdonalds.com', category: 'Fast Food', difficulty: 'Easy' },
  { id: '12', name: 'Starbucks', domain: 'starbucks.com', category: 'Fast Food', difficulty: 'Easy' },
  { id: '13', name: 'Burger King', domain: 'burgerking.com', category: 'Fast Food', difficulty: 'Medium' },
  { id: '14', name: 'KFC', domain: 'kfc.com', category: 'Fast Food', difficulty: 'Easy' },
  { id: '15', name: 'Subway', domain: 'subway.com', category: 'Fast Food', difficulty: 'Medium' },
  // Luxury
  { id: '16', name: 'Louis Vuitton', domain: 'louisvuitton.com', category: 'Luxury', difficulty: 'Medium' },
  { id: '17', name: 'Gucci', domain: 'gucci.com', category: 'Luxury', difficulty: 'Medium' },
  { id: '18', name: 'Rolex', domain: 'rolex.com', category: 'Luxury', difficulty: 'Hard' },
  { id: '19', name: 'Cartier', domain: 'cartier.com', category: 'Luxury', difficulty: 'Hard' },
  { id: '20', name: 'Chanel', domain: 'chanel.com', category: 'Luxury', difficulty: 'Hard' },
  // Sports
  { id: '21', name: 'Nike', domain: 'nike.com', category: 'Sports', difficulty: 'Easy' },
  { id: '22', name: 'Adidas', domain: 'adidas.com', category: 'Sports', difficulty: 'Easy' },
  { id: '23', name: 'Puma', domain: 'puma.com', category: 'Sports', difficulty: 'Medium' },
  { id: '24', name: 'Under Armour', domain: 'underarmour.com', category: 'Sports', difficulty: 'Medium' },
  { id: '25', name: 'Lululemon', domain: 'lululemon.com', category: 'Sports', difficulty: 'Hard' },
  // Social
  { id: '26', name: 'Instagram', domain: 'instagram.com', category: 'Social', difficulty: 'Easy' },
  { id: '27', name: 'TikTok', domain: 'tiktok.com', category: 'Social', difficulty: 'Easy' },
  { id: '28', name: 'WhatsApp', domain: 'whatsapp.com', category: 'Social', difficulty: 'Easy' },
  { id: '29', name: 'LinkedIn', domain: 'linkedin.com', category: 'Social', difficulty: 'Medium' },
  { id: '30', name: 'Snapchat', domain: 'snapchat.com', category: 'Social', difficulty: 'Medium' },
  // Retail
  { id: '31', name: 'Walmart', domain: 'walmart.com', category: 'Retail', difficulty: 'Easy' },
  { id: '32', name: 'Target', domain: 'target.com', category: 'Retail', difficulty: 'Easy' },
  { id: '33', name: 'IKEA', domain: 'ikea.com', category: 'Retail', difficulty: 'Medium' },
  { id: '34', name: 'Costco', domain: 'costco.com', category: 'Retail', difficulty: 'Medium' },
  { id: '35', name: 'Zara', domain: 'zara.com', category: 'Retail', difficulty: 'Hard' },
  { id: '36', name: 'Netflix', domain: 'netflix.com', category: 'Social', difficulty: 'Easy' },
  { id: '37', name: 'Spotify', domain: 'spotify.com', category: 'Social', difficulty: 'Easy' },
  { id: '38', name: 'Adobe', domain: 'adobe.com', category: 'Tech', difficulty: 'Medium' },
  { id: '39', name: 'Intuit', domain: 'intuit.com', category: 'Tech', difficulty: 'Hard' },
  { id: '40', name: 'Salesforce', domain: 'salesforce.com', category: 'Tech', difficulty: 'Medium' },
  { id: '41', name: 'Ford', domain: 'ford.com', category: 'Automotive', difficulty: 'Easy' },
  { id: '42', name: 'Toyota', domain: 'toyota.com', category: 'Automotive', difficulty: 'Easy' },
  { id: '43', name: 'Honda', domain: 'honda.com', category: 'Automotive', difficulty: 'Easy' },
  { id: '44', name: 'Lexus', domain: 'lexus.com', category: 'Automotive', difficulty: 'Medium' },
  { id: '45', name: 'Audi', domain: 'audi.com', category: 'Automotive', difficulty: 'Easy' },
  { id: '46', name: 'Ferrero Rocher', domain: 'ferrero.com', category: 'Fast Food', difficulty: 'Hard' },
  { id: '47', name: 'Pepsi', domain: 'pepsi.com', category: 'Fast Food', difficulty: 'Easy' },
  { id: '48', name: 'Coca-Cola', domain: 'cocacola.com', category: 'Fast Food', difficulty: 'Easy' },
  { id: '49', name: 'Red Bull', domain: 'redbull.com', category: 'Fast Food', difficulty: 'Medium' },
  { id: '50', name: 'Heineken', domain: 'heineken.com', category: 'Fast Food', difficulty: 'Medium' },
  { id: '51', name: 'Intel', domain: 'intel.com', category: 'Tech', difficulty: 'Easy' },
  { id: '52', name: 'IBM', domain: 'ibm.com', category: 'Tech', difficulty: 'Medium' },
  { id: '53', name: 'Oracle', domain: 'oracle.com', category: 'Tech', difficulty: 'Hard' },
  { id: '54', name: 'Sony', domain: 'sony.com', category: 'Tech', difficulty: 'Easy' },
  { id: '55', name: 'Samsung', domain: 'samsung.com', category: 'Tech', difficulty: 'Easy' },
  { id: '56', name: 'Nintendo', domain: 'nintendo.com', category: 'Tech', difficulty: 'Medium' },
  { id: '57', name: 'PlayStation', domain: 'playstation.com', category: 'Tech', difficulty: 'Easy' },
  { id: '58', name: 'Xbox', domain: 'xbox.com', category: 'Tech', difficulty: 'Easy' },
  { id: '59', name: 'Discord', domain: 'discord.com', category: 'Social', difficulty: 'Easy' },
  { id: '60', name: 'Reddit', domain: 'reddit.com', category: 'Social', difficulty: 'Easy' },
  { id: '61', name: 'Slack', domain: 'slack.com', category: 'Social', difficulty: 'Medium' },
  { id: '62', name: 'Zoom', domain: 'zoom.us', category: 'Tech', difficulty: 'Medium' },
  { id: '63', name: 'Uber', domain: 'uber.com', category: 'Tech', difficulty: 'Easy' },
  { id: '64', name: 'Airbnb', domain: 'airbnb.com', category: 'Tech', difficulty: 'Medium' },
  { id: '65', name: 'Lyft', domain: 'lyft.com', category: 'Tech', difficulty: 'Medium' },
  { id: '66', name: 'Pinterest', domain: 'pinterest.com', category: 'Social', difficulty: 'Medium' },
  { id: '67', name: 'Quora', domain: 'quora.com', category: 'Social', difficulty: 'Hard' },
  { id: '68', name: 'Twitch', domain: 'twitch.tv', category: 'Social', difficulty: 'Medium' },
  { id: '69', name: 'Medium', domain: 'medium.com', category: 'Social', difficulty: 'Hard' },
  { id: '70', name: 'Snapchat', domain: 'snapchat.com', category: 'Social', difficulty: 'Medium' },
];
