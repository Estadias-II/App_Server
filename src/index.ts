import server from "./server";
import colors from 'colors';

const port = process.env.SERVER_PORT || 4000;

server.listen(port, () => {
    console.log(colors.magenta.italic.bold("Servidor corriendo exitosamente!"));
})