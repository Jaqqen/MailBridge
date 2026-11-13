import type {Request, Response} from 'express';

import express from 'express';
import {body, Result, validationResult} from "express-validator";
import {loginNameHintField} from "./msauthRouterField.ts";
import {Path} from "./msauthRouterPaths.ts";


const router: express.Router = express.Router();
const routeView:string = 'msauth';
const formFields = {
    loginNameHintField,
}

let emailsHtml:string = "";

router.get(Path.relativeEntry,(req, res, next)=> {
    res.render(routeView, {...formFields, emailsHtml})
});

router.post(Path.relativeEntry,
    [
        body(formFields.loginNameHintField).isEmail()
            .normalizeEmail()
            .withMessage("Must be a valid email address")
    ],
    (req: Request, res: Response) => {
    const errResult:Result = validationResult(req);
    const emailLoginName = req.body[formFields.loginNameHintField];
    if (!errResult.isEmpty()) {
        return res.status(400).json(
            {errors: errResult.array(), input: emailLoginName })
    }

    emailsHtml += `<li>${emailLoginName}</li>`;
    res.redirect(Path.fullRoot)
});

export default router;
