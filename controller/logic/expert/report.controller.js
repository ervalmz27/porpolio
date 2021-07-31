const { expert_report, customer, expert_report_reason } = require('../../../models');

class ReportController {
  async getExpertListReport(req, res) {
    try {
      const data = await expert_report_reason.findAll();
      res.status(200).json({
        sucess: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async sendReport(req, res) {
    try {
      const reporter = await customer.findOne({ where: { email: req.id.email } });
      // const reason = await expert_report_reason.create({ reason: req.body.reason });
      const report = await expert_report.create({
        id_expert: req.body.id_expert,
        id_reportby: reporter.id,
        reason: req.body.reason_id,
        review_note: req.body.review_note || null,
        review_by: req.body.review_note || null,
        review_date: new Date(),
        created_by: `${reporter.fname} ${reporter.lname}`,
        updated_by: `${reporter.fname} ${reporter.lname}`,
      });
      const data = await expert_report.findOne({ where: { id: report.id } });
      res.status(200).json({
        sucess: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new ReportController();
