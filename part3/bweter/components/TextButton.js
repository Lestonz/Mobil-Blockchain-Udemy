import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS } from '../constants'

const TextButton = ({label, onPress, customContainerStyle, customLabelStyle, disabled}) => {
  return (
    <TouchableOpacity
        style={{
            height:60,
            width:'80%',
            alignItems:'center',
            justifyContent:'center',
            borderRadius: SIZES.radius,
            backgroundColor: disabled ? COLORS.gray : COLORS.primary,
            flexDirection:'row',
            ...customContainerStyle
        }}
        onPress={disabled ? null : onPress}
        disabled={disabled}
    >
        <Text style={{color:COLORS.white, ...FONTS.m2, ...customLabelStyle }} >
            {label}
        </Text>
    </TouchableOpacity>
  )
}

export default TextButton
