// No Results Search

let noResultsSearch = document.getElementById ('noResultsSearch');
noResultsSearch.style.display = "none";

//Hide unnecesary elements while inactive

hideSearchInactive();

// Search Results

function searchResults() {
    hideSearchInactive();
    
    let inputText = document.getElementById("searchInput").value;
    let urlSearchEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=${offset}&q=${inputText}`;

    //Fetch and draw results
    
    fetchSearchGifs(urlSearchEndpoint).then((gifs) => {
        if (gifs.length > 0) {
          console.log(gifs);
          gifsLoop(gifs);
        } else if (gifs.length === 0) {
          console.log(gifs);
          //Show no results page
          trendingTitle.style.display = "block";
          trendingText.style.display = "block";
          noResultsOnSearch.style.display = "block";
          searchResultsGifs.style.display = "none";
          btnSeeMore.style.display = "none";
        }
      });

}

//Fetch API

async function fetchSearchGifs(url) {
    let response = await fetch(url);
    let content = await response.json();
    let gifs = content.data;
  
    return gifs;
  }
  

// Draw resulting Gifs 

function gifsLoop(gifs) {
    for (let i = 0; i < gifs.length; i++) {
      let div = document.createElement("div");
      let img = document.createElement("img");
  
      img.src = gifs[i].images.downsized.url;
      img.alt = gifs[i].title;
  
      div.classList.add("gif-container");
  
      // Hover on gifs event listeners
      div.addEventListener("mouseenter", () => drawHoverGif(gifs, i, div));
      div.addEventListener("mouseleave", () => removeHoverGif(div));
  
      div.appendChild(img);
      searchResultsGifs.appendChild(div);
    }
  }

// Hide and Show Items

function hideAndShowElements() {
  // Hide in desktop and show in mobile trending topics
  hideTrendingText();

  // Clean grid search results
  searchResultsGifs.innerHTML = "";

  // Show grid
  showSearchActive();
}

// Hide in desktop and show in mobile trending title and topics
function hideTrendingText() {
  if (window.matchMedia("(min-width: 960px)").matches) {
    /* The screen has at least 960px of width */
    trendingTitle.style.display = "none";
    trendingText.style.display = "none";
  } else {
    /* The screen has less than 960px of width */
    trendingTitle.style.display = "block";
    trendingText.style.display = "block";
  }
}

// Hide items while search is inactive
function hideSearchInactive() {
  divider.style.display = "none";
  titleSearchResult.style.display = "none";
  searchResultsGifs.style.display = "none";
  btnSeeMore.style.display = "none";
}

// Show items while search is active
function showSearchActive() {
  divider.style.display = "block";
  titleSearchResult.style.display = "block";
  searchResultsGifs.style.display = "grid";
  btnSeeMore.style.display = "flex";
}

// Search Title on Grid

function changeTitleSearchResults(inputText) {
  titleSearchResult.innerHTML = inputText;
}

