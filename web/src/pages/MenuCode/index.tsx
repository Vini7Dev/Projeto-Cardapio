/**
 * Page: Menu Code
 */

import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import GoBackButton from '../../components/InputAndButtons/GoBackButton';
import Button from '../../components/InputAndButtons/Button';
import Input from '../../components/InputAndButtons/Input';
import InputGroup from '../../components/InputAndButtons/InputGroup';

// Component styles
import {
    Container,
    AnimationContainer,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface IFormData {
    menu_code: string;
}

const MenuCode: React.FC = () => {
    // Form reference
    const formRef = useRef<FormHandles>(null);

    // Navigate with history
    const history = useHistory();

    // On submit menu code from data
    const handleSubmitMenuCodeForm = useCallback(async (data: IFormData) => {
        try {
            // Reseting form errors
            formRef.current?.setErrors({});

            // Getting menu code from data
            const { menu_code } = data;

            // Creating the schema validation
            const schema = Yup.object().shape({
                menu_code: Yup.string().required('O código do menu é obrigatório.'),
            });

            // Validation data
            await schema.validate({ menu_code }, { abortEarly: false });

            // Navigate to menu clien page
            history.push(`/menu/${menu_code}`);
        } catch(error) {
            // Getting validation errors
            const validationErrors = getValidationErrors(error);

            // Setting errors in form
            formRef.current?.setErrors(validationErrors);
        }
    }, [history]);

    return (
      <Container>
        <GoBackButton />

        <AnimationContainer>
          <h1>Ver cardápio</h1>

          {/** Menu Code Form */}
          <Form ref={formRef} onSubmit={handleSubmitMenuCodeForm}>
            <InputGroup label="Informe o código do cardápio:">
              <Input
                className="input-code"
                type="string"
                name="menu_code"
                placeholder="123ABC"
                borderTopLeft={25}
                borderTopRight={25}
                borderBottomLeft={25}
                borderBottonRigth={25}
              />

              <Button
                buttonName="Acessar"
                data-testid="submit-button"
              />
            </InputGroup>
          </Form>
        </AnimationContainer>
      </Container>
    );
}

export default MenuCode;