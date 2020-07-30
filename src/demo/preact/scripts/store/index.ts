import createStore, { Store } from 'unistore';

export type AppState = {
  localTime:number;
  serverTime:number;
};

function createAppStore(store:AppState):Store<AppState> {
  return createStore(store);
}

export const store = createAppStore({ localTime: 0, serverTime: 0 });
