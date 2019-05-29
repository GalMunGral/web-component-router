const express = require('express');

app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
