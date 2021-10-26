import * as React from 'react';
import {  Alert, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import {Heading , Text, Button } from "native-base"
import * as SecureStore from 'expo-secure-store';

interface Pessoa {
  id: string;
  nome: string;
  endereco: string;
  idade: string;
}

export default function MainScreen({ navigation }: any) {
  const [pessoas, setPessoas] = React.useState([]);

  React.useEffect(() => {
    SecureStore.getItemAsync("pessoas").then(value => {
      if (value === null)
      throw new Error("Não foi possível capturar o item");
      setPessoas(JSON.parse(value))
    })
  }, [SecureStore.getItemAsync("pessoas")]);
  
  return (
    <View style={styles.container}>
      <Heading>Pessoas</Heading>
      <View style={styles.separator}></View>
      {
        pessoas.map((value: Pessoa, index) => {
          return (
            <View key={value.id || index} style={styles.cardContainer}>
              <Text fontSize="lg" bold>{value.nome}</Text>
              <Text fontSize="md" marginTop="2">Tem {value.idade} ano(s)</Text>
            </View>
          )
        })
      }
      <View style={styles.separator}></View>
      <Button size="lg" width="full" onPress={() => navigation.navigate('Criar')}>cadastrar pessoa</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fafafa',
    width: "100%",
    borderColor: '#ebebeb',
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    marginBottom: 20
  },
  container: {
    flex: 1,
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    paddingBottom: 60,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 12,
    height: 1,
    width: '80%',
  },

});
