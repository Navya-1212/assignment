import React, { useState } from "react";
import Button from "./Button";

const ReportCardTable = ({ data, rollNumber }) => {
  const initialInputValues = {};

  data.subjects.forEach((subject) => { 
    initialInputValues[`${subject.name}_PeriodicTest`] = "";
    initialInputValues[`${subject.name}_NoteBook`] = "";
    initialInputValues[`${subject.name}_SubjectEnrichment`] = "";
    initialInputValues[`${subject.name}_AnnualExamination`] = "";
    initialInputValues[`${subject.name}_MarksObtained`] = "";
    initialInputValues[`${subject.name}_Grade`] = "";
  });

  const [inputValues, setInputValues] = useState(initialInputValues);
  const [errorMessages, setErrorMessages] = useState({});

  const maxValues = {
    PeriodicTest: 10,
    NoteBook: 5,
    SubjectEnrichment: 5,
    AnnualExamination: 80,
  };

  const getGrade = (score) => {
    if (score >= 91) return "A1";
    if (score >= 81) return "A2";
    if (score >= 71) return "B1";
    if (score >= 61) return "B2";
    if (score >= 51) return "C1";
    if (score >= 41) return "C2";
    if (score >= 33) return "D";
    return "E (Failed)";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = {
      ...inputValues,
      [name]: value,
    };

    const [subjectName, field] = name.split(/_(.+)/);

    const newErrorMessages = { ...errorMessages };
    const validateField = (fieldName, maxValue) => {
      const numValue = parseFloat(updatedValues[fieldName] || 0);
      if (numValue > maxValue) {
        return `Value cannot exceed ${maxValue}.`;
      }
      return "";
    };

    if (field === "PeriodicTest") {
      newErrorMessages[`${subjectName}_PeriodicTest`] = validateField(
        name,
        maxValues.PeriodicTest
      );
    } else if (field === "NoteBook") {
      newErrorMessages[`${subjectName}_NoteBook`] = validateField(
        name,
        maxValues.NoteBook
      );
    } else if (field === "SubjectEnrichment") {
      newErrorMessages[`${subjectName}_SubjectEnrichment`] = validateField(
        name,
        maxValues.SubjectEnrichment
      );
    } else if (field === "AnnualExamination") {
      newErrorMessages[`${subjectName}_AnnualExamination`] = validateField(
        name,
        maxValues.AnnualExamination
      );
    }

    const calculateMarksObtained = (subjectName) => {
      const periodicTest = parseFloat(
        updatedValues[`${subjectName}_PeriodicTest`] || 0
      );
      const noteBook = parseFloat(
        updatedValues[`${subjectName}_NoteBook`] || 0
      );
      const subjectEnrichment = parseFloat(
        updatedValues[`${subjectName}_SubjectEnrichment`] || 0
      );
      const annualExamination = parseFloat(
        updatedValues[`${subjectName}_AnnualExamination`] || 0
      );

      const totalMarks = Math.min(
        periodicTest + noteBook + subjectEnrichment + annualExamination,
        100
      );
      return totalMarks;
    };

    data.subjects.forEach((subject) => {
      const subjectName = subject.name;
      const marksObtained = calculateMarksObtained(subjectName);
      updatedValues[`${subjectName}_MarksObtained`] = marksObtained;
      updatedValues[`${subjectName}_Grade`] = getGrade(marksObtained);
    });

    setErrorMessages(newErrorMessages);
    setInputValues(updatedValues);
  };

  return (
    <table className="min-w-full border-collapse border border-green-700 px-8">
      <thead className="border-b border-green-700 bg-green-50">
        <tr>
          <th className="border px-4 py-2 text-left">Subjects Name</th>
          <th className="border px-4 py-2 text-left">Periodic Test (10)</th>
          <th className="border px-4 py-2 text-left">Note Book (5)</th>
          <th className="border px-4 py-2 text-left">Subject Enrichment (5)</th>
          <th className="border px-4 py-2 text-left">
            Annual Examination (80)
          </th>
          <th className="border px-4 py-2 text-left">Marks Obtained (100)</th>
          <th className="border px-4 py-2 text-left">Grade</th>
        </tr>
      </thead>
      <tbody>
        {data.subjects.map((subject, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-green-100`}
          >
            <td className="border px-4 py-2">{subject.name}</td>
            <td className="border px-4 py-2">
              <input
                className="w-full px-2 py-1 border rounded"
                type="number"
                name={`${subject.name}_PeriodicTest`}
                value={inputValues[`${subject.name}_PeriodicTest`] || ""}
                onChange={handleChange}
              />
              {errorMessages[`${subject.name}_PeriodicTest`] && (
                <div className="text-red-500 text-sm">
                  {errorMessages[`${subject.name}_PeriodicTest`]}
                </div>
              )}
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full px-2 py-1 border rounded"
                type="number"
                name={`${subject.name}_NoteBook`}
                value={inputValues[`${subject.name}_NoteBook`] || ""}
                onChange={handleChange}
              />
              {errorMessages[`${subject.name}_NoteBook`] && (
                <div className="text-red-500 text-sm">
                  {errorMessages[`${subject.name}_NoteBook`]}
                </div>
              )}
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full px-2 py-1 border rounded"
                type="number"
                name={`${subject.name}_SubjectEnrichment`}
                value={inputValues[`${subject.name}_SubjectEnrichment`] || ""}
                onChange={handleChange}
              />
              {errorMessages[`${subject.name}_SubjectEnrichment`] && (
                <div className="text-red-500 text-sm">
                  {errorMessages[`${subject.name}_SubjectEnrichment`]}
                </div>
              )}
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full px-2 py-1 border rounded"
                type="number"
                name={`${subject.name}_AnnualExamination`}
                value={inputValues[`${subject.name}_AnnualExamination`] || ""}
                onChange={handleChange}
              />
              {errorMessages[`${subject.name}_AnnualExamination`] && (
                <div className="text-red-500 text-sm">
                  {errorMessages[`${subject.name}_AnnualExamination`]}
                </div>
              )}
            </td>
            <td className="border px-4 py-2">
              {inputValues[`${subject.name}_MarksObtained`] || 0}
            </td>
            <td className="border px-4 py-2">
              <input
                className="w-full px-2 py-1 border rounded uppercase"
                type="text"
                name={`${subject.name}_Grade`}
                value={inputValues[`${subject.name}_Grade`] || ""}
                readOnly
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="8" className="px-4 py-2 text-center">
            <Button rollNumber={rollNumber} inputValues={inputValues} />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ReportCardTable;
