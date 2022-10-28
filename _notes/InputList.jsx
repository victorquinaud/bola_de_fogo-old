import React, { useState, useRef } from "react";

const testList = `01 - Vitor\n02 - Neguin\n03 - Felipe\n04 - Roberto\n05 - Vitim\n06 - Neto\n07 - Max\n08 - Enzo\n09 - Bruno\n10 - Quaresma\n11 - Rafael\n12 - Wilson\n13 - doguinn\n14 - secaison\n\n15 - Vitor\n16 -Neguin\n17- João\n18 Pedro\n19-gustavo  ---  123\n20Felipe Bruno`;

const getList = (list, sort = false) => {
    return new Promise((resolve, reject) => {

        if (!list) {
            reject(`the list is empty`);
            return;
        };

        // getting lines
        list = list.split("\n")
            //getting words
            .map(line => line.split(" ")
               // getting letters
                .map(word => word.split("")
                    .map(letter => {
                        // removeing "-", "\n" and numbers
                        if (letter === "-" || letter === "\n" || Number.isInteger(Math.floor(parseInt(letter))))
                            return "";
                        else
                            return letter.toLowerCase();
                    // joining letters to word
                    }).join("")
                // joing word to phrase
                ).join(" ").trim()
            // filtering empty lines
            ).filter(Boolean);

        // removing duplicated cases with Set and destructuring
        list = [...new Set(list)];

        // getting sort list
        if (sort) {
            const list_length = list.length;
            const list_temp = [...list];
            list = [];

            while (list.length < list_length) {
                const calc = Math.floor(Math.random() * list_temp.length);

                if (!list.includes(list_temp[calc])) {
                    list.push(list_temp[calc]);
                    list_temp.splice(calc, 1);
                };
            };
        };

        // createing final player object
        list = list.reduce((final, name) => 
            [...final, { name, playing: true, payment: false }]
        , []);

        console.log("getList: ", list);
        resolve(list);
    });  
};

const InputList = props => {

    const { sendPlayers } = props;
    const [list, setList] = useState(testList);
    const [name, setName] = useState("");
    const inputName = useRef(null);

    const addPlayer = _ => {
        if (name.length === 0) {
            console.log("Invalid name");
            return;
        };

        setList(list => {
            const length = list.split("\n").length;
            const newItem = `${length} - ${name}`;
            if (list.length === 0)
                return newItem
            else
                return `${list}\n${newItem}`
        });

        setName("");
        inputName.current.focus();
    };

    const submit = async _ => {
        const players = await getList(list);
        sendPlayers(players);
    };

    return (
        <div className="InputList">
            <textarea 
                type="text"
                placeholder="Cole a lista aqui."
                autoFocus
                rows={20}
                value={list}
                onChange={e => setList(e.target.value)}
            />

            <div>
                <input
                    type="text"
                    placeholder="Nome"
                    ref={inputName}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button onClick={_ => addPlayer()}>Adicionar</button>
            </div>

            <button onClick={_ => submit()} >Enviar</button>
        </div>
    );
};

export default InputList;