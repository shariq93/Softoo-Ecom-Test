import React, { FC } from "react"

import { FlatList, StyleSheet, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import EmptyState from "../components/EmptyState"
import { useSelector } from "react-redux"
import { CartState } from "../store/reducers/CartReducer"
import { ProductCartListItem } from "../components"



export const CartScreen = () => {
  var { cartData } = useSelector((state: any) => state.cart as CartState)

  const navigation = useNavigation()
  return (
    <View style={styles.root}>

      <FlatList
        data={cartData}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState />
        }
      renderItem={({ item }) => <ProductCartListItem data={item} />}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})