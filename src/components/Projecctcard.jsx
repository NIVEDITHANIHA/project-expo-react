import React from 'react';
import Card from 'react-bootstrap/Card';
import titleimage from "../Assets/images.jpeg";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { baseUrl } from '../services/Baseurl';


function Projecctcard({ projectDetail }) {
  console.log(projectDetail);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>


      <Card style={{ width: '16rem' }} onClick={handleShow}>
        <Card.Img className='img-fluid' width={'100px'} variant="top" src={projectDetail.project_img ? `${baseUrl}/uploads/${projectDetail.project_img}` : titleimage} />
        <Card.Body >
          <Card.Title>{projectDetail.project_title} </Card.Title>
          <Card.Text>
          </Card.Text>

        </Card.Body>
      </Card>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{projectDetail.project_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                <img className='img-fluid' width={'100%'} src={projectDetail.project_img ? `${baseUrl}/uploads/${projectDetail.project_img}` : titleimage} alt="Noimg" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-between">
                <h3>{projectDetail.project_title}</h3>
                <p className='w-100'>{projectDetail.project_overview}</p>
                <span>{projectDetail.language_used}</span>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <a href={projectDetail.github_link} target='_blank'><i class="fa-solid fa-link"></i></a>
          <a href={projectDetail.website_link} target='_blank'><i class="fa-brands fa-github fa-2x me-2"></i></a>



        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Projecctcard