import  { store } from "../../Hooks/Redux-Toolkit/Store/store"



export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
