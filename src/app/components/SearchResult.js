const SearchResult = ({pokemon, setCurrentPokemon}) => {
    const clickHandler = () => {
        setCurrentPokemon(pokemon);
    };

    return (
        <li onClick={clickHandler} style={{display: 'flex', flexDirection: 'column', cursor: 'pointer'}}>
            {pokemon.formName && <small>{pokemon.formName}</small>}
            <span>{pokemon.pokemonName} <em>({pokemon.abilityName})</em></span>
            <strong>{pokemon.moveName}</strong>
            {pokemon.itemName && <small>{pokemon.itemName}</small>}
        </li>
    );
}

export default SearchResult;