declare module "LaunchControl" {
    import { EventEmitter } from "events";
    import MIDIDevice from "MIDIDevice";

    export type TrackSelector = "all" | "even" | "odd" | string;
    export type ColorName = "off" | "dark red" | "red" | "light red" | "dark green" | "dark amber" | "green" | "amber" | "light green" | "light amber";
    export type Color = ColorName | number;


    export interface ParsedMessage {
        dataType: "pad" | "knob1" | "knob2" | "cursor";
        track?: number;
        value: number;
        channel: number;
        direction?: "up" | "down" | "left" | "right";
    }

    interface LaunchControlMessage extends ParsedMessage {
        type: "message";
        deviceName: string;
    }

    export function parseMessage(st: number, d1: number, d2: number): ParsedMessage | null;
    export function buildLedData(track: TrackSelector | number, color: Color, channel?: number): number[][];

    export type ExtendedLaunchControl<T extends MIDIDevice> = T & {
        led(track: TrackSelector | number, color: Color, channel?: number): void;
        on(event: "message", listener: (msg: LaunchControlMessage) => void): ExtendedLaunchControl<T>;
        on(event: string, listener: Function): ExtendedLaunchControl<T>;
    };

    export function _extends<T extends typeof MIDIDevice>(MIDIDevice: T): {
        new (deviceName?: string): ExtendedLaunchControl<InstanceType<T>>;
    };

    const LaunchControl: {
        extends: typeof _extends;
        parseMessage: typeof parseMessage;
        buildLedData: typeof buildLedData;
    };

    export default LaunchControl;
}

declare module "NodeMIDILaunchControl" {
    import NodeMIDIDevice from "NodeMIDIDevice";
    import LaunchControl from "LaunchControl";

    const NodeMIDILaunchControl: ReturnType<typeof LaunchControl.extends<typeof NodeMIDIDevice>>;
    export default NodeMIDILaunchControl;
}

declare module "WebMIDILaunchControl" {
    import WebMIDIDevice from "WebMIDIDevice";
    import LaunchControl from "LaunchControl";

    const WebMIDILaunchControl: ReturnType<typeof LaunchControl.extends<typeof WebMIDIDevice>>;
    export default WebMIDILaunchControl;
}