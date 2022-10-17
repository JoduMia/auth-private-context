import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../contexts/UserContext';

const Register = () => {
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const {createUser,verifyEmail, updateUser} = useContext(authContext);


  const emailVerification = (email) => {
    verifyEmail()
    .then(()=> {
      alert(`Please check your email named: ${email}`);
      console.log('verified');
    }).catch((error) => {
      console.log(error);
    })
  };

  const updateUserName = (name) => {
    updateUser(name)
    .then(()=> {
      console.log(name);
    }).catch(error => {
      console.log(error);
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    setSuccess(false);
    const form = e.target;
    const name = form.name.value
    const email = form.email.value;
    const password = form.password.value;
    if(!/(?=(.*\d){2})/.test(password)){
      setPasswordError('Password must contain at least 2 digit!!!');
      return;
    }
    console.log(name, email, password);

    createUser(email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setSuccess(true);
      emailVerification(email);
      updateUserName(name)
    })
    .catch((error) => {
      setPasswordError(error.message)
    })
    form.reset();
  };



  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="text-center">
      <h1 className="text-3xl font-bold">Register here !!!</h1>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Enter your Name" name='name' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name='password' className="input input-bordered" />
          <label className="label">
            <Link to="/login" className="label-text-alt link link-hover">Already, have an account?</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
    {
      passwordError && <p className='text-red-500 font-semibold'>{passwordError}</p>
    }

    {
      success && <p className='text-green-500 font-semibold'>Successfully Registered !!!</p>
    }
  </div>
</div>
  )
}

export default Register