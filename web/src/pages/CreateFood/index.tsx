/**
 * Page: Create Food
 */

import React from 'react';
import { FiLogOut, FiArrowLeft, FiCamera, FiX } from 'react-icons/fi';

import MenuHeader from '../../components/PageElements/MenuHeader';
import MenuFooter from '../../components/PageElements/MenuFooter';
import OptionsBar from '../../components/PageElements/OptionsBar';

import Button from '../../components/InputAndButtons/Button';
import ItemInput from '../../components/InputAndButtons/ItemInput';
import ItemTextArea from '../../components/InputAndButtons/ItemTextArea';
import ItemCheckBox from '../../components/InputAndButtons/ItemCheckBox';

// Component styles
import {
    Container,
    CreateItemSide,
    CreateItemArea,
} from './styles';

const CreateFood: React.FC = () => {
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
            <div id="add-item-image">
              <div id="image-preview" />

              <button>
                <FiCamera size={25} />

                Adicionar imagem
              </button>
            </div>

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

            <ItemCheckBox />
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