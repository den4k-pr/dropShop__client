import axios from 'axios';

export async function getProductsLength({ category, slug }: { category: string, slug: string }) {
    try {
        const response = await axios.get(`http://localhost:4200/api/${category}/by-slug/${slug}`, {
            headers: { 'Cache-Control': 'no-store' }
        });

        if (!response.data || !response.data.products) {
            throw new Error("Failed to fetch data");
        }

        return response.data.products.length;
    } catch (error) {
        throw new Error("Failed to get length");
    }
}

export async function getProductsByCategory({ category, slug, page, perPage }: { category: string, slug: string, page: number, perPage: number }) {
    try {
        const response = await axios.get(`http://localhost:4200/api/${category}/${slug}/products?page=${page}&perPage=${perPage}`, {
            headers: { 'Cache-Control': 'no-store' }
        });

        return response.data;
    } catch (error) {
        throw new Error("Failed to get category for filter");
    }
}


