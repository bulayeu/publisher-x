import React, {useRef, useState} from 'react';
import GIF from 'gif.js';

const VIDEO_URL = '/video.mp4';

let rendering = false;
let gif = false;
let timer = false;

export default () => {
    const videoRef = useRef(0);
    const canvasRef = useRef(0);
    const gifRef = useRef(0);
    const logoRef = useRef(0);


    const [image, setImage] = useState('');
    const [gifHref, setGifHref] = useState('');

    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(15);

    const [renderingText, setRenderingText] = useState('');

    const videoToImage = () => {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, 400, 400);
        const image = canvasRef.current.toDataURL();
        setImage(image);
    }

    const addAnythingOverVideo = () => {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(logoRef.current, 20, 348, 116, 32);
        const image = canvasRef.current.toDataURL();
        setImage(image);
    }

    const videoToGif = () => {

        if (!gif) {
            gif = new GIF({
                workers: 4,
                workerScript: './gif.worker.js',
                width: 720,
                height: 720
            });
        }

        gif.abort();
        gif.frames = [];

        const video = videoRef.current;
        video.pause();
        rendering = false;
        video.currentTime = from;
        video.play();

        gif.on('progress', function (p) {
            setRenderingText(+(Math.round(p * 100)) + "%");
        });

        gif.on('finished', function (blob) {
            const img = gifRef.current;
            const srcBlob = URL.createObjectURL(blob);
            img.src = srcBlob;
            setGifHref(srcBlob);
            setRenderingText("done : size " + ((blob.size / 1000).toFixed(2)) + "kb");
        });

        const capture = () => {
            gif.addFrame(video, {copy: true, delay: 1000 / 30});
        }

        const onTimeUpdate = () => {
            if (rendering) return;
            if (video.currentTime > to) {
                video.removeEventListener('onPlay', onPlay);
                gif.render();
                video.pause();
                rendering = true;
            }
        };

        video.addEventListener('timeupdate', onTimeUpdate);

        const onPlay = () => {
            clearInterval(timer);
            timer = setInterval(capture, 1000 / 30);

        }

        video.addEventListener('play', onPlay);
    };

    const handleFrom = (e) => {
        setFrom(e.target.value);
    }

    const handleTo = (e) => {
        setTo(e.target.value);
    }

    return <div className='video-to-gif'>
        <div>
            <img className='svg' ref={logoRef} src='/promo.svg'/>
        </div>
        <div className='video-area'>
            <video ref={videoRef} controls width={400}>
                <source type="video/mp4" src={VIDEO_URL}/>
            </video>
            <canvas width={400} height={400} ref={canvasRef}/>
            <img ref={gifRef} width={400} height={400}/>
        </div>
        <div id='buttons' className='controls-area'>
            <button className='btn' onClick={videoToImage}>To image</button>
            <button className='btn' onClick={addAnythingOverVideo}>Add logo over image</button>
            <a className='btn' href={image} download="preview.png">Download Image</a>
        </div>
        <hr/>
        <div id='gif-controls'>
            <div>
                <h5>From {from}</h5>
                <input type="range" value={from} onChange={handleFrom} min={0} max={15} step={1}/>
            </div>
            <div>
                <h5>To {to}</h5>
                <input type="range" value={to} min={1} onChange={handleTo} max={15} step={1}/>
            </div>
            <div>
                <h5>Rendering: {renderingText}</h5>
                <button className='btn' onClick={videoToGif}>Video to Gif</button>
                <a className='btn' href={gifHref} download="preview.gif">Download GIF</a>
            </div>
        </div>
    </div>
}
