import { CronJob } from 'cron'
import { runAllScrapers } from '../services/scraper.service'

export const runJobs = () => {
    new CronJob('0 0 0 * * *', async () => {
        console.log('Start running scraper')
        await runAllScrapers()
        console.log('Scraper finished running')
    }).start()
}