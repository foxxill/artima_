import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Создаём адаптер для PostgreSQL, передавая ему строку подключения
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    
    // Передаём адаптер в PrismaClient при создании
    super({ adapter });
  }

  // Этот метод вызывается при старте NestJS — подключаемся к БД
  async onModuleInit() {
    await this.$connect();
  }

  // Этот метод вызывается при остановке NestJS — отключаемся
  async onModuleDestroy() {
    await this.$disconnect();
  }
}