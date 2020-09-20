'use strict'

require('dotenv').config({ path: '.env' })

const Facebook = require('./Facebook')
const { Tasks } = require('./firebase/firebase')

const main = async () => {

    // Tasks.onSnapshot(snapshot => {
    //     console.log("onSnapshot", snapshot);
    //     snapshot.forEach(doc => {
    //         console.log(doc.data());
    //     })
    // }, error => {
    //     console.log("onSnapshot Error", error);
    // });

    // Tasks.add({
    //     type: 'POST_ON_GROUP',
    //     groups: [
    //         'https://www.facebook.com/groups/323835002032137',
    //         'https://www.facebook.com/groups/323835002032137'
    //     ],
    //     postAt: Date.now(),
    //     post: 'Awesome post created with Facebook Bot',
    //     done: false,
    //     running: false,
    //     createdAt: Date.now(),
    //     updatedAt: Date.now()
    // }).then(res => {
    //     console.log(res.id);
    // })


    //initializing facebook
    const fb = new Facebook()
    await fb.init()

    // Logging in
    let loginRes = await fb.login()
    if (loginRes.error) return

    await fb.postToGroup({
        groups: [
            'https://www.facebook.com/groups/323835002032137',
            'https://www.facebook.com/groups/323835002032137'
        ],
        post: 'Awesome post created with Facebook Bot',
        testMode: false
    })

    await fb.close()

}

main().catch(err => {
    console.log('Main :: Error', err.message);
})