declare module "src/types/WebMidiLaunchControl" {
    import WebMIDIDevice from "src/types/WebMidiDevice";
    import {ExtendedLaunchControl} from "LaunchControl";

    const WebMIDILaunchControl: ExtendedLaunchControl<WebMIDIDevice>;
    export default WebMIDILaunchControl;
}