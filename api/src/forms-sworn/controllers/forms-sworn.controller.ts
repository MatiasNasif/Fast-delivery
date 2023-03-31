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

@Controller('formsworn')
export class FormSwornController {
  constructor(private readonly formSwornService: FormSwornService) {}

  @Post('createforms')
  async create(@Body() createFormSwornDto: CreateFormSwornDto) {
    const formSworn = await this.formSwornService.createFormSworn(
      createFormSwornDto,
    );
    return formSworn;
  }

  @Get()
  async getFormSworn(): Promise<CreateFormSwornDto[]> {
    return await this.formSwornService.getFormSworn();
  }

  @Get(':id')
  async getFormSwornById(@Param('id') id: string) {
    const formSwornById = await this.formSwornService.getFormSwornById(id);
    if (!formSwornById) {
      throw new NotFoundException(`user con ID ${id} no encontrado.`);
    }
    return formSwornById;
  }

  @Put(':id')
  async updateFormSworn(
    @Param('id') id: string,
    @Body() updateFormSwornDto: UpdateFormSwornDto,
  ) {
    const FormSwornUpdate = await this.formSwornService.updateFormSworn(
      id,
      updateFormSwornDto,
    );
    if (!FormSwornUpdate) {
      throw new NotFoundException(
        `Imposible actualizar, usuario con ID ${id} no encontrado.`,
      );
    }
    return FormSwornUpdate;
  }

  @Delete(':id')
  async deleteFormSworn(@Param('id') id: string) {
    const formSwornDelete = await this.formSwornService.deleteFormSworn(id);
    if (!formSwornDelete) {
      throw new NotFoundException(`user con ID ${id} no encontrado.`);
    }
    return 'Usuario eliminado';
  }
}
