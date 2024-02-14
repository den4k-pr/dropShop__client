import axios from 'axios';

export async function getAllProducts() {

    try{
        const response = await axios.get(`http://localhost:4200/api/products`, { 
            headers: { 'Cache-Control': 'no-store' } 
        });
        return response.data;
    }
    catch (error)  {
        throw new Error("Failed to get all products")
    }
}