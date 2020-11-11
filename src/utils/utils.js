import { API_KEY } from "../constants";
import _ from "lodash";
export const makeApiCallForSearch = (searchInput, apiUrl) => {
    const finalOutputUrl = makesearchApiUrl(searchInput, apiUrl);
    return fetch(finalOutputUrl)

};
export const makeGetApiCall = (apiUrl) => {
    const finalOutputUrl = makeGetApiUrl(apiUrl);
    console.log(finalOutputUrl)
    return fetch(finalOutputUrl)

};

export const makeApiCallForCast = (apiUrl, personId) => {
    const searchUrl = apiUrl + personId.toString() + "/" + "movie_credits"
    const finalOutputUrl = makeGetApiUrl(searchUrl);
    console.log(finalOutputUrl);
    return fetch(finalOutputUrl)
}


export const constructUrlWithParams = (baseUrl, params) => {
    return baseUrl + "?" + new URLSearchParams(params);
}

export const getBaseParams = () => {
    const baseParams =
    {
        api_key: API_KEY,
        language: "en-US"
    };
    return baseParams;
}

export const makeGetApiUrl = (apiUrl) => {
    const baseParams = getBaseParams();
    const finalSearchUrl = constructUrlWithParams(apiUrl, baseParams);
    return finalSearchUrl
}
export const makesearchApiUrl = (searchInput, apiUrl) => {
    const newParams = {
        query: searchInput
    };
    const baseParams = getBaseParams();

    const allParams = {
        ...baseParams,
        ...newParams
    }
    const finalSearchUrl = constructUrlWithParams(apiUrl, allParams);
    return finalSearchUrl

};

export const movieComparator = (movie1, movie2) => {
    return movie1.id === movie2.id

}
export const movieIntersect = (MovieList1,MovieList2) => {
    return MovieList1.filter(a => MovieList2.some(b => movieComparator(a, b)));
}

export const populateGenres = (resultsList, genreIdToNameMapping) => {

    const modifiedResultsList =
        _.map(resultsList, (result) => {
            const genre_ids = result.genre_ids;
            const genre_names = _.map(genre_ids, (genre_id) => {
                return genreIdToNameMapping[genre_id]
            }
            )
            result.genre_names = genre_names
            return result
        }
        )
    console.log(genreIdToNameMapping)
    return modifiedResultsList
}

export const populateKnownForMovies = (ActorList) => {
    const modifiedActorList =
        _.map(ActorList,
            (actor) => {
                const know_for_movies = actor.known_for
                const modified_know_for_movies = _.map(know_for_movies, (movie) => {
                    return movie.original_title
                })
                actor["known_for"] = modified_know_for_movies
                return actor
            }
        )
    console.log(modifiedActorList);
    return modifiedActorList
}

export default makeApiCallForSearch;
