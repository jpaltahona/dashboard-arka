import axios from "axios";
import { settings } from "./settings";

const UsersService = {
    async getAll(){
        try {
            const response =await axios(`${settings.url}/user`);
            return await response.data.data;
        } catch (error) {
            return null
        }
    },
    async findByRole(role:string){
        try {
            const response = await axios(`${settings.url}/user/find/${role}`, {
                method: 'GET',
            });
            return response.data;
        } catch (error) {
            return error
        }
    },
}

export default UsersService;