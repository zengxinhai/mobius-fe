import { Trans } from '@lingui/macro';
import { Warning } from 'src/components/primitives/Warning';

type WalletEmptyInfoProps = {
  name: string;
  icon?: boolean;
};

export function WalletEmptyInfo({ name, icon }: WalletEmptyInfoProps) {
  return (
    <Warning severity="info" icon={icon}>
      <Trans>Your {name} wallet is empty. Purchase or transfer assets.</Trans>
    </Warning>
  );
}
