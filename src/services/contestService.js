const USERNAME = import.meta.env.VITE_CLIST_USERNAME;
const API_KEY  = import.meta.env.VITE_CLIST_API_KEY;

// Map clist.by resource hosts → friendly platform names
const PLATFORM_MAP = {
    "codeforces.com":    "Codeforces",
    "leetcode.com":      "LeetCode",
    "codechef.com":      "CodeChef",
    "atcoder.jp":        "AtCoder",
    "hackerearth.com":   "HackerEarth",
    "hackerrank.com":    "HackerRank",
    "topcoder.com":      "TopCoder",
    "geeksforgeeks.org": "GFG",
};

const getPlatformName = (host = "") => {
    const key = Object.keys(PLATFORM_MAP).find((k) => host.includes(k));
    return key ? PLATFORM_MAP[key] : null;
};

const getContests = async () => {
    const now   = new Date().toISOString();
    const later = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // next 30 days

    const params = new URLSearchParams({
        username:          USERNAME,
        api_key:           API_KEY,
        start__gte:        now,       // only upcoming
        start__lte:        later,     // within 30 days
        order_by:          "start",
        limit:             "100",
        format:            "json",
    });

    const res = await fetch(`/api/contests/?${params}`);

    if (!res.ok) throw new Error(`clist.by error: ${res.status}`);

    const json = await res.json();
    const contests = json.objects ?? [];

    // Normalize shape to match ContestCard expectations
    return contests
        .filter((c) => getPlatformName(c.host)) // only known platforms
        .map((c) => ({
            name:       c.event,
            site:       c.host,
            url:        c.href,
            start_time: c.start,
            end_time:   c.end,
            duration:   c.duration,
        }));
};

export default { getContests };