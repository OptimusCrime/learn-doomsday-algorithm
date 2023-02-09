import React, {useState} from 'react';

import {generateRandomNumberInclusive} from "../utilities/random";
import {isLeapYear} from "../utilities/leapYear";
import {weekdayNumberToString} from "../utilities/weekdayNumberToString";

interface StateProps {
  showAnswer: boolean;
  guessed: boolean | null;
  currentYear: number;
}

export const LeapYears = () => {
  const newRandomYear = () => generateRandomNumberInclusive(1700, 2200);

  const [state, setState] = useState<StateProps>({
    showAnswer: false,
    guessed: null,
    currentYear: newRandomYear()
  });

  const currentYearIsLeapYear = isLeapYear(state.currentYear);

  const reset = () => {
    setState({
      showAnswer: false,
      guessed: null,
      currentYear: newRandomYear()
    });
  }

  const guess = (value: boolean) => {
    if (state.showAnswer) {
      return reset();
    }

    setState((prevState) => ({
      ...prevState,
      showAnswer: true,
      guessed: value
    }));
  }

  return (
    <div>
      <div>
        <p className="font-bold">Was {state.currentYear} a leap year?</p>
      </div>
      <div className="flex flex-row justify-center mt-10 space-x-10">
        <button className={`border p-2 rounded ${state.showAnswer && state.guessed ? (currentYearIsLeapYear ? 'bg-green-400' : 'bg-red-400') : ''}`} onClick={() => guess(true)}>
          Yes
        </button>
        <button className={`border p-2 rounded ${state.showAnswer && !state.guessed ? (!currentYearIsLeapYear ? 'bg-green-400' : 'bg-red-400') : ''}`} onClick={() => guess(false)}>
          No
        </button>
      </div>
      {state.showAnswer && state.guessed !== currentYearIsLeapYear && (
        <div className="flex flex-col justify-center mt-10">
          {currentYearIsLeapYear
            ? <p>{state.currentYear} was a leap year</p>
            : <p>{state.currentYear} was not a leap year</p>
          }
        </div>
      )}
    </div>
  );
}
