import React, { useContext, useState } from 'react'
import loginimage from '../Assets/Login.jpeg'
import { Link, useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from '../services/Allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContextShare } from '../context/ContextShare';

function Auth(props) {

  const { isAuthToken, setisAuthToken } = useContext(isAuthTokenContextShare)



  console.log(props);
  const regstrationForm = props.register ? true : false
  console.log(regstrationForm);
  const [registered, setRegisterd] = useState({
    username: "",
    email: "",
    password: "",
  })
  console.log(registered);

  const navigate = useNavigate()
  const handleRegister = async () => {
    console.log("buttonclickred");


    const { username, password, email } = registered

    if (!username || !password || !email) {
      toast.info('Fill the form')
    } else {
      const result = await registerApi(registered)
      console.log(result);
      if (result.status === 200) {

        toast.success(`${result.data.username} Registered Succesfully`)
        setRegisterd(
          {
            username: "",
            email: "",
            password: ''
          }
        )

        navigate('/login')
      } else {
        toast.error(result.response.data)
      }

    }



  }



  const handleLogin = async () => {
    const { email, password } = registered

    if (!email || !password) {
      toast.info("fill the Forms")
    } else {
      const loginInfo = await loginApi(registered)
      console.log(loginInfo);

      if (loginInfo.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(loginInfo.data.existingUser))
        sessionStorage.setItem("token", loginInfo.data.token)
        toast.success("Logined Succesfully")
        setisAuthToken(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        toast.error(loginInfo.response.data)
      }
    }

  }

  return (
    <>

      <div class="container w-100">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <img className='img-fluid rounded-circle border border-info border-5' src={loginimage} height={'100%'} width={'100%'} alt="" />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 d-flex flex-column align-items-center">
            <h2 className='ms-3'>  <i class="fa-brands fa-r-project fa-2x"></i> PROJECT FAIR</h2>
            {regstrationForm ? <h6 className='ms-5'>Sign up to Your Account</h6> : <h6 className='ms-5'>Sign in to Your Account</h6>}

            {regstrationForm && <input type="text" className='form-control  mt-4 w-75' placeholder='Enter User Name' value={registered.username} onChange={(e) => setRegisterd({ ...registered, username: e.target.value })} />
            }
            <input type="email" className='form-control  mt-4 w-75' placeholder='Enter Email' value={registered.email} onChange={(e) => setRegisterd({ ...registered, email: e.target.value })} />
            <input type="password" className='form-control mt-4 w-75' placeholder='Enter Password' value={registered.password} onChange={(e) => setRegisterd({ ...registered, password: e.target.value })} />


            {regstrationForm ?

              <div>
                <button className='mt-4 w-75 bg-primary text-white border border-white ' style={{ height: '3rem' }} onClick={handleRegister}>REGISTER</button>

                <p>Already a user ? Click here to  <Link to={'/login'} className='text-white '><span className='text-info fs-4 w-100 '>Login</span></Link></p>
              </div>



              :

              <div>
                <button className='mt-4 w-75 bg-primary text-white border border-white ' style={{ height: '3rem' }} onClick={handleLogin}>LOGIN</button>
                <p> Registerd new User ? Click here to  <Link to={'/register'} className='text-white' ><span className='text-info fs-4 w-100 '>Register</span></Link></p>

              </div>

            }
          </div>

        </div>
      </div>
      <ToastContainer autoClose={2000} theme={"colored"} position={"top-center"} />
    </>
  )
}

export default Auth