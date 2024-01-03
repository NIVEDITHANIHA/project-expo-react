import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import { editProfileApi } from '../services/Allapi';
import { baseUrl } from '../services/Baseurl';

function Profile() {
  const [open, setOpen] = useState(false);

  const [editProfille, setEditProfile] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profile: "",



  })

  const [preview, setPreview] = useState('')
  const [existingProfile, setexistingProfile] = useState('')


  useEffect(() => {

    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    console.log("user", user);

    setEditProfile({
      ...editProfille, username: user.username, email: user.email,
      password: user.password, github: user.github, linkedin: user.linkedin, profile: ""
    })

    setexistingProfile(user.profile)

  }, [])
  console.log(editProfille);

  useEffect(() => {
    if (editProfille.profile) {
      setPreview(URL.createObjectURL(editProfille.profile))

    } else {
      setPreview("")
    }
  }, [editProfille.profile])


  const handleUpdate = async () => {

    const { username, email, password, github, linkedin, profile } = editProfille

    if (!github || !linkedin) {
      toast.info("Fill the form")

    } else {
      const reqbody = new FormData()
      reqbody.append("username", username)
      reqbody.append("email", email)
      reqbody.append("password", password)
      reqbody.append("github", github)
      reqbody.append("linkedin", linkedin)
      preview ? reqbody.append("profile", profile) : reqbody.append("profile", existingProfile)

      const token = sessionStorage.getItem("token")
      if (preview) {
        const header = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`

        }
        const results = await editProfileApi(reqbody, header)
        console.log(results);
        if (results.status === 200) {
          toast.success("Succesfully Updated Profile")
        } else {
          console.log(results.response.data);
        }
      }
      else {
        const header = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        }
        const results = await editProfileApi(reqbody, header)
        console.log(results);
        if (results.status === 200) {
          toast.success("Succesfully Updated Profile")
        } else {
          console.log(results.response.data);
        }
      }

    }

  }







  return (
    <div>


      <Card>
        <Card.Body >
          <div className="d-flex align-items-center w-75 justify-content-between">
            <Card.Title>PROFILE</Card.Title>
            <i class="fa-solid fa-caret-down fa-2x" onClick={() => setOpen(!open)}></i>
          </div>
          <Collapse in={open}>
            <Card.Text>
              <label htmlFor="profile" className="d-flex align-items-center w-100 justify-content-center" >
                <input id="profile" type="file" style={{ display: 'none' }} onChange={(e) => setEditProfile({ ...editProfille, profile: e.target.files[0] })} />
                {existingProfile == "" ?
                  <img className='img-fluid rounded-circle ' width={'100%'} src={preview ? preview : "https://adzmode.com/wp-content/uploads/2022/07/digital-marketing-specialist.png"} alt="noimg" /> :
                  <img className='img-fluid rounded-circle ' width={'100%'} src={preview ? preview : `${baseUrl}/uploads/${existingProfile}`} alt="noimg" />
                }              </label>

              <input type="text" className='form-control mt-2 w-100' placeholder='Github ' value={editProfille.github} onChange={(e) => setEditProfile({ ...editProfille, github: e.target.value })} />
              <input type="text" className='form-control mt-2' placeholder='LinkedIn ' value={editProfille.linkedin} onChange={(e) => setEditProfile({ ...editProfille, linkedin: e.target.value })} />
              <button className='bg-primary border border-white text-white shadow mt-4 text-center w-100' style={{ width: '9rem', height: '2.5rem' }} onClick={handleUpdate}>Update</button>


            </Card.Text>
          </Collapse>
        </Card.Body>
      </Card>


      <ToastContainer autoClose={2000} theme="colored" position={'top-center'} />


    </div>
  )
}

export default Profile