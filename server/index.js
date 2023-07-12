const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();

// kad suprastu json formatą:
app.use(express.json());
// kad veiktu apsas, susijungtu
app.use(cors());

const client = new MongoClient(URI);

// const names = ['Skaika'];

// 2. prisijungimas
app.post('/login', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').findOne(user);

    let loggedIn = false;
    let userData = null;

    if (data) {
      loggedIn = true;
      userData = data;
    } else {
      loggedIn = false;
    }

    await con.close();
    res.send({ loggedIn, userData });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ištraukia duomenis (vartotojų)

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// prideda nauja vartotoja i duomenu baze

app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//  PASIEKIA KLAUSIMUS

app.get('/questions', async (req, res) => {
  try {
    const { sortDate } = req.query;
    const sortDateType = sortDate === 'asc' ? 1 : -1;

    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .aggregate([
        {
          $lookup: {
            from: 'answers', // kitos kolekcijos pavadinimas
            localField: '_id', // user kolekcijos raktas per kurį susijungia
            foreignField: 'questionId', // kitos kolekcijos raktas per kurį susijungia
            as: 'answers', // naujo rakto pavadinimas
          },
        },
        {
          $addFields: {
            answerCount: { $size: '$answers' }, // suskaičiuoja komentarus
          },
        },
      ])
      .sort({ dateCreated: sortDateType }) // rūšiuoja pagal

      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'answers', // kitos kolekcijos pavadinimas
            localField: '_id', // owners kolekcijos raktas per kurį susijungia
            foreignField: 'questionId', // kitos kolekcijos raktas per kurį susijungia
            as: 'answers', // naujo rakto pavadinimas
          },
        },
      ])
      .toArray();

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/questions', async (req, res) => {
  try {
    const { dateCreated, text, edited, userId, title, name } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .insertOne({
        dateCreated,
        title,
        text,
        edited,
        usersId: new ObjectId(userId),
        name,
      });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Pasiekia ir ištraukia atsakymus
app.get('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .findOne({ _id: new ObjectId(id) });

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/questions/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .find({ questionId: new ObjectId(id) })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/questions/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      dateCreated,
      answer,
      edited,
      userId,
      name,
      likeCounter,
      userLikes,
    } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .insertOne({
        dateCreated,
        answer,
        edited,
        name,
        userId: new ObjectId(userId),
        postId: new ObjectId(id),
        likeCounter,
        userLikes,
      });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 5.redaguojam užduotą klausimą  ir matome kad klausimas readaguotas (prisijungusiems)

app.patch('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, edited, dateCreated } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, text, edited, dateCreated } },
      );
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// pasiekiam ir rodom atsakymus
app.get('/answer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .findOne({ _id: new ObjectId(id) });

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/questions/:id/answer', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .find({ postId: new ObjectId(id) })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/questions/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const { dateCreated, text, edited, userId, name, likeCounter, userLikes } =
      req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .insertOne({
        dateCreated,
        text,
        edited,
        name,
        userId: new ObjectId(userId),
        postId: new ObjectId(id),
        likeCounter,
        userLikes,
      });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 5.Ištrina klausimą
app.delete('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 10. Ištrimam  konkretų atsakymą (TIK PRISIJUNGUS)
app.delete('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Redaguojam klausimą
app.patch('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, post, edited, dateCreated } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, post, edited, dateCreated } },
      );
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Redaguojam atsakymą
app.patch('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, edited, dateCreated } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { text, edited, dateCreated } },
      );
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {});
