"use client"
import { Box, Flex, Text, Button, Heading } from "@radix-ui/themes";
import { useParams } from "next/navigation"
import { Pause } from "lucide-react"
import CardComponent from "@/components/Live/CardComponent"
import Chart from "@/components/Landing/quickmonitor/Chart";
import { useState } from "react";
import Navbar from "@/components/Navbar";


interface ChartData {
  date: string
  indiaServer: number
  usaServer: number
}

  

export default function LivePage() {
    const { url } = useParams();
    const decodeURL = decodeURIComponent(url as string);
    const chartData = useState  <ChartData[]>([
        { date: '2024-04-02', indiaServer: 45, usaServer: 78 },
        { date: '2024-04-05', indiaServer: 52, usaServer: 82 },
        { date: '2024-04-08', indiaServer: 38, usaServer: 95 },
        { date: '2024-04-11', indiaServer: 67, usaServer: 73 },
        { date: '2024-04-14', indiaServer: 41, usaServer: 88 },
        { date: '2024-04-17', indiaServer: 55, usaServer: 76 },
        { date: '2024-04-20', indiaServer: 49, usaServer: 91 },
        { date: '2024-04-23', indiaServer: 63, usaServer: 69 },
        { date: '2024-04-26', indiaServer: 44, usaServer: 84 },
        { date: '2024-04-29', indiaServer: 58, usaServer: 77 },
        { date: '2024-05-02', indiaServer: 42, usaServer: 89 },
        { date: '2024-05-05', indiaServer: 71, usaServer: 65 },
        { date: '2024-05-08', indiaServer: 39, usaServer: 92 },
        { date: '2024-05-11', indiaServer: 66, usaServer: 74 },
        { date: '2024-05-14', indiaServer: 47, usaServer: 86 },
        { date: '2024-05-17', indiaServer: 53, usaServer: 79 },
        { date: '2024-05-20', indiaServer: 61, usaServer: 72 },
        { date: '2024-05-23', indiaServer: 35, usaServer: 94 },
        { date: '2024-05-26', indiaServer: 69, usaServer: 68 },
        { date: '2024-05-29', indiaServer: 48, usaServer: 87 },
        { date: '2024-06-02', indiaServer: 56, usaServer: 75 },
        { date: '2024-06-05', indiaServer: 43, usaServer: 90 },
        { date: '2024-06-08', indiaServer: 64, usaServer: 71 },
        { date: '2024-06-11', indiaServer: 37, usaServer: 93 },
        { date: '2024-06-14', indiaServer: 59, usaServer: 78 },
        { date: '2024-06-17', indiaServer: 46, usaServer: 85 },
        { date: '2024-06-20', indiaServer: 62, usaServer: 73 },
        { date: '2024-06-23', indiaServer: 40, usaServer: 88 },
        { date: '2024-06-26', indiaServer: 68, usaServer: 67 },
        { date: '2024-06-30', indiaServer: 51, usaServer: 81 }
      ])
  return (
    <Flex width="100%" className="bg-zinc-900" height="100vh" justify="center" direction="column" align="center" >
        <Navbar />
      <Flex height="100%" width="90%" mt="8" direction="column" justify="between">
        <Box>
          <Heading size="8" className="text-white mb-2">{decodeURL}</Heading>
          <Flex align="center" gap="3">
            <Box width="12px" height="12px" className="bg-green-500 rounded-full" />
            <Text className="text-green-500 font-medium">Up</Text>
            <Text className="text-gray-400 text-sm">Checked every 3 minutes</Text>
          </Flex>
                  {/* butttons */}
        <Flex direction="row" gap="4" mt="4">
            <Button variant="outline">
                <Pause size={16} />
                Pause
            </Button>
        </Flex>
        </Box>

        {/* Metrics Cards */}
        <Flex gap="6" wrap="wrap" mt="4">
          <CardComponent title="Currently up for" value="13 mins 13 seconds" />
          <CardComponent title="Last checked at" value="just now" />
          <CardComponent title="Incidents" value="0" />
        </Flex>
        {/* chart */}
        <Box mt="4">
            <Chart data={chartData} />
        </Box>
     </Flex>
    </Flex>
  )
}

