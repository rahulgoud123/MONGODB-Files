const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017//batch39populate')

const userSchema=new mongoose.Schema({
    username:{type:String},
    email:{type:String,required:true},
    age:{type:Number}
})

const postSchema=new mongoose.Schema({
    title:{type:String},
    content:{type:String},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})

const User=mongoose.model('User',userSchema)
const Post=mongoose.model('Post',postSchema)

async function createUser(username, email, age){
    try{
        const user=new User({username, email, age})
        await user.save()
        return user;

    }catch(error){
        console.error('Error creating user:',error.message)
    }
}

async function createPost(title, content, authorId){
    try{
        const post=new Post({title, content, author:authorId})
        await post.save();
        return post;
    }catch(error){
        console.error('Error creating post:', error.message)
    }
}

async function getPosts(){
    try{
        const posts=await Post.find().populate('author','username email')
        console.log('Posts:',posts)
    }catch(error){
        console.error('Error retrieving posts:',error.message)
    }
}