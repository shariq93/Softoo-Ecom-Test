import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"

import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useStores } from "app/models";
export interface CartIconProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CartIcon = observer(function CartIcon(props: CartIconProps) {
  const { style } = props
  const navigation = useNavigation()
  const { cart } = useStores()

  const { cartCount } = cart

  return (
    <TouchableOpacity
      style={{ paddingRight: spacing.md }}
      onPress={() => {
        navigation.navigate('Cart')
      }}
    >
      <View>
        <Feather name='shopping-bag' size={24} color="black" />
        {cartCount > 0 && <View style={$cartBadgeContainer}>
          <Text style={{ color: '#fff', fontFamily: typography.primary.semiBold, fontSize: 11 }}>{cartCount}</Text>
        </View>}
      </View>
    </TouchableOpacity>
  )
})

const $cartBadgeContainer: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  width: 20, height: 20, borderRadius: 20 / 2,
  justifyContent: 'center', alignItems: 'center',
  position: 'absolute', top: -10, right: -5

}
