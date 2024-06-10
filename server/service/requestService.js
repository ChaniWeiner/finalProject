import 'dotenv/config'
import { executeQuery } from './query.js'
import {  getByIdQuery, updateQuery,deleteQuery,getJoinTablesQuery,getJoinTwoTablesQuery } from './allQuery.js';
export class RequestService {

    async getById(id) {
        const query = getByIdQuery("users");
        const result = await executeQuery(query, [id]);
        return result;
    }
    async getByParameter(user) {
        let query, conditionsParams = [], conditionsValues = [];
        const queryParams = user.query;
        if (Object.entries(queryParams).length === 0) {
            query = getJoinTablesQuery("meals","proposalrequests","users");
        } else {
            Object.keys(queryParams).forEach((key) => {
                conditionsParams.push(`${key} = ?`);
                conditionsValues.push(queryParams[key]);
            });
            query = getByParameterQuery("users", conditionsParams.join(" AND "));
        }
        const result = await executeQuery(query, conditionsValues);
        return result;
    }

    async update(item, id,type) {
        let stringToQuery = "";
        Object.keys(item).forEach(key => { (key != "requestId") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(item);
        values.push(id);
        const query = updateQuery("proposalrequests",stringToQuery,type || "requestId");
        const result = await executeQuery(query, values)
       
        return result;
    }
    
}