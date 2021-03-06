/** @jsx jsx */
import React, { FC, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jsx } from '@emotion/core';
import { auth } from '../firebase/index';
import {
  login,
  signUp,
  createUser,
  loginWithSocialAccount,
  loginAnonymously,
} from '../firebase/auth';
import { LoginFormComponent, InputData } from '../components/loginForm/loginForm';
import { loading } from '../stores/loading';

if (auth().isSignInWithEmailLink(window.location.href)) {
  createUser();
}

export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (email && password) {
      const methods = await auth().fetchSignInMethodsForEmail(email);
      if (methods[0]) {
        dispatch(loading());
        await login(email, password);
        history.push('/');
      } else {
        await signUp(email, password);
        history.push('/');
      }
    }
  };

  const handleChangeEmail = (event: FormEvent, { value }: InputData) => {
    setEmail(value);
  };

  const handleChangePassword = (event: FormEvent, { value }: InputData) => {
    setPassword(value);
  };

  const handleGoogleClick = async () => {
    await loginWithSocialAccount(new auth.GoogleAuthProvider());
    history.push('/');
  };

  const handleTwitterClick = async () => {
    await loginWithSocialAccount(new auth.TwitterAuthProvider());
    history.push('/');
  };

  return (
    <LoginFormComponent
      handleClick={handleClick}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      handleGoogleClick={handleGoogleClick}
      handleTwitterClick={handleTwitterClick}
      loginAnonymously={loginAnonymously}
    />
  );
};
