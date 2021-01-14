/**
 * Page: Forgot Password
 */

import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../../components/InputAndButtons/Input';
import Button from '../../components/InputAndButtons/Button';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

// Component styles
import { Container } from './stylest';

interface IResetPasswordCredentials {
    new_password: string;
    confirm_password: string;
}

interface IRouteParams {
    token: string;
    new_password: string;
}

const ResetPassword: React.FC = () => {
    // Form reference
    const formRef = useRef<FormHandles>(null);

    // Route params
    const params = useParams() as IRouteParams;

    // Navigation
    const history = useHistory();

    // To use toast
    const toast = useToast();

    // Reset passowrd when the form has submit
    const handleSubmitResetPasswordForm = useCallback(async ({
        new_password,
        confirm_password
    }: IResetPasswordCredentials) => {
        try {
            // Reset form errors
            formRef.current?.setErrors({});

            // Creating shedule validation data
            const schedule = Yup.object().shape({
                new_password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres.').required('A nova senha é obrigatória.'),
                confirm_password: Yup.string().oneOf(
                    [Yup.ref('new_password')], 'A confirmação deve ser igual a nova senha.',
                ).required('A confirmação da senha é obrigatória.')
            });

            // Validate form data
            await schedule.validate({
                new_password,
                confirm_password,
            }, { abortEarly: false });

            // Getting token from route params
            const { token } = params;

            // Reset password in back-en
            await api.post('/password/reset', {
                token,
                new_password
            });

            // Create success toast
            toast.addToast({
                title: 'Senha alterada.',
                description: 'Efetue seu Login com sua nova senha.',
                status: 'success',
            });

            // Go back to login page
            history.push('/signin');
        } catch(error) {
            if(error instanceof Yup.ValidationError) {
                // Getting validation errors
                const validationErrors = getValidationErrors(error);

                // Setting validation errors in form
                formRef.current?.setErrors(validationErrors);
            } else {
                // Create error toast
                toast.addToast({
                    title: 'Falha ao alterar a senha.',
                    description: 'Tente novamente.',
                });
            }
        }
    }, [history, params, toast]);

    return (
      <Container>
        <div id="page-content">
          <h1>Alterar a senha</h1>

          {/** Reset password form */}
          <Form onSubmit={handleSubmitResetPasswordForm} ref={formRef}>
            <Input
              name="new_password"
              type="password"
              placeholder="Informe a nova senha"
              icon={FiLock}
              borderTopLeft={25}
              borderTopRight={25}
            />

            <Input
              name="confirm_password"
              type="password"
              placeholder="Confirme a nova senha"
              icon={FiLock}
              borderBottomLeft={25}
              borderBottonRigth={25}
            />

            {/** Reset password button */}
            <Button buttonName="Alterar" />
          </Form>
        </div>
      </Container>
    )
}

export default ResetPassword;