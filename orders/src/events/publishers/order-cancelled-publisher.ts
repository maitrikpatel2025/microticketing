import { Subjects, Publisher, OrderCancelledEvent } from "@microticketingapp/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
