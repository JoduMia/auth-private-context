import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/UserContext';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const {signIn, googleSignIn, resetPassword} = useContext(authContext);
  const navigate = useNavigate();

  const onBlurEmail = (e) => {
    const email = e.target.value;
    setUserEmail(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      form.reset();
      navigate('/')
    })
    .catch((error) => {
      console.log(error);
    })
    form.reset();
  };


  const googleSign = () => {
    googleSignIn()
    .then(result => {
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      console.log(error.message);
    })
  };

  const passwordReset = () => {
    resetPassword(userEmail)
    .then(()=> {
      alert(`New password is sent to: ${userEmail}`);
    }).catch((error)=> {
      console.log(error);
    })
  }



  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="text-center">
      <h1 className="text-3xl font-bold">Please Login now!</h1>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input onBlur={onBlurEmail} type="email" placeholder="email" name='email' className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name='password' className="input input-bordered" />
          <label className="label">
            <button onClick={passwordReset} className="label-text-alt link link-hover">Forgot password?</button>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">Login</button>
        </div>
      </form>
      <button onClick={googleSign} className="btn btn-success">Google</button>
    </div>
  </div>
</div>
  )
}

export default Login