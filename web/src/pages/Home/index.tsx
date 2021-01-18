/**
 * Page: Home
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/InputAndButtons/Button';

import LogoImg from "../../assets/images/Logo.png";

// Components styles
import { Container, AnimationContainer } from './styles';

const Home: React.FC = () => {
    return (
      <Container>
        <AnimationContainer>
          <div id="logo">
            <img src={LogoImg} alt="Menue" />

            <p>Seu cardápio virtual é aqui!</p>
          </div>

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
        </AnimationContainer>
      </Container>
    );
};

export default Home;
