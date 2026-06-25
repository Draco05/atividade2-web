import express from "express"
import pocaoController from "../controllers/pocao.controller.js"
import authController from "../controllers/auth.controller.js"

const router = express.Router()

router.all("/admin", authController.validadeAdmin)
// pelo visto esse eh o jeito mais comum de fazer uma pagina admin segura
router.get("/admin", (request, response)=>{
    response.sendFile(path.join(__dirname, 'private', 'admin.html'))
})

router.post("/signup", authController.register)
router.post("/signin", authController.login)

router.get("/pocoes", pocaoController.findAll)
router.post("/pocoes", pocaoController.create)
router.delete("/pocoes/:id", pocaoController.deleteByPk)


export default router
