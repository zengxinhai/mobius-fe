import { IncentivesCard } from 'src/components/incentives/IncentivesCard';
import { ListColumn } from 'src/components/lists/ListColumn';

interface ListAPRColumnProps {
  value: number | string;
  symbol: string;
}

export const ListAPRColumn = ({ value, symbol }: ListAPRColumnProps) => {
  return (
    <ListColumn>
      <IncentivesCard value={value} symbol={symbol} data-cy={`apyType`} />
    </ListColumn>
  );
};
