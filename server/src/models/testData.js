/**
 * The goal of this file is to prevent Git's annoying 
 * version control issues with MySQL binary files.
 * As a temporary solution, we will create all the records
 * of our database ONLY via code. 
 * This will allow a much cleaner and safer use of Git.
 */

module.exports.createTestData = (db) => {

  db.Product.create({ 
    name: "Chicória",
    price: 3.00,
    photo: 'usr/photos/chicoria.jpg',
    thisWeek: true,
  });
  
  db.Product.create({ 
    name: "Berinjela",
    price: 4.50,
    photo: 'usr/photos/berinjela.jpg',
    description: 'Uma deliciosa berinjela, que tem ótimas propriedades nutritivas',
    thisWeek: true,
  });

  db.User.create({ 
    name: "João Ramos",
    email: "joaoramosj@usp.br",
    adress: 'Fernandópolis',
    phone: '(19) 97343-2312',
  });

  db.User.create({ 
    name: "Vitor Santana",
    email: "vitorsan@usp.br",
    adress: 'Taboão da Serra',
    phone: '(11) 93578-2379',
  });

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> All test data successfully created! <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
};