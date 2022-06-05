import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

// Sempre que vetor ou objeto devemos informar o formato
interface TransactionProps {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>
// type TransactionInput = Pick<TransactionProps, 'title' | 'amount' | 'type' | 'category'>

interface TransactionsProviderProps {
    children: ReactNode; // Aceita qualquer tag válida para o react
}

// Qual o formato que o nosso contexto terá
interface TransactionsContextData {
    transactions: TransactionProps[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

// O Contexto inicia com o seu valor padrão, forçando que ele tem o formato anterior
const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );


// Hook de provider
export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  

    //Função disparada ao carregar o componente:
    useEffect(()=>{
        // Chamada para rota fake
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions));
    }, [])

    // Cria uma nova transação
    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput, // Copia os dados vindo do modal
            createdAt: new Date() // Insere o dado faltante
        })
        const { transaction } = response.data;

        // Copia a state, e insere o novo dado da resposta
        setTransactions([
            ...transactions,
            transaction,
        ])
    }

    return(
        /**
         * No value se passa um valor atual, ou seja, se tiver uma consulta acima,
         * aqui deve ser preenchido, dentro de uma state.
         */
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            { children }
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    return context;
}