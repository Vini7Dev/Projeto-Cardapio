/**
 * Page: Menu Code
 */

import React from 'react';
import { Form } from '@unform/web';

import GoBackButton from '../../components/InputAndButtons/GoBackButton';
import Button from '../../components/InputAndButtons/Button';
import Input from '../../components/InputAndButtons/Input';
import InputGroup from '../../components/InputAndButtons/InputGroup';

// Component styles
import {
    Container,
    AnimationContainer,
} from './styles';

const MenuCode: React.FC = () => {
    return (
      <Container>
        <GoBackButton />

        <AnimationContainer>
          <h1>Ver cardápio</h1>
          <Form onSubmit={data => console.log(data)}>
            <InputGroup label="Informe o código do cardápio:">
              <Input
                className="input-code"
                type="string"
                name="code"
                placeholder="123ABC"
                borderTopLeft={25}
                borderTopRight={25}
                borderBottomLeft={25}
                borderBottonRigth={25}
              />

              <Button
                buttonName="Acessar"
              />
            </InputGroup>
          </Form>
        </AnimationContainer>
      </Container>
    );
}

export default MenuCode;