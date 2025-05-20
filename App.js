// App.js
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';

import useShoppingList from './useShoppingList';

function App() {
  const { items, addItem, removeItem, togglePurchased, clearList, stats } = useShoppingList();
  const [newItemName, setNewItemName] = useState('');

  // Hook para alternar tema
  const [theme, setTheme] = useState('light');

  const isDark = theme === 'dark';

  const handleAddItem = () => {
    addItem(newItemName);
    setNewItemName('');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, isDark && styles.itemContainerDark]}>
      <TouchableOpacity
        onPress={() => togglePurchased(item.id)}
        style={styles.itemTextWrapper}
      >
        <Text
          style={[styles.itemName, item.purchased && styles.purchasedItem, isDark && styles.itemNameDark]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
      <Button title="Remover" onPress={() => removeItem(item.id)} color="red" />
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.header, isDark && styles.headerDark]}>Minha Lista de Compras</Text>

      <Button title={`Tema: ${theme === 'light' ? 'Claro' : 'Escuro'}`} onPress={toggleTheme} />

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          placeholder="Adicionar novo item..."
          placeholderTextColor={isDark ? '#aaa' : '#888'}
          value={newItemName}
          onChangeText={setNewItemName}
          onSubmitEditing={handleAddItem}
        />
        <Button title="Adicionar" onPress={handleAddItem} />
      </View>

      {items.length === 0 ? (
        <Text style={[styles.emptyListText, isDark && styles.emptyListTextDark]}>Sua lista está vazia!</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
        />
      )}

      <View style={styles.footer}>
        <Text style={[styles.statsText, isDark && styles.statsTextDark]}>
          Itens Comprados: {stats.purchased} / {stats.total}
        </Text>
        <Button
          title="Limpar Tudo"
          onPress={clearList}
          color="orange"
          disabled={items.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  headerDark: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  inputDark: {
    backgroundColor: '#333',
    color: '#fff',
    borderColor: '#555',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  itemContainerDark: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  itemTextWrapper: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
  itemNameDark: {
    color: '#fff',
  },
  purchasedItem: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  emptyListText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  emptyListTextDark: {
    color: '#aaa',
  },
  footer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  statsTextDark: {
    color: '#ccc',
  },
});

export default App;