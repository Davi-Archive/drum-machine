import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'


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

const soundsGroup = {
  heaterKit: bankOne,
  smoothPianoKit: bankTwo
}

const KeyboardKey = ({ play, deactivateAudio, sound: { id, keyTrigger, url, keyCode } }) => {
  const handleKeydown = (e) => {
    if(keyCode === e.keyCode) {
      const audio = document.getElementById('keyTrigger');
      play(keyTrigger, id);
      deactivateAudio(audio)
    }
  }
//Keydown sem precisar clicar
  React.useEffect(() => {
      document.addEventListener('keydown', handleKeydown);
  }, )

  return (
    <button value="test" id={keyCode} className="drum-pad" onClick={() => play(keyTrigger, id)}>
      <audio className="clip" src={url} id={keyTrigger} />
      {keyTrigger}
    </button>
  );
}

const Keyboard = ({ sounds, play, power, deactivateAudio }) =>  (
  <div className="keyboard">
    {/* power true ou false para mudar link do array sound */}
    {power
      ? sounds.map((sound) => <KeyboardKey sound={sound} play={play} deactivateAudio={deactivateAudio} />)
      : sounds.map((sound) => <KeyboardKey sound={{...sound, url: "#" }} play={play} deactivateAudio={deactivateAudio} />)
    }
  </div>
);

const DumControle = ({ stop, name, power, volume, handleVolumeChange, changeSoundGroup }) => (
  <div className="controle">
    <button onClick={stop}>Turn Power {power ? 'OFF' : 'ON'}</button>
    <h2>Volume: %{Math.round(volume * 100)}</h2>
    <input
      max="1"
      min="0"
      step='0.01'
      type="range"
      value={volume}
      onChange={handleVolumeChange}
      />
    <h2 id="display" >{name}</h2>
    <button onClick={changeSoundGroup}>Change Sounds Group</button>
  </div>
);

const App = () => {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [soundName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundsGroup[soundType]);

  const styleActiveKey = (keyTrigger) => {
    keyTrigger.parentElement.style.backgroundColor = "#000000"
    keyTrigger.parentElement.style.color = "#ffffff"
  }

  const deActivatedKey = (audio) => {
    audio.parentElement.style.backgroundColor = "#ffffff"
    audio.parentElement.style.color = "#000000"
  }
 const deactivateAudio = (audio) => {
   setTimeout(() => {
     audio.parentElement.style.backgroundColor = "#ffffff"
     audio.parentElement.style.color = "#000000"
   }, 300)
 }
    /* audio controler player */
  const play = (keyTrigger, sound) => {
    setSoundName(sound)
    const audio = document.getElementById(keyTrigger);
    styleActiveKey(audio);
    audio.currentTime = 0;
    audio.play();
    deactivateAudio(audio)
  }

  const stop = (audio) => {
     setPower(!power)
     deActivatedKey(audio)
  }

  const changeSoundGroup = () => {
    setSoundName("")
    if(soundType === "heaterKit"){
        setSoundType("smoothPianoKit");
        setSounds(soundsGroup.smoothPianoKit);
    } else {
        setSoundType("heaterKit");
        setSounds(soundsGroup.heaterKit);
    }
  }

  const handleVolumeChange = e => {
    setVolume(e.target.value)
  }

  const setKeyVolume = () => {
    const audioes = sounds.map(sound => document.getElementById(sound.keyTrigger));
    audioes.forEach(audio => {
      if(audio) {
        audio.volume = volume;
      }
    })
  }

  return (
    <div id="drum-machine">
      {setKeyVolume()}
      <div className="wrapper">
        <Keyboard sounds={sounds} play={play} power={power} deactivateAudio={deactivateAudio} />
        <DumControle
          stop={stop}
          power={power}
          volume={volume}
          name={soundName || soundName[soundType]}
          changeSoundGroup={changeSoundGroup}
          handleVolumeChange={handleVolumeChange}
         />
      </div>
    </div>
  )
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
