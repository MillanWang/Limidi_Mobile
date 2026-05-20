import { configureStore } from "@reduxjs/toolkit";
import HttpCommunicationsReducer from "./slices/HttpCommunicationsSlice";
import GridPresetsReducer from "./slices/GridPresetsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  type PersistedState,
} from "redux-persist";

// Schema evolution notes — read before changing the shape of any persisted slice.
//
//   * Adding an optional field with a default: safe, no action needed. Old
//     blobs rehydrate fine and the missing field reads as `undefined`.
//
//   * Renaming, removing, or changing the type of an existing field: bump
//     `version` on the affected persist config and replace `migrate` with
//     `createMigrate({ 1: prevToNext, ... })` from redux-persist. Without a
//     proper migration, existing users either rehydrate with the wrong shape
//     or — if the change breaks the validator below — get silently reset to
//     defaults on their next launch.
//
//   * Changing the top-level shape of a slice (e.g. dropping
//     `currentPresetIndex`): also update the validator predicate so legitimate
//     post-migration state still passes.
//
// The validators are intentionally shallow. Walking nested grid / color /
// midi fields would force this file to be edited on every feature change,
// which defeats the purpose. The trade-off: we catch "blob is totally wrong"
// but not "blob has the right top-level shape with garbage deeper inside."
// Validation failure resets the slice silently — the manual reset path in
// settings (TODO) is the intended recourse for the deep-garbage case.

// Guards rehydrate against a persisted blob that parses as JSON but has the
// wrong shape (e.g. after a schema change or a partial write). Returning
// `undefined` makes redux-persist fall back to the reducer's initial state.
const safeMigrate =
  (label: string, validate: (state: unknown) => boolean) =>
  async (state: PersistedState): Promise<PersistedState> => {
    if (state === undefined) return undefined;
    try {
      if (validate(state)) return state;
      console.warn(
        `[redux-persist] ${label} state failed validation, resetting to defaults`,
      );
      return undefined;
    } catch (err) {
      console.warn(
        `[redux-persist] ${label} migrate threw, resetting to defaults`,
        err,
      );
      return undefined;
    }
  };

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const gridPresetsPersistConfig = {
  key: "gridPresets",
  storage: AsyncStorage,
  version: 1,
  migrate: safeMigrate(
    "gridPresets",
    (state) =>
      isPlainObject(state) &&
      typeof state.currentPresetIndex === "number" &&
      Array.isArray(state.gridPresets) &&
      state.gridPresets.length > 0,
  ),
};
const gridPresetsPersistedReducer = persistReducer(
  gridPresetsPersistConfig,
  GridPresetsReducer,
);

const httpCommunicationsPersistConfig = {
  key: "httpCommunications",
  storage: AsyncStorage,
  version: 1,
  migrate: safeMigrate("httpCommunications", (state) => {
    if (!isPlainObject(state)) return false;
    const info = state.httpCommunicationInfo;
    return isPlainObject(info) && typeof info.baseAddress === "string";
  }),
};
const httpCommunicationsPersistedReducer = persistReducer(
  httpCommunicationsPersistConfig,
  HttpCommunicationsReducer,
);

export const store = configureStore({
  reducer: {
    gridPresetsReducer: gridPresetsPersistedReducer,
    httpCommunicationsReducer: httpCommunicationsPersistedReducer,
  },

  // Include below to avoid the warning about size of store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
