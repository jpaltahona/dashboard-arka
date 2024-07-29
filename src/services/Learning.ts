import axios from "axios";
import { settings } from "./settings";


const LearnigService = {
    async getAll(){
        try {
            const response = await axios.get(`${settings.url}/academy`);
            return response.data;
        } catch (error) {
            return null
        }
    },
    async saveCourse(obj:any){
        try {
            const response = await axios.post(`${settings.url}/academy/create`, obj );
            return response.data
        } catch (error) {
            return error
        }
    },
    async deleteCourse(id:string){
        try {
            const response = axios.delete(`${settings.url}/academy/${id}`)
            return response
        } catch (error) {
            return error
        }
    },
    async getCourse(id:string){
        try {
            const response = await axios.get(`${settings.url}/academy/${id}`);
            return response.data;
        } catch (error) {
            return null
        }
    },
}

export default LearnigService;