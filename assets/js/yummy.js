/*  ----------------------------------------------  start Global   --------------------------------- */
("use Strict");
AOS.init({ duration: 2000 });
/*  ----------------------------------------------  End Global  --------------------------------- */
/*  ----------------------------------------------  Start Navbar  --------------------------------- */

let offsetLeftValue = $(".nav-icons").offset().left;
$(".sidebar").animate({ left: -offsetLeftValue }, 500, function () {
  $(".search").animate({ paddingTop: "70px" });
  $(".category").animate({ paddingTop: "70px" });
  $(".area").animate({ paddingTop: "70px" });
  $(".ingredient").animate({ paddingTop: "70px" });
  $(".contact").animate({ paddingTop: "70px" });
});
$("#burger").click(function () {
  let sideBarValueLeft = $(".sidebar").css("left");
  if (sideBarValueLeft === "0px") {
    $(".sidebar").animate({ left: -offsetLeftValue }, 700, function () {
      $(".search").animate({ paddingTop: "70px" });
      $(".category").animate({ paddingTop: "70px" });
      $(".area").animate({ paddingTop: "70px" });
      $(".ingredient").animate({ paddingTop: "70px" });
      $(".contact").animate({ paddingTop: "70px" });
    });
  } else {
    $(".sidebar").animate({ left: "0px" }, 700, function () {
      $(".search").animate({ paddingTop: "25px" }, { duration: 300 });
      $(".category").animate({ paddingTop: "25px" }, { duration: 400 });
      $(".area").animate({ paddingTop: "25px" }, { duration: 600 });
      $(".ingredient").animate({ paddingTop: "25px" }, { duration: 700 });
      $(".contact").animate({ paddingTop: "25px" }, { duration: 1000 });
    });
  }
});

/*  ----------------------------------------------  End Navbar  --------------------------------- */
/*  ----------------------------------------------  End Global  --------------------------------- */
/*  ----------------------------------------------  start Loading  --------------------------------- */

// $("document").ready(function () {
//   $(".glitch").fadeOut(700, function () {
//     $(".loading").fadeOut(300);
//     $("body").css("overflow", "auto");
//   });
// });
/*  ----------------------------------------------  End Loading --------------------------------- */

// // Show Section By The Anchor
// $(".menu-lists a[href^='#']").click(function (e) {
//   let sectionToShow = $(e.target).attr("href");

//   $("section").addClass("d-none");
//   $(sectionToShow).removeClass("d-none");
// });
// // $(".loader").addClass("d-none");

// btnIcon.addEventListener("click", function () {
//   menuSidebar.classList.toggle("toggle-translateX");
//   if (!menuSidebar.classList.contains("toggle-translateX")) {
//     listOfLisMenu.forEach((ele) => {
//       ele.style = `top: 0`;
//     });
//   } else {
//     listOfLisMenu.forEach((ele) => {
//       ele.style = `top: 200px`;
//     });
//   }
// });

/* --------------------------------------------------------  Start Main Section  --------------------------------------------------------  */
window.addEventListener("load", function () {
  fetchApiData();
  $(".loader").addClass("d-none");
});

// Fetch Api Data
async function fetchApiData() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    let result = await response.json();
    // console.log(result);
    let call = $(".data-meals");
    showDataMeals(result.meals, call);

    $("#notfound").addClass("d-none");
  } catch {
    $("#notfound").removeClass("d-none");
  }
}

// Show Data Meals
function showDataMeals(myData, call) {
  let containerData = "";
  myData.forEach((element) => {
    containerData += `
    <div class="col">
      <div class="card-container" onclick="fetchSingleMeal('${element.strMeal}')">
        <div class="image">
          <img src="${element.strMealThumb}" loading="lazy" class="w-100" alt="${element.strMeal}" />
        </div>
        <div class="capture-image">
          <p>${element.strMeal}</p>
        </div>
      </div>
    </div>
    `;
  });
  $(call).html(containerData);
}

// Fetch Single Meal
async function fetchSingleMeal(eleName) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${eleName}`
    );
    let result = await response.json();
    // console.log();
    let call = $(".data-meals");
    DisplaySingleMeal(result.meals, call);
    $("#notfound").addClass("d-none");
  } catch {
    $("#notfound").removeClass("d-none");
  }
}

// Show Single Meal
function DisplaySingleMeal(mySingleData, caller) {
  let containerSingleMeal = "";
  mySingleData.forEach((ele) => {
    containerSingleMeal += `
            <div class="col-12 col-sm-12 col-md-4 p-3">
      <div class="image-single-details-ingredient">
        <div class="imgage rounded-3">
          <img
            src="${ele.strMealThumb}"
            class="w-100 d-block rounded-4"
            loading="lazy"
            alt=""
          />
        </div>
        <h2 class="my-4 fs-2 fw-semibold text-capitalize">
          ${ele.strMeal}
        </h2>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-md-8 p-3">
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
  $(caller).html(containerSingleMeal);
}
/* --------------------------------------------------------  End Main Section  --------------------------------------------------------  */
/* --------------------------------------------------------  Start Search Section  --------------------------------------------------------  */
// Fetch Data By Input Name
$('input[placeholder="Search By Name"]').keyup(function () {
  let searchByName = $(this).val();
  // console.log(searchByName);
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByName}`;
  $(".loader").removeClass("d-none");
  fetchData(url);
  $(".loader").addClass("d-none");
});

// Fetch Data By First Letter input
$('input[placeholder="Search By First Letter"]').keyup(function () {
  let searchByFirstLetter = $(this).val();
  // console.log(searchByFirstLetter);
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByFirstLetter}`;

  $(".loader").removeClass("d-none");
  fetchData(url);
  $(".loader").addClass("d-none");
});

// Fetch Data Api For Search === Global Function
async function fetchData(url) {
  try {
    let response = await fetch(url);
    let result = await response.json();
    console.log(result);

    // let collerSearch = $(".data-of-search");
    // showData(result.meals, collerSearch);

    $("#notfound").addClass("d-none");
    $(".data-of-search").removeClass("d-none");
  } catch {
    $(".data-of-search").addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
}
/* --------------------------------------------------------  End Search Section  --------------------------------------------------------  */
/* --------------------------------------------------------  Start Category Section  --------------------------------------------------------  */
async function fetchDataCategory() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let result = await response.json();
    showDataOfCategory(result.categories);
    $("#notfound").addClass("d-none");
    $(".data-of-category").removeClass("d-none");
  } catch {
    $(".data-of-category").addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
}
// Show Data Of Category
function showDataOfCategory(myData) {
  let containerShowDataCategory = "";
  myData.forEach((element) => {
    containerShowDataCategory += `
    <div class="col">
      <div class="content-category" onclick="fetchFilterCategory('${element.strCategory}')">
        <div class="image">
          <img
            src="${element.strCategoryThumb}"
            loading="lazy"
            class="w-100 d-block"
            alt="${element.strCategory}"
          />
          <div class="capture-category">
            <h4>${element.strCategory}</h4>
            <p>
              ${element.strCategoryDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
      `;
  });

  $(".data-of-category").html(containerShowDataCategory);
}

// Fetch Filter Data Of Category
async function fetchFilterCategory(eleName) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${eleName}`
    );
    let result = await response.json();
    console.log(result);
    showDataFilterCat(result.meals);

    $("#notfound").addClass("d-none");
    $(".data-of-category").removeClass("d-none");
  } catch {
    $(".data-of-category").addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
}
// Show Filter Data Category
function showDataFilterCat(myData) {
  let containerShowData = "";
  myData.forEach((element) => {
    containerShowData += `
    <div class="col">
      <div class="card-container" onclick="fetchSingleDataOfCat('${element.strMeal}')">
        <div class="image">
          <img src="${element.strMealThumb}" loading="lazy" class="w-100" alt="" />
        </div>
        <div class="capture-image">
          <p>${element.strMeal}</p>
        </div>
      </div>
    </div>
    `;
  });
  $(".data-of-category").html(containerShowData);
}
// Fetch Single Data Of Category
async function fetchSingleDataOfCat(eleName) {
  console.log(eleName);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${eleName}`
    );
    let result = await response.json();
    // console.log(result.meals);
    showSingleMealDataCat(result.meals);
    $("#notfound").addClass("d-none");
    $(".data-of-category").removeClass("d-none");
  } catch {
    $(".data-of-category").addClass("d-none");
    $("#notfound").removeClass("d-none");
  }
}

// Show Single Data Of Catagory
function showSingleMealDataCat(mySingleData) {
  let containerSingleData = "";
  mySingleData.forEach((ele) => {
    containerSingleData += `
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
        <h2 class="my-4 fs-2 fw-semibold text-capitalize">
          ${ele.strMeal}
        </h2>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-md-8 p-3">
      <div class="content-single-details-ingredient text-white">
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
  $(".data-of-category").html(containerSingleData);
}
/* --------------------------------------------------------  End Category Section  --------------------------------------------------------  */
/* --------------------------------------------------------  Start Area Section  --------------------------------------------------------  */
async function fetchDataArea() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let result = await response.json();
    // console.log(result.meals);
    showDataArea(result.meals);
  } catch {}
}
// Show Data Of Area
function showDataArea(myAreaData) {
  // console.log(myAreaData);
  let containerAreaData = "";
  myAreaData.forEach((element) => {
    containerAreaData += `
    <div class="col">
      <div class="content-area" onclick="fetchMealsOfArea('${element.strArea}')">
        <span><i class="fa-solid fa-house-laptop"></i></span>
        <h4>${element.strArea}</h4>
      </div>
    </div>
    `;
  });
  $(".data-of-area").html(containerAreaData);
}

// Fetch Meals Data Of Area
async function fetchMealsOfArea(eleName) {
  // console.log(eleName);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${eleName}`
    );
    let result = await response.json();
    // console.log(result.meals);
    showDataOfArea(result.meals);
    $("#notfound").addClass("d-none");
    $(".data-of-area").removeClass("d-none");
  } catch {
    $("#notfound").removeClass("d-none");
    $(".data-of-area").addClass("d-none");
  }
}
// Show Meals Data Of Area
function showDataOfArea(myData) {
  let containerShowData = "";
  myData.forEach((element) => {
    containerShowData += `
    <div class="col">
      <div class="card-container" onclick="fetchSingleDataOfArea('${element.strMeal}')">
        <div class="image">
          <img src="${element.strMealThumb}" loading="lazy" class="w-100" alt="" />
        </div>
        <div class="capture-image">
          <p>${element.strMeal}</p>
        </div>
      </div>
    </div>
    `;
  });

  $(".data-of-area").html(containerShowData);
}

// Fetch Single Data Of Area
async function fetchSingleDataOfArea(eleName) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${eleName}`
    );
    let result = await response.json();
    // console.log(result);
    showSingleMealDataArea(result.meals);
    $("#notfound").addClass("d-none");
    $(".data-of-area").removeClass("d-none");
  } catch {
    $("#notfound").removeClass("d-none");
    $(".data-of-area").addClass("d-none");
  }
}

// Show Single Data Of Area
function showSingleMealDataArea(mySingleData) {
  let containerSingleData = "";
  mySingleData.forEach((ele) => {
    containerSingleData += `
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
        <h2 class="my-4 fs-2 fw-semibold text-capitalize">
          ${ele.strMeal}
        </h2>
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
  $(".data-of-area").html(containerSingleData);
}
/* --------------------------------------------------------  End Area Section  --------------------------------------------------------  */
/* --------------------------------------------------------  Start Ingredient Section  --------------------------------------------------------  */
// Fetch Ingredient Of Data
async function fetchDataIngredient() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let result = await response.json();
    ShowDataIngredient(result.meals);
    $(".data-of-ingredients").removeClass("d-none");
    $("#notfound").addClass("d-none");
  } catch {
    $("#notfound").removeClass("d-none");
    $(".data-of-ingredients").addClass("d-none");
  }
}

// Show Data Of Ingredient
function ShowDataIngredient(myData) {
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
  $(".data-of-ingredients").html(containerShowData);
}

// Fetch Meals Data Of Ingredients
async function fetchMealsDataIngredient(eleName) {
  // console.log(eleName);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${eleName}`
    );
    let result = await response.json();
    // console.log(result.meals);
    showMealsDataIngedient(result.meals);
    $(".data-of-ingredients").removeClass("d-none");
    $("#notfound").addClass("d-none");
  } catch {
    $("#notfound").removeClass("d-none");
    $(".data-of-ingredients").addClass("d-none");
  }
}

// Show Meals Data Of Ingredients
function showMealsDataIngedient(myData) {
  let containerShowData = "";
  myData.forEach((element) => {
    containerShowData += `
    <div class="col">
      <div class="card-container" onclick="fetchSingleDataOfIngredient('${element.strMeal}')">
        <div class="image">
          <img src="${element.strMealThumb}" loading="lazy" class="w-100" alt="${element.strMeal}" />
        </div>
        <div class="capture-image">
          <p>${element.strMeal}</p>
        </div>
      </div>
    </div>
      `;
  });
  $(".data-of-ingredients").html(containerShowData);
}

// Fetch Single Data Of ingredient
async function fetchSingleDataOfIngredient(eleName) {
  // console.log(eleName);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${eleName}`
    );
    let result = await response.json();
    // console.log(result.meals);
    showSingleMealDataIngredient(result.meals);
    $(".data-of-ingredients").removeClass("d-none");
    $("#notfound").addClass("d-none");
  } catch {
    $("#notfound").removeClass("d-none");
    $(".data-of-ingredients").addClass("d-none");
  }
}
// Show Single Data Of ingredient
function showSingleMealDataIngredient(mySingleData) {
  let containerSingleData = "";
  mySingleData.forEach((ele) => {
    containerSingleData += `
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
        <h2 class="my-4 fs-2 fw-semibold text-capitalize">
          ${ele.strMeal}
        </h2>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-md-8 p-3">
      <div class="content-single-details-ingredient text-white">
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
  $(".data-of-ingredients").html(containerSingleData);
}
/* --------------------------------------------------------  End Ingredient Section  --------------------------------------------------------  */
/* --------------------------------------------------------  Start Contact Section  --------------------------------------------------------  */

// Validation Input Name
function validationName() {
  let inputName = document.querySelector("#fullName");
  let regName = /^[a-zA-Z]{3,}(0-9)*/;

  if (regName.test(inputName.value)) {
    inputName.style = `border: 2px solid green`;
    $(".name-error").addClass("d-none");
    return true;
  } else {
    $(".name-error").removeClass("d-none");
    inputName.style = `border: 2px solid red`;
    return false;
  }
}
document.querySelector("#fullName").addEventListener("input", function () {
  validationName();
});

// Validation Input Email
function validationEmail() {
  let inputEmail = document.querySelector("#email");
  let regEmail = /^[a-zA-Z0-9]*@[a-zA-Z]{2,}[\.][a-z]{2,4}$/;

  if (regEmail.test(inputEmail.value)) {
    inputEmail.style = `border: 2px solid green`;
    $(".email-error").addClass("d-none");
    return true;
  } else {
    $(".email-error").removeClass("d-none");
    inputEmail.style = `border: 2px solid red`;
    return false;
  }
}
document.querySelector("#email").addEventListener("input", function () {
  validationEmail();
});

// Validation Input Phone
function validationPhone() {
  let inputPhone = document.querySelector("#tel");
  let regPhone = /^(01)(0|1|2|5)[0-9]{8}$/;

  if (regPhone.test(inputPhone.value)) {
    inputPhone.style = `border: 2px solid green`;
    $(".phone-error").addClass("d-none");
    return true;
  } else {
    $(".phone-error").removeClass("d-none");
    inputPhone.style = `border: 2px solid red`;
    return false;
  }
}
document.querySelector("#tel").addEventListener("input", function () {
  validationPhone();
});

// Validation Input Age
function validationAge() {
  let inputAge = document.querySelector("#age");
  let regAge = /[1-9]{1,}/;

  if (regAge.test(inputAge.value)) {
    inputAge.style = `border: 2px solid green`;
    $(".age-error").addClass("d-none");
    return true;
  } else {
    $(".age-error").removeClass("d-none");
    inputAge.style = `border: 2px solid red`;
    return false;
  }
}
document.querySelector("#age").addEventListener("input", function () {
  validationAge();
});

// Validation Input Password
let inputPassword;
function validationPassword() {
  inputPassword = document.querySelector("#password");
  let regPassword =
    /^(?=.*[0-9])(?=.*[^a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  if (regPassword.test(inputPassword.value)) {
    inputPassword.style = `border: 2px solid green`;
    $(".password-error").addClass("d-none");
    return true;
  } else {
    $(".password-error").removeClass("d-none");
    inputPassword.style = `border: 2px solid red`;
    return false;
  }
}
document.querySelector("#password").addEventListener("input", function () {
  validationPassword();
});

// Validation Re Password
function validationRePassword() {
  let repassword = document.querySelector("#repassword");
  if (repassword.value === inputPassword.value) {
    // console.log("yes");
    repassword.style = `border: 2px solid green`;
    $(".repassword-error").addClass("d-none");
    return true;
  } else {
    repassword.style = `border: 2px solid red`;
    $(".repassword-error").removeClass("d-none");
    // console.log("No");
    return false;
  }
}
document.querySelector("#repassword").addEventListener("input", function () {
  validationRePassword();
  validationRePassword();
  checkVisibleButton();
});

// Validation Button To Visible Or Not
function checkVisibleButton() {
  if (
    validationName() &&
    validationEmail() &&
    validationPhone() &&
    validationAge() &&
    validationPassword() &&
    validationRePassword()
  ) {
    // console.log("Done");
    $(".toggle-button").removeClass("disabled");
  } else {
    // console.log("error");
    $(".toggle-button").addClass("disabled");
  }
}

/* --------------------------------------------------------  End Contact Section  --------------------------------------------------------  */

// Display Data
// function showData(myData, coller) {
//   let contanerShowData = "";
//   console.log(coller);
//   myData.forEach((element) => {
//     contanerShowData += `
//     <div class="col">
//       <div class="card-container" onclick="FetchSingleMealData('${element.strMeal}')">
//         <div class="image">
//           <img src="${element.strMealThumb}" loading="lazy" class="w-100" alt="" />
//         </div>
//         <div class="capture-image">
//           <p>${element.strMeal}</p>
//         </div>
//       </div>
//     </div>
//     `;
//   });
//   $(coller).html(contanerShowData);
// }

// Fetch Data For Single Details of Meal
async function FetchSingleMealData(eleName, collerIn) {
  console.log(eleName);
  console.log(collerIn);
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${eleName}`
    );
    let result = await response.json();
    console.log(result);
    showSingleMealData(result.meals);
  } catch {}
}

// Show Single Data Of Meal
// function showSingleMealData(mySingleData, caller) {
//   let containerSingleData = "";
//   mySingleData.forEach((ele) => {
//     containerSingleData += `
//       <div class="col-12 col-sm-12 col-md-4 p-3">
//       <div class="image-single-details-ingredient">
//         <div class="imgage rounded-3">
//           <img
//             src="${ele.strMealThumb}"
//             class="w-100 d-block rounded-4"
//             loading="lazy"
//             alt=""
//           />
//         </div>
//         <h2 class="my-4 fs-2 fw-semibold text-capitalize">
//           ${ele.strMeal}
//         </h2>
//       </div>
//     </div>
//     <div class="col-12 col-sm-12 col-md-8 p-3">
//       <div class="content-single-details-ingredient">
//         <h3 class="fw-bold text-capitalize">Instructions</h3>
//         <p class="my-3 ps-2">
//           ${ele.strInstructions}
//         </p>
//         <h3 class="my-3 text-capitalize">
//           <span class="fw-semibold">Area</span> : ${ele.strArea}
//         </h3>
//         <h3 class="my-3 text-capitalize">
//           <span class="fw-semibold">Category </span> : ${ele.strCategory}
//         </h3>
//         <div>
//           <h3 class="my-3 fw-semibold">Recipes :</h3>
//           <ul class="list-unstyled d-flex flex-wrap">
// <li class="m-1 p-2 rounded">${ele.strMeasure1} ${ele.strIngredient1}</li>
// <li class="m-1 p-2 rounded">${ele.strMeasure2} ${ele.strIngredient2}</li>
// <li class="m-1 p-2 rounded">${ele.strMeasure3} ${ele.strIngredient3}</li>
// <li class="m-1 p-2 rounded">${ele.strMeasure4} ${ele.strIngredient4}</li>
// <li class="m-1 p-2 rounded">${ele.strMeasure5} ${ele.strIngredient5}</li>
// <li class="m-1 p-2 rounded">${ele.strMeasure6} ${ele.strIngredient6}</li>
// <li class="m-1 p-2 rounded">${ele.strMeasure7} ${ele.strIngredient7}</li>
// <li class="m-1 p-2 rounded">${ele.strMeasure8} ${ele.strIngredient8}</li>
// <li class="m-1 p-2 rounded">${ele.strMeasure9} ${ele.strIngredient9}</li>
// <li class="m-1 p-2 rounded">${ele.strMeasure10} ${ele.strIngredient10}</li>
//           </ul>
//         </div>
//         <div>
//           <h3 class="my-3 text-capitalize fw-semibold">Tags :</h3>
//           <div class="ms-5">
//             <a target="_blank" href="${ele.strSource}"
//               ><button class="btn btn-success">source</button></a
//             >
//             <a target="_blank" href="${ele.strYoutube}">
//               <button class="btn btn-danger">youtube</button>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//     `;
//   });
//   $(caller).html(containerSingleData);
// }
