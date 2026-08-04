import staticData from '../src/data/coding_stats.json' assert { type: 'json' };
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { username } = req.query;
  const user = username || staticData.geeksforgeeks.username;

  try {
    // GeeksForGeeks aggressively blocks scraping via Cloudflare and obfuscates their React state. 
    // We make a best effort fetch but safely fallback to the static data.
    const response = await fetch(`https://www.geeksforgeeks.org/profile/${user}/`);
    
    if (!response.ok) {
       throw new Error(`Failed to fetch GFG stats: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Check if Cloudflare blocked us (e.g., page title doesn't contain the username)
    const title = $('title').text();
    if (title.includes('Just a moment') || title.includes('Cloudflare')) {
      throw new Error('Blocked by Cloudflare');
    }

    // Try to extract basic stats if they exist in the DOM (very brittle)
    const codingScore = $('.score_cards_container .score_card_value').eq(0).text().trim();
    const problemsSolved = $('.score_cards_container .score_card_value').eq(1).text().trim();
    
    if (codingScore && problemsSolved) {
      return res.status(200).json({
        ...staticData.geeksforgeeks,
        codingScore: parseInt(codingScore, 10),
        problemsSolved: parseInt(problemsSolved, 10)
      });
    }

    // If scraping fails to find the exact DOM elements, we fallback to the static data
    throw new Error('GFG DOM structure changed or data not found');
  } catch (error) {
    console.error('GeeksForGeeks API Error:', error);
    // Silent fallback to static data
    return res.status(200).json(staticData.geeksforgeeks);
  }
}
