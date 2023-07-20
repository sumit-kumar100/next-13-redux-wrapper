import { useCallback, useEffect, useReducer } from "react";
import Cookies from "js-cookie";

interface ACTION {
  type: "START" | "SUCCESS" | "FAIL" | "RESET";
  payload?: { data?: any };
}

interface FetchOptions {
  method?: string;
}

interface FetchResponse {
  data?: any;
  hasError?: boolean;
  status?: number;
}

interface FetchState {
  loading: boolean;
  data: any;
}

const ACTIONS = {
  START: "START",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  RESET: "RESET",
} as const;

const fetchRequest = async (
  url: string,
  options: FetchOptions = { method: "GET" }
): Promise<FetchResponse> => {
  let data: any = {};
  let status = 0;
  const accessToken = Cookies.get("accessToken");
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    status = res.status;
    if (res.headers.get("content-type")?.includes("application/json")) {
      data = await res.json();
    }
  } catch (error: any) {
    console.warn(error.message);
  } finally {
    return { data, hasError: !(status === 200), status };
  }
};

const useFetch = (
  INITIALIZE: any
): [
  (url: string, options?: FetchOptions) => Promise<FetchResponse>,
  boolean,
  any
] => {
  const reducer = (state: FetchState, action: ACTION): FetchState => {
    const { type, payload } = action;

    switch (type) {
      case ACTIONS.START:
        return { loading: true, data: INITIALIZE };

      case ACTIONS.SUCCESS:
        return {
          loading: false,
          data: payload?.data || INITIALIZE,
        };

      case ACTIONS.FAIL:
        return { loading: false, data: INITIALIZE };

      case ACTIONS.RESET:
        return { loading: false, data: INITIALIZE };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: INITIALIZE,
  });

  useEffect(() => {
    return () => dispatch({ type: ACTIONS.RESET });
  }, []);

  const handleFetch = useCallback(
    async (url: string, options: FetchOptions = { method: "GET" }) => {
      let _res: FetchResponse = {};

      try {
        dispatch({ type: ACTIONS.START });
        _res = await fetchRequest(url, options);
      } catch (error: any) {
        console.warn(error.message);
      } finally {
        if (_res.hasError) {
          dispatch({ type: ACTIONS.FAIL });
        } else {
          dispatch({
            type: ACTIONS.SUCCESS,
            payload: { data: _res.data },
          });
        }
        return _res;
      }
    },
    []
  );

  return [handleFetch, state.loading, state.data];
};

export default useFetch;
