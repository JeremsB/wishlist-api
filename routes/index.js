const userController = require("../controller/userController");
const presentController = require("../controller/presentController");
const eventController = require("../controller/eventController");
const authMiddleware = require("../middleware/authMiddleware");
module.exports = app => {
    app.get("/others/:current", authMiddleware.authenticateToken(), userController.getOtherUsers)
    app.get("/user/:id", authMiddleware.authenticateToken(), userController.getUserById)
    app.post("/auth/login", userController.login)

    app.get("/presents/user/:id", authMiddleware.authenticateToken(), presentController.getPresentsByUser)
    app.get("/present/:id", authMiddleware.authenticateToken(), presentController.getPresentById)
    app.get("/present/self/:id", authMiddleware.authenticateToken(), presentController.getSelfPresentById)
    app.post("/present", authMiddleware.authenticateToken(), presentController.createPresent)

    app.get("/events", authMiddleware.authenticateToken(), eventController.getActiveEvents)
    /*app.get("/game/category/:id", gameController.getAllGamesByCategory)
    app.get("/game/console/:id", gameController.getAllGamesByConsole)


    app.post("/game", gameController.createGame)
    app.put("/game/:id", gameController.updateGame)*/
    //app.delete("/game/:id", gameController.deleteGame)

    //app.get("/console", consoleController.getAllConsoles)
    //app.get("/console/brand/:id", consoleController.getAllConsolesByBrand)
    //app.get("/console/:id", consoleController.getConsoleById)
    /*app.post("/console", consoleController.createConsole)
    app.put("/console/:id", consoleController.updateConsole)
    app.delete("/console/:id", consoleController.deleteConsole)*/

    //app.get("/category", categoryController.getAllCategories)
    //app.get("/category/:id", categoryController.getCategoryById)
    /*app.post("/category", categoryController.createCategory)
    app.put("/category/:id", categoryController.updateCategory)
    app.delete("/category/:id", categoryController.deleteCategory)*/
}
