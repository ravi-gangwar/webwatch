import React from 'react'
import { cn } from '@/lib/utils'

interface ChartProps {
  data: Array<{
    time: string
    responseTime: number
    status: 'up' | 'down'
  }>
  className?: string
}

export function Chart({ data, className }: ChartProps) {
  return (
    <div className={cn("w-full h-64 bg-gray-900/50 rounded-lg p-4", className)}>
      <div className="text-white text-sm mb-2">Response Time (ms)</div>
      <div className="h-full flex items-end space-x-1">
        {data.map((point, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 rounded-t transition-all duration-300",
              point.status === 'up' 
                ? "bg-gradient-to-t from-green-500 to-green-400" 
                : "bg-gradient-to-t from-red-500 to-red-400"
            )}
            style={{ height: `${Math.max((point.responseTime / 1000) * 100, 5)}%` }}
            title={`${point.time}: ${point.responseTime}ms`}
          />
        ))}
      </div>
      <div className="text-gray-400 text-xs mt-2">
        Latest: {data[data.length - 1]?.time || 'No data'}
      </div>
    </div>
  )
}
