"use client";

import React, { ReactNode } from "react";

import { RootState, store } from "./store";

type HydrateableSlices = keyof RootState;

export function NextReduxWrapper<State extends HydrateableSlices>({
  hydrateStates,
  children,
}: {
  hydrateStates: Pick<RootState, State>;
  children: ReactNode;
}) {
  let preloadedState: boolean = false;

  if (!preloadedState) {
    store.dispatch({ type: "HYDRATE", payload: hydrateStates });
    preloadedState = true;
  }

  return (
    <div className="next-redux-wrapper">{preloadedState ? children : null}</div>
  );
}
