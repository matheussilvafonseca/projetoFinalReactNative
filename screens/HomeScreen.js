import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/imagem_de_roupas.jpg')} resizeMode="cover"/>
      <View style={styles.overlayContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.overlayText}>Best Store</Text>
          <Text style={styles.subtitulo}>A melhor loja para você!</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.segundaParte}>Clique aqui e conheça nossos produtos</Text>
          <Button style={styles.botao} title='Conheça já' color="#2196F3" onPress={() => navigation.navigate('Products')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)', // Torna o fundo mais escuro
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50, // Adiciona espaçamento vertical
  },
  titleContainer: {
    marginTop: 50, // Ajuste conforme necessário
    alignItems: 'center',
  },
  centerContainer: {
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    flex: 1, // Permite que o contêiner ocupe o espaço disponível
  },
  overlayText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Adiciona espaçamento entre os textos
  },
  subtitulo: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  segundaParte: {
    color: 'white',
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza o texto
  },
  botao: {
    marginTop: 10, // Adiciona espaçamento acima do botão
  },
});
