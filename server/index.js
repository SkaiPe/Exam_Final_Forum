const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const client = new MongoClient(URI);

const app = express();
app.use(express.json());
app.use(cors());

// Login

app.post('/login', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').findOne(user);

    let loggedIn = false;
    let userData = null;
    console.log(req.body);
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

// Get and Post Users

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

// Get and Post Questions/Posts

app.get('/question', async (req, res) => {
  try {
    const { filterDate } = req.query;
    const sortDateType = filterDate === 'asc' ? 1 : -1;

    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('posts')
      .aggregate([
        {
          $lookup: {
            from: 'comments', // kitos kolekcijos pavadinimas
            localField: '_id', // owners kolekcijos raktas per kurį susijungia
            foreignField: 'postId', // kitos kolekcijos raktas per kurį susijungia
            as: 'comments', // naujo rakto pavadinimas
          },
        },
        {
          $addFields: {
            commentCount: { $size: '$comments' }, // Add a new field 'commentCount' to each post document
          },
        },
      ])
      .sort({ date: sortDateType })

      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/question/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('posts')
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'comments', // kitos kolekcijos pavadinimas
            localField: '_id', // owners kolekcijos raktas per kurį susijungia
            foreignField: 'postId', // kitos kolekcijos raktas per kurį susijungia
            as: 'comments', // naujo rakto pavadinimas
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

app.post('/question', async (req, res) => {
  try {
    const { date, text, edited, name } = req.body;
    const con = await client.connect();
    const data = await con.db(dbName).collection('posts').insertOne({
      date,
      text,
      edited,
      name,
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get and Post Answers/Comments

app.get('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .findOne({ _id: new ObjectId(id) });

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/question/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .find({ postId: new ObjectId(id) })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/question/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, text, edited, name } = req.body;

    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .insertOne({
        date,
        text,
        edited,
        name,
        postId: new ObjectId(id),
      });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete Question

app.delete('/question/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('posts')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete comment/answer

app.delete('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update posts/questions

app.patch('/question/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, edited } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('posts')
      .updateOne({ _id: new ObjectId(id) }, { $set: { text, edited } });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update comment/answer

app.patch('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, edited, dateCreated } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
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
app.patch('/answers/:id/likes', async (req, res) => {
  try {
    const { id } = req.params;
    const { likeCounter, userLikes } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { likeCounter, userLikes } },
      );
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
