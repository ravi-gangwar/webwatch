import React from 'react'
import Title from './Title'

function MainTitle() {
  return (
    <Title
    title="Monitor your website with ease"
    description="Real-time website monitoring with instant alerts, performance tracking, and uptime statistics. Never miss downtime again."
    titleProps={{
      align: 'center',
      // size: { initial: "7", sm: "8", md: "9" },
      weight: "bold",
      className: "font-inter text-[40px] sm:text-lg lg:text-[70px] bg-gradient-to-r from-green-400 via-blue-500 to-orange-500 bg-clip-text text-transparent",
    }}
    descriptionProps={{
      align: 'center',
      size: { initial: "1", sm: "2", md: "3" },
      weight: "regular",
      className: "font-geist-sans text-white text-md sm:text-lg lg:text-[20px]",
    }}
  />
  )
}

export default MainTitle