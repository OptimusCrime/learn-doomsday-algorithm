import React from 'react';

import {useAppDispatch, useAppSelector} from './store/hooks';
import {Modes, setMode} from './store/reducers/globalReducer';
import {ReducerNames} from './store/reducers/reducerNames';
import {Page, PageContent} from "./layout";
import {AnchorDays, LeapYears, ModuloEasy, ModuloHard, Weekdays} from "./modes";

export const App = () => {
  const {mode} = useAppSelector((state) => state[ReducerNames.GLOBAL]);
  const dispatch = useAppDispatch();

  const changeMode = (mode: Modes) => dispatch(setMode(mode));

  switch (mode) {
    case Modes.NONE:
      return (
        <Page changeMode={changeMode}>
          <p>This is the frontpage</p>
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
    case Modes.WEEKDAYS:
      return (
        <Page changeMode={changeMode}>
          <PageContent title="Weekdays">
            <Weekdays />
          </PageContent>
        </Page>
      );
    case Modes.MODULO_EASY:
      return (
        <Page changeMode={changeMode}>
          <PageContent title="Modulo (easy)">
            <ModuloEasy />
          </PageContent>
        </Page>
      );
    case Modes.MODULO_HARD:
      return (
        <Page changeMode={changeMode}>
          <PageContent title="Modulo (hard)">
            <ModuloHard />
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
    default:
      return (
        <Page changeMode={changeMode}>
          <p>Not yet implemented</p>
        </Page>
      );
  }
};