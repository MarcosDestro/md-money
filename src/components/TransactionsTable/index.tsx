import { useEffect } from "react";
import { Container } from "./styles";

export function TransactionsTable() {

  //Função disparada ao carregar o componente:
  useEffect(()=>{
    // Chamada para rota fake
    fetch('http://localhost:3000/api/transactions')
      .then(response => response.json)
      .then(data => console.log(data))
  }, [])
  
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de Website</td>
            <td className="deposit">R$12.000</td>
            <td>Desenvoldimento</td>
            <td>20/02/2021</td>
          </tr>

          <tr>
            <td>Aluguel</td>
            <td className="withdraw">-R$1.1000</td>
            <td>Casa</td>
            <td>17/02/2021</td>
          </tr>
        </tbody>

      </table>
    </Container>
  );
}
