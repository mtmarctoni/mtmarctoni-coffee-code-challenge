"use client";

import { ChangeEvent, useCallback, useState } from "react";

// Generic hook for managing a single field value. Defaults to string but can be
// used with number (for price) or other simple scalar types.
export const useField = <T extends string | number = string>(initial: T) => {
  const [value, setValue] = useState<T>(initial);

  // set directly with a value of type T
  const onChange = useCallback((v: T) => setValue(v), []);

  // helper to use as an input change handler (reads from event.target.value)
  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const raw = e.target.value as unknown;

      // coerce to number when initial is a number
      if (typeof initial === "number") {
        const n = Number(raw as string);
        setValue((Number.isNaN(n) ? (0 as unknown) : (n as unknown)) as T);
        return;
      }

      setValue(raw as unknown as T);
    },
    [initial]
  );

  const reset = useCallback(() => setValue(initial), [initial]);

  return {
    value,
    setValue,
    onChange,
    onInputChange,
    reset,
  } as const;
};
