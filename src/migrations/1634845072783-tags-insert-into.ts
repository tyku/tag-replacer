import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertTags1634845072783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
   INSERT INTO tags (id, tag)
    VALUES
      (1, 'город'),
      (2, 'Так лучше'),
      (101, '(штат Миссури)');
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
