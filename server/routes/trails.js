import { Router } from "express";
import TrailsController from "../controllers/trailsController.js";

Router.length('/',TrailsController.getAllTrails);