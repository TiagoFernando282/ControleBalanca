var requisicao = {


    async obterJson(url) {
        try {
            const res = await fetch(url);
            const json = await res.json();
            return json;

        } catch (error) {
            return error;
        }
    },

    async sendJson(url, _data) {
        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(_data),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
            return await res.json();
        } catch (error) {
            return error;
        }
    },

    async obterJsonApi(url) {
        try {
            const urlApi = "http://localhost/apibalanca" + url;
            const res = await fetch(urlApi, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
            });

            if (res.status == 401 || res.status == 403) {
                window.location.href = "http://localhost/#/login";
                return;
            }

            const json = await res.json();
            return json;

        } catch (error) {
            return error;
        }
    },
    async sendJsonApi(url, _data) {
        try {
            const urlApi = "http://localhost/apibalanca" + url;
            const res = await fetch(urlApi, {
                method: "POST",
                body: JSON.stringify(_data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if (res.status == 401 || res.status == 403) {
                window.location.href = "http://localhost/#/login";
                return;
            }

            return await res.json();
        } catch (error) {
            return error;
        }
    },
};

export default requisicao