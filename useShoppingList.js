import { useState, useCallback, useMemo } from 'react';

/**
 * Hook personalizado para gerenciar uma lista de compras.
 * Permite adicionar, remover e alternar o status de compra dos itens.
 *
 * @returns {object} Um objeto contendo a lista de itens e funções para manipulá-la.
 */
function useShoppingList() {
  const [items, setItems] = useState([]); // Estado para armazenar os itens da lista

  // Adiciona um novo item à lista
  // useCallback memoriza a função para otimização
  const addItem = useCallback((name) => {
    if (name.trim() === '') {
      return; // Não adiciona itens vazios
    }
    const newItem = {
      id: Date.now().toString(), // ID único baseado no timestamp
      name: name.trim(),
      purchased: false, // Novo item não está comprado por padrão
    };
    setItems((prevItems) => [...prevItems, newItem]);
  }, []); // Sem dependências, então esta função é criada apenas uma vez

  // Remove um item da lista
  const removeItem = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []); // Sem dependências

  // Alterna o status de compra (comprado/não comprado) de um item
  const togglePurchased = useCallback((id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  }, []); // Sem dependências

  // Limpa todos os itens da lista
  const clearList = useCallback(() => {
    setItems([]);
  }, []);

  // Calcula estatísticas da lista (itens comprados/total)
  // useMemo memoriza o resultado do cálculo
  const stats = useMemo(() => {
    const total = items.length;
    const purchased = items.filter(item => item.purchased).length;
    return { total, purchased, remaining: total - purchased };
  }, [items]); // Recalcula stats apenas se 'items' mudar

  return {
    items,
    addItem,
    removeItem,
    togglePurchased,
    clearList,
    stats,
  };
}

export default useShoppingList;