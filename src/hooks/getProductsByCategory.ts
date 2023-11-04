


export async function getProductsLength({ category, slug }: { category: string, slug: string }) {
    const res = await fetch(`https://dropshopserver-production-5156.up.railway.app/api/${category}/by-slug/${slug}`, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    const data = await res.json();
    const length = data.products.length;

    return length;
}



export async function getProductsByCategory({category, slug, page, perPage} : {category: string, slug: string, page: number, perPage: number}) {
    const res = await fetch(`https://dropshopserver-production-5156.up.railway.app/api/${category}/${slug}/products?page=${page}&perPage=${perPage}`, { cache: 'no-store' });

    if(!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return res.json();
}

// пердун пердуненко дініс яковенкитммрпмморап
