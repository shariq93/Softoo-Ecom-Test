import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet, Text, TouchableOpacity } from "react-native"

import { colors, spacing } from "../theme"

import { NumberView } from "./NumberView"


import { useState } from "react"
import { ProdcutCountView } from "./ProdcutCountView"


import Image from 'react-native-fast-image'
import { Product } from "../types/ProductType";
import { useDispatch } from "react-redux"
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../store/actions/CartActions"
export interface ProductCartListItemProps {
 
  style?: StyleProp<ViewStyle>
  data: Product
}


export const ProductCartListItem = (props: ProductCartListItemProps) => {
  const { data, style } = props
  const $styles = [$container, style]
  let variation_key = ""
  let variation_Value = ""

  const dispatch = useDispatch()
  return (
    <View style={$styles}>

      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{ width: 70, height: 70, borderRadius: 5 }}
          source={{ uri: (data.img) }} />
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
            <View >
              <NumberView style={{ color: colors.palette.primary600, fontSize: 13, fontWeight: 'bold' }} number={Number(data.price)} ></NumberView>

            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <ProdcutCountView
              onPlus={() => {
                dispatch(increaseQuantity(data))
              }}
              onMinus={() => {
                dispatch(decreaseQuantity(data))
              }}
              onDelete={() => {
                dispatch(removeFromCart(data))
              }}
              data={data} />



            <TouchableOpacity onPress={() => {

            }} >
              <Image source={require('../../assets/images/plus.png')} style={{ backgroundColor: colors.palette.neutral200, width: 30, }} />
            </TouchableOpacity>
          </View>
        </View>

      </View>

    </View>
  )
}


const $container: ViewStyle = {
  justifyContent: "center",
  padding: spacing.xs,
  backgroundColor: '#fff',
  borderRadius: 7,

}

const $title: TextStyle = {

  fontSize: 13,
  textAlign: 'left',
  maxWidth: 180,


  color: colors.palette.secondary500,
  lineHeight: 18,

}
const $text: TextStyle = {

  fontSize: 12,
  color: colors.palette.primary500,
}
