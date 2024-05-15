import { Container, Logo, LogoutBtn } from '../index'; // Importing necessary components
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { useSelector } from 'react-redux'; // Importing useSelector to access Redux store state

// Header component definition
export function Header() {
  const authStatus = useSelector((state) => state.auth.status); // Accessing authentication status from Redux store
  const navigate = useNavigate(); // Initializing the useNavigate hook for programmatic navigation

  // Array containing navigation items with their respective properties
  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },   //Current authStatus by default from store is "true"
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    // Header container with styling classes
    <header className='py-3 shadow bg-gray-500'>
      <Container> {/* Container component to manage layout */}
        <nav className='flex'> {/* Flex container for navigation */}
          <div className='mr-4'> {/* Logo container */}
            {/* Link to home route with application logo */}
            <Link to='/'>
              <Logo width='70px' /> {/* Logo component with specified width */}
            </Link>
          </div>
          <ul className='flex ml-auto'> {/* Flex container for navigation items */}
            {navItems.map((item) => // Mapping through navigation items array
              item.active ? ( // Conditionally rendering active navigation items
                <li key={item.slug}> {/* Unique key for each navigation item */}
                  {/* Button for navigation with click event handling */}
                  <button
                    onClick={() => navigate(item.slug)} // Navigate to specified route on button click
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' // Styling classes
                  >
                    {item.name} {/* Displaying navigation item name */}
                  </button>
                    {console.log("button clicked")}
                </li>
              ) : null // Rendering null for inactive navigation items
            )}
            {authStatus && ( // Conditional rendering of logout button based on authentication status,if authentication true and user is logged in then show them logout button
              <li>
                <LogoutBtn /> {/* Logout button component */}
              </li>
            )}
            
          </ul>
        </nav>
      </Container>
    </header>
  );
}
