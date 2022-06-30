const express = require("express")
const asyncHandler = require("express-async-handler")
const cp = require('child_process')
const router =  express.Router()

router.get("/status", asyncHandler( async (req, res) => {
    
    let msg 

    cp.exec('pwd', (err, stdout, stderr) => {
        console.log('#1, exec')
        console.log(stdout)
        msg = stdout
        res.json({message:`${msg}`})
    })
}))

router.get("/net", asyncHandler( async (req, res) => {
    
    let msg 

    cp.exec('ifconfig', (err, stdout, stderr) => {
        console.log('#1, exec')
        console.log(stdout)
        msg = stdout
        res.json({message:`${msg}`})
    })
}))

router.get("/system-user", asyncHandler( async (req, res) => {
    
    let msg 

    cp.exec('whoami', (err, stdout, stderr) => {
        console.log('#1, exec')
        console.log(stdout)
        msg = stdout
        res.json({message:`${msg}`})
    })
}))

module.exports = router