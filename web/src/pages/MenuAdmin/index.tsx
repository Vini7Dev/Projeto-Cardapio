/**
 * Page: Menu
 */

import React , { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogOut, FiEdit3 } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import MenuHeader from '../../components/PageElements/MenuHeader';
import MenuFooter from '../../components/PageElements/MenuFooter';
import OptionsBar from '../../components/PageElements/OptionsBar';

import FoodItemCategory from '../../components/FoodItemCategory';
import FoodItem from '../../components/FoodItemCategory/FoodItem';

// Component styles
import {
    Container,
    MenuSide,
    MenuCode,
    MenuArea,
    AddItemButtonArea,
} from './styles';

interface IFoodItemData {
    item: {
        id: string;
        image: string;
        image_url: string;
        title: string;
        description: string;
        price: number;
        discount_price: number;
        enabled: boolean;
        category: {
            category_name: string;
        }
    }
}

interface IOrganizedMenuItems {
    category_name: string;
    items: IFoodItemData[];
}

const Menu: React.FC = () => {
    // Organized menu items
    const [organizedMenuItems, setOrganizedMenuItems] = useState<IOrganizedMenuItems[]>([]);

    // Use navigation with history
    const history = useHistory();

    // Use authentication data and functions
    const auth = useAuth();

    // Load menu items
    useEffect(() => {
        const loadMenuItems = async () => {
            try {
                // Get menu items from api
                const response = await api.get(`/menus/${auth.restaurant.menu.code}`);

                // Select only menu items from response data
                const menuItems = response.data as IFoodItemData[];

                // Getting all items categories
                const categories = [] as string[];
                menuItems.forEach((menuItem) => {
                    const indexFinded = categories.findIndex(category_name => category_name === menuItem.item.category.category_name);

                    if(indexFinded === -1) {
                        categories.push(menuItem.item.category.category_name);
                    }
                });

                // Organize items with your respective category
                const organizedItems = categories.map(category_name => {
                    return {
                        category_name,
                        items: menuItems.filter(menuItem => menuItem.item.category.category_name === category_name),
                    };
                });

                // Save organized menu items
                setOrganizedMenuItems(organizedItems);
            } catch(error) {
                // Create error toast
                console.log(error);
            }
        }

        loadMenuItems();
    }, [auth]);

    // Logout button
    const handleLogOut = useCallback(() => {
        auth.logout();
    }, [auth]);

    // Navigate to edit profile page
    const handleGoToEditProfile = useCallback(() => {
        history.push('/profile');
    }, [history]);

    // Navigate to create food page
    const handleGoToCreateFood = useCallback(() => {
        history.push('/create-food');
    }, [history]);

    return (
      <Container>
        {/** Options bar side */}
        <OptionsBar
          buttonsArray={[
                { text: 'Sair', icon: FiLogOut, action: handleLogOut },
                { text: 'Editar Conta', icon: FiEdit3, action: handleGoToEditProfile },
            ]}
        />

        {/** Menu side */}
        <MenuSide>
          {/** Menu header */}
          <MenuHeader
            title={
                `Cardápio - ${auth.restaurant.trade}`
            }
            logo={auth.restaurant.logo}
            logo_url={auth.restaurant.logo_url}
          />

          {/** Menu code */}
          <MenuCode id="menu-code">
            <p>Código do cardápio:</p>
            <strong>{(auth.restaurant.menu.code + 100000).toString(16).toUpperCase()}</strong>
            <button>Copiar Link</button>
          </MenuCode>

          {/** Menu area */}
          <MenuArea>
            <FoodItemCategory>
              <FoodItem
                admin_mode
                id="1"
                title="X-Bacon"
                description="Pão, hamburguer, bacon, ..."
                image_url=""
                price={14.9}
                discount_price={0}
                enabled
              />

              <FoodItem
                admin_mode
                id="2"
                title="X-Calabresa"
                description=""
                price={14.9}
                discount_price={11.9}
                enabled={false}
              />
            </FoodItemCategory>
          </MenuArea>

          {/** Add item button */}
          <AddItemButtonArea>
            <button onClick={handleGoToCreateFood}>+ Adicionar item</button>
          </AddItemButtonArea>

          {/** Menu footer */}
          <MenuFooter
            trade={auth.restaurant.trade}
            cnpj={auth.restaurant.cnpj}
            telephone={auth.restaurant.telephone}
          />
        </MenuSide>
      </Container>
    )
}

export default Menu;