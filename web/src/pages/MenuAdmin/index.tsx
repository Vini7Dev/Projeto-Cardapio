/**
 * Page: Menu
 */

import React , { useCallback } from 'react';
import { FiLogOut, FiEdit3 } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

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

          <button>
            <FiEdit3 />
            Editar Conta
          </button>
        </OptionsBar>

        {/** Menu side */}
        <MenuSide>
          {/** Menu header */}
          <MenuHeader>
            <img src={DefaultLogo} alt="Restaurant Logo" />
            <h1>Cardápio</h1>
          </MenuHeader>

          {/** Menu code */}
          <MenuCode id="menu-code">
            <p>Código do cardápio:</p>
            <strong>ABC-ZYX-123</strong>
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
            <p>Restaurante: Fome Burguer</p>
            <p>CNPJ: 12.345.678/0000-00</p>
            <p>Telefone: (99) 12345-6789</p>
          </MenuFooter>
        </MenuSide>
      </Container>
    )
}

export default Menu;