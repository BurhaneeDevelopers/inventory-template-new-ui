import React from 'react'
import Container from './Container'

const PageWapper = ({ children }: React.PropsWithChildren) => {
  return (
    <Container className="">
      {/* <Tabs /> */}

      <div className="bg-white shadow-md mt-7 flex flex-col gap-4 p-3 px-5">{children} </div>
    </Container>
  )
}

export default PageWapper
