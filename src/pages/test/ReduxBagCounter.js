import React from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../../actions/bagCounterAction";

const ReduxBagCounter = () => {
  // redux dispatch
  const dispatch = useDispatch();

  return (
    <div className="container">
      <button onClick={() => dispatch(increment())}>Increase Item</button>
      <button onClick={() => dispatch(decrement())}>Decrease Item</button>
    </div>
  );
};

export default ReduxBagCounter;
