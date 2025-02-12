'use client'

import styles from "./page.module.css";
import { useState } from "react";
import debounce from 'debounce';
import Api from './classes/Api';
import SearchResult from "./components/SearchResult";
import Pokemon from "./components/Pokemon";

export default function Home() {
  const api = new Api();
  const [searchResults, setSearchResults] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);

  const search = async (query) => {
    const results = await api.searchPokemon(query);
    setSearchResults(results);
  };

  const handleChange = (event) => {
    const query = event.target.value;
    if (3 < query.length) {
      window.pokemonSearch = debounce(search(query), 200);
    }
  };

  if (currentPokemon) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <Pokemon pokemon={currentPokemon} setCurrentPokemon={setCurrentPokemon} />
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Search a Pokémon</h1>

        <input type="text" onChange={handleChange} />
        <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {searchResults.map((result) => (
            <SearchResult key={result.id} pokemon={result} setCurrentPokemon={setCurrentPokemon} />
          ))}
        </ul>
      </main>
    </div>
  );
}
