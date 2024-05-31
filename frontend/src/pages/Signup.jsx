import React, { useState } from 'react';
import Heading from '../components/Heading';

import InputBox from '../components/InputBox';
import PrimaryButton from '../components/PrimaryButton';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubTitle from '../components/SubTitle';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';

const Signup = () => {
  const navigate = useNavigate();
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  // console.log(BACKEND_BASE_URL);
  const setCurrentUser = useSetRecoilState(userAtom);

  const [formData, setFormData] = useState({
    fullname: '',

    email: '',
    password: '',
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const submitForm = async () => {
    console.log('formdata is: ', formData);
    const res = await axios.post(
      `${BACKEND_BASE_URL}/api/v1/users/signup`,
      formData
    );
    console.log('response from backend is: ', res.data);
    const data = res.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.details));
    setCurrentUser(data.details);
  };
  return (
    <>
      <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
          <div className='bg-yellow-200 w-96 pt-2 pb-2 pl-2 pr-2 mt-2 mb-2 ml-2 mr-2 rounded-md flex flex-col justify-center'>
            <Heading label={'Signup'} />
            <SubTitle label={'Enter your information to create your account'} />
            <InputBox
              label={'Full Name'}
              placeholder={'John'}
              name={'fullname'}
              onChange={handleInput}
              value={formData.fullname}
            />

            <InputBox
              label={'Email'}
              placeholder={'johndoe'}
              name={'email'}
              onChange={handleInput}
              value={formData.email}
            />
            <InputBox
              label={'Password'}
              placeholder={'JohnDoe123'}
              name={'password'}
              onChange={handleInput}
              value={formData.password}
            />
            <PrimaryButton label={'Signup'} onClick={submitForm} />
            <Footer
              label={'Already have an account?'}
              buttonText={'Signin'}
              to={'/signin'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
