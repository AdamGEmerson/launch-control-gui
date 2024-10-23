import React, { useState, useRef, useEffect } from 'react'
import {useMidi} from "./MidiConext";
import {Track, useLaunchControlStore} from "../stores/launchControlStore";
import {ParsedMessage} from "LaunchControl";

interface RotaryKnobProps {
    onChange: (knobId: string, value: number) => void
    min?: number
    max?: number
    trackId: number
    knobId: keyof Omit<Track, "color">
}

export default function RotaryKnob({ onChange, min=0, max=127, trackId, knobId }: RotaryKnobProps) {

    const lc = useMidi();
    const tracks = useLaunchControlStore(state => state.tracks);

    const knobRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startY, setStartY] = useState(0)
    const [startValue, setStartValue] = useState(0)

    // Listen for knob changes from the controller and pass to onChange()
    useEffect(() => {
        if (!lc) return;

        const handleMessage = (message: ParsedMessage) => {
            if (message.dataType === knobId && message.track === trackId) {
                onChange(knobId, message.value)
            }
        };

        lc.on('message', handleMessage);

        return () => {
            lc.off('message', handleMessage);
        };
    }, [lc, tracks])

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartY(e.clientY)
        setStartValue(tracks[trackId][knobId])
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    // Handles the knob rotation in UI and forwards the value to onChange()
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        const deltaY = startY - e.clientY
        const deltaValue = (deltaY / 100) * (max - min)
        const newValue = Math.min(max, Math.max(min, startValue + deltaValue))
        onChange(knobId, Math.round(newValue))
    }

    // Knob rotation event listeners
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, startY, startValue])

    const rotation = tracks[trackId] ? ((tracks[trackId][knobId] - min) / (max - min)) * 290 - 145 : 0 // -145 to 145 degrees

    return (
        tracks[trackId] &&
                <div className="-rotate-90 md:rotate-0 flex flex-col items-center justify-center h-16 w-16 md:h-24 md:w-24">
                    <div className={"flex w-12 h-12 md:h-16 md:w-16 bg-transparent rounded-full border-4 border-zinc-700 justify-center items-center"}>
                        <div
                            ref={knobRef}
                            className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-black shadow-inner cursor-pointer"
                            onMouseDown={handleMouseDown}
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                transition: 'transform 0.1s ease-out',
                            }}
                        >
                            <div className="absolute top-0 left-1/2 w-1 h-4 rounded bg-slate-50 -translate-x-1/2"/>
                        </div>
                    </div>
                    <span className="hidden md:display mt-2 text-sm font-medium text-slate-600">{tracks[trackId][knobId]}</span>
                </div>
    )
}