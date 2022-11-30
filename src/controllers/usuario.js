import req from "@/controllers/requisicao.js";

export default class usuario {


    static urlBase(path) {
        return "http://localhost/apibalanca" + path;
    }

    listar() {
        let id = undefined;

        try {
            id = parseInt(this.id);
        } catch (error) {
            console.log(error);
        }

        if (id != undefined) {
            return req.obterJson(this.urlBase("/usuario/") + this.id);
        }
    }

    static remover(idUser) {
        let id = undefined;

        try {
            id = parseInt(idUser);
        } catch (error) {
            console.log(error);
        }

        if (id != undefined) {
            return req.obterJson(this.urlBase("/usuario/remover/") + idUser);
        }
    }


    static async listarTodos() {
        const json_data = await req.obterJson(this.urlBase("/usuario"));
        if (json_data.error !== undefined) {
            throw json_data.error;
        }
        return Object.values(json_data);
    }

    static async obterTiposUsuario() {
        const json_data = await req.obterJson(this.urlBase("/usuario/tipo"));
        return Object.values(json_data);
    }


    static async adicionar(user) {
        const result = await req.sendJson(this.urlBase("/usuario/adicionar"), user);

        if (result.error !== undefined) {
            throw result.error;
        }

        return result;
    }
}