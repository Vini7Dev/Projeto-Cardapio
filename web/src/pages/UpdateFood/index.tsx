/**
 * Page: Create Food
 */

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { useLoad } from '../../hooks/load';

import getValidationErrors from '../../utils/getValidationErrors';
import formatPrice from '../../utils/formatPrice';

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

interface IUpdateFoodData {
    title: string;
    description: string;
    price: string;
    discount_price: string | null;
}

interface IRouteParams {
  item_id: string;
}

interface IItemData {
  title: string;
  description: string;
  price: number;
  discount_price: number;
  image: string;
  image_url: string;
  enabled: boolean;
  category: {
    category_name: string;
  }
}

const UpdateFood: React.FC = () => {
    // Item data
    const [itemData, setItemData] = useState<IItemData>({} as IItemData);

    // Selected food image file
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Check Box state
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    // Use navigation hsitory
    const history = useHistory();

    // Access route params
    const params = useParams();

    // Form reference
    const formRef = useRef<FormHandles>(null);

    // Access auth data and functions
    const auth = useAuth();

    // Access toast functions
    const toast = useToast();

    // Access load functions
    const load = useLoad();

    // To update input price and discount price value
    const handleUpdateInputPriceValue = useCallback((value: string | number, name: string) => {
        // Getting input element
        const inputElement = document.getElementById(name) as HTMLInputElement;

        // Set input price formated value
        inputElement.value = formatPrice(Number(value));
    }, []);

    // Load item data
    useEffect(() => {
        const loadItemData = async () => {
            try {
                // Getting item id from route params
                const { item_id } = params as IRouteParams;

                // Getting item data from server
                const item = await api.get<IItemData>(`/items/${item_id}`);

                // Saving item data
                setItemData(item.data);
                setCheckboxChecked(item.data.enabled);
                handleUpdateInputPriceValue(item.data.price, 'price');
                handleUpdateInputPriceValue(item.data.discount_price, 'discount_price');
            }
            catch(error) {
                console.log(error);
            }
        }

        // Start load screen
        load.setLoad(true);

        // Load item data
        loadItemData();

        // Stop load screen
        load.setLoad(false);
    }, [params, handleUpdateInputPriceValue, load]);

    // Toggle check box check
    const toggleCheckboxCheck = useCallback(() => {
        setCheckboxChecked(!checkboxChecked);
    }, [checkboxChecked]);

    // On submit create food form
    const handleSubmitUpdateFoodForm = useCallback(async ({
        title,
        description,
        price,
        discount_price,
    }: IUpdateFoodData) => {
        // Start load screen
        load.setLoad(true);

        try {
            // Reset form errors
            formRef.current?.setErrors({});

            // Getting only number from price and discount price
            const priceAsNumber = price.split('R$')[1];
            let discountPriceAsNumber = '0';
            if (discount_price) {
                [, discountPriceAsNumber] = discount_price.split('R$');
            }

            // Set discount price to 0 when as not informed
            const setDiscountPrice = discountPriceAsNumber || '0';

            // Change comma to dot from price and discount price
            const priceWithoutComma = Number(priceAsNumber.replace(/,/g, '.') || undefined);
            const discountPriceWithoutComma = Number(setDiscountPrice.replace(/,/g, '.'));

            // Make sure the price is less than the discounted price
            if(priceWithoutComma < discountPriceWithoutComma) {
                alert('Atenção! O desconto não pode ser maior que o preço normal.');

                throw new Error('O desconto não pode ser maior que o preço normal.');
            }

            // Creating a validation schema
            const schema = Yup.object().shape({
                title: Yup.string().max(35, 'O título deve ter no máximo 35 caracteres.').required('O título é obrigatório.'),
                description: Yup.string().required('A descrição é obrigatória.'),
                price: Yup.number().min(0, 'O preço não pode ser negativo.').required('O preço é obrigatório'),
                discount_price: Yup.number().min(0, 'O valor do desconto não pode ser negativo.'),
            });

            // Validate data
            await schema.validate({
                title,
                description,
                price: priceWithoutComma,
                discount_price: discountPriceWithoutComma,
            }, { abortEarly: false });

            // Getting item id from route params
            const { item_id } = params as IRouteParams;

            // Creatint a form data object
            const formData = new FormData();
            formData.append('item_id', item_id)
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', priceWithoutComma.toString());
            formData.append('discount_price', discountPriceWithoutComma.toString());
            formData.append('enabled', checkboxChecked.toString());
            if(selectedImage) {
                formData.append('image', selectedImage);
            }

            // Send a request to the server to update food data
            await api.put('/items', formData);

            // Create a success toast
            toast.addToast({
                title: 'Item atualizado com sucesso!',
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
                    title: 'Falha ao atualizar o item.',
                    description: 'Tente novamente.',
                });
            }
        }

        // Stop load screen
        load.setLoad(false);
    }, [checkboxChecked, history, selectedImage, toast, load, params]);

    return (
      <Container>
        <OptionsBar
          buttonsArray={[
            { text: 'Sair', icon: FiLogOut, action: auth.logout },
            { text: 'Voltar', icon: FiArrowLeft, action: history.goBack },
          ]}
        />

        <CreateItemSide>
          <MenuHeader
            title="Editar Item"
            logo={auth.restaurant.logo}
            logo_url={auth.restaurant.logo_url}
          />

          <CreateItemArea>
            <Form ref={formRef} onSubmit={handleSubmitUpdateFoodForm}>
              <div id="form-inputs-area">
                <ItemAddImage
                  setSelectedImage={setSelectedImage}
                  defaultFileName={itemData.image}
                  defaultFileURL={itemData.image_url}
                />

                <ItemInput
                  name="title"
                  placeholder="Ex.: X-Burguer"
                  label="Informe o título do alimento:"
                  defaultValue={itemData.title}
                />

                <ItemTextArea
                  name="description"
                  placeholder="Ex.: Pão, hamburguer, ..."
                  label="Informe a descrição do alimento:"
                  defaultValue={itemData.description}
                  cols={30}
                  rows={3}
                  style={{ resize: 'none' }}
                />

                <ItemInput
                  name="price"
                  placeholder="Ex.: R$ 15,90"
                  defaultValue={itemData.price}
                  type="price"
                  label="Informe o preço original do alimento:"
                />

                <ItemInput
                  name="discount_price"
                  placeholder="Ex.: R$ 13,50"
                  defaultValue={itemData.discount_price}
                  type="price"
                  label="Informe o preço com desconto (se houver):"
                />

                <ItemCheckbox
                  setIsChecked={toggleCheckboxCheck}
                  isChecked={checkboxChecked}
                />
              </div>

              <div id="add-item-button">
                <Button
                  buttonName="Salvar alterações"
                  color="green"
                />
              </div>
            </Form>
          </CreateItemArea>

          <MenuFooter
            trade={auth.restaurant.trade}
            cnpj={auth.restaurant.cnpj}
            telephone={auth.restaurant.telephone}
          />
        </CreateItemSide>
      </Container>
    );
}

export default UpdateFood;