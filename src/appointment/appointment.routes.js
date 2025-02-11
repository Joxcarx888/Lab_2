import { Router } from "express";
import { check } from "express-validator";
import { SaveAppointment,deleteAppointment,getAppointments, searchAppointment, updateAppointment } from "./appointment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jw.js";
import { existeCitaById } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('id', 'El ID de la mascota es obligatorio').not().isEmpty(),
        validarCampos
    ],
    SaveAppointment
);

router.get("/", getAppointments);

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeCitaById),
        validarCampos
    ],
    searchAppointment
);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeCitaById),
        validarCampos
    ],
    deleteAppointment
);

router.put(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeCitaById),
        validarCampos
    ],
    updateAppointment
);

export default router;