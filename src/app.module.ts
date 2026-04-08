import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PromoCodesModule } from './promo-codes/promo-codes.module';
import { ActivationsModule } from './activations/activations.module';

@Module({
  imports: [PrismaModule, PromoCodesModule, ActivationsModule],
})
export class AppModule {}
