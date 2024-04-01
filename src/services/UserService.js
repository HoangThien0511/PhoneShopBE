const User = require("../models/UserModel")
const bcrypt = require("bcrypt");
const { generalAccessToken,generalRefreshToken } = require("./JwtService");

const createUser=(newUser)=>{
    return new Promise(async (resolve, reject)=>{
        const{name,email,password,confirmPassword,phone}=newUser

        try{
            const checkUser=await User.findOne({
                email:email
            })
            if(checkUser !== null){
                resolve({
                    status:'Ok',
                    message:'The email is already'
                })
            }
            const hash= bcrypt.hashSync(password,10);
            
            const createUser= await User.create({
                name,
                email,
                password: hash,
               
                phone
            })
            if(createUser){
                resolve({
                    status:'OK',
                    message:'Success',
                    data:createUser
                })
            }
                resolve({})
        }catch(e){
            reject(e);
        }
    })
}

const loginUser=(userLogin)=>{
    return new Promise(async (resolve, reject)=>{
        const{name,email,password,confirmPassword,phone}=userLogin

        try{
            const checkUser=await User.findOne({
                email:email
            })
            if(checkUser === null){
                resolve({
                    status:'Ok',
                    message:'The user is not defined'
                })
            }            
            const comparePassword=bcrypt.compareSync(password,checkUser.password)
            if(!comparePassword){
                resolve({
                    status:'Ok',
                    message:'The password or user is incorrect'
                })
            }
                const accessToken=generalAccessToken({id:checkUser.id, isAdmin:checkUser.isAdmin})
                const refreshToken=generalRefreshToken({id:checkUser.id, isAdmin:checkUser.isAdmin})
                console.log(accessToken)
                resolve({
                    status:'OK',
                    message:'Success',
                    accessToken:accessToken,
                    refreshToken:refreshToken
                })
            }
                
        catch(e){
            reject(e);
        }
    })
}

module.exports = {
    createUser,
    loginUser
}