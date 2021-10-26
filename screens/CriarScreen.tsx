import * as React from 'react';
import {  StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {Heading , Input, Button, Center, NativeBaseProvider } from "native-base"
import * as SecureStore from 'expo-secure-store';


export default function MainScreen({navigation}: any) {
  const [nome, setNome] = React.useState('');
  const [idade, setIdade] = React.useState('');
  const [endereco, setEndereco] = React.useState('');

  async function save() {
    // gerando número aleatorio
    const id = Math.floor(Math.random() * 1000000).toString();

    SecureStore.getItemAsync("pessoas").then(async value => {
        if (value === null)
          throw new Error("Não foi possível capturar o item");
  
        await SecureStore.setItemAsync("pessoas", JSON.stringify([
            ...JSON.parse(value),
            {
                id,
                nome,
                idade,
                endereco
            }
        ]));
      })


    // limpar os inputs
    setNome('');
    setIdade('');
    setEndereco('');

    navigation.push('Main')
  }
  
  return (
    <View style={styles.container}>
      <Heading>Cadastrar pessoa</Heading>
      <View style={styles.separator}></View>
      <Input
        onChangeText={nome => setNome(nome)}
        value={nome}
        size="xl"
        mx="3"
        placeholder="Nome"
        w={{
          base: "100%",
          md: "100%",
        }}
      />
      <View style={styles.separator}></View>
      <Input
        onChangeText={idade => setIdade(idade)}
        value={idade}
        mx="3"
        size="xl"
        placeholder="Idade"
        w={{
          base: "100%",
          md: "100%",
        }}
      />
      <View style={styles.separator}></View>
      <Input
        onChangeText={endereco => setEndereco(endereco)}
        value={endereco}
        mx="3"
        size="xl"
        placeholder="Endereço"
        w={{
          base: "100%",
          md: "100%",
        }}
      />
      <View style={styles.separator}></View>
      <Button size="lg" width="full" onPress={() => save()}>Salvar</Button>
      <View style={styles.separator}></View>
      <Button size="lg" variant="ghost" width="full" onPress={() => console.log("hello world")}>ver lista</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    marginLeft: 60,
    marginRight: 60,
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
