import React from 'react';
import TrackBank from "./TrackBank";

function NovationBoard() {
    const tracks = Array.from({length: 8}, (_, i) => i);

    return (
        <div
            className={"flex max-w-full gap-4 flex-col p-4 md:p-12 rounded-3xl shadow-xl bg-gradient-to-t from-zinc-950 to-zinc-800 via-zinc-900 via-20%"}>
            <div className={"w-full justify-end flex"}>
                <h1 className={"text-lg md:text-2xl font-bold text-red-400"}>
                    LAUNCH
                    <span className={'font-light text-slate-100'}>CONTROL</span>
                    <span className={'text-zinc-600 font-semibold'}>gui</span>
                </h1>
            </div>
            <div className="flex flex-col-reverse p-4 md:flex-row gap-4">
                {tracks.map((track) => <TrackBank trackId={track} key={track}/>)}
            </div>

        </div>
    );
}

export default NovationBoard;