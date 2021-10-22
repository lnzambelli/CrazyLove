import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 465,
    secure: true, 
    auth: {
      user: "mi-correo-electronico@gmail.com", // generated ethereal user
      pass: "contraseña-generada-en-google", // generated ethereal password
    },
});

transporter.verify().then(()=>{
    console.log("Listo para ser enviado");
})