// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { evaluate } from 'mathjs';

export default function App() {
  const [expression, setExpression] = useState("");

  // Funcția care gestionează apăsările butoanelor
  const handlePress = (value) => {
    // Resetare (Clear)
    if (value === "C") {
      setExpression("");
    }
    // Evaluare expresie
    else if (value === "=") {
      try {
        const result = evaluate(expression);
        setExpression(String(result));
      } catch (error) {
        setExpression("Error");
      }
    }
    // Pentru simbolul radical, adăugăm "sqrt(" în expresie
    else if (value === "√") {
      setExpression(expression + "sqrt(");
    }
    // Pentru celelalte valori, le adăugăm la expresie
    else {
      setExpression(expression + value);
    }
  };

  // Configurarea butoanelor în grilă
  const buttons = [
    ["C", "(", ")", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "√", "="]
  ];

  return (
    <View style={styles.container}>
      {/* Ecranul de afișare */}
      <View style={styles.display}>
        <ScrollView horizontal={true} contentContainerStyle={styles.expressionContainer}>
          <Text style={styles.expressionText}>{expression}</Text>
        </ScrollView>
      </View>

      {/* Butoanele calculatorului */}
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((buttonValue) => (
              <TouchableOpacity 
                key={buttonValue}
                style={styles.button}
                onPress={() => handlePress(buttonValue)}
              >
                <Text style={styles.buttonText}>{buttonValue}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  display: {
    flex: 2,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  expressionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  expressionText: {
    fontSize: 36,
    color: '#fff',
  },
  buttonsContainer: {
    flex: 5,
    backgroundColor: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    flex: 1,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  buttonText: {
    fontSize: 28,
    color: '#fff',
  },
});
