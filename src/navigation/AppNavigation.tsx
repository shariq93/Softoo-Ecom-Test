import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { CartScreen, HomeScreen, ProductDetailsScreen } from '../screens';
import { colors } from '../theme';
import { CartIcon } from '../components/CartIcon';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer >
      <Stack.Navigator  screenOptions={{
          headerShown: true, 
          headerTintColor: '#fff', // Text color for header components
          headerStyle: {
            backgroundColor: colors.palette.primary600, // Background color for header
          },
          headerRight:()=><CartIcon/>,
          headerTitleStyle: {
            color: '#fff', // Color for header title
          },
          
          
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
