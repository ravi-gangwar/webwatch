"use client"
import { Flex, Button } from "@radix-ui/themes";

export default function Navbar() {

  return (
    <Flex
      width="100%"
      px="4"
      py="4"
      direction="row"
      justify="end"
      align="center"
      gap="4"
      position="absolute"
      top="0"
    >      
      <Flex gap="3" align="center">        
        <Button
          variant="soft"
          size={{ initial: "2", sm: "3", md: "4" }}
        >
          Get Started
        </Button>
      </Flex>
    </Flex>
  );
}
