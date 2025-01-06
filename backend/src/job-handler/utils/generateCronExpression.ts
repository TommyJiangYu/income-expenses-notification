import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

function generateCronExpression({
  repeatPattern,
  reminderTime,
}: {
  repeatPattern: string;
  reminderTime: Date;
}): string {
  const time = dayjs(reminderTime).tz('Asia/Bangkok');
  const minutes = time.minute();
  const hours = time.hour();

  switch (repeatPattern) {
    case 'DAILY':
      return `${minutes} ${hours} * * *`;
    case 'WEEKLY':
      return `${minutes} ${hours} * * 0`;
    case 'MONTHLY':
      return `${minutes} ${hours} 1 * *`;
    case 'YEARLY':
      return `${minutes} ${hours} 1 1 *`;
    default:
      throw new Error('Invalid repeat pattern');
  }
}

export default generateCronExpression;
