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
    console.log(random)

    // useEffect(() => {
    const submit = () => {
        if (list.length && vs) {
            setGame({ list, options: { vs, random } });
            setVisible("players");
        } else
            console.log("submith failed");
    };
    // }, []);

    return (
        <div className='Game flex flex-col'>
            <div className='flex justify-around bg-gray-500'>
                <div className='flex flex-col'>
                    <h2 className='text-center'>Versus</h2>
                    
                    <div className='flex gap-1'>
                        <input type="radio" name="vs" value={vs} onChange={_ => setVs(4)} /> 4vs4
                        <input type="radio" name="vs" value={vs} onChange={_ => setVs(5)} /> 5vs5
                    </div>
                </div>

                <div className='flex flex-col'>
                    <h2 className='text-center'>Random</h2>
                    <input type="checkbox" onChange={e => setRandom(e.target.checked)} />
                </div>
            </div>

            <InputList sendList={setList} sort={random} />

            <button
                onClick={submit}
                className="py-4 bg-sky-600 text-white active:bg-sky-500"
            >
                Iniciar
            </button>
        </div>
    );
};

export default Game;