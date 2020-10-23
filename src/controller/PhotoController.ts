import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Photo } from "../entity/Photo";

export class PhotoController {
  private photoRepository = getRepository(Photo);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.photoRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.photoRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.photoRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let photoToRemove = await this.photoRepository.findOne(request.params.id);
    await this.photoRepository.remove(photoToRemove);
  }
}
