// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const cardCont = document.querySelector(".cards-container");

axios
  .get("https://lambda-times-api.herokuapp.com/articles")
  .then((incomData) => {
    const newData = incomData.data.articles;
    console.log(newData);

    for (const item in newData) {
      newData[item].forEach((arrItem) => {
        cardCont.appendChild(
          CardMaker({
            incHeadline: arrItem.headline,
            incAuthor: arrItem.authorName,
            incIMG: arrItem.authorPhoto,
          })
        );
      });
    }
  })
  .catch((err) => {
    console.log("Error", err);
  });

function CardMaker({ incHeadline, incAuthor, incIMG }) {
  const card = document.createElement("div");
  const headline = document.createElement("div");
  const author = document.createElement("div");
  const imgCont = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(imgCont);
  author.appendChild(span);
  imgCont.appendChild(img);

  card.classList.add("card");
  headline.classList.add("headline");
  author.classList.add("author");
  imgCont.classList.add("img-container");

  headline.textContent = incHeadline;
  span.textContent = incAuthor;
  img.src = incIMG;

  card.addEventListener("click", () => {
    console.log(incHeadline);
  });

  return card;
}
