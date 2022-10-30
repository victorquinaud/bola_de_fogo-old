import { useContext, useState } from 'react';
import { GameContext } from "../../store/GameProvider";

import InputList from '../InputList';

interface IOptions {
    vs: number,
    random: boolean
};

const Game = () => {

    const { setVisible, setGame } = useContext(GameContext);

    const [vs, setVs] = useState<number>();
    const [list, setList] = useState<string[]>([]);
    const [random, setRandom] = useState<boolean>(false);

    const submit = () => {
        if (list.length && vs) {
            setGame({ list, options: { vs, random } });
            setVisible("players");
        } else
            console.log("submith failed");
    };

    return (
        <div className='Game flex flex-col'>
            <div className='flex justify-around bg-gray-500'>
                <div className='flex flex-col'>
                    <h2 className='text-center'>VERSUS</h2>
                    
                    <div className='font-xl'>
                        <input type="radio" name="vs" value={vs} onChange={_ => setVs(4)} /> <span>4vs4</span>
                        <input type="radio" name="vs" value={vs} onChange={_ => setVs(5)} className="ml-5" /> <span>5vs5</span>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <h2 className='text-center mb-1'>ALEATÓRIO</h2>
                    <input type="checkbox" onChange={e => setRandom(e.target.checked)} />
                </div>
            </div>

            <InputList sendList={setList} sort={random} />

            <button
                onClick={submit}
                className="py-4 bg-sky-700 text-white active:bg-sky-500"
            >
                INICIAR
            </button>
        </div>
    );
};

export default Game;