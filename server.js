const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = 5000;

const fs = require('fs');
const { response } = require('express');

app.get('/api/download', bodyParser.json(), (req, res) => {

    res.download("./temp_data/users.txt");

});

app.post('/api/scrape', bodyParser.json(), (req, res) => {

    const spawn = require("child_process").spawn;
    const scrapeScript = spawn("python", ['./scripts/scrapeMembers.py', req.body.guild_id, req.body.channel_id, req.body.account_email, req.body.account_pass]);

    scrapeScript.on('exit', (code) => {
        console.log(`Finished scraping request on Guild ID (${req.body.guild_id}) (Exit Code: ${code}).`);

        switch(code) {
            case 0:
                res.sendStatus(200);
                break;
            
            case 1:
                res.sendStatus(400);
                break;
        }
    });
    
});

app.post('/api/spam', multer({ storage: multer.memoryStorage() }).single("file"), (req, res) => {

    const user_ids = req.file.buffer.toString('utf8').split('\n').filter(i => i);

    const spawn = require("child_process").spawn;
    const spamScript = spawn("node", ['./scripts/messageUser.js', user_ids, req.body.account_email, req.body.account_pass, req.body.message, req.body.message_num]);
 
    spamScript.stdout.on('data', (data) => {
        console.log(`${data}`);
    })

    spamScript.on('exit', (code) => {
        console.log(`Finished spam request from file (Exit Code: ${code}).`);
        res.sendStatus(200);
    });

});

app.listen(port, () => console.log(`Listening on port ${port}`));