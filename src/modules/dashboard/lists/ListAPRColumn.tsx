import { ReserveIncentiveResponse } from '@aave/math-utils/dist/esm/formatters/incentive/calculate-reserve-incentives';

import { IncentivesCard } from 'src/components/incentives/IncentivesCard';
import { ListColumn } from 'src/components/lists/ListColumn';

interface ListAPRColumnProps {
  value: number | string;
  incentives?: ReserveIncentiveResponse[];
  symbol: string;
}

export const ListAPRColumn = ({ value, incentives, symbol }: ListAPRColumnProps) => {
  return (
    <ListColumn>
      <IncentivesCard value={value} incentives={incentives} symbol={symbol} data-cy={`apyType`} />
    </ListColumn>
  );
};
