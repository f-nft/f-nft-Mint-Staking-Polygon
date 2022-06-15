import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import 'sf-font';
import { moralisapikey, NFTCONTRACT, STAKINGCONTRACT, moralisapi, nftpng } from './config';
import axios from 'axios';
import VAULTABI from './VAULTABI.json';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import Web3 from 'web3';

var account = null;
var vaultcontract = null;
var web3 = null;

const providerOptions = {
    binancechainwallet: {
        package: true
    },
    Walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: '50f6635fbcc742f18ce7a2a5cbe73ffa'
        }
    },
    Walletlink: {
        package: WalletLink,
        options: {
            appName: 'f-nft Polygon',
            infuraId: '50f6635fbcc742f18ce7a2a5cbe73ffa',
            rpc: 'https://polygon-mainnet.infura.io/v3',
            chainId: 137,
            appLogoUrl: null,
            darkMode: true
        }
    },
};

const web3Modal = new Web3Modal({
    network: 'mainnet',
    theme: 'dark',
    cacheProvider: true,
    providerOptions
});

export default function List() {
    const [apicall, getNfts] = useState([])
    const [listtk, getStk] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    const [loaded, setLoadedState] = useState('loaded')

    useEffect(() => {
        callApi()
    }, [])

    async function callApi() {
        var provider = await web3Modal.connect();
        web3 = new Web3(provider);
        await provider.send('eth_requestAccounts');
        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
        let config = { 'X-API-Key': moralisapikey, 'accept': 'application/json' };
        const list = await axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=polygon&format=decimal`), { headers: config })
            .then(output => {
                const { result } = output.data
                return result;
            })
        const apicall = await Promise.all(list.map(async i => {
            let item = {
                tokenId: i.token_id,
                holder: i.owner_of,
                wallet: account,
                info: i.metadata,
            }
            return item
        }))
        const stakedlist = await vaultcontract.methods.tokensOfOwner(account).call()
            .then(id => {
                return id;
            })
        const listtk = await Promise.all(stakedlist.map(async i => {
            let stkid = {
                tokenId: i,
            }
            return stkid
        }))
        getNfts(apicall)
        getStk(listtk)
        console.log(apicall)
        setLoadingState('loaded')
        setLoadedState('loaded')
    }
    if (loadingState === 'loaded' && !apicall.length)
        return (
            <h3>Wallet Not Connected</h3>)
    return (
        <div className='mb-1'>
            <div className="col-lg-12">
                <div className="row items px-3 pt-3">
                    <div className="ml-3 mr-3" style={{ fontFamily: 'Black Ops One', display: "inline-grid", gridTemplateColumns: "repeat(3, 4fr)", columnGap: "10px", minWidth: '200px' }}>
                        {apicall.map((nft, i) => {
                            var owner = nft.wallet.toLowerCase();
                            if (owner.indexOf(nft.holder) !== -1) {
                                async function stakeit() {
                                    vaultcontract.methods.stake([nft.tokenId]).send({ from: account });
                                }
                                return (
                                    <div className="card nft-card mt-3 mb-3" style={{ textShadow: "1px 1px 2px #000000", minWidth: '200px' }} key={i} >
                                        <div className="image-over">
                                            <img className="card-img-top" src={nftpng + nft.tokenId} alt="Fantasy NFT" />
                                        </div>
                                        <div className="card-caption col-12 p-0">
                                            <div className="card-body">
                                                <h6 className="mb-0">Fantasy Collection NFT #{nft.tokenId}</h6>
                                                <h6 className="mb-0 mt-2">Status<p>Ready to Stake</p></h6>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                                                    <Button style={{ marginLeft: '15px', backgroundColor: "green", textShadow: "1px 1px 2px #000000", padding: '5px', fontSize: '12px', border: '1px', borderRadius: '2px', boxShadow: '1px 1px 5px #000000', marginBottom: '5px' }} onClick={stakeit}>Stake it</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        {listtk.map((nft, i) => {
                            async function unstakeit() {
                                vaultcontract.methods.unstake([nft.tokenId]).send({ from: account });
                            }
                            return (
                                <div className="card stakedcard mt-3 mb-3" style={{ textShadow: "1px 1px 2px #000000", minWidth: '200px' }} key={i} >
                                    <div className="image-over">
                                        <img style={{ position: 'absolute', top: '0.05rem', width: '39px' }} src='check.png' alt='check'></img>
                                        <img className="card-img-top" src={nftpng + nft.tokenId} alt="Fantasy NFT" />
                                    </div>
                                    <div className="card-caption col-12 p-0">
                                        <div className="card-body">
                                            <h6 className="mb-0">Fantasy Collection NFT #{nft.tokenId}</h6>
                                            <h6 className="mb-0 mt-2">Status<p style={{ color: "#f524EE", textShadow: "1px 1px 2px #000000" }}>Currently Staked</p></h6>
                                            <div className="card-bottom d-flex justify-content-between">
                                                <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                                                <Button style={{ marginLeft: '15px', backgroundColor: "blue", textShadow: "1px 1px 2px #000000", padding: '5px', fontSize: '12px', border: '1px', borderRadius: '2px', boxShadow: '1px 1px 5px #000000', marginBottom: '5px' }} onClick={unstakeit}>Unstake it</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}