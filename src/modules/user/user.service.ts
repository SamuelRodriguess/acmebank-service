import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const balanceInitial = 0;
    const user = this.usersRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
      balance: balanceInitial,
      file_history: 'seu historico',
      account_no: generateAccountNo(),
    });

    return this.usersRepository.save(user);
  }
  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }
}
