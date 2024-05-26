import React from "react"; // Importing React for JSX syntax
import { Signup as SignupComponent } from '../components/index.js'; // Importing the Signup component from its respective path

function Signup() {
  return (
    <>
      <div className="py-0 flex flex-col items-center"> {/* Container for the Signup component */}
        <SignupComponent /> {/* Rendering the Signup component */}
      </div>
    </>
  );
}

export default Signup; // Exporting the Signup component
