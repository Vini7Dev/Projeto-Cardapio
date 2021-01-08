/**
 * Page: Forgot Password
 */

import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiAtSign } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

// Component styles
import { Container } from './stylest';

interface IForgotPasswordCredentials {
    email: string;
}

const ForgotPassword: React.FC = () => {
    // When submitting the form, send a request to receive a password reset email
    const handleSubmitForgotPasswordForm = useCallback(async ({
        email
    }: IForgotPasswordCredentials) => {
        try {
            // Sending request to back-end
            await api.post('/password/forgot', { email });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
      <Container>
        <div id="page-content">
          <h1>Recuperar senha</h1>

          {/** Forgot password form */}
          <Form onSubmit={handleSubmitForgotPasswordForm}>
            <Input
              name="email"
              type="email"
              placeholder="Informe seu e-mail"
              icon={FiAtSign}
              borderTopLeft={25}
              borderTopRight={25}
              borderBottomLeft={25}
              borderBottonRigth={25}
            />

            <Button buttonName="Recuperar" />
          </Form>

          <Link to="/login">
            <Button
              label="Não deseja recuperar a senha?"
              buttonName="Voltar"
              color="brown"
              size="small"
            />
          </Link>
        </div>
      </Container>
    )
}

export default ForgotPassword;