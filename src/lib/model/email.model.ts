import mongoose, {
    Schema,
    Document,
    Model
} from 'mongoose';

interface IEmail extends Document {
    email: string;
    isAccpeting: boolean;
    subscribedAt: Date;
}

const EmailSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    isAccpeting: {
        type: Boolean,
        required: true,
        default: true
    },
    subscribedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});


const Email: Model<IEmail> = mongoose.models.Email || mongoose.model<IEmail>('Email', EmailSchema);

export default Email;