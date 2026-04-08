import { Body, Controller, Post } from '@nestjs/common';
import { ActivationsService } from './activations.service';
import { ActivatePromoCodeDto } from './dto/activate-promo-code.dto';

@Controller('activations')
export class ActivationsController {
  constructor(private readonly activationsService: ActivationsService) {}

  @Post()
  activate(@Body() dto: ActivatePromoCodeDto) {
    return this.activationsService.activate(dto);
  }
}
