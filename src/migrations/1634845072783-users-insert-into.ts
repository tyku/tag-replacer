import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertUser1634845072783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
   INSERT INTO users (id, firstname, lastname, email)
    VALUES
      (1, 'Брэд', 'Питт', 'brad@pitt.com'),
      (2, 'Ульям', 'Питт', 'william@pitt.com'),
      (3, 'Джейн', 'Хиллхаус', 'jane@pitt.com'),
      (4, 'Даг', 'Питт', 'dag@pitt.com'),
      (5, 'Джулия', 'Питт', 'july@pitt.com'),
      (66, 'Дарт', 'Сидиус', 'darth@sidious.com');
    `;
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
