var movie_search = (function($) {

    'use strict';

    /* Movie Search

    Author: Mason Embry
    Created 10/13/2016
    Last Updated: 10/13/2016

    Tested in current versions of Chrome, Safari, and Firefox.

    */

    var SEARCH_RESULTS;

    /* Display search results using JSON object as argument. */
    function displaySearchResults() {
        $('#movies').empty();

        if (SEARCH_RESULTS.Response === "True") {
            var resultsArray = SEARCH_RESULTS.Search;
            var resultHTML = '';

            for (var i = 0; i < resultsArray.length; i++) {
                resultHTML = '';
                resultHTML += '<li id=array-member-' + i + '>';
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
        } else {
            var noMoviesHTML = '<li class="no-movies">';
            noMoviesHTML += '<i class="material-icons icon-help">';
            noMoviesHTML += 'help_outline</i>No movies found that match: "';
            noMoviesHTML += $('#search').val();
            noMoviesHTML += '" and "';
            noMoviesHTML += $('#year').val();
            noMoviesHTML += '".';
            noMoviesHTML += '</li>';
            $('#movies').html(noMoviesHTML);
        }
    }

    /* Create a description page that references a member of the
    SEARCH_RESULTS.Search array. Takes the id of the clicked item
    as an argument and converts it to an array index. */
    function createDescriptionPage(idOfClicked) {
        var arrayIndex = idOfClicked.match(/\d+/)[0];
        var clickedObject = SEARCH_RESULTS.Search[arrayIndex];

        var url = 'http://www.omdbapi.com/';
        var data = {
            i: clickedObject.imdbID,
            plot: 'full'
        };
        var callback = function(movie) {
            if (movie.Poster !== "N/A") {
                $('.poster-div').html('<img class="desc-poster-image" src="' + movie.Poster + '">');
            } else {
                $('.poster-div').html('<i class="material-icons desc-poster-placeholder">crop_original</i>');
            }

            $('#desc-movie-name').text(movie.Title + ' (' + movie.Year + ')');
            $('#desc-movie-rating').text('IMDB Rating: ' + movie.imdbRating);
            $('#desc-plot').text(movie.Plot);
            $('#imdb-link').attr("href", 'http://www.imdb.com/title/' + movie.imdbID);
        };

        $.get(url, data, callback);
        $('#description-page').toggle('slide', {
            direction: 'right'
        }, 500);

    }

    function removeDescriptionPage() {
        $('#description-page').toggle('slide', {
            direction: 'right'
        }, 500);
    }

    /* Search OMDb. Take title and year as arguments.
    On success, assign returned JSON object to SEARCH_RESULTS and
    call displaySearchResults(). */
    function search(searchTitle, searchYear) {
        var url = 'http://www.omdbapi.com/';
        var data = {
            s: searchTitle,
            y: searchYear
        };
        var callback = function(data) {
            SEARCH_RESULTS = data;
            displaySearchResults();
        };

        $.get(url, data, callback);
    }

    /* Read the input fields.
    Return array with value of searchTitle input and searchYear input. */
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

    /* Handler for submit fields. */
    $('.search-form').submit(function(e) {
        e.preventDefault();
        performSearch();
    });

    /* Handler for movie li's. Call createDescriptionPage, passing in
    the clicked item's id as an argument. */
    $('#movies').on("click", "li", function() {
        createDescriptionPage($(this).attr("id"));
    });

    $('body').on("click", "#back-to-search", function() {
        removeDescriptionPage();
    });

})(jQuery);
