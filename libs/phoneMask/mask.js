const mask = (selector) => {
    function setMask() {
        let matrix = '+7 (###) ###-##-##';
        let i = 0,
            val = this.value.replace(/\D/g, '');

        this.value = matrix.replace(/(?!\+)./g, function(a) {
            return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', setMask);
        input.addEventListener('focus', setMask);
        input.addEventListener('blur', setMask);
    });
};