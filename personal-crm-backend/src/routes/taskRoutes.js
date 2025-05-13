const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");

router.get("/", controller.getAll);

//create a task for a specific customer
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
