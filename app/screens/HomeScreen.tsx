import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps, navigate } from "app/navigators"
import { Button, CartIcon, EmptyState, Screen, Text } from "app/components"
import { useHeader } from "app/utils/useHeader"
import { Product, useStores } from "app/models"
import { ProductListItem } from "app/components/ProductListItem"
import { useNavigation } from "@react-navigation/native"
import { colors } from "app/theme/colors"
import { spacing } from "app/theme/spacing"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Feather } from '@expo/vector-icons';


interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> { }

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { products, menu } = useStores()
  const { products: productList, getProduct, isLoading } = products
  const { getMenu } = menu

  // Pull in navigation via hook
  const navigation = useNavigation()
  useHeader({
    'title': 'All Products', RightActionComponent: <CartIcon/>
  })
  useEffect(() => {
    getProduct()
    getMenu()
  }, [])
  return (
    <Screen style={$root} preset="fixed">
      {isLoading && <View style={{ marginTop: 50 }}>
        <ActivityIndicator color={'#333'} />
      </View>}

      <FlatList
        numColumns={2}
        data={productList}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <>{!isLoading && <EmptyState />}</>
        }
        renderItem={({ item }) => <ProductListItem onClick={() => {
          navigation.navigate('ProductDetails')
        }} item={item as Product} />}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $button: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  borderRadius: 7,
  marginTop: spacing.md,
  minHeight: 45


}