import axios from 'axios'
const url = "/user/register"

export default class AUTH {
    static async createUser(user){
        const res = await axios.post(url,user);
        return res.data;
    }
}