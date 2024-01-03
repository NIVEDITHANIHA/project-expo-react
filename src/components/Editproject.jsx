import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import search from '../Assets/searchimg.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import { baseUrl } from '../services/Baseurl';
import { EditprojectApi } from '../services/Allapi';
import { editProjectResponseContextShare } from '../context/ContextShare';
const Editproject = ({ projectDetails }) => {
    const { editProjectResponse, seteditProjectResponse } = useContext(editProjectResponseContextShare)
    console.log(projectDetails);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };
    const handleClosetop = () => {
        handleClose();
    }
    const handleShow = () => {
        setShow(true);
    }




    const [editProject, setEditProjects] = useState({

        project_title: projectDetails.project_title,
        language_used: projectDetails.language_used,
        github_link: projectDetails.github_link,
        website_link: projectDetails.website_link,
        project_overview: projectDetails.project_overview,
        project_img: "",


    })
    console.log(editProject);

    /* for image Upload get image */
    const [preview, setPreview] = useState("")
    console.log(preview);
    useEffect(() => {
        if (editProject.project_img) {
            setPreview(URL.createObjectURL(editProject.project_img))

        }

    }, [editProject.project_img])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = projectDetails._id
        const { project_title, language_used, github_link, website_link, project_overview, project_img } = editProject
        if (!project_title || !language_used || !github_link || !website_link || !project_overview || !project_img) {
            toast.info("Fill the  Form")
        }
        else {
            const reqbody = new FormData()
            reqbody.append("project_title", project_title)
            reqbody.append("language_used", language_used)
            reqbody.append("github_link", github_link)
            reqbody.append("website_link", website_link)
            reqbody.append("project_overview", project_overview)
            preview ? reqbody.append("project_img", project_img) : reqbody.append("project_img", projectDetails.project_img)

            const token = sessionStorage.getItem("token")
            if (token) {
                const header = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`

                }

                const results = await EditprojectApi(id, reqbody, header)
                console.log(results);
                if (results.status === 200) {

                    seteditProjectResponse(results)
                    toast.success("Succesfully Updated Projects")
                    handleClose()
                }
                else {
                    console.log(results.response.data);

                }


            }
            else {
                const header = {
                    "Authorization": `Bearer ${token}`,
                    " Content-Type": "application/json"
                }

                const results = await EditprojectApi(id, reqbody, header)
                console.log(results);
                if (results.status === 200) {

                    seteditProjectResponse(results)
                    toast.success("Succesfully Updated Projects")
                    handleClose()
                }
                else {
                    console.log(results.response.data);

                }
            }

        }

    }



    return (
        <>
            <div>
                <i class="fa-solid fa-pen-to-square me-2" onClick={handleShow}></i>
            </div>
            <Modal show={show} onHide={handleClosetop} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row >
                        <Col md={6} >
                            <label htmlFor="search">
                                <input id='search' type="file" style={{ display: 'none' }} onChange={(e) => setEditProjects({ ...editProject, project_img: e.target.files[0] })} />

                                <div className='w-100 shadow-lg'>
                                    <img src={preview ? preview : `${baseUrl}/uploads/${projectDetails.project_img}`} className='w-auto img-fluid mt-4 ' alt="no image" height={'100%'} />

                                </div>


                            </label>
                        </Col>
                        <Col md={6}>

                            <input type="text" value={editProject.project_title} onChange={(e) => setEditProjects({ ...editProject, project_title: e.target.value })} className='form-control w-100 border border-white' placeholder='Project Title' />
                            <input type="text" value={editProject.language_used} onChange={(e) => setEditProjects({ ...editProject, language_used: e.target.value })} className='form-control w-100 border border-white mt-1' placeholder='Language Used' />
                            <input type="text" value={editProject.github_link} onChange={(e) => setEditProjects({ ...editProject, github_link: e.target.value })} className='form-control w-100 border border-white mt-1' placeholder='Github Link' />
                            <input type="text" value={editProject.website_link} onChange={(e) => setEditProjects({ ...editProject, website_link: e.target.value })} className='form-control w-100 border border-white mt-1' placeholder='Website Link' />
                            <textarea rows={4} value={editProject.project_overview} onChange={(e) => setEditProjects({ ...editProject, project_overview: e.target.value })} className='form-control w-100 border border-white mt-1' placeholder='Project Overview' />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="info" onClick={handleSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal >





            <ToastContainer autoClose={2000} theme="colored" position={'top-center'} />
        </>
    )
}

export default Editproject