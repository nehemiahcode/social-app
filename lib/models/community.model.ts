import mongoose, { mongo } from "mongoose";

const communitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
members:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
]
});

const Community = mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
