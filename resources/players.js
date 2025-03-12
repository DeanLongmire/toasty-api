import express from "express";
import { getPlayer } from "../controllers/players.js";

const router = express.Router();
router.use(express.json());

router.get('/:id', getPlayer);

export default router;