import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationStatus, JobApplication } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

  const prismaMock = {
    jobApplication: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const application: JobApplication = {
    id: 'application-1',
    companyName: 'Example Company',
    roleTitle: 'Frontend Engineer',
    jobUrl: 'https://example.com/jobs/frontend-engineer',
    recruiterName: 'Jordan Lee',
    salaryMin: null,
    salaryMax: null,
    status: ApplicationStatus.APPLIED,
    notes: 'Follow up next week',
    appliedAt: new Date('2026-08-20T00:00:00.000Z'),
    createdAt: new Date('2026-08-20T09:00:00.000Z'),
    updatedAt: new Date('2026-08-20T09:00:00.000Z'),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ApplicationsService>(ApplicationsService);
  });

  describe('findAll', () => {
    it('lists applications with the newest records first', async () => {
      prismaMock.jobApplication.findMany.mockResolvedValue([application]);

      await expect(service.findAll()).resolves.toEqual([application]);
      expect(prismaMock.jobApplication.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
  });

  describe('create', () => {
    it('creates an application and converts appliedAt to a Date', async () => {
      const createDto: CreateApplicationDto = {
        companyName: 'Example Company',
        roleTitle: 'Frontend Engineer',
        status: ApplicationStatus.APPLIED,
        appliedAt: '2026-08-20T00:00:00.000Z',
      };
      prismaMock.jobApplication.create.mockResolvedValue(application);

      await expect(service.create(createDto)).resolves.toEqual(application);
      expect(prismaMock.jobApplication.create).toHaveBeenCalledWith({
        data: {
          companyName: createDto.companyName,
          roleTitle: createDto.roleTitle,
          status: createDto.status,
          appliedAt: new Date(createDto.appliedAt!),
        },
      });
    });
  });

  describe('findOne', () => {
    it('returns the application with the requested ID', async () => {
      prismaMock.jobApplication.findUnique.mockResolvedValue(application);

      await expect(service.findOne(application.id)).resolves.toEqual(
        application,
      );
      expect(prismaMock.jobApplication.findUnique).toHaveBeenCalledWith({
        where: { id: application.id },
      });
    });

    it('throws NotFoundException when the application does not exist', async () => {
      const missingId = 'missing-application';
      prismaMock.jobApplication.findUnique.mockResolvedValue(null);

      await expect(service.findOne(missingId)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.jobApplication.findUnique).toHaveBeenCalledWith({
        where: { id: missingId },
      });
    });
  });

  describe('update', () => {
    it('checks that the application exists and then updates it', async () => {
      const updateDto: UpdateApplicationDto = {
        status: ApplicationStatus.INTERVIEW,
        notes: 'Interview scheduled',
        appliedAt: '2026-08-21T00:00:00.000Z',
      };
      const updatedApplication: JobApplication = {
        ...application,
        status: ApplicationStatus.INTERVIEW,
        notes: 'Interview scheduled',
        appliedAt: new Date('2026-08-21T00:00:00.000Z'),
      };
      prismaMock.jobApplication.findUnique.mockResolvedValue(application);
      prismaMock.jobApplication.update.mockResolvedValue(updatedApplication);

      await expect(service.update(application.id, updateDto)).resolves.toEqual(
        updatedApplication,
      );
      expect(prismaMock.jobApplication.findUnique).toHaveBeenCalledWith({
        where: { id: application.id },
      });
      expect(prismaMock.jobApplication.update).toHaveBeenCalledWith({
        where: { id: application.id },
        data: {
          status: updateDto.status,
          notes: updateDto.notes,
          appliedAt: new Date(updateDto.appliedAt!),
        },
      });
    });

    it('does not update when the application does not exist', async () => {
      prismaMock.jobApplication.findUnique.mockResolvedValue(null);

      await expect(
        service.update('missing-application', {
          status: ApplicationStatus.REJECTED,
        }),
      ).rejects.toThrow(NotFoundException);
      expect(prismaMock.jobApplication.update).not.toHaveBeenCalled();
    });
  });
});
