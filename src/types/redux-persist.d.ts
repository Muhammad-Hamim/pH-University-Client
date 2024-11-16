declare module "redux-persist/lib/storage";

declare module "redux-persist/es/persistReducer" {
  import { Reducer } from "redux";
  import { PersistConfig } from "redux-persist/es/types";

  export default function persistReducer<S, A>(
    config: PersistConfig<S>,
    reducer: Reducer<S, A>
  ): Reducer<S, A>;
}
