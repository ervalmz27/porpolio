const { order, expert, expert_listing, customer } = require('../../../models');

const convertDateTime = (time) => {
  const a = time.slice(-5).split(':');
  return +a[0] * 60 + +a[1];
};

class OrderController {
  async getOrderList(_, res) {
    try {
      const orders = await order.findAll({
        attributes: [
          'id',
          'fname',
          'lname',
          'book_starttime1',
          'book_endtime1',
          'book_starttime2',
          'book_endtime2',
          'book_starttime3',
          'book_endtime3',
          'topic_name',
          'total_onhold_amount',
          'status',
        ],
        include: {
          model: expert_listing,
          as: 'order_has_ExpertListing',
          attributes: ['expert_name'],
        },
      });

      if (orders === []) {
        return res.status(200).json({
          Success: true,
          Message: 'Empty Order',
        });
      }

      return res.status(201).json({
        Message: 'Successfully Fetch Data Order',
        orders,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getOrderById(req, res) {
    const { bookingId } = req.params;

    try {
      const ordered = await order.findOne({ where: { id: bookingId } });
      if (!ordered) {
        return res.status(500).json({
          Message: 'Order Not Found',
          booking: null,
        });
      }

      return res.status(200).json({
        Message: 'Fetched Successfully',
        order: ordered,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getOrderByExpert(req, res) {
    const { idExpert } = req.body;

    try {
      const ordered = await order.findOne({ where: { idExpert } });
      if (!ordered) {
        return res.status(500).json({
          Message: 'Order Not Found',
          booking: null,
        });
      }

      return res.status(200).json({
        Message: 'Fetched Successfully',
        order: ordered,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getOrderByCostumer(req, res) {
    const { idCustomer } = req.body;

    try {
      const ordered = await order.findOne({ where: { idCustomer } });
      if (!ordered) {
        return res.status(500).json({
          Message: 'Order Not Found',
          booking: null,
        });
      }

      return res.status(200).json({
        Message: 'Fetched Successfully',
        order: ordered,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getOrderByStatus(req, res) {
    const { status } = req.body;

    try {
      const orders = await order.findAll({ where: { status } });

      if (orders.length === 0) {
        return res.status(500).json({
          Message: 'Data not available',
          booking: null,
        });
      }

      return res.status(200).json({
        Message: 'Fetched Successfully',
        orders,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async createOrder(req, res) {
    const {
      idExpert,
      idExpertListing,
      idCategory,
      idTopic,
      book_starttime1,
      book_endtime1,
      book_starttime2,
      book_endtime2,
      book_starttime3,
      book_endtime3,
      category_name,
      topic_name,
      expert_rate,
      book_duration,
      currency,
      status,
      status_note,
    } = req.body;

    if (
      idExpert === undefined ||
      idTopic === undefined ||
      idExpertListing === undefined ||
      idCategory === undefined ||
      expert_rate === undefined ||
      currency === undefined ||
      status === undefined ||
      status_note === undefined
    ) {
      return res.status(400).json({
        code: 'REG-FORMINVALID',
        status: false,
        note: 'Column Not Complete',
      });
    }

    const cust = await customer.findOne(req.id);

    const duration =
      (convertDateTime(book_endtime1) -
        convertDateTime(book_starttime1) +
        convertDateTime(book_starttime2) -
        convertDateTime(book_starttime2) +
        convertDateTime(book_endtime3) -
        convertDateTime(book_starttime3)) /
      60;

    const total_amount = book_duration * expert_rate;

    try {
      const ordered = await order.create({
        idExpert,
        idExpertListing,
        idCategory,
        idTopic,
        idCustomer: cust.id,
        lname: cust.lname,
        fname: cust.fname,
        book_starttime1,
        book_endtime1,
        book_starttime2,
        book_endtime2,
        book_starttime3,
        book_endtime3,
        book_duration: duration,
        category_name,
        topic_name,
        expert_rate,
        total_onhold_amount: total_amount,
        currency,
        status: 1,
        status_note,
        approval_expert: new Date(),
        approval_expert_note: 'Waiting Confirmed',
        act_session_info: 'Book already finished',
      });

      // push Notification to the apps
      return res.status(201).json({
        status: true,
        Message: 'Booking Created',
        data: ordered,
      });
    } catch (error) {
      console.log('error create', error);
      res.status(500).json({
        Success: false,
        Message: 'token not found, please login first',
        data: null,
      });
    }
  }

  async updateOrder(req, res) {
    const { bookingId } = req.params;

    const { approval_expert_note, status_note, book_starttime_approve, book_endtime_approve, confirm, rejected, canceled } =
      req.body;

    let fetchedOrder;

    try {
      const ordered = await order.findByPk(bookingId);
      fetchedOrder = ordered;

      if (!ordered) {
        return res.status(401).json({
          Success: false,
          Message: 'Order Not Found',
          data: null,
        });
      }

      if (confirm === true && ordered.status === 1) {
        if (status_note === undefined || book_starttime_approve === undefined || book_endtime_approve === undefined) {
          return res.status(400).json({
            code: 'REG-FORMINVALID',
            status: false,
            note: 'Column Not Complete',
          });
        }

        ordered.status = 2;
        ordered.status_note = status_note;
        ordered.approval_expert = new Date();
        ordered.approval_expert_note = approval_expert_note;
        ordered.confirmed_starttime = book_starttime_approve;
        ordered.confirmed_endtime = book_endtime_approve;
        await ordered.save();

        // Next Sent notification to Apps
        return res.status(201).json({
          Success: true,
          Message: 'listing updated',
        });
      }

      if (rejected === true && ordered.status === 1) {
        if (status_note === undefined) {
          return res.status(400).json({
            code: 'REG-FORMINVALID',
            status: false,
            note: 'Column Not Complete',
          });
        }
        ordered.status = 4;
        ordered.status_note = status_note;
        await ordered.save();
        return res.status(201).json({
          Success: true,
          Message: 'Order Rejected',
        });
      }

      if (canceled === true && ordered.status === 2) {
        if (status_note === undefined) {
          return res.status(400).json({
            code: 'REG-FORMINVALID',
            status: false,
            note: 'Column Not Complete',
          });
        }

        ordered.status = 4;
        ordered.status_note = status_note;
        await ordered.save();
        return res.status(201).json({
          Success: true,
          Message: 'Order Canceled',
        });
      }

      if (ordered.status === 2) {
        if (status_note === undefined) {
          return res.status(400).json({
            code: 'REG-FORMINVALID',
            status: false,
            note: 'Column Not Complete',
          });
        }

        ordered.status = 3;
        const expertCall = await expert.findOne({ where: { id: fetchedOrder.idExpert } });
        expertCall.total_call += 1;
        await expertCall.save();
        return res.status(201).json({
          Success: true,
          Message: 'listing updated to status completed',
        });
      }
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'token not found, please login first',
        data: null,
      });
    }
  }

  async deleteOrder(req, res) {
    const { id } = req.body;
    try {
      const ordered = await order.findByPk(id);
      if (id === undefined) {
        return res.status(400).json({
          code: 'REG-FORMINVALID',
          status: false,
          note: 'Column Not Complete',
        });
      }
      if (!ordered) {
        return res.status(500).json({
          Success: false,
          Message: 'ID Order Not Found',
        });
      }
      await ordered.destroy();
      return res.status(200).json({
        Success: true,
        Message: 'Succesfully Delete Order',
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'token not found, please login first',
        data: null,
      });
    }
  }
}

module.exports = new OrderController();
