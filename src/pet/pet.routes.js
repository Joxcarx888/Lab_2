import { Router } from "express";
import { check } from "express-validator";
import { getPets, SavePet, searchPet, deletePet, updatePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jw.js";
import { existeMascotaById } from "../helpers/db-validator.js";

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

router.get("/", getPets)

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "No es un Id Valido").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ],
    searchPet
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un Id Valido").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ],
    deletePet
)

router.put(
    "/:id",
    [
        check("id", "No es uun ID valido").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ],
    updatePet
)

export default router;


