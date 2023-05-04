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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('form-sworn')
@Controller('formsworn')
export class FormSwornController {
  constructor(private readonly formSwornService: FormSwornService) {}

  @ApiOperation({ summary: 'Crear formulario' })
  @ApiBody({ type: CreateFormSwornDto })
  @ApiResponse({
    status: 201,
    description: 'El formulario ha sido creado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Petición inválida' })
  @Post('createforms')
  async create(@Body() createFormSwornDto: CreateFormSwornDto) {
    const formSworn = await this.formSwornService.createFormSworn(
      createFormSwornDto,
    );
    return formSworn;
  }

  @ApiOperation({ summary: 'Devolver todos los formularios' })
  @ApiResponse({
    status: 201,
    description: 'Muestra todos los formularios correctamente',
  })
  @ApiResponse({ status: 400, description: 'Petición inválida' })
  @Get()
  async getFormSworn(): Promise<CreateFormSwornDto[]> {
    return await this.formSwornService.getFormSworn();
  }

  @ApiOperation({
    summary: 'Devolver todos los formularios de un usuario por ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'Los formularios del usuario solicitado se muestran correctamente',
  })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get('getAll')
  async getAllFormSwornByUser(
    @Query('userId') userId: string,
  ): Promise<CreateFormSwornDto[]> {
    return await this.formSwornService.getAllFormSwornByUser(userId);
  }

  @ApiOperation({
    summary: 'Devuelve un formulario en específico de un usuario por ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'El formulario del usuario solicitado se muestra correctamente',
  })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
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

  @ApiOperation({ summary: 'Actualizar un formulario por ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateFormSwornDto })
  @ApiOkResponse({
    description: 'El formulario ha sido actualizado correctamente',
    type: UpdateFormSwornDto,
  })
  @ApiResponse({ status: 404, description: 'Formulario no encontrado' })
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

  @ApiOperation({ summary: 'Eliminar un formulario' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID del formulario a eliminar',
  })
  @ApiOkResponse({
    description: 'El formulario ha sido eliminado exitosamente.',
  })
  @ApiNotFoundResponse({
    description: 'El formulario a eliminar no fue encontrado.',
  })
  @Delete(':id')
  async deleteFormSworn(@Param('id') id: string) {
    const formSwornDelete = await this.formSwornService.deleteFormSworn(id);
    if (!formSwornDelete) {
      throw new NotFoundException(`user con ID ${id} no encontrado.`);
    }
    return 'Usuario eliminado';
  }
}
