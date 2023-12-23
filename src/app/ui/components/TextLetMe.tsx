import { Text } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export const TextLetMe: React.FC = ({ children }: PropsWithChildren) => {
  return (
    <Text fontSize={14} color={"#737380"} mt={16}>
      { children }
    </Text>
  )
}
