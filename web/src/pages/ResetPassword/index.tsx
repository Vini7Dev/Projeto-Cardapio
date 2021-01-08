/**
 * Page: Forgot Password
 */

import React, { useCallback } from 'react';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

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
    // Route params
    const params = useParams() as IRouteParams;

    // Navigation
    const history = useHistory();

    // Reset passowrd when the form has submit
    const handleSubmitResetPasswordForm = useCallback(async ({
        new_password,
        confirm_password
    }: IResetPasswordCredentials) => {
        try {
            // ADD VALIDATION DATA

            // Getting token from route params
            const { token } = params;

            // Reset password in back-en
            await api.post('/password/reset', {
                token,
                new_password
            });

            // Go back to login page
            history.push('/signin');
        } catch(error) {
            console.log(error);
        }
    }, []);

    return (
      <Container>
        <div id="page-content">
          <h1>Alterar a senha</h1>

          {/** Reset password form */}
          <Form onSubmit={handleSubmitResetPasswordForm}>
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