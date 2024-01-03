import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { isAuthTokenContextShare } from '../context/ContextShare';
function Header(props) {
  const { isAuthToken, setisAuthToken } = useContext(isAuthTokenContextShare)

  console.log(props);
  const dashboardRoute = props.dashboard ? true : false
  const navigate = useNavigate();

  const handleLogout = () => {

    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate("/")
    setisAuthToken(false)
  }
  return (
    <div>
      <Navbar expand="lg" className='bg-primary'>
        <Container>
          <Navbar.Brand href="#home" className='text-white text-center'>
            <h1 > <i class="fa-brands fa-r-project fa-2x"></i> PROJECT EXPO</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {dashboardRoute && <button className='bg-primary border border-primary text-white shadow' onClick={handleLogout} style={{ width: '10rem', height: '2.5rem' }}><i class="fa-solid fa-power-off  me-2"></i>LOG OUT</button>}
        </Container>
      </Navbar>
    </div>
  )
}

export default Header