import { ClientRoutes } from "./client.routes"



export class AppRoutes {

    public ClientRoutes: ClientRoutes = new ClientRoutes();
   
    /**
     * 
     * @param {any} app
     * @returns {void}
     * @class AppRoutes
     */
    public routes(app): void {
    this.ClientRoutes.routes(app);
    }
}

   

    

   



