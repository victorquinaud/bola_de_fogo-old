import { useState, useRef } from "react";

interface IList {
    sendList(players: string[]): void,
    sort: boolean
};

interface IPlayer {
    name: string,
    playing: boolean,
    payment: boolean
};

interface IGetList {
    list: string,
    sort?: boolean
};

const getList = ({ list, sort = false }: IGetList): Promise<string[]> => {
    return new Promise((resolve, reject) => {

        if (!list) {
            reject(`the list is empty`);
            return;
        };

        // getting lines
        let names: string[] = list.split("\n")
            //getting words
            .map(line => line.split(" ")
                // getting letters
                .map(word => word.split("")
                    .map(letter => {
                        // removeing "-", "\n" and numbers
                        if (letter === "-" || letter === "_" || letter === "\n" || Number.isInteger(Math.floor(parseInt(letter))))
                            return "";
                        else
                            return letter.toUpperCase();
                        // joining letters to word
                    }).join("")
                    // joing word to phrase
                ).join(" ").trim()
                // filtering empty lines
            ).filter(Boolean);

        // removing duplicated cases with Set and destructuring
        names = [...new Set(names)];

        if (sort) {
            const list_length = names.length;
            const list_temp = [...names];
            names = [];

            while (names.length < list_length) {
                const calc = Math.floor(Math.random() * list_temp.length);

                if (!names.includes(list_temp[calc])) {
                    names.push(list_temp[calc]);
                    list_temp.splice(calc, 1);
                };
            };
        };

        resolve(names);
    });
};

const playersArrToString = (players: string[]) => {
    let str = "";
    players.filter(Boolean).forEach((name, i) => {
        if (name !== "\n")
            str += `${i + 1} - ${name}\n`;
    })
    return str;
};

const tempList = "1 - Pedro\n2 - Lucas\n3- João\n4- Marcos\n5 -Paula\n6 -Secão\n7 Gui\n8 Manu\n9Fernando\n10Maurício\nFelipe\nVitor\n- Kátia\n- Laura\n-Júlia\n-Joaquim\n -Negão\n -Matheusinho\n\n \n  \n-\n";

const List = (props: IList) => {

    const { sendList, sort } = props;

    const inputName = useRef(null);

    const [list, setList] = useState<any>(tempList);
    const [name, setName] = useState<string>("");

    const addPlayer = () => {
        if (!name.length) {
            console.log("Invalid name");
            return;
        };

        setList(list => {
            const length = list.split("\n").length;
            const newItem = `${length + 1} - ${name}`;
            if (!list.length)
                return `${length} - ${name}`;
            else
                return `${list}\n${newItem}`
        });

        setName("");
        inputName.current.focus();
    };

    const submit = async () => {
        const players = await getList({ list, sort });
        const playersString = playersArrToString(players);
        setList(playersString);
        sendList(players);
    };

    return (
        <div className="InputList flex flex-col">
            <textarea
                placeholder="Cole a lista aqui."
                autoFocus
                rows={20}
                value={list}
                onChange={e => setList(e.target.value)}
                className="text-white py-2 pl-4 flex-grow text-xl"
            />

            <div className="mt-1 hidden">
                <input
                    type="text"
                    placeholder="Nome"
                    ref={inputName}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="text-white py-2 pl-4 text-xl"
                />
                <button
                    onClick={_ => addPlayer()}
                    className="flex-grow"
                >
                    Adicionar
                </button>
            </div>

            <button
                onClick={_ => submit()}
                className="py-2 active:bg-sky-200 rounded-md"
            >
                Corrigir lista
            </button>
        </div>
    );
};
export default List;