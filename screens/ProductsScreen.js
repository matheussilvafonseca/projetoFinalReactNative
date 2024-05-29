import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { firestore } from '../firebaseConfig';
import { collection, onSnapshot, doc, deleteDoc, addDoc } from 'firebase/firestore';

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  
  // Estados para campos obrigatórios
  const [isProductNameValid, setIsProductNameValid] = useState(true);
  const [isProductPriceValid, setIsProductPriceValid] = useState(true);
  const [isProductCategoryValid, setIsProductCategoryValid] = useState(true);
  const [isProductDescriptionValid, setIsProductDescriptionValid] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'products'), (snapshot) => {
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    });

    return () => unsubscribe();
  }, []);

  const confirmDelete = (id) => {
    setProductIdToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(firestore, 'products', productIdToDelete));
      setDeleteModalVisible(false);
      setProductIdToDelete('');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o produto");
    }
  };

  const handleSaveProduct = async () => {
    // Verifica se todos os campos estão preenchidos
    const isNameValid = newProductName.trim() !== '';
    const isPriceValid = newProductPrice.trim() !== '';
    const isCategoryValid = newProductCategory.trim() !== '';
    const isDescriptionValid = newProductDescription.trim() !== '';

    setIsProductNameValid(isNameValid);
    setIsProductPriceValid(isPriceValid);
    setIsProductCategoryValid(isCategoryValid);
    setIsProductDescriptionValid(isDescriptionValid);

    if (isNameValid && isPriceValid && isCategoryValid && isDescriptionValid) {
      try {
        await addDoc(collection(firestore, 'products'), {
          name: newProductName,
          price: newProductPrice,
          description: newProductDescription,
          category: newProductCategory
        });
        setModalVisible(false);
        setNewProductName('');
        setNewProductPrice('');
        setNewProductCategory('');
        setNewProductDescription('');
      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar o produto");
      }
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios");
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productText}>{item.name} - {item.price}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProductScreen', { id: item.id })}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton2} onPress={() => confirmDelete(item.id)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
      />
      {/* Modal para cadastrar novo produto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Novo Produto</Text>
            <TextInput
              placeholder="Nome"
              value={newProductName}
              onChangeText={setNewProductName}
              style={[styles.input, !isProductNameValid && styles.inputError]}
            />
            <TextInput
              placeholder="Preço"
              value={newProductPrice}
              onChangeText={setNewProductPrice}
              keyboardType="numeric"
              style={[styles.input, !isProductPriceValid && styles.inputError]}
            />
            <TextInput
              placeholder="Categoria"
              value={newProductCategory}
              onChangeText={setNewProductCategory}
              style={[styles.input, !isProductCategoryValid && styles.inputError]}
            />
            <TextInput
              placeholder="Descrição"
              value={newProductDescription}
              onChangeText={setNewProductDescription}
              style={[styles.input, !isProductDescriptionValid && styles.inputError]}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSaveProduct}>
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para confirmar exclusão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text>Você tem certeza que deseja excluir este produto?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  productText: {
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton2: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#757575',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
