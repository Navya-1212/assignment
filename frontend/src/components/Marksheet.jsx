import React, { useState } from 'react';
import './MarkSheet.css';

const MarkSheet = () => {

  const [marks, setMarks] = useState({
    Mary: { English: '', Hindi: '', Maths: '', Physics: '', Chemistry: '' },
    Tina: { English: '', Hindi: '', Maths: '', Physics: '', Chemistry: '' },
    Jack: { English: '', Hindi: '', Maths: '', Physics: '', Chemistry: '' }
  });

 
  const [editingCell, setEditingCell] = useState({});

  const handleChange = (student, subject, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [student]: {
        ...prevMarks[student],
        [subject]: value !== '' ? parseInt(value, 10) : '',
      },
    }));
  };

  const toggleEditing = (student, subject) => {
    setEditingCell((prevEditing) => ({
      ...prevEditing,
      [`${student}-${subject}`]: !prevEditing[`${student}-${subject}`],
    }));
  };

  const calculateTotal = (student) => {
    return Object.values(marks[student]).reduce(
      (total, mark) => total + (mark || 0),
      0
    );
  };

  return (
    <div className="marksheet-container">
      <h1 className="report-card-heading">Report Card</h1>
      <table className="marksheet-table">
        <thead>
          <tr>
            <th>Subjects</th>
            <th>Mary</th>
            <th>Tina</th>
            <th>Jack</th> 
          </tr>
        </thead>
        <tbody>
          {Object.keys(marks.Mary).map((subject, index) => (
            <tr key={index}>
              <td>{subject}</td>
              {Object.keys(marks).map((student) => (
                <td key={student} onClick={() => toggleEditing(student, subject)}>
                  {editingCell[`${student}-${subject}`] ? (
                    <input
                      type="number"
                      value={marks[student][subject]}
                      onChange={(e) => handleChange(student, subject, e.target.value)}
                      onBlur={() => toggleEditing(student, subject)}
                      autoFocus
                    />
                  ) : (
                    marks[student][subject] || ''
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr className="total-row">
            <td><strong>Total</strong></td>
            {Object.keys(marks).map((student) => (
              <td key={student}><strong>{calculateTotal(student)}</strong></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MarkSheet;
