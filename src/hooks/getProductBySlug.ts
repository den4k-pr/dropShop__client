


export async function getProductBySlug(slug: string) {
    const res = await fetch(`https://dropshopserver-production-5156.up.railway.app/api/products/by-slug/${slug}`, { cache: 'no-store' });

    if(!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return res.json();
}
