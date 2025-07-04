import prismaClient from 'db';
import express from 'express';

const app = express();
const port = 3001;

app.get('/', async (req, res) => {
  const websites = await prismaClient.websites.findMany();
  res.json({websites});
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});