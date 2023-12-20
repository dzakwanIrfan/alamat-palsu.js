const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadAddress, findAddress, addAddress, cekDuplikat } = require('./utils/address');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// konfigurasi flash
app.unsubscribe(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    layout: 'layouts/main',
    msg: req.flash('msg'),
  });
});

// halaman form tambah data address
app.get('/address/add', (req, res) => {
  res.render('add-address', {
    judul: 'Add Address Data',
    layout: 'layouts/main',
  });
});

// proses data address
app.post(
  '/address',
  body('name').custom((value) => {
    const duplikat = cekDuplikat(value);
    if(duplikat){
      throw new Error('Name is already registered!');
    }
    return true;
  }), 
  check('email', 'Invalid email value').isEmail(), 
  check('phone', 'Invalid phone number value').isMobilePhone('id-ID'),
  // body('phone').isMobilePhone('id-ID'),
  (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    // return res.status(400).json({errors: errors.array()});
    res.render('add-address', {
      judul: 'Add Addresse Data',
      layout: 'layouts/main',
      errors: errors.array(),
    })
  }else{
    req.flash('msg', 'Address data added successfully!')
    addAddress(req.body);
    res.redirect('/address');
  }
});

// halaman detail address
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
  console.log(`Example app listening on port ${port} http://localhost:3000/`);
});

