import { Container, Button } from '../components/index'; // Importing the Container and Button components from their respective paths
import { useSelector } from 'react-redux'; // Importing the useSelector hook from React Redux to access the Redux store state
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from React Router DOM to navigate between routes

function Home() {
  const status = useSelector((state) => state.auth.status); // Accessing the authentication status from the Redux store

  const navigate = useNavigate(); // Initializing the navigate function to navigate between routes

  const navigateHome = () => { // Defining a function to navigate based on the authentication status
    if (status) { // Checking if the user is authenticated
      navigate('/all-posts'); // Navigating to the '/all-posts' route if authenticated
    } else {
      navigate('/login'); // Navigating to the '/login' route if not authenticated
    }
  };

  return (
    <div className="w-full my-20 md:py-8 text-center md:min-h-auto bg-dark"> {/* Container for the Home page */}
      <Container> {/* Container component to manage layout */}
        <div className="flex flex-col gap-20 my-20 md:my-14 items-center justify-around"> {/* Flex container for content */}
          <div className="flex flex-col items-center md:items-start"> {/* Flex container for heading */}
            <h1 className="text-[52px] md:text-[52px] lg:text-[72px] hero-heading mx-auto"> {/* Heading */}
              Welcome to the <span className="text-customPink">Blogzy</span> {/* Text with custom styling */}
            </h1>
            <div className="mx-auto"> 
              <Button 
              // Setting the click handler 'navigateHome' to navigate based on authentication status.
                onClick={navigateHome} 
                className="my-7 md:py-2 py-0 px-5 text-white font-weight-400 bg-customPink rounded-xl shadow-lg duration-200 hover:cursor-pointer hover:bg-white hover:text-black hover:scale-105 md:mx-2 md:my-6" 
              >
              {/* changes text conditionaly render based on authentication status */}
                {status ? 'See Posts' : 'Get Started'}  
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home; // Exporting the Home component for use in other parts of the application
