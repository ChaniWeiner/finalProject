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

    async updateUser(req, res,next) {
        try {
            const service = new RequestService();
            await service.update(req.body,req.params.id);
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