import express from 'express';
import apiV1Router from './routers/v1';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', async (req, res) => {
  res.json({message: 'Hello World FROM THE WEBWATCH SERVER'});
});

app.use('/api/v1', apiV1Router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});