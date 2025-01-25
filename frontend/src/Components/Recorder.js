import { Button, Form } from 'antd'
import { 
    PlayCircleFilled, 
    DeleteOutlined, 
    CustomerServiceFilled, 
    PauseCircleFilled 
} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

export default function Recorder({ id, onAudioRecorded }) {
    const [recording, setRecording] = useState(false);
    const [recordedTime, setRecordedTime] = useState(0);
    const [audioData, setAudioData] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const wavesurfer = useRef(null);
    const mediaRecorder = useRef(null);
    const timer = useRef(null);

    useEffect(() => {
        // Clean up WaveSurfer instance on component unmount
        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, []);

    const handleRecord = () => {
        if (recording) return;

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const recorder = new MediaRecorder(stream);
            mediaRecorder.current = recorder;
            wavesurfer.current = WaveSurfer.create({
                container: "#waveform",
                waveColor: "black",
                progressColor: "green",
                height: 50,
                barWidth: 2,
                barGap: 2,
                responsive: true,
            });

            const audioChunks = [];
            recorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            recorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                const url = URL.createObjectURL(audioBlob);
                onAudioRecorded({
                    blob: audioBlob,
                    url: audioURL,
                    duration: recordedTime,
                });
                setAudioData(audioBlob);
                setAudioURL(url);
                wavesurfer.current.load(url);
                stream.getTracks().forEach((track) => track.stop());
            };

            recorder.start();
            setRecording(true);

            // Stop recording after 10 seconds
            let seconds = 0;
            timer.current = setInterval(() => {
                seconds += 1;
                setRecordedTime(seconds);

                if (seconds >= 9) {
                    console.log("Recording...", seconds);
                    handleStop();
                }
            }, 1000);
        });
    };

    const handleStop = () => {
        if (!recording || !mediaRecorder.current) return;

        mediaRecorder.current.stop(); // Stops the MediaRecorder
        clearInterval(timer.current); // Clears the timer
        setRecording(false); // Updates the recording state
        setRecordedTime(0); // Resets the timer visually
    };

    const handlePlay = () => {
        if (!wavesurfer.current) return;

        if (!isPlaying) {
            wavesurfer.current.play();
            setIsPlaying(true);
        } else {
            wavesurfer.current.pause();
            setIsPlaying(false);
        }

        // Listen to playback progress
        wavesurfer.current.on("audioprocess", () => {
            setRecordedTime(wavesurfer.current.getCurrentTime().toFixed(1));
        });

        // Listen to playback finish
        wavesurfer.current.on("finish", () => {
            setIsPlaying(false);
        });
    };

    const handleDelete = () => {
        setAudioData(null);
        onAudioRecorded({})
        setAudioURL(null);
        setRecordedTime(0);
        setIsPlaying(false);
        if (wavesurfer.current) {
            wavesurfer.current.destroy();
        }
    };

    return (
        <div>
            <Form.Item
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    color={recording ? "orange" : "primary"}
                    variant='filled'
                    icon={recording ?
                        <PauseCircleFilled style={{ fontSize: 25 }} /> :
                        <CustomerServiceFilled style={{ fontSize: 25 }} />}
                    size='large'
                    shape="circle"
                    onClick={recording ? handleStop : handleRecord}
                    style={{
                        padding: 30
                    }}
                >
                    {/* {recording ? "Stop" : "Record"} */}
                </Button>
            </Form.Item>
            <div id="waveform" style={{
                marginTop: audioURL ? "20px" : 0,
                backgroundColor: audioURL ? '#f2f3f5' : 'transparent',
                padding: 5,
                borderRadius: 5
            }}></div>
            <p style={{ marginTop: audioURL ? "10px" : 0, textAlign: "center" }}>
                {recording
                    ? `Recording... ${recordedTime}s`
                    : audioURL
                        ? `Recorded: ${recordedTime}s`
                        : ""}
            </p>
            {audioURL && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 15
                    }}
                >
                    <Button
                        color="cyan"
                        variant='filled'
                        icon={isPlaying ?
                            <PauseCircleFilled style={{ fontSize: 20 }} /> :
                            <PlayCircleFilled style={{ fontSize: 20 }} />}
                        size="large"
                        shape='circle'
                        onClick={handlePlay}
                        style={{
                            padding: 25,
                            marginRight: "10px"
                        }}
                    >
                    </Button>
                    <Button
                        color='red'
                        variant='filled'
                        icon={<DeleteOutlined style={{ fontSize: 20 }} />}
                        shape='circle'
                        size="large"
                        onClick={handleDelete}
                        style={{
                            padding: 25,
                        }}
                    >
                    </Button>
                </div>
            )}
        </div>
    )
}
