
import { UserRecord } from 'src/common/types';
import { User } from 'src/users/user.entity';

export const mapUserDataToResponse = (user: User): UserRecord => {
  const { password, ...userSafeRecord } = user;
  return userSafeRecord;
};
