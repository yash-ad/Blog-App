import {Container,Logo,LogoutBtn} from '../index'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header() {

//Authentication status/Current status of the state.
const authStatus = useSelector((state)=> state.auth.status);
const navigate = useNavigate();


//navItems Array of objects, for looping over an array:-
const navItems = [ {
  name: 'Home',
  slug: "/",
  active: true
}, 
{
  name: "Login",
  slug: "/login",
  active: !authStatus,
},
{
  name: "Signup",
  slug: "/signup",
  active: !authStatus,
},
{
  name: "All Posts",
  slug: "/all-posts",
  active: authStatus,
},
{
  name: "Add Post",
  slug: "/add-post",
  active: authStatus,
},]

  return (
<header className='py-3 shadow bg-gray-500'>
<Container>
  <nav>
    <div>
    <Link to={'/'}>
      <Logo width={'70px'}/>
    </Link>
    </div>
    {/* Classic-Javascript */}
    {/* Lets use classic javascript ot iterate over an array we are using map over here to each element of an array and also ofcourse we are using key for unique indetfier to know react.
     */}
<ul className='flex ml-auto'>
{navItems.map((item)=>
item.active ? (
  <li key={item.name}>
     <button
     onClick={()=> navigate(item.slug)}>{item.name}</button>
  </li>
) : null
)}
{/* //If the user is authenticated that means it true and signed in  then show the 'Logout' button */}
{
  authStatus && (
    <li>
    <LogoutBtn/>
    </li>
  )
}
</ul>
  </nav>
</Container>
</header>
  )
}

export default Header