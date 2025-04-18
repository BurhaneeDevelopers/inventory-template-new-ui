import React from 'react'
import Container from './Container'

interface PageWrapperProps {
  className?: string
}

const PageWapper = ({ children, className }: React.PropsWithChildren<PageWrapperProps>) => {
  return (
    <Container className="">
      {/* <Tabs /> */}

      <div className={`bg-white shadow-sm mt-7 flex flex-col gap-4 p-3 px-5 ${className}`}>
        {children}{' '}
      </div>
    </Container>
  )
}

export default PageWapper
