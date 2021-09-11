const express = require("express")
const fs = require("fs")
const { isFileExist, getFuzzyPath } = require("./utils")

const app = express();
const PORT = 8000;
const MOCK_PREFIX = "/mock/"
const MOCK_PREFIX_LEN = MOCK_PREFIX.length;
const MOCK_DATA_DIR = "./mockData/";
const RESP_DELAY = 0

const FUZZY_PATH = getFuzzyPath(MOCK_DATA_DIR, MOCK_PREFIX);

app.all("/*", (req, resp, next) => {
    console.log(req.method, "url:", req.url)
    next();
})
app.get("/", (req, resp) => resp.send("hello world"))

app.all(MOCK_PREFIX + "*", (req, resp) => {
    let uri = req.url.replace(/(.*)\?.*/, "$1");
    let dirPath = MOCK_DATA_DIR + uri.substr(MOCK_PREFIX_LEN);
    let method = req.method;
    isFileExist(dirPath).then(() => {
        sendFileByMethod(dirPath, method, resp);
    }).catch(err => {
        let fuzzyDir = FUZZY_PATH.find(e => {
            return e.reg.test(uri);
        })
        if (fuzzyDir) {
            // console.log(fuzzyDir);
            sendFileByMethod(fuzzyDir.dir, method, resp);
        } else {
            resp.sendStatus(404)
        }
    })
})

function sendFileByMethod(dirPath, method, resp) {
    let filePath = `${dirPath}/${method}.json`
    isFileExist(filePath).then(() => {
        console.log(filePath)
        setTimeout(() => {
            sendFile(filePath, resp);
        }, RESP_DELAY);
    }).catch(err => {
        resp.sendStatus(404)
    })
}
function sendFile(filePath, resp) {
    let json = require("." + filePath); // TODO seems strange...
    resp.send(json);
}


app.listen(PORT, () => console.log("server started on port: " + PORT))
