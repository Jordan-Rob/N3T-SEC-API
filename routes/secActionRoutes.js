const express = require("express")
const router =  express.Router()
const { pwd, ifconfig, whoami } = require('../controllers/secActionController')

router.get("/status", pwd )

router.get("/net", ifconfig )

router.get("/system-user", whoami )


module.exports = router