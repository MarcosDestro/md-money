import React from 'react'
import ReactDOM from 'react-dom/client'
import { createServer, Model } from 'miragejs'
import { App } from './App'

// Criando um sevidor (api) fake
createServer({
  // Banco fake
  models:{
    transaction: Model
  },

  // Iniciando aluguns dados na api
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de web Site',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-05-28 9:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-05-14 11:00:00')
        }
      ]
    })
  },
  
  // Rotas fakes
  routes() {
    // Cria um namespace anterios à rota
    this.namespace = 'api'

    // Tras todas as transações
    this.get('/transactions', ()=>{
      return this.schema.all('transaction')
    })

    // Rota de criação de uma nova entrada
    this.post('/transactions', (schema, request)=>{
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
