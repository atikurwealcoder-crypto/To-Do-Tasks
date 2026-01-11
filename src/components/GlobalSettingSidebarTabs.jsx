import React from 'react'

const GlobalSettingSidebarTabs = ({ activeTab, onChange }) => {
 const tabs = [
    { id: "scroll_smoother", label: "Scroll Smoother" },
    { id: "global", label: "Global Value" },
    { id: "import_export", label: "Import / Export" },
    { id: "page_transition", label: "Page Transition" },
  ];

  return (
    <div className="w-56 bg-[#1f1f22] border-r border-[#2b2b2f]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`w-full text-left px-4 py-3 text-sm transition
            ${
              activeTab === tab.id
                ? "bg-[#2a2a2e] text-white"
                : "text-gray-400 hover:bg-[#2a2a2e]"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default GlobalSettingSidebarTabs;