import mongoose, { Schema, Document, Types } from "mongoose";


export interface IRoom extends Document {
    _id: Types.ObjectId;
    roomName: string;
    roomCode: string;
    roomCreator: Types.ObjectId;
    active: boolean;
    createdAt: Date;
}

const roomSchema: Schema<IRoom> = new mongoose.Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            auto: true,
        },
        roomName: {
            type: String,
            required: [true, "A room name is required."],
            trim: true,
        },
        roomCode: {
            type: String,
            unique: true,
            required: [true, "A room code is required."],
            trim: true,
            maxLength: [5, "Room code's can only be 5 characters long."],
        },
        roomCreator: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);


// indexes
roomSchema.index({ roomCode: 1 });
roomSchema.index({ roomCreator: 1 });


const Room = mongoose.model<IRoom>("Room", roomSchema);
export default Room;