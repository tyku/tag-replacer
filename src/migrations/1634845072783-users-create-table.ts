import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1634845072783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
    CREATE TABLE users ( 
    id bigint generated by default as identity(start with 1) primary key,
    firstname varchar(40) NOT NULL,
    lastname varchar(40) NOT NULL,
    email varchar(40) NOT NULL,    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
