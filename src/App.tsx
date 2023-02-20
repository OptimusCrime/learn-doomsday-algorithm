import React from 'react';

import { Page, PageContent } from './layout';
import { AnchorDays, Calculate, Doomsdays, LeapYears } from './modes';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { Modes, setMode } from './store/reducers/globalReducer';
import { ReducerNames } from './store/reducers/reducerNames';
import { unreachableCode } from './utilities/unreachableCode';

export const App = () => {
  const { mode } = useAppSelector((state) => state[ReducerNames.GLOBAL]);
  const dispatch = useAppDispatch();

  const changeMode = (mode: Modes) => dispatch(setMode(mode));

  switch (mode) {
    case Modes.NONE:
    case Modes.CALCULATE:
      return (
        <Page changeMode={changeMode}>
          <PageContent title="Calculate">
            <Calculate />
          </PageContent>
        </Page>
      );
    case Modes.ANCHOR_DAYS:
      return (
        <Page changeMode={changeMode}>
          <PageContent title="Anchor days">
            <AnchorDays />
          </PageContent>
        </Page>
      );
    case Modes.LEAP_YEARS:
      return (
        <Page changeMode={changeMode}>
          <PageContent title="Leap years">
            <LeapYears />
          </PageContent>
        </Page>
      );
    case Modes.DOOMSDAYS:
      return (
        <Page changeMode={changeMode}>
          <PageContent title="Doomsdays">
            <Doomsdays />
          </PageContent>
        </Page>
      );
    default:
      throw unreachableCode(mode);
  }
};
