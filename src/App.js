import { useState } from "react";

function App() {
  const [calc, setCalc] = useState(""); // Armazena a expressão de cálculo atual
  const [result, setResult] = useState(""); // Armazena o resultado da expressão

  // Função para dizer qual valor dos operadores selecionados é igual
  const ops = ["/", "*", "+", "-", "."];

  // Função para atualizar a expressão de cálculo
  const updateCalc = (value) => {
    // Um IF para limitar as possíveis operações na calculadora, prevenindo o usuário de adicionar diversos operadores repetidos
    if (
      // Se o último valor é um operator e o cálculo não tem nada
      (ops.includes(value) && calc === "") ||
      // Ou o valor é um operador e o último valor também é um operador
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);
    // Se o último item não era um operador, calcula o resultado parcial
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  // Criando uma função para automatizar os botões de digítos para assim não ter que criar manualmente um botão de 1 à 9
  const createDigits = () => {
    // Criando um Array de digitos aonde serão armazenados os elementos array
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        // Chama a função updateCalc com o dígito correspondente como argumento
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  // Função para calcular e atualizar a expressão com o resultado
  const calculate = () => {
    setCalc(result);
  };

  // Função para apagar o último caractere da expressão
  const deleteLast = () => {
    if (calc == "") {
      return;
    } else {
      const value = calc.slice(0, -1);

      setCalc(value);
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ""} {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>

          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
