import mongoose  from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties
// that are required to create a new Ticket
interface TicketAttrs{
    title:string;
    price: number;
    userId: string
}


// An interface that describes the properties
// that a Ticket Document has
interface TicketDoc extends mongoose.Document {
    title:string;
    price: number;
    userId: string;
    version: number;
}

// An interface that describes the properties
// that a Ticket model has

interface TicketModel extends mongoose.Model <TicketDoc>{
    build(attrs: TicketAttrs):TicketDoc;
}
const ticketSchema = new mongoose.Schema({
    title:{
        type: String,
        require:true
    },
    price: {
        type: Number,
        require:true
    },
    userId:{
        type: String,
        require:true
    }

},{
    toJSON:{
        //not the best approach
    transform(doc, ret){
        ret.id = ret._id
        delete ret._id
    }
    
}});
ticketSchema.set('versionKey','version')
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs : TicketAttrs) => {
    return new Ticket(attrs);
};
const Ticket = mongoose.model<TicketDoc,TicketModel>('Ticket',ticketSchema);


export {Ticket}