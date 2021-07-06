

const teacherService = {
    get(){
        return fetch('/data/teacher.json').then(res => res.json())
    },
    getOne(id) {
        return fetch(`/data/teacherOne.json`).then(res => res.json())
    }
}

export default teacherService