import React from "react";
import { useState } from "react";
export default function App() {
  return (
    <div className="App">
      <TipCalculator />
    </div>
  );
}
function TipCalculator() {
  const [bill, setBill] = React.useState(0);
  const [percentage1, setPercentage1] = React.useState(0);
  const [percentage2, setPercentage2] = React.useState(0);

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handlereset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }
  return (
    <div className="tip-calculator">
      <BillInput bill={bill} setBill={setBill} />
      <SelectPercentage percentage1={percentage1} onSelect={setPercentage1}>
        {" "}
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage2={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handlereset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied(o%)</option>
        <option value="5">It was okey (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Abssolutely amazing!(20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>
      you pay {bill + tip} (${bill} +${tip} tip)
    </h3>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
