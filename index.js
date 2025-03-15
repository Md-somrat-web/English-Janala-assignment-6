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
    <button onclick="card" class="btn border-[#422AD5] text-[#422AD5] p-7">${element.lessonName}</button>
    
    `;
    buttonContainer.appendChild(div);
  });
};

const loadData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/level/5"
  );
  const data = await response.json();
  displayShow(data.data);
};

const displayShow = (card) => {
  const cardContainer = document.getElementById("card-container");
  card.forEach((card) => {
    console.log(card);
    const showCard = document.createElement("div");
    showCard.innerHTML = `

 
  
    
    
    `;
    cardContainer.append(showCard);
  });
};
loadData();
loadCategory();
