function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top;
        window.scrollTo({
            top: targetPosition + window.pageYOffset - 60,
            behavior: 'smooth'
        });
    } else {
        console.error(`Element with id "${targetId}" not found.`);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        smoothScroll(targetId);
    });
});