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

  console.log("data", response.data.data);

  const firstGif = response.data.data;
  if (!firstGif || firstGif.length === 0) return;

  const randomGif = Math.floor(Math.random() * firstGif.length);
  return firstGif[randomGif].images.fixed_width.url;
}

function appendGif(url) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("gif-div");

  gifArea.style.display = "flex";
  removeBtn.style.display = "block";

  const newImg = document.createElement("img");
  newImg.src = url;
  newImg.alt = "gif";
  newImg.style.width = "200px";
  newImg.style.height = "200px";
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

  removeBtn.disabled = false;

  userInput.value = "";
});
removeBtn.addEventListener("click", function () {
  gifArea.innerHTML = "";
  removeBtn.disabled = true;
  removeBtn.style.display = "none";
  gifArea.style.display = "none";
});
