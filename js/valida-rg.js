export default function validaRG(campo) {
    const rg = campo.value.replace(/\./g, "");

    // Verifica se a string tem 9 caracteres
    if (rg.length !== 9) {
        campo.setCustomValidity("O RG deve ter 9 dígitos.");
        return false;
    }
}
