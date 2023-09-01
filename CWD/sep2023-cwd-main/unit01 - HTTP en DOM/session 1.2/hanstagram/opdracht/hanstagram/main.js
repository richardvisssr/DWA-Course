import "./style.css";

function $(query) {
  return document.querySelector(query);
}

const form = $("form");
const submit = $("#submit");
const photo = $("#photo");
const caption = $("#caption");
const posts = $("#posts");
const heart = $(".heart"); 

submit.classList.add("hide");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const photoInput = photo.value;
  const captionInput = caption.value;

  if (!validateForm(photoInput)){
  const article = maakPost(photoInput, captionInput);
  posts.innerHTML += article;
  clearField(); 
  }
});

heart.addEventListener("dblclick",(event) => {});
    ondblclick = (event) => {
        event.target.classList.add("liked");
    };


photo.addEventListener("input", laatKnopZien);
caption.addEventListener("input", laatKnopZien);

function clearField(){
    photo.value = "";
    caption.value = ""; 
}

function validateForm(url) {
    if (caption.value === "") {
        !alert("Please give a caption");
        return true
    } else if (photo.value === new URL(url)) {
        !alert("Please give valid URL");
        return true
    } else return false;
}


function laatKnopZien() {
  submit.classList.remove("hide");
}

function maakPost(url, cap) {
  return `<article class="post">
  <div class="avatar">
    <div>
      <img src="img/avatar.jpg" alt="avatar" />
    </div>
    <div>
      <h3>fritzvd</h3>
    </div>
  </div>
  <div class="image-post">
    <img src="${url}" alt="starry night" />
  </div>
  <div class="caption">
    <h3 class=""><span class="heart"></span>fritzvd</h3>
    <p class="pa1">${cap}</p>
  </div>
</article>`;
}