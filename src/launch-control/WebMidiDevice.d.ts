declare module "src/types/WebMidiDevice" {
    import MIDIDevice from "MIDIDevice";

    export default class WebMIDIDevice extends MIDIDevice {
        static requestDeviceNames(): Promise<{ inputs: string[], outputs: string[] }>;

        open(): Promise<[any, any]>;
        close(): Promise<[any, any]>;
        send(data: Uint8Array | number[]): void;

        private _access: any;
    }
}