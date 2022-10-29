import { useContext } from "react";
import { GameContext } from "../../store/GameProvider";

const Players = () => {

    const { state, setVisible } = useContext(GameContext);
    const { players } = state;

    return (
        <div className="Players flex flex-col">
            <button
                onClick={() => setVisible("game")}
                className="py-2 px-4 mr-4 my-1 self-end text-white bg-sky-700 rounded-xl"
            >
                Editar
            </button>

            <ul>
                {players?.map((player, i) =>
                    <li
                        key={player.name}
                        className={`
                            ${i % 2 === 0 ? "bg-sky-100" : "bg-sky-50"}
                            pl-4
                        `}
                    >Nome: {player.name}</li>
                )}
            </ul>
        </div>

    );
};

export default Players;