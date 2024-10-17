document.querySelector('.search-tag').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'search.html';
});

document.querySelector('.categories-tag').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'categories.html';
});

document.querySelector('.area-tag').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'area.html';
});

document.querySelector('.ingredients-tag').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'ingredients.html';
});

document.querySelector('.contact-tag').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'contact.html';
});



$('.bars').on('click', function () {
    if ($(this).hasClass('fa-bars')) {
        $('.sidebar').animate({ width: 'toggle' }, 500);
        $('.sidebar-extend').animate({ left: '20%' }, 500);
        $(this).removeClass('fa-bars').addClass('fa-xmark');
    } else {
        $('.sidebar').animate({ width: 'toggle' }, 500);
        $('.sidebar-extend').animate({ left: '0' }, 500);
        $(this).removeClass('fa-xmark').addClass('fa-bars');
    }
});


let homeArray = [];


$(function () {
    async function homeData() {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        let finalData = await response.json();

        homeArray = finalData.meals;
        console.log(homeArray);
        


        displayHomeData();
        $('.sk-chase').fadeOut(1000, function () {
            $('.loading').slideUp(1000, function () {
                $('body').css('overflow', 'auto');
            });
        });
    }

    function displayHomeData() {
        let box = '';

        for (let i = 0; i < homeArray.length; i++) {
            box += `
            <div class="col-md-3">
                <div class="inner-item position-relative overflow-hidden" onclick="navigateToDetails(${homeArray[i].idMeal})">
                    <img src="${homeArray[i].strMealThumb}" class="w-100" alt="${homeArray[i].strMeal}">
                    <div class="item-layer w-100 h-100 position-absolute">
                        <h3>${homeArray[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            `;
        }

        document.getElementById('demo').innerHTML = box;
    }

    homeData();
});


function navigateToDetails(mealId) {
    localStorage.setItem('selectedMealId', mealId);
    window.location.href = 'details.html';
}


async function displayMealDetails() {
    const mealId = localStorage.getItem('selectedMealId');
    if (!mealId) {
        console.error('No meal ID found.');
        return;
    }

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let finalData = await response.json();
        const meal = finalData.meals[0];

        document.querySelector('.container img').src = meal.strMealThumb;
        document.querySelector('.container img').alt = meal.strMeal;
        document.querySelector('.container h3').textContent = meal.strMeal;
        document.querySelector('.container p').textContent = meal.strInstructions;
        document.querySelector('.container .area').textContent = `Area: ${meal.strArea}`;
        document.querySelector('.container .category').textContent = `Category: ${meal.strCategory}`;

        
        const recipeContainer = document.querySelector('.recipes');
        recipeContainer.innerHTML = ''; 

        for (let i = 1; i <= 7; i++) {
            let measure = meal[`strMeasure${i}`];
            if (measure && measure.trim() !== '') {
                recipeContainer.innerHTML += `
                <div class="col-md-2">
                    <h5 class="border border-2 rounded-2 p-1">${measure}</h5>
                </div>
                `;
            }
        }


        document.querySelector('.tags .btn-success').onclick = () => window.open(meal.strSource, '_blank');
        document.querySelector('.tags .btn-danger').onclick = () => window.open(meal.strYoutube, '_blank');

    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}


if (window.location.pathname.includes('details.html')) {
    displayMealDetails();
}


let foodNamesArray = [];

async function namesData(foodName) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
        let finalData = await response.json();

        foodNamesArray = finalData.meals;

        displayNamesData();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function searchByFirstLetter(letter) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let finalData = await response.json();

        foodNamesArray = finalData.meals;

        displayNamesData();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayNamesData() {
    let box = '';

    if (foodNamesArray && foodNamesArray.length > 0) {
        for (let i = 0; i < foodNamesArray.length; i++) {
            box += `
            <div class="col-md-3">
                <div class="inner-item position-relative overflow-hidden" onclick="navigateToDetails(${foodNamesArray[i].idMeal})">
                    <img src="${foodNamesArray[i].strMealThumb}" class="w-100" alt="${foodNamesArray[i].strMeal}">
                    <div class="item-layer w-100 h-100 position-absolute">
                        <h3>${foodNamesArray[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            `;
        }
    } else {
        box = `<p class="text-white">No results found</p>`;
    }

    document.getElementById('names').innerHTML = box;
}

document.querySelector('.name-search').addEventListener('keyup', function () {
    let searchTerm = this.value.trim();

    if (searchTerm.length > 0) {
        namesData(searchTerm);
    } else {
        document.getElementById('names').innerHTML = ''; 
    }
});

document.querySelector('.letter-search').addEventListener('keyup', function () {
    let searchLetter = this.value.trim();

    if (searchLetter.length === 1) {
        searchByFirstLetter(searchLetter);
    } else {
        document.getElementById('names').innerHTML = ''; 
    }
});









