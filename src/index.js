import express from 'express';

const app = express();

const PROT = process.env.PROT || 3000;

app.listen(PROT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      ---
      Server runing in prot: ${PROT}
      ---
      Runing on ${process.env.NODE_ENV}
      ---
    `);
  }
});
