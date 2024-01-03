import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MyProject from '../components/Myproject'
import Profile from '../components/Profile'
import { Col, Row } from 'react-bootstrap'


function Dashboard() {

  const [state, setState] = useState("")

  useEffect(() => {
    const existingUser = JSON.parse(sessionStorage.getItem("existingUser")).username
    setState(existingUser)


  }, [])

  console.log("existingUser", state);
  return (
    <div>

      <Header dashboard={"dashboard"} />

      <h2 class="container mt-4">Welcome {state}</h2>
      <div class="container mt-4">
        <Row >
          <Col sm={12} md={8} className='mt-4'>
            <MyProject> </MyProject>
          </Col>
          <Col sm={12} md={4} className='mt-4'>
            <Profile> </Profile>
          </Col>

        </Row>
      </div>
    </div>
  )
}

export default Dashboard