import 'dotenv/config';

import {userSchema} from '../validition/registrationValidation.js'
import { executeQuery } from './query.js';
import { getAllQuery, getByIdQuery, updateQuery, getByParameterQuery } from './allQuery.js';

export class UserService {

    async getById(id) {
        const query = getByIdQuery("users");
        const result = await executeQuery(query, [id]);
        return result;
    }

    async getByParameter(user) {
        let query, conditionsParams = [], conditionsValues = [];
        const queryParams = user.query;
        if (Object.entries(queryParams).length === 0) {
            query = getAllQuery("users");
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

    async update(item, id, type) {
      
        const { error } = userSchema.validate(item);
        if (error) {
            throw new Error(error.details[0].message);
        }

        let stringToQuery = "";
        Object.keys(item).forEach(key => { (key != "userId") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(item);
        values.push(id);
        const query = updateQuery("users", stringToQuery, type || "userId");
        await executeQuery(query, values);
        return { message: `user with id: ${id} updated successfully` };
    }

}
