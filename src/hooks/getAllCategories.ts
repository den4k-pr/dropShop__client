


export async function getAllCategories() {
    const res = await fetch("https://dropshopserver-production-5156.up.railway.app/api/categories/category", { cache: 'no-store' });

    if(!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return res.json();
}
