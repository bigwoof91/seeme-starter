import React from 'react';
import { captureUserMedia, S3Upload } from './utils/rtc-utils';
import Webcam from './utils/webcam';
import RecordRTC from 'recordrtc';
import Playback from './utils/playback';
import mui from 'material-ui';
import MdIconPack from 'react-icons/lib/md';
const cookie = require('react-cookie');

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);

class PhotoBooth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recordVideo: null,
            src: null,
            uploadSuccess: null,
            uploading: false,
            preview: null,
            recording: ''
        };

        this.requestUserMedia = this.requestUserMedia.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        if (!hasGetUserMedia) {
            alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
            return;
        }
        this.requestUserMedia();
    }

    requestUserMedia() {
        console.log('requestUserMedia')
        captureUserMedia((stream) => {
            this.setState({ src: window.URL.createObjectURL(stream) });
            console.log('setting state', this.state)
        });
    }

    startRecord() {
        this.setState({ recording: true })
        captureUserMedia((stream) => {
            this.state.recordVideo = RecordRTC(stream, { type: 'video' });
            this.state.recordVideo.startRecording();
        });

        setTimeout(() => {
            this.stopRecord();
        }, 10000);
    }

    stopRecord() {
        this.setState({ recording: '' })
        this.state.recordVideo.stopRecording(() => {

            console.log("recordVideo", this.state.recordVideo);
            console.log("blob: ", this.state.recordVideo.blob)
            let preview = window.URL.createObjectURL(this.state.recordVideo.blob);
            this.state.preview = window.URL.createObjectURL(this.state.recordVideo.blob);
            this.setState({ preview: preview })
        });
    }
    save() {
        let user = cookie.load('user');
        let params = {
            type: 'video/webm',
            data: this.state.recordVideo.blob,
            id: user._id + Math.floor(Math.random() * 90000) + 10000
        }

        this.setState({ uploading: true });

        S3Upload(params)
            .then((success) => {
                console.log('enter then statement')
                if (success) {
                    console.log(success)
                    this.setState({ uploadSuccess: true, uploading: false });
                }
            }, (error) => {
                alert(error, 'error occurred. check your aws settings and try again.')
            })
    }
    playVideo() {
        this.refs.newLook.play();
    }
    retake() {
        this.setState({ preview: null })
    }
    render() {
        return (
            <div>

                {
                    (this.state.preview === null)
                        ? <div className="v-container" ><Webcam src={this.state.src} />
                            <div><button className="v-ctl start" onClick={this.startRecord}>Start</button></div>
                            <div><button id="stop-btn"className="v-ctl stop" onClick={this.stopRecord} disabled={!this.state.recording}>Stop</button></div>
                        </div>
                        : <div><Playback src={this.state.preview} />
                            <button className="v-ctl retake" onClick={this.retake.bind(this)}>retake</button>
                            <div><button className="v-ctl save" onClick={this.save}>save</button></div>
                        </div>
                }


                {this.state.uploading ?
                    <div>Uploading...</div> : null}


            </div>
        )
    }
}

export default PhotoBooth;