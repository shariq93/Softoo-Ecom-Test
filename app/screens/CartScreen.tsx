import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { ProductCartListItem } from "app/components/ProductCartListItem"
import { useHeader } from "app/utils/useHeader"
import { colors } from "app/theme"

interface CartScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Cart">> { }

export const CartScreen: FC<CartScreenProps> = observer(function CartScreen() {

  const { cart } = useStores()
  const { cartData,isLoading } = cart

  const navigation = useNavigation()
  useHeader({ title: 'Cart',leftIcon:'back',onLeftPress:()=>  navigation.goBack()})
  return (
    <Screen style={$root} preset="fixed">
     
       <FlatList

        data={cartData}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <>{!isLoading && <EmptyState contentStyle={{color:colors.palette.neutral400}} content="There is no item in the cart" />}</>
        }
        renderItem={({ item }) =><ProductCartListItem data={item} />}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
