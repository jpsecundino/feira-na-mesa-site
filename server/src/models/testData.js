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
    unitOfMeasure: 'Maço',
    price: 3.00,
    photo: 'usr/photos/chicoria.jpg',
    thisWeek: true,
  });
  
  db.Product.create({ 
    name: "Berinjela",
    unitOfMeasure: 'Unidade',
    price: 4.50,
    photo: 'usr/photos/berinjela.jpg',
    description: 'Uma deliciosa berinjela, que tem ótimas propriedades nutritivas',
    thisWeek: true,
  });

  db.User.create({
    cpf: '48068865712',
    firstName: "João Vitor",
    lastName: "Silva Ramos",
    email: "joaoramosj@usp.br",
    adress: 'Fernandópolis',
    phoneNumber1: '(19) 97343-2312',
  });

  db.User.create({
    cpf: '49067975624',
    firstName: "Vitor",
    lastName: "Santana Cordeiro",
    email: "vitorsan@usp.br",
    adress: 'Taboão da Serra',
    phoneNumber1: '(11) 99473-8372',
  });

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> All test data successfully created! <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
};