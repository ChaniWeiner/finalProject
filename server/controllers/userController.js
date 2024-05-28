import { UserService } from "../service/userService.js";
export default class UsersController {
    async getAllUser(req, res, next) {
        try {
            const service = new UserService();
            const data = await service.getAll();
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
            const service = new UserService();
            await service.update(req.body,'address',req.params.id);
            res.status(200).end(`user with id: ${req.params.id} updated succefuly`);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}