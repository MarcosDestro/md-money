import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary () {
    // Sempre que o contexto mudar, este componente será renderizado novamente
    const { transactions } = useTransactions();

    const summary = transactions.reduce(( acc, transaction ) => {
        // Se deposito
        if(transaction.type == 'deposit'){
            acc.deposits += transaction.amount; // soma os depositos
            acc.total += transaction.amount; // soma no total
        } else {
            acc.withdraws -= transaction.amount; // subtrai as saídas
            acc.total -= transaction.amount; // subtrai no total
        }

        return acc; // Todo reduce precisa de um retorno
    }, {
        // Valores iniciais do reduce
        deposits: 0,
        withdraws: 0,
        total: 0
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    { new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits) }
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>
                    { new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws) }
                </strong>
            </div>

            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    { new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total) }
                </strong>
            </div>
        </Container>
    );
}