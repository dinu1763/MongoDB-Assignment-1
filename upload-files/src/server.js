const app = require('./index')

const connect = require('./configs/db')

app.listen(2345, async function () {
    await connect();
    console.log("Listening to Port 2345");
});