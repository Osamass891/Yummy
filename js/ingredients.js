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



let ingredientsArray = [];
async function ingredientsData() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let finalData = await response.json();

    ingredientsArray = finalData.meals;
    console.log(ingredientsArray);
    displayIngredientsData()
}


function displayIngredientsData() {
    let box = '';

    for (let i = 0; i < ingredientsArray.length-560; i++) {
        let description = ingredientsArray[i].strDescription?.split(' ').slice(0, 20).join(' ') || '';

        box += `
        <div class="col-md-3 text-white">
            <div class="ingredient-inner text-center">
                <i class="fa-solid fa-drumstick-bite fs-1"></i>
                <h3>${ingredientsArray[i].strIngredient}</h3>
                <p>${description}...</p>
            </div>
        </div>`;
    }

    document.getElementById('ingredient').innerHTML = box;
}



ingredientsData()

