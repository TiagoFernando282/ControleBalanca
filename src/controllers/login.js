import req from "@/controllers/requisicao.js";

export default class login {


    static urlBase(path) {
        return "http://localhost/apibalanca" + path;
    }


    static async verificar(user) {
        console.log(user);
        return await req.sendJson(this.urlBase("/login"), user);
        
    }
}