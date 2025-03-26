const {User}=require('../models/user');


exports.validateEmail=(email)=>{
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

exports.validatePassword=(password)=>{
    const regex=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zAZ]).{6,}$/;
    return regex.test(password);
};

exports.validateUsername=(name,last_name)=>{
    const regex1=/^[a-zA-Z]{3,}$/;
   const regex2=/^[a-zA-Z]{4,}$/;
   return regex1.test(name)&&regex2.test(last_name);
}