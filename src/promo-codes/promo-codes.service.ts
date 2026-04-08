import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';

@Injectable()
export class PromoCodesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePromoCodeDto) {
    const existing = await this.prisma.promoCode.findUnique({ where: { code: dto.code } });
    if (existing) throw new ConflictException('Promo code already exists');
    return this.prisma.promoCode.create({
      data: {
        code: dto.code,
        discount: dto.discount,
        activationLimit: dto.activationLimit,
        expiresAt: new Date(dto.expiresAt),
      },
    });
  }

  findAll() {
    return this.prisma.promoCode.findMany({
      include: { _count: { select: { activations: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const promo = await this.prisma.promoCode.findUnique({
      where: { id },
      include: { _count: { select: { activations: true } } },
    });
    if (!promo) throw new NotFoundException('Promo code not found');
    return promo;
  }
}
