const Service = require("../services/service");

let Controller = {
    register: async (req, res) => {
        const { auditType, data } = req.body;

        try {
            const audit = await Service.registerAudit(auditType, data);
            res.status(201).json({ message: 'Audit registered successfully', audit });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

module.exports = Controller;