const departmentService = {
    get() {
        return fetch('/data/department.json')
        .then(res => res.json())
    },
    async getBySubjectId(props) {
        const {subjectId} = props;
        const tempData = await fetch('/data/department.json')
        .then(res => res.json())
        tempData.filter((data) => {
            return data.id === subjectId;
        })

        return tempData
    },
    update() {

    },
    delete(){

    },
    create(){

    },

    getDepartment() {
        return fetch('https://fls.azurewebsites.net/api/v1/department', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        .then(res => res.json())
    }

}

export default departmentService