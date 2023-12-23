import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

interface ITextLetMeProps extends TextProps{
  title: string
}

export const TextLetMe: React.FC<ITextLetMeProps> = ({ title, ...rest }) => {
  return (
    <Text fontSize={14} color={"#737380"} mt={16} {...rest}>
      { title }
    </Text>
  )
}
