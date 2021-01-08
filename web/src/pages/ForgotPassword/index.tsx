/**
 * Page: Forgot Password
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiAtSign } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

// Component styles
import { Container } from './stylest';

const ForgotPassword: React.FC = () => {

    return (
      <Container>
        <div id="page-content">
          <h1>Recuperar senha</h1>

          {/** Forgot password form */}
          <Form onSubmit={(data) => {console.log(data)}}>
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