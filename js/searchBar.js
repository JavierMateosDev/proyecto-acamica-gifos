// No Results Search

let noResultsSearch = document.getElementById ('noResultsSearch');
noResultsSearch.style.display = "none";

// Search Results

hideSearchInactive();

function searchResults() {
    hideSearchInactive();
    
    let inputText = document.getElementById("searchInput").value;
    let urlSearchEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=${offset}&q=${inputText}`;


}





