
            //belum expired
            if (temp_idcust.expiretime <= Date.now()) {
                try {
                    //match dengan code
                    //setelah match column is_verified di table customer diubah jd true
                    const verify = await Customer_Verification.findOne({
                        where: {
                            verifycode: verifycode
                        }
                    })
                    if (verify) {
                        await Customer.update({
                            is_verified: true
                        }, {
                            where: {
                                [Op.and]: [{
                                        is_verified: {
                                            [Op.eq]: false
                                        }
                                    },
                                    {
                                        id: {
                                            [Op.eq]: temp_idcust.idcustomer
                                        }
                                    }
                                ]
                            }
                        })
                    }
                    res.status(201).json({
                        "success": true,
                        "data": {
                            "id_customer":temp_idcust.idcustomer
                        }
                    })
                    return
                } catch (error) {
                    console.log(error)
                    res.status(401).json({
                        status: false,
                        message: error.message,
                        data: null
                    })
                    return
                }
            } else {
                res.status(401).json({
                    "success": false,
                    "message": "OTP is expired or not match"
                })
                return
            }