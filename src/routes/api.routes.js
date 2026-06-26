import express from "express"
import pocaoController from "../controllers/pocao.controller.js"
import authController from "../controllers/auth.controller.js"

const router = express.Router()

router.post('/pocoes', authController.validadeAdmin)
router.delete('/pocoes/:id', authController.validadeAdmin)

router.post("/signup", authController.register)
router.post("/signin", authController.login)

router.get("/pocoes", pocaoController.findAll)
router.post("/pocoes", pocaoController.create)
router.delete("/pocoes/:id", pocaoController.deleteByPk)


export default router
