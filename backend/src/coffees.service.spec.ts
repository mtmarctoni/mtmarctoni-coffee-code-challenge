import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DbService } from './db.service';

describe('CoffeesService', () => {
  let service: CoffeesService;
  let dbService: DbService;

  const mockDbService = {
    query: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DbService, useValue: mockDbService },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    dbService = module.get<DbService>(DbService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a coffee item', async () => {
      // Arrange
      const coffeeDto = {
        title: 'Espresso',
        description: 'Strong coffee',
        price: 2.5,
        imageUrl: 'espresso.jpg',
        category: 'robusta' as 'robusta',
      };
      mockDbService.query
        .mockResolvedValueOnce({ rows: [] }) // No existing coffee
        .mockResolvedValueOnce({
          rows: [
            {
              id: 1,
              title: coffeeDto.title,
              description: coffeeDto.description,
              price: coffeeDto.price,
              imageurl: coffeeDto.imageUrl,
              category: coffeeDto.category,
            },
          ],
        });
      // Act
      const result = await service.create(coffeeDto);
      // Assert
      expect(result).toMatchObject({
        id: 1,
        ...coffeeDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of coffee items', async () => {
      // Arrange
      const coffeeRows = [
        {
          id: 1,
          title: 'Latte',
          description: 'Milky coffee',
          price: 3.0,
          imageurl: 'latte.jpg',
          category: 'arabica',
        },
      ];
      mockDbService.query.mockResolvedValueOnce({ rows: coffeeRows });
      // Act
      const result = await service.findAll();
      // Assert
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toMatchObject({
        id: 1,
        title: 'Latte',
        description: 'Milky coffee',
        price: 3.0,
        imageUrl: 'latte.jpg',
        category: 'arabica',
      });
    });
  });

  // Future tests for update and delete
  describe.skip('update', () => {
    it('should update a coffee item', () => {
      // To be implemented when update method exists
    });
  });

  describe.skip('delete', () => {
    it('should delete a coffee item', () => {
      // To be implemented when delete method exists
    });
  });
});
