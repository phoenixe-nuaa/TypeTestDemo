import logo from './logo.svg';
import { generate } from './utils/words';
import useKeyPress from './hooks/useKeyPress';
import React, { useState } from 'react';
import { currentTime } from './utils/time';

import './App.css';

const initialWords = generate();
// console.log(initialWords);

function App() {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join(''),
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);

  // 1''
  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState('');

  const [styles, setStyles] = useState(' ');
  
  useKeyPress(key => {
    // console.log(key)
    // 1
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    // 1'
    if (!startTime) {
      setStartTime(currentTime());
    }

    // 2
    if (key === currentChar) {
      setStyles('#61DBFB');
      console.log({styles});
      // 3
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      // 4
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      // 5
      setCurrentChar(incomingChars.charAt(0));

      // 6
      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars += ' ' + generate();
      }
      setIncomingChars(updatedIncomingChars);

      // 2'
      if (incomingChars.charAt(0) === ' ') {
        // 3'
        setWordCount(wordCount + 1);
        // 4'
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        // console.log(durationInMinutes);
        // console.log(wordCount);
        // 5'
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }
    }
    else {
      setStyles('#d30909');
      console.log({styles});
    }

    // 2''
    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    // 3''
    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(2),
    );
  });

  return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p className="Character">
        <span className="Character-out">
          {(leftPadding + outgoingChars).slice(-20)}
        </span>
        <span className="Character-current" style={{backgroundColor:styles}}>{currentChar}</span>
        <span>{incomingChars.substr(0, 20)}</span>
      </p>
      <h3>
        WPM: {wpm} | {accuracy}%
      </h3>
      {/* <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a> */}
    </header>
  </div>
  )
}

export default App;
