import React, {useRef, useState} from 'react';
import GIF from 'gif.js';

const VIDEO_URL = '/video.mp4';

export default () => {
    const videoRef = useRef(0);
    const canvasRef = useRef(0);
    const logoRef = useRef(0);
    const [image, setImage] = useState();


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
        // Demo
        // var button, capture, gif, info, sample, sampleInterval, sampleUpdate, startTime, timer, video;
        // info = document.id('info');
        // video = document.id('video');
        // button = document.id('go');
        // sample = document.id('sample');
        // gif = new GIF({
        //     workers: 4,
        //     workerScript: '/gif.js/gif.worker.js',
        //     width: 600,
        //     height: 337
        // });
        // startTime = null;
        // sampleInterval = null;
        // sampleUpdate = function() {
        //     sampleInterval = parseInt(sample.value);
        //     gif.abort();
        //     return document.id('info').set('text', "ready to start with a sample interval of " + sampleInterval + "ms");
        // }
        // ;
        // video.addEventListener('canplay', function() {
        //     button.disabled = false;
        //     sample.disabled = false;
        //     return sampleUpdate();
        // });
        // sample.addEvent('change', sampleUpdate);
        // button.addEvent('click', function() {
        //     video.pause();
        //     video.currentTime = 0;
        //     gif.abort();
        //     gif.frames = [];
        //     return video.play();
        // });
        // gif.on('start', function() {
        //     return startTime = now();
        // });
        // gif.on('progress', function(p) {
        //     return info.set('text', "rendering: " + (Math.round(p * 100)) + "%");
        // });
        // gif.on('finished', function(blob) {
        //     var delta, img;
        //     img = document.id('result');
        //     img.src = URL.createObjectURL(blob);
        //     delta = now() - startTime;
        //     return info.set('text', "done in\n" + ((delta / 1000).toFixed(2)) + "sec,\nsize " + ((blob.size / 1000).toFixed(2)) + "kb");
        // });
        // timer = null;
        // capture = function() {
        //     info.set('html', "capturing at " + video.currentTime);
        //     return gif.addFrame(video, {
        //         copy: true,
        //         delay: sampleInterval
        //     });
        // }
        // ;
        // video.addEventListener('play', function() {
        //     clearInterval(timer);
        //     return timer = setInterval(capture, sampleInterval);
        // });
        // return video.addEventListener('ended', function() {
        //     clearInterval(timer);
        //     return gif.render();
        // });
    };

    return <div className='video-to-gif'>
        <div>
            <img ref={logoRef} src='/promo.svg' />
        </div>
        <div className='video-area'>
            <video ref={videoRef} controls width={400}>
                <source type="video/mp4" src={VIDEO_URL}/>
            </video>
            <canvas width={400} height={400} ref={canvasRef}/>
        </div>
        <div id='buttons' className='controls-area'>
            <button className='btn' onClick={videoToImage}>To image</button>
            <button className='btn' onClick={addAnythingOverVideo}>Add logo over image</button>
            <a className='btn' href={image} download="preview.png">Download Image</a>
        </div>
    </div>
}
