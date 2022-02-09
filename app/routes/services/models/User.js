import mongoose, {
  Schema
} from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  social_id: {
    type: String,
    unique: true
  },
  avatar: {
    type: String
  },
  spotify_url: {
    type: String
  },
  short_url: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  banned: {
    type: Boolean,
    default: false
  },
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  }
}, {
  collection: 'users'
})

userSchema.set('toObject', {
  virtuals: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User