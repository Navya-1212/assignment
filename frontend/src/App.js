import React from 'react'
import ReportCardTable from './components/ReportCardTable'
import RollNumber from './components/RollNumber';
import { Data } from './components/Data'
import { useState } from 'react';


const App = () => {
  const [rollNumber, setRollNumber] = useState('')
  return (
    <div>
      {/* Approach 1 */}
      {/* <MarkSheet/> */} 

      {/* Approach 2 */}

      <RollNumber rollNumber={rollNumber} setRollNumber={setRollNumber} />
      <ReportCardTable data={Data} rollNumber={rollNumber} />
    </div>
  )
}

export default App;
