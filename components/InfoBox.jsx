import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title,containerStyle,subTitle,titleStyles}) => {
  return (
    <View className={containerStyle}>
            <Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
            <Text className={`text-gray-100 text-center text-sm font-pregular `}>{subTitle}</Text>

    </View>
  )
}

export default InfoBox