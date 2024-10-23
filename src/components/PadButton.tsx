import React, { useEffect, useState } from 'react';
import {ParsedMessage} from 'LaunchControl';
import {useMidi} from "./MidiConext";
import {useLaunchControlStore} from "../stores/launchControlStore";


interface PadButtonProps {
    buttonID: number;
    onChange: (buttonID: number) => void;
}

const padStyles = {
    off: 'bg-gradient-to-br from-slate-300 to-slate-400 shadow-lg',
    "light red": 'bg-gradient-to-br from-rose-400 to-red-600 from-10% to-90% ring-red-300 shadow-none opacity-80',
    "light green": 'bg-gradient-to-br from-green-300 to-teal-600 from-10% to-90% ring-green-300 shadow-none',
    "light amber": 'bg-gradient-to-br from-amber-300 to-orange-600 from-10% to-90% ring-amber-300 shadow-none'
};

const glowStyles = {
    off: '',
    "light red": 'bg-gradient-to-br from-rose-600 to-red-600 rounded-lg blur opacity-80',
    "light green": 'bg-gradient-to-br from-green-600 to-teal-600 rounded-lg blur opacity-80',
    "light amber": 'bg-gradient-to-br to-orange-600 from-amber-600 rounded-lg blur opacity-80'
}

const PadButton = ({buttonID, onChange}: PadButtonProps) => {

    const lc = useMidi();
    const tracks = useLaunchControlStore(state => state.tracks);
    const [style, setStyle] = useState('bg-gradient-to-br from-neutral-300 to-neutral-400');

    // Forwards the click (or pad press) event to the parent component
    const handleClick = () => {
        onChange(buttonID);
    }

    // Event listener for the pad button presses
    useEffect(() => {
        if (!lc) return;
        const handleMessage = (message: ParsedMessage) => {
            if (message.dataType === 'pad' && message.value === 127 && message.track === buttonID) {
                handleClick();
            }
        };
        lc.on('message', handleMessage);
        return () => {
            lc.off('message', handleMessage);
        };
    }, [lc, tracks]);

    // Update button styles based on the current color of the track
    useEffect(() => {
        setStyle(padStyles[tracks[buttonID].color as keyof typeof padStyles]);
    }, [tracks]);

    return (
        <button className={'mx-auto relative'} onClick={() => handleClick()}>
            <div
                className={`absolute -inset-1 ${glowStyles[tracks[buttonID].color as keyof typeof glowStyles]}`}></div>
            <div
                className={"h-16 w-16 md:h-24 md:w-24 ring-2 ring-neutral-200 rounded flex items-center justify-center " + style}
            >
                <span className={'font-bold text-xl text-zinc-100 z-20 opacity-50'}>{buttonID + 1}</span>
            </div>
        </button>
    );
};

export default PadButton;
