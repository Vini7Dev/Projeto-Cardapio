/**
 * Component: Options Bar
 */

import React from 'react';
import { IconBaseProps } from 'react-icons';

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