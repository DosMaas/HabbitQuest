import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


function ProgressPage() {
  const dispatch = useDispatch();

useEffect(() => {
  dispatch({type: 'FETCH_HABITS_PROGRESS'})
}, []);
  
  return (
    <div>
      <h1>Progress Page</h1>
    </div>
  )
};

export default ProgressPage;