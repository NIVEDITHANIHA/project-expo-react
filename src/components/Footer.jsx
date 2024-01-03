import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div >
            <div className="container border-bottom mt-5">
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h5>  Get Connected With Us On Social Networks  </h5>
                    </div>
                    <div className="col mb-2 d-flex justify-content-between align-items-center">

                        <i class="fa-brands fa-instagram  fa-2x me-2"></i>
                        <i class="fa-brands fa-facebook fa-2x me-2"></i>
                        <i class="fa-brands fa-linkedin-in fa-2x me-2"></i>
                        <i class="fa-solid fa-envelope fa-2x me-2"></i>
                        <i class="fa-brands fa-github fa-2x me-2"></i>
                    </div>

                </div>
            </div>

            <div class="container mt-3 ">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12" style={{ textAlign: 'justify' }}>
                        <h5>COMPANY NAME</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, perferendis! Quibusdam quo quidem fugiat beatae fuga assumenda in adipisci, neque provident ipsum iste harum fugit, labore illo temporibus cumque rerum!</p>

                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 " style={{ textAlign: 'justify' }}>
                        <h5>Guides </h5>
                        <p>React </p>
                        <p>React Bootstrap</p>
                        <p>React Bootswatch</p>
                    
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 d-flex flex-column" style={{ textAlign: 'justify' }}>
                        <h5> LINKS</h5>

                        <Link to={"/"} className='p-1 ' style={{ textDecoration: 'underline', fontSize: "16px" }}>Home</Link>
                        <Link to={"/login"} className='p-1 ' style={{ textDecoration: 'underline', fontSize: "16px" }}>Login</Link>
                        <Link to={"/register"} className='p-1 ' style={{ textDecoration: 'underline', fontSize: "16px" }}>Register</Link>
                        <Link to={"/dashboard"} className='p-1 ' style={{ textDecoration: 'underline', fontSize: "16px" }}>dashboard</Link>
                        <Link to={"/project"} className='p-1 ' style={{ textDecoration: 'underline', fontSize: "16px" }}>Project</Link>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12" style={{ textAlign: 'justify' }}>
                        <h5>Contact</h5>
                        <p> <i class="fa-solid fa-location-dot me-2"></i> New York NY 10012</p>
                        <p><i class="fa-solid fa-envelope me-2"></i>info@example.com</p>
                        <p><i class="fa-solid fa-phone  me-2"></i>+ 01 23456789</p>
                        <p><i class="fa-solid fa-print me-2"></i>+ 01 23456789</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer