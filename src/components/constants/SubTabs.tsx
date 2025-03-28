import React from 'react'
import { Link, useLocation } from 'react-router'

interface Section {
  title: string
  redirectTo: string
  params: string
}

interface ChildComponentProps {
  sections: Section[]
}

const SubTabs: React.FC<ChildComponentProps> = ({ sections }) => {
  const location = useLocation()

  return (
    <div className="bg-white shadow-sm flex flex-row w-full">
      {sections.map(section => (
        <TabItem
          key={section.title}
          title={section.title}
          redirectTo={section.redirectTo}
          active={location.pathname.includes(section.params)}
        />
      ))}
    </div>
  )
}

export default SubTabs

const TabItem = ({
  active,
  title,
  redirectTo,
}: {
  active: boolean
  title: string
  redirectTo: string
}) => {
  return (
    <Link
      to={redirectTo}
      className={`text-center capitalize flex-grow p-2 ${
        active ? 'bg-zinc-800 text-white' : 'bg-white'
      }`}
    >
      {title}
    </Link>
  )
}
