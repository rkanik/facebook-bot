import { Tasks } from '../firebase/firebase'

export const create = data => new Promise(resolve => {
    Tasks.add(data)
        .then(ref => {
            ref.onSnapshot(
                doc => resolve({ id: doc.id, ...doc.data() }),
                err => resolve({ error: true, message: err.message })
            )
        })
        .catch(err => resolve({ error: true, message: err.message }))
})

export const get = id => new Promise(resolve => {

    if (id) {
        return Tasks.doc(id).get().then(doc => {
            if (!doc.exists) return resolve({ error: true, message: 'Not Found' })
            return resolve({ id: doc.id, ...doc.data() })
        })
    }

    return Tasks.get().then(docs => {
        let tasks = []
        docs.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() })
        })
        return resolve(tasks)
    })

})