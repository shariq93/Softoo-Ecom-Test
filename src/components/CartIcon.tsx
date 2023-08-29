import * as React from "react"
import { StyleProp, Image, TouchableOpacity, View, ViewStyle, Text, StyleSheet } from "react-native"



import { useNavigation } from "@react-navigation/native";
import { colors, spacing } from "../theme";
import { useSelector } from "react-redux";
import { CartState } from "../store/reducers/CartReducer";

export interface CartIconProps {


}

/**
 * Describe your component here
 */
export const CartIcon = (props: CartIconProps) => {

  const navigation = useNavigation()

  var { cartData } = useSelector((state: any) => state.cart as CartState)

  const getCartCount = () => {
    let qty = 0;
    cartData.forEach((item) => {
      qty += item.qty
    })
    return qty
  }
  const cartCount = getCartCount()

  return (
    <TouchableOpacity
      style={{ paddingRight: spacing.md }}
      onPress={() => {
        navigation.navigate('Cart')
      }}
    >
      <View>
        <Image
          source={require('../../assets/images/shopping-bag.png')}
          style={styles.backImage}
        />
        {cartCount > 0 && <View style={styles.cartBadgeContainer}>
          <Text style={{ color: '#fff', fontSize: 11 }}>{cartCount}</Text>
        </View>}
      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  backButton: {
    marginRight: 16,
  },
  backImage: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  cartBadgeContainer: {
    backgroundColor: colors.palette.secondary500,
    width: 20, height: 20, borderRadius: 20 / 2,
    justifyContent: 'center', alignItems: 'center',
    position: 'absolute', top: -10, right: -5
  }
})
