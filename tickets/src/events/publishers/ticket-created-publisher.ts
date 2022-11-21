import { Publisher,Subjects,TicketCreatedEvent } from '@microticketingapp/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated; 
}