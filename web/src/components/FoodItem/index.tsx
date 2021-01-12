/**
 * Component: Food Item
 */

import React from 'react';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';

import DefaultFoodImage from '../../assets/images/DefaultFoodImage.png';

// Component styles
import {
    Container,
    RemoveItemButton,
    ItemContent,
    ItemDataContent,
    EditItemButton,
} from './styles';

const FoodItem: React.FC = () => {
    return (
      <Container>
        {/** Remove item button */}
        <RemoveItemButton>
          <FiTrash2 />
        </RemoveItemButton>

        {/** Item data content */}
        <ItemContent>
          <img src={DefaultFoodImage} alt="FoodFoodImage" />

          <div className="discount-percent">
            <p>-20%</p>
          </div>

          <ItemDataContent>
            <div className="item-data">
              <strong className="item-title">X-Bacon</strong>

              <p className="item-description">
                Pão, ovo, hamburquer, bacon,  presunto e mussarela.
              </p>
            </div>

            <div className="item-price">
              <p className="price-on">R$14.99</p>
              <p className="price-off">R$0.00</p>
            </div>
          </ItemDataContent>
        </ItemContent>

        {/** Edit item button */}
        <EditItemButton>
          <FiEdit3 />
          Editar
        </EditItemButton>
      </Container>
    );
}

export default FoodItem;