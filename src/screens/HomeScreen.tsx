import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, View, ViewStyle } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../store/actions/ProductActions"
import { ProductState } from "../store/reducers/ProductReducer"
import { ProductListItem } from "../components"
import { Product } from "../types/ProductType"
import Header from "../components/Header"



export const HomeScreen = () => {


  const dispatch = useDispatch()
  var {products,isLoading} = useSelector((state:any) => state.products as ProductState)
  
  console.log(products);

  useEffect(() => {
      console.log('hello');
      dispatch(getProducts())
      
  }, [])
  const navigation = useNavigation()

  return (
    <View style={styles.root}>
     
      {isLoading && <View style={{ marginTop: 50 }}>
        <ActivityIndicator color={'#333'} />
      </View>}
      <FlatList
        numColumns={2}
        data={products}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <>{!isLoading && <Text>No Data to display</Text>}</>
        }
        renderItem={({ item }) => <ProductListItem onClick={() => {
          navigation.navigate('ProductDetails')
        }} item={item as Product} />}
      />


    </View>
  )
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})