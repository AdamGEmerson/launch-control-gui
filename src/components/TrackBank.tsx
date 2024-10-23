import React from 'react';
import PadButton from "./PadButton";
import RotaryKnob from "./RotaryKnob";
import {useLaunchControlStore} from "../stores/launchControlStore";
import {Color} from "LaunchControl";
import {useMidi} from "./MidiConext";

function TrackBank({trackId}: { trackId: number }) {

    // Access the store
    const tracks = useLaunchControlStore((state) => state.tracks);
    const updateTrack = useLaunchControlStore((state) => state.updateTrack);

    // Access the MIDI controller
    const lc = useMidi();

    // Update the knob value in the store
    const updateKnob = (knobId: string, value: number) => {
        updateTrack(trackId, {
            ...tracks[trackId],
            [knobId]: value
        });
    }

    // Update the pad color in the store and on the controller
    const updatePad = () => {
      let newColor: Color;
      switch (tracks[trackId].color) {
        case 'off':
          newColor = 'light red';
          break;
        // case 'light red':
        //   newColor = 'red';
        //   break;
        case 'light red':
          newColor = 'light amber';
          break;
        // case 'dark red':
        //   newColor = 'light amber'
        //   break;
        // case 'light amber':
        //   newColor = 'amber'
        //   break;
        case 'light amber':
          newColor = 'light green'
          break;
        // case 'dark amber':
        //   newColor = 'light green';
        //   break;
        // case 'light green':
        //   newColor = 'green';
        //   break;
        case 'light green':
          newColor = 'off';
          break;
        default:
          newColor = 'off';
        }

        // Update the store with the new pad value
        updateTrack(trackId, {
            ...tracks[trackId],
            color: newColor
        });

        lc?.led(trackId, newColor); // Update controller
    }

    return (
        <div className={'flex md:flex-col h-full gap-4 p-4 bg-zinc-700 rounded-2xl bg-opacity-20'}>
            <h1 className={'text-xl flex justify-center items-center font-semibold text-zinc-400'}>{trackId + 1}</h1>
            <RotaryKnob onChange={updateKnob} trackId={trackId} knobId={'knob1'}/>
            <RotaryKnob onChange={updateKnob} trackId={trackId} knobId={'knob2'}/>
            <PadButton buttonID={trackId} onChange={updatePad} />
        </div>
    );
}

export default TrackBank;