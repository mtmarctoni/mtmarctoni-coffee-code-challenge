import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeItem } from './types';

describe('AppController', () => {
  let appController: AppController;
  let coffeesService: CoffeesService;

  const mockCoffeesService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: CoffeesService, useValue: mockCoffeesService }],
    }).compile();

    appController = app.get<AppController>(AppController);
    coffeesService = app.get<CoffeesService>(CoffeesService);
    jest.clearAllMocks();
  });

  describe('getItems', () => {
    it('should return an array of coffee items', async () => {
      const items = [
        {
          id: 1,
          title: 'Espresso',
          description: 'Strong coffee',
          price: 2.5,
          imageUrl: 'espresso.jpg',
          category: 'robusta',
        },
      ];
      mockCoffeesService.findAll.mockResolvedValueOnce(items);
      const result = await appController.getItems();
      expect(result).toEqual(items);
      expect(mockCoffeesService.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no items', async () => {
      mockCoffeesService.findAll.mockResolvedValueOnce([]);
      const result = await appController.getItems();
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create and return a coffee item', async () => {
      const payload: CreateCoffeeItem = {
        title: 'Latte',
        description: 'Milky coffee',
        price: 3.0,
        imageUrl: 'latte.jpg',
        category: 'arabica',
      };
      const created = { id: 2, ...payload };
      mockCoffeesService.create.mockResolvedValueOnce(created);
      const result = await appController.create(payload);
      expect(result).toEqual(created);
      expect(mockCoffeesService.create).toHaveBeenCalledWith(payload);
    });
  });
});
