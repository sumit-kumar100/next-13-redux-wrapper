import { store } from "@/redux/store";

const useDispatch = (): typeof store.dispatch => {
  return store.dispatch;
};

export default useDispatch;
