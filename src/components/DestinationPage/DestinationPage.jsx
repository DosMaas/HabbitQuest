import { useSelector } from "react-redux";


function DestinationPage() {
  const destinations = useSelector(store => store.destinationList)
  return (
    <div>
      <h2>Choose Your Destination</h2>
      <section className="destinations">
      {destinations.map(destination => {
        return<div key={destination.id}>
          
        </div>
      })}
      </section>
    </div>
  )
};

export default DestinationPage;