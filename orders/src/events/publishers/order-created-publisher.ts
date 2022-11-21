import { Publisher, OrderCreatedEvent, Subjects } from '@microticketingapp/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
