import { ethers, providers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'
import { getErc20Instance } from './erc20'


export const getDevInstance = (
    l2Provider: providers.BaseProvider,
    network: NetworkName
): ethers.Contract => {
    const devAddress = getDevAddress(network)
    return getErc20Instance(devAddress, l2Provider)
}

const getDevAddress = (network: NetworkName): string => {
    return network === 'arbitrum-one'
        ? '0x91F5dC90979b058eBA3be6B7B7e523df7e84e137'
        : network === 'arbitrum-rinkeby'
            ? '0xc28BBE3B5ec1b06FDe258864f12c1577DaDFadDC'
            : network === 'polygon-mainnet'
                ? '0xA5577D1cec2583058A6Bd6d5DEAC44797c205701'
                : network === 'polygon-mumbai'
                    ? '0xE071bb5861e2352C89992799896D124F1bA5d599'
                    : ''
}
