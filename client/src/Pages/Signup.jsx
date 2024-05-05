import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Sigup() {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [Retypepassword, setRetypepassword] = useState("")
  const [username, setusername] = useState("")

  const Handlevent = (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      password: password,
      re_enter_password: Retypepassword
    }
    console.log(payload)
    // if (password !== Retypepassword) {
    //   Swal.fire({
    //     title: 'Password Mismatch',
    //     text: 'The entered passwords do not match. Please try again.',
    //     icon: 'error',
    //     confirmButtonText: 'OK',
    //     timer: 3000,
    //   });
    // }

    axios.post('http://localhost:3000/api/signup', payload).then(json => {
      console.log(json.data);
      console.log(json.data.message);

      if (json.data.message == 'Password & Re-type Password not match ') {
        Swal.fire({
          title: 'Password Mismatch',
          text: 'The entered passwords do not match. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 3000,
        });
      }
      else if (json.data.message == 'User already exist') {
        Swal.fire({
          title: 'User Already Exists',
          text: 'The provided email is already associated with an existing user.',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 3000,
        });
      }
      else if (json.data.message == 'SignUP SucessFully') {
        Swal.fire({
          title: 'Registration Successful!',
          text: 'Your account has been created successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000,
        })
      }
    })
      .catch((err) => console.log(err));


    setemail('')
    setpassword('')
    setusername('')
    setRetypepassword('')

  }

  return (
    <>
      <div className=" d-flex justify-content-center align-items-center " style={{ width: '100vw', height: '100vh' }}>
        <div className='bg-light p-5 rounded'>
          <h3 className='text-center mb-4'>Sign UP</h3>
          <form onSubmit={Handlevent}>
            <div className=" mb-3">

              <div className="container">
                <label className='form-label' htmlFor="\">Username</label>
                <input type="text" name="" id=""
                  placeholder='Enter Userame'
                  className="form-control"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className=" mb-3">
              <div className="container">
                <label className='form-label' htmlFor="\">Email</label>
                <input type="email"
                  placeholder='Enter your Email'
                  className="form-control"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>


            </div>

            <div className="  mb-3">

              <div className="container">
                <label className='form-label' htmlFor="\">Password</label>
                <input type="password"
                  placeholder='Create new Password'
                  className="form-control"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>

            </div>

            <div className="  mb-3">

              <div className="container">
                <label className='form-label' htmlFor="\">Re-type Password</label>
                <input type="password"
                  placeholder='Re-type Password'
                  className="form-control"
                  value={Retypepassword}
                  onChange={(e) => setRetypepassword(e.target.value)}
                  required
                />
              </div>

            </div>

            <div className="d-grid col-12 mx-auto mt-4">
              <button className="btn btn-danger p-2" type='submit'>Sign Up</button>
            </div>
          </form>

          <Link className='nav-link text-danger text-end' to="/"><small><span className='text-dark'>Already a member ?</span> Login</small></Link>

        </div>
      </div>
    </>
  )
}