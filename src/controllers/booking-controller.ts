import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    try {
      const booking = await bookingService.listBooking(userId);
      return res.status(httpStatus.OK).send(booking);
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }

  export async function postBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const {roomId} = req.body
    try {
     const createBooking = await bookingService.createBooking(roomId,userId);
      return res.status(httpStatus.OK).send(createBooking);
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
  export async function putBooking(req: AuthenticatedRequest, res: Response) {

    const { userId } = req;
    const {roomId} = req.body
    const {bookingId} = req.params
    
    try {
     const updateBooking = await bookingService.putBooking(roomId,userId,Number(bookingId));
      return res.status(httpStatus.OK).send(updateBooking);
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }