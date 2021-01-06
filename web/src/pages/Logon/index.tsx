/**
 * Page: Logon
 */

import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiCreditCard, FiPhone, FiAtSign, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import Button from '../../components/Button';
import Input from '../../components/Input';
import InputGroup from '../../components/InputGroup';
import AddLogo from '../../components/AddLogo';

// Component styles
import { Container } from './styles';

const Logon: React.FC = () => {
    // Submit form data
    const handleSubmitLogon = useCallback((data) => {
        console.log(data);
    }, []);

    return (
      <Container>
        <div id="page-content">
          <h1>Cadastrar-se</h1>

          <AddLogo />

          {/** Logon form */}
          <Form onSubmit={handleSubmitLogon}>
            {/** Restaurant data */}
            <InputGroup label="Dados do restaurante:">
              <Input
                name="trade"
                placeholder="Nome fantasia"
                borderTopLeft={25}
                borderTopRight={25}
              >
                <FiBriefcase size={40} />
              </Input>

              <Input
                name="cnpj"
                placeholder="CNPJ"
              >
                <FiCreditCard size={40} />
              </Input>

              <Input
                name="telephone"
                placeholder="Telefone para contato"
                borderBottomLeft={25}
                borderBottonRigth={25}
              >
                <FiPhone size={40} />
              </Input>
            </InputGroup>

            {/** Login data */}
            <InputGroup label="Dados do login:">
              <Input
                name="email"
                placeholder="E-mail"
                borderTopLeft={25}
                borderTopRight={25}
                type="email"
              >
                <FiAtSign size={40} />
              </Input>

              <Input
                name="password"
                placeholder="Senha"
                type="password"
              >
                <FiLock size={40} />
              </Input>

              <Input
                name="password_confirm"
                placeholder="Confirme a senha"
                borderBottomLeft={25}
                borderBottonRigth={25}
                type="password"
              >
                <FiLock size={40} />
              </Input>
            </InputGroup>

            {/** Create account button */}
            <Button
              buttonName="Cadastrar-se"
            />
          </Form>

          {/** Login button option */}
          <Link to="login">
            <Button
              buttonName="Entrar"
              label="Já tem uma conta?"
              color="brown"
              size="small"
            />
          </Link>
        </div>
      </Container>
    )
}

export default Logon;