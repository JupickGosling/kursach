import axios from 'axios'
const url = "/com"

export default class COM {
    static async addCom(id,comment){
        const res = await axios.post(`${url}/${id}`,comment);
        return res.data;
    }
    static async getAllComment(){
        const res = await axios.get(`${url}/all`);
        return res.data;
    }
    static async getComByID(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
}