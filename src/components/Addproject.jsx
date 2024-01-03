import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import search from '../Assets/searchimg.png'
import { projectsApi } from '../services/Allapi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { addProjectResponseContextShare } from '../context/ContextShare';


const Addproject = () => {
    /* to set thhe shared date call at myprojects use contet Api */

    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContextShare)

    //  to get the token
    const [token, setToken] = useState();

    useEffect(() => {
        const getToken = sessionStorage.getItem("token")
        {
            getToken &&
                setToken(getToken)
        }
    }, [])

    console.log(token);



    const [projects, setProjects] = useState({
        project_title: "",
        language_used: "",
        github_link: "",
        website_link: "",
        project_overview: "",
        project_img: "",


    })
    console.log(projects);


    const [show, setShow] = useState(false);

    // cancel all the data-------------------------------//

    const handleClose = () => {
        setShow(false);

        setProjects({
            project_title: "",
            language_used: "",
            github_link: "",
            website_link: "",
            project_overview: "",
            project_img: "",
        })
        setPreview("")
    }


    const handleClosetop = () => {
        handleClose();
    }


    const [preview, setPreview] = useState("");
    console.log(preview);

    useEffect(() => {
        {
            projects.project_img && setPreview(URL.createObjectURL(projects.project_img))
        }
    }, [projects.project_img])

    // Api Call to Add Data

    const handleProjects = async (e) => {
        e.preventDefault();
        console.log('clicked')


        const { project_title, language_used, github_link, website_link, project_overview, project_img } = projects
        console.log(projects);

        if (!project_title || !language_used || !github_link || !website_link || !project_overview || !project_img) {
            toast.info('Fill the forms')
        } else {

            // As we have a photo to load from the local system we have to use form data and addd those values
            const reqbody = new FormData()
            reqbody.append("project_title", project_title)
            reqbody.append("language_used", language_used)
            reqbody.append("github_link", github_link)
            reqbody.append("website_link", website_link)
            reqbody.append("project_overview", project_overview)
            reqbody.append("project_img", project_img)


            if (token) {
                const header = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`

                }

                const results = await projectsApi(reqbody, header)
                console.log(results);
                if (results.status === 200) {
                    toast.success("Added Succesfully")
                    handleClosetop()
                    setAddProjectResponse(results.data)
                } else {
                    toast.error(results.response.data)
                    handleClose()
                }
            }
        }
    }






    const handleShow = () => setShow(true);
    return (
        <>

            <div>
                <button className='border border-primary bg-primary p-1  w-100 text-white rounded' onClick={handleShow}>Add Project</button>

            </div>



            <Modal show={show} onHide={handleClosetop} >
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row >
                        <Col md={6} >
                            <label htmlFor="search">
                                <input id='search' type="file" style={{ display: 'none' }} onChange={(e) => setProjects({ ...projects, project_img: e.target.files[0] })} />

                                <div className='w-100 shadow-lg'>
                                    <img src={preview ? preview : search} className='w-auto img-fluid mt-4 ' alt="no image" height={'100%'} />

                                </div>


                            </label>
                        </Col>
                        <Col md={6}>

                            <input type="text" value={projects.project_title} onChange={(e) => setProjects({ ...projects, project_title: e.target.value })} className='form-control w-100 border border-white' placeholder='Project Title' />
                            <input type="text" value={projects.language_used} onChange={(e) => setProjects({ ...projects, language_used: e.target.value })} className='form-control w-100 border border-white mt-1' placeholder='Language Used' />
                            <input type="text" value={projects.github_link} onChange={(e) => setProjects({ ...projects, github_link: e.target.value })} className='form-control w-100 border border-white mt-1' placeholder='Github Link' />
                            <input type="text" value={projects.website_link} onChange={(e) => setProjects({ ...projects, website_link: e.target.value })} className='form-control w-100 border border-white mt-1' placeholder='Website Link' />
                            <textarea rows={4} value={projects.project_overview} onChange={(e) => setProjects({ ...projects, project_overview: e.target.value })} className='form-control w-100 border border-white mt-1' placeholder='Project Overview' />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="info" onClick={handleProjects} >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>





            <ToastContainer autoClose={2000} theme="colored" position={'top-center'} />

        </>
    )
}

export default Addproject