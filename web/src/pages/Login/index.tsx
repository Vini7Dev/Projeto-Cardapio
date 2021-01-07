/**
 * Page: Login
 */

import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiAtSign, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';

import GoBackButton from '../../components/GoBackButton';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/auth';

// Component styles
import { Container } from './styles';

interface IRestaurant {
    id: string;
    trade: string;
    cnpj: string;
    telephone: string;
    logo_url: string;
    email: string;
    menu: {
        id: string;
        menu_code: number;
    }
}

interface ILoginResponse {
    restaurant: IRestaurant;
    token: string;
}

const Login: React.FC = () => {
    // Use authentication data and functions
    const auth = useAuth();

    // Submit login form
    const handleSubmitLogin = useCallback(async (data) => {
        // Getting form data
        const { email, password } = data;

        // Run login
        await auth.login({
            email,
            password,
        });
    }, [auth]);

    return (
      <Container>
        <GoBackButton />

        <div id="page-content">
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
            <Link to="/forgot">AQUI</Link>
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
        </div>
      </Container>
    )
}

export default Login;