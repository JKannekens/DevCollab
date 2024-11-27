import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    displayName: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      displayName,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { displayName: user.displayName, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
