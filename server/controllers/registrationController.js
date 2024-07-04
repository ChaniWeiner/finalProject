import auth from "../middleware/auth.js"; // ייבוא אובייקט ברמת ברירת מחדל
import { RegistrationService } from "../service/registrationService.js";

export default class RegistrationController {

    async login(req, res, next) {
        try {
            console.log("I'm here login");
            const regService = new RegistrationService();
            console.log(req.body);
            let result = await regService.login(req.body);
            console.log("result in control:", result);

            if (result.user.length == 0) {
                return res.status(404).json({ status: 404 });
            }

            // הוספת הדפסה של הטוקן כדי לוודא שהוא אכן קיים
            console.log("Generated token:", result.token);

            return res.status(200).json({ status: 200, data: { user: result.userId, token: result.token } });
        } catch (ex) {
            const err = {};
            err.status = 500;
            err.message = ex.message; // תיקון הודעת השגיאה
            next(err);
        }
    }

    async register(req, res, next) {
        try {
            const service = new RegistrationService();
        

         const result=   await service.addUser(req.body);
          

            return res.status(201).json({ user: result.user, token: result.token });
        } catch (ex) {
            const err = {};
            err.status = 500;
            err.message = ex.message; // תיקון הודעת השגיאה
            next(err);
        }
    }
}
