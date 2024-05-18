// Import the SignupComponent from components
import { Signup as SignupComponent } from '../components';

// Signup component to render the signup form
function Signup() {
  return (
    <div className='py-8'>
      {/* Render the SignupComponent */}
      <SignupComponent />
    </div>
  );
}

// Export the Signup component
export default Signup;
