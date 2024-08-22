import React from 'react';

const Toggle = ({ isPolkadot, onToggle }) => {
    return(
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${!isPolkadot ? 'font-bold' : ''}`}>Kusama</span>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E6007A] focus:ring-offset-2 ${
              isPolkadot ? 'bg-[#E6007A]' : 'bg-gray-300'
            }`}
            onClick={onToggle}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isPolkadot ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${isPolkadot ? 'font-bold' : ''}`}>Polkadot</span>
        </div>
    )
}

export default Toggle