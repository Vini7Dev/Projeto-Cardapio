/**
 * Page: Logon
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import InputGroup from '../../components/InputGroup';

// Component styles
import { Container } from './styles';

const Logon: React.FC = () => {
    return (
      <Container>
        <h1>Cadastrar-se</h1>

        <h2>ADICIONAR FOTO</h2>

        {/** Logon form */}
        <form>
          {/** Restaurant data */}
          <InputGroup label="Dados do restaurante:">
            <Input
              placeholder="Nome fantasia"
              borderTopLeft={25}
              borderTopRight={25}
            />

            <Input
              placeholder="CNPJ"
            />

            <Input
              placeholder="Telefone para contato"
              borderBottomLeft={25}
              borderBottonRigth={25}
            />
          </InputGroup>

          {/** Login data */}
          <InputGroup label="Dados do login:">
            <Input
              placeholder="E-mail"
              borderTopLeft={25}
              borderTopRight={25}
              type="email"
            />

            <Input
              placeholder="Senha"
              type="password"
            />

            <Input
              placeholder="Confirme a senha"
              borderBottomLeft={25}
              borderBottonRigth={25}
              type="password"
            />
          </InputGroup>

          {/** Create account button */}
          <Button
            buttonName="Cadastrar-se"
          />
        </form>

        {/** Login button option */}
        <Link to="login">
          <Button
            buttonName="Entrar"
            label="Já tem uma conta?"
            color="brown"
            size="small"
          />
        </Link>
      </Container>
    )
}

export default Logon;