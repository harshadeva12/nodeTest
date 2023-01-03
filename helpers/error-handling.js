exports.mailErrorHandle = (error)=>{
    console.log('Email sending failed');
    console.log(error.response);
}