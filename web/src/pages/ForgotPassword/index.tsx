/**
 * Page: Forgot Password
 */

import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiAtSign } from 'react-icons/fi';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

// Component styles
import { Container } from './stylest';

interface IForgotPasswordCredentials {
    email: string;
}

const ForgotPassword: React.FC = () => {
    // Form reference
    const formRef = useRef<FormHandles>(null);

    // Navigation
    const hsitory = useHistory();

    // When submitting the form, send a request to receive a password reset email
    const handleSubmitForgotPasswordForm = useCallback(async ({
        email
    }: IForgotPasswordCredentials) => {
        try {
            // Reset form errors
            formRef.current?.setErrors({});

            // Creating a schema validation for the data
            const schema = Yup.object().shape({
                email: Yup.string().email('Informe um email válido.').required('O email é obrigatório.'),
            });

            // Validate formd ata
            await schema.validate({ email }, { abortEarly: false });

            // Sending request to back-end
            api.post('/password/forgot', { email });

            // Go back to login page
            hsitory.push('/signin');
        } catch (error) {
            if(error instanceof Yup.ValidationError) {
                // Getting validation errors
                const validationErrors = getValidationErrors(error);

                // Setting validation errors in form
                formRef.current?.setErrors(validationErrors);
            }
        }
    }, []);

    return (
      <Container>
        <div id="page-content">
          <h1>Recuperar senha</h1>

          {/** Forgot password form */}
          <Form onSubmit={handleSubmitForgotPasswordForm} ref={formRef}>
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

            {/** Send mail to reset password */}
            <Button buttonName="Recuperar" />
          </Form>

          {/** Back to login page option */}
          <Link to="/signin">
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