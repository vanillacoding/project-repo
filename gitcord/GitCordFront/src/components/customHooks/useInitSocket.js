import { useEffect } from "react";

import {
  subscribeSocket,
  cancelSocketSubscription
} from "../../config/socketConfig";

export default function useInitSocket(dispatch) {
  useEffect(() => {
    subscribeSocket(dispatch);

    return () => cancelSocketSubscription();
  }, [dispatch]);
}
