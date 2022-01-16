import React from 'react';
import MainComponent from '../../../components/shared/MainComponent';
import LoginForm from '../../../components/LoginForm';
import SignUpForm from '../../../components/SignUpForm';

const Login: React.FC = () => {
  return (
    <MainComponent>
      <br />
      <LoginForm titlePhrase="Acessar minha conta" buttonPhrase="ACESSAR" />
      <br />

      <SignUpForm titlePhrase="Criar nova conta" buttonPhrase="CRIAR" />
    </MainComponent>
  )
}

export default Login;
