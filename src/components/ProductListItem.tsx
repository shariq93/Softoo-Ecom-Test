import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle,Text, StyleSheet,  Dimensions, Pressable } from "react-native"

import { colors, spacing, } from "../theme"

import { NumberView } from "."

import Image from 'react-native-fast-image'
import { Product } from "../types/ProductType"
import { useDispatch } from "react-redux"
import { getSingleProduct } from "../store/actions/ProductActions"
const width = Dimensions.get('window').width;
export interface ProductListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: Product
  onClick: () => void
}

/**
 * Describe your component here
 */
export const ProductListItem =(props: ProductListItemProps) => {
  const { style, item, onClick } = props
  const $styles = [$container, style]
  const dispatch = useDispatch()
  return (
    <Pressable onPress={() => {

      dispatch(getSingleProduct(item.id))
      onClick()
    }} style={$styles}>
      <Image style={{ width: width / 2.3,  height: 200, resizeMode: 'cover' }} source={{ uri: item?.img }}></Image>
      <Text numberOfLines={2} style={$title}>
        {item?.name}
      </Text>


      <View style={$priceView}>
        <NumberView style={{ color: '#333', fontSize: 12, fontWeight:'bold' }} number={Number(item?.price)} ></NumberView>
      
      </View>
    </Pressable>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: 'center',
  width: width / 2,
  backgroundColor: '#fff',
  borderColor: colors.palette.neutral300,
  borderWidth: StyleSheet.hairlineWidth,

  overflow: 'hidden'
}

const $title: TextStyle = {

  fontSize: 12,
  textAlign: 'center',
  paddingHorizontal: spacing.xxs,
  color: colors.palette.secondary500,
  lineHeight: 18,

}
const $priceView: ViewStyle = {
  // backgroundColor: colors.palette.primary600,

  borderRadius: 10, paddingHorizontal: spacing.xxs,
  // position:'absolute',top:10,right:10
}

