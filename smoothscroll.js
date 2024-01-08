// Smooth scroll behavior for links with JavaScript
const links = document.querySelectorAll('.whoami_button');
links.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // Change the URL hash without a page reload
            history.pushState(null, null, '#' + targetId);
        }
    });
});
