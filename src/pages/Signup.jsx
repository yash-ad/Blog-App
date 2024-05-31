
import { Signup as SignupComponent } from '../components/index.js'; // Importing the Signup component from its respective path

function Signup() {
  return (
    <>
      <div className="py-0 flex flex-col items-center">
        <SignupComponent /> 
      </div>
    </>
  );
}

export default Signup; // Exporting the Signup component
