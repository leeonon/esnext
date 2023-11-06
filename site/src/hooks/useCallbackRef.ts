/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined,
): T {
  const callbackRef = useRef<T | undefined>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback(
    ((...args: any[]) => {
      return callbackRef.current?.(...args);
    }) as T,
    [],
  );
}

export default useCallbackRef;
