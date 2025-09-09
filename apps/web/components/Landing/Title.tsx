import { Flex, Text, TextProps } from '@radix-ui/themes'
import React from 'react'

function Title({ title, description, titleProps, descriptionProps }: { title: string, description: string, titleProps?: TextProps, descriptionProps?: TextProps }) {
  return (
    <Flex direction="column" align="center" gap="2">
        <Text {...titleProps}>
            {title}
        </Text>
        <Text {...descriptionProps}>
            {description}
        </Text>
    </Flex>
  )
}

export default Title