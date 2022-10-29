import { useContext } from "react";
import { GameContext } from "../../store/GameProvider";

import Title from './../Title';
import Game from '../views/Game';
import Teams from "../views/Teams";
import Payment from "../views/Payment";
import Players from './../views/Players';
import Button from './../Button';

const Content = (props: any) => {

    const { visible, setVisible } = useContext(GameContext);

    return (
        <div className='w-screen mx-5 bg-gray-100 rounded-md flex flex-col overflow-hidden' >
            <Title title={visible} />

            <div className={`${visible !== "game" ? "hidden" : ""}`}>
                <Game />
            </div>
            <div className={`${visible !== "teams" ? "hidden" : ""}`}>
                <Teams />
            </div>
            <div className={`${visible !== "payment" ? "hidden" : ""}`}>
                <Payment />
            </div>
            <div className={`${visible !== "players" ? "hidden" : ""}`}>
                <Players />
            </div>
            <div className={`${visible !== "game" ? "" : "hidden"}`}>
                <div className="flex justify-around mt-10">
                    <Button label="Jogadores" click={() => setVisible("players")} />
                    <Button label="Pagamento" click={() => setVisible("payment")} />
                    <Button label="Times" click={() => setVisible("teams")} />
                </div>
            </div>
        </div>
    );
};

export default Content;