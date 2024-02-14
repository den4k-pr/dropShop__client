import axios from "axios";

export async function getData() {

    try{
        const res = await axios.get(`http://localhost:4200/api/users`, { 
            headers: { 'Cache-Control': 'no-store' }  
        });

        return res.data;
    }catch(error) {
        throw new Error("Failed to get users")
    }
}