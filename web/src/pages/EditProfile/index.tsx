/**
 * Page: Edit Profile
 */

import React, { useCallback, useRef } from 'react';
import { FiBriefcase, FiPhone, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import AddLogo from '../../components/AddLogo';
import InputGroup from '../../components/InputGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GoBackButton from '../../components/GoBackButton';

// Component styles
import { Container } from './styles';

const EditProfile: React.FC = () => {
    // Form reference
    const formRef = useRef<FormHandles>(null);

    const handleSubmitUpdateProfile = useCallback(() => { const a = 0 }, []);

    const handleSetSelectedLogo = useCallback(() => { const b = 0 }, []);

    return (
      <Container>
        <GoBackButton />

        <div id="page-content">
          <h1>Editar os dados</h1>

          {/** Sign Up form */}
          <Form onSubmit={handleSubmitUpdateProfile} ref={formRef}>
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
                name="telephone"
                placeholder="Telefone para contato"
                icon={FiPhone}
                borderBottomLeft={25}
                borderBottonRigth={25}
              />
            </InputGroup>

            {/** Login data */}
            <InputGroup label="Alterar a senha:">
              <Input
                name="new_password"
                placeholder="Senha"
                icon={FiLock}
                borderTopLeft={25}
                borderTopRight={25}
                type="password"
              />

              <Input
                name="confirm_password"
                placeholder="Confirme a senha"
                icon={FiLock}
                borderBottomLeft={25}
                borderBottonRigth={25}
                type="password"
              />
            </InputGroup>

            <InputGroup label="Informe a senha autal:">
              <Input
                name="current_password"
                placeholder="Senha atual"
                icon={FiLock}
                borderTopLeft={25}
                borderTopRight={25}
                borderBottomLeft={25}
                borderBottonRigth={25}
                type="password"
              />
            </InputGroup>

            {/** Create account button */}
            <Button
              buttonName="Atualizar os dados"
            />
          </Form>
        </div>
      </Container>
    );
}

export default EditProfile;