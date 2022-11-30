var helpers = {
    async getCEP(cep) {
        try {
            const url = "https://viacep.com.br/ws/" + cep + "/json/";
            const res = await fetch(url);
            return await res.json();
        } catch (error) {
            return null;
        }
    },
    async getRelatorio() {
        try {
            const url = "http://localhost/apibalanca/relatorio/recebimento/27-08-2021";
            const res = await fetch(url);
            return await res.json();
        } catch (error) {
            return null;
        }
    },

    cpf: function(cpf) {
        cpf = cpf.replace(/\D/g, "");
        if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        var result = true;
        [9, 10].forEach(function(j) {
            var soma = 0,
                r;
            cpf
                .split(/(?=)/)
                .splice(0, j)
                .forEach(function(e, i) {
                    soma += parseInt(e) * (j + 2 - (i + 1));
                });
            r = soma % 11;
            r = r < 2 ? 0 : 11 - r;
            if (r != cpf.substring(j, j + 1)) result = false;
        });
        return result;
    }


};

export default helpers