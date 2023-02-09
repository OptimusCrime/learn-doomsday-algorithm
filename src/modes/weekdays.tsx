import React, { useState } from 'react';

import { generateRandomNumberInclusive } from '../utilities/random';
import { weekdayNumberToString } from '../utilities/weekdayNumberToString';

interface StateProps {
  showAnswer: boolean;
  guessed: number | null;
  currentWeekday: number;
}

export const Weekdays = () => {
  const newRandomDay = () => generateRandomNumberInclusive(0, 6);

  const [state, setState] = useState<StateProps>({
    showAnswer: false,
    guessed: null,
    currentWeekday: newRandomDay(),
  });

  const reset = () => {
    setState({
      showAnswer: false,
      guessed: null,
      currentWeekday: newRandomDay(),
    });
  };

  const guess = (value: number) => {
    if (state.showAnswer) {
      return reset();
    }

    setState((prevState) => ({
      ...prevState,
      showAnswer: true,
      guessed: value,
    }));
  };

  const buttons = Array(7).fill(0);

  return (
    <div>
      <div>
        <p className="font-bold">What is the numeric value for {weekdayNumberToString(state.currentWeekday)}?</p>
      </div>
      <div className="flex flex-row justify-center mt-10 space-x-10">
        {buttons.map((_, index) => (
          <button
            className={`border p-2 rounded ${
              state.showAnswer && index === state.guessed
                ? state.guessed === state.currentWeekday
                  ? 'bg-green-400'
                  : 'bg-red-400'
                : ''
            }`}
            onClick={() => guess(index)}
          >
            {index}
          </button>
        ))}
      </div>
      {state.showAnswer && state.guessed !== state.currentWeekday && (
        <div className="flex flex-col justify-center mt-10">
          <p>Correct was {weekdayNumberToString(state.currentWeekday)}</p>
        </div>
      )}
    </div>
  );
};
