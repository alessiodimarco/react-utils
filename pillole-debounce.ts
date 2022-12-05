export function createDebounceFn(ms: number) {
  let timerId: NodeJS.Timeout;
  return function debounce(fn: (...args: any[]) => void, ...args: any[]) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), ms);
  };
}

const debounce = createDebounceFn(300);


.
.
.


 const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    debounce(searchInDataTable, value);
  };
