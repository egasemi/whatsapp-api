const api = require('./src/config/api.js');
const { initDb } = require('./src/config/db/conecctionMongodb.js');
const { initWSP } = require('./src/config/wsp/initWSP.js')

    ; (async () => {
        try {
            await initWSP()
            await initDb()
            api.listen(3000, () => {
                console.log(`server listen in port ${3000}`)
            })
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
    })()