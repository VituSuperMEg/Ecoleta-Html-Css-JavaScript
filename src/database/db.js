const sqlite3 = require('sqlite3').verbose();

// criar o objeto 
const db = new sqlite3.Database('./src/database/database.db');


module.exports = db
db.serialize(() => {
  //Criar uma tabela 
//  db.run(`
//    CREATE TABLE IF NOT EXISTS places (
//      id INTEGER PRIMARY KEY AUTOINCREMENT,
//      name Text,
//      image TEXT,
//      adress TEXT,
//      adress2 TEXT,
//      state TEXT,
//      city TEXT,
//      items TEXT
//    );
//  `)

  // Inserir dados na tableLayout: 
  // const query = `  
  // INSERT INTO places (
  // name,
  //  image,
  //  address,
  //  address2,
  //  state,
  //  city,
  //  items
  // ) VALUES(?,?,?,?,?,?,?);
 //  `
      // const values = [
       //"Colector",
       //"https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVjeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
       //"Rua Joel Passos, Centro",
      // "Número 822",
      // "Ceára",
      // "Cedro",
       //"Papéis e papelão"
  //]
  //db.run(query, values, function(err){
  // if(err){
  //   return console.log(err);
  //}
  // console.log("Cadastrado com sucesso!")
  // console.log(this)
  //});
  // Consultar os dados

  // db.all(`SELECT * FROM places`, function(err, rows){
  //  if(err){
  //    return console.log(err);
  //  }
  //  console.log("Aqui esta seus registros");
  //  console.log(rows)
  // })

  // Deletar
  db.run(`DELETE FROM places WHERE id =  ?`, [15], function(err){
    if(err){
   return console.log(err);
  }
  console.log("Deletado");
  });
})