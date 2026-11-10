import express from "express";
import * as controller from "../controllers/houses.controller.js";

export const router = express.Router();
// Get all houses R
router.get("/", controller.getAllHouses);
// Get specific house R
router.get("/:id", controller.getSingleHouse);
