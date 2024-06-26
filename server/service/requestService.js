import 'dotenv/config'
import { executeQuery } from './query.js'
import { getByIdQuery, updateQuery, deleteQuery, getJoinTablesQuery, getJoinTwoTablesQuery } from './allQuery.js';
import { sendRatingEmail } from './email.js';

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
            query = getJoinTablesQuery("meals", "proposalrequests", "users");
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
        console.log("item"+item)
        let stringToQuery = "";
        Object.keys(item).forEach(key => { (key != "requestId") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(item);
        values.push(id);
        const query = updateQuery("proposalrequests", stringToQuery, type || "requestId");
        const result = await executeQuery(query, values)
        console.log("i am before email")
        sendRatingEmail("chani03630@gmail.com");
        console.log("i am after email")
        return result;
    }
    async addReq(item) {
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.proposalrequests ( requestType, requestStatus, userId  ) VALUES (?,?,?)`, [item.requestType, item.requestStatus, item.userId]);
        return result;
    }
    async addMeal(item) {
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.meals ( requestId , amountMeals, mealType) VALUES (?, ?, ?)`, [item.requestId, item.amountMeals, item.mealType]);
        return result;
    }

}