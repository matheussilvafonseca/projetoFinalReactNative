import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}> 
            {/* <Text>Olá</Text> */}
            <Image style={styles.logo} source={require('../assets/imagem_de_roupas.jpg')} resizeMode="cover"/>
            <View style={styles.overlayContainer}>
                <Text style={styles.overlayText}><h1>Best Store</h1></Text>
                <Text style={styles.subtitulo}>A melhor loja para você!</Text>
            </View>
            <View style={styles.overlayContainer2}>
                <Text style={styles.segundaParte}>Clique aqui e conheça nossos produtos</Text>
                <Button style={styles.botao} title='Conheça já' color="#2196F3"  onPress={() => navigation.navigate('ProductScreen')} />
            </View>
            

        </View> 
  );
}

const styles = StyleSheet.create({ 
  container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
  }, 
  iconTabRound: { 
      width: 60, 
      height: 90, 
      borderRadius: 30, 
      marginBottom: 20, 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center', 
      elevation: 6, 
      shadowColor: '#9C27B0', 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.5, 
      shadowRadius: 5, 
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
      // justifyContent: 'center',
       alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayContainer2: {
      position: 'absolute',
      top: "25%",
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
       alignItems: 'center',
  },
  overlayText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      top: '8%',
      left: 0,
      right: 0,
      bottom: 0,
  },
  subtitulo: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
      top: '4%',
  },
  segundaParte: {
      position: 'absolute',
       justifyContent: 'center',
       alignItems: 'center',
       color: 'white',
       top: "40%",
       marginBottom: 10,
       fontSize: 17,
      fontWeight: 'bold',

  },
  botao: {
      position: 'absolute',
  },
}); 