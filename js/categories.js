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


let catArray = [];
async function categoriesData() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let catFinalData = await response.json();
    
    catArray = catFinalData.categories;
    console.log(catArray);
    
    displayCatsData();
}

function displayCatsData() {
    let box = '';

    for (let i = 0; i < catArray.length; i++) {
        box += `
        <div class="col-md-3">
            <div class="inner-item position-relative overflow-hidden" onclick="navigateToCategory('${catArray[i].strCategory}')">
                <img src="${catArray[i].strCategoryThumb}" class="w-100">
                <div class="item-layer w-100 h-100 position-absolute">
                    <h3>${catArray[i].strCategory}</h3>
                    <p>${catArray[i].strCategoryDescription}</p>
                </div>
            </div>
        </div>
        `;
    }

    document.getElementById('cats').innerHTML = box;
}


function navigateToCategory(categoryName) {
    localStorage.setItem('selectedCategory', categoryName);
    window.location.href = 'innerCat.html';
}


categoriesData();


let innerArray = [];
async function fetchCategoryMeals() {
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (!selectedCategory) {
        console.error('No category selected.');
        return;
    }

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
        let finalData = await response.json();
        innerArray = finalData.meals;

        displayCategoryMeals();
    } catch (error) {
        console.error('Error fetching category meals:', error);
    }
}

function displayCategoryMeals() {
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
        </div>
        `;
    }

    document.getElementById('cats').innerHTML = box;
}


if (window.location.pathname.includes('innerCat.html')) {
    fetchCategoryMeals();
}

