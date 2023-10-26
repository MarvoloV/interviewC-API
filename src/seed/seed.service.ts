import { Injectable } from '@nestjs/common';
import { CommerceService } from 'src/commerce/commerce.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly commerceService: CommerceService) {}

  async runSeed() {
    await this.deleteTables();
    await this.insertNewCommerce();

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.commerceService.deleteAllProducts();
  }
  private async insertNewCommerce() {
    await this.commerceService.deleteAllProducts();

    const commerces = initialData.commerces;

    const insertPromises = [];

    commerces.forEach((commerce) => {
      insertPromises.push(this.commerceService.create(commerce));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
