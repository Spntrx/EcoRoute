//PAGE FOR LOADING FUNCTIONS OF MAIN PAGE

async function submitSearch() {
  //clear field and grab text
  let searchText = $("#destination-search-field").val();
  $("#destination-search-field").val("");
  const locations = await processSearch(searchText);

  let choices = locations.items;

  if (choices.length === 0) {
    ///No matches found, present to user
    console.log('No matches found')
    return
  } else if (choices.length === 1) {
    choice = choices[0];
  } else {
    //HARDCODING CHOICE FOR NOW
    //We could either present a modal or choose based on location
    displayOptionsModal(choices, 'destination')
    return
  }
  saveToSession("destination", choice);
  //Location is saved, we can move to next page
  window.location = "./query.html"
}


//What runs on load
instantiateMap();

$("#destination-search-button").click(function (event) {
  event.preventDefault();
  submitSearch();
});

$("#destination-search-field").on("keypress", function (event) {
  if (event.which === 13) {
    event.preventDefault();
    submitSearch();
  }
});