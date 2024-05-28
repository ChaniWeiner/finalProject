import express from "express";
 import cors from "cors"
import { userRouter } from "./routers/userRouter.js";
// import { postRouter } from "./routers/postRouter.js";
// // import { todoRouter } from "./routers/todoRouter.js";
// // import { commentRouter } from "./routers/commentRouter.js";
 import { logErrors } from "./middleware/logErrors.js"
// // import { passwordRouter } from "./routers/passwordRouter.js";
// // import { regRouter } from "./routers/registrationRouter.js"

const app = express()
 app.use(cors());
 app.use(express.json());
 app.use('/user', userRouter);
// app.use('/post', postRouter);
// app.use('/todo', todoRouter);
// app.use('/password', passwordRouter);
// app.use('/comment', commentRouter);
 //app.use('/', regRouter);
 app.use(logErrors);

app.listen(8082, () => {
    console.log("start server port: 8082");
})