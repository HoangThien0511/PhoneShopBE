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

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin;

        try {
            const checkUser = await User.findOne({ email: email });
            if (checkUser === null) {
                resolve({
                    status: 'Ok',
                    message: 'The user is not defined'
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: 'Ok',
                    message: 'The password or user is incorrect'
                });
            }
            const access_token = generalAccessToken({ id: checkUser.id, isAdmin: checkUser.isAdmin });
            const refresh_token = generalRefreshToken({ id: checkUser.id, isAdmin: checkUser.isAdmin });
            console.log(access_token, refresh_token); // Logging tokens here
            resolve({
                status: 'OK',
                message: 'Success',
                access_token: access_token,
                refresh_token: refresh_token
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (id,data) => {
    return new Promise(async (resolve, reject) => {
        

        try {
            const checkUser = await User.findOne({
                _id:id
            });
            console.log(checkUser)
            if(checkUser===null){
                resolve({
                    status: 'Ok',
                message: 'The user is not defined',
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id,data,{new:true})
            console.log(updatedUser)
            resolve({
                status: 'OK',
                message: 'Success',
                data:updatedUser 
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find().sort({createdAt: -1, updatedAt: -1})
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
}