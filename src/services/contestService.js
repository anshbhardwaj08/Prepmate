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
    const later = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const params = new URLSearchParams({
        start__gte: now,
        start__lte: later,
        order_by:   "start",
        limit:      "100",
        format:     "json",
    });

    const res = await fetch(`/api/contests?${params}`); // no trailing slash

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const json = await res.json();
    const contests = json.objects ?? [];

    return contests
        .filter((c) => getPlatformName(c.host))
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