export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  if (req.query.secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  try {
    const { type } = req.body;

    if (type === "works") {
      await res.revalidate("/works");
    } else if (type === "bio") {
      await res.revalidate("/bio");
    } else if (type === "/calendar") {
      await res.revalidate("/calendar");
    } else {
      await res.revalidate("/"); // Fallback for homepage
    }

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: `Error revalidating: ${err}` });
  }
}
