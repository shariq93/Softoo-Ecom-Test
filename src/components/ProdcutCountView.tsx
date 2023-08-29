import * as React from "react"
import { Text, StyleProp, TextStyle, View, ViewStyle, Image, TouchableOpacity, StyleSheet } from "react-native"

import { colors, spacing, } from "../theme"
import { useState } from "react"
import { Product } from "../types/ProductType"
import { useSelector } from "react-redux"
import { CartState } from "../store/reducers/CartReducer"


export interface ProdcutCountViewProps {
  /**
   * An optional style override useful for padding & margin.
   */

  data: Product
  onPlus?: (qty: string) => void
  onMinus?: (qty: string) => void
  onDelete?: () => void
}

/**
 * Describe your component here
 */
export const ProdcutCountView = (props: ProdcutCountViewProps) => {
  const { data, onPlus, onMinus, onDelete } = props

  var { cartData } = useSelector((state: any) => state.cart as CartState)


  const [count, setCount] = useState(data?.qty.toString())
  return (
    <View style={{
      flexDirection: 'row', width: 120,
      justifyContent: 'space-between', borderRadius: 5,
      paddingHorizontal: spacing.xs, marginTop: spacing.xs, alignItems: 'center'
    }}>
      {<>
        <TouchableOpacity
          style={styles.qtyButton }
          onPress={() => {
            if (Number(count) > 1) {
              onMinus((Number(count) - 1) + '')
              setCount((Number(count) - 1) + '')
            } else {
              onDelete()
            }
          }} >
          <Image source={require('../../assets/images/minus.png')} style={{ width: 20, height: 20, }} />
        </TouchableOpacity>
        {/* {loadingUpdate && <View style={{ width: 40 }}><ActivityIndicator /></View>} */}
        <Text style={{ fontWeight: 'bold', backgroundColor: '#fff', width: 40, textAlign: 'center' }}>{count}</Text>

        <TouchableOpacity
          style={styles.qtyButton }
        onPress={() => {
          setCount((Number(count) + 1) + '')
          onPlus((Number(count) + 1) + '')
        }} >
          <Image source={require('../../assets/images/plus.png')} style={{  width: 20, height: 20 }} />
        </TouchableOpacity>

      </>}
    </View>
  )
}

const styles = StyleSheet.create({
  qtyButton: { padding: 5, backgroundColor: colors.palette.neutral200, borderRadius: 4 }
})
const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {

  fontSize: 14,
  color: colors.palette.primary500,
}
