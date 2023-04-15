import { Global, Module } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import IT from '../injection-tokens-config';

const uuidv4Provider = {
  useValue: uuidv4,
  provide: IT.UUID_TOKEN,
};

@Global()
@Module({
  providers: [uuidv4Provider],
  exports: [uuidv4Provider],
})
export class CommonModule {}
