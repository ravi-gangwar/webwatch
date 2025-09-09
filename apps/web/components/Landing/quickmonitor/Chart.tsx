import React from 'react'
import { Box } from '@radix-ui/themes'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function Chart({ data }: { data: any }) {
  return (
    <Box width="100%" maxWidth="95vw" height="40vh" className="bg-transparent">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="date" 
          stroke="#9CA3AF"
          fontSize={12}
          tickFormatter={(value: string) => {
            const date = new Date(value)
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }}
        />
        <YAxis 
          stroke="#9CA3AF"
          fontSize={12}
          label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft' }}
        />
        <TooltipComponent />
        <AreaComponent dataKey="indiaServer" stroke="#20447A" fill="#20447A" fillOpacity={0.6} />
        <AreaComponent dataKey="usaServer" stroke="#364555" fill="#364555" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  </Box>
  )
}


const TooltipComponent = () => {
    return <Tooltip 
    contentStyle={{
      backgroundColor: '#1F2937',
      border: '1px solid #374151',
      borderRadius: '8px',
      color: '#F9FAFB'
    }}
    formatter={(value: number, name: string): [string, string] => [`${value}ms`, getServerName(name)]}
    labelFormatter={(label: string) => `Date: ${new Date(label).toLocaleDateString()}`}
  />
  }
  
  const AreaComponent = ({dataKey, stroke, fill, fillOpacity}: {dataKey: string, stroke: string, fill: string, fillOpacity: number}) => {
    return <Area 
      type="monotone" 
      dataKey={dataKey} 
      stackId="1"
      stroke="#9CA3AF" 
      fill={fill}
      fillOpacity={fillOpacity}
    />
  }
  
  const getServerName = (name: string) => {
    return name === 'indiaServer' ? 'India' : 'USA'
  }

export default Chart