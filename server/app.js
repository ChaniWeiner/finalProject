import express from "express";
import cors from "cors";
import { userRouter } from "./routers/userRouter.js";
import { logErrors } from "./middleware/logErrors.js";
import { passwordRouter } from "./routers/passwordRouter.js";
import { resetPasswordRouter } from "./routers/resetPasswordRouter.js";
import { regRouter } from "./routers/registrationRouter.js";
import { requestRouter } from "./routers/requestsRouter.js";
// import auth from "./middleware/auth.js"; // ייבוא בצורה נכונה


const app = express();
app.use(cors());
app.use(express.json());
app.use('/', regRouter);
app.use('/resetPassword', resetPasswordRouter);
// app.use(auth.verifyToken); // שימוש ב-verifyToken מתוך האובייקט
app.use('/user', userRouter);
app.use('/requests', requestRouter);
app.use('/password', passwordRouter);
app.use(logErrors);

export default app;
