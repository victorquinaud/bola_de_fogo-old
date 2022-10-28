import "../../data/styles/Game.css";
import React, { useState } from "react";

import InputList from "../InputList";
import Team from "../Team";

const Game = props => {

    const [players, setPlayers] = useState(null);
    const [teams, setTeams] = useState(null);

    return (
        <div className="Game">
            <InputList sendPlayers={setPlayers} />

            { players
                ? <ul>{ players.map(item => <li key={item.name}>{JSON.stringify(item)}</li>) }</ul>
                : "[players]"
            }

            <div>
                {players ? <button onClick={_ => setPlayers(null)}>Clear</button> : false}
            </div>

            <Team sendTeams={setTeams} players={players} />

            { teams
                ? teams.map((team, index) =>
                <div key={`div_${team[0].name}`}>
                    <h3 key={`h3_${team[0].name}`}>{`Team 0${index + 1}`}</h3>
                    <ul key={`team_${team[0].name}`}>
                        { team.map(player => <li key={player.name} >{ JSON.stringify(player) }</li>) }
                    </ul>
                </div>
                )
                : "[teams]"
            }

            <div>
                {teams ? <button onClick={_ => setTeams(null)}>Clear</button> : false}
            </div>

        </div>
    );
};

export default Game;