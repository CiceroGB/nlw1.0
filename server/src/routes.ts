import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({ msg: 'oi' });
});

export default routes;
