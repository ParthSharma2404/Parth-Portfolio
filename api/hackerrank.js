import staticData from '../src/data/coding_stats.json' assert { type: 'json' };

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
  const user = username || staticData.hackerrank.username;

  try {
    // We only fetch badges to dynamically update them, profile data is optional.
    const badgesRes = await fetch(`https://www.hackerrank.com/rest/hackers/${user}/badges`);
    
    if (!badgesRes.ok) {
      throw new Error(`Failed to fetch HackerRank stats: ${badgesRes.status}`);
    }

    const data = await badgesRes.json();
    
    if (data && data.models) {
      // Map it to match the static data structure
      const badges = data.models.map(badge => {
        let color = '#fbbf24'; // default
        const name = badge.badge_name.toLowerCase();
        if (name.includes('c++') || name.includes('cpp')) color = '#fbbf24';
        else if (name.includes('c ')) color = '#94a3b8';
        else if (name.includes('sql')) color = '#38bdf8';
        else if (name.includes('java') && !name.includes('script')) color = '#f97316';
        else if (name.includes('python')) color = '#3b82f6';
        else if (name.includes('problem')) color = '#ef4444';
        
        return {
          name: badge.badge_name,
          stars: badge.stars || 0,
          color
        };
      });
      
      // Merge with static data for certifications and calendar (which HR doesn't easily expose publicly in one API)
      return res.status(200).json({
        badges: badges.length > 0 ? badges : staticData.hackerrank.badges,
        certifications: staticData.hackerrank.certifications,
        calendar: staticData.hackerrank.calendar
      });
    }

    throw new Error('Invalid HackerRank data structure');
  } catch (error) {
    console.error('HackerRank API Error:', error);
    // Silent fallback to static data
    return res.status(200).json(staticData.hackerrank);
  }
}
