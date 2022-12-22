var CronJob = require('cron').CronJob;
// const cron = require('node-cron');

const cronString = '30 * * * * *';
// cron.schedule(cronString, () => {
//   console.log('running a task every minute');
// });

// var valid = cron.validate(cronString);
// console.log(valid);

var job = new CronJob(
	cronString,
	function() {
		console.log('You will see this message every 30 minutes');
	},
	null,
	false,
	'Etc/UTC'
);

// Use this if the 4th param is default value(false)
// job.start()