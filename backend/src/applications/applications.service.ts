import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createApplicationDto: CreateApplicationDto) {
    const { appliedAt, ...data } = createApplicationDto;

    return this.prisma.jobApplication.create({
      data: {
        ...data,
        appliedAt: appliedAt ? new Date(appliedAt) : undefined,
      },
    });
  }

  findAll() {
    return this.prisma.jobApplication.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
