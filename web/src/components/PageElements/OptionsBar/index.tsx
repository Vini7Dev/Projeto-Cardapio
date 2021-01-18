/**
 * Component: Options Bar
 */

import React from 'react';
import { IconBaseProps } from 'react-icons';

import LogoImg from '../../../assets/images/Logo.png';

// Component styles
import { Container } from './styles';

interface IButtonsProps {
    text: string;
    icon?: React.ComponentType<IconBaseProps>;
    action(): void;
}

interface IOptionsBarProps {
    buttonsArray?: IButtonsProps[];
}

const OptionsBar: React.FC<IOptionsBarProps> = ({
    buttonsArray
}) => {
    return (
      <Container>
        <div>
          <img id="logo" src={LogoImg} alt="Menue" />

          <p>Seu cardápio virtual é aqui!</p>
        </div>

        {
             buttonsArray?.map(({
                 text,
                 icon: Icon,
                 action
             }, index) => (
               <button key={index.toString()} onClick={action}>
                 { Icon && <Icon /> }

                 { text }
               </button>
             ))
         }
      </Container>
    );
}

export default OptionsBar;