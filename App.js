<<<<<<< HEAD
// App.js
=======
>>>>>>> fa59a9bb (Versão)
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Ícones Feather

import useShoppingList from './useShoppingList';

function App() {
  const { items, addItem, removeItem, togglePurchased, clearList, stats } = useShoppingList();
  const [newItemName, setNewItemName] = useState('');
  const [theme, setTheme] = useState('light');
  const isDark = theme === 'dark';

  const handleAddItem = () => {
    if (newItemName.trim() !== '') {
      addItem(newItemName);
      setNewItemName('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, isDark && styles.itemContainerDark]}>
      <TouchableOpacity
        onPress={() => togglePurchased(item.id)}
        style={styles.itemTextWrapper}
      >
        <Text
          style={[
            styles.itemName,
            item.purchased && styles.purchasedItem,
            isDark && styles.itemNameDark,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
      <Button title="Remover" onPress={() => removeItem(item.id)} color="red" />
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Ícone de tema no canto superior direito */}
      <View style={styles.themeSwitcher}>
        <TouchableOpacity onPress={() => setTheme(isDark ? 'light' : 'dark')}>
          <Icon
            name={isDark ? 'sun' : 'moon'}
            size={28}
            color={isDark ? '#FFD700' : '#333'}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.header, isDark && styles.headerDark]}>Minha Lista de Compras</Text>

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
        <Text style={[styles.emptyListText, isDark && styles.emptyListTextDark]}>
          Sua lista está vazia!
        </Text>
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
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  themeSwitcher: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  headerDark: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  inputDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  itemContainerDark: {
    backgroundColor: '#2c2c2c',
  },
  itemTextWrapper: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#000',
  },
  itemNameDark: {
    color: '#fff',
  },
  purchasedItem: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  emptyListTextDark: {
    color: '#aaa',
  },
  footer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  statsText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  statsTextDark: {
    color: '#fff',
  },
});

export default App;
