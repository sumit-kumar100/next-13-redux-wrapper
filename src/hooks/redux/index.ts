import { RootState, store } from "@/redux/store";

import useAppDispatch from "./useDispatch";
import useAppSelector from "./useSelector";

export const useSelector: <T>(selector: (state: RootState) => T) => T =
  useAppSelector;
export const useDispatch: () => typeof store.dispatch = useAppDispatch;
