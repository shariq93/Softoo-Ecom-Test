import * as React from "react"
import { ActivityIndicator, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { Feather } from '@expo/vector-icons';
import { Product, useStores } from "../models"
import { useState } from "react"
import { SkeletonView } from "./SkeletonView"
export interface ProdcutCountViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data: Product
  onPlus?: (qty: string) => void
  onMinus?: (qty: string) => void
  onDelete?: () => void
}

/**
 * Describe your component here
 */
export const ProdcutCountView = observer(function ProdcutCountView(props: ProdcutCountViewProps) {
  const { style, data, onPlus, onMinus, onDelete } = props
  const $styles = [$container, style]
  const { cart } = useStores()

  const [count, setCount] = useState(data?.qty.toString())
  return (
    <View style={{
      flexDirection: 'row', width: 120,
      justifyContent: 'space-between', borderRadius: 5,
      paddingHorizontal: spacing.xs, marginTop: spacing.xs, alignItems: 'center'
    }}>
      {!false && <>
        <Feather name="minus" style={{ backgroundColor: colors.palette.neutral200, width: 30, textAlign: 'center' }} size={20} color="black" onPress={() => {
          if (Number(count) > 1) {
            onMinus((Number(count) - 1) + '')
            setCount((Number(count) - 1) + '')
          } else {
            onDelete()
          }
        }} />
        {/* {loadingUpdate && <View style={{ width: 40 }}><ActivityIndicator /></View>} */}
        <Text style={{ fontFamily: typography.primary.bold, backgroundColor: '#fff', width: 40, textAlign: 'center' }}>{count}</Text>

        <Feather name="plus"
          onPress={() => {
            setCount((Number(count) + 1) + '')
            onPlus((Number(count) + 1) + '')

          }}
          style={{ backgroundColor: colors.palette.neutral200, width: 30, textAlign: 'center' }} size={20} color="black" />
      </>}
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
