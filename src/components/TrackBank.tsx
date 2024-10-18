import React from 'react';
import PadButton from "./PadButton";
import RotaryKnob from "./RotaryKnob";

function TrackBank({trackId}: { trackId: number }) {
    return (
        <div className={'flex md:flex-col h-full gap-4 p-4 bg-slate-700 rounded-2xl bg-opacity-20'}>
            <h1 className={'text-xl flex justify-center items-center font-semibold text-slate-400'}>{trackId + 1}</h1>
            <RotaryKnob onChange={() => console.log('Changed!')} trackId={trackId} knobId={'knob1'}/>
            <RotaryKnob onChange={() => console.log('Changed!')} trackId={trackId} knobId={'knob2'}/>
            <PadButton buttonID={trackId} />
        </div>
    );
}

export default TrackBank;