import axios from "axios";
import { settings } from "./settings";


const PricesService = {
    async getAll(){
        try {
            const response = await axios.get(`${settings.url}/prices`);
            return response.data;
        } catch (error) {
            return null
        }
    },
    async create(obj:any){
        try {
            const response = await axios.post(`${settings.url}/prices/create`, obj );
            return response.data
        } catch (error) {
            return error
        }
    },
    async findOnePrice(id:string){
        try {
            const response = axios.get(`${settings.url}/prices/${id}`)
            return response
        } catch (error) {
            return error
        }
    },
    async deletePrice(id:string){
        try {
            const response = axios.delete(`${settings.url}/prices/${id}`)
            return response
        } catch (error) {
            return error
        }
    }
}

export default PricesService;