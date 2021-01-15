/**
 * Page: Create Food
 */

import React, { useCallback, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import MenuHeader from '../../components/PageElements/MenuHeader';
import MenuFooter from '../../components/PageElements/MenuFooter';
import OptionsBar from '../../components/PageElements/OptionsBar';

import Button from '../../components/InputAndButtons/Button';
import ItemAddImage from '../../components/InputAndButtons/ItemAddImage';
import ItemInput from '../../components/InputAndButtons/ItemInput';
import ItemTextArea from '../../components/InputAndButtons/ItemTextArea';
import ItemCheckbox from '../../components/InputAndButtons/ItemCheckBox';

// Component styles
import {
    Container,
    CreateItemSide,
    CreateItemArea,
} from './styles';

interface ICreateFoodData {
    title: string;
    description: string;
    price: number;
    discount_price: number | null;
    category_name: string;
}

const CreateFood: React.FC = () => {
    // Use navigation hsitory
    const history = useHistory();

    // Form reference
    const formRef = useRef<FormHandles>(null);

    // Access toast functions
    const toast = useToast();

    // Selected food image file
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Check Box state
    const [checkboxChecked, setCheckboxChecked] = useState(true);

    // Toggle check box check
    const toggleCheckboxCheck = useCallback(() => {
        setCheckboxChecked(!checkboxChecked);
    }, [checkboxChecked]);

    // On submit create food form
    const handleSubmitCreateFoodForm = useCallback(async ({
        title,
        description,
        price,
        discount_price,
        category_name,
    }: ICreateFoodData) => {
        try {
            // Reset form errors
            formRef.current?.setErrors({});

            // Set discount price to 0 when as not informed
            const setDiscountPrice = discount_price || 0;

            // Creating a validation schema
            const schema = Yup.object().shape({
                title: Yup.string().max(35, 'O título deve ter no máximo 35 caracteres.').required('O título é obrigatório.'),
                description: Yup.string().required('A descrição é obrigatória.'),
                price: Yup.number().min(0, 'O preço não pode ser negativo.').required('O preço é obrigatório'),
                discount_price: Yup.number().min(0, 'O valor do desconto não pode ser negativo.'),
                category_name: Yup.string().max(35, 'O nome da categoria deve ter no máximo 35 caracteres.').required('O nome da categoria é obrigatório.'),
            });

            // Validate data
            await schema.validate({
                title,
                description,
                price,
                discount_price: setDiscountPrice,
                category_name,
            }, { abortEarly: false });

            // Creatint a form data object
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category_name', category_name);
            formData.append('price', price.toString());
            formData.append('discount_price', setDiscountPrice.toString());
            formData.append('enabled', checkboxChecked.toString());
            if(selectedImage) {
                formData.append('image', selectedImage);
            }

            // Send a request to the server to create a new food
            await api.post('/items', formData);

            // Create a success toast
            toast.addToast({
                title: 'Item criado com sucesso!',
                status: 'success',
            });

            // Go back to menu page
            history.push('/menu');
        } catch(error) {
            if(error instanceof Yup.ValidationError) {
                // Get validation errors
                const validationErrors = getValidationErrors(error);

                // Set errors on form
                formRef.current?.setErrors(validationErrors);
            } else {
                // Create error toast
                toast.addToast({
                    title: 'Falha ao criar o item.',
                    description: 'Tente novamente.',
                });
            }
        }
    }, [checkboxChecked, history, selectedImage, toast]);

    return (
      <Container>
        <OptionsBar
          buttonsArray={[
            { text: 'Sair', icon: FiLogOut, action: () => console.log('OK') },
            { text: 'Voltar', icon: FiArrowLeft, action: () => console.log('OK') },
          ]}
        />

        <CreateItemSide>
          <MenuHeader
            title="Hello"
          />

          <CreateItemArea>
            <Form ref={formRef} onSubmit={handleSubmitCreateFoodForm}>
              <div id="form-inputs-area">
                <ItemAddImage
                  setSelectedImage={setSelectedImage}
                />

                <ItemInput
                  name="title"
                  label="Informe o nome do prato:"
                />

                <ItemTextArea
                  name="description"
                  label="Informe a descrição do produto:"
                  cols={30}
                  rows={3}
                  style={{ resize: 'none' }}
                />

                <ItemInput
                  name="price"
                  type="decimal"
                  min="0"
                  label="Informe o preço original do prato:"
                />

                <ItemInput
                  name="discount_price"
                  type="decimal"
                  min="0"
                  label="Informe o preço com desconto (se houver):"
                />

                <ItemInput
                  name="category_name"
                  label="Informe a categoria do prato:"
                />

                <ItemCheckbox
                  setIsChecked={toggleCheckboxCheck}
                  isChecked={checkboxChecked}
                />
              </div>

              <div id="add-item-button">
                <Button
                  buttonName="Adicionar item"
                  color="green"
                />
              </div>
            </Form>
          </CreateItemArea>

          <MenuFooter
            trade="Fome Burguer"
            cnpj="12345678910234"
            telephone="16999999999"
          />
        </CreateItemSide>
      </Container>
    );
}

export default CreateFood;