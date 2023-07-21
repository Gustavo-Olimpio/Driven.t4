import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository"
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function listBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if (!booking) throw notFoundError();
  const room = await bookingRepository.findRoomByRoomId(booking.roomId);
  return {
    id: booking.id,
    Room: room
  }
}
async function createBooking(roomId: number, userId: number) {
  //valida se existe quarto
  const room = await bookingRepository.findRoomByRoomId(roomId);
  if (!room) throw notFoundError();
  //valida se o quarto possui capacidade
  const max = await bookingRepository.peopleRoom(roomId);
  if (max === room.capacity) throw "error"
  //valida regra de negocio
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw "error"
  }
  // cria um booking
  const booking = await bookingRepository.createBooking(roomId,userId);
  return {
    bookingId:booking.id
  }
}
async function putBooking(roomId:number,userId:number,bookingId:number) {
  //valida se existe quarto
  const room = await bookingRepository.findRoomByRoomId(roomId);
  if (!room) throw notFoundError();
  //valida se o quarto possui capacidade
  const max = await bookingRepository.peopleRoom(roomId);
  if (max === room.capacity) throw "error"
  //valida regra de negocio
  const findBooking = await bookingRepository.findBooking(userId);
  if (!findBooking) throw "error"
  // troca o quarto
  const booking = await bookingRepository.changeRoom(roomId,findBooking.id);
  
  return {
    bookingId: booking.id
  }
}

export default {
  listBooking,
  createBooking,
  putBooking
}