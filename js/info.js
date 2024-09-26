function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * window.innerHeight * 2}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    document.body.appendChild(star);
}

for (let i = 0; i < 150; i++) {
createStar();
}

document.querySelectorAll('.info img').forEach(img => {
    img.addEventListener('click', () => {
        const targetSectionId = img.getAttribute('data-section');
        
        document.querySelectorAll('.paragraph-section').forEach(section => {
            section.classList.remove('highlight');
        });

        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add('highlight');

            if (targetSectionId !== 'highlow') {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        document.querySelectorAll('.info img').forEach(image => {
            image.style.boxShadow = 'none';
            image.style.backgroundColor = 'transparent';
        });

        img.style.boxShadow = '0px 0px 5px 5px rgb(134, 140, 151)';
        img.style.backgroundColor = 'white';
    });
});
