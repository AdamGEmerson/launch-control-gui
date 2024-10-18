declare module "MIDIDevice" {
    import { EventEmitter } from "events";

    export default class MIDIDevice extends EventEmitter {
        constructor(deviceName: string);

        static requestDeviceNames(): Promise<{ inputs: string[], outputs: string[] }>;

        get deviceName(): string;

        open(): Promise<[any, any]>;
        close(): Promise<[any, any]>;
        send(data: Uint8Array | number[]): void;

        protected _input: any;
        protected _output: any;
        protected _deviceName: string;
        protected _onmidimessage(message: { receivedTime: number, data: Uint8Array }): void;
    }
}

declare module "NodeMIDIDevice" {
    import MIDIDevice from "MIDIDevice";

    export default class NodeMIDIDevice extends MIDIDevice {
        static requestDeviceNames(): Promise<{ inputs: string[], outputs: string[] }>;

        open(): Promise<[any, any]>;
        close(): Promise<[any, any]>;
        send(data: Uint8Array | number[]): void;
    }
}

declare module "TestMIDIDevice" {
    import MIDIDevice from "MIDIDevice";

    export function convertMessage(value?: { receivedTime?: number, data?: Uint8Array | number[] } | Uint8Array | number[]): { receivedTime: number, data: Uint8Array };

    export default class TestMIDIDevice extends MIDIDevice {
        static requestDeviceNames(): Promise<{ inputs: string[], outputs: string[] }>;

        open(): Promise<[any, any]>;
        close(): Promise<[any, any]>;
        send(data: Uint8Array | number[]): void;
    }
}