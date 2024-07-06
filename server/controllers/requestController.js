import { RequestService } from "../service/requestService.js";

export default class requestController {
    async getAllRequests(req, res, next) {
        try {
            const service = new RequestService();
            console.log("jnj",req.params.type);
            const data = await service.getByParameter(req,req.params.type);
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
            console.log(req.body[1].email) ;
            await service.update(req.body[0], req.params.id,req.body[1].email);
       
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
            const requestService = new RequestService();
            const requestResult = await requestService.addRequest(req.body);
            console.log('Request result:', requestResult);

            res.json({
                message: requestResult
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
