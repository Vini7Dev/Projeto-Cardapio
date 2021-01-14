/**
 * Page: Menu
 */

import React , { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiEdit3 } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import formatCNPJ from '../../utils/formatCNPJ';
import formatTelephone from '../../utils/formatTelephone';

import FoodItem from '../../components/FoodItem';

import DefaultLogo from '../../assets/images/DefaultLogo.png';

// Component styles
import {
    Container,
    OptionsBar,
    MenuSide,
    MenuHeader,
    MenuCode,
    MenuArea,
    AddItemButtonArea,
    MenuFooter,
} from './styles';

const Menu: React.FC = () => {
    // Use authentication data and functions
    const auth = useAuth();

    // Load menu items
    useEffect(() => {
        const loadMenuItems = async () => {
            try {
                const response = await api.get(`/menus/${auth.restaurant.menu.code}`);

                console.log(response.data);
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

    return (
      <Container>
        {/** Options bar side */}
        <OptionsBar>

          <button onClick={handleLogOut}>
            <FiLogOut />
            Sair
          </button>

          <Link to="/profile">
            <button>
              <FiEdit3 />
              Editar Conta
            </button>
          </Link>
        </OptionsBar>

        {/** Menu side */}
        <MenuSide>
          {/** Menu header */}
          <MenuHeader>
            <img src={DefaultLogo} alt="Restaurant Logo" />
            <h1>
              Cardápio -
              {' '}
              {auth.restaurant.trade}
            </h1>
          </MenuHeader>

          {/** Menu code */}
          <MenuCode id="menu-code">
            <p>Código do cardápio:</p>
            <strong>{(auth.restaurant.menu.code + 100000).toString(16).toUpperCase()}</strong>
            <button>Copiar Link</button>
          </MenuCode>

          {/** Menu area */}
          <MenuArea>
            <section className="category-content">
              <h2>Lanches</h2>

              <ul className="category-items-list">
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
                  description="Pão, hamburguer, calabresa, ..."
                  image_url=""
                  price={14.9}
                  discount_price={11.9}
                  enabled={false}
                />
              </ul>
            </section>

            <section className="category-content">
              <h2>Bebidas</h2>

              <ul className="category-items-list">
                <li>Temp</li>
              </ul>
            </section>
          </MenuArea>

          {/** Add item button */}
          <AddItemButtonArea>
            <button>+ Adicionar item</button>
          </AddItemButtonArea>

          {/** Menu footer */}
          <MenuFooter>
            <p>
              Restaurante:
              {' '}
              {auth.restaurant.trade}
            </p>
            <p>
              CNPJ:
              {' '}
              {formatCNPJ(auth.restaurant.cnpj)}
            </p>
            <p>
              Telefone:
              {' '}
              {formatTelephone(auth.restaurant.telephone)}
            </p>
          </MenuFooter>
        </MenuSide>
      </Container>
    )
}

export default Menu;