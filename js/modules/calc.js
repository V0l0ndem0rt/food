function calc() {
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);

    }

    function initLocalSetting(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element) => {
            element.classList.remove(activeClass);

            const getLocal = (id, local) => {
                if (element.getAttribute(id) === localStorage.getItem(local)) {
                    element.classList.add(activeClass);
                }
            }
            getLocal('id', 'sex');
            getLocal('data-ratio', 'ratio');


            // if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')){
            //     element.classList.add(activeClass);

            // }
        })
    }

    initLocalSetting('#gender div', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        // Проверка на пустые ячейки
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'Пусто';
            return;
        }

        // Проверка  Ж М
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        };
    }
    calcTotal();

    function getStaticInformations(selector, activeClass) {
        // Получаем все дивы на котрые будем выбирать
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio)
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex)
                }

                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                })

                e.target.classList.add(activeClass);
                calcTotal();
            })
        })

    }

    getStaticInformations('#gender div', 'calculating__choose-item_active');
    getStaticInformations('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformations(element) {
        const input = document.querySelector(element);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';

            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;

            }
            calcTotal();
        })

    }
    getDynamicInformations('#height');
    getDynamicInformations('#weight');
    getDynamicInformations('#age');


}

export default calc;
