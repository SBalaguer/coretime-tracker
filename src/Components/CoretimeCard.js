import React, { useContext } from 'react';
import { XIcon, CheckCircleIcon, ClockIcon, UsersIcon, FlagIcon, SaveIcon, CogIcon, CopyXIcon } from 'lucide-react'

import RelayContext from '../Context/Relay';
import CoretimeContext from '../Context/Coretime';

import { formatBlock } from './../Services/formatBlock'
import { blockToTime } from './../Services/blockToTime'
import { formatDateToDDMMYY } from './../Services/formatDate'

import TimelineItem from './TimelineItem';

const KUSAMA_AVG_BLOCK = 6;
const POLKADOT_AVG_BLOCK = 6;
const REF_BLOCK_KSM = 24578797
const REF_BLOCK_KSM_TIMESTAMP = 1724251698000

const CoretimeCard = ({core, until, para, active, onRemove}) => {
    const { block } = useContext(RelayContext)
    const { timeslicePeriod, config } = useContext(CoretimeContext)

    const renewalBlockRelay = (until-config.data.region_length) * (timeslicePeriod.data)
    const untilBlockRelay = until * timeslicePeriod.data

    return(
        <div className="mt-4 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-800">paraID: {para}</span>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">{`Relay Block ${block ? formatBlock(block) : "Fetching..."}`}</span>
              <button
                onClick={() => onRemove(para, core)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          {active && until != 'r' && (
              <div className="p-6">
                  <TimelineItem 
                    icon={<ClockIcon className="h-5 w-5 text-gray-600" />} 
                    text={`Renewal window for Parachain starts on Relay Block: ${formatBlock(renewalBlockRelay)} (est. ${formatDateToDDMMYY(blockToTime(REF_BLOCK_KSM_TIMESTAMP, REF_BLOCK_KSM, renewalBlockRelay, KUSAMA_AVG_BLOCK))})`}
                    isActive={false} 
                  />
                  <TimelineItem 
                    icon={<FlagIcon className="h-5 w-5 text-gray-600" />} 
                    text={`Core valid for Parachin until Relay Block: ${formatBlock(until*timeslicePeriod.data)} (est. ${formatDateToDDMMYY(blockToTime(REF_BLOCK_KSM_TIMESTAMP, REF_BLOCK_KSM, untilBlockRelay, KUSAMA_AVG_BLOCK))})`}
                    isActive={false} 
                  />
                  <TimelineItem 
                    icon={<SaveIcon className="h-5 w-5 text-gray-600" />} 
                    text={`Assigned Core Number: ${core}`}
                    isActive={false} 
                  />
              </div>
          )}
          {
            active && until === 'r' && (
              <div className="p-6">
                <TimelineItem 
                      icon={<CogIcon className="h-5 w-5 text-gray-600" />} 
                      text={`System Parachain`}
                      isActive={false} 
                />
                <TimelineItem 
                  icon={<SaveIcon className="h-5 w-5 text-gray-600" />} 
                  text={`Assigned Core: ${core}`}
                  isActive={false} 
                />
              </div>
            )
          }
          {
            !active && (
              <div className="p-6">
                <TimelineItem 
                      icon={<CopyXIcon className="h-5 w-5 text-gray-600" />} 
                      text={`No active Core`}
                      isActive={false} 
                />
              </div>
            )
          }
        </div>
    )
}

export default CoretimeCard