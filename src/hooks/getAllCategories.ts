import axios from 'axios';

export async function getAllCategories() {
    try {
        const response = await axios.get("http://localhost:4200/api/categories/category", { 
            headers: { 'Cache-Control': 'no-store' } 
        });

        return response.data;
    } catch (error) {
        throw new Error("Failed to get categories");
    }
}
