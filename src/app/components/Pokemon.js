'use client'

import { useState } from "react";
import Api from "../classes/Api";
import SearchResult from "./SearchResult";

const Pokemon = ({pokemon, setCurrentPokemon}) => {
    const makeImageUrl = (smogonName) => {
        return `https://www.smogon.com/dex/media/sprites/xy/${smogonName.replace(' ', '-')}.gif`;
    }

    const [winCount, setWinCount] = useState(0);
    const [lossCount, setLossCount] = useState(0);
    const [winRate, setWinRate] = useState(0);

    const [bigWins, setBigWins] = useState([]);
    const [bigWinCount, setBigWinCount] = useState(0);
    const [bigLosses, setBigLosses] = useState([]);
    const [bigLossCount, setBigLossCount] = useState(0);
    const [smallWins, setSmallWins] = useState([]);
    const [smallWinCount, setSmallWinCount] = useState(0);
    const [smallLosses, setSmallLosses] = useState([]);
    const [smallLossCount, setSmallLossCount] = useState(0);

    if (!winCount) {
        const api = new Api();

        api
            .getMatches(pokemon["@id"])
            .then((data) => {
                setWinCount(data.bigWinCount + data.smallWinCount);
                setLossCount(data.bigLossCount + data.smallLossCount);
                setWinRate(((data.bigWinCount + data.smallWinCount) / (data.bigWinCount + data.smallWinCount + data.bigLossCount + data.smallLossCount) * 100).toFixed(2));

                setBigWins(data.bigWins);
                setBigWinCount(data.bigWinCount);
                setBigLosses(data.bigLosses);
                setBigLossCount(data.bigLossCount);
                setSmallWins(data.smallWins);
                setSmallWinCount(data.smallWinCount);
                setSmallLosses(data.smallLosses);
                setSmallLossCount(data.smallLossCount);
            })
        ;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <small style={{fontStyle:"italic", marginBottom:"1rem"}} onClick={() => setCurrentPokemon(null)}>Back</small>

            <hgroup style={{display: 'flex', flexDirection: 'column', gap: '0.3rem'}}>
                {pokemon.formName && <h3>{pokemon.formName}</h3>}
                <h1>{pokemon.pokemonName}</h1>
                <h3>{pokemon.moveName}</h3>
                <h4>{pokemon.abilityName} {pokemon.itemName && <span>+ {pokemon.itemName}</span>}</h4>
            </hgroup>
            

            <img style={{maxWidth:"50px"}} src={makeImageUrl(pokemon.smogonName.toLowerCase())} alt={pokemon.pokemonName} />

            <span>Wins : {winCount}, Losses : {lossCount}, WR : {winRate}%</span>

            <hgroup>
                <h2>Big Wins ({bigWinCount})</h2>
                <h3>Matches won 3 - 0</h3>
            </hgroup>

            <details>
                <summary>Open/Close</summary>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {bigWins.map((match) => (
                        <SearchResult key={match["@id"]} pokemon={match} setCurrentPokemon={setCurrentPokemon} />
                    ))}
                </ul>
            </details>

            <hgroup>
                <h2>Small wins ({smallWinCount})</h2>
                <h3>Matches won 2 - 1</h3>
            </hgroup>

            <details>
                <summary>Open/Close</summary>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {smallWins.map((match) => (
                        <SearchResult key={match["@id"]} pokemon={match} setCurrentPokemon={setCurrentPokemon} />
                    ))}
                </ul>
            </details>

            <hgroup>
                <h2>Small losses ({smallLossCount})</h2>
                <h3>Matches lost 1 - 2</h3>
            </hgroup>

            <details>
                <summary>Open/Close</summary>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {smallLosses.map((match) => (
                        <SearchResult key={match["@id"]} pokemon={match} setCurrentPokemon={setCurrentPokemon} />
                    ))}
                </ul>
            </details>

            <hgroup>
                <h2>Big losses ({bigLossCount})</h2>
                <h3>Matches lost 0 - 3</h3>
            </hgroup>

            <details>
                <summary>Open/Close</summary>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {bigLosses.map((match) => (
                        <SearchResult key={match["@id"]} pokemon={match} setCurrentPokemon={setCurrentPokemon} />
                    ))}
                </ul>
            </details>
        </div>
    );
}

export default Pokemon;