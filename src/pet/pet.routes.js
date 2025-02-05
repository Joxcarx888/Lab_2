import { Router } from "express";
import { check } from "express-validator";
import { SavePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jw.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es un correo valido').not().isEmpty(),
        validarCampos
    ],
    SavePet
)

export default router;


