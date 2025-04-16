import React from 'react'

const PageTitileBar = ({ title, children }: React.PropsWithChildren<{ title: string }>) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <h1 className="text-2xl font-medium text-zinc-700 uppercase">{title}</h1>
      {children}
    </div>
  )
}

export default PageTitileBar
