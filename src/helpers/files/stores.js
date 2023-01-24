export const createFileList = (store) => {
  const { subscribe, set, update } = store;

  return {
    subscribe,
    set,
    update,
  };
};
