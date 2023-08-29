import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, Pressable, Text, View, ActivityIndicator, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

const { width, height } = Dimensions.get('window');
import ImageView from "react-native-image-viewing";

import Image from 'react-native-fast-image'
import { useNavigation } from "@react-navigation/native"

import {  spacing, colors } from "../theme"

import { NumberView } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { ProductState } from "../store/reducers/ProductReducer"
import { Button } from "react-native-paper";
import { addToCart } from "../store/actions/CartActions";


export const ProductDetailsScreen = ()=> {

  
  var {loadingSingle,product} = useSelector((state:any) => state.products as ProductState)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [visibleSingle, setIsvisibleSingle] = React.useState(false);
  return (
    <View style={styles.root} >
      {loadingSingle && <View style={{ marginTop: 50 }}>
        <ActivityIndicator color={'#333'} />
      </View>}
      {!loadingSingle && <>
        <Pressable onPress={() => setIsvisibleSingle(true)}>
          <Image
            style={{ width, height: width, }}
            source={{ uri: product?.img }} />
        </Pressable>
        <View style={styles.body}>
          <Text numberOfLines={2} style={styles.title}>
            {product?.name}
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.normalText}>
              {'Price: '}
            </Text>
            <NumberView style={styles.normalText} number={product?.price}></NumberView>

          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.normalText}>
              {'Color: '}
            </Text>
            <Text style={styles.normalText}>
              {product.colour}
            </Text>
          </View>
          <Button
          textColor='#fff'
            onPress={() => {
              dispatch(addToCart(product))
              // cart.add(product)

            }}
          
            style={styles.cartButton}
         
          > Add To Cart</Button>
        </View>

        {product?.img && <ImageView
          images={[{ uri: product?.img }]}
          imageIndex={0}
          visible={visibleSingle}
          onRequestClose={() => setIsvisibleSingle(false)} />
        }
      </>}
    </View >
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  body:{
    padding: spacing.sm
  },
  cartButton: {
    backgroundColor: colors.palette.primary600,
    borderRadius: 7,
    marginTop: spacing.md,
    
  },
  normalText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.palette.secondary500,

  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,

    paddingVertical: spacing.sm,
    color: colors.palette.secondary500,
    lineHeight: 18,

  },
})
