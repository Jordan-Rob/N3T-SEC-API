const express = require("express")
const router =  express.Router()
const { runOrKillSnort, snortAlerts, ifconfig, whoami } = require('../controllers/secActionController')
const protect = require('../middleware/authMiddleware')

router.post("/status", protect, runOrKillSnort )

router.get("/alerts", protect, snortAlerts)

router.get("/net", ifconfig )

router.get("/system-user", whoami )


module.exports = router