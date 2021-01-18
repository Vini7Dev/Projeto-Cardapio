/**
 * Page: Menu Customer
 */

import React , { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import api from '../../services/api';

import MenuHeader from '../../components/PageElements/MenuHeader';
import MenuFooter from '../../components/PageElements/MenuFooter';
import OptionsBar from '../../components/PageElements/OptionsBar';

import FoodItemCategory from '../../components/FoodItemCategory';
import FoodItem from '../../components/FoodItemCategory/FoodItem';

import formatTelephone from '../../utils/formatTelephone';

// Component styles
import {
    Container,
    MenuSide,
    MenuCode,
    MenuArea,
    AddItemButtonArea,
} from './styles';

interface IMenuResponse {
    restaurantOwner: IRestaurantData;
    menu: IFoodItemData[];
}

interface IRestaurantData {
    id: string;
    trade: string;
    cnpj: string;
    telephone: string;
    email: string;
    logo: string;
    logo_url: string;
    menu: {
        id: string;
        code: number;
    };
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

interface IRouteParams {
    menu_code: string;
}

const MenuCustomer: React.FC = () => {
    // Restaurant data state
    const [restaurantData, setRestaurantData] = useState<IRestaurantData>({} as IRestaurantData);

    // Organized menu items
    const [organizedMenuItems, setOrganizedMenuItems] = useState<IOrganizedMenuItems[]>([]);

    // Use navigation with history
    const history = useHistory();

    // Access route params
    const params = useParams();

    // Load menu items
    useEffect(() => {
        const loadMenuItems = async () => {
            try {
                // Getting menu code from route params
                const { menu_code } = params as IRouteParams;

                // Remove codification
                const parsedCode = parseInt(menu_code, 16) - 100000;

                // Get menu items from api
                const response = await api.get(`/menus/${parsedCode}`);

                // Select only menu items from response data
                const {
                    restaurantOwner,
                    menu
                } = response.data as IMenuResponse;

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

                // Saving restaurants data
                setRestaurantData(restaurantOwner);
            } catch(error) {
                console.log(error);
            }
        }

        loadMenuItems();
    }, [history, restaurantData, params]);

    // Handle go back
    const handleGoToBack = useCallback(() => {
        history.goBack();
    }, [history]);

    return (
      <Container>
        {/** Options bar side */}
        <OptionsBar
          buttonsArray={[
                { text: 'Voltar', icon: FiChevronLeft, action: handleGoToBack },
            ]}
        />

        {/** Menu side */}
        <MenuSide>
          {/** Menu header */}
          <MenuHeader
            title={
                `Cardápio - ${restaurantData.trade || 'Carregando...'}`
            }
            logo={restaurantData.logo || 'Carregando...'}
            logo_url={restaurantData.logo_url || 'Carregando...'}
          />

          {/** Menu code */}
          <MenuCode id="menu-code">
            <p>Código do cardápio:</p>
            <strong>{(restaurantData.menu ? restaurantData.menu.code + 100000 : 'Carregando...').toString(16).toUpperCase()}</strong>
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
                        menuItems.items.map(data => {
                            if(data.item.enabled) {
                                return (
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
                                  />
                                );
                            }
                            return (null);
                        })
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
            <button>{restaurantData.telephone ? formatTelephone(restaurantData.telephone) : 'Carregando...'}</button>
          </AddItemButtonArea>

          {/** Menu footer */}
          <MenuFooter
            trade={restaurantData.trade || 'Carregando...'}
            cnpj={restaurantData.cnpj || 'Carregando...'}
            telephone={restaurantData.telephone || 'Carregando...'}
          />
        </MenuSide>
      </Container>
    )
}

export default MenuCustomer;