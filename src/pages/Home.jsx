import React, { useEffect, useState } from 'react';
import titleimage from "../Assets/images.jpeg"
import Projecctcard from '../components/Projecctcard';
import { Link } from 'react-router-dom';
import { getHomeProject } from '../services/Allapi';

function Home() {

    const [state, setState] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        setState(token ? true : false)


    }, [])


    const [projects, setProjects] = useState("")
    const getHomeProjects = async () => {
        const results = await getHomeProject()
        setProjects(results.data)


    }
    console.log(projects);
    useEffect(() => {
        getHomeProjects();
    }, [])







    console.log("token", state);
    return (
        <div>
            <div class="container mt-5">
                <div class="row ">
                    <div class="col-lg-6 col-md-6 col-sm-12 mt-5">

                        <h2>
                            <i class="fa-brands fa-r-project"></i>   Project Expo
                        </h2>
                        <h6>One Stop Destination For All SoftWare Development project</h6>
                        {state ? <button className='bg-primary text-white rounded w-25 border border-white' style={{ height: '3rem' }}><Link to={'/dashboard'} style={{ textDecoration: 'none' }} >Manage Project</Link></button>
                            : <button className='bg-primary text-white rounded w-25 border border-white' style={{ height: '3rem' }}  ><Link to={'/login'} style={{ textDecoration: 'none' }} >Get Started</Link></button>
                        }

                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 bg-warning rounded-pill mb-5">
                        <img width={'600rem'} height={'400rem'} className='rounded-circle text-white img-fluid' src={titleimage} alt="No image" />
                    </div>

                </div>
            </div>

            <div className='container'>
                <h1 className=' d-flex align-items-center justify-content-center'>Explore Our Projects</h1>
                <marquee scrollAmount={20} className="mt-4">
                    <div className='d-flex justify-content-between align-items-center mb-5'>
                        {projects?.length > 0 ? projects.map((items) => (
                            <div className='ms-5' style={{ width: '30rem' }}>
                                <Projecctcard projectDetail={items} />
                            </div>
                        )) : <p>Nothing To show</p>}

                    </div>
                </marquee>
                <Link className=' d-flex align-items-center justify-content-center' to={'/project'}>See All Our Projects</Link>

            </div>
        </div>
    )
}

export default Home