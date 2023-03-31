import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormSwornDocument } from '../entities/forms-sworn.entity';
import { UserDocument } from '../../users/entities/user.entity';
import { CreateFormSwornDto, UpdateFormSwornDto } from '../dtos/form-sworn.dto';

@Injectable()
export class FormSwornService {
  constructor(
    @InjectModel('formsworn')
    private readonly formSwornModel: Model<FormSwornDocument>,
    @InjectModel('user')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createFormSworn(
    createFormSwornDto: CreateFormSwornDto,
  ): Promise<CreateFormSwornDto> {
    const userExists = await this.userModel.findById(createFormSwornDto.user);
    if (!userExists) {
      throw new NotFoundException('No se encontró el usuario especificado');
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const count = await this.formSwornModel.countDocuments({
      user: createFormSwornDto.user,
      createdAt: { $gte: today, $lt: tomorrow },
    });
    if (count >= 1) {
      throw new NotFoundException(
        'Solo se permite crear un formulario por día',
      );
    }
    const createdFormSworn = await this.formSwornModel.create({
      ...createFormSwornDto,
      user: createFormSwornDto.user,
    });
    return createdFormSworn.save();
  }

  async getFormSworn(): Promise<CreateFormSwornDto[]> {
    return this.formSwornModel.find();
  }

  async getFormSwornById(id: string): Promise<CreateFormSwornDto> {
    const formSworn: CreateFormSwornDto = await this.formSwornModel.findById(
      id,
    );
    return formSworn;
  }

  async updateFormSworn(
    id: string,
    updateFormSwornDto: UpdateFormSwornDto,
  ): Promise<CreateFormSwornDto> {
    const updatedFormSworn = await this.formSwornModel.findOneAndUpdate(
      { _id: id },
      updateFormSwornDto,
      {
        new: true,
      },
    );
    if (!updatedFormSworn) {
      throw new NotFoundException(
        `Imposible actualizar, formulario con ID ${id} no encontrado.`,
      );
    }
    return updatedFormSworn;
  }

  async deleteFormSworn(id: string) {
    return this.formSwornModel.findByIdAndDelete(id);
  }
}
