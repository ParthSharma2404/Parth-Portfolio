import { useState, useEffect } from "react";
import staticData from "../data/coding_stats.json";

function CodingStats() {
  const [loading, setLoading] = useState(true);
  const [leetcodeData, setLeetcodeData] = useState(null);
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

    // Timeout of 3.5 seconds to fallback to cached static stats if API is slow
    const fallbackTimeout = setTimeout(() => {
      if (!completed) {
        setLeetcodeData(staticData.leetcode.fallback);
        setLoading(false);
        console.warn("LeetCode API timed out. Loaded local cached fallback.");
      }
    }, 3500);

    fetch(`https://leetcode-api-faisalshohag.vercel.app/${staticData.leetcode.username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (!completed) {
          clearTimeout(fallbackTimeout);
          setLeetcodeData({
            totalSolved: data.totalSolved || staticData.leetcode.fallback.totalSolved,
            easySolved: data.easySolved || staticData.leetcode.fallback.easySolved,
            mediumSolved: data.mediumSolved || staticData.leetcode.fallback.mediumSolved,
            hardSolved: data.hardSolved || staticData.leetcode.fallback.hardSolved,
            totalEasy: data.totalEasy || staticData.leetcode.fallback.totalEasy,
            totalMedium: data.totalMedium || staticData.leetcode.fallback.totalMedium,
            totalHard: data.totalHard || staticData.leetcode.fallback.totalHard,
            ranking: data.ranking || staticData.leetcode.fallback.ranking,
            submissionCalendar: data.submissionCalendar || staticData.leetcode.fallback.calendar,
            submissionsPastYear: data.totalSubmissions?.[0]?.submissions || staticData.leetcode.fallback.submissionsPastYear,
            contestRating: staticData.leetcode.fallback.contestRating
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("LeetCode API error:", err);
        if (!completed) {
          clearTimeout(fallbackTimeout);
          setLeetcodeData(staticData.leetcode.fallback);
          setLoading(false);
        }
      });

    return () => {
      completed = true;
      clearTimeout(fallbackTimeout);
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
    Object.entries(leetcodeData.submissionCalendar).forEach(([timestamp, count]) => {
      const date = new Date(Number(timestamp) * 1000);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      leetcodeCalendar[dateStr] = (leetcodeCalendar[dateStr] || 0) + Number(count);
    });
  }

  const hackerrankCalendar = staticData.hackerrank.calendar;
  const gfgCalendar = staticData.geeksforgeeks.calendar;

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
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, index) => {
    const firstDayOfWeek = week[0];
    const month = firstDayOfWeek.getMonth();
    if (month !== lastMonth) {
      monthLabels.push({
        label: firstDayOfWeek.toLocaleString("en-US", { month: "short" }),
        weekIndex: index
      });
      lastMonth = month;
    }
  });

  // Calculate percentage solved helper
  const getPercentage = (solved, total) => {
    if (!total) return 0;
    return Math.round((solved / total) * 100);
  };

  // UI display values for LeetCode stats
  const activeLcStats = leetcodeData || staticData.leetcode.fallback;

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
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* LeetCode Card */}
          <div
            onMouseMove={(e) => handleMouseMove(e, "tilt")}
            onMouseLeave={(e) => handleMouseLeave(e, "tilt")}
            className="tilt-card bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 border border-zinc-800/80 p-6 rounded-2xl transition-all duration-300 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.06)] shadow-xl reveal reveal-delay-100 flex flex-col justify-between"
          >
            <div className="tilt-content">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">LeetCode</span>
                <a
                  href={`https://leetcode.com/u/${staticData.leetcode.username}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-orange-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.77 9.77a1.375 1.375 0 0 0-.025 1.96L7.48 16.9a1.375 1.375 0 0 0 1.913-.02l9.74-9.74a1.375 1.375 0 0 0-.025-1.96L14.39.414A1.37 1.37 0 0 0 13.483 0zm-6.19 14.476L4.544 11.73l9.043-9.043 2.743 2.742-9.037 9.047zm16.522-3.86a.916.916 0 0 0-.64-.26h-4.382l4.382-4.383a.916.916 0 0 0-.64-1.564H11.77a.916.916 0 0 0-.64.26L2.086 13.714a.916.916 0 0 0 .64 1.563H19.74v4.381a.916.916 0 0 0 1.563.64l4.381-4.381a.916.916 0 0 0-.261-1.562z"/>
                  </svg>
                </a>
              </div>

              {/* Solved Stats Ring */}
              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    {/* Background circle */}
                    <circle cx="48" cy="48" r="40" stroke="#27272a" strokeWidth="6" fill="transparent" />
                    {/* Solved percentage circle */}
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#fb923c"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - getPercentage(activeLcStats.totalSolved, 3999) / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-xl font-bold font-display text-white">{activeLcStats.totalSolved}</span>
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase">Solved</span>
                  </div>
                </div>

                {/* Substats */}
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-medium">Easy</span>
                    <span className="text-white font-bold">{activeLcStats.easySolved}<span className="text-zinc-600">/{activeLcStats.totalEasy}</span></span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${getPercentage(activeLcStats.easySolved, activeLcStats.totalEasy)}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-medium">Medium</span>
                    <span className="text-white font-bold">{activeLcStats.mediumSolved}<span className="text-zinc-600">/{activeLcStats.totalMedium}</span></span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full" style={{ width: `${getPercentage(activeLcStats.mediumSolved, activeLcStats.totalMedium)}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-medium">Hard</span>
                    <span className="text-white font-bold">{activeLcStats.hardSolved}<span className="text-zinc-600">/{activeLcStats.totalHard}</span></span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${getPercentage(activeLcStats.hardSolved, activeLcStats.totalHard)}%` }} />
                  </div>
                </div>
              </div>

              {/* Platform Meta Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/60 text-xs">
                <div>
                  <span className="text-zinc-500 block font-medium uppercase tracking-wider text-[10px]">Contest Rating</span>
                  <span className="text-white font-bold text-sm mt-0.5 block">{activeLcStats.contestRating || 1480}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-medium uppercase tracking-wider text-[10px]">Global Rank</span>
                  <span className="text-white font-bold text-sm mt-0.5 block">
                    {loading ? "..." : activeLcStats.ranking.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* HackerRank Card */}
          <div
            onMouseMove={(e) => handleMouseMove(e, "tilt")}
            onMouseLeave={(e) => handleMouseLeave(e, "tilt")}
            className="tilt-card bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 border border-zinc-800/80 p-6 rounded-2xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)] shadow-xl reveal reveal-delay-150 flex flex-col justify-between"
          >
            <div className="tilt-content">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-green-400">HackerRank</span>
                <a
                  href={`https://www.hackerrank.com/profile/${staticData.hackerrank.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-green-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.003 21.196L2.348 15.62V4.469L12.003 1.13l9.65 3.34v11.15l-9.65 5.576zm-7.652-6.73l7.652 4.417 7.656-4.42V6.26l-7.656-2.651L4.35 6.26v8.206zM8.146 11.23a.625.625 0 0 1 .624-.625h6.46a.625.625 0 0 1 .625.625v1.25a.625.625 0 0 1-.625.625h-6.46a.625.625 0 0 1-.624-.625v-1.25z" />
                  </svg>
                </a>
              </div>

              <h4 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">Earned Badges</h4>
              {/* Badges Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {staticData.hackerrank.badges.map((badge) => (
                  <div
                    key={badge.name}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-900/50 border border-zinc-800/80 group/badge hover:bg-zinc-800/50 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-zinc-300 text-center truncate w-full group-hover/badge:text-white transition-colors">
                      {badge.name}
                    </span>
                    <span className="text-[11px] font-semibold mt-1" style={{ color: badge.color }}>
                      {"★".repeat(badge.stars)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Certifications & Streaks */}
              <div className="pt-4 border-t border-zinc-800/60">
                <span className="text-zinc-500 block font-medium uppercase tracking-wider text-[10px] mb-2">Verified Certifications</span>
                {staticData.hackerrank.certifications.map((cert) => (
                  <div key={cert.name} className="flex justify-between items-center text-xs">
                    <span className="text-zinc-200 font-medium">{cert.name}</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold text-[10px] tracking-wider uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GeeksforGeeks Card */}
          <div
            onMouseMove={(e) => handleMouseMove(e, "tilt")}
            onMouseLeave={(e) => handleMouseLeave(e, "tilt")}
            className="tilt-card bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 border border-zinc-800/80 p-6 rounded-2xl transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(134,189,34,0.06)] shadow-xl reveal reveal-delay-200 flex flex-col justify-between"
          >
            <div className="tilt-content">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">GeeksforGeeks</span>
                <a
                  href={`https://www.geeksforgeeks.org/profile/${staticData.geeksforgeeks.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-emerald-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.79 14.59L6.5 12.88l1.41-1.41 2.3 2.3 5.3-5.3 1.41 1.41-6.71 6.71z" />
                  </svg>
                </a>
              </div>

              {/* Big GFG Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80">
                  <span className="text-zinc-500 block text-[9px] font-bold uppercase tracking-wider">Coding Score</span>
                  <span className="text-2xl font-bold font-display text-white mt-1 block">
                    {staticData.geeksforgeeks.codingScore}
                  </span>
                </div>
                <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80">
                  <span className="text-zinc-500 block text-[9px] font-bold uppercase tracking-wider">Problems Solved</span>
                  <span className="text-2xl font-bold font-display text-emerald-400 mt-1 block">
                    {staticData.geeksforgeeks.problemsSolved}
                  </span>
                </div>
              </div>

              {/* GFG Rank / Breakdown */}
              <div className="pt-4 border-t border-zinc-800/60 text-xs space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-medium">LPU Institute Rank</span>
                  <span className="text-white font-bold">#{staticData.geeksforgeeks.instituteRank}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                  <span>Basic: {staticData.geeksforgeeks.distribution.basic}</span>
                  <span>Easy: {staticData.geeksforgeeks.distribution.easy}</span>
                  <span>Med: {staticData.geeksforgeeks.distribution.medium}</span>
                  <span>Hard: {staticData.geeksforgeeks.distribution.hard}</span>
                </div>
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-20">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Aggregated Activity Heatmap</h3>
              <p className="text-xs text-zinc-500 mt-1">Consolidated view of commits/submissions across platforms.</p>
            </div>

            {/* Filters */}
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
          </div>

          {/* Heatmap Grid Wrapper (Horizontal scrolling on mobile) */}
          <div className="relative z-10 overflow-x-auto pb-4 scrollbar-thin select-none">
            <div className="min-w-[760px] flex flex-col">
              {/* Months Headers Row */}
              <div className="flex mb-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-6">
                {weeks.map((week, index) => {
                  const labelItem = monthLabels.find((l) => l.weekIndex === index);
                  return (
                    <div key={index} className="w-[13px] text-center" style={{ marginRight: "3.5px" }}>
                      {labelItem ? labelItem.label : ""}
                    </div>
                  );
                })}
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
                  {weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3.5px]">
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
                  ))}
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
