// Tirar isso depois
const products = [ 
  {id : 1, name:'Mamão', price: 3.80, photo: '//www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwirm-TK7JjnAhVEDrkGHVOTA5QQjRx6BAgBEAQ&url=https%3A%2F%2Fsaude.abril.com.br%2Falimentacao%2Fmamao-uma-fruta-poderosa%2F&psig=AOvVaw0JNSI3tazh_k2457kr7At9&ust=1579838877199989', thisWeek: false },
  {id : 2, name:'Morango', price: 5.00, photo: 'https://http2.mlstatic.com/oleo-essencia-morango-100ml-fruta-puro-essencia-massagem-D_NQ_NP_960102-MLB31202671230_062019-F.jpg', thisWeek: true },
]

module.exports = {
  Query: {
      getProducts: () => products,
      getWeekProducts: () => products[0],
      getUser: () => []
  },

  Mutation: {
      setWeekProducts: () => {},
      addProducts: () => {}
  },
};