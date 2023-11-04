

export async function getAllProducts() {
    const res = await fetch(`https://dropshopserver-production-5156.up.railway.app/api/products`, { cache: 'no-store' });

    if(!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return res.json();
}