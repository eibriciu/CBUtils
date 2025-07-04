export const Validators = {
    hasInvalidTerms(texto) {
      const t = texto.trim();
      const cpf = /^\d{11}$/;
      const cpfform = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      const passaport = /^[A-Za-z0-9]{6,11}$/;
      const invalid = /\b(passaporte|passport|doc|documento|id|identidade)\b/i;
  
      return (
        invalid.test(t) || !(cpf.test(t) || cpfform.test(t) || passaport.test(t))
      );
    },
  
    isValidCPF(cpf) {
      cpf = cpf.replace(/\D/g, '');
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
      
      let soma = 0, resto;
      for (let i = 0; i < 9; i++) soma += +cpf[i] * (10 - i);
      resto = (soma * 10) % 11;
      if (resto === 10) resto = 0;
      if (resto !== +cpf[9]) return false;
      
      soma = 0;
      for (let i = 0; i < 10; i++) soma += +cpf[i] * (11 - i);
      resto = (soma * 10) % 11;
      if (resto === 10) resto = 0;
      return resto === +cpf[10];
    },
  
    isValidBirthDate(dataStr) {
      const [dia, mes, ano] = dataStr.split('/').map(Number);
      if (!dia || !mes || !ano || dataStr.length !== 10) return false;
      if (ano < 1920) return false;
      
      const data = new Date(ano, mes - 1, dia);
      if (
        data.getFullYear() !== ano ||
        data.getMonth() !== mes - 1 ||
        data.getDate() !== dia
      )
        return false;
      
      const hoje = new Date();
      let idade = hoje.getFullYear() - ano;
      const fezAniversario =
        hoje.getMonth() > mes - 1 ||
        (hoje.getMonth() === mes - 1 && hoje.getDate() >= dia);
      if (!fezAniversario) idade--;
      
      return idade >= 18 && idade <= 100;
    }
  };