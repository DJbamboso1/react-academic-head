
const authService = {
    login(data) {
        return fetch("https://fls.azurewebsites.net/api/v1/guest/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.status === 400) {
                return { error: 'Email hoặc password sai' }
            }
            return res.json()
        })
    },
    info(id) {
        return fetch('https://fls.azurewebsites.net/api/v1/user/' + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(result.id),
        }).then(res => res.json())
    },
    role(id) {
        return fetch('https://fls.azurewebsites.net/api/v1/role/' + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(user.user),
        }).then(res => res.json())
    }
}


export default authService