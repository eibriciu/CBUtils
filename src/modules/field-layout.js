import { Selectors } from '../core/selectors.js';

export function fieldLayout() {
  const containerPrincipal = document.querySelector(Selectors.MAIN_CONTAINER);
  if (!containerPrincipal || containerPrincipal.dataset.layoutAplicado === 'true') return;
  
  containerPrincipal.dataset.layoutAplicado = 'true';

  const nomeContainer = document
    .querySelector(Selectors.FIRST_NAME_INPUT)
    ?.closest('.chakra-stack');
  const sobrenomeContainer = document
    .querySelector(Selectors.LAST_NAME_INPUT)
    ?.closest('.chakra-stack');

  const dataNascimentoInput = document.querySelector(Selectors.CPF_INPUT);
  const numeroDocumentoInput = document.querySelector(Selectors.BIRTHDATE_INPUT);

  const dataNascimentoContainer =
    dataNascimentoInput?.closest('.chakra-stack') ||
    dataNascimentoInput?.parentElement?.closest('.chakra-stack');
  const numeroDocumentoContainer =
    numeroDocumentoInput?.closest('.chakra-stack') ||
    numeroDocumentoInput?.parentElement?.closest('.chakra-stack');

  if (
    !nomeContainer ||
    !sobrenomeContainer ||
    !dataNascimentoContainer ||
    !numeroDocumentoContainer
  ) return;

  // Remove elementos do DOM
  [nomeContainer, sobrenomeContainer, dataNascimentoContainer, numeroDocumentoContainer]
    .forEach(el => el.remove());

  // Cria grid container
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('grid-campos-personalizado');
  gridContainer.style.cssText = 'display:grid;gap:16px;width:100%';

  const ajustarColunas = () => {
    gridContainer.style.gridTemplateColumns = 
      window.innerWidth < 640 ? '1fr' : '1fr 1fr';
  };

  ajustarColunas();
  window.addEventListener('resize', ajustarColunas);

  // Adiciona elementos ao grid
  [nomeContainer, sobrenomeContainer, dataNascimentoContainer, numeroDocumentoContainer]
    .forEach(el => gridContainer.appendChild(el));

  // Limpa e insere o grid
  containerPrincipal.innerHTML = '';
  containerPrincipal.appendChild(gridContainer);
}