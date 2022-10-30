import { useContext } from "react";
import { GameContext } from "../../store/GameProvider";

const Teams = () => {

    const { state, reorderList } = useContext(GameContext);
    const { vs } = state.options;
    const { teams } = state;

    const tr = new Array(vs).fill(null);
    const ul_next = new Array(teams?.length).fill(null);

    const setLooser = (index: number): void => {
        const newPlayers = teams.reduce((final, team, i) => {
            if (i === index) {
                team.map(player => {
                    player.playing = false;
                    final.push(player);
                });
            } else {
                team.map(player => {
                    final.push(player);
                });
            };
            return final;
        }, []);

        reorderList(newPlayers);
    };

    return (
        <>
            {teams ? (
                <div className="flex flex-col flex-grow">
                    <div className="flex justify-between px-4 mb-2">
                        <button
                            onClick={() => setLooser(1)}
                            className="bg-rose-300 hover:bg-rose-400 py-3 px-5 rounded-md"
                        >VENCEU</button>
                        <button
                            onClick={() => setLooser(0)}
                            className="bg-sky-300 hover:bg-sky-400 py-3 px-5 rounded-md"
                        >VENCEU</button>
                    </div>

                    <table className="flex-grow text-center text-xl mb-10">
                        <thead>
                            <tr>
                                <th className="w-1/2 bg-gradient-to-r from-rose-500 to-rose-200"
                                >VERMELHO</th>
                                <th className="w-1/2 bg-gradient-to-l from-sky-500 to-sky-200"
                                >AZUL</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tr.map<any>((e, i) => (
                                <tr key={`tbody${i}`}>
                                    <td key={`tbodytd1${i}`}
                                        className={`
                                            ${i % 2 === 0 ? "bg-rose-50" : "bg-rose-100"}
                                            text-left pl-5
                                        `}>
                                        {teams[0][i] && teams[0][i].name}
                                    </td>

                                    <td key={`tbodytd2${i}`}
                                        className={`
                                            ${i % 2 === 0 ? "bg-sky-50" : "bg-sky-100"}
                                            text-right pr-5
                                        `}>
                                        {teams[1][i] && teams[1][i].name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex flex-col items-center text-center">
                        {ul_next.map<any>((e, i) => {
                            if (!(i === 0 || i === 1)) {
                                return (
                                    <>
                                        <label className="bg-gray-200 w-full mt-3 mb-1">{`PRÓXIMOS ${i - 1}`}</label>
                                        <ul
                                            className="w-1/2"
                                            key={`ul${i}`}
                                        >
                                            {teams[i] && teams[i].map(player => (
                                                <li key={`li%{i}`}>
                                                    {player.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                );
                            };
                        })}
                    </div>
                </div>
            ) : false}
        </>
    );
};

export default Teams;