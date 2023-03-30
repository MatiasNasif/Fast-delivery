import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormSwornDocument } from '../entities/forms-sworn.entity';
import { CreateFormSwornDto, UpdateFormSwornDto } from '../dtos/form-sworn.dto';

@Injectable()
export class FormSwornService {
  constructor(
    @InjectModel('formsworn')
    private readonly FormSwornModel: Model<FormSwornDocument>,
  ) {}

  async createFormSworn(
    createFormSwornDto: CreateFormSwornDto,
  ): Promise<CreateFormSwornDto> {
    const formSwornExists = await this.FormSwornModel.findOne({
      email: createFormSwornDto.email,
    });
    if (formSwornExists) {
      throw new BadRequestException(
        'Ya existe un formulario con el correo electrónico proporcionado.',
      );
    }
    const createdFormSworn = await this.FormSwornModel.create(
      createFormSwornDto,
    );
    return createdFormSworn;
  }

  async getFormSworn(): Promise<CreateFormSwornDto[]> {
    return this.FormSwornModel.find();
  }

  async getFormSwornById(id: string): Promise<CreateFormSwornDto> {
    const formSworn: CreateFormSwornDto = await this.FormSwornModel.findById(
      id,
    );
    return formSworn;
  }

  async updateFormSworn(
    id: string,
    updateFormSwornDto: UpdateFormSwornDto,
  ): Promise<CreateFormSwornDto> {
    const updatedFormSworn = await this.FormSwornModel.findOneAndUpdate(
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
    return this.FormSwornModel.findByIdAndDelete(id);
  }
}
