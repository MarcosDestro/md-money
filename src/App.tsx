import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { GlobalStyle } from './styles/global'
import Modal from 'react-modal';
import { useState } from 'react';

// Inidicando qual elemento deve estar o modal (Questão de acessibilidade)
Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] = useState(false);

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
      <Modal
        isOpen={isNewTransactionsModalOpen} //Condição do modal
        onRequestClose={handleCloseNewTransactionModal} // Oque executar se usuário fechar
      >
        <h2>Cadastrar Transação</h2>
      </Modal>
      <GlobalStyle />
    </>
  )
}

