import { RegistrationService } from "../service/registrationService.js";

export default class RegistrationController {

    async login(req, res, next) {
        try {
            const regService = new RegistrationService();
            let result = await regService.login(req.body);
            if (result.user.length == 0) {
                throw("user does not exsit")
            }
            return res.json({ data: { user: result.userId, token: result.token } });
        } catch (ex) {
            const err = {};
            err.status = 500;
            err.message = ex.message; 
            next(err);
        }
    }

    async register(req, res, next) {
        try {
            const service = new RegistrationService();
            const result = await service.addUser(req.body);
            return res.json({ user: result.user, token: result.token });
        } catch (ex) {
            const err = {};
            err.status = 500;
            err.message = ex.message; 
            next(err);
        }
    }
}
