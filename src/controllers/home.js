import req from "@/controllers/requisicao.js";

export default class home {


    static urlBase(path) {
        return "http://localhost/apibalanca" + path;
    }


    static async verificar(user) {
        return await req.sendJson(this.urlBase("/login"), user);
    }
}