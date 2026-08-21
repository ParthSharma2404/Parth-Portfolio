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
  const user = username || staticData.leetcode.username;

  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
          }
          userCalendar {
            streak
            totalActiveDays
            submissionCalendar
          }
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: JSON.stringify({
        query,
        variables: { username: user }
      })
    });

    if (!response.ok) {
      throw new Error(`LeetCode GraphQL error: ${response.status}`);
    }

    const data = await response.json();
    const matchedUser = data?.data?.matchedUser;

    if (!matchedUser) {
      throw new Error('User not found on LeetCode');
    }

    const acSubmissions = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const getCount = (diff) => acSubmissions.find(s => s.difficulty.toLowerCase() === diff.toLowerCase())?.count || 0;
    const totalSubmissions = acSubmissions.reduce((acc, curr) => acc + (curr.submissions || 0), 0);

    let parsedCalendar = staticData.leetcode.fallback.calendar;
    if (matchedUser.userCalendar?.submissionCalendar) {
      try {
        parsedCalendar = typeof matchedUser.userCalendar.submissionCalendar === 'string'
          ? JSON.parse(matchedUser.userCalendar.submissionCalendar)
          : matchedUser.userCalendar.submissionCalendar;
      } catch (e) {
        parsedCalendar = staticData.leetcode.fallback.calendar;
      }
    }

    return res.status(200).json({
      totalSolved: getCount('all') || staticData.leetcode.fallback.totalSolved,
      easySolved: getCount('easy') || staticData.leetcode.fallback.easySolved,
      mediumSolved: getCount('medium') || staticData.leetcode.fallback.mediumSolved,
      hardSolved: getCount('hard') || staticData.leetcode.fallback.hardSolved,
      totalEasy: 867,
      totalMedium: 1845,
      totalHard: 810,
      ranking: matchedUser.profile?.ranking || staticData.leetcode.fallback.ranking,
      contestRating: data?.data?.userContestRanking?.rating ? Math.round(data.data.userContestRanking.rating) : staticData.leetcode.fallback.contestRating,
      submissionsPastYear: totalSubmissions || staticData.leetcode.fallback.submissionsPastYear,
      activeDays: matchedUser.userCalendar?.totalActiveDays || staticData.leetcode.fallback.activeDays,
      maxStreak: matchedUser.userCalendar?.streak || staticData.leetcode.fallback.maxStreak,
      submissionCalendar: parsedCalendar
    });
  } catch (err) {
    console.error('LeetCode API Fetch Error:', err);
    return res.status(200).json(staticData.leetcode.fallback);
  }
}
