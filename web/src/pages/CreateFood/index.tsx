/**
 * Page: Create Food
 */

import React from 'react';
import { FiLogOut, FiArrowLeft, FiCamera, FiX } from 'react-icons/fi';

import MenuHeader from '../../components/PageElements/MenuHeader';
import MenuFooter from '../../components/PageElements/MenuFooter';
import OptionsBar from '../../components/PageElements/OptionsBar';

import Button from '../../components/InputAndButtons/Button';

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

            <div className="add-item-input">
              <strong>Informe o nome do prato:</strong>
              <input type="text" />
            </div>

            <div id="add-item-textarea">
              <strong>Informe a descrição do prato:</strong>
              <textarea cols={30} rows={3} style={{ resize: 'none' }} />
            </div>

            <div className="add-item-input">
              <strong>Informe o preço original do prato:</strong>
              <input type="text" />
            </div>

            <div className="add-item-input">
              <strong>Informe o preço com desconto (se houver):</strong>
              <input type="text" />
            </div>

            <div className="add-item-input">
              <strong>Informe a categoria do prato:</strong>
              <input type="text" />
            </div>

            <div id="add-enable-checkbox">
              <strong>Habilitado</strong>

              <span id="custom-checkbox">
                <FiX />
              </span>
            </div>
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