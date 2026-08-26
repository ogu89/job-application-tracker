import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationStatus, JobApplication } from '@prisma/client';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;

  const applicationsServiceMock = {
    findAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const application: JobApplication = {
    id: 'application-1',
    companyName: 'Example Company',
    roleTitle: 'Frontend Engineer',
    jobUrl: null,
    recruiterName: null,
    salaryMin: null,
    salaryMax: null,
    status: ApplicationStatus.APPLIED,
    notes: null,
    appliedAt: null,
    createdAt: new Date('2026-08-20T09:00:00.000Z'),
    updatedAt: new Date('2026-08-20T09:00:00.000Z'),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [
        {
          provide: ApplicationsService,
          useValue: applicationsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
  });

  it('delegates listing applications to the service', async () => {
    applicationsServiceMock.findAll.mockResolvedValue([application]);

    await expect(controller.findAll()).resolves.toEqual([application]);
    expect(applicationsServiceMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('delegates creating an application to the service', async () => {
    const createDto: CreateApplicationDto = {
      companyName: 'Example Company',
      roleTitle: 'Frontend Engineer',
    };
    applicationsServiceMock.create.mockResolvedValue(application);

    await expect(controller.create(createDto)).resolves.toEqual(application);
    expect(applicationsServiceMock.create).toHaveBeenCalledWith(createDto);
  });

  it('delegates finding one application to the service', async () => {
    applicationsServiceMock.findOne.mockResolvedValue(application);

    await expect(controller.findOne(application.id)).resolves.toEqual(
      application,
    );
    expect(applicationsServiceMock.findOne).toHaveBeenCalledWith(
      application.id,
    );
  });

  it('delegates updating an application to the service', async () => {
    const updateDto: UpdateApplicationDto = {
      status: ApplicationStatus.INTERVIEW,
    };
    const updatedApplication = {
      ...application,
      status: ApplicationStatus.INTERVIEW,
    };
    applicationsServiceMock.update.mockResolvedValue(updatedApplication);

    await expect(controller.update(application.id, updateDto)).resolves.toEqual(
      updatedApplication,
    );
    expect(applicationsServiceMock.update).toHaveBeenCalledWith(
      application.id,
      updateDto,
    );
  });
});
