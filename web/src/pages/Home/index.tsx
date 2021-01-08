/**
 * Page: Home
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';

// Components styles
import { Container } from './styles';

const Home: React.FC = () => {
    return (
      <Container>
        <div id="page-content">
          <h1>Você deseja:</h1>

          {/** Navigation choice */}
          <Link to="/menu-code">
            <Button
              buttonName="Acessar um cardápio"
              label="Cliente"
            />
          </Link>

          <Link to="/signin">
            <Button
              buttonName="Administrar um cardápio"
              label="Restaurante"
              color="brown"
            />
          </Link>
        </div>
      </Container>
    );
};

export default Home;
