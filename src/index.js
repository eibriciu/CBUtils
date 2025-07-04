import { cpfValidator } from './modules/cpf-validator.js';
import { guideLanguageDropdown } from './modules/guide-language.js';
import { birthDateMask } from './modules/birth-date.js';
import { documentTypeDropdown } from './modules/document-type.js';
import { packageSelector } from './modules/package-selector.js';
import { fieldLayout } from './modules/field-layout.js';
import { adjustCpfLabel } from './modules/label-adjuster.js';

const CaboclosEngine = {
  modules: [
    cpfValidator,
    guideLanguageDropdown,
    birthDateMask,
    documentTypeDropdown,
    packageSelector,
    fieldLayout,
    adjustCpfLabel
  ],

  run() {
    this.modules.forEach(module => {
      try {
        module();
      } catch (error) {
        console.warn('Erro ao executar módulo:', error);
      }
    });
  },

  init() {
    console.log('🏕️ Caboclos Cloudbeds JS iniciado');
    this.run();
    
    const observer = new MutationObserver(() => this.run());
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  CaboclosEngine.init();
});

if (document.readyState !== 'loading') {
  CaboclosEngine.init();
}