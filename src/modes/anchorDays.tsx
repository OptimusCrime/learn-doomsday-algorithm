import React, {useState} from 'react';
import {selectRandomFromArray} from "../utilities/random";
import {weekdayNumberToString} from "../utilities/weekdayNumberToString";

interface Century {
  century: number;
  anchorDay: number;
}

const CENTURIES: Century[] = [
  {
    century: 17,
    anchorDay: 0
  },
  {
    century: 18,
    anchorDay: 5
  },
  {
    century: 19,
    anchorDay: 3
  },
  {
    century: 20,
    anchorDay: 2
  },
  {
    century: 21,
    anchorDay: 0
  },
];

interface StateProps {
  showAnswer: boolean;
  guessed: number | null;
  currentCentury: Century;
}

export const AnchorDays = () => {
  const newRandomCentury = () => selectRandomFromArray(CENTURIES);

  const [state, setState] = useState<StateProps>({
    showAnswer: false,
    guessed: null,
    currentCentury: newRandomCentury()
  })

  const FROM_YEAR = state.currentCentury.century * 100;
  const TO_YEAR = FROM_YEAR + 99;

  const reset = () => {
    setState({
      showAnswer: false,
      guessed: null,
      currentCentury: newRandomCentury()
    });
  }
  const guess = (value: number) => {
    setState((prevState) => ({
      ...prevState,
      showAnswer: true,
      guessed: value
    }));
  }

  const buttons = [
    2,
    3,
    5,
    0
  ];

  return (
    <div>
      <div>
        <p className="font-bold">What was the anchor day between {FROM_YEAR} - {TO_YEAR}?</p>
      </div>
      <div className="flex flex-row justify-center mt-10 space-x-10">
        {buttons.map((value) => (
          <button className={`border p-2 rounded ${(state.showAnswer && value === state.guessed) ? (state.guessed === state.currentCentury.anchorDay ? 'bg-green-400' : 'bg-red-400') : ''}`} onClick={() => guess(value)}>
            {weekdayNumberToString(value)}
          </button>
        ))}
      </div>
      {state.showAnswer && state.guessed !== state.currentCentury.anchorDay && (
        <div className="flex flex-col justify-center mt-10">
          <p>Correct was {weekdayNumberToString(state.currentCentury.anchorDay)}</p>
        </div>
      )}
    </div>
  );
}
