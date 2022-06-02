import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { GlobalStyle } from './styles/global'
import Modal from 'react-modal';
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';

// Inidicando qual elemento deve estar o modal (Questão de acessibilidade)
Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] = useState(false);

  /** As funções e o estado não acompanham o componente, pois dificultaria
   *  a passagem das funções e do estado para o componente botão, ou usar
   *  a função de contexto, então é mais fácil usar o componente pai
   */
  function handleOpenNewTransactionModal() {
    setIsNewTransactionsModalOpen(true);
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionsModalOpen(false);
  }
  
  return (
    <>
      <Header 
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
      />
      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionsModalOpen}
        onRequestClose={handleCloseNewTransactionModal}/>
      
      <GlobalStyle />
    </>
  )
}

