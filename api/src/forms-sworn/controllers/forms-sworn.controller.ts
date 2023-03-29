import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { FormSwornService } from '../services/form-sworn.service';
import { CreateFormSwornDto, UpdateFormSwornDto } from '../dtos/form-sworn.dto';

@Controller('form-sworn')
export class FormSwornController {
  constructor(private readonly formSwornService: FormSwornService) {}

  @Post('createformsworn')
  async createformSworn(@Body() createFormSwornDto: CreateFormSwornDto) {
    const createdformSworn = await this.formSwornService.createformSworn(
      createFormSwornDto,
    );
    return createdformSworn;
  }

  @Get()
  async getformSworn(): Promise<CreateFormSwornDto[]> {
    return await this.formSwornService.getformSworn();
  }

  @Get(':id')
  async getformSwornById(@Param('id') id: string) {
    const formSwornById = await this.formSwornService.getformSwornById(id);
    if (!formSwornById) {
      throw new NotFoundException(`user con ID ${id} no encontrado.`);
    }
    return formSwornById;
  }

  @Put(':id')
  async updateFormSworn(
    @Param('id') id: string,
    @Body() updateformSwornDto: UpdateFormSwornDto,
  ) {
    const FormSwornUpdate = await this.formSwornService.updateFormSworn(
      id,
      updateformSwornDto,
    );
    if (!FormSwornUpdate) {
      throw new NotFoundException(
        `Imposible actualizar, usuario con ID ${id} no encontrado.`,
      );
    }
    return FormSwornUpdate;
  }

  @Delete(':id')
  async deleteformSworn(@Param('id') id: string) {
    const formSwornDelete = await this.formSwornService.deleteformSworn(id);
    if (!formSwornDelete) {
      throw new NotFoundException(`user con ID ${id} no encontrado.`);
    }
    return 'Usuario eliminado';
  }
}
