
import { Container, Button } from '../components/index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




function Home() {
  const status = useSelector((state) => state.auth.status)

  const navigate = useNavigate();

  const navigateHome = () => {
    if (status) {
      navigate('/all-posts')
    } else {
      navigate('/login')
    }
  };

  return (
    <div className="w-full my-20 md:py-8 text-center md:min-h-auto bg-dark">
      <Container>
        <div className="flex flex-col gap-20 my-20 md:my-14 items-center justify-around">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-[52px] md:text-[52px] lg:text-[72px] hero-heading mx-auto">
              Welcome to the <span className="text-customPink">BlogHub</span>
            </h1>
            <div className="mx-auto">
              <Button
                onClick={() => navigateHome()}
                className="my-7 md:py-2 py-0 px-5 text-white font-weight-400 bg-customPink rounded-xl shadow-lg duration-200 hover:cursor-pointer hover:bg-white hover:text-black hover:scale-105 md:mx-2 md:my-6"
              >
                {status ? 'See Posts' : 'Get Started'}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Home