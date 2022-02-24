import React from 'react';
import  { useRef, useState } from "react";
import Card from '@mui/material/Card';
import { CardActionArea, TextField, } from "@mui/material";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';



const Video=({socket})=> {
     
      const videoPlayer = useRef();
      const [currentTime, setCurrentTime] = useState(0);
      const [seekValue, setSeekValue] = useState(0);
      
    const play = () => {
      videoPlayer.current.play();
    };
  
    const pause = () => {
      videoPlayer.current.pause();
    };
  
    const stop = () => {
      videoPlayer.current.pause();
      videoPlayer.current.currentTime = 0;
    };
  
    const fastForward = () => {
      videoPlayer.current.fastForward();
      videoPlayer.current.currentTime = +5;
    };
    const rewind = () => {
      videoPlayer.current.rewind();
      videoPlayer.current.currentTime = -5;
    };
  
    const setSpeed = (speed) => {
      videoPlayer.current.playbackRate = speed;
    };
  
    const onPlaying = () => {
      setCurrentTime(videoPlayer.current.currentTime);
      setSeekValue(
        (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100
      );
      
    };
    const [comments, setComments] = useState('');

    const handlePost = (e) => {
      e.preventDefault();

      if (comments){
        console.log(comments);
      }
    };

    return (
      <Container>
         <Card className="App" elevation={12} style={{width:800, height:500,
           marginTop:6, backgroundColor:'skyblue', marginBotton:10,}}>
         <CardActionArea>
        <video className="video" style={{width:350,
          height:300, marginLeft:200,}}
          
          ref={videoPlayer}
          onTimeUpdate={onPlaying}
        >
           <source src="/Video/tips.mp4" type="video/mp4"></source>
        </video>
        <p>{currentTime}</p>
        <input className="inputs"
          type="range"
          min="0"
          max="100"
          step="1"
          value={seekValue}
          onChange={(e) => {
            const seekto = videoPlayer.current.duration * (+e.target.value / 100);
            videoPlayer.current.currentTime = seekto;
            setSeekValue(e.target.value);
          }}
        />
        <div className="clicks">
          <button onClick={play}>play</button>
          <button onClick={pause}>pause</button>
          <button onClick={stop}>stop</button>
          <button onclick={() => fastForward(+5)}>fastForward</button>
          <button onclick={() => rewind(-5)}>rewind</button>
          <button onClick={() => setSpeed(0.5)}>0.5x</button>
          <button onClick={() => setSpeed(1)}>1x</button>
          <button onClick={() => setSpeed(1.5)}>1.5x</button>
          <button onClick={() => setSpeed(2)}>2x</button>
        </div>
          <br/>
      <form noValidate autoComplete="off" onPost= {handlePost}>
        <TextField 
        onChange={(e) => setComments(e.target.value)}
          label="Comments"
          variant="outlined"
          color="secondary"
        />
        <Button size="sm" 
            type="post"
            variant="contained"
            color="secondary"
            endIcon={<keyboardArrowRightIcon />}
            >
              Post
        </Button>
       </form>
        </CardActionArea>
      </Card>
      </Container>
    );
  }
  export default Video;