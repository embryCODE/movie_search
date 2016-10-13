var movie_search = (function($) {

    'use strict';

    /* Movie Search

    Author: Mason Embry
    Created 10/13/2016
    Last Updated: 10/13/2016

    Tested in current versions of Chrome, Safari, and Firefox.

    */

    /* Display search results using JSON object as argument. */
    function displaySearchResults(searchResults) {
        $('#movies').empty();
        var resultsArray = searchResults.Search;

        var resultHTML = '';

        for (var i = 0; i < resultsArray.length; i++) {
            resultHTML = '';
            resultHTML += '<li>';
            resultHTML += '<div class="poster-wrap">';

            if (resultsArray[i].Poster !== "N/A") {
                resultHTML += '<img class="movie-poster" src="';
                resultHTML += resultsArray[i].Poster;
                resultHTML += '">';
            } else {
                resultHTML += '<i class="material-icons poster-placeholder">crop_original</i>';
            }
            resultHTML += '</div>';
            resultHTML += '<span class="movie-title">';
            resultHTML += resultsArray[i].Title;
            resultHTML += '</span>';
            resultHTML += '<span class="movie-year">';
            resultHTML += resultsArray[i].Year;
            resultHTML += '</span>';
            resultHTML += '</li>';

            $('#movies').append(resultHTML);
        }
    }

    /* Search OMDb. Take tag and year as arguments.
    Return JSON from server. */
    function search(searchTitle, searchYear) {
        var url = 'http://www.omdbapi.com/';
        var data = {
            s: searchTitle,
            y: searchYear
        };
        var callback = function(data) {
            displaySearchResults(data);
        };

        $.get(url, data, callback);
    }

    /* Read the input fields.
    Return array with values of searchTitle input and searchYear input. */
    function readInputFields() {
        var searchArray = [];
        searchArray[0] = $('#search').val();
        searchArray[1] = $('#year').val();
        return searchArray;
    }

    /* Call readInputFields and store in search array.
    Call search using data from search array. */
    function performSearch() {
        var searchArray = readInputFields();
        search(searchArray[0], searchArray[1]);
    }

    /* Expose a .search method for manually searching and displaying results. */
    return {
        search: function(searchTitle, searchYear) {
            search(searchTitle, searchYear);
        }
    };

})(jQuery);
