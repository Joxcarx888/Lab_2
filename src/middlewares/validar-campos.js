import { validationResult } from "express-validator";

export const validarCampos = (req,res,next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.statis(400).json(errors);
    }

    next();
}