/**
 * Component: Food Item
 */

import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';

import formatPrice from '../../../utils/formatPrice';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import DefaultFoodImage from '../../../assets/images/DefaultFoodImage.png';

// Component styles
import {
    Container,
    RemoveItemButton,
    ItemContent,
    ItemImageContent,
    ItemDataContent,
    EditItemButton,
} from './styles';

interface IItemProps {
    admin_mode?: boolean;
    id: string;
    title: string;
    description: string;
    image?: string;
    image_url?: string;
    price: number;
    discount_price?: number;
    enabled: boolean;
}

const FoodItem: React.FC<IItemProps> = ({
    admin_mode = false,
    id,
    title,
    description,
    image,
    image_url = '',
    price,
    discount_price = 0,
    enabled
}) => {
    // Use toast functions
    const toast = useToast();

    // Use history navigation
    const history = useHistory();

    // Delete item function
    const handleDeleteItem = useCallback(async () => {
        try {
            // Send a request to server to delete item
            await api.delete(`/items/${id}`);

            // Create success toast
            toast.addToast({
                title: 'Item apagado com sucesso!',
                status: 'success',
            });

            // Reload window
            history.push('/');
        } catch(error) {
            // Create error toast
            toast.addToast({
                title: 'Falha ao apagar o item.',
                description: 'Tente novamente.',
            });
        }

    }, [id, toast]);

    // Go to edit item page
    const handleEditItem = useCallback(() => {
        alert(`Edit item ${id}`);
    }, [id]);

    // Calcule discount percentage
    const handleCalculeDiscountPercent = useCallback(() => {
        // Check if is divisible
        if(price !== 0) {
            // Calculate the discount percentage
            const percentage = (price - discount_price) / price * 100

            // Return response as integer
            return percentage.toFixed(0);
        }

        // Return error
        return NaN;
    }, [price, discount_price]);

    return (
      <Container>
        {/** Remove item button */}
        {
            admin_mode && (
            <RemoveItemButton onClick={handleDeleteItem}>
              <FiTrash2 />
            </RemoveItemButton>
            )
        }

        {/** Item data content */}
        <ItemContent>
          {/** Image content */}
          <ItemImageContent image_url={image ? image_url : DefaultFoodImage}>
            <div className="item-image" />

            {
                !enabled && (
                <div className="desable-info">
                  <span>Desabilitado</span>
                </div>
                )
            }
          </ItemImageContent>

          {/** Discount percent tag */}
          {
              discount_price > 0 ? (
                <div className="discount-percent">
                  <p>
                    -
                    {handleCalculeDiscountPercent()}
                    %
                  </p>
                </div>
                ) : null
          }

          {/* Item information data* */}
          <ItemDataContent>
            <div className="item-data">
              <strong className="item-title">{title}</strong>

              <p className="item-description">{description}</p>
            </div>

            <div className="item-price">
              <p className="price-on">{formatPrice(discount_price > 0 ? discount_price : price)}</p>

              { discount_price > 0 ? <p className="price-off">{formatPrice(price)}</p> : null}
            </div>
          </ItemDataContent>
        </ItemContent>

        {/** Edit item button */}
        {
            admin_mode && (
            <EditItemButton onClick={handleEditItem}>
              <FiEdit3 />
              Editar
            </EditItemButton>
            )
        }
      </Container>
    );
}

export default FoodItem;