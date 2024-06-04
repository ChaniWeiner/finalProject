import 'dotenv/config'
import { executeQuery } from './query.js'
import {  getByIdQuery, updateQuery,deleteQuery } from './allQuery.js';

export class PaswwordService {

    async getByuserId(id) {
        const query = getByIdQuery("passwords");
        const result = await executeQuery(query, [id]);
        return result;
    }
    
    async delete(id) {
        const query = deleteQuery("passwords");
        const result = await executeQuery(query, [id]);
        return result;
    }
    async update(item,id, type) {
        let stringToQuery = "";
        Object.keys(item).forEach(key => { (key != "userId") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(item);
        values.push(id);
        const query = updateQuery("passwords",stringToQuery,type || "userId");
        const result = await executeQuery(query, values)
        return result;
    }
}