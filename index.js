// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"; // assigned variable
const userInput = document.querySelector("#input");
const gifArea = document.querySelector("#gifArea");
const form = document.querySelector("#form");
const removeBtn = document.querySelector("#remove");

async function getGif(gifSearch) {
  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      q: gifSearch,
      api_key: giphyApiKey,
      limit: 25,
    },
  });

  const firstGif = response.data.data;
  if (!firstGif || firstGif.length === 0) return;

  const randomGif = Math.floor(Math.random() * firstGif.length);
  return firstGif[randomGif].images.fixed_height.url;
}

function appendGif(url) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("gif-div");

  const newImg = document.createElement("img");
  newImg.src = url;
  newImg.alt = "gif";
  newDiv.appendChild(newImg);
  gifArea.appendChild(newDiv);
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const gifSearch = userInput.value.trim();
  if (!gifSearch) return;

  const gifUrl = await getGif(gifSearch);
  if (!gifUrl) return;

  appendGif(gifUrl);

  userInput.value = ""; // resets the search bar ;)
});

removeBtn.addEventListener("click", function () {
  gifArea.innerHTML = "";
});

// Having trouble keeping the gif contained in the div space. tried keeping them in with css but no luck. I think the gif sizes are working against me.
