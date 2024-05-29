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


  const [isProductNameValid, setIsProductNameValid] = useState(true);
  const [isProductPriceValid, setIsProductPriceValid] = useState(true);
  const [isProductCategoryValid, setIsProductCategoryValid] = useState(true);
  const [isProductDescriptionValid, setIsProductDescriptionValid] = useState(true);

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
    const isNameValid = name.trim() !== '';
    const isPriceValid = price.trim() !== '';
    const isCategoryValid = category.trim() !== '';
    const isDescriptionValid = description.trim() !== '';

    setIsProductNameValid(isNameValid);
    setIsProductPriceValid(isPriceValid);
    setIsProductCategoryValid(isCategoryValid);
    setIsProductDescriptionValid(isDescriptionValid);

    if (isNameValid && isPriceValid && isCategoryValid && isDescriptionValid) {
    try {
      const docRef = doc(firestore, 'products', id);
      await updateDoc(docRef, { name, price, description, category });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações");
    }
  } else {
    Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios");
  } 
};

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput value={name} onChangeText={setName} placeholder="Nome" style={[styles.input, !isProductNameValid && styles.inputError]} />
      <TextInput value={price} onChangeText={setPrice} placeholder="Preço" keyboardType="numeric" style={[styles.input, !isProductPriceValid && styles.inputError]} />
      <TextInput value={description} onChangeText={setDescription} placeholder="Descrição" style={[styles.input, !isProductDescriptionValid && styles.inputError]} />
      <TextInput value={category} onChangeText={setCategory} placeholder="Categoria" style={[styles.input, !isProductCategoryValid && styles.inputError]} />
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
  inputError: {
    borderColor: 'red',
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
