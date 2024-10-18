import React, { useEffect, useState } from 'react';
import WebMIDILaunchControl from "../launch-control/WebMIDILaunchControl";
import {Color, ParsedMessage} from 'LaunchControl';
import {useMidi} from "./MidiConext";
import {useLaunchControlStore} from "../stores/launchControlStore";


interface PadButtonProps {
    buttonID: number;
}

const PadButton = ({buttonID}: PadButtonProps) => {

    const lc = useMidi();
    const tracks = useLaunchControlStore(state => state.tracks);
    const updateTrack = useLaunchControlStore(state => state.updateTrack);
    const [style, setStyle] = useState('bg-gradient-to-br from-neutral-300 to-neutral-400');

    const handleClick = () => {
        if (!lc) return;
        let color: Color;
        if (tracks[buttonID].color === 'off') {
            color = 'green';
        } else if (tracks[buttonID].color === 'green') {
            color = 'amber';
        } else if (tracks[buttonID].color === 'amber') {
            color = 'off';
        } else {
            return;
        }
        tracks[buttonID].color = color;
        updateTrack(buttonID, tracks[buttonID]);
    }

    const padStyles = {
        off: 'bg-gradient-to-br from-slate-300 to-slate-400 shadow-lg',
        green: 'bg-gradient-to-br from-green-300 to-teal-600 from-10% to-90% ring-green-300 shadow-none',
        amber: 'bg-gradient-to-br from-amber-300 to-orange-600 from-10% to-90% ring-amber-300 shadow-none'
    };

    const glowStyles = {
        off: '',
        green: 'bg-gradient-to-br from-green-600 to-teal-600 rounded-lg blur opacity-80',
        amber: 'bg-gradient-to-br to-orange-600 from-amber-600 rounded-lg blur opacity-80'
    }

    useEffect(() => {
        if (!lc) return;

        const handleMessage = (message: ParsedMessage) => {
            if (message.dataType === 'pad' && message.value === 127 && message.track === buttonID) {
                console.log(message.value);
                handleClick();
            }
        };

        lc.on('message', handleMessage);

        return () => {
            lc.off('message', handleMessage);
        };
    }, [lc, tracks]);

    useEffect(() => {
        console.log("Track color changed", tracks[buttonID].color);
        setStyle(padStyles[tracks[buttonID].color as keyof typeof padStyles]);
        lc?.led(buttonID, tracks[buttonID].color);
    }, [tracks]);

    return (
        <div className={'mx-auto relative'}>
            <div
                className={`absolute -inset-1 ${glowStyles[tracks[buttonID].color as keyof typeof glowStyles]}`}></div>
            <div
                className={"h-16 w-16 md:h-24 md:w-24 ring-2 ring-neutral-200 rounded flex items-center justify-center " + style}
                onClick={() => handleClick()}
            >
                <span className={'font-bold text-xl text-slate-50 z-20'}>{buttonID + 1}</span>
            </div>
        </div>
            );
            };

            export default PadButton;
