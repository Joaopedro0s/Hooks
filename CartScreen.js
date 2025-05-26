import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

const CartScreen = () => {
  const cartItems = [
    { id: 1, title: 'Red Dead Redemption 2', price: 'R$ 99,99', image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg' },
    { id: 2, title: 'Cyberpunk 2077', price: 'R$ 89,99', image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg' },
  ];

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('R$ ', '').replace(',', '.')), 0);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Seu Carrinho</Text>
        
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemTitle}>{item.title}</Text>
              <Text style={styles.cartItemPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>R$ {total.toFixed(2).replace('.', ',')}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
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
  sectionTitle: {
    color: '#ebebeb',
    fontSize: 22,
    fontWeight: 'bold',
    margin: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#222a35',
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 3,
    padding: 10,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 60,
    height: 30,
    resizeMode: 'cover',
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    color: '#ebebeb',
    fontSize: 14,
  },
  cartItemPrice: {
    color: '#b0b4bc',
    fontSize: 14,
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: '#5c3c2e',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#8f98a0',
  },
  totalText: {
    color: '#ebebeb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#ebebeb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#5ba32b',
    padding: 15,
    margin: 20,
    borderRadius: 3,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;