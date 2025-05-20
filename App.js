import React, { useState } from 'react'; // Importe useState para gerenciar o input
import {
  StyleSheet,
  View,
  Text,
  TextInput, // Adicionado para o input
  Button,    // Adicionado para os botões
  FlatList,  // Adicionado para renderizar a lista
  TouchableOpacity // Adicionado para interagir com o texto do item
} from 'react-native';

// Importe o seu Hook personalizado
import useShoppingList from './useShoppingList';

// Converte o componente App de CLASSE para FUNÇÃO
function App() {
  // Usa o Hook personalizado para gerenciar a lista de compras
  const { items, addItem, removeItem, togglePurchased, clearList, stats } = useShoppingList();

  // Estado local para o valor do input de adicionar novo item
  const [newItemName, setNewItemName] = useState('');

  // Função para lidar com a adição de um item
  const handleAddItem = () => {
    addItem(newItemName); // Chama a função do hook para adicionar
    setNewItemName(''); // Limpa o campo de texto
  };

  // Função para renderizar cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* TouchableOpacity para marcar/desmarcar item como comprado */}
      <TouchableOpacity
        onPress={() => togglePurchased(item.id)}
        style={styles.itemTextWrapper}
      >
        <Text
          style={[
            styles.itemName,
            item.purchased && styles.purchasedItem, // Aplica estilo se o item foi comprado
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
      {/* Botão para remover o item */}
      <Button title="Remover" onPress={() => removeItem(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minha Lista de Compras</Text>

      {/* Área para adicionar novos itens */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar novo item..."
          value={newItemName}
          onChangeText={setNewItemName}
          onSubmitEditing={handleAddItem} // Adiciona ao pressionar 'Enter' no teclado
        />
        <Button title="Adicionar" onPress={handleAddItem} />
      </View>

      {/* Exibe a lista de itens ou uma mensagem de lista vazia */}
      {items.length === 0 ? (
        <Text style={styles.emptyListText}>Sua lista está vazia!</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
        />
      )}

      {/* Rodapé com estatísticas e botão para limpar a lista */}
      <View style={styles.footer}>
        <Text style={styles.statsText}>
          Itens Comprados: {stats.purchased} / {stats.total}
        </Text>
        <Button
          title="Limpar Tudo"
          onPress={clearList}
          color="orange"
          disabled={items.length === 0} // Desabilita se a lista estiver vazia
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Espaço superior para o status bar
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8', // Fundo leve
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1, // Ocupa o máximo de espaço possível
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1, // Garante que a lista ocupe o espaço restante
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
    elevation: 1, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  itemTextWrapper: {
    flex: 1, // Faz com que o texto ocupe o espaço para o clique
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
  purchasedItem: {
    textDecorationLine: 'line-through', // Adiciona um risco ao texto
    color: 'gray', // Cor mais suave para itens comprados
  },
  emptyListText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
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
});

export default App;