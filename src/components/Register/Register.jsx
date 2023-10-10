import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../firebase/firebase.config';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
    const [regError,setRegError]=useState('');
    const [success,setSuccess]=useState('');
    const [showPassword,setShowPassword]=useState(false);


    const handleRegister =e=>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(name,email,password,terms);
        setRegError('');
        setSuccess('');

        if(password.length<6){
            setRegError('Password should be at least 6 char or longer');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegError('Your password should have at least one upper case characters');
            return;
        }
        else if(!terms)
        {
            setRegError('please accept out terms & conditions')
            return;
        }
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user,);
            setSuccess('User created Successfully');

            updateProfile(result.user,{
                displayName:name,
            })
            .then(()=>{
                console.log("profile updated")
            })
            .catch(error =>{
                console.log(error);
            })

            sendEmailVerification(result.user)
            .then(()=>{
                alert('Please check your email and verify your account');
            })
        })
        .catch(error =>{
            console.log(error);
            setRegError(error.message)
        })
    }
    return (
        <div className='border py-4 mx-auto'>
            <h2 className='text-3xl'>Please Register</h2>
            <form className='space-y-3 mt-5' action="" onSubmit={handleRegister}>
                <input className='border w-3/4 px-2' type='text' name='name' placeholder='Your Name' />
                <br />
                <input className='border w-3/4 px-2' type='email' name='email' placeholder='Your Email' />
                <br />
                <div className='relative'>
                <input className='border w-3/4 px-2' type={showPassword? 'text':'password'} name='password' placeholder='Your Password'  />
                <span className='absolute top-1/4' onClick={()=>setShowPassword(!showPassword)}>
                    {
                        showPassword ? <FaEyeSlash></FaEyeSlash>:
                        <FaEye></FaEye>
                    }
                </span>
                </div>
                <br />
                <input type="checkbox" name='terms' id='terms' />
                <label className='ml-2' htmlFor="terms">Accept our terms & condition</label>
                <br />
                <input className='border btn-secondary w-3/4 ' type="submit" value="Register" />
            </form>
            {
                regError && <p className='text-red-400'>{regError}</p>
            }
            {
                success && <p className='text-green-400'>{success}</p>
            }
            <p>Already have an account please <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default Register;