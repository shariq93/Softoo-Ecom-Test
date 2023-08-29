import * as React from "react"
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"

import { colors } from "../theme"


export interface NumberViewProps {
  number: number
  style?: StyleProp<TextStyle>
}

export const NumberView = (props: NumberViewProps) => {
  const { style, number } = props
  const $styles = [$text, style]
  let formateNumber = number
  if (isNaN(number)) formateNumber = 0
  return (
    <Text  style={$styles}>{"$ " + formateNumber.toFixed(2)}</Text>
  )
}


const $text: TextStyle = {

  fontSize: 14,
  color: colors.palette.neutral900,
}
