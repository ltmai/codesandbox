import React, { useState, useEffect } from "react";
import axios from "axios";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * This is my (improved) version of Pokemon search
 * @see https://codepen.io/chrisoncode/pen/wvKjWpE
 * @param {*} props
 */
export default function PokemonApp(props) {
  const [pokemon, setPokemon] = useState(null);
  const [query, setQuery] = useState("pikachu");
  const [pokemons, setPokemons] = useState([]);

  /**
   * one-time initialization can be accomplished by making use of the
   * feature "lazy initial state" as described here:
   * https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
   * this runs once, even before the initial render.
   */
  async function fetchPokemons() {
    try {
      console.log("Retrieving pokemon names ...");
      const response = await axios("https://pokeapi.co/api/v2/pokemon");
      setPokemons(response.data.results.map(result => result.name));
      console.log("Pokemon names retrieved successfully");
    } catch (e) {
      console.log("Failed to fetch pokemon names");
    }
  }
  useState(fetchPokemons);

  function handleRandomPick(e) {
    e.preventDefault();
    let randomPokemonName = pokemons[getRandomInt(pokemons.length)];
    document.getElementById("pokemon_input").value = randomPokemonName;
    setQuery(randomPokemonName);
  }

  /**
   * useEffect() will run after the render is commited to the screen.
   * Each time useEffect() is invoked (during rendering phase) a (new)
   * function is passed to useEffect as parameter BY VALUE, so that it
   * will be called AFTER rendering. This function returns a clean-up
   * inline function to be called BEFORE the next call to useEffect.
   * Since the clean-up function is defined in the body of the callback
   * as well as other local variables (e.g. ignore in the below example)
   * it can refer to that very variable value in its closure.
   *
   * The same applies to the async function defined inside the callback
   * function: it can refer to that variable in its closure.
   *
   * DO NOT FORGET that the callback is INVOKED ONLY WHEN query CHANGES.
   *
   * From React docs:
   * https://reactjs.org/docs/hooks-reference.html#useeffect
   * The function passed to useEffect will run after the render is
   * committed to the screen. Think of effects as an escape hatch from
   * React’s purely functional world into the imperative world.
   */
  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const response = await axios(
          `https://pokeapi.co/api/v2/pokemon/${query}`
        );
        /* refers to the variable "ignore" in closure */
        if (!ignore) setPokemon(response.data);
      } catch (e) {
        if (!ignore) setPokemon(null);
      }
    }

    if (query) fetchData();

    return () => {
      /**
       * Updates the variable "ignore" in closure.
       * This also runs each time query changes, setting ignore to true
       * signifies the above code: a new value of query is available so
       * please ignore the result you get.
       */
      ignore = true;
    };
  }, [query]); /* executed when query changes */

  return (
    <>
      {console.log(new Date().toUTCString() + " rendering")}
      <div className="App" align="center">
        <h1>{props.name} seach</h1>
        <form onSubmit={handleRandomPick}>
          <input
            type="text"
            /* this updates the state variable query as user types */
            onChange={e => setQuery(e.target.value)}
            id="pokemon_input"
          />
          <input type="submit" value="random" />
        </form>
        <br />
        {pokemon && (
          <div>
            <Pokemon pokemon={pokemon} />
          </div>
        )}
      </div>
    </>
  );
}

function Pokemon(props) {
  return (
    <div className="pokemon">
      <img
        src={`https://pokeres.bastionbot.org/images/pokemon/${
          props.pokemon.id
        }.png`}
        alt={`${props.pokemon.name}`}
        width="200"
      />
      {props.pokemon.stats.map((stat, index) => (
        <p key={index}>
          {stat.stat.name} : {stat.base_stat}
        </p>
      ))}
    </div>
  );
}
