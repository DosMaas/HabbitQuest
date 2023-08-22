import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import destinationSaga from '../../redux/sagas/destination.saga';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

function ProgressPage() {
  const dispatch = useDispatch();
  const habitProgress = useSelector(store => store.progress.habitProgress);
  const destinationProgress = useSelector(store => store.progress.destinationProgress);

  useEffect(() => {
    dispatch({ type: 'FETCH_HABITS_PROGRESS' }),
      dispatch({ type: 'FETCH_DESTINATION_PROGRESS' })
  }, []);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));
 
  return (
    <div>
      <h1>Progress Page</h1>
      {/* // ⬇ Destination Progress */}
      <h2>Destination Progress</h2>
      {/* {destination.u} */}
      <Card >
        <CardMedia
          sx={{ height: 200 }}
          image={`/images/${destinationProgress.image_url}`} 
          title="green iguana"
        />
        <CardContent>
        <BorderLinearProgress variant="determinate" value={`${destinationProgress.percentage_completion}`}/>
          You are {destinationProgress.steps_completed} steps out of {destinationProgress.target_distance} from {destinationProgress.destination_name}.

        </CardContent>
      </Card>

      {/* // ⬇ Habit Progress */}
      <div id="HabitProgress">
        <h2>Habit Progress</h2>
        {habitProgress.map((habit) => {
          return (
            <Card key={habit.id}>
              <CardContent
                sx={{
                  backgroundColor: () => {
                    if (habit.completion_percentage >= 75) {
                      return '#d9f7be'
                    } else if (habit.completion_percentage >= 50) {
                      return '#fff9c4'
                    } else if (habit.completion_percentage <= 25) {
                      return '#ffcdd2'
                    }
                  },
                }}
              >
                <div>
                  Habit: {habit.name}
                </div>
                <div>
                  Completed {habit.completion_count} / {habit.days_since_creation} days, {habit.completion_percentage}%
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

    </div>
  )
};

export default ProgressPage;