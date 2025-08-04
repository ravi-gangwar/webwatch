import cron from 'node-cron';
import pushWebsitesToRedis from './pusher';

try {
  cron.schedule('*/3 * * * *', () => {
    pushWebsitesToRedis();
  })
} catch (error) {
  console.log(error);
}