import express from "express";
import requestController from "../controllers/requestController.js";


const requestRouter = express.Router();

const requests = new requestController();
requestRouter.get("/",requests.getAllRequests)
requestRouter.get("/:id",requests.getUserById)
requestRouter.put("/:id", requests.updateUser)

export {
    requestRouter
}