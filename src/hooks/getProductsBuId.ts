import axios from 'axios';

export async function getProductsById(id: string) {
    try {
        const response = await axios.get(`http://localhost:4200/api/subCategories/${id}`, {
            headers: { 'Cache-Control': 'no-store' }
        });

        return response.data;
    } catch (error) {
        throw new Error("Failed to get id");
    }
}
