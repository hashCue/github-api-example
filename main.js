'use strict'

function displayResults(response) {
    console.log("Displaying results")
    response.forEach(repo => {
        $('.results').append(`<a href="${repo.svn_url}"><p>${repo.name}</p></a>`)
    });

}

function getRepositories(handle) {
    const url = `https://api.github.com/users/${handle}/repos`;
    console.log("Fetching user repositories")
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log("GET successful")
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert(`Error! User ${error.message}`));
}

function watchForm() {
    $('form').submit(event => {
        const handle = $('#handle').val();
        event.preventDefault();
        $('.results').empty();
        getRepositories(handle);
    })
}

$(watchForm);