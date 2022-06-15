import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Loader } from './';

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5] border-gray"

const Welcome = () => {

    const connectWallet = () => {

        return (
            <div className="flex w-full justify-center item-center">
                <div className="flex md:flex-row flex-col item-start justify-between md:p-3 py5 px-15">
                    <div className="flex flex-2 justify-start flex-col md:mr-20">
                        <h1 className="text-3xl sm:text-5xl text-blue text-gradient py-5">
                            Fantasy Collections
                        </h1>
                        <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                            The Journey to challenge yourself
                        </p>
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#837628]
                        p-3 rounded-full cursor-pointer hover:bg-[#dd0e98de]">
                            <p className="text-white text-base font-bold">
                                Connect Wallet </p>
                        </button>
                        <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                            <div className={`rounded-tl-2xl ${commonStyles}`}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Welcome;