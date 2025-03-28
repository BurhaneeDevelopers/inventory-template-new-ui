import React from 'react'

const Container = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return (
    <div className={`flex flex-1 flex-col bg-gray-200 p-3 h-screen ${className}`}>{children}</div>
  )
}

export default Container
