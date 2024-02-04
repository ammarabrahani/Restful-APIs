import { useCallback } from "react";

const Child = ({ setCounter, counter }) => {
  const handleCounter = (type) => {
    if (type === "ADD_INCREMENT") {
      setCounter((counter) => counter + 1);
    } else {
      if (counter > -1) setCounter((counter) => counter - 1);
      console.log("Button clicked!");
    }
  };

  const handleClickWithCallback = useCallback(() => {
    console.log("Button clicked!");
    setCounter((counter) => counter + 1);
  }, [setCounter]);
  return (
    <>
      <button onClick={() => handleClickWithCallback("ADD_INCREMENT")}>
        Add Count
      </button>
      <button onClick={() => handleCounter("DELETE_INCREMENT")}>
        Decrement
      </button>
    </>
  );
};

export default Child;
