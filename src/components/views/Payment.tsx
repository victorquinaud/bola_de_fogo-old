import { useContext, useState } from "react";
import { GameContext } from "../../store/GameProvider";

const Payment = () => {

    const { state } = useContext(GameContext);
    const players = state.players;

    const [value, setValue] = useState<any>("");

    return (
        <div className="flex flex-col">
            <div className="flex justify-center text-xl my-2">
                <h3>VALOR:</h3>
                <input
                    type="number"
                    prefix="R$ "
                    maxLength={6}
                    placeholder="R$ 0,00"
                    onChange={e => setValue(e.target.value)}
                    className="w-20 text-end mx-3 bg-gray-100 b-none"
                />
                <span>{`/ ${players?.length} = ${(value / players?.length).toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) || "RS 0,00"}`}</span>
            </div>

            <table>
                <thead>
                    <tr className="bg-sky-300 flex justify-between pl-4 pr-6">
                        <th>NOME</th>
                        <th>PAGO</th>
                    </tr>
                </thead>
                <tbody>
                    {players?.map((player, i) =>
                        <tr
                            key={player.name}
                            className={`
                                ${i % 2 === 0 ? "bg-sky-100" : "bg-sky-50"}
                                text-xl flex justify-between pl-4 pr-10
                            `}
                        >
                            <td key={`td${player.name}`}>{player.name}</td>

                            <td><input type="checkbox" className="" /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Payment;