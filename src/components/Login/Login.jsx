import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const [regError,setRegError]=useState('');
    const [success,setSuccess]=useState('');

    const emailRef =useRef(null);
    const handleLogin=(e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password);

        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user);
            if(result.user.emailVerified)
            {
                setSuccess('User Login Successfully');
            }
            else{
                alert('Please verify Your email');
            }
            
        })
        .catch(error =>{
            console.log(error);
            setRegError(error.message);
        });
    }
    const handleForgetPassword=(e)=>{
        // e.preventDefault();
        // console.log('sent reset email',emailRef.current.value);
        const email = emailRef.current.value;
        if(!email){
            console.log('Please provide an email',emailRef.current.value);
            return;
        }
        else if(! /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))
        {
           console.log('please write a valid email');
           return;
        }

        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('Please Check Your Email');
        })
        .catch(error =>{
            console.log(error);
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleLogin}>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                {
                regError && <p className='text-red-400'>{regError}</p>
                }
                {
                    success && <p className='text-green-400'>{success}</p>
                }
                <p>New to this website Please <Link to='/register'>Please register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;