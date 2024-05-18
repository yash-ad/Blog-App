// Import the LoginComponent from components
import { Login as LoginComponent } from '../components';

// Login component to render the login form
function Login() {
  return (
    <div className='py-8'>
      {/* Render the LoginComponent */}
      <LoginComponent />
    </div>
  );
}

// Export the Login component
export default Login;
