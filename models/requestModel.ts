import mongoose, { Schema, Document, Types} from "mongoose";

export interface ITrack {
    spotifyTrackId: string;
    title: string;
    artist: string;
    albumArtUrl?: string;
}


export interface IRequest extends Document {
    _id: Types.ObjectId;
    roomId: Types.ObjectId;
    status: string;
    votes: number;
    playedAt: Date | null;
    createdAt: Date;
    requestedBy: string | null;
    track: ITrack;
}


const requestSchema: Schema<IRequest> = new mongoose.Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            auto: true,
        },
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "played", "rejected"],
            default: "pending",
        },
        votes: {
            type: Number,
            default: 0,
            min: 0,
        },
        playedAt: {
            type: Date,
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true,
        },
        requestedBy: {
            type: String,
            default: null,
        },
        track: {
            spotifyTrackId: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
                trim: true,
            },
            artist: {
                type: String,
                required: true,
                trim: true,
            },
            albumArtUrl: {
                type: String,
                required: false,
            },
        },
    },
    { timestamps: true },
);

requestSchema.index({ roomId: 1 });
requestSchema.index({ "track.spotifyTrackId": 1 });
requestSchema.index({ createdAt: 1 });
requestSchema.index({ votes: 1 });


const Request = mongoose.model<IRequest>("Request", requestSchema);
export default Request;

