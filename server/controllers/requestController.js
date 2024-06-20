import { RequestService } from "../service/requestService.js";

export default class requestController {

    async getAllRequests(req, res, next) {
        try {
            const service = new RequestService();
            const data = await service.getByParameter(req);
            return res.json(data);  
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async getUserById(req, res, next) {
        try {
            const service = new RequestService();
            const data = await service.getById(req.params.id);
            return res.json(data);  
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateRequest(req, res,next) {
        try {
            const service = new RequestService();
            await service.update(req.body,req.params.id);
            res.status(200).end(`request with id: ${req.params.id} updated succefuly`);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async postRequest(req, res, next) {
        try {
            const service = new RequestService();
            const { requests, meals } = req.body;
            console.log(req.body)

            // שליחת בקשה להוספת בקשה
            const requestItem = {
                requestType: requests.requestType,
                requestStatus: "המתנה", // דוגמה לסטטוס התחלה, ניתן לשנות לפי הצורך
                userId: requests.userId,
                //volunteerId: requests.volunteerId // אם ה-volunteerId הוא אופציונלי
            };
            const requestResult = await service.addReq(requestItem);

            // קבלת ה-requestId מהבקשה שנוצרה
            const requestId = requestResult.insertId;

            // שליחת בקשה להוספת הארוחה עם ה-requestId שנוצר
            const mealItem = {
                requestId,
                amountMeals: meals.amountMeals,
                mealType: meals.mealType
            };
            const mealResult = await service.addMeal(mealItem);

            // החזרת תגובה עם תוצאות ההוספה
            res.status(201).json({
                message: "Request and meal added successfully",
                requestId,
                mealId: mealResult.insertId
            });
        } catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }
}
