import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
  providers: [
    AuthService,
    AuthResolver
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'THIS_SECRET_MUST_BE_REPLACED',
      signOptions: { expiresIn: '60s' },
    }),

    // Moduli funzionali
    UsersModule
  ]
})
export class AuthModule { }
