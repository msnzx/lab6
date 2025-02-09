
const $ = document.querySelector.bind(document);

const toggleBtn = $('toggle');

toggleBtn.addEventListener('click', e => {
    if (toggleBtn.innerText == 'DARK') {
        document.documentElement.setAttribute('theme', 'dark');
        toggleBtn.innerText = 'LIGHT';
    }
    else {
        document.documentElement.removeAttribute('theme');
        toggleBtn.innerText = 'DARK';

    }
}
)
