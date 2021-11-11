import express from 'express';
import scrape from './handlers/scrape.js';
import handleFiles from './handlers/handleFiles.js';
import { __dirname } from '../dirname.js'

const app = express();
app.use(express.static('client/build'));
app.use(express.json());

app.post('/scrape', scrape, handleFiles, (req, res) => {
  res.send(req.results);
})

app.get('*', (req, res) => {
  res.sendFile(__dirname, '/client/build/index.html');
})

app.use((err, req, res, next) => {
  const errObj = {
    status: err.status,
    message: err.message
  }
  
  res.json(errObj);
}) 


app.listen(9000, () => console.log('Server running...'));