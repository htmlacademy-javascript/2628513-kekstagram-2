const getCounter = () => {
  let firstCounter = 0;
  return () => (firstCounter += 1);
};

export {getCounter};
