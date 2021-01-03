const Letter = require("../../models/msg");
const nodemailer = require("nodemailer");

exports.list = async (ctx) => {
  let letters;
  try {
    letters = await Letter.find().exec();
  } catch (e) {
    return ctx.throw(500, e);
  }
  ctx.body = letters;
};

exports.create = async (ctx) => {
  const msg = ctx.request.body;
  const newletter = new Letter({
    msg: msg.msg,
    name: msg.name,
    createdAt: msg.createdAt,
  });
  try {
    output = await newletter.save();
    const smtpTransprot = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      auth: {
        user: process.env.EMAIL_USER, // gmail 계정 아이디를 입력
        pass: process.env.EMAIL_PASS, // gmail 계정의 비밀번호를 입력
      },
    });
    const mailOptions = {
      from: "godkor200@gmail.com", // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: "peppgili12@naver.com", // 수신 메일 주소
      subject: `편지싸이트 업데이트 알림! ${msg.createdAt}`, // 제목
      text: "편지싸이트에 지금 편지가 올려가 있으니까 한번봐봐!",
    };
    smtpTransprot.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    smtpTransprot.close();
  } catch (e) {
    // HTTP 상태 500 와 Internal Error 라는 메시지를 반환하고,
    // 에러를 기록합니다.
    return ctx.throw(500, e);
  }

  // 저장한 결과를 반환합니다.
  ctx.body = output;
};
exports.delete = async (ctx) => {
  const id = ctx.params.id;
  let letters;
  try {
    letters = await Letter.findByIdAndRemove(id).exec();
  } catch (e) {
    return ctx.throw(500, e);
  }
  ctx.body = letters;
};

// exports.replace = (ctx) => {
//   ctx.body = db.letters;
// };

exports.update = (ctx) => {
  ctx.body = db.letters;
};
