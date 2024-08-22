import React from 'react';

const TimelineItem = ({ icon, text, isActive }) => {
    return(
      <div className="flex items-center mb-4 last:mb-0">
        <div className={`rounded-full p-1 ${isActive ? 'bg-[#E6007A]' : 'bg-gray-300'}`}>
          {icon}
        </div>
        <div className={`ml-3 ${isActive ? 'font-semibold' : 'text-gray-600'}`}>{text}</div>
      </div>
    )
}

export default TimelineItem