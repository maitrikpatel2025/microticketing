import { Publisher, Subjects, TicketCreatedEvent } from "@microticketingapp/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
