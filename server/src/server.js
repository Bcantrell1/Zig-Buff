const app = require('./app.js');

const PORT = process.env.PORT;

//Listening 
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
})