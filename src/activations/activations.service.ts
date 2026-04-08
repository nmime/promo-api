import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivatePromoCodeDto } from './dto/activate-promo-code.dto';

@Injectable()
export class ActivationsService {
  constructor(private readonly prisma: PrismaService) {}

  async activate(dto: ActivatePromoCodeDto) {
    return this.prisma.$transaction(
      async (tx) => {
        const promo = await tx.promoCode.findUnique({
          where: { code: dto.code },
          include: { _count: { select: { activations: true } } },
        });

        if (!promo) throw new NotFoundException('Promo code not found');
        if (promo.expiresAt < new Date()) throw new BadRequestException('Promo code has expired');
        if (promo._count.activations >= promo.activationLimit)
          throw new BadRequestException('Promo code activation limit reached');

        const existing = await tx.activation.findUnique({
          where: { email_promoCodeId: { email: dto.email, promoCodeId: promo.id } },
        });
        if (existing) throw new ConflictException('Promo code already activated by this email');

        return tx.activation.create({
          data: { email: dto.email, promoCodeId: promo.id },
          include: { promoCode: true },
        });
      },
      { isolationLevel: 'Serializable' },
    );
  }
}
