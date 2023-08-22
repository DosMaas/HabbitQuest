import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './WelcomePage.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function WelcomePage() {
  const history = useHistory();

  const handleSubmit = () => {
    history.push('/destinations');
  }
  return (
    <div>
      <div className="text">
      <h2>Welcome Traveler!</h2>
      <h3>You are about to embark on an important quest! But first, let's take a look at how it works!</h3>
      <p>1. Choose your destination! Middle Earth has many beautiful sights to see, be sure to note the distance so you don't tire too quickly!</p>
      <p>2. Create your habits! These habits will appear for you daily to check off. They can be large or small goals you'd like to accomplish every day and can be updated whenever you'd like.</p>
      <p>3. Explore Middle Earth, track your progress and enjoy the benefits of the new habits you've created! </p>
      </div>

      <div className="button">
        <Button onClick={handleSubmit} variant="contained" color="success">I'm Ready To Go!</Button>
      </div>
    </div>
  )
};
// Add a button to go to destination page
export default WelcomePage;