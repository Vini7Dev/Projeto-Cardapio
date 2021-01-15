/**
 * Page: Create Food
 */

import React, { useCallback, useState } from 'react';
import { FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

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

const CreateFood: React.FC = () => {
    // Selected food image file
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Check Box state
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    // Toggle check box check
    const toggleCheckboxCheck = useCallback(() => {
        setCheckboxChecked(!checkboxChecked);
    }, [checkboxChecked]);

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
            <Form onSubmit={() => console.log('Submited')}>
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
                  label="Informe o preço original do prato:"
                />

                <ItemInput
                  name="discount_price"
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