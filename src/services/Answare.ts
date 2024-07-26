import axios from "axios";
import { settings } from "./settings";

const AnswareService = {
    async getAll(){
        try {
            const response = await axios.get(`${settings.url}/answer`);
            return await response.data;
        } catch (error) {
            return null
        }
    },
    async create(data:any){
        try {
            const response = await axios.post(`${settings.url}/answer/create`, data);
            return await response.data;
        } catch (error) {
            return null
        }
    }
}

export default AnswareService;