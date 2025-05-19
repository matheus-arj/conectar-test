import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { UserRoleEnum } from 'src/users/enum/user-role.enum';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: false,
});

async function createAdmin() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);

  const existing = await userRepository.findOne({
    where: { email: 'admin@email.com' },
  });

  if (existing) {
    console.log('Admin já existe.');
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash('12345678admin', 10);

  const admin = userRepository.create({
    name: 'Admin User',
    email: 'admin@email.com',
    password: passwordHash,
    role: 'ADMIN' as UserRoleEnum,
  });

  await userRepository.save(admin);
  console.log('Admin criado com sucesso!');
  process.exit(0);
}

createAdmin();
