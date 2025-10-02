import TrailsController from "../controllers/trails.js";

router.get('/', TrailsController.getAllTrails);