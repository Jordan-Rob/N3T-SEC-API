const express = require("express")
const router =  express.Router()
const { pwd, snortAlerts, ifconfig, whoami } = require('../controllers/secActionController')

router.get("/status", pwd )

router.get("/alerts", snortAlerts)

router.get("/net", ifconfig )

router.get("/system-user", whoami )


module.exports = router