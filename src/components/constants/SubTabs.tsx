import React from 'react'

interface Section {
  title: string
  key: string
}

interface SubTabsProps {
  sections: Section[]
  activeTab: string
  onTabChange: (key: string) => void
}

const SubTabs: React.FC<SubTabsProps> = ({ sections, activeTab, onTabChange }) => {
  return (
    <div className="bg-white shadow-sm flex w-full">
      {sections.map(section => (
        <button
          key={section.key}
          onClick={() => onTabChange(section.key)}
          className={`flex-grow text-center capitalize p-2 transition-colors duration-200 ${
            activeTab === section.key ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-800'
          }`}
        >
          {section.title}
        </button>
      ))}
    </div>
  )
}

export default SubTabs
