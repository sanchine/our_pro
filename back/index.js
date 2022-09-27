
// WASSUP

const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors');
const { DataBase } = require('./src/DataBase');
const { UserBase } = require('./src/UserBase');
app.use(cors());

const ub = new UserBase();
ub.loadData();

const db = new DataBase();
db.loadData();

app.get('/api/auth/:number', (req, res) => {
    console.log('api/auth : Finding Started!');

    if (ub.findNumber(req.params.number)) res.status(200);
    else res.status(403);

    res.send();
});

app.use(express.json());
app.get('/api/posts', (req, res) => {
    res.set('Content-Type', 'application/json');
    const json = JSON.stringify(db.posts);
    res.send(json);
});

app.post('/api/add', (req, res) => {
    const data = req.body;

    if (ub.findNumber(data.number)) {
        const name = ub.getNickname(data.number);
        const post = {
            id: `${db.count + 1}`,
            nickname: name,
            number: data.number,
            text: data.text
        };
        db.setData(post);
        console.log('api/add : Post was added!');
        res.status(200);
        db.saveData();
        res.send();
    } else {
        res.status(404);
        res.send();
    }
});

app.post('/api/del', (req, res) => {
    const data = req.body;

    console.log('api/del : Post was deleted!');
    db.removeData(data);
    res.status(200);
    db.saveData();
    res.send();
});

app.post('/228/add', (rq, rs) => {
    const data = rq.body;
    ub.setData(data);
    ub.saveData();
    console.log('228/add : User was added!');
    rs.status(200);
    rs.send();
});

app.post('/228/del', (rq, rs) => {
    const data = rq.body;
    ub.removeData(data);
    ub.saveData();
    console.log('228/del : User was deleted!');
    rs.status(200);
    rs.send();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
  

// IT IS ALL