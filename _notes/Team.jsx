import React, { useState } from "react";

const getTeams = (list, vs) => {
    return new Promise((resolve, reject) => {

        if (!list) {
            console.log("Invalid list.");
            return;
        } else if (!vs) {
            console.log("Invalid vs.");
            return;
        };

        const teamsNum = Math.ceil((list.length + 1) / vs);
        let teams = new Array(teamsNum).fill([]);

        let lastAdded = 0;
        teams = teams.map(_ => {
            const team = [];
            while (team.length < vs) {
                if (!list[lastAdded]) break;
                team.push(list[lastAdded]);
                lastAdded++;
            };
            return team;
        });

        console.log("getTeams: ", teams);
        resolve(teams);
    });
};

const Team = props => {

    const { sendTeams, players } = props;
    const [vs, setVs] = useState(0);
    
    async function submit(e) {
        e.preventDefault();
        const final = await getTeams(players, vs);
        sendTeams(final);
    };

    return (
        <div className="Team">
            <form name="game">
                <div>
                    <input type="radio" name="vs" value={vs} onChange={_ => setVs(4)} /> 4vs4
                    <input type="radio" name="vs" value={vs} onChange={_ => setVs(5)} /> 5vs5
                </div>

                 <button onClick={e => submit(e)}>Gerar times</button>
            </form>

        </div>
    );
};

export default Team;