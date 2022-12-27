const express = require('express');
const app = express();
const port = 3001;

const db = require("./database/db");

app.use(express.static("public"));
app.use(express.urlencoded({ extended : true }));

const nunjucks = require('nunjucks');

nunjucks.configure("src/views", {
   express : app,
   noCache : true,
});


app.get('/', (req, res) => {
   return res.render('index.html');
});

app.get('/create-point', (req, res) => {

  return res.render('create-point.html');
});

app.post('/savepoint', (req, res) => {

  const query = `  
  INSERT INTO places (
    name,
    image,
    adress,
    adress2,
    state,
    city,
    items
   ) VALUES(?,?,?,?,?,?,?);
   `
  const values = [
    req.body.name, 
    req.body.image, 
    req.body.adress,
    req.body.adress2, 
    req.body.state, 
    req.body.city, 
    req.body.items
  ];

  db.run(query, values, function(err){
   if(err){
     return console.log(err);
  }
   console.log("Cadastrado com sucesso!");
   console.log(this);
   return res.render("create-point.html", { saved : true});
  });

});

app.get('/search', (req, res) => 
{

  // pega os dados 
  db.all(`SELECT * FROM places`, function(err, rows){
    if(err){
       console.log(err);
      return res.send("Erro no cadastro");
    }
    const total = rows.length;
    return res.render('search-results.html', { places : rows, total : total })
  });
});


app.listen(port, () => {
  console.log(`💅 Server listening on port ${port}`);
});