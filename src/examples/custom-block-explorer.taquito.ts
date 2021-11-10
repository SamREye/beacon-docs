/// START
import { BlockExplorer, NetworkType, Network } from "@airgap/beacon-sdk";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
/// END

async () => {
  /// START
  class TzStatsBlockExplorer extends BlockExplorer {
    constructor(
      public readonly rpcUrls: { [key in NetworkType]: string } = {
        [NetworkType.MAINNET]: "https://tzstats.com/",
        [NetworkType.DELPHINET]: "https://delphi.tzstats.com/",
        [NetworkType.EDONET]: "https://edo.tzstats.com/",
        [NetworkType.FLORENCENET]: "https://florence.tzstats.com/",
        [NetworkType.GRANADANET]: "https://granadanet.tzstats.com/",
        [NetworkType.HANGZHOUNET]: "https://hangzhou.tzstats.com/",
        [NetworkType.IDIAZABALNET]: "https://idiazabal.tzstats.com/",
        [NetworkType.CUSTOM]: "https://hangzhou.tzstats.com/",
      }
    ) {
      super(rpcUrls);
    }

    public async getAddressLink(
      address: string,
      network: Network
    ): Promise<string> {
      const blockExplorer = await this.getLinkForNetwork(network);

      return `${blockExplorer}/${address}`;
    }
    public async getTransactionLink(
      transactionId: string,
      network: Network
    ): Promise<string> {
      const blockExplorer = await this.getLinkForNetwork(network);

      return `${blockExplorer}/${transactionId}`;
    }
  }

  const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    blockExplorer: new TzStatsBlockExplorer(),
  });

  Tezos.setWalletProvider(wallet);
  /// END
};
