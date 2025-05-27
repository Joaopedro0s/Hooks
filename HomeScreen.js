import React, { useState, useEffect, useContext, useMemo, useCallback, useRef, useLayoutEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, TextInput, Fla } from 'react-native';
import CartContext from './CartContext';

const featuredGames = [
  {
    id: 1,
    title: 'The Witcher 3',
    image: 'https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png',
    price: 129.99,
  },
  {
    id: 2,
    title: 'Cyberpunk 2077',
    image: 'https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7',
    price: 129.99,
  },
  {
    id: 3,
    title: 'Half-Life: Alyx',
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQIA4TjUZZa1go6UsHkH5gP1KY8gkQQRNdOmzTZt8Clzop-vDZcLvkDA0v2gCJ9GhORVi03_Cx1jI3xQKncp25A3IYshG9PB1e0BQlXpo8',
    price: 39.99,
  },
];

const specialOffers = [
  {
    id: 101,
    title: 'Red Dead Redemption 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Zw3ba8igTlqTD-rCWWQgpjA1dFwTv0DV3w&s',
    price: 99.99,
  },
  {
    id: 102,
    title: 'Assassin’s Creed Valhalla',
    image: 'https://upload.wikimedia.org/wikipedia/pt/e/e9/Assassins_Creed_Valhalla_capa.png',
    price: 124.99,
  },
  {
    id: 103,
    title: 'Hades',
    image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/8/80/Hades_capa.jpg/330px-Hades_capa.jpg',
    price: 11.99,
  },
];

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const { addToCart, cart } = useContext(CartContext);
  const searchInputRef = useRef(null);

  useEffect(() => {
    console.log(`Busca atualizada: "${search}"`);
  }, [search]);

  const handleSearch = useCallback((text) => {
    setSearch(text);
  }, []);

  const filteredFeaturedGames = useMemo(() => {
    return featuredGames.filter(game =>
      game.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const filteredSpecialOffers = useMemo(() => {
    return specialOffers.filter(game =>
      game.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{ marginRight: 15 }}
        >
          <Text style={{ color: '#5ba32b', fontWeight: 'bold' }}>
            Carrinho ({cart.length})
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cart]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.searchBar}>
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Pesquisar jogos..."
            placeholderTextColor="#8f98a0"
            value={search}
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={focusSearchInput}>
            <Text style={{ color: '#5ba32b', marginTop: 5 }}>Focar no campo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Jogos em Destaque</Text>
        {filteredFeaturedGames.map(game => (
          <View key={game.id} style={styles.gameCard}>
            <Image source={{ uri: game.image }} style={styles.gameImage} />
            <View style={styles.gameInfo}>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gamePrice}>R${game.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addToCart(game)}
              >
                <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Ofertas Especiais</Text>
        {filteredSpecialOffers.map(game => (
          <View key={game.id} style={styles.gameCard}>
            <Image source={{ uri: game.image }} style={styles.gameImage} />
            <View style={styles.gameInfo}>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gamePrice}>${game.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addToCart(game)}
              >
                <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2838',
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  searchBar: {
    backgroundColor: '#171a21',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 3,
  },
  searchInput: {
    color: '#ebebeb',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#5ba32b',
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#b8b6b4',
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  gameCard: {
    flexDirection: 'row',
    backgroundColor: '#2a475e',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
  gameImage: {
    width: 120,
    height: 110,
  },
  gameInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  gameTitle: {
    color: '#c7d5e0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gamePrice: {
    color: '#5ba32b',
    marginVertical: 5,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#5ba32b',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#171a21',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
