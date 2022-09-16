window.addEventListener('DOMContentLoaded', () => {

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
        const target = event.target;//for simplify

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
});