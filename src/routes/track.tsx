import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import TrackBank from "../components/TrackBank";
import {useLaunchControlStore} from "../stores/launchControlStore";

export const Route = createFileRoute('/track')({
    component: TrackRoute,
})

function TrackRoute() {

    const tracks = useLaunchControlStore((state) => state.tracks);
    const updateTrack = useLaunchControlStore((state) => state.updateTrack);

    const [value, setValue] = React.useState(0);
    const [multiplier, setMultiplier] = React.useState(1);

    // Must update the track in the store to re-render the component
    const updateGUI = (trackId: number, key:string, value: any) => {
        updateTrack(trackId, {
            ...tracks[trackId],
            [key]: value
        });
    }

    // Create onChange functions for knobs and buttons
    const updateKnob = (knobId: string, knobVal: number) => {
        // DO SOME STUFF
        console.log("KNOB TURNED: ", knobId, knobVal)
        updateGUI(0, knobId, knobVal);
        setValue(knobVal);

        if (knobId === 'knob1') {
            setValue(knobVal);
        }
        if (knobId === 'knob2') {
            setMultiplier(knobVal);
        }
    }

    const updateButton = (trackIndex: number) => {
        // DO SOME STUFF
        console.log("BUTTON PRESSED: ", trackIndex)
        setValue(0);
    }

    return (
        <>
            <div className="p-2 flex justify-center h-1/2">
                <TrackBank trackId={0} updateButton={updateButton} updateKnob={updateKnob}/>
            </div>
            <div className={'text-2xl font-bold flex justify-center'}>
                Value: {value * multiplier}
            </div>
        </>
    )
}
