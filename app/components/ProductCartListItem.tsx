import * as React from "react"
import { StyleProp,  TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { NumberView } from "./NumberView"
import { Feather } from '@expo/vector-icons';
import { Product, useStores } from "../models"
import { useState } from "react"
import { ProdcutCountView } from "./ProdcutCountView"


import Image from 'react-native-fast-image'
export interface ProductCartListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data: Product
}

/**
 * Describe your component here
 */
export const ProductCartListItem = observer(function ProductCartListItem(props: ProductCartListItemProps) {
  const { data, style } = props
  const $styles = [$container, style]
  let variation_key = ""
  let variation_Value = ""
  const { cart } = useStores()
  const [askDelete, setAskDelete] = useState(false)
 
  return (
    <View style={$styles}>
    
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{ width: 70, height: 70, borderRadius: 5 }}
          source={{ uri: (data.img ) }} />
        <View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ paddingHorizontal: spacing.xs, }}>
              <Text numberOfLines={2} style={$title}>
                {data.name}
              </Text>
              {variation_key &&
                <Text numberOfLines={2} style={$text}>
                  {variation_key}: {variation_Value}
                </Text>}

            </View>
            <View style={$priceView}>
              <NumberView style={{ color: colors.palette.primary600, fontSize: 13, fontFamily: typography.primary.bold }} number={Number(data.price)} ></NumberView>

            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <ProdcutCountView
              onPlus={()=>{
                cart.add(data)
              }}
              onMinus={()=>{
                cart.minus(data)
              }}
              onDelete={() => {
               cart.delete(data)
              }}
              data={data} />
            <Feather name="trash-2" onPress={() => {
              cart.delete(data)
            }} size={24} color="black" />
          </View>
        </View>

      </View>

    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  padding: spacing.xs,
  backgroundColor: '#fff',
  borderRadius: 7,

}
const $priceView: ViewStyle = {
  // backgroundColor: colors.palette.primary600,
  // flex:1,

  // justifyContent:'flex-end'
  // position:'absolute',top:10,right:10
}

const $title: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 13,
  textAlign: 'left',
  maxWidth: 180,


  color: colors.palette.secondary500,
  lineHeight: 18,

}
const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 12,
  color: colors.palette.primary500,
}
