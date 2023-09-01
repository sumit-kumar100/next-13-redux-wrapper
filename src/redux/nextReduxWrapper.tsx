"use client";

import React, { ReactNode } from "react";

import { RootState, store } from "./store";

type HydrateableSlices = keyof RootState;

let preloadedState: boolean = false;

export function NextReduxWrapper<State extends HydrateableSlices>({
  hydrateStates,
  children,
}: {
  hydrateStates: { [Key in State]: Partial<RootState[Key]> };
  children: ReactNode;
}) {

  if (!preloadedState) {
    store.dispatch({ type: "HYDRATE", payload: hydrateStates });
    preloadedState = true;
  }

  return (
    <div className="next-redux-wrapper">{preloadedState ? children : null}</div>
  );
}
