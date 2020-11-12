import {constructUrlWithParams,movieComparator,populateGenres,populateKnownForMovies} from "../utils/utils"
import {MOVIE_SEARCH_URL} from "../constants"

describe("construct url with params", () => {
    test("when params are empty", () => {
      expect(constructUrlWithParams(MOVIE_SEARCH_URL,{})).toBe(MOVIE_SEARCH_URL+"?");
    });
    test("when params are not empty", () => {
        expect(constructUrlWithParams(MOVIE_SEARCH_URL,{
            laguage : "en-US"
        })).toBe(MOVIE_SEARCH_URL+"?laguage=en-US")
      });
    test("when params are not empty and search query doesn't include any spaces", () => {
    expect(constructUrlWithParams(MOVIE_SEARCH_URL,{
        laguage : "en-US",
        query : "khan"
    })).toBe(MOVIE_SEARCH_URL+"?laguage=en-US&query=khan")
    });
    test("when params are not empty and search query  include any spaces", () => {
        expect(constructUrlWithParams(MOVIE_SEARCH_URL,{
            laguage : "en-US",
            query : "sharukh khan"
        })).toBe(MOVIE_SEARCH_URL+"?laguage=en-US&query=sharukh+khan")
        });
  });


describe("movie comparator : checks if two movies are equal",() => 
  {
    test("when movies are different", () => {
        expect(movieComparator({id : 1},{id: 2})).toBe(false);
      });
      test("when movies are same", () => {
        expect(movieComparator({id : 1},{id: 1})).toBe(true);
      });
      test("when movie name is same , but ids are differnet", () => {
        expect(movieComparator({id : 1,name: "hum aapke hai kaun"},{id: 2,name :"dilwale"})).toBe(false);
      });
  });



describe("populate genres",() => 
{
  test("when genre map is empty", () => {
   var movieList = [{
        id : 1 ,
        genres : [1,2]
    }];
    var genreMap = {}
    expect(populateGenres(
        movieList,
        genreMap

      )).toStrictEqual([{"genre_names": [], "genres": [1, 2], "id": 1}]);
    });
    
    test("when genre map is not empty", () => {
        var movieList = [{
             id : 1 ,
             genre_ids : [1,2]
         }];
         var genreMap = {1 : "action",2:"comedy"}
         expect(populateGenres(
             movieList,
             genreMap
     
           )).toStrictEqual([{
            id : 1 ,
            genre_ids : [1,2],
            genre_names : ["action","comedy"]
        }]);
         });
         
        test("when genre map doesn't contain entry for one of the keys", () => {
        var movieList = [{
                id : 1 ,
                genre_ids : [1,2]
            }];
            var genreMap = {2:"comedy"}
            expect(populateGenres(
                movieList,
                genreMap
        
            )).toStrictEqual([{
            id : 1 ,
            genre_ids : [1,2],
            genre_names : ["comedy"]
        }]);
        });
        
});



describe("populate genres",() => 
{
  test("when known for list is empty", () => {
   var actorList = [{
        id : 1 ,
        known_for : []
    }];
    expect(populateKnownForMovies(
        actorList,
    
      )).toStrictEqual([{
          id : 1,
          known_for : []
      }]);
    });

    test("when known for list is not empty", () => {
        var actorList = [{
             id : 1 ,
             known_for : [{
                 id : 1 ,
                 original_title : "narina"
             }]
         }];
         expect(populateKnownForMovies(
             actorList,
         
           )).toStrictEqual([{
               id : 1,
               known_for : ["narina"]
           }]);
         });

         test("when known title of the movie is not present", () => {
            var actorList = [{
                 id : 1 ,
                 known_for : [{
                     id : 1 
                 }]
             }];
             expect(populateKnownForMovies(
                 actorList,
             
               )).toStrictEqual([{
                   id : 1,
                   known_for : []
               }]);
             });
});

