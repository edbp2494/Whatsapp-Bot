const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const { runAll, runSingle } = require('./runner.js');
const { generateReport } = require('./reporter.js');

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  console.log('QR Code received:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('Client is ready!');

  try {
    // Parse CLI arguments
    const args = process.argv.slice(2);
    let results;

    if (args.length > 0 && args[0] === '--flow' && args[1]) {
      const flowId = args[1];
      console.log(`Running single flow: ${flowId}`);
      results = await runSingle(client, flowId);
    } else {
      console.log('Running all flows...');
      results = await runAll(client);
    }

    // Generate report
    await generateReport(results);
    console.log('Report generated successfully!');

    // Destroy client and exit
    await client.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error during test execution:', error);
    await client.destroy();
    process.exit(1);
  }
});

client.on('auth_failure', (msg) => {
  console.error('Authentication failure:', msg);
  process.exit(1);
});

client.on('disconnected', (reason) => {
  console.log('Client was logged out:', reason);
});

client.initialize();
