export const debounce = (fn: Function, delayInMs = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  let previousCcTime = Date.now();
  return (...args: any[]) => {
    const now = Date.now();
    if (now - previousCcTime < delayInMs) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delayInMs);
      return;
    } else {
      fn.apply(this, args);
      previousCcTime = now;
    }
  };
};
