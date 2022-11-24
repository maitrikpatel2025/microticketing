import { Publisher,PaymentCreatedEvent, Subjects } from "@microticketingapp/common"


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
}