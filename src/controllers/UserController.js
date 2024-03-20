const UserService= require('../services/UserService');

const createUser=async(req,res)=>{
    try{
        console.log(req.body)
        const{name,email,password,confirmPassword,phone}=req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail=reg.test(email)
        if(!name||!email||!password||!confirmPassword||!phone){
            return res.status(200).json({
                status:'Err',
                message:'The input is required'
            })
        }
        console.log('isCheckEmail',isCheckEmail)
       const res= await UserService.createUser();
        return res.status(200).json(res)
    }catch(e){
        return res.status(404).json(
            {
                message:e
            }

        )
    }
}

module.exports = {
    createUser
}