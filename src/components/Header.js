import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../contexts/UserContext'

const Header = () => {
  const {user, signOutUser} = useContext(authContext);

  const signOut = () => {
    signOutUser().then(() => {
      console.log('signed out');
    })
  };
  return (
    <div className=" bg-primary text-white font-semibold">
        <div className='flex items-center justify-between'>
            <div>
                <Link to={'/'} className="btn btn-ghost normal-case text-xl"><span className='text-[40px] font-bold text-yellow-400'>She</span><span className='text-[30px] font-bold text-green-600'>ikh</span> </Link>
            </div>
            {user?.email && <p className='text-center'>Welcome, {user.email}</p>}
            <div className='flex items-center gap-3 px-4'>
                <Link to={'/home'}>Home</Link>
                <Link to={'/orders'}>Orders</Link>
                <Link to={'/login'} >Login</Link>
                <Link to={'/register'}>Register</Link>

                {
                  user?.email ?
                  <button onClick={signOut} className="normal-case text-lg">Signout</button> :
                  <Link to={'/login'}>Sign In</Link>
                }
            </div>
        </div>
    </div>
  )
}

export default Header