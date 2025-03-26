import React from 'react';
import { FaGithub, FaUnlockAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUpPage = () => {

  const handleLoginWithGughub=()=>{
    // this self to be in the same page
    window.open("/api/auth/github","_self")
  }

  return (
    <div className='flex flex-col items-center px-6 py-8 h-screen justify-center mx-auto lg:py-0'>
      <div className='w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-glass cursor-pointer'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold md:text-2xl text-center'>Create Account</h1>
          <button
            type='button'
            className='text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4
						focus:ring-[#24292F]/50 font-semibold rounded-lg flex gap-2 p-2 items-center w-full 
						text-center justify-center cursor-pointer'
            onClick={handleLoginWithGughub}
          >
            <FaGithub className='w-5 h-5' />
            Sign up with Github
          </button>
          <p className='text-gray-200'>
            By Signing up, you will unlock all the features of the app.
            <span>
              <FaUnlockAlt className='w-5 h-5 inline mx-2' />
            </span>
          </p>

          <p className='text-sm font-semibold text-gray-500'>
            Already have an account?{" "}
            <Link to={"/login"} className='font-semibold text-primary-600 hover:underline text-blue-600'>
              Login</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default SignUpPage;