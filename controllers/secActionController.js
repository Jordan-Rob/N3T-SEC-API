// use async handler if you do not want to write try-catch code/ or promise chains 
const asyncHandler = require('express-async-handler')
const cp = require('child_process')
const Log = require('../models/logModel')



// @desc Get system pwd
// @route GET /api/sec-actions
// @access Public
const pwd = asyncHandler( async (req, res) => {
    
    const cmd = 'pwd'

    cp.exec(cmd, async (err, stdout, stderr) => {
        console.log('#1, exec')
        console.log(stdout)

        const newLog = await Log.create({
            cmd: cmd,
            output: `${stdout}`
        })

        res.status(200).json({log: newLog})
    })
})

// @desc Get system ifconfig
// @route GET /api/sec-actions
// @access Public
const ifconfig = asyncHandler( async (req, res) => {
    
    let msg 
    const cmd = 'ifconfig'

    cp.exec(cmd, (err, stdout, stderr) => {
        console.log('#1, exec')
        console.log(stdout)
        msg = stdout
        res.json({message:`${msg}`})
    })
})

// @desc Get system user
// @route GET /api/sec-actions
// @access Public
const whoami = asyncHandler( async (req, res) => {
    
    let msg 

    cp.exec('whoami', (err, stdout, stderr) => {
        console.log('#1, exec')
        console.log(stdout)
        msg = stdout
        res.json({message:`${msg}`})
    })
})

module.exports = {
    pwd,
    ifconfig,
    whoami
}