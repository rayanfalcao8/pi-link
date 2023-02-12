import { Application} from "express";
import { ClientController } from  "../controllers/client.controller";
import { BASE_URI } from "../constants";

export class ClientRoutes {
    public clientController: ClientController = new ClientController;

/**
 *
 * @param {Application} app
 * @returns {void}
 * @export
 * @class clientRoutes
 */
public routes ( app: Application): void {

    app.route(`${BASE_URI}/client`).post(this.clientController.AddNewClient);
    app.route(`${BASE_URI}/client/sendMail`).post(this.clientController.sendMail);
    app.route(`${BASE_URI}/client/getAll`).get(this.clientController.getClients);
    app.route(`${BASE_URI}/client/getOne/:id`).get(this.clientController.getClientById);
    app.route(`${BASE_URI}/client/delete/:id`).delete(this.clientController.deleteClient);
    app.route(`${BASE_URI}/client/update/:id`).put(this.clientController.updateClient);
}
}