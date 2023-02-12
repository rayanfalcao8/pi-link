import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import * as HTTPStatus from "http-status";
import * as fs from "fs";
import * as jwt from "jwt-simple";
import moment = require("moment");
import { CONFIG_PATH } from "../constants";

const DATABASE = JSON.parse(
	fs.readFileSync(`${CONFIG_PATH}/db/database.json`, "utf8")
).postgre;

class Handlers {
	public onSucess(res: Response, data: []) {
		res.status(HTTPStatus.OK).json(data);
	}

	public onError(res: Response, message: string, error: any) {
		console.log(`Error: ${error}`);
		res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
	}

	// public authSucess(res: Response, credentials: any, data: any, user: IUser, validTime: number = 1) {
	// 	let expires = moment().utc().add({ hours: validTime }).unix(); // Token will expire 1 hours after its creation.
	// 	let token = jwt.encode({
	// 		exp: expires,
	// 	}, process.env.JWT_SECRET || DATABASE.secret);

	// 	const isMatch = bcrypt.compareSync(credentials.password, data.password);
	// 	console.log(isMatch);

	// 	if (isMatch) {
	// 		const payload = { id: data.id, login: data.login };
	// 		res.status(200).json({
	// 			user: payload,
	// 			token: "JWT" + token,
	// 			expires: moment.unix(expires).format()
	// 		});
	// 	} else {
	// 		res.sendStatus(HTTPStatus.UNAUTHORIZED);

	// 	}
	// }

	public authFail(req: Request, res: Response) {
		res.sendStatus(HTTPStatus.UNAUTHORIZED);
	}

	public errorHandlerApi(
		err: ErrorRequestHandler,
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		console.log(`API error handler for execution: ${err}`);
		res.status(500).json({
			errorCode: "ERR-01",
			message: "INTERNAL SERVER ERROR",
		});
	}

	public dbErrorHandler(res: Response, error: any) {
		console.log(`AN ERROR OCCURED: ${error}`); // tslint:disable-line
		res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
			code: "ERR-02",
			message: "ERROR IN THE DATABASE",
		});
	}
}

export default new Handlers();
