import React, { createContext, useContext, useEffect, useState } from 'react';
import WebMIDILaunchControl from "../launch-control/WebMIDILaunchControl";

const MidiContext = createContext<typeof WebMIDILaunchControl | null>(null);

interface MidiProviderProps {
    children: React.ReactNode;
}

// @ts-ignore
export const MidiProvider: React.FC<MidiProviderProps> = ({ children }) => {
    const [lc, setLc] = useState<typeof WebMIDILaunchControl | null>(null);

    useEffect(() => {
        // @ts-ignore
        const lcInstance = new WebMIDILaunchControl();
        const openDevice = async () => {
            await lcInstance.open();
            setLc(lcInstance);
        };
        openDevice().then(() => console.log('Device Opened'));

        return () => lcInstance.close();
    }, []);

    return (
        <MidiContext.Provider value={lc}>
            {children}
        </MidiContext.Provider>
    );
};

export const useMidi = () => useContext(MidiContext);