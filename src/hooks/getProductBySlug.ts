import axios from 'axios';

export async function getProductBySlug(slug: string) {
    try {
        const response = await axios.get(`http://localhost:4200/api/products/by-slug/${slug}`, {
            headers: { 'Cache-Control': 'no-store' }
        });

        return response.data;
    } catch (error) {
        throw new Error("Failed to get slug");
    }
}
