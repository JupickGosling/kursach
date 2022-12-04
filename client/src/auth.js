import axios from 'axios'
const url = "/user"

export default class AUTH {
    static async getAllUsers(){
        const res = await axios.get(`${url}/all`);
        return res.data;
    }
    static async createUser(user){
        const res = await axios.post(`${url}/register`,user);
        return res.data;
    }
    static async fetchUser(email,password){
        const res = await axios.get(`${url}/login/${email}/${password}`);
        return res.data;
    }
}