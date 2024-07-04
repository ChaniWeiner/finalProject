import 'dotenv/config';
import { executeQuery } from './query.js';
import { getByIdQuery, updateQuery, deleteQuery, getJoinTablesQuery, getJoinTwoTablesQuery, getByParameterQuery } from './allQuery.js';
import { sendRatingEmail } from './email.js';
import { UserService } from './userService.js';
import { json } from 'express';
export class RequestService {

    async getById(id) {
        try {
            const query = getByIdQuery("users");
            const result = await executeQuery(query, [id]);
            return result;
        } catch (ex) {
            console.error('Error in getById:', ex);
            throw ex;
        }
    }

    async getByParameter(user,type) {
        try {
            let query, conditionsParams = [], conditionsValues = [];
            const queryParams = user.query;
            if (Object.entries(queryParams).length === 0) {
            console.log("type :",type);
                // query = getJoinTablesQuery("meals", "proposalrequests", "users");
             query = getJoinTablesQuery(type, "proposalrequests", "users");
                
                // query = getJoinTablesQuery("shopping", "proposalrequests", "users");
                //query = getJoinTablesQuery("support", "proposalrequests", "users");
            } else {
                Object.keys(queryParams).forEach((key) => {
                    conditionsParams.push(`${key} = ?`);
                    conditionsValues.push(queryParams[key]);
                });
                query = getByParameterQuery("users", conditionsParams.join(" AND "));
            }
            const result = await executeQuery(query, conditionsValues);
            return result;
        } catch (ex) {
            console.error('Error in getByParameter:', ex);
            throw ex;
        }
    }

    async update(item, id, type) {
        try {
            const service = new UserService();
            const data = await service.getById(item.volunteerId);
            console.log("Update item:", item);
            let stringToQuery = "";
            Object.keys(item).forEach(key => {
                if (key !== "requestId") {
                    stringToQuery += `${key}=?,`;
                }
            });
            stringToQuery = stringToQuery.slice(0, -1);
            let values = Object.values(item);
            values.push(id);
            const query = updateQuery("proposalrequests", stringToQuery, type || "requestId");
            const result = await executeQuery(query, values);
            console.log("Update result:", result);
            console.log(data[0]);
            sendRatingEmail(data[0].email);
            return { message: `Request with id: ${id} updated successfully` }; // Return as JSON object
        } catch (ex) {
            console.error('Error in update:', ex);
            throw ex;
        }
    }
    async addRequest(body) {
        const { requests, meals, babysitter, cleaning, shopping, support } = body;
        let resultMessage = "Request added successfully";
        const requestItem = {
            requestType: requests.requestType,
            requestStatus: "המתנה",
            userId: requests.userId
        };
      let requestResult= await  this.addReq(requestItem);
      const requestId = requestResult.insertId;
        switch (requests.requestType) {
            case "ארוחה":
                const mealItem = {
                    requestId,
                    amountMeals: meals.amountMeals,
                    mealType: meals.mealType
                };
                await this.addMeal(mealItem);
                resultMessage += " and meal added successfully";
                break;
            case "בייביסיטר":
                const babysitterItem = {
                    requestId,
                    numberOfChildren: babysitter.numberOfChildren,
                    babysittingHours: babysitter.babysittingHours
                };
                await this.addBabysitter(babysitterItem);
                resultMessage += " and babysitting added successfully";
                break;
            case "נקיון":
                const cleaningItem = {
                    requestId,
                    cleaningHours: cleaning.cleaningHours,
                    cleaningDay: cleaning.cleaningDay
                };
                await this.addCleaning(cleaningItem);
                resultMessage += " and cleaning added successfully";
                break;
            case "קניות":
                const shoppingItem = {
                    requestId,
                    shoppingList: shopping.shoppingList
                };
                await this.addShopping(shoppingItem);
                resultMessage += " and shopping added successfully";
                break;
            case "אוזן קשבת":
                const supportItem = {
                    requestId,
                    supportCall: support.supportCall
                };
                await this.addSupport(supportItem);
                resultMessage += " and support call added successfully";
                break;
            default:
                throw new Error('Unsupported request type');
        }
return resultMessage
    }

    async addReq(item) {
        try {
            console.log('Adding request:', item);
            const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.proposalrequests (requestType, requestStatus, userId) VALUES (?,?,?)`, [item.requestType, item.requestStatus, item.userId]);
            console.log('Add request result:', result);
            return result;
        } catch (ex) {
            console.error('Error in addReq:', ex);
            throw ex;
        }
    }

    async addMeal(item) {
        try {
            console.log('Adding meal:', item);
            const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.meals (requestId, amountMeals, mealType) VALUES (?, ?, ?)`, [item.requestId, item.amountMeals, item.mealType]);
            console.log('Add meal result:', result);
            return result;
        } catch (ex) {
            console.error('Error in addMeal:', ex);
            throw ex;
        }
    }

    async addBabysitter(item) {
        try {
            console.log('Adding babysitter:', item);
            const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.babysitter (requestId, numberOfChildren, babysittingHours) VALUES (?, ?, ?)`, [item.requestId, item.numberOfChildren, item.babysittingHours]);
            console.log('Add babysitter result:', result);
            return result;
        } catch (ex) {
            console.error('Error in addBabysitter:', ex);
            throw ex;
        }
    }

    async addCleaning(item) {
        try {
            console.log('Adding cleaning:', item);
            const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.cleaning (requestId, cleaningHours, cleaningDay) VALUES (?, ?, ?)`, [item.requestId, item.cleaningHours, item.cleaningDay]);
            console.log('Add cleaning result:', result);
            return result;
        } catch (ex) {
            console.error('Error in addCleaning:', ex);
            throw ex;
        }
    }

    async addShopping(item) {
        try {
            console.log('Adding shopping:', item);
            const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.shopping (requestId, shoppingList) VALUES (?, ?)`, [item.requestId, item.shoppingList]);
            console.log('Add shopping result:', result);
            return result;
        } catch (ex) {
            console.error('Error in addShopping:', ex);
            throw ex;
        }
    }

    async addSupport(item) {
        try {
            console.log('Adding support:', item);
            const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.support (requestId, supportCall) VALUES (?, ?)`, [item.requestId, item.supportCall]);
            console.log('Add support result:', result);
            return result;
        } catch (ex) {
            console.error('Error in addSupport:', ex);
            throw ex;
        }
    }
}
