export default class Api {
    host = 'https://stream-api.youceflcv.fr';
    searchEndpoint = '/api/pokemon?smogonName=';

    bigWinEndpoint = '/api/pokemons/:id/big_wins_matchups';
    bigLossEndpoint = '/api/pokemons/:id/big_losses_matchups';
    smallWinEndpoint = '/api/pokemons/:id/small_wins_matchups';
    smallLossEndpoint = '/api/pokemons/:id/small_losses_matchups';

    async searchPokemon(pokemonName) {
        const response = await fetch(this.host + this.searchEndpoint + pokemonName);
        const data = await response.json();

        return data.member || [];
    }

    async callApi(endpoint) {
        const response = await fetch(this.host + endpoint);
        return await response.json();
    }

    async getMatches(pokemonId) {
        return new Promise(async (resolve, reject) => {
            pokemonId = pokemonId.replace('/api/pokemon/', '');

            await Promise.all([
                this.getBigWins(pokemonId),
                this.getBigLosses(pokemonId),
                this.getSmallWins(pokemonId),
                this.getSmallLosses(pokemonId),
            ])
            .then((results) => {
                resolve({
                    bigWins: results[0].bigWins,
                    bigWinCount: results[0].bigWinCount,
                    bigLosses: results[1].bigLosses,
                    bigLossCount: results[1].bigLossCount,
                    smallWins: results[2].smallWins,
                    smallWinCount: results[2].smallWinCount,
                    smallLosses: results[3].smallLosses,
                    smallLossCount: results[3].smallLossCount,
                });
            });
        });
    }

    getBigWins(pokemonId) {
        return new Promise(async (resolve, reject) => {
            const data = await this.callApi(this.bigWinEndpoint.replace(':id', pokemonId)); 
            resolve({
                bigWinCount: data.totalItems,
                bigWins: data.member,
            });
        });
    }

    getBigLosses(pokemonId) {
        return new Promise(async (resolve, reject) => {
            const data = await this.callApi(this.bigLossEndpoint.replace(':id', pokemonId)); 
            resolve({
                bigLossCount: data.totalItems,
                bigLosses: data.member,
            });
        });
    }

    getSmallWins(pokemonId) {
        return new Promise(async (resolve, reject) => {
            const data = await this.callApi(this.smallWinEndpoint.replace(':id', pokemonId)); 
            resolve({
                smallWinCount: data.totalItems,
                smallWins: data.member,
            });
        });
    }

    getSmallLosses(pokemonId) {
        return new Promise(async (resolve, reject) => {
            const data = await this.callApi(this.smallLossEndpoint.replace(':id', pokemonId)); 
            resolve({
                smallLossCount: data.totalItems,
                smallLosses: data.member,
            });
        });
    }
}