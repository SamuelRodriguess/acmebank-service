import bcrypt from 'bcrypt';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { generateAccountNo } from '../../utils/generateAccount';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('O nome de usuário já está em uso.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    const balanceInitial = 0;
    const user = this.usersRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
      balance: balanceInitial,
      file_history: '',
      account_no: generateAccountNo(),
    });

    try {
      return await this.usersRepository.save(user);
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT' || error.message?.includes('UNIQUE constraint failed')) {
        throw new ConflictException('O nome de usuário já está em uso.');
      }
      throw error;
    }
  }
  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }
}
