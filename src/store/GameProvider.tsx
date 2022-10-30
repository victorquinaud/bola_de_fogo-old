import { createContext, Reducer, useEffect, useReducer, useState } from "react";

interface IAction {
    type: string,
    payload?: {}
};

interface IPlayer {
    name: string,
    playing: boolean,
    payment: boolean
};

interface IOptions {
    vs: number,
    random: boolean
};

interface IGame {
    options: IOptions,
    list: string[],
    players: IPlayer[],
    teams: any
};

const initialState: IGame = {
    options: {
        vs: null,
        random: null
    },
    list: null,
    players: null,
    teams: null
};

export const GameContext = createContext<any>(initialState);

export const reducer: Reducer<IGame, IAction> = (state, action) => {
    switch (action.type) {
        case "setGame":
            return { ...state, ...action.payload };
        case "setPlayers":
            return { ...state, ...action.payload };
        case "setTeams":
            return { ...state, ...action.payload };
        case "reorderList":
            return { ...state, ...action.payload };
        default:
            return { ...state };
    };
};

export const GameProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [visible, setVisible] = useState<"game" | "players" | "teams" | "payment">("game");

    const setGame = ({ list, options }) => {
        if (list && options) {
            dispatch({ type: "setGame", payload: { list, options } });
        };
    };

    useEffect(() => {
        // set players
        if (state.list) {
            const names = state.list;
            const players: IPlayer[] = names.reduce((final, name) =>
                [...final, { name, playing: true, payment: false }]
                , []);

            // console.log("players: ", players);
            dispatch({ type: "setPlayers", payload: { players } });
        };

    }, [state.list]);

    useEffect(() => {
        // set teams
        const players = state.players;
        const vs = state.options.vs;

        if (players && vs) {
            const teamsNum = Math.ceil((players.length + 1) / vs);
            let teams = new Array(teamsNum).fill([]);

            let lastAdded = 0;
            teams = teams.map(() => {
                const team = [];
                while (team.length < vs) {
                    if (!players[lastAdded]) break;
                    team.push(players[lastAdded]);
                    lastAdded++;
                };
                return team;
            });

            // console.log("teams: ", teams);
            dispatch({ type: "setTeams", payload: { teams } });
        };

    }, [state.players, state.options.vs]);

    const reorderList = (players: IPlayer[]): void => {
        const playing = [];
        const noPlaying = [];
        
        players.forEach(player => {
            if (player.playing) {
                playing.push(player.name);
            } else {
                noPlaying.push(player.name);
            };
        });

        const list = [...playing, ...noPlaying];

        dispatch({ type: "reorderList", payload: { list } })
    };

    return (
        <GameContext.Provider
            value={{
                state,
                visible,
                setVisible,
                setGame,
                reorderList
            }}
        >
            {children}
        </GameContext.Provider>
    );
};