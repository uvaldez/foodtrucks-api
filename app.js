import express from 'express';
import cors from 'cors';
import fetch from "node-fetch";
import { isNumber } from './utils/index.js';

const app = express();
const PORT = 8080;
app.use(cors());

app.listen(
  PORT,
  () => console.log(`Application running at port: ${PORT}`),
);

const foodTrucksDataUrl = 'https://data.sfgov.org/api/id/rqzj-sfat.json';
app.get('/food-trucks', async (req, res) => {
  const { limit = 100, offset = 1 } = req.query;
  if (!isNumber(parseInt(limit, 10)) || !isNumber(parseInt(offset, 10))) {
    res.status(400).send({
      message: 'Invalid Request',
    });
  }
  try {
    const params = new URLSearchParams({
      $query: `select *, :id offset ${offset} limit ${limit}`,
    });

    const response = await fetch(`${foodTrucksDataUrl}?${params}`);
    const data = await response.json();
    res.status(200).send(data);
  } catch(e){
    res.status(500).send(e.message);
  }
});

app.get('/food-trucks/:id', async (req, res) => {
  const { id } = req.params;
  const params = new URLSearchParams({
    $query: `select *, :id where (\`objectid\` = ${id})`,
  });
  try {
    const response = await fetch(`${foodTrucksDataUrl}?${params}`);
    const data = await response.json();
    if (!data || !data.length) {
      res.status(404).send({
        message: `Food truck id ${id} not found`,
      });
    }
    res.status(200).send(data[0]);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
