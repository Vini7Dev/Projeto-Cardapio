/**
 * Page: Forgot Password
 */

import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiAtSign } from 'react-icons/fi';
import * as Yup from 'yup';

import Input from '../../components/InputAndButtons/Input';
import Button from '../../components/InputAndButtons/Button';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';
import { useLoad } from '../../hooks/load';

// Component styles
import { Container, AnimationContainer } from './stylest';

interface IForgotPasswordCredentials {
    email: string;
}

const ForgotPassword: React.FC = () => {
    // Form reference
    const formRef = useRef<FormHandles>(null);

    // Navigation
    const history = useHistory();

    // To use toast
    const toast = useToast();

    // To use load
    const load = useLoad();

    // When submitting the form, send a request to receive a password reset email
    const handleSubmitForgotPasswordForm = useCallback(async ({
        email
    }: IForgotPasswordCredentials) => {
        // Start load screen
        load.setLoad(true);

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
            await api.post('/password/forgot', { email });

            // Create success toast
            toast.addToast({
                title: 'Recuperação realizada com sucesso!',
                description: 'Acesse o link enviado ao seu email para restaurar sua senha.',
                status: 'success',
            });

            // Go back to login page
            history.push('/signin');
        } catch (error) {
            if(error instanceof Yup.ValidationError) {
                // Getting validation errors
                const validationErrors = getValidationErrors(error);

                // Setting validation errors in form
                formRef.current?.setErrors(validationErrors);
            } else {
                // Create error toast
                toast.addToast({
                    title: 'Falha ao recuperar a senha.',
                    description: 'Tente novamente.',
                });
            }
        }

        // Stop load screen
        load.setLoad(false);
    }, [history, toast, load]);

    return (
      <Container>
        <AnimationContainer>
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
            <Button
              buttonName="Recuperar"
              data-testid="submit-button"
            />
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
        </AnimationContainer>
      </Container>
    )
}

export default ForgotPassword;