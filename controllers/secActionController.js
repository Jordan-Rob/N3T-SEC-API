// use async handler if you do not want to write try-catch code/ or promise chains 
const asyncHandler = require('express-async-handler')
const cp = require('child_process')
const fs = require("fs")
const Log = require('../models/logModel')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken)







// @desc end point to run snort IDS
// @route POST /api/sec-actions
// @access Public
const runOrKillSnort = async (req, res) => {
    
    //const cmd = 'echo root | sudo snort -q -l /var/log/snort -i eth0 -A console -c /etc/snort/snort.conf'

    var snortcp 

    if(req.body.cmd === 'start'){
        snortcp = cp.exec('echo root | sudo snort -q -l /var/log/snort -i eth0 -A full -c /etc/snort/snort.conf', async (stdout, stderr) => {
            console.log('#1, exec')
            /*
            const newLog = await Log.create({
                cmd: cmd,
                output: `${stdout}`
            })
    
            res.status(200).json({log: newLog})
            */
        })
    
    }
        
    snortcp.kill()

    
    
}

/*
// @desc end point to kill snort IDS
// @route GET /api/sec-actions
// @access Public
const killSnort = asyncHandler( async (req, res) => {
    
    snortcp.kil

})

*/

// @desc Get alerts
// @route GET /api/alerts
// @access Public
const snortAlerts = asyncHandler( async (req, res) => {
    
    fs.readFile('/var/log/snort/alert', 'utf-8', (err, data) =>{
        if(err){
            console.log(error)
            res.status(401)
        } else {
            //Check if data has relevant flag then send sms alert
            const checkedPing = data.includes("ICMP Ping")
            console.log(checkedPing)
            if(checkedPing){
                client.messages
                    .create({
                        body: 'N3T-SEC Alert! [Priority 0] ICMP Ping detected',
                        from: '+13253997192',
                        to: '+256787169175'
                    })
                    .then( message => console.log(message.sid))
            }

            const checkedFTP = data.includes("FTP Authentication")
            if(checkedFTP){
                client.messages
                    .create({
                        body: 'N3T-SEC Alert! [Priority 0] FTP Authntication Attempt detected',
                        from: '+13253997192',
                        to: '+256787169175'
                    })
                    .then( message => console.log(message.sid))
            }

            const checkedSMB = data.includes("SMB remote")
            if(checkedSMB){
                client.messages
                    .create({
                        body: 'N3T-SEC Alert! [Priority 1] SMB EternalBlue Remote code execution Attempt detected',
                        from: '+13253997192',
                        to: '+256787169175'
                    })
                    .then( message => console.log(message.sid))
            }

            // Edit data so that each alert is returned as an array item, split by empty line
            const alerts = data.split("\n\n").filter(a => a.trim())
            res.status(200).json({alerts: alerts})
        }
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
    runOrKillSnort,
    snortAlerts,
    ifconfig,
    whoami
}