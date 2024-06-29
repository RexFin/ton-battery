function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const start = window.pageYOffset;
        const end = section.getBoundingClientRect().top + window.pageYOffset;
        const duration = 1000;
        let startTimestamp = null;

        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            window.scrollTo(0, start + (end - start) * easeInOutQuad(Math.min(progress / duration, 1)));

            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    const scrollTriggers = document.querySelectorAll('.animation-trigger');
    const featuresBtnContainers = document.querySelectorAll('.features-btn-container');
    const buttons = document.querySelectorAll('.features-btn');

    let currentIcon = document.querySelector('.gear');

    const icons = {
        gear: document.querySelector('.gear'),
        coin: document.querySelector('.coin'),
        percent: document.querySelector('.percent'),
        'credit-card': document.querySelector('.credit-card'),
        bolt: document.querySelector('.bolt')
    };

    function addAnimateWithDelay(elements, delay) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * delay);
        });
    }

    function checkScroll() {
        scrollTriggers.forEach(scrollTrigger => {
            const elementPosition = scrollTrigger.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementTop = elementPosition.top;
            
            if (elementTop <= windowHeight * 0.5) {
                if (!scrollTrigger.classList.contains('animate')) {
                    scrollTrigger.classList.add('animate');
                    
                    if (scrollTrigger.classList.contains('info-line')) {
                        typeText("what-is-battery", "Что такое Батарейка Тонкипера?", 30);
                    }

                    if (scrollTrigger.classList.contains('description-container')) {
                        typeText("easy-start", "Батарейка Тонкипера сильно облегчает жизнь новым пользователям: вы можете поставить кошелек, получить стейблкоин или NFT, и сразу же начать их использовать, без использования тонов для оплаты газа. Вам не нужно регистрироваться в обменниках и проходить проверки документов только для покупки непонятного количества монет для оплаты непонятного газа.", 20);
                        typeText("payment-method", "С батарейкой вам больше никогда не придется беспокоиться об оплате газа. Пополните свою батарейку банковской картой или стейблкоином и сразу же начните использовать все функции вашего кошелька.", 20);
                    }

                    if (scrollTrigger.classList.contains('features-container')) {
                        console.log('features-container');
                        addAnimateWithDelay(featuresBtnContainers, 300);
                    }

                    if (scrollTrigger.classList.contains('how-content')) {
                        typeText("card-first", "С помощью батарейки вы можете платить токенами (стейблкоинами, NFT и т.д.) без необходимости покупки тонов в обменниках для оплаты блокчейн-комиссий. Батарейка оплачивает комиссию за вас автоматически.", 20);
                        typeText("card-second", "Батарейка Тонкипера измеряется в зарядах, каждый заряд покрывает комиссию за простую транзакцию TON перевода. Более сложные транзакции могут потребовать 5, 10 и более зарядов.", 20);
                    }
                }
            }
        });
    }

    function typeText(elementId, text, speed) {
        const element = document.getElementById(elementId);
        let index = 0;

        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    function animateBoxes(elementId, milsecond) {
        const howBoxes = document.querySelectorAll(`#${elementId} .how-bg-box`);
        let currentIndex = 0;
        const totalBoxes = howBoxes.length;
    
        setInterval(() => {

            howBoxes.forEach(box => {
                box.classList.remove('how-hovered', 'prev1', 'prev2', 'next1', 'next2');
            });

            const currentBox = howBoxes[currentIndex];
            currentBox.classList.add('how-hovered');

            const prev1 = howBoxes[currentIndex - 1 >= 0 ? currentIndex - 1 : totalBoxes - 1];
            const prev2 = howBoxes[currentIndex - 2 >= 0 ? currentIndex - 2 : totalBoxes - 2];
            prev1.classList.add('prev1');
            prev2.classList.add('prev2');

            const next1 = howBoxes[currentIndex + 1 < totalBoxes ? currentIndex + 1 : 0];
            const next2 = howBoxes[currentIndex + 2 < totalBoxes ? currentIndex + 2 : 1];
            next1.classList.add('next1');
            next2.classList.add('next2');

            currentIndex = (currentIndex + 1) % totalBoxes;
        }, milsecond);
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const iconKey = button.getAttribute('data-icon');
            const newIcon = icons[iconKey];

            if (button.classList.contains('features-open')) {
                button.classList.remove('features-open');
                currentIcon.classList.remove('features-icon-enter', 'animate');
                currentIcon.classList.add('features-icon-leave');
                currentIcon = icons['gear'];
                currentIcon.classList.remove('features-icon-leave');
                currentIcon.classList.add('features-icon-enter', 'animate');
            } else {
                buttons.forEach(btn => btn.classList.remove('features-open'));
                button.classList.add('features-open');

                currentIcon.classList.remove('features-icon-enter', 'animate');
                currentIcon.classList.add('features-icon-leave');

                newIcon.classList.remove('features-icon-leave');
                newIcon.classList.add('features-icon-enter', 'animate');

                currentIcon = newIcon;
            }
        });
    });
    
    checkScroll();
    animateBoxes('how-bg-top', 300);
    animateBoxes('how-bg-bottom', 250);

    window.addEventListener('scroll', checkScroll);
});
  