import {Router} from "express";
import handlerController from "../controller/handlerController.js";

const router = Router()

router.post("/olt/check-sn", handlerController.regexOnuSn);
router.post("/olt/serial-numbers", handlerController.regexSn);
router.post("/olt/attenuation", handlerController.RegexRedaman);

export default router