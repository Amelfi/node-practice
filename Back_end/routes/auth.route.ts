import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { validateLoginField, validateFields } from "../middlewares/fieldValidator";

const router = Router();
router.post('/login',[...validateLoginField, validateFields], login);

export default router;