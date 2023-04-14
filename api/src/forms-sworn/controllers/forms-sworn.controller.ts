import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  Query,
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

  @Get('getAll')
  async getAllFormSwornByUser(
    @Query('userId') userId: string,
  ): Promise<CreateFormSwornDto[]> {
    return await this.formSwornService.getAllFormSwornByUser(userId);
  }

  @Get(':userId')
  async getFormSwornByUserId(@Param('userId') userId: string) {
    const formSwornByUserId = await this.formSwornService.getFormSwornByUserId(
      userId,
    );
    if (!formSwornByUserId) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
    }
    return formSwornByUserId;
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
