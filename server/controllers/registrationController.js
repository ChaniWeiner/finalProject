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
            console.log(req.body);

            await service.addUser(req.body[0]);
            console.log(req.body[0].userId);
            console.log(req.body[1].password);
            let pswd = { userId: req.body[0].userId, password: req.body[1].password };
            let user = req.body[0];
            await service.addPassword(pswd);

            return res.status(201).json({ user: user, token: token });
        } catch (ex) {
            const err = {};
            err.status = 500;
            err.message = ex.message; // תיקון הודעת השגיאה
            next(err);
        }
    }
}
