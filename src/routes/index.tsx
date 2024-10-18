import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import MidiButtonDetector from "../components/PadButton";
import PadButton from "../components/PadButton";
import RotaryKnob from "../components/RotaryKnob";
import {Github, GithubIcon} from "lucide-react";
import NovationBoard from "../components/NovationBoard";

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {

  return (
      <div className={"p-4 flex gap-4 w-full h-full min-h-[100vh] items-center justify-center bg-slate-300"}>
        <NovationBoard/>
      </div>
  )
}
