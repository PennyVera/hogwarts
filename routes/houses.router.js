import express from "express";
import * as housesController from "../controllers/houses.controller.js";

export const housesRouter = express.Router();
// Get all houses R
housesRouter.get("/", housesController.getAllHouses);
// Get specific house R
housesRouter.get("/:id", housesController.getSingleHouse);
