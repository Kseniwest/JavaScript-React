/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';


document.addEventListener('DOMContentLoaded', () => { //дожидаемся построения только DOM структуры

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adImage = document.querySelectorAll('.promo__adv img');
    const promoImg = document.querySelector('.promo__bg');
    const promoGenre = promoImg.querySelector('.promo__genre');
    const movieList = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('form.add');
    const addInput = document.querySelector('.adding__input');
    const checkBox = document.querySelector('[type="checkbox"]');


    addForm.addEventListener('submit', (event) => {
        event.preventDefault(); //отменили стандартное поведение браузера

        let newFilm = addInput.value; //в св-ве value будкет то, что ввел user; let - потому что ниже будет менятся
        const favFilm = checkBox.checked; //отмечен ли чекбокс - если да то возращает True

        if (favFilm) {
           console.log("Добавляем любимый фильм"); 
        }

        if (newFilm) { // если true-условия будут выполнятся, а если false (юзер ничего не вводит, просто нажимает кнопку подтвердить)-не будут
            
            if (newFilm.length > 21) { //сли название фильма больше, чем 21 символ - обрезать его и добавить три точки
                newFilm = `${newFilm.slice(0, 21)}...`;
            }

            movieDB.movies.push(newFilm); //добавляемый введеный пользователем фильм в "базу"
            sortArr(movieDB.movies); //фунуция сортировки по алфавиту
            
            creatFilmList(movieDB.movies, movieList); //создаем новыцй лист из фильмов
        }
       

        event.target.reset(); // сбрасываем форму, event.target - обращаемся к элменету на котором происходит событие(addForm)
    });


    const deleteAdv = (arr) => { //функция удаления рекламы где arr - просто аргумент
        arr.forEach(item => {
            item.remove();
        });
    };
    deleteAdv(adImage); //запускаем функцию чтобы реклама удалилась из блока



    const makeChanges = () => { //доп функция c разными изменениями на странице
        promoGenre.textContent = "драма";
        promoImg.style.backgroundImage = 'url("img/bg.jpg")';
    };
    makeChanges(); //запускаем функцию 

    
    const sortArr = (arr) => { //функция сортировки где arr - какой-то массив
        arr.sort();
    };
    


    function creatFilmList(films, parentblock) { // добавляет фильм из "базы"(films) в какой-то блок на странице(parentblock)
        parentblock.innerHTML = "";
        sortArr(films); //функция сортировки

        films.forEach((film, i) => {
            parentblock.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>
        `;
        });

        document.querySelectorAll('.delete').forEach ((btn, i) => { //i - порядковый номер
            btn.addEventListener('click', ( ) => {
                btn.parentElement.remove(); //обращаемся к родительскому элементу, элемент удаляется со страницы
                movieDB.movies.splice(i, 1); //удаляем элемент из базы

                creatFilmList(films, parentblock); //рекурсия; когда удаляются фильмы  - нумерация тоже будет обнавляться
            })
        });

    };
    creatFilmList(movieDB.movies, movieList); //первый раз надо запустить, чтобы появился список фильмов при первом открытии страницы

    // const delMovie= document.querySelectorAll('.delete');
    // delMovie.forEach (item => {
    //     item.addEventListener('click', (e) => {
    //         const btn = e.target.closest('.delete');
    //         if (!btn) {
    //           return;
    //         }
            
    //         btn.parentElement.remove();
    //     })
    //   })  - 2 вариант "При клике на мусорную корзину - элемент будет удаляться из списка"
});