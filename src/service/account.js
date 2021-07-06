const accountService = {
    async get() {
        return fetch('https://fls.azurewebsites.net/api/v1/user', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }).then(res => res.json())
    },


    // async getBySubjectId(props) {
    //     const { subjectId } = props;
    //     const tempData = await fetch('/data/department.json')
    //         .then(res => res.json())
    //     tempData.filter((data) => {
    //         return data.id === subjectId;
    //     })

    //     return tempData
    // },
    update() {

    },
    delete() {

    },
    create() {

    }

}

export default accountService