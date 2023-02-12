import { Request, Response } from "express"; 
import * as _ from "lodash";
import * as validator from "validator";
import Handlers from "../core/handlers";
import { Utils } from "../core/utils";
import { getSupportedCodeFixes } from "typescript";
import handlers from "../core/handlers";
import * as PizZip from "pizzip";
import * as nodemailer from "nodemailer";

const Docxtemplater = require("docxtemplater");
const docxConverter = require("docx-pdf");

const fs = require("fs");
const path = require("path");
const model = require("../models");

export class ClientController {

    public async sendMail(req: Request, res: Response): Promise<Response> {
        let oErr;
        let fs = require("fs");
        let path = require("path");

        let sender = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_HOST || 465,
            secure: true,
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASSWORD
            }
          });
        
        // Load the docx file as binary content
        const content = fs.readFileSync(
            path.resolve(__dirname, "../../Accord.docx"),
            "binary"
        );
        
        const zip = new PizZip(content);
        
        let doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
    
        Utils.logger("info",`User requested to send a mail to a Client...`);
        try{
            await model.Client.findOne({
                where: {
                    id: req.body.id,
                    },
                })
            .then((client) => {
                
                let mail = {
                    from: "rayanfalcao8@gmail.com",
                    to: `${client.email}, ceo@pi-link.fr`,
                    subject: "Accord de confidentialité",
                    text: "Bonjour, ci-joint une copie de l'accord de confidentialité entre vous et pi-link",
                    attachments: [{}]
                };

                doc.render(client);

                const buf = doc.getZip().generate({
                    type: "nodebuffer",
                    compression: "DEFLATE",
                });
                
                fs.writeFileSync(path.resolve(__dirname, `../../generated/output-${client.phone_number}.docx`), buf);

                docxConverter(path.resolve(__dirname, `../../generated/output-${client.phone_number}.docx`),path.resolve(__dirname, `../../generated/pdf/output-${client.phone_number}.pdf`), (err, result) => {
                });

                mail.attachments = [{ 
                    filename: `output-${client.phone_number}.pdf`,
                    path: path.resolve(__dirname, `../../generated/pdf/output-${client.phone_number}.pdf`)
                }];

                sender.sendMail(mail, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent successfully: "
                                    + info.response);
                    }
                });

                res.status(201).json({
                    code:`201`,
                    status: `created`,
                    message: `Your mail has been sent successfully`,
                })
            })
            .catch(_.partial(Handlers.onError, res, "Error insering client"));

        } catch (error){
            oErr= Utils.getErrObj(error, "AddNewClient");
            res.status(oErr.code).send(oErr.msg)
        }
    }

    /**
     * Function to add a new client in system
     * 
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<Response>}
     */
    public async AddNewClient(req: Request, res: Response): Promise<Response> {
        let oErr;
        let clientData;
    
        Utils.logger("info",`User requested to add a new Client...`);
        try{
          
            const newClient = await model.Client.create(req.body)
            .then((client) =>
            res.status(201).json({
                code:`201`,
                status: `created`,
                message: `Your Client has been created successfully`,
                client,
            })
            )
            .catch(_.partial(Handlers.onError, res, "Error insering client"));
        } catch (error){
            oErr= Utils.getErrObj(error, "AddNewClient");
            res.status(oErr.code).send(oErr.msg)
        }
    }
/**
 * Function to get all the client in the system
 * 
 * @param {Request} req
 * @param {Response} Response
 * @return {Promise<Response>} 
 */
public async getClients(req: Request, res: Response): Promise<Response>{
    let oErr;

    Utils.logger("info",`User request to get all clients...`);

    try{
        const client = await model.Client.findAll({}).then((client)=>
        res.status(200).send({
            code:`200`,
            message: `List of all clients`,
            client,
        })
        )
        .catch(_.partial(Handlers.onError, res, "Error fetching all the clients"));
    }catch(error){
        oErr= Utils.getErrObj(error,"getClients");
    }
}

/**
* Function to get one client
* 
* @param {Request} req
* @param {Response} res
* @returns {Promise<Response>}
*/
public async getClientById(req: Request, res: Response): Promise<Response>{
   let oErr;

    Utils.logger("info", `User request to get one Client...`);
    try {
        const client = await model.Client.findOne({
            where: {
                id: req.params.id,
                },
            }).then((client)=>
         res.status(200).send({
             code:`200`,
             message: `Request successfull`,
             client,
        })
        )
        .catch(_.partial(Handlers.onError, res, "Error fetching a client"));
    }catch(error){
        oErr=Utils.getErrObj(error, "getOneClient" );
        res.status(oErr.code).send(oErr.msg); 
    }
}
/**
 * Function to update a client in the system
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
public async updateClient(req: Request, res: Response): Promise<Response>{
    let oErr;

    Utils.logger("info",`User requested to update a Client...`);

    try{
        const client= await model.Client.findOne({
        where:{
            id: req.params.id
        },
        });

        const updatedClient = await client.update(req.body)
        .then((client) =>
        res.status(200).send({
            code: `200`,
            message: `Client has been successfull updated`,
            client,
        })
        )
        .catch(_.partial(Handlers.onError, res, "Error updating a client"));
    }catch(error){
        oErr = Utils.getErrObj(error, "updateClient");
        res.status(oErr.code).send(oErr.msg);
        
    }
}

/**
 * Function to delete a client in the sysytem;
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
public async deleteClient(req: Request, res: Response): Promise<Response>{
    let oErr;

    try{
        const deleteClient = await model.Client.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((client)=>
        res.status(200).send({
            code:`200`,
            message:`Client has been successfull deleted`,
        })
        )
        .catch(_.partial(handlers.onError, res, "Error deleting a client"));
    }catch(error){
        oErr = Utils.getErrObj(error, "deleteClient");
        res.status(200).send(oErr.msg);
    }
}
}
