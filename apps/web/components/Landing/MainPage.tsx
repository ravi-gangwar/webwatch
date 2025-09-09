import { Flex } from '@radix-ui/themes'
import React from 'react'
import MainTitle from './MainTitle'
import GoMonitor from './GoMonitor'

function MainPage() {
  return (
    <Flex
    width="100%"
    height="100vh"
    px="4"
    direction="column"
    justify="center"
    gap="9"
    align="center"
  >
  <MainTitle />
  <GoMonitor />
  </Flex>
  )
}

export default MainPage