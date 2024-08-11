import { app } from "./app.js";

const port = 5555 | process.env.PORT;


app.listen(port, () => {
    console.log(`This app is listening to port: ${port}`);
})