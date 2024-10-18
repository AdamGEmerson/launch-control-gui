import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import {MidiProvider} from "../components/MidiConext";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
      <MidiProvider>
          {/*<div className="p-2 px-8 flex gap-2 text-lg justify-between">*/}
          {/*  <Link*/}
          {/*    to="/"*/}
          {/*    activeProps={{*/}
          {/*      className: 'font-bold',*/}
          {/*    }}*/}
          {/*    activeOptions={{ exact: true }}*/}
          {/*  >*/}
          {/*    Launch Control GUI*/}
          {/*  </Link>{' '}*/}
          {/*  <Link*/}
          {/*    to="/about"*/}
          {/*    activeProps={{*/}
          {/*      className: 'font-bold',*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Help*/}
          {/*  </Link>*/}
          {/*</div>*/}
          <hr />
          <Outlet />
          <div className={"hidden md:block fixed bottom-0 right-0 m-4 rounded-2xl"}>
              <a href={'https://github.com/adamgemerson'} className={'underline text-slate-800'} target={"_blank"}>adamgemerson</a>
          </div>
      </MidiProvider>
  )
}
