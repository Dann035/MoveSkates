import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAllUsers(): object[] {
    const userList = [
      { id: 1, name: 'John Doe', email: 'johndoe@test.com'},
      { id: 2, name: 'Jane Doe', email: 'janedoe@test.com'},
      { id: 3, name: 'Alex Smith', email: 'alexsmith@test.com'},
      { id: 4, name: 'Emily Johnson', email: 'emilyjohnson@test.com'},
      { id: 5, name: 'Michael Brown', email: 'michaelbrown@test.com'},
      { id: 6, name: 'Sarah Davis', email: 'sarahdavis@test.com'},
      { id: 7, name: 'David Wilson', email: 'davidwilson@test.com'},
      { id: 8, name: 'Olivia Martinez', email: 'oliviamartinez@test.com'},
      { id: 9, name: 'Daniel Garcia', email: 'danielgarcia@test.com'},
      { id: 10, name: 'Sophia Anderson', email: 'sophiaanderson@test.com'},
    ];
    return userList;
  }
}
