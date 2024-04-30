/* -------------------------------------------  Start Global  -------------------------------------------------------- */
("use Strict");
$("a[href^='#']").click(function (e) {
  //   console.log(e.target);
  let getSectionAttr = $(e.target).attr("href");
  //   console.log(getSectionAttr);
  //   $("section").addClass("d-none");
  $(".loader").fadeIn(300);
  $(getSectionAttr).removeClass("d-none");
  $(".loader").fadeOut(300);
  $(".sidebar").animate({ left: -offsetLeftValue }, 500);
});
/* -------------------------------------------  End Global  -------------------------------------------------------- */
/* -------------------------------------------  Start navBar  -------------------------------------------------------- */
let offsetLeftValue = $(".nav-icons").offset().left;
$(".sidebar").animate({ left: -offsetLeftValue }, 500, function () {
  $(".search").animate({
    paddingTop: "70px",
  });
  $(".category").animate({
    paddingTop: "70px",
  });
  $(".area").animate({
    paddingTop: "70px",
  });
  $(".ingredient").animate({
    paddingTop: "70px",
  });
  $(".contact").animate({
    paddingTop: "70px",
  });
});
$("#burger").click(function () {
  let sideBarValueLeft = $(".sidebar").css("left");
  if (sideBarValueLeft === "0px") {
    $(".sidebar").animate(
      {
        left: -offsetLeftValue,
      },
      700,
      function () {
        $(".search").animate({
          paddingTop: "70px",
        });
        $(".category").animate({
          paddingTop: "70px",
        });
        $(".area").animate({
          paddingTop: "70px",
        });
        $(".ingredient").animate({
          paddingTop: "70px",
        });
        $(".contact").animate({
          paddingTop: "70px",
        });
      }
    );
  } else {
    $(".sidebar").animate(
      {
        left: "0px",
      },
      700,
      function () {
        $(".search").animate(
          {
            paddingTop: "25px",
          },
          {
            duration: 300,
          }
        );
        $(".category").animate(
          {
            paddingTop: "25px",
          },
          {
            duration: 400,
          }
        );
        $(".area").animate(
          {
            paddingTop: "25px",
          },
          {
            duration: 600,
          }
        );
        $(".ingredient").animate(
          {
            paddingTop: "25px",
          },
          {
            duration: 700,
          }
        );
        $(".contact").animate(
          {
            paddingTop: "25px",
          },
          {
            duration: 1000,
          }
        );
      }
    );
  }
});

/* -------------------------------------------  End navBar  -------------------------------------------------------- */
/* -------------------------------------------  Start Main Section  -------------------------------------------------------- */
window.addEventListener("load", function () {
  $(".loader").fadeIn(400);
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  fetchDataMeals(url);
  $(".loader").fadeOut(400);
});

let dataMeals = $(".data-meals");
//  Fetch Data Meals
async function fetchDataMeals(url) {
  try {
    let response = await fetch(url);
    let result = await response.json();
    console.log(result);
    showDataMeals(result.meals);
    $("#notfound").addClass("d-none");
    $(dataMeals).removeClass("d-none");
  } catch {
    $(dataMeals).addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
}

// Show Data Meals
function showDataMeals(myData) {
  $(dataMeals).html("");

  $("#contactSection").addClass("d-none");

  $(dataMeals).addClass("row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4");

  let contianerShowData = "";
  myData.forEach((element) => {
    contianerShowData += `
   <div class="col">
      <div class="content-section rounded" onclick="fetchSingleMeal('${element.idMeal}')">
         <div class="image">
            <img
            src="${element.strMealThumb}"
            loading="lazy"
            class="d-block w-100 rounded"
            alt="${element.strArea}"
            />
         </div>
         <div class="capture-section rounded d-flex align-items-center">
            <h3>${element.strMeal}</h3>
         </div>
      </div>
      </div>
      `;
  });

  $(dataMeals).html(contianerShowData);
}

// Fetch single Data Meals
async function fetchSingleMeal(idMeal) {
  //   console.log(idMeal);
  $(".loader").fadeIn(400);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    let result = await response.json();
    //  console.log(result.meals);
    showSingleDataMeal(result.meals);
    $("#notfound").addClass("d-none");
  } catch {
    $("#notfound").removeClass("d-none");
  }
  $(".loader").fadeOut(400);
}

// Show Single Data Meals
function showSingleDataMeal(mySingleData) {
  $(dataMeals).html("");
  $("#searchContainer").html("");
  $("#contactSection").addClass("d-none");

  $(dataMeals).removeClass(
    "row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
  );
  let containerSingleMeal = "";
  mySingleData.forEach((ele) => {
    containerSingleMeal += `
         <div class="col-12 col-sm-12 col-md-4 p-3 text-white">
         <div class="image-single-details-ingredient">
         <div class="imgage rounded-3">
         <img
         src="${ele.strMealThumb}"
         class="w-100 d-block rounded-4"
         loading="lazy"
         alt=""
         />
         </div>
         <i class="my-4 fs-2 fw-semibold text-capitalize">
         ${ele.strMeal}
         </i></h2>
         </div>
         </div>
         <div class="col-12 col-sm-12 col-md-8 p-3 text-white">
         <div class="content-single-details-ingredient">
         <h3 class="fw-bold text-capitalize">Instructions</h3>
         <p class="my-3 ps-2">
         ${ele.strInstructions}
         </p>
         <h3 class="my-3 text-capitalize">
         <span class="fw-semibold">Area</span> : ${ele.strArea}
         </h3>
         <h3 class="my-3 text-capitalize">
         <span class="fw-semibold">Category </span> : ${ele.strCategory}
         </h3>
         <div>
         <h3 class="my-3 fw-semibold">Recipes :</h3>
         <ul class="list-unstyled d-flex flex-wrap">
         <li class="m-1 p-2 rounded">${ele.strMeasure1} ${ele.strIngredient1}</li>
         <li class="m-1 p-2 rounded">${ele.strMeasure2} ${ele.strIngredient2}</li>
         <li class="m-1 p-2 rounded">${ele.strMeasure3} ${ele.strIngredient3}</li>
         <li class="m-1 p-2 rounded">${ele.strMeasure4} ${ele.strIngredient4}</li>
         <li class="m-1 p-2 rounded">${ele.strMeasure5} ${ele.strIngredient5}</li>
         <li class="m-1 p-2 rounded">${ele.strMeasure6} ${ele.strIngredient6}</li>
         <li class="m-1 p-2 rounded">${ele.strMeasure7} ${ele.strIngredient7}</li>
         <li class="m-1 p-2 rounded">${ele.strMeasure8} ${ele.strIngredient8}</li>
         <li class="m-1 p-2 rounded">${ele.strMeasure9} ${ele.strIngredient9}</li>
         <li class="m-1 p-2 rounded">${ele.strMeasure10} ${ele.strIngredient10}</li>
         </ul>
         </div>
         <div>
         <h3 class="my-3 text-capitalize fw-semibold">Tags :</h3>
         <div class="ms-5">
         <a target="_blank" href="${ele.strSource}"
         ><button class="btn btn-success">source</button></a
         >
         <a target="_blank" href="${ele.strYoutube}">
         <button class="btn btn-danger">youtube</button>
         </a>
         </div>
         </div>
         </div>
         </div>
      `;
  });
  $(dataMeals).html(containerSingleMeal);
}
/* -------------------------------------------  End Main Section  -------------------------------------------------------- */
/* -------------------------------------------  Start Search Section  -------------------------------------------------------- */

function getSectionInputs() {
  dataMeals.html("");
  $("#contactSection").addClass("d-none");

  $(dataMeals).addClass("row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4");

  let continerSearch = `
   <div class="row row-cols-1 row-cols-sm-2 content-search">
      <div class="">
           <input
            oninput="searchByName(this)"
             type="text"
             class="form-control text-light bg-transparent border-1"
             placeholder="Search By Name"
           />
      </div>
      <div class="">
           <input
            oninput="searchByFirstLetter(this)"
             maxlength="1"
             type="text"
             class="form-control text-light bg-transparent border-1"
             placeholder="Search By First Letter"
           />
      </div>
   </div>
   `;
  $("#searchContainer").html(continerSearch);
}

// Fetch Data By Input Name
function searchByName(ele) {
  let searchByName = ele.value;
  console.log(searchByName);
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByName}`;
  fetchDataMeals(url);
}
// Fetch Data By Input First Letter
function searchByFirstLetter(ele) {
  let searchByFirstLetter = ele.value;
  //   console.log(searchByFirstLetter);
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByFirstLetter}`;
  fetchDataMeals(url);
}
/* -------------------------------------------  End Search Section  -------------------------------------------------------- */
/* -------------------------------------------  Start Category Section  -------------------------------------------------------- */
// Fetch Data Of Category
async function fetchDataCategory() {
  $(".loader").fadeIn(400);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let result = await response.json();
    //  console.log(result.categories);
    showSeactionCategory(result.categories);
    $("#notfound").addClass("d-none");
    $(dataMeals).removeClass("d-none");
  } catch {
    $(dataMeals).addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
  $(".loader").fadeout(400);
}
// Show Data Category
function showSeactionCategory(myDatCat) {
  $("#searchContainer").html("");
  $("#contactSection").addClass("d-none");

  $(dataMeals).addClass("row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4");

  let containerShowDataCategory = "";
  myDatCat.forEach((element) => {
    containerShowDataCategory += `
    <div class="col">
      <div class="content-category rounded" onclick="fetchFilterCategory('${
        element.strCategory
      }')">
        <div class="image">
          <img
            src="${element.strCategoryThumb}"
            loading="lazy"
            class="w-100 d-block rounded-2"
            alt="${element.strCategory}"
          />
          <div class="capture-category rounded-2">
            <h4>${element.strCategory}</h4>
            <p>
              ${element.strCategoryDescription
                ?.split(" ")
                .splice(0, 15)
                .join(" ")}
            </p>
          </div>
        </div>
      </div>
    </div>
      `;
  });
  $(dataMeals).html(containerShowDataCategory);
}

// Fetch Filter Category Data
async function fetchFilterCategory(catgryDep) {
  $(".loader").fadeIn(400);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catgryDep}`
    );
    let result = await response.json();
    //  console.log(result.meals);
    showDataMeals(result.meals);
    $("#notfound").addClass("d-none");
    $(dataMeals).removeClass("d-none");
  } catch {
    $(dataMeals).addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
  $(".loader").fadeOut(400);
}

/* -------------------------------------------  End Category Section  -------------------------------------------------------- */
/* -------------------------------------------  Start Area Section  -------------------------------------------------------- */
// Fetch Data Of Area
async function fetchDataArea() {
  $(".loader").fadeIn(400);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let result = await response.json();
    //  console.log(result.meals);
    showDataArea(result.meals);
    $("#notfound").addClass("d-none");
    $(dataMeals).removeClass("d-none");
  } catch {
    $(dataMeals).addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
  $(".loader").fadeOut(400);
}

// Show Data Of Area
function showDataArea(myAreaData) {
  // console.log(myAreaData);
  $("#contactSection").addClass("d-none");

  $("#searchContainer").html("");
  $(dataMeals).html("");
  $(dataMeals).addClass("row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4");
  let containerAreaData = "";
  myAreaData.forEach((element) => {
    containerAreaData += `
    <div class="col">
      <div class="content-area text-white text-center fs-2 " onclick="fetchMealsOfArea('${element.strArea}')">
        <span><i class="fs-1 fa-solid fa-house-laptop"></i></span>
        <h4>${element.strArea}</h4>
      </div>
    </div>
    `;
  });
  $(dataMeals).html(containerAreaData);
}

// Fetch Data Of Meals Area
async function fetchMealsOfArea(areaName) {
  //   console.log(areaName);
  $(".loader").fadeIn(400);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
    );
    let result = await response.json();
    showDataMeals(result.meals);
    $("#notfound").addClass("d-none");
    $(dataMeals).removeClass("d-none");
  } catch {
    $(dataMeals).addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
  $(".loader").fadeOut(400);
}

/* -------------------------------------------  End Area Section  -------------------------------------------------------- */
/* -------------------------------------------  Start ingredient Section  -------------------------------------------------------- */
// fetch Data Ingredient
async function fetchDataIngredient() {
  $(".loader").fadeIn(400);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let result = await response.json();
    //  console.log(result.meals);
    showDataIngredient(result.meals);
    $("#notfound").addClass("d-none");
    $(dataMeals).removeClass("d-none");
  } catch {
    $(dataMeals).addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
  $(".loader").fadeOut(400);
}

// Show Data Of Ingredient
function showDataIngredient(myData) {
  $(dataMeals).html("");
  $("#searchContainer").html("");
  $("#contactSection").addClass("d-none");
  $(dataMeals).addClass("row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4");

  let containerShowData = "";
  for (let i = 0; i < 20; i++) {
    containerShowData += `
    <div class="col">
      <div onclick="fetchMealsDataIngredient('${
        myData[i].strIngredient
      }')" class="content-ingredient text-center text-white">
        <span><i class="fs-1 fa-solid fa-drumstick-bite"></i></span>
        <h3 class="text-capitalize">${myData[i].strIngredient}</h3>
        <p class="fs-6">
          ${
            // The optional operator ? will call the split() method if the data variable is not equal to undefined or null
            myData[i].strDescription?.split(" ").splice(0, 20).join(" ")
          }
        </p>
      </div>
    </div>
    `;
  }
  $(dataMeals).html(containerShowData);
}

// fetchMealsDataIngredient
async function fetchMealsDataIngredient(ingredineName) {
  //   console.log(ingredineName);
  $(".loader").fadeIn(400);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredineName}`
    );
    let result = await response.json();
    //  console.log(result.meals);
    showDataMeals(result.meals);
    $("#notfound").addClass("d-none");
    $(dataMeals).removeClass("d-none");
  } catch {
    $(dataMeals).addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
  $(".loader").fadeOut(400);
}
/* -------------------------------------------  End Ingredient Section  -------------------------------------------------------- */
/* -------------------------------------------  Start Contact Section  -------------------------------------------------------- */
// Get Cantact Section
function sectionContact() {
  $(dataMeals).html("");
  $("#searchContainer").html("");
  $("#contactSection").removeClass("d-none");
}

// Create Reg
let regName = /^[a-zA-Z]{3,}(0-9)*/;
let regEmail = /^[a-zA-Z0-9]*@[a-zA-Z]{2,}[\.][a-z]{2,4}$/;
let regPhone = /^(01)(0|1|2|5)[0-9]{8}$/;
let regAge = /[1-9]{1,}/;
let regPassword =
  /^(?=.*[0-9])(?=.*[^a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
// Validation Inputs
function validInputs(ele, reg) {
  let next = ele.nextElementSibling;
  //   console.log(reg);
  //   console.log(ele.value);

  if (reg.test(ele.value)) {
    ele.style = `border: 2px solid green`;
    $(next).addClass("d-none");
    return true;
  } else {
    $(next).removeClass("d-none");
    ele.style = `border: 2px solid red`;
    return false;
  }
}

// Validation Password
let valuePass = "";
function validPassword(ele, regPassword) {
  let next = ele.nextElementSibling;
  valuePass = ele.value;
  if (regPassword.test(ele.value)) {
    ele.style = "border: 2px solid green";
    $(next).addClass("d-none");
    return true;
  } else {
    ele.style = "border: 2px solid red";
    $(next).removeClass("d-none");
    return false;
  }
}

// Validaton Repassword
document.querySelector("#repassword").addEventListener("input", function () {
  let this_ = this;
  rePassword(this_);
  changeVisibleButton();
});

function rePassword(ele) {
  let next = ele.nextElementSibling;
  //   console.log(ele.value);
  //   console.log(valuePass);
  if (ele.value === valuePass) {
    ele.style = "border: 2px solid green";
    $(next).addClass("d-none");
    return true;
  } else {
    ele.style = "border: 2px solid red";
    $(next).removeClass("d-none");
    return false;
  }
}

// Change Button Visible
async function changeVisibleButton() {
  let inputName = document.querySelector("#fullName");
  let inputemail = document.querySelector("#email");
  let inputPhone = document.querySelector("#tel");
  let inputAge = document.querySelector("#age");
  let inputPass = document.querySelector("#password");
  let inputRePass = document.querySelector("#repassword");

  if (
    validInputs(inputName, regName) &&
    validInputs(inputemail, regEmail) &&
    validInputs(inputPhone, regPhone) &&
    validInputs(inputAge, regAge) &&
    validPassword(inputPass, regPassword) &&
    rePassword(inputRePass)
  ) {
    //  console.log("yes");
    $(".toggle-button").removeClass("disabled");
  } else {
    //  console.log("false");
    $(".toggle-button").addClass("disabled");
  }
}

/* -------------------------------------------  End Contact Section  -------------------------------------------------------- */
