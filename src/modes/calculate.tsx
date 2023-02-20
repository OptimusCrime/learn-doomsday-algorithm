import React, { useState } from 'react';

import { calculateDate } from '../utilities/calculateDate';
import { formatDate } from '../utilities/formatters';
import { randomDate } from '../utilities/randomDate';
import { weekdayNumberToString } from '../utilities/weekdayNumberToString';

interface StateProps {
  randomDate: Date;
  showAnswer: boolean;
}

export const Calculate = () => {
  const [state, setState] = useState<StateProps>({
    randomDate: randomDate(),
    //randomDate: new Date(2001, 0, 28, 12, 0, 0),
    showAnswer: false,
  });

  const showAnswer = () => {
    setState((prevState) => ({
      ...prevState,
      showAnswer: true,
    }));
  };

  const reset = () => {
    setState((prevState) => ({
      ...prevState,
      randomDate: randomDate(),
      showAnswer: false,
    }));
  };

  const calculations = calculateDate(state.randomDate);

  return (
    <div>
      <div>
        <p className="font-bold">Which weekday was {formatDate(state.randomDate)}?</p>
      </div>
      <div className="flex flex-row justify-center mt-10 space-x-10">
        <button className="border p-2 rounded" onClick={() => showAnswer()}>
          Show calculation
        </button>
      </div>
      {state.showAnswer && (
        <div className="flex flex-col justify-center mt-10 space-y-5">
          <div>
            <p>
              <strong>First step:</strong>
            </p>
            <p>
              {calculations.twelveDivision} + {calculations.twelveRest} + {calculations.twelveRestFourDivision} +{' '}
              {calculations.centuryAnchorDate} = {calculations.doomsdaySum} = {calculations.doomsday} (
              {weekdayNumberToString(calculations.doomsday)})
            </p>
          </div>
          <div>
            <p>
              <strong>Closest known doomsday:</strong>
            </p>
            <p>{calculations.closestDoomsdayDate}</p>
          </div>
          {calculations.doomsdaysSteps.length > 1 && (
            <div>
              <p>
                <strong>Steps:</strong>
              </p>
              <div className="flex flex-row justify-center">
                {calculations.doomsdaysSteps.map((step) => (
                  <p className="mx-5">{step}</p>
                ))}
              </div>
            </div>
          )}
          <div>
            <p>
              <strong>Correct weekday:</strong>
            </p>
            <p>{weekdayNumberToString(state.randomDate.getDay())}</p>
          </div>
          <div className="flex flex-row justify-center mt-10 space-x-10">
            <button className="border p-2 rounded" onClick={() => reset()}>
              New date!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
