import { prisma } from '@/config';

async function findBooking(userId:number) {
  const booking = await prisma.booking.findFirst({
    where:{
        userId:userId
    }
  })
  return booking 
}

async function findRoomByRoomId(roomId:number) {
    const room = await prisma.room.findFirst({
      where:{
          id:roomId
      }
    })
    return room
  }
  async function createBooking(roomId:number,userId:number){
    return await prisma.booking.create({
      data:{
        userId,
        roomId
      }
    })
  }
  async function peopleRoom(roomId:number){
    const peopleInRoom = await prisma.booking.findMany({
      where:{
        roomId
      }
    })
    return peopleInRoom.length
  }
  async function changeRoom(roomId:number,bookingId:number){
  
    return await prisma.booking.update({
      where: {
        id:bookingId
      },
      data: {
        roomId:roomId,
      },
    })
  
  }





const bookingRepository = {
    findBooking,
    findRoomByRoomId,
    createBooking,
    peopleRoom,
    changeRoom,
  };
  
  export default bookingRepository;