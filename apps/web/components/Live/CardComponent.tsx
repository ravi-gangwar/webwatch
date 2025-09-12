import React from 'react'
import { Flex, Text } from '@radix-ui/themes'

function CardComponent({title, value}: {title: string, value: string}) {
  return (
    <Flex direction="column" gap="2" px="4" py="4" className="bg-zinc-800 rounded-lg">
        <Text className="text-gray-400 text-sm mb-2">{title}</Text>
        <Text size="6" weight="bold" className="text-white">{value}</Text>
    </Flex>
  )
}

export default CardComponent    