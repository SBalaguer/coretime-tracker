import { useEffect, useState } from 'react'
import { SearchIcon, AlertCircle } from 'lucide-react'

import CoretimeCard from './../Components/CoretimeCard'
import Toggle from './../Components/Toggle'

export default function Home({ paras, workload, untilList, sale }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([])
    const [selectedParas, setSelectedParas] = useState([])
    const [isPolkadot, setIsPolkadot] = useState(false)
    const [isUrgent, setIsUrgent] = useState(false) 

    const filteredResults = paras ? (isPolkadot ? paras.polkadot : paras.kusama).filter(result => result.toString().toLowerCase().includes(searchTerm.toLowerCase())) : [];
    
    const handleSelect = (option) => {
      if (!selectedParas.includes(option)) {
        const workloadData = workload.data.filter(item => option === item.value[0].assignment.value)
        const active = workloadData.length ? true : false;
        const core = workloadData.length ? workloadData[0].keyArgs[0] : null;
        const until = untilList.filter(item => option === item.para)

        const fullOption = {
            paraID: option,
            core,
            active,
            until: until.length ? until[0].until : null
        }

        setSelectedParas([...selectedParas, option])
        setSelectedOptions([...selectedOptions, fullOption])
      }
      setSearchTerm('')
    }
    
    const handleTermSearch = (e) => {
        setSearchTerm(e)
    }

    const handleRemove = (option) => {
      setSelectedOptions(selectedOptions.filter(item => item.paraID !== option))
    }   

    const handleToggle = () => {
      // Polkadot must upgrade before we can make it available.
      // setIsPolkadot(!isPolkadot)
      // setSelectedOptions([])
    }

    //todo: de-duplicate this code.

    const handleShowUrgentRenewals = () => {
      const urgentRenewals = untilList.filter(item => item.until === sale.data.region_begin)
      let _selectedParas = []
      let _selectedParaIDs = []
      if (urgentRenewals.length) {
        urgentRenewals.map(item => {
          const workloadData = workload.data.filter(_item => item.para === _item.value[0].assignment.value)
          const active = workloadData.length ? true : false;
          const core = workloadData.length ? workloadData[0].keyArgs[0] : null;

          const fullOption = {
              paraID: item.para,
              core,
              active,
              until: item.until
          }
          
          _selectedParaIDs.push(item.para)
          _selectedParas.push(fullOption)

        })
      }

      setSelectedParas(_selectedParaIDs)
      setSelectedOptions(_selectedParas)

    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1E2730] to-[#1A1A1A] text-white font-sans">
          <div className="absolute top-4 right-4 z-10">
            <Toggle isPolkadot={isPolkadot} onToggle={handleToggle} />
          </div>
          <main className="flex-grow overflow-auto p-4">
            <div className="flex flex-col items-center">
              <div className={`w-full max-w-3xl transition-all duration-500 ease-in-out ${
                selectedOptions.length > 0 ? 'mt-16' : 'mt-[30vh]'
              }`}>
                <h1 className={`text-4xl font-bold text-center mb-8 transition-all duration-500 ${
                  selectedOptions.length > 0 ? 'text-2xl mb-4' : ''
                }`}>
                  {isPolkadot ? 'Polkadot' : 'Kusama'} Coretime Tracker
                </h1>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={(paras && sale) ? `Search ${isPolkadot ? 'Polkadot' : 'Kusama'} parachains...` : "Fetching data..."}
                    value={searchTerm}
                    onChange={(e) => handleTermSearch(e.target.value)}
                    className="w-full px-6 py-4 text-lg bg-[#1A1A1A] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#E6007A] shadow-lg placeholder-gray-400"
                    disabled={!(paras && sale)}
                  />
                  <SearchIcon className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  {searchTerm && (
                    <div className="mt-2 bg-[#1A1A1A] rounded-lg shadow-lg overflow-hidden absolute z-10 left-0 right-0">
                      {filteredResults.length > 0 ? (
                        filteredResults.map((result, index) => (
                          <div
                            key={index}
                            className="px-6 py-3 hover:bg-[#252525] cursor-pointer text-white border-b border-gray-700 last:border-b-0"
                            onClick={() => handleSelect(result)}
                          >
                            {result}
                          </div>
                        ))
                      ) : (
                        <div className="px-6 py-4 text-gray-400">No paraID found</div>
                      )}
                    </div>
                  )}
                </div >
                {sale &&
                  <div className="flex justify-end mt-2 mr-4">
                    <button
                      onClick={handleShowUrgentRenewals}
                      className="flex items-center text-[#E6007A] hover:text-[#FF3E9A] transition-colors duration-200 focus:outline-none"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Show urgent renewals
                    </button>
                  </div>
                }
              </div>
              <div className="w-full max-w-3xl mt-4">
                {selectedOptions.map((option, index) => (
                  <CoretimeCard key={index} core={option.core} until={option.until} para={option.paraID} active={option.active} onRemove={handleRemove} />
                ))}
              </div>
              {selectedOptions.length === 0 && !searchTerm && (
                <div className="mt-8 text-center text-xl font-light text-gray-300">
                  Track {isPolkadot ? 'Polkadot' : 'Kusama'} coretime slots.
                </div>
              )}
            </div>
          </main>
          
          <footer className="py-4 text-center text-gray-400">
            Made with ❤️ - XYZ
          </footer>
        </div>
    )
}