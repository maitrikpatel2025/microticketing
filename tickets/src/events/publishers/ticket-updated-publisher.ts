import { Publisher,Subjects,TicketUpdatedEvent } from '@microticketingapp/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated; 
}