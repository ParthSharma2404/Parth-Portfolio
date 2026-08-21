import { useState, useEffect } from "react";
import staticData from "../data/coding_stats.json";

function CodingStats() {
  const [loading, setLoading] = useState(false);
  const [leetcodeData, setLeetcodeData] = useState(staticData.leetcode.fallback);
  const [hackerrankData, setHackerrankData] = useState(staticData.hackerrank);
  const [gfgData, setGfgData] = useState(staticData.geeksforgeeks);
  const [activeFilter, setActiveFilter] = useState("all");

  // Mouse move handlers for premium tilt and glow effects
  const handleMouseMove = (e, type) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (type === "glow") {
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    } else if (type === "tilt") {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseLeave = (e, type) => {
    if (type === "tilt") {
      e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  useEffect(() => {
    let completed = false;

    // 1. Fetch LeetCode stats via serverless endpoint with client-side fallbacks
    const fetchLeetcode = async () => {
      try {
        const res = await fetch(`/api/leetcode?username=${staticData.leetcode.username}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.totalSolved) return data;
        }
      } catch (e) {
        // Continue to fallback
      }

      // Try fallback proxy if local serverless isn't running
      try {
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${staticData.leetcode.username}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.totalSolved) {
            return {
              ...staticData.leetcode.fallback,
              totalSolved: data.totalSolved || staticData.leetcode.fallback.totalSolved,
              easySolved: data.easySolved || staticData.leetcode.fallback.easySolved,
              mediumSolved: data.mediumSolved || staticData.leetcode.fallback.mediumSolved,
              hardSolved: data.hardSolved || staticData.leetcode.fallback.hardSolved,
              ranking: data.ranking || staticData.leetcode.fallback.ranking
            };
          }
        }
      } catch (e) {
        // Use local fallback
      }

      return staticData.leetcode.fallback;
    };

    // 2. Fetch HackerRank badges directly or through API endpoint
    const fetchHackerRank = async () => {
      try {
        const res = await fetch(`https://www.hackerrank.com/rest/hackers/${staticData.hackerrank.username}/badges`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.models && data.models.length > 0) {
            const badges = data.models.map(badge => {
              let color = '#fbbf24';
              const name = (badge.badge_name || '').toLowerCase();
              if (name.includes('c++') || name.includes('cpp')) color = '#fbbf24';
              else if (name.includes('c ') || name === 'c') color = '#94a3b8';
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

            return {
              ...staticData.hackerrank,
              badges: badges.length > 0 ? badges : staticData.hackerrank.badges
            };
          }
        }
      } catch (e) {
        // Fall back to serverless or static
      }

      try {
        const res = await fetch(`/api/hackerrank?username=${staticData.hackerrank.username}`);
        if (res.ok) {
          const data = await res.json();
          if (data) return data;
        }
      } catch (e) {}

      return staticData.hackerrank;
    };

    // 3. Fetch GeeksforGeeks
    const fetchGFG = async () => {
      try {
        const res = await fetch(`/api/geeksforgeeks?username=${staticData.geeksforgeeks.username}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.problemsSolved) return data;
        }
      } catch (e) {}

      return staticData.geeksforgeeks;
    };

    Promise.all([fetchLeetcode(), fetchHackerRank(), fetchGFG()]).then(([lc, hr, gfg]) => {
      if (!completed) {
        if (lc) setLeetcodeData(lc);
        if (hr) setHackerrankData(hr);
        if (gfg) setGfgData(gfg);
      }
    });

    return () => {
      completed = true;
    };
  }, []);

  // Helper to generate calendar grids for the heatmap (past 365 days)
  const getCalendarGrid = () => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 364);

    // Align start date to the beginning of the week (Sunday) for a clean grid layout
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const dates = [];
    const temp = new Date(startDate);
    while (temp <= today) {
      dates.push(new Date(temp));
      temp.setDate(temp.getDate() + 1);
    }
    return dates;
  };

  const datesList = getCalendarGrid();

  // Prepare submission maps for each platform
  const leetcodeCalendar = {};
  if (leetcodeData?.submissionCalendar) {
    let cal = leetcodeData.submissionCalendar;
    if (typeof cal === 'string') {
      try {
        cal = JSON.parse(cal);
      } catch (e) {
        cal = {};
      }
    }
    Object.entries(cal || {}).forEach(([timestamp, count]) => {
      const date = new Date(Number(timestamp) * 1000);
      if (!isNaN(date.getTime())) {
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        leetcodeCalendar[dateStr] = (leetcodeCalendar[dateStr] || 0) + Number(count);
      }
    });
  }

  const hackerrankCalendar = hackerrankData?.calendar || staticData.hackerrank.calendar;
  const gfgCalendar = gfgData?.calendar || staticData.geeksforgeeks.calendar;

  // Grouped contribution checking function
  const getContributionsForDate = (dateStr) => {
    const lc = leetcodeCalendar[dateStr] || 0;
    const hr = hackerrankCalendar[dateStr] || 0;
    const gfg = gfgCalendar[dateStr] || 0;

    if (activeFilter === "leetcode") {
      return { count: lc, platforms: { leetcode: lc } };
    }
    if (activeFilter === "others") {
      return { count: hr + gfg, platforms: { hackerrank: hr, geeksforgeeks: gfg } };
    }
    return {
      count: lc + hr + gfg,
      platforms: { leetcode: lc, hackerrank: hr, geeksforgeeks: gfg }
    };
  };

  // Calculate active days dynamically based on the current filter
  const getActiveDaysCount = () => {
    let count = 0;
    datesList.forEach((date) => {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const { count: dailyCount } = getContributionsForDate(dateStr);
      if (dailyCount > 0) count++;
    });
    return count;
  };

  // Compute color based on submission counts
  const getColorClass = (count) => {
    if (count === 0) return "bg-zinc-900/40 border border-zinc-800/80";
    if (count <= 2) return "bg-[rgba(134,189,34,0.15)] border border-[rgba(134,189,34,0.25)]";
    if (count <= 4) return "bg-[rgba(134,189,34,0.4)] border border-[rgba(134,189,34,0.5)]";
    if (count <= 6) return "bg-[rgba(134,189,34,0.7)] border border-[rgba(134,189,34,0.75)]";
    return "bg-[#86bd22] border border-[#86bd22]";
  };

  // Format date for tooltip display
  const formatDateString = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Group dates into 53 weeks of columns
  const weeks = [];
  let currentWeek = [];
  datesList.forEach((date, i) => {
    currentWeek.push(date);
    if (currentWeek.length === 7 || i === datesList.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Calculate month labels positions
  const rawMonthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, index) => {
    const firstDayOfWeek = week[0];
    const month = firstDayOfWeek.getMonth();
    if (month !== lastMonth) {
      rawMonthLabels.push({
        label: firstDayOfWeek.toLocaleString("en-US", { month: "short" }),
        weekIndex: index
      });
      lastMonth = month;
    }
  });

  // Filter out month labels that start too close to each other to avoid visual overlap
  const monthLabels = [];
  for (let i = 0; i < rawMonthLabels.length; i++) {
    const current = rawMonthLabels[i];
    if (i === 0) {
      const next = rawMonthLabels[i + 1];
      if (next && next.weekIndex - current.weekIndex < 3) {
        continue;
      }
    }
    const prev = monthLabels[monthLabels.length - 1];
    if (prev && current.weekIndex - prev.weekIndex < 3) {
      continue;
    }
    monthLabels.push(current);
  }

  // Calculate percentage solved helper
  const getPercentage = (solved, total) => {
    if (!total) return 0;
    return Math.round((solved / total) * 100);
  };

  // UI display values for stats
  const activeLcStats = leetcodeData || staticData.leetcode.fallback;
  const activeHrStats = hackerrankData || staticData.hackerrank;
  const activeGfgStats = gfgData || staticData.geeksforgeeks;

  return (
    <section className="relative px-6 py-24 min-h-screen bg-zinc-950 overflow-hidden" id="stats">
      {/* Mesh Background */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight reveal">
            Coding Stats & Activity<span className="text-accent">.</span>
          </h2>
          <div className="hidden md:block h-px flex-1 bg-zinc-800 mx-8 mb-4 reveal reveal-delay-100"></div>
          <p className="text-zinc-500 text-sm max-w-xs md:mb-2 reveal reveal-delay-150">
            A dynamic showcase of my problem-solving consistency across coding platforms.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 items-stretch">
          {/* LeetCode Card */}
          <div
            className="group bg-zinc-900/85 border border-zinc-800 p-8 rounded-3xl transition-all duration-500 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.06)] shadow-2xl reveal reveal-delay-100 flex flex-col justify-between h-full relative overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between flex-1 h-full">
              <div>
                {/* Card Header */}
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400 font-display">LeetCode</span>
                  </div>
                  <a
                    href={`https://leetcode.com/u/${staticData.leetcode.username}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.483 0a1.374 1.374 0 0 0 -0.961 0.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0 -1.209 2.104 5.35 5.35 0 0 0 -0.125 0.513 5.527 5.527 0 0 0 0.062 2.362 5.83 5.83 0 0 0 0.349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193 0.039 0.038c2.248 2.165 5.852 2.133 8.063 -0.074l2.396 -2.392c0.54 -0.54 0.54 -1.414 0.003 -1.955a1.378 1.378 0 0 0 -1.951 -0.003l-2.396 2.392a3.021 3.021 0 0 1 -4.205 0.038l-0.02 -0.019 -4.276 -4.193c-0.652 -0.64 -0.972 -1.469 -0.948 -2.263a2.68 2.68 0 0 1 0.066 -0.523 2.545 2.545 0 0 1 0.619 -1.164L9.13 8.114c1.058 -1.134 3.204 -1.27 4.43 -0.278l3.501 2.831c0.593 0.48 1.461 0.387 1.94 -0.207a1.384 1.384 0 0 0 -0.207 -1.943l-3.5 -2.831c-0.8 -0.647 -1.766 -1.045 -2.774 -1.202l2.015 -2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0 -1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38 -1.382 1.38 1.38 0 0 0 -1.38 -1.382z"/>
                    </svg>
                  </a>
                </div>

                {/* Solved Stats Ring & Capsules */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  {/* Circular Gauge */}
                  <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="56" cy="56" r="46" stroke="rgba(255,255,255,0.03)" strokeWidth="7" fill="transparent" />
                      <circle
                        cx="56"
                        cy="56"
                        r="46"
                        stroke="#f97316"
                        strokeWidth="7"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 46}`}
                        strokeDashoffset={`${2 * Math.PI * 46 * (1 - getPercentage(activeLcStats.totalSolved, 3999) / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">{activeLcStats.totalSolved}</span>
                      <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">Solved</span>
                    </div>
                  </div>

                  {/* Substats Capsules */}
                  <div className="flex-1 w-full space-y-2.5">
                    <div className="bg-zinc-950/40 border border-white/[0.03] p-2.5 px-3.5 rounded-2xl flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                      <span className="text-xs text-zinc-400 font-semibold">Easy</span>
                      <span className="ml-auto text-xs font-bold text-white">{activeLcStats.easySolved}<span className="text-zinc-600 font-normal">/{activeLcStats.totalEasy}</span></span>
                    </div>

                    <div className="bg-zinc-950/40 border border-white/[0.03] p-2.5 px-3.5 rounded-2xl flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                      <span className="text-xs text-zinc-400 font-semibold">Medium</span>
                      <span className="ml-auto text-xs font-bold text-white">{activeLcStats.mediumSolved}<span className="text-zinc-600 font-normal">/{activeLcStats.totalMedium}</span></span>
                    </div>

                    <div className="bg-zinc-950/40 border border-white/[0.03] p-2.5 px-3.5 rounded-2xl flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                      <span className="text-xs text-zinc-400 font-semibold">Hard</span>
                      <span className="ml-auto text-xs font-bold text-white">{activeLcStats.hardSolved}<span className="text-zinc-600 font-normal">/{activeLcStats.totalHard}</span></span>
                    </div>
                  </div>
                </div>

                {/* Platform Meta Info */}
                <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/[0.05] text-xs">
                  <div>
                    <span className="text-zinc-500 block font-bold uppercase tracking-wider text-[9px]">Contest Rating</span>
                    <span className="text-white font-extrabold text-sm mt-1 block">{activeLcStats.contestRating || 1480}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block font-bold uppercase tracking-wider text-[9px]">Global Rank</span>
                    <span className="text-white font-extrabold text-sm mt-1 block">
                      {loading ? "..." : activeLcStats.ranking.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Button */}
              <div className="flex justify-center mt-6 pt-4">
                <a
                  href={`https://leetcode.com/u/${staticData.leetcode.username}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-950/60 border border-zinc-800/80 group-hover:border-orange-500/60 group-hover:bg-orange-500/10 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-all duration-300 shadow-md"
                  title="View LeetCode Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-zinc-400 group-hover:text-orange-500 transition-all duration-300">
                    <path d="M13.483 0a1.374 1.374 0 0 0 -0.961 0.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0 -1.209 2.104 5.35 5.35 0 0 0 -0.125 0.513 5.527 5.527 0 0 0 0.062 2.362 5.83 5.83 0 0 0 0.349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193 0.039 0.038c2.248 2.165 5.852 2.133 8.063 -0.074l2.396 -2.392c0.54 -0.54 0.54 -1.414 0.003 -1.955a1.378 1.378 0 0 0 -1.951 -0.003l-2.396 2.392a3.021 3.021 0 0 1 -4.205 0.038l-0.02 -0.019 -4.276 -4.193c-0.652 -0.64 -0.972 -1.469 -0.948 -2.263a2.68 2.68 0 0 1 0.066 -0.523 2.545 2.545 0 0 1 0.619 -1.164L9.13 8.114c1.058 -1.134 3.204 -1.27 4.43 -0.278l3.501 2.831c0.593 0.48 1.461 0.387 1.94 -0.207a1.384 1.384 0 0 0 -0.207 -1.943l-3.5 -2.831c-0.8 -0.647 -1.766 -1.045 -2.774 -1.202l2.015 -2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0 -1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38 -1.382 1.38 1.38 0 0 0 -1.38 -1.382z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* HackerRank Card */}
          <div
            className="group bg-zinc-900/85 border border-zinc-800 p-8 rounded-3xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)] shadow-2xl reveal reveal-delay-150 flex flex-col justify-between h-full relative overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between flex-1 h-full">
              <div>
                {/* Card Header */}
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-display">HackerRank</span>
                  </div>
                  <a
                    href={`https://www.hackerrank.com/profile/${staticData.hackerrank.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 0v24h24V0zm9.95 8.002h1.805c0.061 0 0.111 0.05 0.111 0.111v7.767c0 0.061 -0.05 0.111 -0.11 0.111H9.95c-0.061 0 -0.111 -0.05 -0.111 -0.11v-2.87H7.894v2.87c0 0.06 -0.05 0.11 -0.11 0.11H5.976a0.11 0.11 0 0 1 -0.11 -0.11V8.112c0 -0.06 0.05 -0.11 0.11 -0.11h1.806c0.061 0 0.11 0.05 0.11 0.11v2.869H9.84v-2.87c0 -0.06 0.05 -0.11 0.11 -0.11zm2.999 0h5.778c0.061 0 0.111 0.05 0.111 0.11v7.767a0.11 0.11 0 0 1 -0.11 0.112h-5.78a0.11 0.11 0 0 1 -0.11 -0.11v-7.77c0 -0.06 0.05 -0.11 0.11 -0.11z"/>
                    </svg>
                  </a>
                </div>

                <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-4">Earned Badges</h4>
                
                {/* Badges Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {activeHrStats.badges.map((badge) => (
                    <div
                      key={badge.name}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-950/40 border border-white/[0.03] group/badge hover:bg-zinc-950/70 hover:border-white/10 transition-all duration-300"
                    >
                      <span className="text-[9px] font-bold text-zinc-400 text-center truncate w-full group-hover/badge:text-white transition-colors">
                        {badge.name}
                      </span>
                      <span className="text-[10px] font-bold mt-1.5 tracking-widest text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)] select-none">
                        {"★".repeat(badge.stars)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="pt-5 border-t border-white/[0.05]">
                  <span className="text-zinc-500 block font-bold uppercase tracking-wider text-[9px] mb-3">Verified Credentials</span>
                  {activeHrStats.certifications.map((cert) => (
                    <div key={cert.name} className="flex justify-between items-center bg-zinc-950/40 border border-white/[0.03] p-3 px-4 rounded-2xl">
                      <span className="text-zinc-200 text-xs font-semibold">{cert.name}</span>
                      <span className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-[9px] tracking-wider uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {cert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Button */}
              <div className="flex justify-center mt-6 pt-4">
                <a
                  href={`https://www.hackerrank.com/profile/${staticData.hackerrank.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-950/60 border border-zinc-800/80 group-hover:border-emerald-500/60 group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-all duration-300 shadow-md"
                  title="View HackerRank Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-zinc-400 group-hover:text-emerald-500 transition-all duration-300">
                    <path d="M0 0v24h24V0zm9.95 8.002h1.805c0.061 0 0.111 0.05 0.111 0.111v7.767c0 0.061 -0.05 0.111 -0.11 0.111H9.95c-0.061 0 -0.111 -0.05 -0.111 -0.11v-2.87H7.894v2.87c0 0.06 -0.05 0.11 -0.11 0.11H5.976a0.11 0.11 0 0 1 -0.11 -0.11V8.112c0 -0.06 0.05 -0.11 0.11 -0.11h1.806c0.061 0 0.11 0.05 0.11 0.11v2.869H9.84v-2.87c0 -0.06 0.05 -0.11 0.11 -0.11zm2.999 0h5.778c0.061 0 0.111 0.05 0.111 0.11v7.767a0.11 0.11 0 0 1 -0.11 0.112h-5.78a0.11 0.11 0 0 1 -0.11 -0.11v-7.77c0 -0.06 0.05 -0.11 0.11 -0.11z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* GeeksforGeeks Card */}
          <div
            className="group bg-zinc-900/85 border border-zinc-800 p-8 rounded-3xl transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(134,189,34,0.06)] shadow-2xl reveal reveal-delay-200 flex flex-col justify-between h-full relative overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#86bd22]/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between flex-1 h-full">
              <div>
                {/* Card Header */}
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#86bd22] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#86bd22]"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#86bd22] font-display">GeeksforGeeks</span>
                  </div>
                  <a
                    href={`https://www.geeksforgeeks.org/profile/${staticData.geeksforgeeks.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-950/50 border border-white/[0.05] text-zinc-500 hover:text-white hover:border-[#86bd22]/30 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.45 14.315c-0.143 0.28 -0.334 0.532 -0.565 0.745a3.691 3.691 0 0 1 -1.104 0.695 4.51 4.51 0 0 1 -3.116 -0.016 3.79 3.79 0 0 1 -2.135 -2.078 3.571 3.571 0 0 1 -0.13 -0.353h7.418a4.26 4.26 0 0 1 -0.368 1.008zm-11.99 -0.654a3.793 3.793 0 0 1 -2.134 2.078 4.51 4.51 0 0 1 -3.117 0.016 3.7 3.7 0 0 1 -1.104 -0.695 2.652 2.652 0 0 1 -0.564 -0.745 4.221 4.221 0 0 1 -0.368 -1.006H9.59c-0.038 0.12 -0.08 0.238 -0.13 0.352zm14.501 -1.758a3.849 3.849 0 0 0 -0.082 -0.475l-9.634 -0.008a3.932 3.932 0 0 1 1.143 -2.348c0.363 -0.35 0.79 -0.625 1.26 -0.809a3.97 3.97 0 0 1 4.484 0.957l1.521 -1.49a5.7 5.7 0 0 0 -1.922 -1.357 6.283 6.283 0 0 0 -2.544 -0.49 6.35 6.35 0 0 0 -2.405 0.457 6.007 6.007 0 0 0 -1.963 1.276 6.142 6.142 0 0 0 -1.325 1.94 5.862 5.862 0 0 0 -0.466 1.864h-0.063a5.857 5.857 0 0 0 -0.467 -1.865 6.13 6.13 0 0 0 -1.325 -1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0 -4.949 0.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484 -0.958c0.47 0.184 0.898 0.46 1.26 0.81 0.368 0.36 0.66 0.792 0.859 1.268 0.146 0.344 0.242 0.708 0.285 1.08l-9.635 0.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 0.345 2.127 4.927 4.927 0 0 0 1.08 1.783c0.528 0.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504 0.457c0.824 0.005 1.64 -0.15 2.404 -0.457a5.986 5.986 0 0 0 1.964 -1.277 6.116 6.116 0 0 0 1.686 -3.076h0.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405 0.457 6.45 6.45 0 0 0 2.502 -0.457 5.42 5.42 0 0 0 1.882 -1.293 4.928 4.928 0 0 0 1.08 -1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0 -0.039 -0.554z"/>
                    </svg>
                  </a>
                </div>

                {/* Big GFG Stats Bento Grid */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-zinc-950/40 p-4 rounded-2xl border border-white/[0.03]">
                    <span className="text-zinc-500 block text-[9px] font-bold uppercase tracking-wider">Coding Score</span>
                    <span className="text-3xl font-extrabold font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mt-1 block">
                      {activeGfgStats.codingScore}
                    </span>
                  </div>
                  <div className="bg-zinc-950/40 p-4 rounded-2xl border border-white/[0.03]">
                    <span className="text-zinc-500 block text-[9px] font-bold uppercase tracking-wider">Solved</span>
                    <span className="text-3xl font-extrabold font-display bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mt-1 block">
                      {activeGfgStats.problemsSolved}
                    </span>
                  </div>
                </div>

                {/* GFG Rank / Breakdown */}
                <div className="pt-5 border-t border-white/[0.05] space-y-4">
                  <div className="flex justify-between items-center bg-zinc-950/40 border border-white/[0.03] p-3.5 px-4 rounded-2xl text-xs">
                    <span className="text-zinc-400 font-semibold">Institute Rank</span>
                    <span className="text-white font-extrabold">#{activeGfgStats.instituteRank}</span>
                  </div>
                  
                  {/* Distribution Pills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="bg-zinc-950/60 border border-white/[0.02] px-2.5 py-1 rounded-full text-[9px] text-zinc-400 font-bold uppercase select-none">
                      Basic: {activeGfgStats.distribution.basic}
                    </span>
                    <span className="bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[9px] text-emerald-400 font-bold uppercase select-none">
                      Easy: {activeGfgStats.distribution.easy}
                    </span>
                    <span className="bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full text-[9px] text-amber-400 font-bold uppercase select-none">
                      Med: {activeGfgStats.distribution.medium}
                    </span>
                    <span className="bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full text-[9px] text-rose-400 font-bold uppercase select-none">
                      Hard: {activeGfgStats.distribution.hard}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Button */}
              <div className="flex justify-center mt-6 pt-4">
                <a
                  href={`https://www.geeksforgeeks.org/profile/${staticData.geeksforgeeks.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-950/60 border border-zinc-800/80 group-hover:border-accent/60 group-hover:bg-accent/10 group-hover:shadow-[0_0_20px_rgba(134,189,34,0.4)] group-hover:scale-110 transition-all duration-300 shadow-md"
                  title="View GeeksforGeeks Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-zinc-400 group-hover:text-accent transition-all duration-300">
                    <path d="M21.45 14.315c-0.143 0.28 -0.334 0.532 -0.565 0.745a3.691 3.691 0 0 1 -1.104 0.695 4.51 4.51 0 0 1 -3.116 -0.016 3.79 3.79 0 0 1 -2.135 -2.078 3.571 3.571 0 0 1 -0.13 -0.353h7.418a4.26 4.26 0 0 1 -0.368 1.008zm-11.99 -0.654a3.793 3.793 0 0 1 -2.134 2.078 4.51 4.51 0 0 1 -3.117 0.016 3.7 3.7 0 0 1 -1.104 -0.695 2.652 2.652 0 0 1 -0.564 -0.745 4.221 4.221 0 0 1 -0.368 -1.006H9.59c-0.038 0.12 -0.08 0.238 -0.13 0.352zm14.501 -1.758a3.849 3.849 0 0 0 -0.082 -0.475l-9.634 -0.008a3.932 3.932 0 0 1 1.143 -2.348c0.363 -0.35 0.79 -0.625 1.26 -0.809a3.97 3.97 0 0 1 4.484 0.957l1.521 -1.49a5.7 5.7 0 0 0 -1.922 -1.357 6.283 6.283 0 0 0 -2.544 -0.49 6.35 6.35 0 0 0 -2.405 0.457 6.007 6.007 0 0 0 -1.963 1.276 6.142 6.142 0 0 0 -1.325 1.94 5.862 5.862 0 0 0 -0.466 1.864h-0.063a5.857 5.857 0 0 0 -0.467 -1.865 6.13 6.13 0 0 0 -1.325 -1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0 -4.949 0.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484 -0.958c0.47 0.184 0.898 0.46 1.26 0.81 0.368 0.36 0.66 0.792 0.859 1.268 0.146 0.344 0.242 0.708 0.285 1.08l-9.635 0.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 0.345 2.127 4.927 4.927 0 0 0 1.08 1.783c0.528 0.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504 0.457c0.824 0.005 1.64 -0.15 2.404 -0.457a5.986 5.986 0 0 0 1.964 -1.277 6.116 6.116 0 0 0 1.686 -3.076h0.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405 0.457 6.45 6.45 0 0 0 2.502 -0.457 5.42 5.42 0 0 0 1.882 -1.293 4.928 4.928 0 0 0 1.08 -1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0 -0.039 -0.554z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Calendar Heatmap Section */}
        <div
          onMouseMove={(e) => handleMouseMove(e, "glow")}
          className="glow-card bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 border border-zinc-800/60 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-2xl reveal reveal-delay-300"
        >
          {/* Header & Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 relative z-20">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Aggregated Activity Heatmap</h3>
              <p className="text-xs text-zinc-500 mt-1">Consolidated view of commits/submissions across platforms.</p>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col xl:flex-row gap-3 items-start xl:items-center">
              <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-full border border-zinc-800 text-xs">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                    activeFilter === "all" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter("leetcode")}
                  className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                    activeFilter === "leetcode" ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  LeetCode Only
                </button>
                <button
                  onClick={() => setActiveFilter("others")}
                  className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                    activeFilter === "others" ? "bg-emerald-500 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  HackerRank & GFG
                </button>
              </div>

              {/* Codolio Button */}
              <a
                href="https://codolio.com/profile/Parth_Sharma"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-5 py-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-white text-xs font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <img 
                  src="https://codolio.com/codolio_assets/codolio.svg" 
                  alt="Codolio" 
                  className="w-4 h-4 object-contain"
                />
                Codolio Profile
              </a>
            </div>
          </div>

          {/* Heatmap Grid Wrapper (Horizontal scrolling on mobile) */}
          <div className="relative z-10 overflow-x-auto pb-4 scrollbar-thin select-none">
            <div className="min-w-[760px] w-max flex flex-col mx-auto pt-14">
              {/* Months Headers Row */}
              <div className="flex mb-2 h-4 items-end">
                {/* Empty spacer matching the day labels width */}
                <div className="w-6 shrink-0 pr-2" />
                
                {/* Month labels container aligned with the grid */}
                <div className="flex gap-[3.5px] h-full items-end">
                  {weeks.map((week, index) => {
                    const labelItem = monthLabels.find((l) => l.weekIndex === index);
                    const isMonthStart = index > 0 && labelItem;
                    return (
                      <div key={index} className="flex items-end h-full">
                        {isMonthStart && (
                          <div className="w-[1px] h-4 mx-1 shrink-0" />
                        )}
                        <div
                          className="w-3.5 shrink-0 relative h-full"
                        >
                          {labelItem && (
                            <span className="absolute left-0 bottom-0 whitespace-nowrap text-[9px] font-bold text-zinc-500 uppercase tracking-wider leading-none">
                              {labelItem.label}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Day rows (7 rows, Sun to Sat) */}
              <div className="flex">
                {/* Y-Axis Day Labels (Sun, Tue, Thu, Sat) */}
                <div className="flex flex-col justify-between text-[9px] font-bold text-zinc-600 w-6 pr-2 h-[122px] py-1 select-none">
                  <span>Sun</span>
                  <span>Tue</span>
                  <span>Thu</span>
                  <span>Sat</span>
                </div>

                {/* Grid columns */}
                <div className="flex gap-[3.5px]">
                  {weeks.map((week, weekIdx) => {
                    const labelItem = monthLabels.find((l) => l.weekIndex === weekIdx);
                    const isMonthStart = weekIdx > 0 && labelItem;
                    return (
                      <div key={weekIdx} className="flex items-center">
                        {isMonthStart && (
                          <div className="w-[1px] h-[112px] bg-zinc-800/40 mx-1 shrink-0 self-center" />
                        )}
                        <div
                          className="flex flex-col gap-[3.5px]"
                        >
                          {week.map((date, dayIdx) => {
                            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                            const { count, platforms } = getContributionsForDate(dateStr);
                            const colorClass = getColorClass(count);

                            // Platform descriptions for tooltip
                            const tooltipPlatformLogs = [];
                            if (platforms.leetcode) tooltipPlatformLogs.push(`${platforms.leetcode} LeetCode`);
                            if (platforms.hackerrank) tooltipPlatformLogs.push(`${platforms.hackerrank} HackerRank`);
                            if (platforms.geeksforgeeks) tooltipPlatformLogs.push(`${platforms.geeksforgeeks} GeeksforGeeks`);

                            return (
                              <div key={dayIdx} className="relative group/cell cursor-default w-3.5 h-3.5">
                                {/* Heatmap Cell */}
                                <div className={`w-full h-full rounded-sm transition-all duration-300 ${colorClass}`} />

                                {/* CSS Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/cell:flex flex-col items-center z-30 bg-zinc-950/95 border border-zinc-800 text-[10px] p-2.5 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap gap-1">
                                  <span className="font-bold text-white">
                                    {count === 0 ? "No contributions" : `${count} contribution${count > 1 ? "s" : ""}`}
                                  </span>
                                  <span className="text-zinc-400 font-medium">{formatDateString(date)}</span>
                                  {tooltipPlatformLogs.length > 0 && (
                                    <div className="mt-1 pt-1 border-t border-zinc-800/80 flex flex-col items-start gap-0.5 text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                                      {tooltipPlatformLogs.map((log) => (
                                        <span key={log}>{log}</span>
                                      ))}
                                    </div>
                                  )}
                                  {/* Arrow down */}
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-zinc-800" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Grid Legend Footer */}
          <div className="flex justify-between items-center mt-6 text-xs text-zinc-500 font-semibold relative z-20">
            <span>
              Total Active Days: <span className="text-accent">{loading ? "..." : getActiveDaysCount()} days</span>
            </span>
            <div className="flex items-center gap-1.5 select-none">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-zinc-900/40 border border-zinc-800/80" />
              <div className="w-3 h-3 rounded-sm bg-[rgba(134,189,34,0.15)] border border-[rgba(134,189,34,0.25)]" />
              <div className="w-3 h-3 rounded-sm bg-[rgba(134,189,34,0.4)] border border-[rgba(134,189,34,0.5)]" />
              <div className="w-3 h-3 rounded-sm bg-[rgba(134,189,34,0.7)] border border-[rgba(134,189,34,0.75)]" />
              <div className="w-3 h-3 rounded-sm bg-[#86bd22] border border-[#86bd22]" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CodingStats;
