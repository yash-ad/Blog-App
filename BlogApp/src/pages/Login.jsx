import { Login as LoginComponent } from '../components/Login'; // Import the LoginForm component from components directory

function Login() {
  return (
    <div className='py-8'>
      {/* Render the LoginFormComponent */}
      <LoginComponent />
    </div>
  );
}

export default Login;
