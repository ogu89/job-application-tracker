import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

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

  async findOne(id: string) {
    const applicaiton = await this.prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!applicaiton) {
      throw new NotFoundException(`Application with ID ${id} was not found`);
    }

    return applicaiton;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    await this.findOne(id);

    const { appliedAt, ...data } = updateApplicationDto;

    return this.prisma.jobApplication.update({
      where: { id },
      data: {
        ...data,
        appliedAt: appliedAt !== undefined ? new Date(appliedAt) : undefined,
      },
    });
  }
}
