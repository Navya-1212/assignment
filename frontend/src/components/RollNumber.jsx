 
import React from "react";

const RollNumber = ({ rollNumber, setRollNumber }) => {
  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="rollNumber" className="font-extrabold">
        Roll Number:{" "}
      </label>
      <input
        className="font-medium border"
        type="text"
        id="rollNumber"
        name="rollNumber"
        value={rollNumber}
        onChange={handleRollNumberChange}
      />
    </div>
  );
};

export default RollNumber;
