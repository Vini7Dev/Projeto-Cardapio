/**
 * Page: Login
 */

import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiAtSign, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';

import Button from '../../components/Button';
import Input from '../../components/Input';

// Component styles
import { Container } from './styles';

const Login: React.FC = () => {
    // Submit form data
    const handleSubmitLogin = useCallback((data) => {
        console.log(data);
    }, []);

    return (
      <Container>
        <h1>Entrar</h1>

        {/** Login form */}
        <Form onSubmit={handleSubmitLogin}>
          <Input
            name="email"
            placeholder="Informe seu e-mail"
            borderTopLeft={25}
            borderTopRight={25}
            type="email"
          >
            <FiAtSign size={40} />
          </Input>

          <Input
            name="password"
            placeholder="Informe sua senha"
            borderBottomLeft={25}
            borderBottonRigth={25}
            type="password"
          >
            <FiLock size={40} />
          </Input>

          {/** Create section */}
          <Button buttonName="Entrar" type="submit" />
        </Form>

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