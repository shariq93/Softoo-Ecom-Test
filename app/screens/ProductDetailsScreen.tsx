import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, Pressable, TextStyle, View, ActivityIndicator } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, CartIcon, Screen, Text } from "app/components"
const { width, height } = Dimensions.get('window');
import ImageView from "react-native-image-viewing";

import Image from 'react-native-fast-image'
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { typography, spacing, colors } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import { NumberView } from "app/components/NumberView"

interface ProductDetailsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"ProductDetails">> { }

export const ProductDetailsScreen: FC<ProductDetailsScreenProps> = observer(function ProductDetailsScreen() {
  // Pull in one of our MST stores
  const { products,cart } = useStores()
  const { product, loadingSingle } = products
  // Pull in navigation via hook
  const navigation = useNavigation()
  useHeader({ 'title': 'Product Details', leftIcon: 'back', onLeftPress: () => navigation.goBack(), RightActionComponent: <CartIcon/> })
  useEffect(() => {
    return () => {
      // products.clearProduct()
    }
  }, [])
  const [visibleSingle, setIsvisibleSingle] = React.useState(false);
  return (
    <Screen style={$root} preset="scroll">
      {loadingSingle && <View style={{ marginTop: 50 }}>
        <ActivityIndicator color={'#333'} />
      </View>}
      {!loadingSingle && <>
        <Pressable onPress={() => setIsvisibleSingle(true)}>
          <Image
            style={{ width, height: width, }}
            source={{ uri: product?.img }} />
        </Pressable>
        <View style={$body}>
          <Text numberOfLines={2} style={$title}>
            {product?.name}
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={$normalText}>
              {'Price: '}
            </Text>
            <NumberView style={$normalText} number={product.price}></NumberView>

          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={$normalText}>
              {'Color: '}
            </Text>
            <Text style={$normalText}>
              {product.colour}
            </Text>
          </View>
          <Button
            onPress={() => {
              cart.add(product)

            }}
            textStyle={{ color: colors.palette.neutral100 }}
            style={$cartButton}
            pressedStyle = {{...$cartButton,backgroundColor:colors.palette.primary300}}
            text='Add to cart'
          />
        </View>

        {product?.img && <ImageView
          images={[{ uri: product?.img }]}
          imageIndex={0}
          visible={visibleSingle}
          onRequestClose={() => setIsvisibleSingle(false)} />
        }
      </>}
    </Screen >
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $body: ViewStyle = {
  padding: spacing.sm
}

const $title: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 16,

  paddingVertical: spacing.sm,
  color: colors.palette.secondary500,
  lineHeight: 18,

}
const $normalText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 16,
  color: colors.palette.secondary500,


}
const $cartButton: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  borderRadius: 7,
  marginTop: spacing.md,
  minHeight:45


}
