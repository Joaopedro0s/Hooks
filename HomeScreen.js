import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  
  const featuredGames = [
    { id: 1, title: 'Counter-Strike 2', price: 'Grátis', discount: '', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg' },
    { id: 2, title: 'Dota 2', price: 'Grátis', discount: '', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg' },
    { id: 3, title: 'Apex Legends™', price: 'R$ 59,99', discount: '-50%', originalPrice: 'R$ 119,99', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg' },
    { id: 4, title: 'Grand Theft Auto V', price: 'R$ 59,99', discount: '-50%', originalPrice: 'R$ 119,99', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg' },
  ];

  const specialOffers = [
    { id: 5, title: 'Red Dead Redemption 2', price: 'R$ 99,99', discount: '-60%', originalPrice: 'R$ 249,99', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg' },
    { id: 6, title: 'Cyberpunk 2077', price: 'R$ 89,99', discount: '-50%', originalPrice: 'R$ 179,99', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Pesquisar</Text>
        </View>

        <Text style={styles.sectionTitle}>Destaques</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {featuredGames.map(game => (
            <TouchableOpacity key={game.id} style={styles.gameCard}>
              <Image source={{ uri: game.image }} style={styles.gameImage} />
              <Text style={styles.gameTitle}>{game.title}</Text>
              <View style={styles.priceContainer}>
                {game.discount ? (
                  <>
                    <Text style={styles.discount}>{game.discount}</Text>
                    <Text style={styles.originalPrice}>{game.originalPrice}</Text>
                  </>
                ) : null}
                <Text style={styles.price}>{game.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Ofertas especiais</Text>
        <View style={styles.specialOffersContainer}>
          {specialOffers.map(game => (
            <TouchableOpacity key={game.id} style={styles.specialOfferCard}>
              <Image source={{ uri: game.image }} style={styles.specialOfferImage} />
              <View style={styles.specialOfferDetails}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.discount}>{game.discount}</Text>
                  <Text style={styles.originalPrice}>{game.originalPrice}</Text>
                  <Text style={styles.price}>{game.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>Ver Carrinho</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2838',
  },
  searchBar: {
    backgroundColor: '#171a21',
    padding: 15,
    margin: 10,
    borderRadius: 3,
  },
  searchText: {
    color: '#8f98a0',
  },
  sectionTitle: {
    color: '#ebebeb',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  horizontalScroll: {
    paddingLeft: 10,
  },
  gameCard: {
    width: 150,
    marginRight: 10,
  },
  gameImage: {
    width: 150,
    height: 70,
    resizeMode: 'cover',
  },
  gameTitle: {
    color: '#ebebeb',
    fontSize: 14,
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  price: {
    color: '#b0b4bc',
    fontSize: 14,
  },
  discount: {
    backgroundColor: '#5ba32b',
    color: 'white',
    paddingHorizontal: 5,
    marginRight: 5,
    fontSize: 12,
  },
  originalPrice: {
    color: '#737577',
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  specialOffersContainer: {
    paddingHorizontal: 10,
  },
  specialOfferCard: {
    flexDirection: 'row',
    backgroundColor: '#222a35',
    marginBottom: 10,
    borderRadius: 3,
    overflow: 'hidden',
  },
  specialOfferImage: {
    width: 120,
    height: 60,
  },
  specialOfferDetails: {
    padding: 10,
    flex: 1,
  },
  cartButton: {
    backgroundColor: '#5ba32b',
    padding: 15,
    margin: 20,
    borderRadius: 3,
    alignItems: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;