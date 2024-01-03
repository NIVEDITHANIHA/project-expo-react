import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Projecctcard from '../components/Projecctcard';
import { getAllProject } from '../services/Allapi';
import { Link } from 'react-router-dom';

function Project() {
  const [projetctstatus, setProjectStatus] = useState([])
  /* Serach key used to search    */
  const [searchKey, setSearchKey] = useState("")


  /* to know Token is there or not */
  const [istoken, setIstoken] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIstoken(true)
    }
  })

  console.log(istoken);


  const getAllPRojects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")

      const header = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"

      }
      const responses = await getAllProject(searchKey, header)

      console.log(responses);

      if (responses.status === 200) {
        setProjectStatus(responses.data)
      } else {

        console.log(responses.response.data);
      }

    }

  }
  console.log(searchKey);

  useEffect(() => {
    getAllPRojects();
  }, [searchKey])






  return (
    <div>
      <Header />


      <div class="d-flex align-items-center justify-content-center w-100  " style={{ height: '17rem' }}>
        <div>
          <h1>ALL PROJECTS</h1>
          <div className='d-flex'>
            <input type="text" className='form-control' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
            <i class="fa-solid fa-magnifying-glass mt-2" style={{ marginLeft: '-2rem' }}></i>
          </div>
        </div>


      </div>

      <div className='container mb-5 w-100' >
        <Row >
          {projetctstatus?.length > 0 ? projetctstatus.map((items) => (<Col lg={4} md={6} sm={12} className='mb-5'>
            <Projecctcard projectDetail={items} />
          </Col>)) :
            <div>


              {istoken ? <p className='fs-3 text-danger d-flex align-items-center justify-content-center'>No Search items are found here</p>
                :
                <div className='d-flex align-items-center justify-content-center flex-column'>
                  <img src="https://2.bp.blogspot.com/-WdNReAvdDFM/VrocQdIoHbI/AAAAAAAAR1M/SEBM2vUBMog/s1600/SID_FB_001.gif" alt="No image" className='img-fluid rounded' height={'30%'} width={'30%'} />
                  <p className='text-info fs-5'>Please <Link style={{ textDecoration: "none" }} to={'/login'}>Login</Link> To See More Projects</p>
                </div>

              }

            </div>






          }


        </Row>
      </div>

    </div >
  )
}

export default Project