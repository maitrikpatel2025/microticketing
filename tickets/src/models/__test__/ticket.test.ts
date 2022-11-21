import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  //create and instance of a ticket
  const ticket = Ticket.build({
    title: "Ticket",
    price: 5,
    userId: "1324",
  });
  //save the ticket to the database
  await ticket.save();

  //fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  //make two seperate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });
  //save the first fetch ticket

  await firstInstance!.save();
  // save the second fetched ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return 
  }

  throw new Error ('shoud not reach this point')
});


it('increments the version number on multiple saves',async () =>{
//create and instance of a ticket
  const ticket = Ticket.build({
    title: "test ticket",
    price: 20,
    userId: "1324",
  });
  //save the ticket to the database
  await ticket.save();
  expect(ticket.version).toEqual(0)
  await ticket.save();
  expect(ticket.version).toEqual(1)
  await ticket.save();
  expect(ticket.version).toEqual(2)

})