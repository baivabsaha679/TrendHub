import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const Connection=async()=>{
    const URL=`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-ubgkucl-shard-00-00.knrks8t.mongodb.net:27017,ac-ubgkucl-shard-00-01.knrks8t.mongodb.net:27017,ac-ubgkucl-shard-00-02.knrks8t.mongodb.net:27017/?ssl=true&replicaSet=atlas-ky99by-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
       await mongoose.connect(URL,{useNewUrlParser:true});
       console.log('Database connected successfully')
    }
    catch(error){
        console.log('Error while connecting to the database ',error)
    }
}
export default Connection