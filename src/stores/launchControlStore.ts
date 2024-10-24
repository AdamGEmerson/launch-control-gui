import { create } from 'zustand'
import { Color } from "LaunchControl";

export type Track = {
    color: Color
    knob1: number
    knob2: number
}

type State = {
    tracks: Track[]
}

type Action = {
    updateTrack: (trackIndex: number, track: Track) => void
}

// Populate the store with some initial state
const tracks: Track[] = Array.from({ length: 8 }, () => ({
    color: 'off',
    "knob1": 0,
    "knob2": 0
}))

export const useLaunchControlStore = create<State & Action>((set) => ({
    tracks: tracks,
    updateTrack: (trackIndex, track) => set((state) => ({
        tracks: state.tracks.map((t, index) => index === trackIndex ? track : t)
    }))
}))

