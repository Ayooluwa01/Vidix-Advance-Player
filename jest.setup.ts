import "@testing-library/react-native/matchers";

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);

jest.mock("react-native-mmkv", () => {
  const store = new Map<string, string | number | boolean>();

  return {
    createMMKV: () => ({
      getString: (key: string) => {
        const value = store.get(key);
        return typeof value === "string" ? value : undefined;
      },
      getBoolean: (key: string) => {
        const value = store.get(key);
        return typeof value === "boolean" ? value : undefined;
      },
      set: (key: string, value: string | number | boolean) => {
        store.set(key, value);
      },
      remove: (key: string) => {
        store.delete(key);
      },
      clearAll: () => {
        store.clear();
      },
    }),
  };
});

jest.mock("expo-system-ui", () => ({
  setBackgroundColorAsync: jest.fn(),
}));
