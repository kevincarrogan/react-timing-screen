const padIntegerStart = (integer, padLength = 2) => (
  integer.toString().padStart(padLength, '0')
);

export default padIntegerStart;
