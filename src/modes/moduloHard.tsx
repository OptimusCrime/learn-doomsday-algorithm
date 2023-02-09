import React, {useState} from 'react';

import {generateRandomNumberInclusive} from "../utilities/random";

interface StateProps {
  showAnswer: boolean;
  guessed: number | null;
  currentNumber: number;
}

export const ModuloHard = () => {
  const newRandomNumber = () => generateRandomNumberInclusive(0, 99);

  const [state, setState] = useState<StateProps>({
    showAnswer: false,
    guessed: null,
    currentNumber: newRandomNumber()
  });

  const remainderCorrectAnswer = state.currentNumber % 12;

  const reset = () => {
    setState({
      showAnswer: false,
      guessed: null,
      currentNumber: newRandomNumber()
    });
  }

  const guess = (value: number) => {
    if (state.showAnswer) {
      return reset();
    }

    setState((prevState) => ({
      ...prevState,
      showAnswer: true,
      guessed: value,
    }));
  }

  const remainderButtons = Array(12).fill(0);

  return (
    <div>
      <div>
        <p className="font-bold">What is the remainder of {state.currentNumber} modulo 12?</p>
      </div>
      <div className="flex flex-row justify-center mt-10 space-x-10">
        {remainderButtons.map((_, index) => (
          <button className={`border p-2 rounded ${(state.showAnswer && index === state.guessed) ? (state.guessed === remainderCorrectAnswer ? 'bg-green-400' : 'bg-red-400') : ''}`} onClick={() => guess(index)}>
            {index}
          </button>
        ))}
      </div>
      {state.showAnswer && state.guessed !== remainderCorrectAnswer && (
        <div className="flex flex-col justify-center mt-10">
          <p>Correct was {remainderCorrectAnswer}</p>
        </div>
      )}
    </div>
  );
}
