import { RootState, store } from "@/redux/store";

const useSelector = <T>(selector: (state: RootState) => T): T => {
  let selectedState = selector(store.getState());

  store.subscribe(() => (selectedState = selector(store.getState())));

  return selectedState;
};

export default useSelector;
