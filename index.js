const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
  );
  const data = await response.json();
  showCategory(data.data);
};

const showCategory = (data) => {
  data.forEach((element) => {
    const buttonContainer = document.getElementById("button-container");
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="loadLevel(${element.level_no})" class="btn border-[#422AD5] text-[#422AD5] p-7 level-btn">${element.lessonName}</button> `;
    buttonContainer.appendChild(div);
  });
};

const loadLevel = async (level_no) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/level/${level_no}`
  );
  const data = await response.json();
  displayShow(data.data);
};

const displayShow = (cards) => {
  const cardContainer = document.getElementById("card-container");
  const noWord = document.getElementById("no-word");
  const defaultDiv = document.getElementById("defult");

  if (cards.length > 0) {
    defaultDiv.style.display = "none";
  }

  if (cards.length > 1) {
    cardContainer.style.display = "grid";
    noWord.style.display = "none";
  } else {
    cardContainer.style.display = "none";
    noWord.style.display = "block";
  }
  cardContainer.innerHTML = "";
  cards.forEach((item) => {
    const showCard = document.createElement("div");
    showCard.innerHTML = `
   <div class="bg-white rounded-xl p-14">
            <div class="space-y-6 text-center">
              <p class="text-3xl font-bold"> ${item.word}</p>
              <p class="text-xl font-medium">Meaning /Pronounciation</p>
              <p class="text-3xl font-semibold text-[#18181B]">
              ${item.meaning} / ${item.pronunciation} 
              </p>
            </div>
            <div class="flex mt-14 justify-between">
              <button onclick="my_modal_1.showModal(); loadWord(${item.id})" class="btn bg-[#1A91FF]/10 p-4 rounded-lg">
                <i class="fa-solid fa-circle-exclamation"></i>
              </button>
              <button class="bg-[#1A91FF]/10 p-4 rounded-lg">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
    `;
    cardContainer.append(showCard);
  });

  const allButtons = document.getElementsByClassName("level-btn");
  if (allButtons.length > 0) {
    for (let button of allButtons) {
      button.addEventListener("click", (event) => {
        for (let btn of allButtons) {
          btn.classList.remove("active");
        }
        event.target.classList.add("active");
      });
    }
  }
};

const loadWord = async (word_no) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/word/${word_no}`
  );
  const data = await response.json();
  displayModal(data.data);
};

const displayModal = (info) => {
  const modal = document.getElementById("my_modal_1");
  modal.innerHTML = "";
  const modalBox = document.createElement("div");
  modalBox.classList.add("modal-box");

  modalBox.innerHTML = ` 
           <h3 class="text-4xl font-bold">
      ${info?.word}   ( <i class="fa-solid fa-headphones"></i> : ${
    info?.pronunciation
  })
      </h3>

      <p class="text-2xl font-semibold mt-8 mb-2">Meaning</p>
      <p class="text-2xl font-medium"> ${info?.meaning}  </p>

      <p class="text-2xl font-semibold mt-8 mb-2">Example</p>
      <p class="text-2xl ">
      ${info?.sentence} 
      </p>

      <p class="text-2xl font-semibold mt-8 mb-4">সমার্থক শব্দ গুলো</p> 
<div id="tags">
 ${info?.synonyms
   ?.map(
     (item) => `
        <span class="bg-[#EDF7FF] border-[#D7E4EF] px-5 py-3 rounded-md me-3">
          ${item}
        </span>
      `
   )
   .join("")}
  </div>
    

        <div class="modal-action">
          <form method="dialog">
            <button class="btn bg-[#422AD5] text-white rounded-lg p-5">
        Complete Learning
      </button>
          </form>
        </div>
     
  `;
  modal.appendChild(modalBox);
};

displayModal();
loadLevel();
loadCategory();
