
function request({ url, headers = {}, method = "get" }) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method,
            headers
        })
            .then(function (response) {
                response
                    .json()
                    .then(function (res) {
                        resolve(res.data);
                    })
                    .catch(function (error) {
                        console.error("Fetch error:" + error);
                        alert("请求失败");
                        reject(error);
                    });
            })
            .catch(function (error) {
                console.error("Fetch error:" + error);
                alert("请求失败");
                reject(error);
            });
    })

}