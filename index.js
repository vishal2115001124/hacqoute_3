const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

// Use body parser to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

// let quotes = [];
let currentId = 5;

const quotes =[

    {
        id:1,
        author:'Oscar Wilde',
        text:'To live is the rarest thing in the world. Most people exist, that is all.'
    },
    {
        id:2,
        author:'George Eliot',
        text:'It is never too late to be what you might have been.'
    },
    {
        id:3,
        author:'Ralph Waldo Emerson',
        text:'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.'
    },
    {
        id:4,
        author:'Haruki Murakami',
        text:'Pain is inevitable. Suffering is optional.'
    },
    
]

app.get('/', (req, res) => {
  res.render('allQuotes', { quotes: quotes });
});

app.get('/quotes/new', (req, res) => {
  res.render('addQuote');
});

app.post('/quotes', (req, res) => {
  const quote = {
    id: currentId++,
    author: req.body.author,
    text: req.body.quote
  };
  quotes.push(quote);
  res.redirect('/quotes/' + quote.id);
});

app.get('/quotes/:id', (req, res) => {
  const quoteId = Number(req.params.id);
  const quote = quotes.find(quote => quote.id === quoteId);
  if (!quote) {
    res.status(404).send({ error: 'Quote not found' });
  } else {
    res.render('quote', { quote: quote });
  }
});

app.get('/quotes', (req, res) => {
  res.render('allQuotes', { quotes: quotes });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening on port 3000'));
