import moment from 'moment'

const data = {
    post: function(todo, payload) {
        return new Promise((resolve, reject) => {
            let id;
            for (let i in todo) {
                let arr = [];
                arr.push(todo[i].id)
                arr.sort((a, b) => a - b)
                id = arr[arr.length - 1] + 1
            }
            if (id === undefined) {
                id = 1
            }
            let item = {
                id,
                title : payload.title,
                description: payload.description,
                isChecked: false,
                created_time: moment()
            }
            resolve(item);
        })
    },

    delete: function(payload, id) {
        console.log('masokkk', payload, id)
        return new Promise((resolve, reject) => {
           const data = payload.filter((value) => {
               return value.id != id
           })
           console.log(data)
           resolve(data)
        })
    },

    getById: function(payload, id) {
        return new Promise((resolve, reject) => {
            const data = payload.filter((value) => {
                return value.id === id
            })
            resolve(data)
        })
    }
}
export default data