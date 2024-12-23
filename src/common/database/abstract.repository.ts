import { AbstractEntity } from './abstract.entity';
import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<T extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    // as known을 사용함으로서 unknown에서 T로 변환하기 전에 타입 체크를 요구하므로,
    // 타입 불일치로 인한 오류를 미리 방지할 수 있다.
    return (await createdDocument.save()).toJSON() as unknown as T;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery).lean<T>();
    if (!document) {
      this.logger.warn(`Document not found with filterQuery`, filterQuery);
      throw new NotFoundException(
        `Document not found with ${JSON.stringify(filterQuery)}`,
      );
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<T>();
    if (!document) {
      this.logger.warn(`Document not found with filterQuery`, filterQuery);
      throw new NotFoundException(
        `Document not found with ${JSON.stringify(filterQuery)}`,
      );
    }
    return document;
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    const document = await this.model.find(filterQuery).lean<T[]>();
    if (!document) {
      this.logger.warn(`Document not found with filterQuery`, filterQuery);
      throw new NotFoundException(
        `Document not found with ${JSON.stringify(filterQuery)}`,
      );
    }
    return document;
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    return this.model.findOneAndDelete(filterQuery).lean<T>();
  }
}
