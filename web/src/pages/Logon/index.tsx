/**
 * Page: Logon
 */

import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiBriefcase, FiCreditCard, FiPhone, FiAtSign, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import GoBackButton from '../../components/GoBackButton';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputGroup from '../../components/InputGroup';
import AddLogo from '../../components/AddLogo';

import api from '../../services/api';

// Component styles
import { Container } from './styles';

interface ICreateRestaurant {
    trade: string;
    cnpj: string;
    telephone: string;
    email: string;
    password: string;
}

const Logon: React.FC = () => {
    // Navigation
    const history = useHistory();

    // Logo file selected
    const [selectedLogo, setSelectedLogo] = useState<File | null>(null);

    // Save data from the selected logo file
    const handleSetSelectedLogo = useCallback((file: File | null) => {
        setSelectedLogo(file);
    }, []);

    // Submit logon form data
    const handleSubmitLogon = useCallback(async ({
        trade,
        cnpj,
        telephone,
        email,
        password,
    }: ICreateRestaurant) => {
        try {
            // Saving form data
            const formData = new FormData();
            formData.append('trade', trade);
            formData.append('cnpj', cnpj);
            formData.append('telephone', telephone);
            formData.append('email', email);
            formData.append('password', password);
            if(selectedLogo) {
                formData.append('logo', selectedLogo);
            }

            // Creating restaurant
            await api.post('/restaurants', formData);

            // Go back to login page
            history.push('/login');
        } catch (error) {
            console.log(error);
        }
    }, [selectedLogo, history]);

    return (
      <Container>
        <GoBackButton />

        <div id="page-content">
          <h1>Cadastrar-se</h1>

          {/** Logon form */}
          <Form onSubmit={handleSubmitLogon}>
            {/** Restaurant data */}
            <AddLogo setSelectedFile={handleSetSelectedLogo} />

            <InputGroup label="Dados do restaurante:">
              <Input
                name="trade"
                placeholder="Nome fantasia"
                icon={FiBriefcase}
                borderTopLeft={25}
                borderTopRight={25}
              />

              <Input
                name="cnpj"
                placeholder="CNPJ"
                icon={FiCreditCard}
              />

              <Input
                name="telephone"
                placeholder="Telefone para contato"
                icon={FiPhone}
                borderBottomLeft={25}
                borderBottonRigth={25}
              />
            </InputGroup>

            {/** Login data */}
            <InputGroup label="Dados do login:">
              <Input
                name="email"
                placeholder="E-mail"
                icon={FiAtSign}
                borderTopLeft={25}
                borderTopRight={25}
                type="email"
              />

              <Input
                name="password"
                placeholder="Senha"
                icon={FiLock}
                type="password"
              />

              <Input
                name="password_confirm"
                placeholder="Confirme a senha"
                icon={FiLock}
                borderBottomLeft={25}
                borderBottonRigth={25}
                type="password"
              />
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