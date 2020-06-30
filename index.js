const express = require('express');
const postcss = require('postcss');
const cssvariables = require('postcss-css-variables');

const app = express();

app.get('/ping', (req, res) => {
  try {
    var output = postcss([cssvariables(/*options*/)]).process(`
    body {
      background-color: var(--color-primary);
    }

    .component {
      background-color: calc(var(--color-primary) * .2);
    }

    :root {
      --color-primary: #ddd
    }
    `).css;
    res.contentType('text/css');
    res.send(output);
  } catch (e) {
    res.status(500);
    res.send(JSON.stringify({ error: e }));
  }
});

app.listen(3000, () => console.info('Listening!'));
