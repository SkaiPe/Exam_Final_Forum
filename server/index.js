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

// ištraukia duomenis (visą kolekciją vartotojų)

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

//  priima naujo vartotojo duomenis ir įrašo juos.

app.post('/users/:id', async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    const { id } = req.params;

    const con = await client.connect();
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { name, lastname, email, password } };
    const data = await con
      .db(dbName)
      .collection('users')
      .updateOne(filter, update);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// atnaujiname vartotojo duomenis.
app.put('/users/:id', async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    const { id } = req.params;
    const con = await client.connect();
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { name, surname, email, password } };
    const data = await con
      .db(dbName)
      .collection('users')
      .updateOne(filter, update);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// pasiekiam klausimus
app.get('/questions', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('questions').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 3. paima ir ištraukia klausimą
app.get('/questions/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .find({ _id: new ObjectId(questionId) })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 4. prideda klausimą
app.post('/addQuestion', async (req, res) => {
  try {
    const { text } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .insertOne({
        text,
        date: new Date().toLocaleDateString(),
        userId: new ObjectId(req.body.userId),
      });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 5.atnaujina klausimą (redaguojame)

app.patch('/questions/:id', async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;
    const con = await client.connect();
    const questionId = { _id: new ObjectId(id) };
    const update = { $set: { text } };
    const data = await con
      .db(dbName)
      .collection('questions')
      .updateOne(questionId, update);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 6.Ištrina klausimą
app.delete('/questions/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const con = await client.connect();
    const result = await con
      .db(dbName)
      .collection('questions')
      .deleteOne({ _id: new ObjectId(questionId) });
    await con.close();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 7. Gaunam atsakymus į klausimą
app.get('/questions/:questionId/answers', async (req, res) => {
  try {
    const { questionId } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .find({ questionId })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
//  gaunam konkretaus atsakymo duomenis
app.get('/answers/:id', async (req, res) => {
  try {
    const answerId = req.params.id;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .find({ _id: new ObjectId(answerId) })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 8. įrašom atsakymą pagal klausimo id

app.post('/questions/:questionId/answer', async (req, res) => {
  try {
    const { questionId } = req.params;
    const { text } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .insertOne({
        text,
        date: new Date().toLocaleDateString(),
        userId: new ObjectId(req.body.userId),
        questionId,
      });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 9. Atnaujina atsakymo duomenis
app.patch('/answers/:id', async (req, res) => {
  try {
    const { text, startingDate } = req.body;
    const { id } = req.params;
    const con = await client.connect();
    const answerId = { _id: new ObjectId(id) };
    const update = { $set: { text, startingDate } };
    const data = await con
      .db(dbName)
      .collection('answers')
      .updateOne(answerId, update);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 10. Ištrimam  konkretų atsakymą
app.delete('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const answerId = { _id: new ObjectId(id) };
    const data = await con.db(dbName).collection('answers').deleteOne(answerId);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 11. Filtruojam klausimus pagal datą arba atsakymų skaičių:

app.get('/questions', async (req, res) => {
  try {
    const { sort, filter } = req.query;
    const con = await client.connect();
    let query = {};
    let sortOptions = {};

    if (filter) {
      // Filtravimas pagal norimus kriterijus
      query = { ...query, ...filter };
    }

    if (sort) {
      // Rikiavimas pagal klausimo datą ir/arba atsakymų skaičių
      const [field, order] = sort.split(':');
      if (field === 'date' || field === 'answersCount') {
        sortOptions = { [field]: order === 'desc' ? -1 : 1 };
      }
    }

    const data = await con
      .db(dbName)
      .collection('questions')
      .find(query)
      .sort(sortOptions)
      .toArray();

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {});
