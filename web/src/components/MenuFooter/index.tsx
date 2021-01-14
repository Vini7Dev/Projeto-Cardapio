/**
 * Component: Menu Footer
 */

import React from 'react';

import formatCNPJ from '../../utils/formatCNPJ';
import formatTelephone from '../../utils/formatTelephone';

// Component styles
import { Container } from './styled';

interface IMenuFooterProps {
    trade: string;
    cnpj: string;
    telephone: string;
}

const MenuFooter: React.FC<IMenuFooterProps> = ({
    trade,
    cnpj,
    telephone,
}) => {
    return (
      <Container>
        <p>
          Restaurante:
          {' '}
          {trade}
        </p>
        <p>
          CNPJ:
          {' '}
          {formatCNPJ(cnpj)}
        </p>
        <p>
          Telefone:
          {' '}
          {formatTelephone(telephone)}
        </p>
      </Container>
    );
}

export default MenuFooter;