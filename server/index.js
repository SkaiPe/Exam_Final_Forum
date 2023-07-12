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

app.get('/posts', async (req, res) => {
  try {
    const { sortDate } = req.query;
    const sortDateType = sortDate === 'asc' ? 1 : -1;

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
      .sort({ dateCreated: sortDateType })

      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/posts/:id', async (req, res) => {
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

app.post('/posts', async (req, res) => {
  try {
    const { dateCreated, text, edited, userId, title, nickname } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('posts')
      .insertOne({
        dateCreated,
        title,
        text,
        edited,
        usersId: new ObjectId(userId),
        nickname,
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

app.get('/posts/:id/answers', async (req, res) => {
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

app.post('/posts/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      dateCreated,
      text,
      edited,
      userId,
      nickname,
      likeCounter,
      userLikes,
    } = req.body;

    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('comments')
      .insertOne({
        dateCreated,
        text,
        edited,
        nickname,
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

// Delete Question

app.delete('/posts/:id', async (req, res) => {
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

app.patch('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, edited, dateCreated } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('posts')
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
