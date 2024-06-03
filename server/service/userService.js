import 'dotenv/config'
import { executeQuery } from './query.js'
import { getAllQuery, getByIdQuery, updateQuery, getByParamQuery } from './allQuery.js';

export class UserService {
    // async getAll() {
    //     const query = getAllQuery("users");
    //     const result = await executeQuery(query);
    //     return result;
    // }

    async getById(id) {
        const query = getByIdQuery("users");
        const result = await executeQuery(query, [id]);
        return result;
    }
    async getByParam(user) {
        let query, conditionsParams = [], conditionsValues = [];
        const queryParams = user.query;
        if (Object.entries(queryParams).length === 0) {
            query = getAllQuery("users");
        } else {
            Object.keys(queryParams).forEach((key) => {
                conditionsParams.push(`${key} = ?`);
                conditionsValues.push(queryParams[key]);
            });
            query = getByParamQuery("users", conditionsParams.join(" AND "));
        }
        const result = await executeQuery(query, conditionsValues);
        return result;
    }

    async update(item, type) {
        const query = updateQuery("users", type || "userId");
        const params = [item.userId, item.userName, item.address, item.region, item[type] || item.userId];
        const result = await executeQuery(query, params);
        return result;
    }

}
