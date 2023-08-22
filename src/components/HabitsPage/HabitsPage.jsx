import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './HabitsPage.css'


function HabitsPage() {
  const habits = useSelector(store => store.habit.habitList);
  const user = useSelector(store => store.user)
  const history = useHistory();
  const dispatch = useDispatch();
  const [newHabit, setNewHabit] = useState('');

  function addHabit() {
    if(!newHabit) return;
    dispatch({
      type: 'ADD_HABIT', payload: {
        newHabit: newHabit,
        userID: user.id
      }
    });
    // dispatch({type: 'FETCH_HABIT'});
    setNewHabit('');
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_HABIT' })
  }, []);

  const handleSubmit = () => {
    history.push('/daily');
  }

  return (
    <div>
      <h2>Create Your Habbits!</h2>
      <p>Whoa! Slow down young traveler, you're not
        ready to begin your quest just yet. Create
        your habbits below before you leave!
      </p>
      <form onSubmit={addHabit} className="input-field">
        <TextField
           className="input"
          variant="outlined"
          size="small"
          color="success"
          type="text"
          onChange={(event) => setNewHabit(event.target.value)}
          value={newHabit}
        />
        <Button type="submit" variant="contained" color="success" >Add Habit</Button>
        {/* Make button click disabled without input text */}
      </form>
      <div className="habits">
        <table>
          <thead>
            <tr>
              <th>Your Habbits!</th>
            </tr>
          </thead>
          <tbody>
            {habits.map(habit => {
              return <tr key={habit.id}>
               <td>{habit.name}</td> 
                </tr>})}
          </tbody>
        </table>
        <Button className="button" variant="contained" color="success" onClick={handleSubmit}>Begin My Quest!</Button>
      </div>
    </div>
  )
};

export default HabitsPage;