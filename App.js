import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import { CartProvider } from './CartContext'; // Importa o contexto

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider> {/* Envolve o app com o Provider */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#171a21',
            },
            headerTintColor: '#b8b6b4',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Steam Mobile' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Carrinho' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;


