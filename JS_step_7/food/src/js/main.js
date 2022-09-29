window.addEventListener('DOMContentLoaded', () => {

    //TABS
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach (item => {
              item.classList.add('hide');
              item.classList.remove('show', 'fade');
        });
        
        tabs.forEach( item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    //default value 0 if nothing is passed to the function
    function showTabContent (i = 0) { 
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
    function getTimeRemaining (endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
        //calculate how many milliseconds in a day
            days = Math.floor(t/(1000 * 60 * 60 * 24)); 
        //how many hours are left of the day
            hours = Math.floor((t/(1000 * 60 * 60)) % 24);
        //how many minutes are left of the hour
            minutes = Math.floor((t/1000/60) % 60);
        //how many seconds are left of the hour
            seconds = Math.floor((t/1000) % 60);
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
        }else{
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

            days.innerHTML  = getZero(t.days); // from return object in getTimeRemaining(endtime)
            hours.innerHTML  = getZero(t.hours);
            minutes.innerHTML  = getZero(t.minutes);
            seconds.innerHTML  = getZero(t.seconds);

            //when deadline is the end
            if (t.total <= 0 ) {
                clearInterval(timeInterval);
            }
        };  
    };
    setClock('.timer', deadline);  
});