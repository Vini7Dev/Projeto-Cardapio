/**
 * Page: Forgot Password
 */

import React from 'react';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

// Component styles
import { Container } from './stylest';

const ResetPassword: React.FC = () => {

    return (
      <Container>
        <div id="page-content">
          <h1>Alterar a senha</h1>

          {/** Reset password form */}
          <Form onSubmit={(data) => {console.log(data)}}>
            <Input
              name="password"
              type="password"
              placeholder="Informe a nova senha"
              icon={FiLock}
              borderTopLeft={25}
              borderTopRight={25}
            />

            <Input
              name="password"
              type="password"
              placeholder="Confirme a nova senha"
              icon={FiLock}
              borderBottomLeft={25}
              borderBottonRigth={25}
            />

            <Button buttonName="Recuperar" />
          </Form>
        </div>
      </Container>
    )
}

export default ResetPassword;