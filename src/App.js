import React, { useState } from "react";
import "./global.css";
/* 
  Nicolas Oliveira 2020
  O estilo foi feito em grid, possibilitando que a função
  não dependa de ordem e sendo renderizada a partir de um
  array => arrayNumbers e arrayOperators.
  Há 2 funções:
    - concat() => é relacionada ao teclado de números
    - command() => é relacionada ao teclado de operadores
  As únicas funções que exigem exceção de tratamento são 'C' 
  e '%' em C é necessário saber em que momento o usuario digita
  sendo tanto no começo quanto no final
  Em '%' é necessário verificar de maneira semelhante porém 
  não é feito a alteração das duas variáveis e sim apenas da
  atual
  São satisfeitas as seguintes condições:
  - Não ultrapassar 8 dígitos na concatenação
  - Não dividir por 0 (Infinity)
*/
export default function App() {
  const arrayNumbers = [
    { id: "m", value: "1" },
    { id: "n", value: "2" },
    { id: "o", value: "3" },
    { id: "i", value: "4" },
    { id: "j", value: "5" },
    { id: "k", value: "6" },
    { id: "e", value: "7" },
    { id: "f", value: "8" },
    { id: "g", value: "9" },
    { id: "q", value: "0" },
    { id: "r", value: "." }
  ];
  const arrayOperators = [
    { id: "a", value: "C" },
    { id: "b", value: "AC" },
    { id: "c", value: "%" },
    { id: "d", value: "÷" },
    { id: "h", value: "x" },
    { id: "l", value: "-" },
    { id: "p", value: "+" },
    { id: "s", value: "=" }
  ];

  const [view, setView] = useState(0);
  const [PrevNumber, setPrevNumber] = useState("");
  const [NextNumber, setNextNumber] = useState("");
  const [operator, setOperator] = useState("");
  function concat(value) {
    if (PrevNumber > 9999999 || NextNumber > 9999999) {
      setView("Too long");
    } else {
      if (operator === "") {
        setPrevNumber(PrevNumber + "" + value);
        setView(PrevNumber + "" + value);
      } else {
        setNextNumber(NextNumber + "" + value);
        setView(NextNumber + "" + value);
      }
    }
  }
  function command(value) {
    if (value === "AC") {
      setView(0);
      setNextNumber("");
      setOperator("");
      setPrevNumber("");
    } else if (value === "C") {
      if (PrevNumber !== "" && NextNumber === "") {
        setPrevNumber("");
        setView(0);
        setOperator("");
      } else if (PrevNumber !== "" && NextNumber !== "") {
        setNextNumber("");
        setView(0);
      }
    } else if (value === "%") {
      if (PrevNumber !== "" && NextNumber === "") {
        setView(parseFloat(PrevNumber, 10) / 100);
        setPrevNumber(parseFloat(PrevNumber, 10) / 100);
      } else if (PrevNumber !== "" && NextNumber !== "") {
        setView(parseFloat(NextNumber, 10) / 100);
        setNextNumber(parseFloat(NextNumber, 10) / 100);
      }
    } else {
      if (operator === "" || operator !== value) {
        setOperator(value);
      }
      if (NextNumber !== "") {
        switch (operator) {
          case "+":
            setView(parseFloat(PrevNumber, 10) + parseFloat(NextNumber, 10));
            setPrevNumber(
              parseFloat(PrevNumber, 10) + parseFloat(NextNumber, 10)
            );
            setNextNumber("");
            break;
          case "-":
            setView(parseFloat(PrevNumber, 10) - parseFloat(NextNumber, 10));
            setPrevNumber(
              parseFloat(PrevNumber, 10) - parseFloat(NextNumber, 10)
            );
            setNextNumber("");
            break;
          case "x":
            setView(parseFloat(PrevNumber, 10) * parseFloat(NextNumber, 10));
            setPrevNumber(
              parseFloat(PrevNumber, 10) * parseFloat(NextNumber, 10)
            );
            setNextNumber("");
            break;
          case "÷":
            setView(parseFloat(PrevNumber, 10) / parseFloat(NextNumber, 10));
            setPrevNumber(
              parseFloat(PrevNumber, 10) / parseFloat(NextNumber, 10)
            );
            setNextNumber("");
            break;
          case "=":
            command(operator);
            break;
          default:
            setView("Err");
            break;
        }
      }
    }
  }
  return (
    <div className="body">
      <div className="container">
        <div className="button" id="viewer">
          {view}
        </div>
        {arrayNumbers.map(item => (
          <div
            onClick={event => concat(item.value)}
            className="button"
            id={item.id}
            value={item.value}
          >
            {item.value}
          </div>
        ))}
        {arrayOperators.map(item => (
          <div
            onClick={event => command(item.value)}
            className="button"
            id={item.id}
            value={item.value}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}
