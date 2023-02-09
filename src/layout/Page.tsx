import React from 'react';
import {Modes} from "../store/reducers/globalReducer";

const MenuLink = ({ children, mode, changeMode}: { children: string; mode: Modes; changeMode: (mode: Modes) => void}) => (
  <a
    href="#"
    className="text-orange-500"
    onClick={(e) => {
      e.preventDefault();
      changeMode(mode);
    }}
  >
    {children}
  </a>
)

export const Page = ({ children, changeMode} : {children: React.ReactNode; changeMode: (mode: Modes) => void}) => {
  return (
    <div className="mx-auto mb-128 max-w-7xl px-12 text-center text-text-dark mt-10">
      <nav className="flex flex-row text-center justify-around">
        <MenuLink changeMode={changeMode} mode={Modes.ANCHOR_DAYS}>Anchor days</MenuLink>
        <MenuLink changeMode={changeMode} mode={Modes.WEEKDAYS}>Weekdays</MenuLink>
        <MenuLink changeMode={changeMode} mode={Modes.MODULO_EASY}>Modulo (easy)</MenuLink>
        <MenuLink changeMode={changeMode} mode={Modes.MODULO_HARD}>Modulo (hard)</MenuLink>
        <MenuLink changeMode={changeMode} mode={Modes.LEAP_YEARS}>Leap years</MenuLink>
        <MenuLink changeMode={changeMode} mode={Modes.DOOMSDAYS}>Doomsdays</MenuLink>
      </nav>
      <div>
        {children}
      </div>
    </div>
  );
}
