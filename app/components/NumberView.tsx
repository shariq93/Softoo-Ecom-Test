import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface NumberViewProps {
  number:number
  style?: StyleProp<TextStyle>
}

export const NumberView = observer(function NumberView(props: NumberViewProps) {
  const { style,number } = props
  const $styles = [$text, style]
  let formateNumber = number
  if(isNaN(number)) formateNumber = 0
  return (
    <Text size="xs" style={$styles}>{"$ "+formateNumber.toFixed(2)}</Text>
  )
})


const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.neutral900,
}
