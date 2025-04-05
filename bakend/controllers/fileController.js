import filesModel from "../models/files.js";

class filesController {
    constructor() {

    }

    async create(req, res) {
        try {
            const data = filesModel.create(req.body);
            res.status(201).json({ "data": data });
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async getOne(req, res) {
        try {
            res.status(201).json({ status: 'getOne-OK' })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async getAll(req, res) {
        try {
            res.status(201).json({ status: 'getall-OK' })
        } catch (error) {
            res.status(500).send(error)
        }
    }
    async update(req, res) {
        try {
            res.status(201).json({ status: 'update-OK' })
        } catch (error) {
            res.status(500).send(error)
        }
    }
    async delete(req, res) {
        try {
            res.status(201).json({ status: 'del-OK' })
        } catch (error) {
            res.status(500).send(error)
        }
    }
}
export default new filesController;