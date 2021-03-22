// var express = require('express');
// var app = express();
// var fs = require("fs");

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
// var dbo;
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   dbo = db.db("Userdb");

// });

// app.get('contacts/add', function (req, res) {
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//     });
// })
// app.get('contacts/getmany', function (req, res) {
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//     });
// })
// app.get('contacts/delete', function (req, res) {
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//     });
// })
// app.get('contacts/update', function (req, res) {
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//     });
// })
// var server = app.listen(3000, function () {
//    var host = server.address().address
//    var port = server.address().port
//    console.log("Example app listening at http://%s:%s", host, port)
// })

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
var app = express()
var url = "mongodb://localhost:27017"
var dbo
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
MongoClient.connect(url, function (err, db) {
    if (err) throw err
    dbo = db.db("Userdb")
})
app.post('/init', function (req, res) {
    var testContacts = [
        {
            id: "1",
            firstname: "potato",
            lastname: "tomato",
            phonenum: "0895126656",
            email: "potato@email.com",
            fb: "null",
            image:
                "https://semantic-ui-vue.github.io/static/images/avatar/large/jenny.jpg",
        },
        {
            id: "2",
            firstname: "Water",
            lastname: "Melon",
            phonenum: "0842135564",
            email: "null@email.com",
            fb: "null",
            image:
                "https://semantic-ui-vue.github.io/static/images/avatar/large/elliot.jpg",
        },
        {
            id: "3",
            firstname: "Honey",
            lastname: "Dew",
            phonenum: "0951234484",
            email: "null@email.com",
            fb: "null",
            image:
                "https://semantic-ui-vue.github.io/static/images/avatar/large/elyse.png",
        },
        {
            id: "4",
            firstname: "Honey",
            lastname: "Dew",
            phonenum: "0951234484",
            email: "null@email.com",
            fb: "null",
            image:
                "https://semantic-ui-vue.github.io/static/images/avatar/large/elyse.png",
        },
        {
            id: "5",
            firstname: "Honey",
            lastname: "Dew",
            phonenum: "0951234484",
            email: "null@email.com",
            fb: "null",
            image:
                "https://semantic-ui-vue.github.io/static/images/avatar/large/elyse.png",
        },
    ]
    dbo.collection('contacts').insertMany(testContacts, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
    })
})
app.get('/contacts/getmany', function (req, res) {
    dbo.collection("contacts").find().sort({ id: 1 }).toArray(function (err, result) {
        if (err) throw err
        console.log(result)
        res.send(JSON.stringify(result))
    })

})
app.post('/contacts/add', function (req, res) {
    console.log(req.body)
    dbo.collection("contacts").insertOne(req.body, function (err, result) {
        if (err) throw err
        console.log(result)
        res.send(JSON.stringify(result))
    })
})
app.put('/contacts/update', function (req, res) {
    console.log('\n\n\n\n\n\n\n\nupdate')
    console.log(req.body)
    var myquery = { _id: ObjectID(req.body._id) };
    console.log(myquery)
    var newvalues = {
        $set: {
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenum: req.body.phonenum,
            email: req.body.email,
            fb: req.body.fb,
            image:
                req.body.image,
        }
    }
    dbo.collection("contacts").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " document(s) updated");
    });
    return res.send(myquery)
});
app.post('/contacts/delete', function (req, res) {
    console.log('/contacts/delete')
    console.log(req.body)
    var myquery = { _id: ObjectID(req.body._id)};
    dbo.collection("contacts").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        return res.send()
    })
});
app.post('/contacts', function (req, res) {
    // var myquery = {  };
    console.log(req.body)
    dbo.collection("user").find(req.body).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application run at http://%s:%s", host, port)
})