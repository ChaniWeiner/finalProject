import express from "express";
 import cors from "cors"
import { userRouter } from "./routers/userRouter.js";
 import { logErrors } from "./middleware/logErrors.js"
 import { passwordRouter } from "./routers/passwordRouter.js";
 import { regRouter } from "./routers/registrationRouter.js"

const app = express()
 app.use(cors());
 app.use(express.json());
 app.use('/user', userRouter);
 app.use('/password', passwordRouter);
 app.use('/', regRouter);
 app.use(logErrors);

app.listen(8082, () => {
    console.log("start server port: 8082");
})