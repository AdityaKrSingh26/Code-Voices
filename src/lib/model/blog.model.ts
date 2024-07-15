import mongoose, {
    Schema,
    Document,
    Model
} from 'mongoose';

interface IBlog extends Document {
    title: string;
    description: string;
    tags: string[];
    url: string;
    image: string;
    isPublished: boolean;
    publishedAt: Date;
}

const BlogSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        trim: true,
        maxlength: [100, 'Title must be less than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long']
    },
    tags: {
        type: [String],
        required: true,
        validate: {
            validator: (tags: string[]) => tags.length > 0,
            message: 'At least one tag is required'
        }
    },
    url: {
        type: String,
        required: [true, 'URL is required'],
        unique: true,
        trim: true,
        match: [
            /^\/blog\/[a-z0-9-]+$/,
            'URL must start with /blog/ and contain only lowercase letters, numbers, and hyphens'
        ]
    },
    image: {
        type: String,
        required: false,
        trim: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: true
    },
    publishedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});


const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;