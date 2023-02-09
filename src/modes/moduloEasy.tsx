import React, { useState } from 'react';

import { generateRandomNumberInclusive } from '../utilities/random';

enum Steps {
  FIT = 'fit',
  REMAINDER = 'reminder',
}

interface StateProps {
  step: Steps;
  guessedFit: number | null;
  guessedRemainder: number | null;
  currentNumber: number;
}

export const ModuloEasy = () => {
  const newRandomNumber = () => generateRandomNumberInclusive(0, 99);

  const [state, setState] = useState<StateProps>({
    step: Steps.FIT,
    guessedFit: null,
    guessedRemainder: null,
    currentNumber: newRandomNumber(),
  });

  const fitCorrectAnswer = Math.floor(state.currentNumber / 12);
  const remainderCorrectAnswer = state.currentNumber % 12;

  const reset = () => {
    setState({
      step: Steps.FIT,
      guessedFit: null,
      guessedRemainder: null,
      currentNumber: newRandomNumber(),
    });
  };

  const guessFit = (value: number) => {
    // No cheating
    if (state.step === Steps.REMAINDER) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      step: Steps.REMAINDER,
      guessedFit: value,
    }));
  };

  const guessRemainder = (value: number) => {
    if (state.guessedRemainder !== null) {
      return reset();
    }

    setState((prevState) => ({
      ...prevState,
      state: Steps.REMAINDER,
      guessedRemainder: value,
    }));
  };

  const fitButtons = Array(9).fill(0);
  const remainderButtons = Array(12).fill(0);

  return (
    <div>
      <div>
        <p className="font-bold">How many times does 12 fit in {state.currentNumber}?</p>
      </div>
      <div className="flex flex-row justify-center mt-10 space-x-10">
        {fitButtons.map((_, index) => (
          <button
            className={`border p-2 rounded ${
              state.guessedFit !== null && index === state.guessedFit
                ? state.guessedFit === fitCorrectAnswer
                  ? 'bg-green-400'
                  : 'bg-red-400'
                : ''
            }`}
            onClick={() => guessFit(index)}
          >
            {index}
          </button>
        ))}
      </div>
      {state.step === Steps.REMAINDER && (
        <>
          <div className="mt-10">
            <p className="font-bold">What is the remainder?</p>
          </div>
          <div className="flex flex-row justify-center mt-10 space-x-10">
            {remainderButtons.map((_, index) => (
              <button
                className={`border p-2 rounded ${
                  state.guessedRemainder !== null && index === state.guessedRemainder
                    ? state.guessedRemainder === remainderCorrectAnswer
                      ? 'bg-green-400'
                      : 'bg-red-400'
                    : ''
                }`}
                onClick={() => guessRemainder(index)}
              >
                {index}
              </button>
            ))}
          </div>
          {state.guessedRemainder !== null && state.guessedRemainder !== remainderCorrectAnswer && (
            <div className="flex flex-col justify-center mt-10">
              <p>Correct was {remainderCorrectAnswer}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
