/**
 * Page: Sign In
 */

import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiAtSign, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import GoBackButton from '../../components/InputAndButtons/GoBackButton';
import Button from '../../components/InputAndButtons/Button';
import Input from '../../components/InputAndButtons/Input';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { useLoad } from '../../hooks/load';

// Component styles
import { Container } from './styles';

interface ISignInCredentials {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    // Form reference
    const formRef = useRef<FormHandles>(null);

    // To use toast
    const toast = useToast();

    // Use authentication data and functions
    const auth = useAuth();

    // To use load
    const load = useLoad();

    // Submit Sign In form
    const handleSubmitSignIn = useCallback(async (data: ISignInCredentials) => {
        // Start load screen
        load.setLoad(true);

        try {
            // Reset form errors
            formRef.current?.setErrors({});

            // Getting form data
            const { email, password } = data;

            // Creating a schema validation for the data
            const schema = Yup.object().shape({
                email: Yup.string().email('Digite um email válido.').required('O email é obrigatório.'),
                password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres.').required('A senha é obrigatória.'),
            });

            // Validate data
            await schema.validate({ email, password }, { abortEarly: false })

            // Run Sign In
            await auth.login({
                email,
                password,
            });
        } catch(error) {
            if(error instanceof Yup.ValidationError) {
                // Getting validation errors
                const validationErrors = getValidationErrors(error);

                // Setting validation errors in form
                formRef.current?.setErrors(validationErrors);
            } else {
                // Create error toast
                toast.addToast({
                    title: 'Falha ao entrar na conta.',
                    description: 'Tente novamente.'
                });
            }
        }

        // Stop load screen
        load.setLoad(false);
    }, [auth, toast, load]);

    return (
      <Container>
        <GoBackButton />

        <div id="page-content">
          <h1>Entrar</h1>

          {/** Sign In form */}
          <Form onSubmit={handleSubmitSignIn} ref={formRef}>
            <Input
              name="email"
              type="email"
              placeholder="Informe seu e-mail"
              icon={FiAtSign}
              borderTopLeft={25}
              borderTopRight={25}
            />

            <Input
              name="password"
              type="password"
              placeholder="Informe sua senha"
              icon={FiLock}
              borderBottomLeft={25}
              borderBottonRigth={25}
            />

            {/** Create section */}
            <Button buttonName="Entrar" type="submit" />
          </Form>

          {/** Forgot password option */}
          <p>
            Esqueceu sua senha? Clique
            {' '}
            <Link to="/forgot-password">AQUI</Link>
          </p>

          {/** Logon button option */}
          <Link to="/signup">
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

export default SignIn;