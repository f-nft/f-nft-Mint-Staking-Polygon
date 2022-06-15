import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Loader } from './';

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.79px] border-gray-400 text-sm font-light text-white";

const Welcome = () => {
    const connectWallet = () => { }

    return (
        <div className="flex w-full justify-center item-center">
            <div className="flex md:flex-row flex-col item-start justify-between md:p-5 p-4 px-15">
                <div className="flex flex-1 justify-start flex-col md:mr-20">
                    <h1 className="text-3xl font-mono sm:text-5xl text-blue text-gradient py-1">
                        Fantasy Collections
                    </h1>
                    <p className="text-left mt-5 text-white text-serif font-light md:w-9/12 w-11/12 text-base">
                        The Journey to challenge yourself
                    </p>
                    <button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-left my-3 py-3 px-3 bg-[#f53100]
                        p-3 rounded-full cursor-pointer hover:bg-[#dd0e98de]">
                        <p className="text-white text-base font-bold">
                            Connect Wallet </p>
                    </button>
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Mint
                        </div>
                        <div className={`rounded-tl-1xl ${commonStyles}`}>
                            Upgradeable
                        </div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Trade
                        </div>
                        <div className={` rounded-bl-2xl ${commonStyles}`}>
                            Stake
                        </div>
                        <div className={`rounded-tl-1xl ${commonStyles}`}>
                            Farm
                        </div>
                        <div className={` rounded-br-2xl ${commonStyles}`}>
                            Quests
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">

            </div>
        </div>
    );
}

export default Welcome;