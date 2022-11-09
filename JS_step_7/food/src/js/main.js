window.addEventListener('DOMContentLoaded', () => {

    //TABS
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    //default value 0 if nothing is passed to the function
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    //click event handler using delegation
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        //for simplify

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //TIMER

    const deadline = '2022-12-31';

    //difference beetween curent time and deadline
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            //calculate how many milliseconds in a day
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            //how many hours are left of the day
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            //how many minutes are left of the hour
            minutes = Math.floor((t / 1000 / 60) % 60);
            //how many seconds are left of the hour
            seconds = Math.floor((t / 1000) % 60);
        }
        //return an object
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    //set clock
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);//run function updateClock() every 1 second

        updateClock(); //so that the timer does not blink

        //update clock
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days); // from return object in getTimeRemaining(endtime)
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            //when deadline is the end
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        };
    };
    setClock('.timer', deadline);


    // MODAL

    const openBtns = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); //clean timer after first time user see modal automatically
    };


    openBtns.forEach((item) => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    //event for key on keyboard

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // after 5s modal opens automatically
    const modalTimerId = setTimeout(openModal, 50000);

    //when user scroll down to the end - modal opens - only one time
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);

    //cards for menu block
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 65;
            this.changeToRub();
        }

        changeToRub() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div> 
                                `;
            this.parent.append(element);
        }
    };

    const getResource = async (url) => {
        let res = await fetch(url)
        //получаем ответ от сервера
        //обработаем как json формат
        if(!res.ok){//если в запросе что-то пошло нет так
            throw new Error(`Could not fetch ${url}, status ${res.status}`)//создаем обьект ошибки и выкидываем с помощью throw
        }
        return await res.json(); //возращаем промис

    };
    
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();//будет создавать столько раз сколько есть в db.json    
            });//перебираем массив так как у нас массив с обьектами в db.json

        }); //придет обычный обьект и мы можем его уже использовать

    //Forms
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    }); //bind a function to each form

    const postData = async (url, data) => {
        let res = await fetch(url, { //посылает запрос на сервер
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        //получаем ответ от сервера
        //обработаем как json формат
        return await res.json(); //возращаем промис

    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading; //created an image and inserted src
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `
            //add svg to the end of the form 
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            //entries - превратить обьект в массив с массивами
            //fromEntries - превращает в обьект
            //JSON.stringify - превращает в json
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {//processing if there is an error
                showThanksModal(message.failure);
            }).finally(() => {//actions that are always performed - clearing the form
                form.reset();
            })

        });

    };

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
            </div>
            `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    };

    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

    //SLIDER - option 1
    const nextSlide = document.querySelector('.offer__slider-next');
    const prevSlide = document.querySelector('.offer__slider-prev');
    const currentSlide = document.querySelector('#current');
    const totalSlide = document.querySelector('#total');
    const imageSlide = document.querySelectorAll('.offer__slide');
    let slideIndex  = 1;

    showSlides(slideIndex);

    if (imageSlide.length < 10) {
        totalSlide.textContent = `0${imageSlide.length}`;
    }else{
        totalSlide.textContent = imageSlide.length;
    }

    function showSlides(n){
        if (n > imageSlide.length) {
            slideIndex  = 1;
        }
        
        if (n < 1) {
            slideIndex  = imageSlide.length;
        }

        imageSlide.forEach(item => {
            item.style.display = 'none';
        }); 

        imageSlide[slideIndex - 1].style.display = 'block';

        if (imageSlide.length < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        }else{
            currentSlide.textContent = slideIndex;
        }
    }
    

    function plusSlides(n){
        showSlides(slideIndex += n);
    }

    prevSlide.addEventListener('click', () => {
        plusSlides(-1);
    });

    nextSlide.addEventListener('click', () => {
        plusSlides(1);
    });

});