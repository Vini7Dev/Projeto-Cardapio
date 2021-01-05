/**
 * Page: Login
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiAtSign, FiLock } from 'react-icons/fi'

import Button from '../../components/Button';
import Input from '../../components/Input';

// Component styles
import { Container } from './styles';

const Login: React.FC = () => {
    return (
      <Container>
        <h1>Entrar</h1>

        {/** Login form */}
        <form>
          <Input
            placeholder="Informe seu e-mail"
            borderTopLeft={25}
            borderTopRight={25}
            type="email"
          >
            <FiAtSign size={40} />
          </Input>

          <Input
            placeholder="Informe sua senha"
            borderBottomLeft={25}
            borderBottonRigth={25}
            type="password"
          >
            <FiLock size={40} />
          </Input>

          {/** Create section */}
          <Button buttonName="Entrar" />
        </form>

        {/** Forgot password option */}
        <p>
          Esqueceu sua senha? Clique
          {' '}
          <strong>AQUI</strong>
        </p>

        {/** Logon button option */}
        <Link to="logon">
          <Button
            label="Não tem uma conta?"
            buttonName="Cadastrar-se GRÁTIS"
            color="brown"
            size="small"
          />
        </Link>
      </Container>
    )
}

export default Login;