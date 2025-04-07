// utils/debounce.ts

export function debounce(fn: Function, delay: number) {
    let timer: number | null = null;  // 使用 `number` 来代替 `NodeJS.Timeout`
  
    return function (...args: any[]) {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = window.setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  