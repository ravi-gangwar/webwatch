"use client"
import { Box, Button, Flex } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
function GoMonitor() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  return (
    <Flex width={"100%"} justify="center" className="gap-2" direction={{ initial: "column", sm: "row", md: "row" }} align="center">
        <Box className="md:min-w-[30%] min-w-[90%] h-[60px] border-2 border-t-0 border-l-0 border-r-0 border-red-200"  maxWidth="300px">
            <input onChange={(e) => setUrl(e.target.value)} className="min-w-[100%] h-[100%] bg-transparent outline-none text-2xl md:text-4xl text-red-200" autoFocus placeholder="https://yourwebsite.com..." />
        </Box>
        <Button onClick={() => router.push(`/live/${encodeURIComponent(url)}`)} className="cursor-pointer lg:h-[90px]" variant="surface" size={{ initial: "4", sm: "3", md: "4" }}>
            G O
        </Button>
    </Flex> 
  )
}

export default GoMonitor