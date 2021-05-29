import {Replay} from "vimond-replay";
import 'vimond-replay/index.css';
import HlsjsVideoStreamer from 'vimond-replay/video-streamer/hlsjs';


export const VideoPlayer = ({ url }) => {
    return (
    <Replay
        options={{
            controls: {
                includeControls: [
                    'playPauseButton',
                    'timeline',
                    'timeDisplay',
                    'volume',
                    'fullscreenButton',
                ],
            },
            interactionDetector: {
                inactivityDelay: 10,
            },
        }}
        source={url}
        initialPlaybackProps={{ isPaused: true }}
    >
        <HlsjsVideoStreamer />
    </Replay>
    )
}

export default VideoPlayer;