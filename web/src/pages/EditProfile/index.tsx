/**
 * Page: Edit Profile
 */

import React, { useCallback, useRef, useState } from 'react';
import { FiBriefcase, FiPhone, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import AddLogo from '../../components/InputAndButtons/AddLogo';
import InputGroup from '../../components/InputAndButtons/InputGroup';
import Input from '../../components/InputAndButtons/Input';
import Button from '../../components/InputAndButtons/Button';
import GoBackButton from '../../components/InputAndButtons/GoBackButton';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

// Component styles
import { Container } from './styles';

interface IUpdateProfileData {
    trade: string;
    telephone: string;
    new_password?: string;
    confirm_password?: string;
    current_password: string;
}

const EditProfile: React.FC = () => {
    // Form reference
    const formRef = useRef<FormHandles>(null);

    // Use navigation with history
    const history = useHistory();

    // Access authentication data and functions
    const auth = useAuth();

    // Access toast functions
    const toast = useToast();

    // Logo file selected
    const [selectedLogo, setSelectedLogo] = useState<File | null>(null);

    // Save data from the selected logo file
    const handleSetSelectedLogo = useCallback((file: File | null) => {
        setSelectedLogo(file);
    }, [setSelectedLogo]);

    // Submit Update Profile form data
    const handleSubmitUpdateProfile = useCallback(async({
        trade,
        telephone,
        new_password,
        confirm_password,
        current_password,
    }: IUpdateProfileData) => {
        try {
            // Reset form errors
            formRef.current?.setErrors({});

            // Creating a schema validation for the data
            const schema = Yup.object().shape({
                trade: Yup.string().max(25, 'O nome deve ter no máximo 25 caracteres.').required('O nome é obrigatório.'),
                telephone: Yup.string().max(11, 'O telefone deve ter no máximo 11 caracteres.').required('O telefone é obrigatório.'),
                new_password: Yup.string().when({
                    is: (value: string) => !!value.length,
                    otherwise: Yup.string(),
                    then: Yup.string().min(6, 'A nova senha deve ter no mínimo 6 caracteres.'),
                }),
                confirm_password: Yup.string().oneOf(
                    [Yup.ref('new_password'), 'A confirmação deve ser igual a nova senha.']
                ),
                current_password: Yup.string().min(6).required('A senha atual é obrigatória.'),
            });

            // Transform telephone in number
            let telephoneOnlyNumber = telephone.split('(').join('');
            telephoneOnlyNumber = telephoneOnlyNumber.split(')').join('');
            telephoneOnlyNumber = telephoneOnlyNumber.split('-').join('');
            telephoneOnlyNumber = telephoneOnlyNumber.split(' ').join('');

            // Validate data
            await schema.validate({
                trade,
                telephone: telephoneOnlyNumber,
                new_password,
                confirm_password,
                current_password
            }, { abortEarly: false });

            // Saving form data
            const formData = new FormData();
            formData.append('trade', trade);
            formData.append('telephone', telephone);
            formData.append('current_password', current_password);
            if(new_password) {
                formData.append('new_password', new_password);
            }
            if(selectedLogo) {
                formData.append('logo', selectedLogo);
            }

            // Updating restaurant data
            const response = await api.put('/profile', formData);

            // Saving updated data in context
            auth.updateRestaurant(response.data);

            // Create success toast
            toast.addToast({
                title: 'Dados atualizados com sucesso.',
                status: 'success',
            })

            // Go back to MenuAdmin page
            history.push('/menu');
        } catch(error) {
            if(error instanceof Yup.ValidationError) {
                // Getting validation errors
                const validationErrors = getValidationErrors(error);

                // Setting validation errors in form
                formRef.current?.setErrors(validationErrors);
            } else {
                // Create error toast
                toast.addToast({
                    title: 'Falha ao atualizar os dados.',
                    description: 'Tente novamente.',
                });
            }
        }

    }, [selectedLogo, auth, history, toast]);

    return (
      <Container>
        <GoBackButton />

        <div id="page-content">
          <h1>Editar os dados</h1>

          {/** Sign Up form */}
          <Form onSubmit={handleSubmitUpdateProfile} ref={formRef}>
            {/** Restaurant data */}
            <AddLogo
              setSelectedFile={handleSetSelectedLogo}
              defaultFileName={auth.restaurant.logo}
              defaultFileURL={auth.restaurant.logo_url}
            />

            <InputGroup label="Dados do restaurante:">
              <Input
                name="trade"
                placeholder="Nome fantasia"
                icon={FiBriefcase}
                borderTopLeft={25}
                borderTopRight={25}
                defaultValue={auth.restaurant.trade}
              />

              <Input
                name="telephone"
                placeholder="Telefone para contato"
                icon={FiPhone}
                borderBottomLeft={25}
                borderBottonRigth={25}
                defaultValue={auth.restaurant.telephone}
              />
            </InputGroup>

            {/** Login data */}
            <InputGroup label="Alterar a senha (opcional):">
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