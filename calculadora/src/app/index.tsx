import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "@/components/Button";
import Display from "@/components/Display";

type Calculator = {
  displayValue: string;
  clearDisplay: boolean;
  operation: string | null;
  values: number[];
  current: number;
};

const initialValue = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default function Index() {
  const [calculator, setCalculator] = useState<Calculator>({
    ...initialValue,
  });

  const addDigit = (digit: string) => {
    // Não definir o valor do display se el já for zero ou se o display estiver limpo
    const clearDisplay =
      calculator.displayValue === "0" || calculator.clearDisplay;

    // Se já temos o ponto, não pode adicionar mais
    if (digit === "." && !clearDisplay && calculator.displayValue.includes("."))
      return;

    // Recebe o valor atual dos digitos
    const currentValue = clearDisplay ? "" : calculator.displayValue;

    // Concatena os valores do display
    const displayValue = currentValue + digit;

    // Define o valor do display e que o display tá com valor
    setCalculator((prev) => ({ ...prev, displayValue, clearDisplay: false }));

    if (digit !== ".") {
      const newValue = parseFloat(displayValue);
      const values = [...calculator.values];
      values[calculator.current] = newValue;
      setCalculator((prev) => ({ ...prev, values }));
    }
  };

  const clearMemory = () => {
    setCalculator({ ...initialValue });
  };

  const setOperation = (operation: string) => {
    // Define que o display será limpo ao ...
    if (calculator.current === 0) {
      setCalculator((prev) => ({
        ...prev,
        operation,
        current: 1,
        clearDisplay: true,
      }));
    } else {
      const equals = operation === "=";
      const values = [...calculator.values];

      // Realiza a operação
      try {
        values[0] = eval(`${values[0]} ${calculator.operation} ${values[1]}`);
      } catch {
        values[0] = calculator.values[0];
      }

      values[1] = 0;
      setCalculator((prev) => ({
        ...prev,
        displayValue: values[0].toString(),
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Display value={calculator.displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={setOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={setOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={setOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setOperation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
