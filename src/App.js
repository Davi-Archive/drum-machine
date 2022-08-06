import './App.css';
import React, { useState } from 'react';
import  ReactDOM  from 'react-dom';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};

const soundsGroup = {
  heaterKit: bankOne,
  smoothPianoKit: bankTwo
};

const KeyboardKey = ({ play, sound: { keyCode, keyTrigger, url } }) => {
  React.useEffect(() =>{
    const handleKeydown = (event) => {
      if(event.keyCode === keyCode){
        play(keyTrigger)
      }
    }
    document.addEventListener("keydown", handleKeydown)
  }, [])
  return(
    <button className="drum-pad" onClick={() => play(keyTrigger)}>
      <audio class="clip" id={keyTrigger} src={url} />
        {keyTrigger}
    </button>
  )
}

const Keyboard = ({ play , sounds }) => {
  return sounds.map((sound) => <KeyboardKey play={play} sound={sound} />)
}

const DrumControl = () => {
return (
<div className="control">
  <button onClick={changeSoundGroup}>Change Sound Group</button>
</div>
  )
 }

 const changeSoundGroup = () => {
  if(soundType === "heaterKit"){
    /* setSoundsType("smoothPianoKit"); */
    setSounds(soundsGroup.smoothPianoKit);
  } else {
    /* setSoundsType("heaterKit"); */
    setSounds(soundsGroup.heaterKit);
  }
}

const App = () => {
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(bankOne);




  const play = (keyTrigger) => {
    const audio = document.getElementById("keyTrigger");
   audio.currentTime = 0;
    audio.play()
  }
  return (
    <div id="drum-machine">
      <Keyboard play={play} sounds={sounds} />
      <DrumControl changeSoundGroup={changeSoundGroup} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
