export const setLocalStorage = (name, items) => {
  localStorage.setItem(name, JSON.stringify(items));
};
export const getLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  if (data) {
      try {
          return JSON.parse(data);
      } catch (e) {
          console.error(`Error parsing JSON for key "${name}":`, e);
          // Reset to an empty array if the data is invalid
          localStorage.setItem(name, JSON.stringify([]));
          return [];
      }
  } else {
      localStorage.setItem(name, JSON.stringify([]));
      return [];
  }
};

