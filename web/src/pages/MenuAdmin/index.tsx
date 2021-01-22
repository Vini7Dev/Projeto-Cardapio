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

interface IMenuResponse {
    restaurantOwner: object;
    menu: IFoodItemData[];
}

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
                const { menu } = response.data as IMenuResponse;

                // Getting all items categories
                const categories = [] as string[];
                menu.forEach((menuItem) => {
                    const indexFinded = categories.findIndex(category_name => category_name === menuItem.item.category.category_name);

                    if(indexFinded === -1) {
                        categories.push(menuItem.item.category.category_name);
                    }
                });

                // Organize items with your respective category
                const organizedItems = categories.map(category_name => {
                    return {
                        category_name,
                        items: menu.filter(menuItem => menuItem.item.category.category_name === category_name),
                    };
                });

                // Save organized menu items
                setOrganizedMenuItems(organizedItems);
            } catch(error) {
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

    // Copy menu url
    const handleCopyMenuURL = useCallback(() => {
        // Creating range
        const range = document.createRange();

        // Select the element with URL
        range.selectNode(document.getElementById('menu-link') as HTMLInputElement);

        // Create selection
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);

        // Run copy text
        document.execCommand('copy');
    }, []);

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
            <button onClick={handleCopyMenuURL} data-testid="copy-link-url">Copiar Link</button>
            <p id="menu-link">
              {
                `http://localhost:3000/menu/${(auth.restaurant.menu.code + 100000).toString(16).toUpperCase()}`
              }
            </p>
          </MenuCode>

          {/** Menu area */}
          <MenuArea>
            {
                organizedMenuItems.length > 0 ? (
                // Creating a category section
                organizedMenuItems.map(menuItems => (
                  <FoodItemCategory
                    title={menuItems.category_name}
                    key={menuItems.category_name}
                  >
                    {
                        // Creating a food item
                        menuItems.items.map(data => (
                          <FoodItem
                            key={data.item.id}
                            id={data.item.id}
                            title={data.item.title}
                            description={data.item.description}
                            price={data.item.price}
                            discount_price={data.item.discount_price}
                            image={data.item.image}
                            image_url={data.item.image_url}
                            enabled={data.item.enabled}
                            admin_mode
                          />
                        ))
                    }
                  </FoodItemCategory>
                ))
                ) : (
                  <div id="empty-message-container">
                    <h1>Nenhum item cadastrado.</h1>
                  </div>
                )
            }
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