/**
 * The goal of this file is to prevent Git's annoying 
 * version control issues with MySQL binary files.
 * As a temporary solution, we will create all the records
 * of our database ONLY via code. 
 * This will allow a much cleaner and safer use of Git.
 */

module.exports.createTestData = (db) => {

  /* ================= PRODUCTS ================= */
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

  /* ================= USERS ================= */
  db.User.create({
    cpf: '48068865712',
    firstName: "João Vitor",
    lastName: "Silva Ramos",
    email: "joaoramosj@usp.br",
    phoneNumber1: '(19) 97343-2312',
  });

  db.User.create({
    cpf: '49067975624',
    firstName: "Vitor",
    lastName: "Santana Cordeiro",
    email: "vitorsan@usp.br",
    phoneNumber1: '(11) 99473-8372',
  });

  /* ================= PRODUCERS ================= */
  db.Producer.create({
    cpf: '44455533312',
    cnpj: '44455533312121',
    firstName: "Divino",
    lastName: "Teixeira de Oliveira",
    history: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet enim sit amet purus convallis cursus. Nam eleifend, dui sed congue vestibulum, mi diam imperdiet nisi, a malesuada nunc justo ut nibh. Duis tempus mauris elit, et pellentesque felis euismod quis. Suspendisse malesuada convallis suscipit. Aliquam erat volutpat. Nullam consequat est vitae felis tempus, nec efficitur eros iaculis. Morbi a justo quis velit tempus tempus eget sit amet sem. Vivamus fermentum tempus commodo. Nulla vel est sollicitudin, facilisis turpis non, vulputate lacus. Vestibulum eu nunc eget arcu aliquam efficitur. Duis vestibulum, elit sed sollicitudin sodales, lectus ante mollis nulla, vestibulum vestibulum ante risus tristique nisl. Nullam maximus elit et sapien tincidunt convallis. Aliquam interdum molestie sem quis vulputate. Integer semper imperdiet purus, ac tincidunt purus faucibus vel. Ut in bibendum risus. Cras velit sapien, consequat non cursus eu, dictum id turpis. Donec sed gravida massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam suscipit purus sit amet mauris volutpat, at hendrerit nisi sodales. Sed vestibulum maximus arcu, sed congue ex vestibulum imperdiet. In hac habitasse platea dictumst. Duis rutrum lorem nec cursus euismod. Mauris metus lacus, commodo at cursus ac, congue eget eros. Sed sit amet semper justo. Proin sit amet ligula sed purus venenatis commodo nec at purus. In porttitor ornare velit id tempus.',
    phoneNumber1: '(16) 97546-2312',
  });

  db.Producer.create({
    cpf: '66677799910',
    firstName: "Andreia",
    lastName: "Lima da Silva",
    email: "andreia.santahel@gmail.com",
    phoneNumber1: '(16) 99832-8390',
    phoneNumber2: '(16) 94342-9847',
  });

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> All test data successfully created! <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
};