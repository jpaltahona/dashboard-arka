import axios from "axios";
import { settings } from "./settings";

const SupportsService = {
    async getAll(){
        try {
            const response = await axios.get(`${settings.url}/meetings/me`);
            return await response.data;
        } catch (error) {
            return null
        }
    },
    
}

export default SupportsService;