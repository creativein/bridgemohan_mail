const nodemailer = require('nodemailer');

exports.sendMail = (req, res, next) => {

    const emailTo = req.body.user.email;
    const emailForm = process.env.SENDER_USERNAME || '';
    let mailBody = ``;

    req.body.cart.map(shop => {
        const shopName = shop.shopName;

        let productList = '';
        shop.products.forEach(product => {
            const str = `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>LMC ${product.total}</td>
                </tr>
            `;
            productList += str;
        });

        const total = `
            <hr>
            <tr>
                <td>Total</td>
                <td></td>
                <td>LMC ${shop.total}</td>
            </tr>
            `;
        productList += total;

        const html = `
            <div>
                Thank you for your interest in Bridge Mohan - ${shopName
                        .charAt(0)
                        .toUpperCase() + shopName.slice(1)}. 
                Your Order has been placed:
                
                <table>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th> 
                    <th>Price</th>
                </tr>
                ${productList}
                </table>
                <br/>
                
                <p>- Team Bridge Mohan - ${shopName
                    .charAt(0)
                    .toUpperCase() + shopName.slice(1)}</p>
            </div>
            <hr>
            `;

        mailBody = mailBody + html;
    })


    // Sending Email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailForm,
            pass: process.env.SENDER_PASSWORD || ''
        }
    });


    const mailOptions = {
        from: emailForm, // sender address
        to: emailTo, // list of receivers
        subject: `Bridge Mohan - Order Confirmation`, // Subject line
        html: mailBody // plain text body
    };

    transporter.sendMail(mailOptions,  (err, info) => {
        if (err) {
            const mailError = new Error(err);
            mailError.status = 403;
            next(mailError);
        } else {
            res.status(200)
                .json({
                    status: true,
                    message: `Email Sent to ${emailTo}`,
                })
        }
    });
}
// SENDER_USERNAME=anupkumar.bid@learningmate.com SENDER_PASSWORD=!Aworker2#94 node server.js