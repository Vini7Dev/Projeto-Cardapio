/**
 * Page: Sign Up
 */

import React, { useCallback, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiBriefcase, FiCreditCard, FiPhone, FiAtSign, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import GoBackButton from '../../components/InputAndButtons/GoBackButton';
import Button from '../../components/InputAndButtons/Button';
import Input from '../../components/InputAndButtons/Input';
import InputGroup from '../../components/InputAndButtons/InputGroup';
import AddLogo from '../../components/InputAndButtons/AddLogo';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

// Component styles
import { Container } from './styles';

interface ICreateRestaurant {
    trade: string;
    cnpj: string;
    telephone: string;
    email: string;
    password: string;
    confirm_password: string;
}

const SignUp: React.FC = () => {
    // Form reference
    const formRef = useRef<FormHandles>(null);

    // Navigation
    const history = useHistory();

    // To use toast
    const toast = useToast();

    // Logo file selected
    const [selectedLogo, setSelectedLogo] = useState<File | null>(null);

    // Save data from the selected logo file
    const handleSetSelectedLogo = useCallback((file: File | null) => {
        setSelectedLogo(file);
    }, []);

    // Submit Sign Up form data
    const handleSubmitSignUp = useCallback(async ({
        trade,
        cnpj,
        telephone,
        email,
        password,
        confirm_password,
    }: ICreateRestaurant) => {
        try {
            // Reset form errors
            formRef.current?.setErrors({});

            // Creating a schema validation for the data
            const schema = Yup.object().shape({
                trade: Yup.string().max(25, 'O nome deve ter no máximo 25 caracteres.').required('O nome é obrigatório.'),
                cnpj: Yup.string().max(14, 'O cnpj deve ter no máximo 14 caracteres.').min(14, 'O cnpj deve ter no mínimo 14 caracteres.').required('O cnpj é obrigatório.'),
                telephone: Yup.string().max(11, 'O telefone deve ter no máximo 11 caracteres.').required('O telefone é obrigatório.'),
                email: Yup.string().email('O email deve ser válido.').required('O email é obrigatório.'),
                password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres.').required('A senha é obrigatória.'),
                confirm_password: Yup.string().oneOf(
                    [Yup.ref('password')], 'A confirmação deve ser igual a senha.'
                ).required('A confirmação da senha é obrigatória.'),
            });

            // Transform cnpj in number
            let cnpjOnlyNumbers = cnpj.split('.').join('');
            cnpjOnlyNumbers = cnpjOnlyNumbers.split('-').join('');
            cnpjOnlyNumbers = cnpjOnlyNumbers.split('/').join('');

            // Transform telephone in number
            let telephoneOnlyNumber = telephone.split('(').join('');
            telephoneOnlyNumber = telephoneOnlyNumber.split(')').join('');
            telephoneOnlyNumber = telephoneOnlyNumber.split('-').join('');
            telephoneOnlyNumber = telephoneOnlyNumber.split(' ').join('');

            // Validate data
            await schema.validate({
                trade,
                cnpj: cnpjOnlyNumbers,
                telephone: telephoneOnlyNumber,
                email,
                password,
                confirm_password,
            }, { abortEarly: false });

            // Saving form data
            const formData = new FormData();
            formData.append('trade', trade);
            formData.append('cnpj', cnpjOnlyNumbers.toString());
            formData.append('telephone', telephoneOnlyNumber.toString());
            formData.append('email', email);
            formData.append('password', password);
            if(selectedLogo) {
                formData.append('logo', selectedLogo);
            }

            // Creating restaurant
            await api.post('/restaurants', formData);

            // Create success toast
            toast.addToast({
                title: 'Conta criada com sucesso.',
                description: 'Agora você já pode efetuar seu login.',
                status: 'success',
            });

            // Go back to login page
            history.push('/signin');
        } catch (error) {
            if(error instanceof Yup.ValidationError) {
                // Getting validation errors
                const validationErrors = getValidationErrors(error);

                // Setting validation errors in form
                formRef.current?.setErrors(validationErrors);
            } else {
                // Create error toast
                toast.addToast({
                     title: 'Falha ao criar a conta.',
                     description: 'Reveja as credenciais e tente novamente.',
                });
            }
        }
    }, [selectedLogo, history, toast]);

    return (
      <Container>
        <GoBackButton />

        <div id="page-content">
          <h1>Cadastrar-se</h1>

          {/** Sign Up form */}
          <Form onSubmit={handleSubmitSignUp} ref={formRef}>
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
                name="confirm_password"
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
          <Link to="/signin">
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

export default SignUp;