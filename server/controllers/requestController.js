import { RequestService } from "../service/requestService.js";

export default class requestController {
    async getAllRequests(req, res, next) {
        try {
            const service = new RequestService();
            const data = await service.getByParameter(req);
            return res.json(data);  
        } catch (ex) {
            console.error('Error in getAllRequests:', ex);
            const err = {};
            err.statusCode = 500;
            err.message = ex.message || 'Internal Server Error';
            next(err);
        }
    }

    async getUserById(req, res, next) {
        try {
            const service = new RequestService();
            const data = await service.getById(req.params.id);
            return res.json(data);  
        } catch (ex) {
            console.error('Error in getUserById:', ex);
            const err = {};
            err.statusCode = 500;
            err.message = ex.message || 'Internal Server Error';
            next(err);
        }
    }

    async updateRequest(req, res, next) {
        try {
            const service = new RequestService();
            await service.update(req.body, req.params.id);
            res.status(200).json({ message: `Request with id: ${req.params.id} updated successfully` }); // Send response as JSON
        } catch (ex) {
            console.error('Error in updateRequest:', ex);
            const err = {};
            err.statusCode = 500;
            err.message = ex.message || 'Internal Server Error';
            next(err);
        }
    }
    

    async postRequest(req, res, next) {
        try {
            const service = new RequestService();
            const { requests, meals, babysitter, cleaning, shopping, support } = req.body;
            console.log('Request body:', req.body);

            // הוספת בקשה חדשה
            const requestItem = {
                requestType: requests.requestType,
                requestStatus: "המתנה", // דוגמה לסטטוס התחלה, ניתן לשנות לפי הצורך
                userId: requests.userId
            };
            const requestResult = await service.addReq(requestItem);
            console.log('Request result:', requestResult);

            // קבלת ה-requestId מהבקשה שנוצרה
            const requestId = requestResult.insertId;
            console.log('New request ID:', requestId);

            // הוספת הבקשה לפי סוג הבקשה
            let resultMessage = "Request added successfully";
            switch (requests.requestType) {
                case "ארוחה":
                    const mealItem = {
                        requestId,
                        amountMeals: meals.amountMeals,
                        mealType: meals.mealType
                    };
                    await service.addMeal(mealItem);
                    resultMessage += " and meal added successfully";
                    break;
                case "בייביסיטר":
                    const babysitterItem = {
                        requestId,
                        numberOfChildren: babysitter.numberOfChildren,
                        babysittingHours: babysitter.babysittingHours
                    };
                    await service.addBabysitter(babysitterItem);
                    resultMessage += " and babysitting added successfully";
                    break;
                case "נקיון":
                    const cleaningItem = {
                        requestId,
                        cleaningHours: cleaning.cleaningHours,
                        cleaningDay: cleaning.cleaningDay
                    };
                    await service.addCleaning(cleaningItem);
                    resultMessage += " and cleaning added successfully";
                    break;
                case "קניות":
                    const shoppingItem = {
                        requestId,
                        shoppingList: shopping.shoppingList
                    };
                    await service.addShopping(shoppingItem);
                    resultMessage += " and shopping added successfully";
                    break;
                case "אוזן קשבת":
                    const supportItem = {
                        requestId,
                        supportCall: support.supportCall
                    };
                    await service.addSupport(supportItem);
                    resultMessage += " and support call added successfully";
                    break;
                default:
                    throw new Error('Unsupported request type');
            }

            // החזרת תגובה עם תוצאות ההוספה
            res.status(201).json({
                message: resultMessage,
                requestId
            });
        } catch (ex) {
            console.error('Error in postRequest:', ex);
            const err = {};
            err.statusCode = 500;
            err.message = ex.message || 'Internal Server Error';
            next(err);
        }
    }
}
