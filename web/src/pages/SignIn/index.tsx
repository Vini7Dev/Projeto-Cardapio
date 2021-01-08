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

import GoBackButton from '../../components/GoBackButton';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/auth';

// Component styles
import { Container } from './styles';

interface ISignInCredentials {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    // Form reference
    const formRef = useRef<FormHandles>(null);

    // Use authentication data and functions
    const auth = useAuth();

    // Submit Sign In form
    const handleSubmitSignIn = useCallback(async (data: ISignInCredentials) => {
        // Getting form data
        const { email, password } = data;

        try {
            // Reset form errors
            formRef.current?.setErrors({});

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
                console.log(error);

                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);
            }
        }
    }, [auth]);

    return (
      <Container>
        <GoBackButton />

        <div id="page-content">
          <h1>Entrar</h1>

          {/** Sign In form */}
          <Form onSubmit={handleSubmitSignIn} ref={formRef}>
            <Input
              name="email"
              placeholder="Informe seu e-mail"
              icon={FiAtSign}
              borderTopLeft={25}
              borderTopRight={25}
              type="email"
            />

            <Input
              name="password"
              placeholder="Informe sua senha"
              icon={FiLock}
              borderBottomLeft={25}
              borderBottonRigth={25}
              type="password"
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