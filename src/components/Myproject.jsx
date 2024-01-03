import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteApi, getUsersProject } from '../services/Allapi';
import { addProjectResponseContextShare, editProjectResponseContextShare } from '../context/ContextShare';
import Editproject from './Editproject';

function Myproject() {
  /* to get thhe shared date from addproject  use contet Api */
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContextShare)
  const { editProjectResponse, seteditProjectResponse } = useContext(editProjectResponseContextShare)


  /* to call all the projects */
  const [allprojects, setAllproject] = useState([])

  const getUserspecificProjects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")


      const header = {
        "Authorization": `Bearer ${token}`,
        " Content-Type": "application/json"
      }

      const results = await getUsersProject(header)
      if (results.status === 200) {
        setAllproject(results.data)
      } else {
        console.log(results.response.data);
      }

    }


  }
  useEffect(() => {
    getUserspecificProjects()
  }, [addProjectResponse, editProjectResponse])

  console.log(allprojects);



  const handledelete = async (_id) => {

    const token = sessionStorage.getItem("token")

    const header = {
      "Authorization": `Bearer ${token}`,
      " Content-Type": "application/json"
    }

    const results = await deleteApi(_id, header)
    console.log(results);
    if (results.status === 200) {
      getUserspecificProjects()
    } else {
      console.log(results.response.data);
    }

  }

  return (
    <div>
      <div className="card p-2 border border-white w-100" style={{ height: '28rem' }}>
        <div className="d-flex justify-content-between  align-items-center" style={{ height: '6rem' }}  >
          <div >
            <h5> MY PPOJECT</h5>
          </div>
          <div >
            <Addproject />
          </div>
        </div>


        {allprojects?.length > 0 ? allprojects?.map((items) => (
          <div className=" border-top border-white d-flex justify-content-between  align-items-center w-100" style={{ height: '5rem' }}>
            <div >
              <h6>{items.project_title}</h6>
            </div>
            <div className='d-flex'>
              <Editproject projectDetails={items} />
              <i class="fa-solid fa-trash me-2" onClick={() => handledelete(items._id)}></i>
              <a href={items.website_link} target="_blank" ><i class="fa-solid fa-link me-2"></i></a>
              <a href={items.github_link} target="_blank" ><i class="fa-brands fa-github"></i></a>


            </div>
          </div>

        )) :
          <p>nothing to display</p>

        }



        <div className=" border-top border-white d-flex justify-content-between  align-items-center w-100" style={{ height: '5rem' }}>
          <div >
            <h5 className='text-primary'>NO  PROJECTED UPLOADED  YET</h5>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Myproject