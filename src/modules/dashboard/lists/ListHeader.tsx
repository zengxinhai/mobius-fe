import { Trans } from '@lingui/macro';
import { ReactNode } from 'react';

import { ListColumn } from 'src/components/lists/ListColumn';
import { ListHeaderTitle } from 'src/components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from 'src/components/lists/ListHeaderWrapper';
import { ListButtonsColumn } from './ListButtonsColumn';

interface ListHeaderProps {
  head: ReactNode[];
}

export const ListHeader = ({ head }: ListHeaderProps) => {
  return (
    <ListHeaderWrapper>
      <ListColumn maxWidth={160} isRow>
        <ListHeaderTitle>
          <Trans>Assets</Trans>
        </ListHeaderTitle>
      </ListColumn>

      {head.map((title, i) => (
        <ListColumn key={i}>
          <ListHeaderTitle>{title}</ListHeaderTitle>
        </ListColumn>
      ))}

      <ListButtonsColumn />
    </ListHeaderWrapper>
  );
};
