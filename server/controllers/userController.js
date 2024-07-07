import { UserService } from "../service/userService.js";
import userValidationSchema from "../validition/userValid.js";

export default class UsersController {
    async getAllUser(req, res, next) {
        try {
            const service = new UserService();
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
            const service = new UserService();
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

    async updateUser(req, res,next) {
        try {
            const { error } = userValidationSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const service = new UserService();
            await service.update(req.body, req.params.id);
            res.json(`user with id: ${req.params.id} updated successfully`);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
