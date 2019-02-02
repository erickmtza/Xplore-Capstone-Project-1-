'use strict';

function matchedCountries(responseJson) {
    $('.country-opt-dis').on('click', 'input', function() {
        const chosenCountry = $(this).val();
        $('.country-options').addClass('hidden');

        const countryIndex = $(this).attr('id');

        $('#result-data').append(
            `
            <img class="country-flag" src="${responseJson[countryIndex].flag}" alt="${responseJson[countryIndex].name}">
            <h2>${responseJson[countryIndex].name}, ${responseJson[countryIndex].subregion}</h2>
            `
        );
        getYouTubeVideos(chosenCountry);
    })
}

function displayCountryData(responseJson) {

    $('#result-data').empty();
    $('#results').removeClass('hidden');
    $('#js-error-message').empty();
    

    if ( responseJson.length > 1 ) {
        console.log(responseJson);
        $('.country-options').removeClass('hidden');
        
        for (let i = 0; i < responseJson.length; i++) {
            $('.country-opt-dis').append(
                `<label for="${i}">${responseJson[i].name}</label>

                <input type="radio" name="option" id="${i}" value="${responseJson[i].name}" required>`
            )
        }
        matchedCountries(responseJson);

    } else {
        console.log(responseJson);
        $('#result-data').append(
        `
        <img class="country-flag" src="${responseJson[0].flag}" alt="${responseJson[0].name}">
        <h2>${responseJson[0].name}, ${responseJson[0].subregion}</h2>
        `
    )}
}

function countryData(country) {

    const url = `https://restcountries.eu/rest/v2/name/${country}`;

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => {
        if (responseJson.length == 1 ) {
            getYouTubeVideos(country);
        }
        displayCountryData(responseJson)})
    .catch(error => {
        $('#result-data').empty();
        console.log(error);
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
    })
}

$(function searchFetch() {
    $('form').submit( event => {
        event.preventDefault();

        const country = $('#country-destination').val();

        countryData(country);
    })
})