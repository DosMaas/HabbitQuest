import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


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
    dispatch({ type: 'ADD_DESTINATION', payload: {
      destination_id: destination.id,
      user_id: user.id
    } });
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
      <p>Something witty to explain the destinations</p>
      <section className="destinations">
        {destinations.map(destination => {
          return <li key={destination.id}>
            {destination.name} {destination.distance}
            <button onClick={() => handleClick(destination)} key={destination.id}>Select</button>
          </li>
        })}
      </section>
      <div>
        {/* <button onClick={continueClick}>Let's Go!</button> */}
      </div>
    </div>
  )
};

export default DestinationPage;