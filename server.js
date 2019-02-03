const express = require('express');
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist', 'index.html'));
});

app.listen(port, () => console.log(`listening on port ${port}`));
