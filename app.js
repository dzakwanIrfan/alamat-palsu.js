const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadAddress, findAddress } = require('./utils/address');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.get('/', (req, res) => {
  // res.sendFile('./index.html', {root: __dirname});
  const mahasiswa = [
    {
      nama: 'Malika Azra Permata',
      email: 'malika@gmail.com'
    },
    {
      nama: 'Dzakwan Irfan Ramdhani',
      email: 'dzakwan@gmail.com'
    },
    {
      nama: 'Jeje',
      email: 'jeje@gmail.com'
    }
  ];
  res.render('index', {
    nama: 'Dzakwan Irfan',
    judul: 'Home Page',
    mahasiswa,
    layout: 'layouts/main'
  });
});

app.get('/about', (req, res) => {
  // res.sendFile('./about.html', {root: __dirname});
  res.render('about', {
    judul: 'About Page',
    layout: 'layouts/main'
  });
});

app.get('/address', (req, res) => {
  const addresses = loadAddress();
  
  res.render('address', {
    addresses,
    judul: 'Address Page',
    layout: 'layouts/main'
  });
});

app.get('/address/:name', (req, res) => {
  const address = findAddress(req.params.name);

  res.render('detail', {
    judul: 'Detail Address Page',
    layout: 'layouts/main',
    address,
  });
});

app.use('/', (req, res) => {
    res.status(404)
    res.send("<h1>404 NOT FOUND</h1>");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

