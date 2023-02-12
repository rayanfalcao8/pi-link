import { CONFIG_PATH } from "../constants";
import * as fs from "fs";



export class APIException {
	private _code: number;
	private _data: any;
	private _message: string;
	private _description: string;

	protected _aCodes = JSON.parse(
		fs.readFileSync(`${CONFIG_PATH}/config.json`, "utf8")
	).RESULT_CODE;

	public getCode(): number {
		return this._code;
	}
	public setCode(code: number): void {
		this._code = code;
	}

	public getData(): any {
		return this._data;
	}
	public setData(obj: any): void {
		this._data = obj;
	}

	public getMessage(): string {
		return this._message;
	}
	public setMessage(msg: string): void {
		this._message = msg;
	}

	public getCodeMsg(): string {
		return this._description;
	}

	public setCodeMsg(msg: string): void {
		this._description = msg;
	}

	private setAll(codes, customErr?: string): void {
		let desc = codes.description;
		if (customErr !== undefined && customErr !== null) {
			desc = customErr;
		}
		this.setCodeMsg(desc);
		this.setMessage(codes.message);
		this.setCode(codes.code);
	}

	public getAll() {
		let result;
		result = {
			code: this.getCode(),
			message: this.getMessage(),
			description: this.getCodeMsg()
		};
		if (this.getData() !== undefined) {
			result.datas = this.getData();
		}

		return result;
	}

	constructor(codeMsg = "OK", customErr?: string) {
		for (const type in this._aCodes) {
			for (const codes of this._aCodes[type]) {
				if (codes.message === codeMsg) {
					this.setAll(codes, customErr);
				}
			}
		}
	}
}
