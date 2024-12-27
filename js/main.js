/* Nav icon */
const navBtn = document.querySelector('.nav-icon-btn');
const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.header__top-row');

navBtn.onclick = function () {
    navIcon.classList.toggle('nav-icon--active');
    nav.classList.toggle('header__top-row--mobile');
    document.body.classList.toggle('no-scroll');
}

/* Phone Mask */
mask('[data-tel-input]');

// Удаляем '+' если больше ничего не введено, чтобы показать placeholder
const phoneInputs = document.querySelectorAll('[data-tel-input]');
phoneInputs.forEach((input) => {
    input.addEventListener('input', () => {
        if (input.value == '+') input.value = '';
    });
    input.addEventListener('blur', () => {
        if (input.value == '+' || input.value == "") {
            input.value = '';
        }
    });
});

// Валидация формы
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ctaForm');
    const inputs = form.querySelectorAll('.form__input');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращаем отправку формы
        let isValid = true;
        let errors = [];

        inputs.forEach(input => {
            removeError(input); // удаляем ошибку из под поля (если она есть)
        });

        inputs.forEach(input => {
            if (!input.value.trim()) {
                 errors.push(`Поле "${input.placeholder}" является обязательным`);
                isValid = false;
            }
        });

        if(isValid){
            const emailInput = form.querySelector('input[name="email"]');
             if(!validateEmail(emailInput)) {
                errors.push('Введите корректный email');
                isValid = false;
            }
        }

        if (!isValid) {
             alert(errors.join('\n')); // Показываем все ошибки через alert
             console.log(errors);
         } else {
            // Если валидация прошла успешно, можно отправить форму
            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const phone = form.querySelector('input[name="phone"]').value;
             alert(`Форма отправлена! \nИмя: ${name} \nEmail: ${email} \nТелефон: ${phone}`);
            console.log('Форма отправлена!');
             form.reset(); // очищаем все поля формы
            //form.submit();
        }
    });


    function validateEmail(input) {
        const value = input.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    }

    function showError(input, message) {
         input.classList.add('error');
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || errorDiv.className !== 'error-message') {
            errorDiv = document.createElement('p');
            errorDiv.classList.add('error-message');
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
        errorDiv.textContent = message;
    }
     function removeError(input) {
         input.classList.remove('error');
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.className === 'error-message') {
            errorDiv.remove();
        }
    }
});

/* Yandex Map */

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
	// Создание карты.
	var map = new ymaps.Map('map', {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [56.78689181552279,60.46977891414215],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 17,
	});

	var myPlacemark = new ymaps.Placemark(
		[56.78689181552279,60.46977891414215],
		{
			balloonContent: `
				<div class="balloon">
					<div class="balloon__address">пос. Мичуринский, пер. Терновый 8</div>
					<div class="balloon__contacts">
						<a href="tel:+78121234567">+7 (999) 129 32-63</a>
					</div>
				</div>
			`,
		},
		{
			iconLayout: 'default#image',
			iconImageHref: './img/map/location-pin.svg',
			iconImageSize: [40, 40],
			iconImageOffset: [-20, -40],
		}
	);

	map.controls.remove('geolocationControl'); // удаляем геолокацию
	map.controls.remove('searchControl'); // удаляем поиск
	map.controls.remove('trafficControl'); // удаляем контроль трафика
	map.controls.remove('typeSelector'); // удаляем тип

	// map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	// map.controls.remove('zoomControl'); // удаляем контрол зуммирования
	map.controls.remove('rulerControl'); // удаляем контрол правил
	map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

	map.geoObjects.add(myPlacemark);
    myPlacemark.balloon.open();

}