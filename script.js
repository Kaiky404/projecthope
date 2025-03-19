const toggleCheckbox = document.getElementById('alternador');
const icons = document.querySelectorAll('.icon');
const backs = document.querySelectorAll('.back-to-svg');

// Função para ativar o modo escuro
function ativarDarkMode() {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');  // Salva o estado do tema como 'dark'
    applySvgColor('var(--txt-color-dark)', 'dark');  // Altera a cor dos SVGs para o modo escuro
}

// Função para desativar o modo escuro
function desativarDarkMode() {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');  // Salva o estado do tema como 'light'
    applySvgColor('var(--txt-color)', 'light');  // Altera a cor dos SVGs para o modo claro
}

// Função para aplicar a cor nos SVGs
function applySvgColor(color, mode) {
    // Altera a cor para os SVGs com a classe .icon
    icons.forEach(icon => {
        icon.querySelectorAll('path').forEach(path => {
            path.setAttribute('fill', color);  // Aplica a cor no 'fill' de cada path
        });
    });
    
    // Altera a cor para os SVGs com a classe .back-to-svg
    backs.forEach(back => {
        back.querySelectorAll('path').forEach(path => {
            path.setAttribute('fill', mode === 'dark' ? 'var(--back-to-svg-dark)' : 'var(--back-to-svg-light)');
        });
    });
}

// Verifica o estado do tema ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
        ativarDarkMode();  // Ativa o modo escuro se o tema estiver salvo como 'dark'
        toggleCheckbox.checked = true;  // Marca o checkbox de acordo com o estado salvo
    } else {
        desativarDarkMode();  // Desativa o modo escuro caso o tema não seja 'dark'
        toggleCheckbox.checked = false;  // Desmarca o checkbox
    }
    
    // Evento de mudança do checkbox para alternar entre os modos
    toggleCheckbox.addEventListener('change', () => {
        if (toggleCheckbox.checked) {
            ativarDarkMode();  // Ativa o modo escuro
        } else {
            desativarDarkMode();  // Desativa o modo escuro
        }
    });
});

// Chama a função para aplicar a cor do SVG ao carregar a página
applySvgColor(
    document.documentElement.classList.contains('dark-mode') ? 'var(--txt-color-dark)' : 'var(--txt-color)',
    document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light'
);


function toggleVisibility(element) {
    // Encontra o contêiner pai `creditos-content` do elemento clicado
    const creditosContent = element.closest('.creditos-content');
    
    // Seleciona o `.creditos-content-merito` e todos os `.creditos-content-links-link` dentro do contêiner atual
    const meritElement = creditosContent.querySelector('.creditos-content-merito');
    const linksElements = creditosContent.querySelectorAll('.creditos-content-links-link');
    
    // Verifica se o mérito já está visível para o item atual
    const isVisible = meritElement.style.display === 'block';
    
    // Oculta todos os elementos `.creditos-content-merito` e `.creditos-content-links-link` em todas as seções
    document.querySelectorAll('.creditos-content-merito').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.creditos-content-links-link').forEach(el => el.style.display = 'none');
    
    // Se o elemento clicado já estava visível, não faz nada além de ocultar (alternância no clique)
    if (!isVisible) {
        // Caso contrário, exibe o mérito e links para o item clicado
        meritElement.style.display = 'block';
        linksElements.forEach(link => link.style.display = 'inline-block');
    }
}

// Função para que o redirect da nav seja suave

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    };
    
};

const func = document.querySelector('a[href="#func"]');
const cred = document.querySelector('a[href="#cred"]');

func.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToElement('func');
});

cred.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToElement('cred');
});