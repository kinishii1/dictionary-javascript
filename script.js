const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.querySelector("#sound");
const btn = document.querySelector(".search-btn");

btn.addEventListener('click', () => {
  let inputWords = document.querySelector('input').value;
  fetch(`${url}${inputWords}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      result.innerHTML = `
      <div class="title">
        <h1>${inputWords}</h1>
        <button onclick="playSound()">
          <i class="fas fa-volume-up"></i>
        </button>
      </div>
      <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
      <p class="definition">${data[0].meanings[0].definitions[0].definition}</p>
      <p class="exemple">${data[0].meanings[0].definitions[0].example || ""}</p>
     </div>
      `
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch((err) => {
      console.log(err);
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`
    })
})

function playSound() {
  sound.play();
}