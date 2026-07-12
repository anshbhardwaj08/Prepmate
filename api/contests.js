export default async function handler(req, res) {
  const params = new URLSearchParams(req.query);

  const response = await fetch(
    `https://clist.by/api/v4/contest/?${params}`,
    {
      headers: {
        "Authorization": `ApiKey ${process.env.VITE_CLIST_USERNAME}:${process.env.VITE_CLIST_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: `clist.by error: ${response.status}` });
  }

  const data = await response.json();
  res.status(200).json(data);
}