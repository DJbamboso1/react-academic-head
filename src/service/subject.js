const subjectService = {
    get() {
        return fetch('/data/subject.json').then(res => res.json())
    },
    getOne(id){
        return fetch(`/data/subjectOne.json`).then(res => res.json())
    }
}

export default subjectService;