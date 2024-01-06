import { Router } from "express";
import { body } from "express-validator";

import { authCreateUser, authLoadCheck, authResetPassword, authDeleteAccount, authLogin } from "../controllers";
import { checkTokenPage } from "../middlerwares";

const authRouter: Router = Router();

authRouter
    .get("/",
        checkTokenPage,
        authLoadCheck    
    );

authRouter
    .post("/",
        body("username")
            .trim()
            .notEmpty()
            .isLength({
                max: 16,
                min: 4
            }),
        body("password")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        authCreateUser
    );

authRouter
    .post("/resetpassword",
        body("oldPassword")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        body("newPassword")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        checkTokenPage,
        authResetPassword
    );
 
authRouter
    .post("/deleteaccount",
        body("password")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        checkTokenPage,
        authDeleteAccount	
    );

authRouter
    .post("/login",
        body("username")
            .trim()
            .notEmpty()
            .isLength({
                min: 4,
                max: 16
            }),
        body("password")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        checkTokenPage,
        authLogin
    );

export default authRouter;
