import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './DestinationPage.css';
import Button from '@mui/material/Button';


function DestinationPage() {
  const destinations = useSelector(store => store.destination.destinationList);
  const user = useSelector(store => store.user)
  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: 'FETCH_DESTINATION' });
  }, []);

  function handleClick(destination) {
    // let destinationID = destination.id;
    // let userID = user.id;
    dispatch({
      type: 'ADD_DESTINATION', payload: {
        destination_id: destination.id,
        user_id: user.id
      }
    });
    history.push('/habits')
  }

  // function continueClick(event) {
  //   event.preventDefault();
  //   dispatch({
  //     type: 'ADD_DESTINATION'});
  //     history.push('/creation')
  // }

  return (
    <div>
      <h2>Choose Your Destination</h2>
      <p>Choose a destination to begin exploring Middle Earth. Choose wisely, every destination has a different distance. Each habit you complete gets you one step closer!</p>
      <section className="destinations">
        <table className="table">
          <tbody>

            {destinations.map(destination => {
              return <tr key={destination.id}>
                <td style={{width: 'auto'}} className="name">{destination.name}</td>
                <td style={{width: 'auto'}} className="steps">{destination.distance} steps</td>
                <td>
                  <Button onClick={() => handleClick(destination)} key={destination.id} variant="contained" color="success">Select</Button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </section>
      <div>
        {/* <button onClick={continueClick}>Let's Go!</button> */}
      </div>
    </div>
  )
};

export default DestinationPage;