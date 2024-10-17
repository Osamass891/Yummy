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


let areasArray = [];
async function areaData() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let finalData = await response.json();

    areasArray = finalData.meals;
    console.log(areasArray);
    displayAreasData();
}

function displayAreasData() {
    let box = '';
    for (let i = 0; i < areasArray.length; i++) {
        box += `
        <div class="col-md-3 text-white">
            <div class="area-inner text-center fs-1" onclick="navigateToArea('${areasArray[i].strArea}')">
                <i class="fa-solid fa-house-laptop"></i>
                <h3>${areasArray[i].strArea}</h3>
            </div>
        </div>`;
    }

    document.getElementById('area').innerHTML = box;
}


function navigateToArea(areaName) {
    localStorage.setItem('selectedArea', areaName);
    window.location.href = 'innerAreas.html';
}


areaData();


let innerArray = [];
async function fetchAreaMeals() {
    const selectedArea = localStorage.getItem('selectedArea');
    if (!selectedArea) {
        console.error('No area selected.');
        return;
    }

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`);
        let finalData = await response.json();
        innerArray = finalData.meals;

        displayAreaMeals();
    } catch (error) {
        console.error('Error fetching area meals:', error);
    }
}

function displayAreaMeals() {
    let box = '';

    for (let i = 0; i < innerArray.length; i++) {
        box += `
        <div class="col-md-3">
            <div class="inner-item position-relative overflow-hidden">
                <img src="${innerArray[i].strMealThumb}" class="w-100" alt="${innerArray[i].strMeal}">
                <div class="item-layer w-100 h-100 position-absolute">
                    <h3>${innerArray[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
    }

    document.getElementById('area').innerHTML = box;
}

if (window.location.pathname.includes('innerAreas.html')) {
    fetchAreaMeals();
}
