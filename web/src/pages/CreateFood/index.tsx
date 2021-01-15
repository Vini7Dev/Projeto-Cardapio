/**
 * Page: Create Food
 */

import React, { useCallback, useState } from 'react';
import { FiLogOut, FiArrowLeft, FiCamera, FiX } from 'react-icons/fi';

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
            <ItemAddImage
              setSelectedImage={setSelectedImage}
            />

            <ItemInput
              label="Informe o nome do prato:"
            />

            <ItemTextArea
              label="Informe a descrição do produto:"
              cols={30}
              rows={3}
              style={{ resize: 'none' }}
            />

            <ItemInput
              label="Informe o preço original do prato:"
            />

            <ItemInput
              label="Informe o preço com desconto (se houver):"
            />

            <ItemInput
              label="Informe a categoria do prato:"
            />

            <ItemCheckbox
              setIsChecked={toggleCheckboxCheck}
              isChecked={checkboxChecked}
            />
          </CreateItemArea>

          <div id="add-item-button">
            <Button
              buttonName="Adicionar item"
              color="green"
            />
          </div>

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