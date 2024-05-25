import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { firestore } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditProductScreen({ route, navigation }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(firestore, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct(data);
          setName(data.name);
          setPrice(data.price);
          setDescription(data.description);
          setCategory(data.category);
        } else {
          Alert.alert("Erro", "Produto não encontrado");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível buscar o produto");
      }
    };
    fetchProduct();
  }, [id]);

  const handleSave = async () => {
    try {
      const docRef = doc(firestore, 'products', id);
      await updateDoc(docRef, { name, price, description, category });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações");
    }
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput value={name} onChangeText={setName} placeholder="Nome" style={styles.input} />
      <TextInput value={price} onChangeText={setPrice} placeholder="Preço" keyboardType="numeric" style={styles.input} />
      <TextInput value={description} onChangeText={setDescription} placeholder="Descrição" style={styles.input} />
      <TextInput value={category} onChangeText={setCategory} placeholder="Categoria" style={styles.input} />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});
