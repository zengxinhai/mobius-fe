import {Trans} from '@lingui/macro';
import {Button} from '@mui/material';
import {useModalContext} from 'src/hooks/useModal';

import {ListColumn} from 'src/components/lists/ListColumn';
import {BorrowedPositionsItem} from './types';
import {ListAPRColumn} from '../ListAPRColumn';
import {ListButtonsColumn} from '../ListButtonsColumn';
import {ListItemAPYButton} from '../ListItemAPYButton';
import {ListItemWrapper} from '../ListItemWrapper';
import {ListValueColumn} from '../ListValueColumn';

export const BorrowedPositionsListItem = ({
                                            symbol,
                                            iconSymbol,
                                            name,
                                            underlyingAsset,
                                            isActive,
                                            borrowingEnabled,
                                            variableBorrowAPY,
                                            variableBorrows,
                                            variableBorrowsUSD,
                                          }: BorrowedPositionsItem) => {
  const {openBorrow, openRepay} = useModalContext();
  
  const borrowRateMode = 'Variable';
  
  return (
    <ListItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      data-cy={`dashboardBorrowedListItem_${symbol.toUpperCase()}_${borrowRateMode}`}
    >
      <ListValueColumn
        symbol={symbol}
        value={variableBorrows}
        subValue={variableBorrowsUSD}
      />
      
      <ListAPRColumn
        value={variableBorrowAPY}
        incentives={[]}
        symbol={symbol}
      />
      
      <ListColumn>
        <ListItemAPYButton
          borrowRateMode={borrowRateMode}
          disabled={!isActive}
          onClick={() => {
          }}
          variableBorrowAPY={variableBorrowAPY}
          underlyingAsset={underlyingAsset}
        />
      </ListColumn>
      
      <ListButtonsColumn>
        <Button
          disabled={!isActive || Number(variableBorrows) <= 0}
          variant="contained"
          onClick={() => openRepay(underlyingAsset)}
        >
          <Trans>Repay</Trans>
        </Button>
        <Button
          disabled={!isActive || !borrowingEnabled}
          variant="outlined"
          onClick={() => openBorrow(underlyingAsset)}
        >
          <Trans>Borrow</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};
