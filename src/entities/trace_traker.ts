import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export default class TraceTraker {
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
