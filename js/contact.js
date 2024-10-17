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


let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
let userPhone = document.getElementById('userPhone');
let userAge = document.getElementById('userAge');
let userPassword = document.getElementById('userPassword');
let userRepassword = document.getElementById('userRepassword');





function inputValidation(term) {
    var regex = {
        userName: /^[a-zA-Z]{3,}$/, 
        userEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        userPhone: /^\d{10,15}$/, 
        userAge: /^(1[0-9]{1,2}|[1-9][0-9]?)$/, 
        userPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
        userRepassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ 
    };

    let allValid = true; 

    if (regex[term.id].test(term.value)) {
        term.classList.add('is-valid');
        term.classList.remove('is-invalid');
        term.nextElementSibling.classList.replace('d-block', 'd-none');
    } else {
        term.classList.remove('is-valid');
        term.classList.add('is-invalid');
        term.nextElementSibling.classList.replace('d-none', 'd-block');
        allValid = false; 
    }

    document.querySelectorAll('input').forEach(input => {
        if (!regex[input.id].test(input.value)) {
            allValid = false; 
        }
    });

    const submitButton = document.querySelector('button');
    if (allValid) {
        submitButton.classList.remove('disabled');
    } else {
        submitButton.classList.add('disabled');
    }
}

