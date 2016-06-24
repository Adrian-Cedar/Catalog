var path = __dirname;
var PORT = process.env.PORT || 3000
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var serverOps = require(path + "/serverOps.js");

app.use("/", router);
app.use(express.static(path + '/static'));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(path + '/static/views/index.html');
    console.log()
});

app.get("/input", function (req, res) {
    res.sendFile(path + '/static/views/input.html');
});

app.post("/new", function (req, res) {
    serverOps.parse(req.body[0], req.body[1], function(response){
        return res.json(response);
    });
});

app.post("/edit", function (req, res) {
    serverOps.parse(req.body[0], req.body[1], function(response){
        return res.json(response);
    });
})

app.post("/delete", function (req, res) {
    console.log(req.body[0]);
    serverOps.delEntry(req.body[0], function (result) {
        return res.json(result);
    });
});

app.get("/getData", function (req, res) {
    serverOps.getData(function (result) {
        return res.json(result);
    });
});

app.listen(PORT, function () {
    console.log("Live at Port 3000");
});
