import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from 'src/utils/typeorm';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
  ],
})
export class GroupModule {}
