import { Login as LoginComponent } from '../components'; // Importing the Login component from its respective path

function Login() {
  return (
    <div className='py-8'> {/* Container for the Login page */}
       <LoginComponent /> {/* Rendering the LoginComponent */}
    </div>
  );
}

export default Login; // Exporting the Login component for use in other parts of the application
